# Favor Barter and Solvency — Cash, Escrow, and Favors as Payment

**Status:** Product model, 2026-08-08.  
**Parent:** [favor-product.md](./favor-product.md)  
**Related:** [verb-noun-favors.md](./verb-noun-favors.md) · [yonaw-algorithm.md](./yonaw-algorithm.md) · [microslice-solvency-formula.md](./microslice-solvency-formula.md)

---

## Problem

Cash prices flatten asymmetric network value. Bringing a well-connected person to an event may cost the provider almost nothing and save the receiver tens of thousands. Informal favors also vanish: people help and never collect.

Favor treats **favors as a settlement currency** alongside cash, with proof and reputation so numbers cannot be invented.

---

## Asymmetric value (canonical example)

| Party | Cash view | Network view |
|-------|-----------|--------------|
| Receiver | Would pay ~$50,000 for that introduction / appearance | Huge leverage |
| Provider | Marginal cost near $0 (they already know the person) | Cheap to give |
| Settlement on Favor | e.g. $1,000 cash + locked favor obligation | Both win vs pure cash quote |

The system does not force the $50,000 number. It locks the **obligation**, records **proof of delivery**, and lets YONAW / receipts discipline claimed worth after the fact.

---

## Settlement modes

### 1. Full cash
Standard invoice. No favor leg.

### 2. Mixed barter (cash + favors)
Payer publishes a **proposed-favors catalog** (verb tab + noun tab). Payee bills a cash rate and may accept a percentage in cash plus one or more listed favors.

Example:

- Quoted job: $10,000
- Settlement: 20% cash ($2,000) + two accepted favors from the payer's catalog
- Remaining risk sits in the locked obligations and their timelines

### 3. Favor-primary with cash escrow alternative
Provider declines cash as the primary reward and accepts a locked favor from the counterparty. Optionally, the cash that would have been paid sits in **escrow**:

- Holder of the favor credit may **redeem the obligation** (call the favor), or
- **Claim the escrow cash** instead (if the product rules allow cash-out on that credit)

Design intent: the favor leg should usually be *more attractive* than taking the escrow when the counterparty's network is real — otherwise everyone just takes cash and the product collapses to payments.

---

## Proposed-favors catalog

Each user (or org) maintains favors they are willing to use **as compensation**:

| Field | Purpose |
|-------|---------|
| Type | Verb or Noun |
| Description | Solvent intent (stencil-friendly) |
| Suggested value band | Soft guidance only; not gospel |
| Proof basis | Past deliveries, role, public evidence |
| Capacity / limits | How many open, cooldown |
| Timeline when accepted | Redeem-by window |

Payees browse Verb / Noun tabs and multi-select what they will accept toward the bill.

---

## Proof requirements (anti-inflation)

Without proof, a nobody can list "appear at your party — value $80,000."

Rules of thumb for product policy:

1. **High claimed value requires history** — prior fulfilled favors, credible Reach, or external receipts.
2. **First-time high-value noun/verb** stays capped or marked `unproven` until delivered once.
3. **YONAW + tip receipts** remain the community valuation path after completion (see tech-spec: high scores that claim tips need verifiable receipt).
4. **Credibility / chain-of-responsibility** punishes false reviews of favor quality.

Moment Matrix and stencil gate **clarity of the lock**, not the dollar fantasy.

---

## Solvency language

In product speech, accepting favors toward a bill is accepting them **for solvency** — closing the economic gap of the deal without only cash.

| Term | Meaning here |
|------|----------------|
| Solvency (settlement) | The deal can close: cash and/or locked favors cover the quote |
| Solvency (stencil) | The intent string fills Verb·Noun·Destination·Quality·Time ≥ 0.90 |

Do not conflate the two in UI copy. Settlement solvency ≠ stencil solvency.

---

## Lifecycle of a locked favor payment

```text
Offer (cash % + catalog picks)
        │
        ▼
Accept → lock obligations + optional escrow
        │
        ▼
Fulfill verb/noun → witness / proof
        │
        ▼
YONAW / reputation update on the completed leg
        │
        ▼
Credit closed · or escrow claimed · or expired under policy
```

---

## Non-goals

- Not a general escrow bank for arbitrary disputes outside favor legs.
- Not legal advice; enforceability of honor contracts is a jurisdiction-specific open question.
- Not a path to launder affect scores into payment authority.
- Not automatic valuation of celebrity proximity without proof.

---

## Open work

1. Data model for proposed-favors catalog + acceptance lines on an invoice.
2. Escrow provider choice (platform-held vs third-party).
3. Expiry and breach policy UX (what happens when the verb is not performed).
4. Caps and proof tiers for first-time high-value claims.
5. Tax/reporting hooks — deferred.

---

## Related

- [What Favor Is](./favor-product.md)
- [Verb / Noun Favors](./verb-noun-favors.md)
- [YONAW Algorithm](./yonaw-algorithm.md)
- [Tech Spec §2.11 Marketplace & Honor Contracts](./tech-spec.md)
- [Microslice Solvency Formula](./microslice-solvency-formula.md)
