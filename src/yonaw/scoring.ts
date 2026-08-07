/**
 * YONAW Scoring Logic
 * Pure functions for scoring individual votes and aggregating community value.
 */

import {
  BinaryDecision,
  YonawVote,
  VoterContext,
  ScoredVote,
  AggregationResult,
  TierJudgment,
} from './types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function decisionToSign(decision: BinaryDecision): number {
  return decision === 'Yes' ? 1 : -1;
}

function isContextualClear(contextual: YonawVote['contextual']): boolean {
  const ifOk = contextual.ifCondition.trim().length >= 8;
  const thenOk =
    contextual.thenDecision === 'Yes' || contextual.thenDecision === 'No';
  return ifOk && thenOk;
}

/**
 * Convert intensity into a 0–1 factor.
 * - If quadratic: intensity is treated as credits spent → √credits / max
 * - If slider: intensity is 0–100 → /100
 */
function intensityFactor(vote: YonawVote, maxQuadraticCredits = 100): number {
  if (vote.intensityIsQuadratic) {
    const credits = Math.max(0, vote.intensity);
    const effectiveVotes = Math.sqrt(credits);
    return Math.min(1, effectiveVotes / Math.sqrt(maxQuadraticCredits));
  }
  // Legacy slider path
  return Math.max(0, Math.min(1, vote.intensity / 100));
}

// ---------------------------------------------------------------------------
// Single Vote Scoring
// ---------------------------------------------------------------------------

/**
 * Score a single YONAW vote.
 * Returns the qualitative + intensity strength before credibility weighting.
 */
export function scoreSingleVote(vote: YonawVote): number {
  const base = decisionToSign(vote.decision);

  const light = decisionToSign(vote.tiers.Light.decision);
  const mixed = decisionToSign(vote.tiers.Mixed.decision);
  const dark = decisionToSign(vote.tiers.Dark.decision);

  // Weighted tier contribution (from algorithm)
  const tierWeight = 0.4 * light + 0.3 * mixed + 0.3 * dark;

  // Contextual clarity bonus / penalty
  const contextualBonus = isContextualClear(vote.contextual) ? 0.15 : -0.1;

  const intensity = intensityFactor(vote);

  // Core formula from docs/yonaw-algorithm.md
  const voteStrength = base * tierWeight * intensity + contextualBonus;

  return voteStrength;
}

/**
 * Apply credibility weighting to a scored vote.
 */
export function applyCredibilityWeight(
  voteStrength: number,
  credibility: number
): number {
  const clampedCred = Math.max(0, Math.min(100, credibility));
  return voteStrength * (clampedCred / 100);
}

/**
 * Full scoring pipeline for one voter.
 */
export function scoreVote(
  vote: YonawVote,
  voter: VoterContext
): ScoredVote {
  const voteStrength = scoreSingleVote(vote);
  const finalVotePower = applyCredibilityWeight(voteStrength, voter.credibility);

  return {
    vote,
    voter,
    voteStrength,
    finalVotePower,
  };
}

// ---------------------------------------------------------------------------
// Aggregation
// ---------------------------------------------------------------------------

/**
 * Aggregate a set of scored votes into a final favor value (0–100).
 */
export function aggregateVotes(scoredVotes: ScoredVote[]): AggregationResult {
  if (scoredVotes.length === 0) {
    return {
      communityScore: 0,
      favorValue: 50, // neutral default
      totalCredibilityWeight: 0,
      voteCount: 0,
      requiresReceipt: false,
    };
  }

  let weightedSum = 0;
  let totalCred = 0;

  for (const sv of scoredVotes) {
    weightedSum += sv.finalVotePower;
    totalCred += Math.max(0, Math.min(100, sv.voter.credibility));
  }

  // Avoid division by zero; fall back to simple average of voteStrength if all cred = 0
  const communityScore =
    totalCred > 0
      ? weightedSum / (totalCred / 100) // normalize by average credibility scale
      : scoredVotes.reduce((s, v) => s + v.voteStrength, 0) / scoredVotes.length;

  // Map roughly from [-1 … +1] range into 0–100
  // (actual range can exceed ±1 slightly because of contextual bonus)
  const favorValue = Math.max(0, Math.min(100, (communityScore + 1) * 50));

  // High value + any tip claim → require receipt
  const requiresReceipt =
    favorValue >= 90 &&
    scoredVotes.some((sv) => Boolean(sv.vote.tipReceiptId));

  return {
    communityScore,
    favorValue,
    totalCredibilityWeight: totalCred,
    voteCount: scoredVotes.length,
    requiresReceipt,
  };
}

/**
 * Convenience: score a batch of votes and aggregate in one call.
 */
export function scoreAndAggregate(
  votes: Array<{ vote: YonawVote; voter: VoterContext }>
): AggregationResult {
  const scored = votes.map(({ vote, voter }) => scoreVote(vote, voter));
  return aggregateVotes(scored);
}
