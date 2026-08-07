/**
 * Proof generation / verification wrappers.
 *
 * These functions describe the exact interface we need.
 * In a real deployment they call @semaphore-protocol/proof and snarkjs.
 * Here they are structured stubs that make the data flow explicit.
 */

import {
  SemaphoreProofInputs,
  SemaphoreProof,
  MerkleProof,
} from './types';
import { computeNullifierHash } from './nullifier';

/**
 * Generate a Semaphore proof for a YONAW vote.
 *
 * Real implementation would be:
 *   import { generateProof } from '@semaphore-protocol/proof'
 *   return generateProof(identity, group, externalNullifier, signal)
 */
export async function generateYonawProof(
  inputs: SemaphoreProofInputs
): Promise<SemaphoreProof> {
  const { identity, merkleProof, externalNullifier, signal } = inputs;

  // In production the circuit computes this inside the ZK proof.
  // We compute it here only so the public signals are populated correctly.
  const nullifierHash = computeNullifierHash(identity.secret, externalNullifier);

  // Placeholder proof object. Replace with real snarkjs / Semaphore output.
  const proof = {
    pi_a: ['0', '0', '0'],
    pi_b: [['0', '0'], ['0', '0'], ['0', '0']],
    pi_c: ['0', '0', '0'],
    protocol: 'groth16',
    curve: 'bn128',
  };

  return {
    proof,
    publicSignals: {
      merkleRoot: merkleProof.root,
      nullifierHash,
      signal,
      externalNullifier,
    },
  };
}

/**
 * Verify a Semaphore proof.
 *
 * Real implementation would call verifyProof from @semaphore-protocol/proof
 * or a generated Solidity verifier.
 */
export async function verifyYonawProof(
  fullProof: SemaphoreProof,
  expectedRoot: bigint
): Promise<boolean> {
  // Structural checks only in this stub.
  if (fullProof.publicSignals.merkleRoot !== expectedRoot) {
    return false;
  }
  if (!fullProof.publicSignals.nullifierHash) {
    return false;
  }
  // Real code: return await verifyProof(fullProof, treeDepth)
  return true;
}

/**
 * Helper to build a Merkle proof structure from a group.
 * In production use group.generateMerkleProof(index) from @semaphore-protocol/group.
 */
export function buildMerkleProofPlaceholder(
  leaf: bigint,
  root: bigint,
  siblings: bigint[] = [],
  pathIndices: number[] = []
): MerkleProof {
  return { leaf, root, siblings, pathIndices };
}
