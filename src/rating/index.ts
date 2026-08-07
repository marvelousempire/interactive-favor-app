/**
 * Pluggable rating engines for Ready Play & Scoreboard Studio
 */

export * from './types';
export { Elo, createElo } from './elo';
export { Glicko2, createGlicko2 } from './glicko2';
export { Hybrid, createHybrid } from './hybrid';

import { Elo } from './elo';
import { Glicko2 } from './glicko2';
import { Hybrid } from './hybrid';
import { RatingSystem } from './types';

/** Registry used by Scoreboard Studio / Ready Play */
export const ratingEngines: Record<string, RatingSystem> = {
  elo: Elo,
  'glicko-2': Glicko2,
  hybrid: Hybrid,
};

export function getRatingEngine(name: string): RatingSystem {
  const engine = ratingEngines[name.toLowerCase()];
  if (!engine) {
    throw new Error(`Unknown rating engine: ${name}`);
  }
  return engine;
}
