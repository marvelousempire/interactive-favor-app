/**
 * Identity Score Calculator
 * Produces a progressive 0–100 score that gates and multiplies influence.
 * Designed to make Sybil farming expensive in effective voting power.
 */

import { AccountSignals, IdentityScoreResult } from './types';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Calculate days since account creation.
 */
function accountAgeDays(createdAt: string): number {
  const created = new Date(createdAt).getTime();
  const now = Date.now();
  return Math.max(0, (now - created) / MS_PER_DAY);
}

/**
 * Age component (0–25 points)
 * New accounts start near zero. Full age points after ~30 days.
 */
function scoreAge(ageDays: number): number {
  if (ageDays < 1) return 0;
  if (ageDays < 7) return 5 + (ageDays / 7) * 5;      // 5–10
  if (ageDays < 30) return 10 + ((ageDays - 7) / 23) * 10; // 10–20
  return Math.min(25, 20 + Math.log10(ageDays / 30) * 5); // 20–25
}

/**
 * Activity component (0–30 points)
 * Completing favors and writing reviews builds trust.
 */
function scoreActivity(signals: AccountSignals): number {
  const favors = Math.min(signals.completedFavors, 40);
  const reviews = Math.min(signals.reviewsGiven, 40);

  // Diminishing returns
  const favorPoints = Math.sqrt(favors) * 3.5;   // ~22 max
  const reviewPoints = Math.sqrt(reviews) * 2;   // ~12.6 max

  return Math.min(30, favorPoints + reviewPoints);
}

/**
 * Network component (0–25 points)
 * Unique connections (ties into Reach) make multi-account farming harder.
 */
function scoreNetwork(uniqueConnections: number): number {
  if (uniqueConnections <= 0) return 0;
  if (uniqueConnections < 5) return uniqueConnections * 2; // 0–8
  if (uniqueConnections < 15) return 8 + (uniqueConnections - 5) * 1.2; // 8–20
  return Math.min(25, 20 + Math.log10(uniqueConnections / 15) * 5);
}

/**
 * Proof-of-personhood component (0–15 points)
 * External verified human signals give a clear boost.
 */
function scorePoP(signals: AccountSignals): number {
  let points = 0;
  const pop = signals.proofOfPersonhood;
  if (!pop) return 0;

  if (pop.worldcoin) points += 8;
  if (pop.brightId) points += 5;
  if (typeof pop.gitcoinPassport === 'number') {
    points += Math.min(7, (pop.gitcoinPassport / 100) * 7);
  }
  if (pop.other && pop.other.length > 0) {
    points += Math.min(3, pop.other.length);
  }

  return Math.min(15, points);
}

/**
 * Optional stake component (0–10 points)
 * Small locked value increases cost of Sybil creation.
 */
function scoreStake(stakeAmount: number = 0): number {
  if (stakeAmount <= 0) return 0;
  // Very small stake still helps; larger stake gives more
  return Math.min(10, Math.sqrt(stakeAmount) * 2);
}

/**
 * Main Identity Score calculator.
 */
export function calculateIdentityScore(signals: AccountSignals): IdentityScoreResult {
  const ageDays = accountAgeDays(signals.createdAt);

  const ageScore = scoreAge(ageDays);
  const activityScore = scoreActivity(signals);
  const networkScore = scoreNetwork(signals.uniqueConnections);
  const popScore = scorePoP(signals);
  const stakeScore = scoreStake(signals.stakeAmount);

  let anomalyPenalty = 0;
  if (signals.hasAnomalyFlag) {
    anomalyPenalty = 25; // heavy hit
  }

  let raw =
    ageScore + activityScore + networkScore + popScore + stakeScore - anomalyPenalty;

  // Clamp 0–100
  const score = Math.max(0, Math.min(100, Math.round(raw)));

  // Voice credit multiplier: soft curve so very new accounts have almost no credits
  // score 0 → 0.05, score 50 → ~0.55, score 100 → 1.0
  const voiceCreditMultiplier = 0.05 + 0.95 * (score / 100);

  const canVote = score >= 8; // extremely new / flagged accounts cannot vote yet

  const reasons: string[] = [];
  if (ageDays < 1) reasons.push('Account is less than 1 day old');
  if (signals.completedFavors + signals.reviewsGiven < 3) {
    reasons.push('Very low activity');
  }
  if (signals.uniqueConnections < 3) reasons.push('Sparse network');
  if (popScore > 0) reasons.push('Proof-of-personhood signals present');
  if (signals.hasAnomalyFlag) reasons.push('Anomaly flag applied');
  if (score >= 70) reasons.push('Strong progressive identity');

  return {
    score,
    breakdown: {
      ageScore: Math.round(ageScore * 10) / 10,
      activityScore: Math.round(activityScore * 10) / 10,
      networkScore: Math.round(networkScore * 10) / 10,
      popScore: Math.round(popScore * 10) / 10,
      stakeScore: Math.round(stakeScore * 10) / 10,
      anomalyPenalty,
    },
    voiceCreditMultiplier: Math.round(voiceCreditMultiplier * 1000) / 1000,
    canVote,
    reasons,
  };
}

/**
 * Effective voice credits after identity scoring.
 */
export function getEffectiveVoiceCredits(
  baseCredits: number,
  identity: IdentityScoreResult
): number {
  if (!identity.canVote) return 0;
  return Math.floor(baseCredits * identity.voiceCreditMultiplier);
}
