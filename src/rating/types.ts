/**
 * Shared types for pluggable rating systems (Ready Play / Scoreboard Studio)
 */

export type OutcomeScore = 0 | 0.5 | 1; // loss, draw, win

export interface Outcome {
  score: OutcomeScore;
  /** Optional richer signals for TrueSkill-2 style engines */
  meta?: {
    abandoned?: boolean;
    individualContribution?: number;
    experience?: number;
  };
}

export interface RatingState {
  /** Primary rating / μ / r */
  rating: number;
  /** Uncertainty: σ (TrueSkill) or RD (Glicko) */
  deviation: number;
  /** Glicko-2 volatility; optional for other engines */
  volatility?: number;
  /** Last update timestamp */
  updatedAt?: string;
}

export interface RatingSystem {
  readonly name: string;
  /** Update one player given an outcome and optional opponents */
  update(
    player: RatingState,
    outcome: Outcome,
    opponents?: RatingState[]
  ): RatingState;
  /** Conservative display score (e.g. μ − 3σ or r − 2·RD) */
  conservativeScore(state: RatingState): number;
}
