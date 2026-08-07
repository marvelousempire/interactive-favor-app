/**
 * Types for Semaphore integration with YONAW voting.
 * These mirror the public/private inputs expected by the official circuits.
 */

export type BigNumberish = string | number | bigint;

export interface SemaphoreIdentity {
  /** Private secret scalar (never leave the client) */
  secret: bigint;
  /** Public identity commitment (leaf in the Merkle tree) */
  commitment: bigint;
}

export interface MerkleProof {
  root: bigint;
  leaf: bigint;
  siblings: bigint[];
  pathIndices: number[]; // 0 = left, 1 = right
}

export interface SemaphoreProofInputs {
  identity: SemaphoreIdentity;
  merkleProof: MerkleProof;
  /** Public scope — for us usually hash("yonaw-vote", favorId) */
  externalNullifier: bigint;
  /** Public signal — hash of the vote payload or the payload itself */
  signal: bigint;
}

export interface SemaphoreProof {
  /** Full proof object returned by the proving system (snarkjs / Semaphore) */
  proof: any;
  publicSignals: {
    merkleRoot: bigint;
    nullifierHash: bigint;
    signal: bigint;
    externalNullifier: bigint;
  };
}

export interface VoteNullifierRecord {
  favorId: string;
  nullifierHash: string; // hex or decimal string
  merkleRoot: string;
  submittedAt: string; // ISO timestamp
}
