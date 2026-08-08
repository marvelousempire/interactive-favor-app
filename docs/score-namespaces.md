# Score Namespaces — Favor-Side Contract

**Canonical law:** `philosophy-semantic-node-framework/contracts/SCORE-NAMESPACES.md`  
**Runnable consumer:** `nephew/moment-matrix`  
**This document:** Favor-facing summary so product code never invents forbidden composites.

---

## Hard laws

1. Every numeric value declares namespace, range, direction, source, version, confidence, missing-data policy, and permitted use.
2. Missing ≠ 0 ≠ neutral. `unknown`, `not-applicable`, `not-measured` stay distinct.
3. **No default composite soul score.** Emotion + philosophy + mindset + spiritual + social must not be averaged into permission.
4. Scores counsel; policy authorizes; witnesses prove.
5. Spiritual / cultural axes only under named, versioned, operator-chosen lens.
6. Cross-namespace averaging only under a reviewed profile formula with version recorded.

---

## Namespace groups Favor cares about

### Affect (counsel only)

| Namespace | Range | Notes |
|-----------|-------|-------|
| `affect.valence` | −1…+1 typical | Never moral worth |
| `affect.arousal` | 0…1 typical | Never urgency to execute |
| `affect.dominance` | reserved | Not yet populated by lexicon |

### Philosophy · mindset · social · spiritual (counsel)

| Namespace | Notes |
|-----------|-------|
| `philosophy.fit` / `philosophy.tension` | Named profile only |
| `mindset.orientation` | Precision vs vague |
| `social.context_fit` / `social.relational_load` | Role context, not stereotype |
| `spiritual.resonance` | Declared lens only or not-measured |

### Semantic (interpretation)

| Namespace | Notes |
|-----------|-------|
| `semantic.confidence` | Interpretation confidence |
| `semantic.importance` | Context relevance, not global importance |

### Operational / intent (engineering)

| Namespace | Notes |
|-----------|-------|
| `solvency.stencil_v1` | Verb·Noun·Destination·Quality·Time completeness; execution_input |
| `intent.policy_decision` | pass / clarify / review-required — **authority** |
| `routing.confidence` | Route confidence, not semantic truth |
| `priority.weight` | Scheduling under named policy, not human value |

### Spatiotemporal anchors

| Field | Required for research-grade scores |
|-------|-------------------------------------|
| `time_iso` + zone | Yes |
| `place_id` + kind | Yes |

### Core Favor product scores (separate family)

These are **product reputation / competitive scores**, not Moment Matrix axes. They still must not be mixed into a soul score:

- Performance, Credibility, Reach, Y-score
- IdentityScore
- Ready Play ratings (Elo / Glicko-2 / hybrid)
- YONAW aggregated favor value

---

## Permitted-use vocabulary

| Value | Meaning |
|-------|--------|
| `counsel_only` | Inform judgment only |
| `interpretation` | Semantic understanding |
| `execution_input` | Operational readiness input |
| `authority` | Policy disposition only |

---

## Related

- [Moment Matrix](./moment-matrix.md)
- [Instrument Rack](./instrument-rack.md)
- [Emotion Modeling](./emotion-modeling.md)
- [Scoreboard](./scoreboard.md)
