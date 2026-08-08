# Verb Favors and Noun Favors

**Status:** Product taxonomy, 2026-08-08.  
**Parent:** [favor-product.md](./favor-product.md)  
**Related:** [favor-barter-solvency.md](./favor-barter-solvency.md) · [microslice-solvency-formula.md](./microslice-solvency-formula.md)

---

## Why the split

A favor is either an **action performed** or a **thing / access provided**. The UI and the contract template should make that choice first so both parties know what is being locked.

```text
Favor type
├── Verb  → someone does X
└── Noun  → someone provides Y
```

This is independent of the Microslice stencil (Verb·Noun·Destination·Quality·Time), which measures **intent completeness**. Here Verb / Noun is the **economic object** of the trade.

---

## Verb favor — action

Someone is obligated to **perform**.

| Example | Locked obligation |
|---------|-------------------|
| Cook | "Marcus cooks for Maya at her private gathering by DATE" |
| Introduce | "Marcus introduces Maya to Mark within 30 days" |
| Play | "Keyboard player performs at the picnic (pro favor)" |
| Endorse | "Pastor writes / speaks a public endorsement" |
| Appear | "Provider appears at the book reading" |
| Bring | "Provider brings [named person] to the event" |

**Shape of the record**

- Actor (who performs)
- Action (verb)
- Object / audience (for whom / on what)
- Destination / place when relevant
- Quality constraints (how)
- Time window (by when)
- Witness / proof requirement on completion

---

## Noun favor — provision

Someone is obligated to **supply**.

| Category | Examples |
|----------|----------|
| Place | Warehouse slot, studio night, table at a restaurant, venue access |
| Thing | Model car, real car for a weekend, equipment loan |
| Person / capacity | Assistant for a day, concierge, named introduction as a deliverable |
| Access | Free drinks at a bar, tickets, backstage, discount rights |
| Media / artifact | Signed letter, recorded shout-out, portfolio credit |

**Shape of the record**

- Provider
- Noun (what is provided)
- Quantity / duration / conditions
- Handoff place and time
- Proof of delivery (photo, receipt, check-in, third-party confirm)

---

## UI tabs (product intent)

When browsing another party's **proposed favors as payment**:

| Tab | Shows |
|-----|--------|
| **Verb** | Actions they are willing to perform as compensation |
| **Noun** | Things / access they are willing to provide as compensation |

Selecting one (or more) builds a mixed settlement offer: cash percentage + chosen favors.

---

## Relation to Microslice stencil

| Concept | Role |
|---------|------|
| Product Verb / Noun | What kind of economic object is being traded |
| Stencil Verb · Noun · Destination · Quality · Time | Whether the **intent string** is solvent enough to lock (≥ 0.90) |

A verb favor still needs a solvent stencil when written as an intent. A noun favor is written as a provision intent and still benefits from Destination / Quality / Time clarity.

---

## Hard rules

1. **Missing stays not-measured.** Do not invent a noun value or an action completion.
2. **Proof before high value.** Self-claimed "this appearance is worth $80k" without delivery history is not accepted at face value.
3. **Timeline required.** Unbounded obligations rot; every locked favor has an expiry or redeem-by window.
4. **Pro favor ≠ pro bono.** The record is a trade, not charity theater.

---

## Related

- [What Favor Is](./favor-product.md)
- [Favor Barter & Solvency](./favor-barter-solvency.md)
- [Microslice Solvency Formula](./microslice-solvency-formula.md)
