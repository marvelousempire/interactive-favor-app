/**
 * Semaphore integration for YONAW voting.
 *
 * This module provides typed wrappers around the official Semaphore protocol.
 * It does NOT re-implement the circuits; it documents and interfaces with them.
 */

export * from './types';
export {
  poseidonHash,
  buildYonawExternalNullifier,
  computeNullifierHash,
  isNullifierUsed,
} from './nullifier';
export {
  generateYonawProof,
  verifyYonawProof,
  buildMerkleProofPlaceholder,
} from './proof';
