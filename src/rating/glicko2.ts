/**
 * Glicko-2 rating system (simplified single-opponent / period update)
 * Based on Mark Glickman’s specification.
 */

import { Outcome, RatingState, RatingSystem } from './types';

const SCALE = 173.7178;
const DEFAULT_RATING = 1500;
const DEFAULT_RD = 350;
const DEFAULT_VOL = 0.06;
const TAU = 0.5;

function g(phi: number): number {
  return 1 / Math.sqrt(1 + (3 * phi * phi) / (Math.PI * Math.PI));
}

function E(mu: number, muJ: number, phiJ: number): number {
  return 1 / (1 + Math.exp(-g(phiJ) * (mu - muJ)));
}

function toGlicko2(state: RatingState) {
  return {
    mu: (state.rating - DEFAULT_RATING) / SCALE,
    phi: state.deviation / SCALE,
    sigma: state.volatility ?? DEFAULT_VOL,
  };
}

function fromGlicko2(mu: number, phi: number, sigma: number): RatingState {
  return {
    rating: mu * SCALE + DEFAULT_RATING,
    deviation: phi * SCALE,
    volatility: sigma,
    updatedAt: new Date().toISOString(),
  };
}

/** Illinois / regula-falsi style volatility solve (simplified) */
function newVolatility(
  sigma: number,
  delta: number,
  phi: number,
  v: number,
  tau: number
): number {
  const a = Math.log(sigma * sigma);
  const f = (x: number) => {
    const ex = Math.exp(x);
    const num = ex * (delta * delta - phi * phi - v - ex);
    const den = 2 * Math.pow(phi * phi + v + ex, 2);
    return num / den - (x - a) / (tau * tau);
  };

  let A = a;
  let B: number;
  if (delta * delta > phi * phi + v) {
    B = Math.log(delta * delta - phi * phi - v);
  } else {
    let k = 1;
    while (f(a - k * tau) < 0) k++;
    B = a - k * tau;
  }

  let fA = f(A);
  let fB = f(B);
  for (let i = 0; i < 50; i++) {
    const C = A + ((A - B) * fA) / (fB - fA);
    const fC = f(C);
    if (fC * fB <= 0) {
      A = B;
      fA = fB;
    } else {
      fA /= 2;
    }
    B = C;
    fB = fC;
    if (Math.abs(B - A) < 1e-6) break;
  }
  return Math.exp(A / 2);
}

export function createGlicko2(tau: number = TAU): RatingSystem {
  return {
    name: 'Glicko-2',

    update(player, outcome, opponents = []) {
      const p = toGlicko2({
        rating: player.rating || DEFAULT_RATING,
        deviation: player.deviation || DEFAULT_RD,
        volatility: player.volatility ?? DEFAULT_VOL,
      });

      if (!opponents.length) {
        // inactivity: only RD grows
        const phiStar = Math.sqrt(p.phi * p.phi + p.sigma * p.sigma);
        return fromGlicko2(p.mu, phiStar, p.sigma);
      }

      const opp = opponents.map((o) => toGlicko2(o));
      let vInv = 0;
      let deltaSum = 0;
      for (let i = 0; i < opp.length; i++) {
        const o = opp[i];
        const Ej = E(p.mu, o.mu, o.phi);
        const gj = g(o.phi);
        vInv += gj * gj * Ej * (1 - Ej);
        deltaSum += gj * (outcome.score - Ej);
      }
      const v = 1 / vInv;
      const delta = v * deltaSum;

      const sigmaPrime = newVolatility(p.sigma, delta, p.phi, v, tau);
      const phiStar = Math.sqrt(p.phi * p.phi + sigmaPrime * sigmaPrime);
      const phiPrime = 1 / Math.sqrt(1 / (phiStar * phiStar) + 1 / v);
      const muPrime = p.mu + phiPrime * phiPrime * deltaSum;

      return fromGlicko2(muPrime, phiPrime, sigmaPrime);
    },

    conservativeScore(state) {
      // r − 2·RD ≈ 95% lower bound
      return state.rating - 2 * state.deviation;
    },
  };
}

export const Glicko2 = createGlicko2();
