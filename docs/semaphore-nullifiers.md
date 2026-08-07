# Semaphore Nullifier Mechanics

## The Problem

In an anonymous system you need two things at once:

1. Prove you are a legitimate member of a group (without revealing *which* member).
2. Prevent the same person from acting twice (double-voting, double-signaling).

A normal identifier would break anonymity. The nullifier is the cryptographic solution.

## Three Related Concepts

| Term | What it is | Visibility |
|------|------------|------------|
| **Identity Nullifier** (secret) | Private random value belonging to the user | Private |
| **External Nullifier** (scope) | Public value that defines the context / topic | Public |
| **Nullifier Hash** | `hash(identityNullifier, externalNullifier)` | Public (stored) |

## How It Works

1. User generates an identity locally (secret → identity commitment) and inserts the commitment into a Merkle tree.
2. When acting, the user (or system) supplies an **external nullifier** for that context:
   - `favorId-12345` → one vote per favor
   - `daily-voice-credits-2026-08-07` → one credit claim per day
3. Inside the ZK circuit:
   ```
   nullifierHash = hash(identityNullifier, externalNullifier)
   ```
   The circuit also proves the user knows a valid identity in the Merkle tree and that the nullifierHash was derived correctly.
4. The system stores every seen nullifierHash for that external nullifier.
   - First time → accepted
   - Second time → rejected

Because the nullifierHash is derived from a secret the user never reveals, two different actions by the same person across *different* external nullifiers cannot be linked. Within the same external nullifier, reuse is impossible.

## Why the External Nullifier Matters

It acts like a “voting booth”:

- Same person + same external nullifier → same nullifierHash → blocked
- Same person + different external nullifier → different nullifierHash → allowed

One identity can therefore vote on many favors (each favor has its own external nullifier) but cannot vote twice on the same favor.

## Mapping to YONAW

```
externalNullifier = hash("yonaw-vote", favorId)
```

The voter submits a Semaphore proof containing the nullifierHash. The backend checks:

1. The ZK proof is valid (member of the allowed set).
2. This nullifierHash has never been seen for this favorId.

If both pass, the vote is accepted and the nullifierHash is recorded. The actual Yes/No + Why can remain encrypted or hidden until the review threshold.

## Key Properties

- Anonymity: the nullifierHash reveals nothing about the identity.
- Uniqueness per context: one action per external nullifier per identity.
- Reusable identity: the same person can participate in many contexts.
- No trusted party needed for the uniqueness check once the identity is in the tree.
