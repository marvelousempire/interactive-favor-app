/**
 * Reputation score types
 */

export interface PerformanceSample {
  favorId: string;
  value: number; // 0–100 favor value
  finalizedAt: string; // ISO timestamp
}

export interface CredibilitySample {
  /** How accurate a past review turned out to be (0–100) */
  accuracy: number;
  recordedAt: string;
}

export interface YScoreState {
  /** Current Y-score */
  value: number;
  /** Last time it was updated */
  lastUpdated: string;
  /** Number of samples currently in the rolling window */
  windowSize: number;
}

export interface YScoreUpdateResult {
  previous: number;
  next: number;
  step: number;
  reason: string;
  zScore?: number;
  isOutlierIQR?: boolean;
}
