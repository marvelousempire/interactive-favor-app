/**
 * Sybil Resistance Types
 * Progressive identity scoring to protect quadratic voting and equal voice budgets.
 */

export interface AccountSignals {
  /** ISO date string of account creation */
  createdAt: string;

  /** Number of completed favors (as performer) */
  completedFavors: number;

  /** Number of verified reviews given */
  reviewsGiven: number;

  /** Number of unique people interacted with (Reach proxy) */
  uniqueConnections: number;

  /** Optional external proof-of-personhood signals */
  proofOfPersonhood?: {
    worldcoin?: boolean;
    gitcoinPassport?: number; // score 0–100 if available
    brightId?: boolean;
    other?: string[];
  };

  /** Has the account ever been flagged for suspicious activity */
  hasAnomalyFlag?: boolean;

  /** Optional small stake locked (in future P-more or stable units) */
  stakeAmount?: number;
}

export interface IdentityScoreResult {
  /** Final 0–100 identity score */
  score: number;

  /** Breakdown for transparency / debugging */
  breakdown: {
    ageScore: number;
    activityScore: number;
    networkScore: number;
    popScore: number;
    stakeScore: number;
    anomalyPenalty: number;
  };

  /** Effective voice credit multiplier (0–1) */
  voiceCreditMultiplier: number;

  /** Whether the account is allowed to vote at all */
  canVote: boolean;

  /** Human-readable reasons for the current score */
  reasons: string[];
}

export interface RateLimitConfig {
  maxAccountsPerDevicePerDay: number;
  maxVotesPerAccountPerHour: number;
  minAccountAgeHoursBeforeFullCredits: number;
}
