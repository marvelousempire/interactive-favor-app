# Moment Matrix — Design Investigation

**Product name:** Moment Matrix  
**Ruler name:** The Mood of Expression Ruler  
**Source of truth (profiles & law):** `philosophy-semantic-node-framework`  
**Runnable package:** `nephew/moment-matrix` (`@nephew/moment-matrix`)  
**CLI:** `node bin/moment-matrix.mjs score|describe|library`  
**This document:** Favor-side design synthesis from engine, schema, and SCORE-NAMESPACES.

---

## Purpose

Given a human utterance at an **exact place** and **exact moment**, produce a reproducible multi-axis measurement that is honest about uncertainty and refuses to launder scores into permission.

It studies how speech carries intention, emotion, philosophy, mindset, social load, and operational readiness. It is never a soul score and never a moral ranking of a person.

---

## Hard laws (SCORE-NAMESPACES)

1. **Missing ≠ 0 ≠ neutral.** `unknown`, `not-applicable`, and `not-measured` stay distinct.
2. **No composite soul score.** `composite_soul_score` is always `null`; schema requires `composite_soul_score_forbidden: true`.
3. **Scores counsel; policy authorizes; witnesses prove.**
4. **Spiritual only under operator-declared lens.** System never invents a spiritual identity.
5. **Place + time required** for research-grade comparability.
6. **Cross-namespace averaging forbidden** unless a reviewed profile defines the formula and version.

---

## Pipeline

```text
utterance (place + time)
  → tokenize
  → library match (VerbNoun / tokens / verbs / nouns)
  → stencil_v1 slots (Verb · Noun · Destination · Quality · Time)
  → multi-axis scores under EQ params / preset
  → color + tags per axis
  → moment_observation (+ optional capture log)
```

Public entry: `scorePrompt` in `moment-matrix/src/score.mjs` wraps `scoreMoment` (engine), colors, EQ dials, and optional JSONL capture.

Browser twin lives in Presence (`presence-moment-matrix-lite.ts` + `MomentMatrixHud`) and must stay schema-compatible.

---

## Axes and namespaces

| Axis | Namespace examples | Profile / source | `permitted_use` |
|------|--------------------|------------------|-----------------|
| Emotion / Affect | `affect.valence`, `affect.arousal` (`affect.dominance` reserved) | `affect-lexicon-v1` | counsel_only |
| Philosophy | `philosophy.fit`, `philosophy.tension`, `philosophy.moral_compass` (EQ dial) | `philosophy-prudence-sovereign-v1` | counsel_only |
| Mindset | `mindset.orientation` | `mindset-precision-execution-v1` | counsel_only |
| Social | `social.context_fit`, `social.relational_load` | `social-staff-agent-v1` | counsel_only |
| Spiritual | `spiritual.resonance` | operator-declared lens only | counsel_only |
| Semantic | `semantic.confidence`, `semantic.importance` | library match | interpretation |
| Operational | `solvency.stencil_v1` | Verb+Noun(+D/Q/T) completeness | execution_input |
| Policy | `intent.policy_decision` | enum: pass / clarify / review-required | **authority** |

### Affect scoring (engine)

- Compact offline lexicon; valence −1…+1, arousal 0…1.
- No hits → both axes `not-measured` (value null).
- Confidence scales with hit count (~0.35 + 0.12×n, capped).
- Always counsel_only. Not full AFINN/NRC.

### Philosophy / mindset / social

Keyword profiles with base + positive/negative weights:

- Philosophy: base 0.45, +0.12 / pos, −0.15 / neg → fit + tension.
- Mindset: precision vs vague tokens; vague hits weigh harder than precision.
- Social: collaborative vs hostile → context_fit + relational_load proxy.

### Operational stencil (`solvency.stencil_v1`)

Doctrine weights (PHILOSOPHY / research program):

| Slot | Weight |
|------|--------|
| Verb | 0.25 (engine offline currently uses 0.35 for V/N practical detect) |
| Noun | 0.25 (engine offline 0.35) |
| Destination | 0.25 (often not auto-filled offline) |
| Quality | 0.125 |
| Time | 0.125 |

Pass stencil ≥ **0.90** only when slots are filled. Offline tool honestly leaves D/Q/T incomplete → status `needs-information` until filled.

### Policy (`intent.policy_decision`)

- Destructive cues → `review-required`
- Weak/no library match → `clarify`
- Strong match with pass hint → `pass`
- Notes always stress: affect scores do not authorize.

---

## moment_observation schema (core)

Required fields include:

- `schema_version`, `kind: moment_observation`, `moment_id`
- `spatiotemporal` — `time_iso`, `place_id` (required); zone, kind, label optional
- `source` — `verbatim`, `hash_sha256`, tokens
- `scores[]` — each cell: axis, namespace, profile_id, profile_version, permitted_use; value/confidence/missing/lens/notes
- `composite_soul_score: null`
- `composite_soul_score_forbidden: true`

Also carries intent best_match / candidates, authority, limitations[], research_claim, optional mood_of_expression summary and EQ preset used.

---

## Profiles on disk

Shared between SNF `profiles/moment-matrix/` and nephew `moment-matrix/library/`:

| File | Role |
|------|------|
| `affect-lexicon-v1.json` | V/A word list |
| `intent-library-v1.json` | VerbNoun entries + valid_intent + policy_hint |
| `philosophy-prudence-sovereign-v1.json` | Prudence/contracts lens |
| `mindset-precision-execution-v1.json` | Precision vs vague |
| `social-staff-agent-v1.json` | Collaborative vs hostile |

Intent library examples: ClassifyIntake, UnderstandWant, ShipToMain, OpenDoor, MeasureMoment, TeachNephew, HealSelf, PreserveMeaning.

---

## Operator surface (Mood of Expression Ruler)

Not one number. A ruler of:

1. Library hits  
2. Stencil completeness  
3. Axis scores with **color** and **tag**  
4. Policy decision  
5. EQ preset used  

EQ dials (philosophy base, moral compass, mindset, social, affect_gain, policy thresholds) save as named presets for reusable evaluation — like an equalizer for studying speech, not a personality grade.

Presence HUD (`MomentMatrixHud`) shows the same axes live.

---

## Swarm path

Eligible workers (see `moment-matrix/swarm/AGENTS.md`): syntax, library, affect, philosophy, policy, color-tag, ledger. They share one `moment_observation` schema. Nephew can commission the swarm; Presence shows the ruler.

---

## Product relevance to Favor + ReadyPlay + instrument rack

| Matrix output | Favor use | Permitted use |
|---------------|-----------|---------------|
| Intent / VerbNoun match | Favor description routing, claim framing | interpretation |
| `solvency.stencil_v1` | Claim completeness / routing readiness | execution_input |
| Affect + social | Counsel overlays on reputation / YONAW context | counsel_only |
| Philosophy / mindset | Review and operator insight | counsel_only |
| `intent.policy_decision` | High-impact action gate | authority |

These axes productize as **instruments** on the instrument rack (Mood of Expression cube, Mode of Expression cube, Honesty family, operational stencil). See [Instrument Rack](./instrument-rack.md) and [Instruments Library](./instruments-library.md).

Never average emotion/philosophy/mindset into a single permission number.

---

## Gaps and honest limitations (from engine)

1. Affect lexicon is compact baseline, not full AFINN/NRC.
2. `affect.dominance` reserved in SCORE-NAMESPACES but not populated by lexicon yet.
3. Offline stencil does not auto-fill Destination / Quality / Time.
4. Spiritual axis stays not-measured without `spiritual_lens_id`.
5. Browser Presence lite scorer must stay schema-compatible with package engine.
6. Explicit Favor consumption contracts per namespace still open work.

---

## Related

- SNF: `contracts/SCORE-NAMESPACES.md`, `RESEARCH-PROGRAM.md`, `profiles/moment-matrix/`
- Nephew package: `moment-matrix/` (`engine-snf.mjs`, `score.mjs`, `schemas/moment-observation.schema.json`)
- Favor: [Emotion Modeling](./emotion-modeling.md), [Instrument Rack](./instrument-rack.md), [Instruments Library](./instruments-library.md), [Senses Architecture](./senses-architecture.md)
