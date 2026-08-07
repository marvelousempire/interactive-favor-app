# Semaphore Circuits for YONAW

We use the official, audited Semaphore circuits rather than re-implementing them.
This document describes the exact inputs, outputs, and constraints we rely on for favor voting.

## Circuit Goals

A single Semaphore proof must establish three things simultaneously:

1. The prover knows an identity commitment that is a leaf in the current group Merkle tree.
2. The nullifier hash was correctly derived from the prover’s private identity secret and the public external nullifier (favor ID).
3. The signal (vote commitment or hash of the vote payload) is bound to the proof so it cannot be swapped later.

## Public Inputs / Outputs

| Name | Direction | Description |
|------|-----------|-------------|
| `merkleRoot` | public | Current root of the identity commitment tree |
| `nullifierHash` | public | `hash(identitySecret, externalNullifier)` — used to prevent double-voting |
| `signal` | public | Hash of the vote payload (or the payload itself if small) |
| `externalNullifier` | public | Scope for this vote, typically `hash("yonaw-vote", favorId)` |

## Private Inputs

| Name | Description |
|------|-------------|
| `identitySecret` | Private scalar / nullifier of the Semaphore identity |
| `merkleProofSiblings` | Sibling hashes on the path from leaf to root |
| `merkleProofIndices` | Left/right path bits |

## Core Constraints (conceptual)

```circom
// 1. Reconstruct identity commitment from secret
signal identityCommitment <== Poseidon([identitySecret]);

// 2. Verify Merkle membership
component merkle = MerkleTreeInclusionProof(nLevels);
merkle.leaf <== identityCommitment;
merkle.root <== merkleRoot;
// ... wire siblings and path indices

// 3. Compute nullifier hash
signal nullifierHash <== Poseidon([identitySecret, externalNullifier]);

// 4. Bind the signal (dummy square or Poseidon hash to prevent malleability)
signal signalSquare <== signal * signal;
```

(The real Semaphore circuits use Poseidon and a carefully engineered Merkle inclusion gadget. The sketch above is only illustrative.)

## External Nullifier Convention for Favor

```ts
externalNullifier = poseidon(hash("yonaw-vote"), favorId)
```

One unique external nullifier per favor guarantees that a single identity can vote only once on that favor while remaining free to vote on every other favor.

## Integration Points

- Identity commitments live in a Semaphore group (Incremental Merkle Tree).
- Before a user can cast a high-value or full-credit vote, their commitment must be in the tree (gated by IdentityScore or an external PoP proof).
- On vote submission the client generates a Semaphore proof and sends:
  - the proof
  - `nullifierHash`
  - `merkleRoot` (or the group ID)
  - the encrypted / committed vote payload
- Backend / contract verifies the proof and records the nullifierHash so it cannot be reused.

## Security Notes

- Never re-use the same external nullifier across different semantic actions.
- Keep the Merkle root up-to-date; stale roots allow proofs against old membership sets.
- The nullifierHash must be stored and checked atomically with proof verification.
