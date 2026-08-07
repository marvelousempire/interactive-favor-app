/**
 * Example: Identity scoring in action
 */

import { calculateIdentityScore, getEffectiveVoiceCredits } from './index';

const newAccount = {
  createdAt: new Date().toISOString(),
  completedFavors: 0,
  reviewsGiven: 0,
  uniqueConnections: 0,
};

const growingAccount = {
  createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
  completedFavors: 6,
  reviewsGiven: 9,
  uniqueConnections: 8,
  proofOfPersonhood: { gitcoinPassport: 42 },
};

const strongAccount = {
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
  completedFavors: 28,
  reviewsGiven: 35,
  uniqueConnections: 22,
  proofOfPersonhood: { worldcoin: true, gitcoinPassport: 78 },
  stakeAmount: 12,
};

console.log('=== New Account ===');
console.log(calculateIdentityScore(newAccount));
console.log('Effective credits (base 100):', getEffectiveVoiceCredits(100, calculateIdentityScore(newAccount)));

console.log('\n=== Growing Account ===');
console.log(calculateIdentityScore(growingAccount));
console.log('Effective credits (base 100):', getEffectiveVoiceCredits(100, calculateIdentityScore(growingAccount)));

console.log('\n=== Strong Account ===');
console.log(calculateIdentityScore(strongAccount));
console.log('Effective credits (base 100):', getEffectiveVoiceCredits(100, calculateIdentityScore(strongAccount)));
