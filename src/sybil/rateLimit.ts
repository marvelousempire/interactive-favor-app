/**
 * Basic rate limiting helpers for Sybil resistance.
 * These are intended to be called from the API / backend layer.
 */

import { RateLimitConfig } from './types';

export const DEFAULT_RATE_LIMITS: RateLimitConfig = {
  maxAccountsPerDevicePerDay: 2,
  maxVotesPerAccountPerHour: 12,
  minAccountAgeHoursBeforeFullCredits: 24,
};

export interface RateLimitState {
  accountCreationsToday: number;
  votesThisHour: number;
  accountAgeHours: number;
}

export function checkAccountCreationAllowed(
  state: RateLimitState,
  config: RateLimitConfig = DEFAULT_RATE_LIMITS
): { allowed: boolean; reason?: string } {
  if (state.accountCreationsToday >= config.maxAccountsPerDevicePerDay) {
    return {
      allowed: false,
      reason: `Device has already created ${config.maxAccountsPerDevicePerDay} accounts today`,
    };
  }
  return { allowed: true };
}

export function checkVotingAllowed(
  state: RateLimitState,
  config: RateLimitConfig = DEFAULT_RATE_LIMITS
): { allowed: boolean; reason?: string } {
  if (state.votesThisHour >= config.maxVotesPerAccountPerHour) {
    return {
      allowed: false,
      reason: `Account has reached the hourly vote limit (${config.maxVotesPerAccountPerHour})`,
    };
  }
  return { allowed: true };
}

export function isFullCreditsEligible(
  state: RateLimitState,
  config: RateLimitConfig = DEFAULT_RATE_LIMITS
): boolean {
  return state.accountAgeHours >= config.minAccountAgeHoursBeforeFullCredits;
}
