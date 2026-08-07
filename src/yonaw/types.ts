/**
 * YONAW Voting Types
 * Yes or No and Why — core valuation types for P-more credits
 */

export type BinaryDecision = 'Yes' | 'No';

export type TierName = 'Light' | 'Mixed' | 'Dark';

export interface TierJudgment {
  decision: BinaryDecision;
  why: string;
}

export interface ContextualVariable {
  /** The condition that would flip the vote */
  ifCondition: string;
  /** What the decision becomes if the condition is true */
  thenDecision: BinaryDecision;
}

export interface YonawVote {
  /** Overall Yes / No */
  decision: BinaryDecision;

  /** Per-tier judgments */
  tiers: {
    Light: TierJudgment;
    Mixed: TierJudgment;
    Dark: TierJudgment;
  };

  /** Required "if this, then that" contextual flip */
  contextual: ContextualVariable;

  /**
   * Intensity signal.
   * - Legacy: 0–100 slider
   * - Preferred: quadratic votes spent (will be converted via √credits)
   */
  intensity: number;

  /** Whether intensity came from quadratic voting */
  intensityIsQuadratic?: boolean;

  /** Optional tip/payment receipt for near-max intensity */
  tipReceiptId?: string;
}

export interface VoterContext {
  credibility: number; // 0–100
  performance?: number;
  reach?: number;
  yScore?: number;
}

export interface ScoredVote {
  vote: YonawVote;
  voter: VoterContext;
  voteStrength: number;      // qualitative + intensity strength
  finalVotePower: number;    // after credibility weighting
}

export interface AggregationResult {
  communityScore: number;    // raw weighted average (-1 to +1 range-ish)
  favorValue: number;        // 0–100 clamped
  totalCredibilityWeight: number;
  voteCount: number;
  requiresReceipt: boolean;  // true if high value + tip claimed
}
