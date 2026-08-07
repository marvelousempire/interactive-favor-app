/**
 * Classic Elo rating system
 */

import { Outcome, RatingState, RatingSystem } from './types';

const DEFAULT_K = 32;
const DEFAULT_RATING = 1500;

export function createElo(k: number = DEFAULT_K): RatingSystem {
  return {
    name: 'Elo',

    update(player, outcome, opponents = []) {
      const opponent = opponents[0] ?? { rating: DEFAULT_RATING, deviation: 0 };
      const expected =
        1 / (1 + Math.pow(10, (opponent.rating - player.rating) / 400));
      const delta = k * (outcome.score - expected);
      return {
        ...player,
        rating: Math.round((player.rating + delta) * 10) / 10,
        deviation: player.deviation, // Elo has no native deviation
        updatedAt: new Date().toISOString(),
      };
    },

    conservativeScore(state) {
      return state.rating;
    },
  };
}

export const Elo = createElo();
