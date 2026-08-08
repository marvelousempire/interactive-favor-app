# Microslice Solvency Formula

**Status:** Examination note, 2026-08-08.  
**Canonical doctrine:** `philosophy-micro-slices/slice-spec/formula/`  
**Namespace:** `solvency.stencil_v1` (SCORE-NAMESPACES)  
**Runtime lineage:** Automata `packages/core` `parseMicroSliceFormula` + `calculateSolvencyScore`; Nephew/SNF Moment Matrix consumes the same idea  
**Distinct from:** Kingdom [House 5 Solvency](./solvency-house.md) (Precision/Vision **counsel**)

---

## One sentence

A microslice is solvent only when the intent fills the stencil **Verb · Noun · Destination · Quality · Time** to score **≥ 0.90**. Below that, the slice is not ready to ship — clarify, do not fake a pass.

---

## The formula

```text
Verb + [filler] + Noun + Destination + Quality + [filler] + Time
```

**Example:** `Close + the + door + downstairs + softly + at night`

| Component | Required | Weight | Role |
|-----------|----------|--------|------|
| **Verb** | yes | 0.25 | Action — what executes |
| **[filler]** | no | — | the, a, my, all, … |
| **Noun** | yes | 0.25 | Object — what is targeted |
| **Destination** | yes | 0.25 | Location — where it is placed |
| **Quality** | yes | 0.125 | Constraint — how |
| **[filler]** | no | — | at, before, after, … |
| **Time** | yes | 0.125 | Constraint — when |

Four **dimensions** of solvable automation:

| Dimension | Maps to | Without it |
|-----------|---------|------------|
| Action | Verb | Nothing executes |
| Object | Noun | Nothing is targeted |
| Location | Destination | Nothing is placed |
| Constraint | Quality + Time | Nothing is bounded |

---

## Scoring algorithm

```text
score = 0
if verb        → +0.25
if noun        → +0.25
if destination → +0.25
if quality     → +0.125
if time        → +0.125
return score   // range 0..1
```

**Valid-intent gate:** `score >= 0.90`.

Practical minimum for pass: verb + noun + destination + **at least one of** quality or time (0.25×3 + 0.125 = 0.875 is still under 0.90; both quality and time with all three core slots = 1.00). Doctrine failure table treats missing time alone at 0.75 as fail; full five slots = 1.00.

When parsing is **partial** (e.g. no noun or destination found), some runtimes blend **60% formula / 40% heuristic** for graceful degradation — formula remains canonical when all dimensions parse.

---

## The stencil

```text
[Verb] + [_____] + [Noun] + [Destination] + [Quality] + [_____] + [Time]
```

Fill blanks when stuck. Any required slot left blank → slice not ready. The stencil is a **liberation tool**: every blank is a question the system can ask; every filled blank is a dimension it can execute.

**Defining measure of intent:** *Does it fit the formula?*  
No formula → no solvency → no slice → no action.

---

## Flow stage mapping

```text
IntentInput (raw string)
        │
        ▼  parseMicroSliceFormula()
  { verb, noun, destination, quality, time }
        │
        ▼  calculateSolvencyScore()
  score ∈ [0..1]
        │
        ▼  score >= 0.9 ?
      YES → Concept → Notion → SolvencyVerdict → MicroSlice → Action path
       NO → rejected / clarify at valid-intent
```

This formula stage is **measurement**. Kingdom House 5 (Precision/Vision) may later counsel on exactness vs durability; it does not replace the numeric gate.

---

## Failure ladder (doctrine examples)

| Intent | Score | Missing | Solvable? |
|--------|------:|---------|-----------|
| "fix it" | 0.25 | noun, destination, quality, time | No |
| "close the door" | 0.50 | destination, quality, time | No |
| "build a folder watcher" | 0.50 | destination, quality, time | No |
| "archive screenshots weekly" | 0.625 | destination, quality | No |
| "close the door downstairs softly" | 0.75 | time | No |
| "close the door downstairs softly at night" | 1.00 | — | Yes |

---

## Worked pass examples (sample)

| Intent (abbrev.) | V | N | D | Q | T |
|------------------|---|---|---|---|---|
| Water plants in living room gently every morning at 7am | water | plants | living room | gently | every morning at 7am |
| Backup database to S3 securely every night at 2am | backup | database | S3 | securely | every night at 2am |
| Sync repo to VPS silently every hour | sync | repo | VPS | silently | every hour |
| Close door downstairs softly at night | close | door | downstairs | softly | at night |

Full twenty-example table lives in doctrine `06-real-examples.md`.

---

## SCORE-NAMESPACES binding

| Field | Value |
|-------|--------|
| Namespace | `solvency.stencil_v1` |
| Range | `0..1` |
| Meaning | Completeness of Verb, Noun, Destination, Quality, Time under **exact v1 weights** |
| Permitted use | `execution_input` |
| Never means | Policy authorization; total execution readiness; moral worth |

Related but different: `solvency.readiness` (0..100 operational readiness under other models). Do not average stencil with affect or philosophy into a soul score.

Missing slots → `needs-information` / incomplete — **not** silent zero that looks like measured failure of the action itself.

---

## CLI (Automata lineage)

```sh
automata formula "close the door downstairs softly at night"
# components + solvency score 1.00

automata formula --template   # guided stencil fill

automata formula --score "build a folder watcher"
# score 0.50 — below threshold
```

Moment Matrix CLI (SNF / nephew path):

```sh
node bin/moment-matrix.mjs score --text "…" --place place:desk
node bin/moment-matrix.mjs describe --text "…" --place place:desk
```

---

## Favor consumption

| Surface | Use |
|---------|-----|
| Favor / claim text | Stencil completeness as **counsel** before publish |
| Marketplace steward | Flag missing V/N/D/Q/T; do not auto-ban |
| YONAW context | Incomplete intent → clarify path, not silent low reputation |
| Ready Play | Not a rating input |
| Scoreboard Studio | Show component checklist + score; never composite with Y-score |

**Offline gap:** Moment Matrix engines often detect Verb/Noun well and leave Destination/Quality/Time empty — surface honestly as incomplete, improve extractors over time.

Instrument rack: mount as operational meter/cube family with explicit missing-data shape.

---

## Broader routing metrics (optional doctrine layer)

Separate from the v1 five-slot weights, Make-Sense protocol also defines 0–100 microslice metrics (Clarity, Intent Strength, Valid Intent Pass, Completeness, Feasibility, Risk load, Precision Level, Emotional weight) for **Kingdom pair routing**. Those drive how many pairs see a slice; they are not a substitute for the ≥0.90 stencil gate and must not become a Favor soul score.

---

## Open work

1. Shared JSON schema for stencil components + score in Favor API.
2. Claim UI that walks empty slots instead of rejecting with a opaque error.
3. Improve D/Q/T extraction for natural-language favors.
4. Keep formula score off Ready Play and IdentityScore multipliers.

---

## Related

- [Solvency House](./solvency-house.md) — Precision/Vision counsel
- [Kingdom Houses](./kingdom-houses.md)
- [Moment Matrix](./moment-matrix.md)
- [Score Namespaces](./score-namespaces.md)
- [Instrument Rack](./instrument-rack.md)
- Doctrine: `philosophy-micro-slices/slice-spec/formula/`
- SNF: `contracts/SCORE-NAMESPACES.md`
