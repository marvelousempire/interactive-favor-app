# Moment Matrix — Multi-Axis Measurement for Lived Meaning

**Source of truth (profiles & engine):** `philosophy-semantic-node-framework`  
**Runnable tool:** `node bin/moment-matrix.mjs`  
**This document:** Favor-side synthesis so every axis is counted for product fusion.

---

## Purpose

Given a human utterance *at an exact place and exact moment*, produce a reproducible multi-axis measurement matrix that is honest about uncertainty and refuses to launder scores into permission.

Axes currently measured:

| Axis | Namespace examples | Profile | Use |
|------|--------------------|---------|-----|
| Emotion / Affect | `affect.valence`, `affect.arousal` | `affect-baseline-v1` | counsel only |
| Philosophy | `philosophy.fit`, `philosophy.tension` | `phil-prudence-sovereign-v1` | counsel only |
| Mindset | `mindset.orientation` | `mindset-precision-execution-v1` | counsel only |
| Social | `social.context_fit`, `social.relational_load` | `social-staff-agent-v1` | counsel only |
| Spiritual | `spiritual.resonance` | operator-declared lens only | counsel only |
| Semantic | `semantic.confidence`, `semantic.importance` | library match | interpretation |
| Operational | `solvency.stencil_v1` | Verb+Noun completeness | execution input |
| Policy | `intent.policy_decision` | enum | authority |

**Hard laws**
- Missing ≠ 0 ≠ neutral
- No default composite “soul score”
- Scores counsel; policy authorizes; witnesses prove
- Spiritual axis refused unless operator declares a lens

---

## Profiles in detail

### Affect lexicon (`affect-lexicon-v1.json`)
- Compact offline word list with **valence (−1…+1)** and **arousal (0…1)**
- Explicitly *not* full AFINN/NRC
- No hits → both axes marked `not-measured`
- Confidence scales with number of hits
- Always `permitted_use: counsel_only`

### Philosophy (`philosophy-prudence-sovereign-v1.json`)
- Lens: `lens:prudence-and-contracts`
- Positive: prudence, contract, verify, witness, fail-closed, preserve, meaning, sovereign, receipt, proof, root-cause…
- Negative: hack, temporary, patch, bypass, fake, shortcut, force-push, soul-score, invent-id, scam…
- Base 0.45 · +0.12 / positive hit · −0.15 / negative hit
- Produces both `philosophy.fit` and `philosophy.tension`

### Mindset (`mindset-precision-execution-v1.json`)
- Rewards precise, executable framing
- Precision tokens: classify, measure, score, verify, ship, merge, build, fix, heal, open, route, parse, schema, matrix, namespace, witness, stencil, intent, verbnoun, exact, place, time, iso, hash
- Vague tokens: whatever, somehow, maybe, stuff, things, vibes, idk, lol, just
- Base 0.4 · +0.1 precision · −0.12 vague
- **Vague-token impact:** one vague word cancels more than one precise word; 3–4 vague tokens drive the score near zero

### Social (`social-staff-agent-v1.json`)
- Collaborative: please, we, us, team, help, together, operator, staff, agent, teach, thank, family, board
- Hostile: idiot, stupid, shut, hate, kill, fire, trash, worthless
- Base 0.5 · +0.08 collaborative · −0.2 hostile

### Intent / VerbNoun library (`intent-library-v1.json`)
Curated VerbNoun pairs used for sentence solving:
- ClassifyIntake, UnderstandWant, ShipToMain, OpenDoor, MeasureMoment, TeachNephew, HealSelf, PreserveMeaning
Each entry carries verbs, nouns, tokens, valid_intent sentence, pipeline stage, and policy hint.

---

## Anchors required for every research-grade observation

- Exact `time.iso` + zone
- Stable `place.id` + kind
- Authority / role / privacy class
- Source hash of the verbatim utterance
- Declared profile / lens versions

Without place + time, scores are not comparable across samples.

---

## Product relevance to Favor + ReadyPlay

These axes become first-class **measurement instruments** that can be productized (see `instruments-library.md`). Favor can consume:
- Intent / VerbNoun match for favor description and routing
- Operational stencil for claim completeness
- Affect + social as counsel overlays on reputation and YONAW context
- Policy decision as the only path that authorizes high-impact actions

Never average emotion/philosophy/mindset into a single permission number.
