/**
 * Elo + μ/σ hybrid — explainable updates with TrueSkill-style uncertainty
 */

import { Outcome, RatingState, RatingSystem } from './types';

const DEFAULT_RATING = 1500;
const DEFAULT_SIGMA = 350 / 3; // rough parity with Glicko starting RD
const MIN_SIGMA = 50;
const BASE_K = 32;

export function createHybrid(baseK: number = BASE_K): RatingSystem {
  return {
    name: 'Elo-μ/σ Hybrid',

    update(player, outcome, opponents = []) {
      const mu = player.rating || DEFAULT_RATING;
      const sigma = Math.max(player.deviation || DEFAULT_SIGMA, MIN_SIGMA);
      const opp = opponents[0] ?? { rating: DEFAULT_RATING, deviation: DEFAULT_SIGMA };

      // Elo-style expected score
      const expected =
        1 / (1 + Math.pow(10, (opp.rating - mu) / 400));

      // K grows with uncertainty
      const k = baseK * (sigma / DEFAULT_SIGMA);
      const delta = k * (outcome.score - expected);

      // Shrink sigma after evidence (simple geometric decay)
      const newSigma = Math.max(MIN_SIGMA, sigma * 0.95);

      // Optional TrueSkill-2 style surrender
      const finalDelta =
        outcome.meta?.abandoned && outcome.score > 0 ? -Math.abs(delta) : delta;

      return {
        rating: Math.round((mu + finalDelta) * 10) / 10,
        deviation: newSigma,
        volatility: player.volatility,
        updatedAt: new Date().toISOString(),
      };
    },

    conservativeScore(state) {
      // μ − 3σ style (scaled to rating points)
      return state.rating - 3 * (state.deviation / 3);
    },
  };
}

export const Hybrid = createHybrid();
