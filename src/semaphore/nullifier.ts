/**
 * Nullifier helpers for YONAW + Semaphore.
 *
 * In production these functions would call the real Poseidon hash
 * used by the Semaphore circuits. Here we provide a clear interface
 * and a deterministic placeholder so the rest of the system can be wired.
 */

import { BigNumberish } from './types';

/**
 * Placeholder Poseidon-style hash.
 * Replace with the real Poseidon implementation from @semaphore-protocol/identity
 * or poseidon-lite before any production use.
 */
export function poseidonHash(inputs: bigint[]): bigint {
  // Deterministic but NOT cryptographically secure placeholder.
  // In real code: return poseidon(inputs);
  let h = 0n;
  for (const x of inputs) {
    h = (h * 31n + x) % 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
  }
  return h;
}

/**
 * Build the external nullifier for a YONAW vote on a specific favor.
 */
export function buildYonawExternalNullifier(favorId: string): bigint {
  // In production use a proper string-to-field conversion + Poseidon.
  const favorBig = BigInt('0x' + Buffer.from(favorId).toString('hex').slice(0, 16) || '0');
  const domain = BigInt('0x' + Buffer.from('yonaw-vote').toString('hex').slice(0, 16));
  return poseidonHash([domain, favorBig]);
}

/**
 * Compute the nullifier hash that will be stored to prevent double-voting.
 * nullifierHash = Poseidon(identitySecret, externalNullifier)
 */
export function computeNullifierHash(
  identitySecret: bigint,
  externalNullifier: bigint
): bigint {
  return poseidonHash([identitySecret, externalNullifier]);
}

/**
 * Check whether a nullifier hash has already been used for a favor.
 * In production this would query a database or on-chain mapping.
 */
export function isNullifierUsed(
  nullifierHash: bigint,
  usedSet: Set<string>
): boolean {
  return usedSet.has(nullifierHash.toString());
}
