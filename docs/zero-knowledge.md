# Zero-Knowledge Proofs for Favor / P-more

## What They Are

A zero-knowledge proof (ZKP) lets you prove a statement is true without revealing the underlying information.

Classic example: Prove you know a password without sending the password.
For us: Prove “I am a unique human who has not voted on this favor yet” without revealing who you are.

## Why It Matters Here

Three places where privacy and verifiability collide:

1. **Sybil resistance / Proof-of-Personhood**  
   Prove uniqueness (or possession of a valid World ID / credential) without exposing biometrics or real-world identity.

2. **Private voting & “Why” text**  
   Prove a vote is well-formed and the voter is eligible while the actual Yes/No + Why stays hidden until the review threshold.

3. **Tip receipts & favor completion**  
   Prove a real payment or photo timestamp without exposing full transaction details or the image.

## Relevant Proof Families

| Type | Proof Size | Trusted Setup | Post-Quantum | Best Fit |
|------|------------|---------------|--------------|----------|
| zk-SNARKs (Groth16, PLONK, Halo2) | Very small | Usually yes | No | On-chain / mobile verification |
| zk-STARKs | Larger | No | Yes | Heavy computation, long-term security |
| Bulletproofs | Small–medium | No | No | Range proofs |
| Semaphore-style | Built on SNARKs | Depends | No | Anonymous group membership + signaling |

## Practical Tools

- **Semaphore** — Prove group membership + broadcast a signal without revealing which member.
- **World ID / Semaphore sets** — Unique personhood + one-time nullifier.
- **zkPassport / similar** — Prove attributes from a government ID without revealing the document.
- **zkTLS / web proofs** — Prove facts from ordinary websites without the site’s cooperation.
- **Microsoft Vega (2026)** — Sub-100 ms proofs of age/personhood on ordinary phones.

## Recommended Integration Path

**Phase 1**  
Optional World ID / Semaphore nullifier for high-stakes votes and full voice-credit budgets. Accounts without a PoP proof stay limited by IdentityScore.

**Phase 2**  
Private vote submission: prove eligibility + well-formed ballot + no prior vote, submit only encrypted ballot + proof.

**Phase 3**  
Selective disclosure of reputation (“my Credibility ≥ 70”) without revealing exact numbers or history.

## Trade-offs

- Proving time and battery cost on mobile (rapidly improving).
- Trusted-setup concerns for classic SNARKs (PLONK / Halo2 / STARKs reduce this).
- Circuit development and auditing complexity.
- Still need an initial uniqueness oracle (Orb, passport, social graph, etc.).
