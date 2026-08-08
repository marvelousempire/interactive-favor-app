# Favor Moment Matrix — Product Investigation

**Status:** Investigation note, 2026-08-08.  
**Engine SoT:** `nephew/moment-matrix` (`@nephew/moment-matrix`) · SNF SCORE-NAMESPACES  
**Design overview:** [moment-matrix.md](./moment-matrix.md)  
**Formula detail:** [microslice-solvency-formula.md](./microslice-solvency-formula.md)

This document answers: **how does Favor consume Moment Matrix without turning counsel into ranking or permission?**

---

## Product job in Favor

When a user writes a favor claim, review, Why-text, or marketplace description, Favor may score that **utterance at a place and time** and attach a `moment_observation` as counsel and operational readiness input.

Moment Matrix does **not**:

- Replace YONAW aggregation
- Replace IdentityScore, Performance, Credibility, Reach, or Y-score
- Feed Ready Play Elo/Glicko engines
- Produce a person-level soul grade
- Authorize spend, ban, or rank mutation by itself

---

## Runtime sources Favor may call

| Source | Role |
|--------|------|
| `nephew/moment-matrix` `scorePrompt` | Canonical Node package — score + colors + EQ + optional capture |
| SNF `bin/moment-matrix.mjs` / profiles | Law + shared libraries |
| Presence browser lite | HUD only; must stay schema-compatible |
| Favor app shell | Future TS client calling package or API facade |

**Import path (target):** Favor service/API depends on `@nephew/moment-matrix` or a thin Favor adapter that returns validated `moment_observation` JSON. Do not fork the engine inside `interactive-favor-app`.

---

## What gets scored in Favor

| User text | Typical place_id | Why score |
|-----------|------------------|-----------|
| Favor claim / P-more description | `place:favor-claim` or user desk | Stencil completeness + intent match |
| YONAW Why field | `place:yonaw-vote` | Tone counsel; never vote weight from affect |
| Review body | `place:favor-review` | Review steward counsel |
| Marketplace listing copy | `place:marketplace` | Claim completeness / drift counsel |
| Support / dispute note | `place:dispute` | Policy path (clarify vs review-required) |

Always pass **real** `time_iso` + stable `place_id` for any stored research-grade row. Ephemeral UI previews may use defaults but must not pretend to be research captures.

---

## Namespace → Favor consumption contract

| Namespace | permitted_use | Favor may | Favor must not |
|-----------|---------------|-----------|----------------|
| `solvency.stencil_v1` | execution_input | Block publish UI until clarify path; show missing V/N/D/Q/T slots | Silently lower Performance or YONAW value |
| `intent.*` / VerbNoun match | interpretation | Suggest framing, route to help copy | Invent favor category as policy |
| `affect.*` | counsel_only | Overlay on review/Why HUD | Multiply vote power or IdentityScore |
| `philosophy.*` / `mindset.*` / `social.*` | counsel_only | Operator/steward insight | Rank people or leagues |
| `spiritual.*` | counsel_only | Only if user declared lens | Infer faith or punish |
| `semantic.confidence` | interpretation | Confidence badge on match | Treat as truth of favor done |
| `intent.policy_decision` | **authority** | Drive clarify vs review-required flows for high-impact actions | Be overridden by high valence |

**Hard rule:** No weighted average of affect + philosophy + social into a Favor “trust number.”

---

## Steward wiring

| Steward | primary_role | Matrix inputs |
|---------|--------------|---------------|
| Marketplace | `validator` | stencil_v1, intent match, policy |
| Review | `analyzer` | affect, social, philosophy (counsel), mode/mood cubes |
| Reputation | `analyzer` | trajectories stay product scores; Matrix is overlay only |
| YONAW | `validator` | policy + stencil on Why/claim; never affect→voice credits |
| Map | `visualizer` | place anchors only; not affect heat as authority |
| Ready Play | `analyzer` | **no Matrix axes in rating update** |

Consciousness text for stewards should name these channels ([senses-architecture.md](./senses-architecture.md), [favor-stewards.md](./favor-stewards.md)).

---

## Claim publish path (recommended)

```text
User drafts favor / P-more text
        │
        ▼  scorePrompt({ text, place_id, time_iso, capture? })
  moment_observation
        │
        ├─ stencil < 0.90 → UI: fill missing slots (needs-information)
        ├─ policy clarify → guided questions
        ├─ policy review-required → human/policy queue (not auto-ban)
        └─ policy pass + stencil OK → allow submit to existing Favor pipeline
                │
                ▼
         YONAW / reputation engines unchanged
         (Matrix attached as counsel artifact, optional)
```

Attachment model: store `moment_id` + hash of observation beside favor record; do not re-score history with new EQ presets without versioning.

---

## UI surfaces

| Surface | Shows |
|---------|--------|
| Claim composer | Stencil checklist + policy chip |
| Review / Why | Mood of Expression ruler (colors/tags) as counsel |
| Scoreboard Studio | Optional Matrix panel — separate from Performance/Y-score |
| Steward consoles | Same observation schema; no composite meter |
| Ready Play ladder | **Exclude** Matrix axes |

Instrument rack mounts: Mood of Expression cube, Mode of Expression cube, operational stencil meter — [instrument-rack.md](./instrument-rack.md).

---

## EQ presets in Favor

Operators may save presets (moral_compass, affect_gain, policy thresholds) for **study** of claims. Preset id must be recorded on the observation (`moment.eq`). Changing preset does not rewrite past product reputation scores.

---

## Swarm (optional later)

Nephew swarm workers (syntax, library, affect, philosophy, policy, color-tag, ledger) share one schema. Favor can start with synchronous `scorePrompt` only; fan-out later without API change.

Favor does **not** birth a second Matrix engine agent. Durable Favor stewards **consume** observations; Matrix package remains measurement service.

---

## Schema minimum Favor must accept

From `moment-observation.schema.json`:

- `kind: moment_observation`
- `moment_id`, `schema_version`
- `spatiotemporal.time_iso`, `spatiotemporal.place_id`
- `source.verbatim`, `source.hash_sha256`
- `scores[]` with `axis`, `namespace`, `profile_id`, `profile_version`, `permitted_use`
- `composite_soul_score: null`
- `composite_soul_score_forbidden: true`

Reject or quarantine any payload that ships a non-null composite soul score.

---

## Explicit non-goals for Favor

1. Matrix score as quadratic voice-credit multiplier  
2. Matrix score as Ready Play match outcome  
3. Auto IdentityScore boost from positive valence  
4. Spiritual scoring without declared lens  
5. Forking a second offline lexicon inside Favor that drifts from nephew package  

---

## Open work (Favor-specific)

| Item | Priority |
|------|----------|
| Adapter module `src/matrix/` or API route wrapping `scorePrompt` | P1 |
| Claim UI stencil checklist | P1 |
| Persist `moment_id` on favor/review records | P1 |
| Steward read models for counsel overlays | P1 |
| D/Q/T extraction improvement upstream (nephew) | P1 |
| Scoreboard Studio Matrix panel (no composite) | P2 |
| Capture log retention policy for favor privacy | P2 |
| EQ preset UX for operators only | P2 |

---

## Related

- [Moment Matrix design](./moment-matrix.md)
- [Microslice Solvency Formula](./microslice-solvency-formula.md)
- [Score Namespaces](./score-namespaces.md)
- [Instrument Rack](./instrument-rack.md)
- [Favor Stewards](./favor-stewards.md)
- [YONAW](./yonaw-algorithm.md)
- [Open Work](./open-work.md)
- Nephew: `moment-matrix/README.md`, `PHILOSOPHY.md`, `src/score.mjs`, `schemas/moment-observation.schema.json`
