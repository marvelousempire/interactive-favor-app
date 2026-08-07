/**
 * Y-score calculation — reputation volatility
 *
 * Uses a rolling window + modified Z-score (MAD) as primary signal
 * and IQR fences as secondary confirmation.
 */

import {
  PerformanceSample,
  CredibilitySample,
  YScoreState,
  YScoreUpdateResult,
} from './types';

const WINDOW_FAVORS = 30;
const WINDOW_DAYS = 90;
const MIN_SAMPLES = 5;
const DECAY_DAYS = 14;
const CLAMP_MIN = -5;
const CLAMP_MAX = 5;

function daysBetween(a: string, b: string): number {
  return Math.abs(new Date(a).getTime() - new Date(b).getTime()) / (24 * 60 * 60 * 1000);
}

function median(nums: number[]): number {
  if (nums.length === 0) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid];
}

function mad(nums: number[], med: number): number {
  if (nums.length === 0) return 0;
  const deviations = nums.map((x) => Math.abs(x - med));
  return median(deviations);
}

function quartiles(nums: number[]): { q1: number; q3: number; iqr: number } {
  const s = [...nums].sort((a, b) => a - b);
  const q1 = s[Math.floor(s.length * 0.25)] ?? 0;
  const q3 = s[Math.floor(s.length * 0.75)] ?? 0;
  return { q1, q3, iqr: q3 - q1 };
}

/**
 * Select samples that fall inside the rolling window.
 */
export function selectWindow(
  samples: PerformanceSample[],
  now: string = new Date().toISOString()
): PerformanceSample[] {
  const cutoff = new Date(now).getTime() - WINDOW_DAYS * 24 * 60 * 60 * 1000;
  const recent = samples
    .filter((s) => new Date(s.finalizedAt).getTime() >= cutoff)
    .sort((a, b) => new Date(b.finalizedAt).getTime() - new Date(a.finalizedAt).getTime());
  return recent.slice(0, WINDOW_FAVORS);
}

/**
 * Compute modified Z-score for the newest sample against the window.
 */
export function modifiedZScore(values: number[], newest: number): number {
  if (values.length < 2) return 0;
  const med = median(values);
  const madVal = mad(values, med);
  if (madVal < 1e-6) {
    // Almost no variation — any difference is notable
    return newest === med ? 0 : Math.sign(newest - med) * 2.5;
  }
  return (0.6745 * (newest - med)) / madVal;
}

/**
 * Check IQR fences for the newest value.
 */
export function iqrOutlierFlags(values: number[], newest: number): {
  mild: boolean;
  extreme: boolean;
} {
  if (values.length < 4) return { mild: false, extreme: false };
  const { q1, q3, iqr } = quartiles(values);
  if (iqr < 1e-6) return { mild: false, extreme: false };
  const mildLow = q1 - 1.5 * iqr;
  const mildHigh = q3 + 1.5 * iqr;
  const extLow = q1 - 3 * iqr;
  const extHigh = q3 + 3 * iqr;
  return {
    mild: newest < mildLow || newest > mildHigh,
    extreme: newest < extLow || newest > extHigh,
  };
}

function stepFromZ(z: number): number {
  const abs = Math.abs(z);
  if (abs < 1.0) return 0;
  if (abs < 2.0) return Math.sign(z) * 0.1;
  return Math.sign(z) * 0.2;
}

function clamp(v: number): number {
  return Math.max(CLAMP_MIN, Math.min(CLAMP_MAX, Math.round(v * 10) / 10));
}

/**
 * Main update function.
 * Call when a new favor is finalized or when the decay timer fires.
 */
export function updateYScore(
  state: YScoreState,
  performanceHistory: PerformanceSample[],
  newestPerformance: PerformanceSample,
  now: string = new Date().toISOString(),
  credibilityHistory?: CredibilitySample[]
): YScoreUpdateResult {
  const window = selectWindow([...performanceHistory, newestPerformance], now);
  const values = window.map((s) => s.value);

  if (window.length < MIN_SAMPLES) {
    return {
      previous: state.value,
      next: state.value,
      step: 0,
      reason: `Insufficient samples (${window.length}/${MIN_SAMPLES})`,
    };
  }

  const z = modifiedZScore(values.slice(1), newestPerformance.value); // exclude newest from baseline if desired
  const iqr = iqrOutlierFlags(values.slice(1), newestPerformance.value);
  let step = stepFromZ(z);

  // Secondary IQR confirmation can promote a mild step to large
  if (iqr.extreme && Math.abs(step) < 0.2) {
    step = Math.sign(step || z) * 0.2;
  }

  // Optional credibility contribution (half weight)
  if (credibilityHistory && credibilityHistory.length >= MIN_SAMPLES) {
    const credValues = credibilityHistory.map((c) => c.accuracy);
    const newestCred = credValues[credValues.length - 1];
    const zCred = modifiedZScore(credValues.slice(0, -1), newestCred);
    const credStep = stepFromZ(zCred) * 0.5;
    if (Math.abs(credStep) > Math.abs(step)) {
      step = credStep;
    }
  }

  // Decay toward zero if quiet
  const daysSince = daysBetween(state.lastUpdated, now);
  if (step === 0 && daysSince >= DECAY_DAYS) {
    const decaySteps = Math.floor(daysSince / DECAY_DAYS);
    const decay = Math.sign(state.value) * -0.1 * decaySteps;
    const next = clamp(state.value + decay);
    return {
      previous: state.value,
      next,
      step: next - state.value,
      reason: `Decay toward zero after ${daysSince.toFixed(0)} quiet days`,
      zScore: z,
      isOutlierIQR: iqr.mild || iqr.extreme,
    };
  }

  const next = clamp(state.value + step);
  return {
    previous: state.value,
    next,
    step: next - state.value,
    reason: step === 0 ? 'Within normal variation' : `Swing detected (z=${z.toFixed(2)})`,
    zScore: z,
    isOutlierIQR: iqr.mild || iqr.extreme,
  };
}
