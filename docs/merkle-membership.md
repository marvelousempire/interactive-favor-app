# Merkle Tree Membership Proofs

## What a Merkle Tree Is

A binary tree of hashes:

- Leaves = the data items (identity commitments in our case).
- Every parent = hash of its two children.
- Single top value = the **Merkle root** (compact fingerprint of the entire set).

Any change to a leaf changes the root.

## Membership (Inclusion) Proof

Answers: “Is this specific leaf part of the set represented by this root?” without requiring the verifier to hold the whole tree.

**Proof contents:**
- The leaf value (or its hash)
- Sibling hashes along the path from leaf to root
- Path information (left/right at each level)

**Verification:**
1. Start with the leaf.
2. Hash it with its first sibling (correct order).
3. Hash the result with the next sibling.
4. Repeat until the top.
5. If the final hash equals the known root → the leaf is in the tree.

Proof size is ~log₂(n) hashes. A tree of 1 million members needs only ~20 hashes.

## Inside Zero-Knowledge Circuits (Semaphore)

In the clear, the verifier sees the leaf and path, so they learn *which* member you are.

In a ZK circuit the membership check is performed privately:

- Circuit receives leaf, sibling path, and root.
- Recomputes the root.
- Proves the recomputed root matches the public root **without revealing the leaf or the path**.

Outsiders only learn: “Someone who is in this Merkle tree produced a valid proof” plus the nullifier hash.

## Application to Favor

A Merkle tree whose leaves are identity commitments of verified users (or users above a certain IdentityScore).

When voting:

1. Generate a Merkle membership proof for your own leaf.
2. Feed the proof + private identity secrets into the Semaphore circuit.
3. Circuit proves:
   - “I know a leaf that is in the current root”
   - “I correctly derived this nullifier hash from my private identity + the favor’s external nullifier”
4. Only the proof + nullifier hash + (encrypted) vote are published.

The system learns that a legitimate member voted exactly once, and nothing more.

## Key Properties

- Compact (logarithmic size)
- Efficient to verify (handful of hashes)
- Tamper-evident (any set change changes the root)
- ZK-friendly (entire verification can live inside a circuit so the leaf stays hidden)
