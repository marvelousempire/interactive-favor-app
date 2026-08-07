# Quadratic Voting Exploration for YONAW

## What is Quadratic Voting?

Quadratic Voting (QV) lets people express **intensity of preference** rather than just direction.

- Every voter receives a fixed budget of **voice credits**.
- Cost of votes is quadratic:
  - 1 vote = 1 credit
  - 2 votes = 4 credits
  - 3 votes = 9 credits
  - 5 votes = 25 credits
  - 10 votes = 100 credits

Effective votes cast ≈ √(credits spent).

This creates a real trade-off: you can go deep on a few things you care about intensely, or spread influence across many weaker preferences.

## Why It Matters for Favor Valuation

Classic one-person-one-vote (or even a free 0–100 slider) does not force people to reveal true intensity. QV makes strong claims costly, which reduces cheap exaggeration and better surfaces genuine conviction.

It was formalized by Glen Weyl and others and has been tested in the Colorado legislature, Taiwan’s Presidential Hackathon, Gitcoin, and various DAO experiments.

## Strengths

- Captures conviction better than a free slider.
- Naturally limits whale influence (marginal cost rises linearly with votes).
- Encourages thoughtful allocation of limited influence.
- Works well across multiple dimensions (tiers, overall judgment, etc.).

## Weaknesses & Risks

- Sybil attacks: without strong identity, people can split accounts and regain linear power.
- Budget design is critical (too few or too many credits both break the mechanism).
- Cognitive load for some users.
- Collusion remains possible.

## Integration Options with YONAW

### Option A — Replace the slider
Keep Yes/No + Why + Light/Mixed/Dark tiers. Replace the 0–100 slider with quadratic votes on overall intensity.

### Option B — Hybrid (Recommended)
Keep the full qualitative structure. Let voters spend a small voice-credit budget to buy intensity. Final vote power becomes:

```
final_vote_power = qualitative_vote_strength × √(credits_spent) × (Credibility / 100)
```

### Option C — Reputation-modulated budget
Equal base voice credits for everyone (anti-plutocracy), with a modest extra allocation for high-Credibility users. Preserves the chain-of-responsibility spirit while adding intensity expression.

## Recommended Path

Adopt **Option B (Hybrid)** as the next iteration of YONAW:

1. Retain structured qualitative parts (Yes/No, Why, tiers, “if this then that”).
2. Introduce a limited voice-credit budget for intensity.
3. Multiply final vote power by √(credits spent) and by Credibility weight.

This keeps the reflective, human character of YONAW while giving people a real, costly way to signal strong conviction.

## Next Steps

- Define voice-credit budget size and refresh rules.
- Decide whether credits are purely ephemeral or linked to P-more / reputation.
- Prototype the UX for spending credits on intensity.
- Stress-test against Sybil and collusion scenarios.
