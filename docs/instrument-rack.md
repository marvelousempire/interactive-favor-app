# Instrument Rack Architecture

**Status:** Architecture detail, 2026-08-08.  
**Intent:** Define the rack as the live measurement surface that feeds agent consciousness and product counsel — not a second authority path, not a score-to-permission machine.

**Related catalogs:** [Instruments Library](./instruments-library.md) (shapes + shipped list), [Moment Matrix](./moment-matrix.md), [Senses Architecture](./senses-architecture.md).

---

## What the rack is

The **instrument rack** is the ordered collection of measurement instruments available to an agent, a product console, or an operator panel at a given place and time.

- An **instrument** declares *how a reading is shaped* (meter, balance, cube, spectrum, …).
- The **rack** declares *which instruments are mounted*, *what feeds them*, and *who may read them*.
- A **reading** is always time-stamped, place-anchored when possible, and honest about missing data.

The rack is the real pipe layer under senses. Consciousness says what may be noticed. The rack supplies the notice events.

```text
Producers (signals)
  Media Resolver · device plugins · Moment Matrix · Scene Skout · logs
        │
        ▼
Instruments (shape + family + profile version)
  meter · balance · cube · spectrum · vector · …
        │
        ▼
Instrument rack (mounted set for this agent / console / session)
        │
        ▼
Consumers
  BeingProfile.consciousness (notice)
  Favor / ReadyPlay counsel panels
  Operator Scoreboard Studio
  Product catalog entries (WooCommerce / internal)
```

---

## Hard laws

1. **Shape ≠ meaning.** A meter and a balance can both measure honesty; they differ in geometry, not in permission.
2. **Missing ≠ 0 ≠ neutral.** Every instrument carries a missing-data shape. An empty rack must never look like a rack of zeros.
3. **Status is visible.** Each mount is `built`, `specified`, or `gap`. Gaps stay on the panel so they are not forgotten.
4. **Readings counsel.** Rack output informs judgment. Policy and Boss Moves authorize. Witnesses prove.
5. **No composite soul score.** Do not average rack cells into one permission number.
6. **Version everything.** Instrument identity is shape + family + profile version. Changing a lexicon is a new product version, not a silent overwrite.

---

## Layers

### 1. Producers (signal sources)

| Producer | What it supplies | Notes |
|----------|------------------|-------|
| Media Resolver | Multimodal intake, resolved media events | Primary home of concrete `read()` implementations |
| Moment Matrix | Multi-axis scores with place + time anchors | Affect counsel-only; policy axis is authority among matrix axes |
| Device plugins | Camera, mic, biometrics, haptics, orientation | Capacitor / Unity / native; permission-gated |
| Scene Skout | Evidence flags, drift, study completeness | Evidence-first before transformation |
| Runtime logs / witnesses | Operational health, receipt chains | Feeds Smell-channel metaphor instruments |

Producers do not talk directly to agents. They feed instruments.

### 2. Instruments (shape + family)

From the instruments library:

**Shapes (kinds)**  
Meter, Balance, Range, Gambit, Curve, Decay, Spectrum, Histogram, Vector, Cube, Spear, Equalizer, Quantizer, Statistic.

**Families**  
Truth · Expression · Attention · Economics · Signal.

**Identity**  
`instrument_id = shape + family + profile_version`  
Example: `mood-of-expression.cube.affect-baseline-v1`.

### 3. Rack mount

A mount binds one instrument to:

- a producer binding (how `read()` gets data)
- a permitted-use class (`counsel_only` | `operational_input` | `policy_path`)
- a sense-channel tag (sight | hearing | touch | smell | taste | none)
- optional agent or console scope

```text
mount {
  instrument_id
  producer
  permitted_use
  sense_channel?
  scope: agent | console | session
  status: built | specified | gap
}
```

### 4. Consumers

| Consumer | How it uses the rack |
|----------|----------------------|
| Bishop BeingProfile | Consciousness text declares which channels/instruments the agent attends to |
| Favor stewards | Map, review, marketplace, presence counsel panels |
| ReadyPlay | Competitive overlays as counsel, never silent rank mutation |
| Scoreboard Studio | Operator display and composition |
| Product catalog | Each stable instrument can be a versioned SKU / internal product |

---

## Read contract

Every instrument `read()` returns a structured reading:

```text
reading {
  instrument_id
  time.iso
  place.id?          // required for research-grade comparability
  status: measured | not-measured | error
  value?             // shape-specific payload
  confidence?        // 0…1 when applicable
  missing_shape      // how UI/agent should render absence
  profile_version
  source_hash?       // verbatim or media hash when relevant
  permitted_use
}
```

Rules:

- If producer unavailable → `status: not-measured`, no invented value.
- If producer errors → `status: error`, log, do not substitute neutral.
- Partial multi-axis instruments (cubes) report each axis independently; unmeasured axes stay `not-measured`.
- Quantizers always keep raw alongside snapped values.

---

## Missing-data shape

The rack must make absence legible.

| Situation | Rack behavior |
|-----------|---------------|
| Instrument not mounted | Not present on panel; optional gap row if tracked as desired |
| Mounted but `gap` status | Visible gap tile; no fake reading |
| Mounted, `specified`, no `read()` yet | Visible specified tile; `not-measured` |
| Mounted, `built`, producer silent | `not-measured` with missing_shape from instrument contract |
| Mounted, `built`, partial axes | Measured axes only; others `not-measured` |

A rack of nothing must never render as a rack of calm zeros.

---

## Attachment to senses and consciousness

Senses architecture tags each channel with typical instruments. The rack makes that real:

| Sense channel | Example mounts |
|---------------|----------------|
| Sight | Visual evidence meters, spatial graph heat, Unity viewport vectors |
| Hearing | Voice tone spectrum, speech pattern curve, Mood of Expression cube |
| Touch | Presence meters, gesture vectors, biometric session continuity |
| Smell (metaphor) | Drift detectors, operational solvency, Scene Skout completeness |
| Taste (metaphor) | Honesty meter, Fact↔Opinion balance, Mode of Expression cube, quality grades |

When Bishop births an agent, `BeingProfile.consciousness` names the channels (and, when useful, instrument families) the agent keeps in view. The rack supplies the live readings those sentences refer to.

Emotion and tone fields remain posture. Affect instruments remain counsel.

---

## Panel and productization

### Operator panel

Media Resolver already exposes a panel of instruments with status tiles. The rack architecture requires:

- Group by family (Truth, Expression, Attention, Economics, Signal)
- Show status badge: built / specified / gap
- Show missing distinctly from zero
- Allow composition into Scoreboard Studio views without merging cells into a soul score

### Product catalog

Each distinct `instrument_id` is a candidate product:

- Internal catalog entry or WooCommerce-style SKU
- Versioned, auditable, composable
- Consumed by Favor and ReadyPlay under explicit counsel contracts
- Never gains authority by being listed

Example product candidates:

- Mood of Expression (V/A cube, later + Dominance)
- Mode of Expression (philosophy × mindset × social cube)
- Honesty meter + Fact/Opinion balance
- Operational stencil (Verb + Noun completeness)
- Capitalization gambit

WordPress + WooCommerce remains the backend product catalog engine; the rack is the runtime measurement surface.

---

## Authority boundary

```text
Rack reading  →  counsel / measurement
Policy decision (Moment Matrix intent.policy_decision or Boss Move)  →  authorization
Witness / receipt  →  proof
```

Favor ranking inputs may *consult* operational completeness or claim-ledger instruments. They must not treat affect, philosophy-fit, or quality taste scores as automatic rank authority.

---

## Favor consumption map

| Instrument family | Favor use | Permitted use |
|-------------------|-----------|---------------|
| Truth (Honesty, Fact/Opinion, claim ledger) | Claim completeness, review counsel | counsel + operational_input for completeness only |
| Expression (Mood / Mode cubes) | Review tone overlays, operator insight | counsel_only |
| Attention / Economics | Interest, usability, capitalization context | counsel_only |
| Signal (voice, speech — still gap) | Future voice session health | counsel_only when built |
| Operational stencil / solvency | Routing readiness, claim shape | operational_input |
| Policy decision | High-impact action gate | policy_path |

---

## Lifecycle of a mount

1. **Name the gap** — appear on panel as `gap` so it is visible.
2. **Specify** — fixed contract: shape, family, missing_shape, permitted_use, profile version.
3. **Build** — real producer binding + `read()`.
4. **Version** — lexicon or profile change ships a new `instrument_id` version; old readings keep their version tag.
5. **Retire** — unmount or mark retired; do not silently rewrite history.

---

## Implementation guidance

1. Keep concrete `read()` implementations in Media Resolver (or device adapter packages), not inside Bishop birth code.
2. Bishop only declares consciousness attention; it does not own the rack runtime.
3. Electron / Capacitor surfaces display rack panels; Unity may consume spatial vectors for the map view only.
4. Persist readings with `time.iso`, optional `place.id`, `profile_version`, and `source_hash` when the utterance or media blob matters.
5. Refuse any API that returns a single “overall instrument score” for permission decisions.

---

## Open gaps

1. Formal JSON schema for `mount` and `reading` objects shared across Media Resolver and Favor.
2. Wire Capacitor / Unity plugin IDs into Signal and Touch mounts.
3. Build voice tone spectrum and speech pattern curve (currently gap).
4. Populate `affect.dominance` for full VAD on Mood of Expression.
5. Explicit per-instrument Favor contracts (which may touch ranking inputs vs pure counsel).
6. Scoreboard Studio layout presets for Truth / Expression / Operational racks without composite scores.

---

## Related

- [Instruments Library](./instruments-library.md) — shapes, families, shipped list
- [Senses Architecture](./senses-architecture.md) — channels that consume the rack
- [Moment Matrix](./moment-matrix.md) — multi-axis measurement engine
- [Emotion Modeling](./emotion-modeling.md) — VAD / Plutchik / lexicon rules
- [Agent Platform](./agent-platform.md) — Bishop birth + being profile
- [Desktop Stack](./desktop-stack.md) — Electron / Capacitor / Unity surfaces
