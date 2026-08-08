# Senses Architecture — Five Channels into Being Profile

**Status:** Refined architecture note, 2026-08-08.  
**Intent:** Formalize the main.py → senses analogy. Do not invent a second factory. Map five sensory channels onto Bishop BeingProfile + instrument rack with hard laws, concrete inputs, and consciousness writing templates.

---

## What this is

Bishop already requires a complete **being profile** for every durable agent (manifest v1.3+):

1. skills — learned, repeatable methods  
2. rules — hard operating constraints  
3. capabilities — actions within authority  
4. talents — characteristic strengths and judgment  
5. soul — durable purpose protected  
6. philosophy — principles for choosing between valid options  
7. **consciousness** — what it continuously notices, relates, and keeps in view  
8. emotion — emotional posture brought to the work  
9. tone — how it communicates

**Consciousness** is the formal home for senses. The five channels below are a design checklist for what an agent may notice, plus the real input pipes that feed that field. This is not a claim of biological sentience.

Bishop truth boundary:

> A being profile does not grant authority. Emotion is an operating posture, not a claim that the software is biologically sentient.

---

## Hard laws

1. **Notice ≠ permission.** A sense channel may report signal. It never authorizes action. Policy and Boss Moves authorize.
2. **Missing ≠ 0 ≠ neutral.** If a channel has no instrument attached or no reading, mark `not-measured`. Do not invent a default.
3. **No soul score.** Never average sight, hearing, touch, smell, taste, affect, or philosophy into one permission number.
4. **Metaphor stays metaphor.** Smell and taste are environmental-quality and preference metaphors. Do not implement chemical or nutritional requirements for software agents.
5. **Bishop remains the only birth authority.** A `senses/` package under an agent folder is documentation + adapters only — never a second factory or boot path.
6. **Scores counsel.** Moment Matrix affect and quality grades inform judgment. They do not replace policy.

---

## Placement in the stack

```text
Operator intent
      │
      ▼
Optimus Nephew (law / philosophy / product schema)
      │
      ▼
Bishop Factory (birth + BeingProfile)
      │
      ├── consciousness  ← five-channel checklist (what may be noticed)
      ├── emotion / tone ← posture only
      ├── capabilities   ← act only under separate permission contracts
      └── skills / talents / soul / philosophy / rules
      │
      ▼
Instrument rack (actual inputs)
      ├── Media Resolver instruments
      ├── Moment Matrix axes (affect.*, operational.*, policy.*)
      ├── Device plugins (Capacitor / Unity / native)
      └── Scene Skout evidence flags
      │
      ▼
Nephew runtime + product surfaces
      ├── Electron (desktop)
      ├── Capacitor (mobile)
      └── Unity (embedded spatial / game layer only)
```

Bishop `main.py` stays the thin factory entry (`uvicorn` → `kingdom.agent:app`). Senses are not the boot process.

---

## Five channels

Each channel is a **class of notice**, not a permission to act.

### Sight

| Field | Detail |
|-------|--------|
| Notices | Visual scene, layout, identity signals, spatial graph, UI state, image evidence |
| Inputs | Camera, screen capture, Unity viewport, image instruments, AR overlays |
| Stack slots | Media Resolver visual family; Unity embed; Capacitor camera plugin |
| Moment Matrix / instruments | Visual evidence flags; spatial graph heat; layout parity checks |
| Favor use | Map steward (3D reputation network), identity presence, product image review |

### Hearing

| Field | Detail |
|-------|--------|
| Notices | Speech, ambient audio, voice session state, tone of conversation |
| Inputs | Mic, system audio, voice session streams |
| Stack slots | Media Resolver audio / voice capability |
| Moment Matrix / instruments | `affect.*` from speech (counsel only); social tone instruments; Mode of Expression |
| Favor use | Review steward feedback tone; operator voice commands; ambient session health |

### Touch

| Field | Detail |
|-------|--------|
| Notices | Contact, gesture, haptics, device posture, biometric presence |
| Inputs | Touch events, Capacitor haptics, Face ID / Touch ID presence signals, device orientation |
| Stack slots | Device plugins (Capacitor / native); Unity input when spatial |
| Moment Matrix / instruments | Presence / session continuity meters; gesture vectors |
| Favor use | Authenticated presence; haptic feedback in mobile shell; spatial controller input |

### Smell (metaphor)

| Field | Detail |
|-------|--------|
| Notices | Environment quality, drift, “something is off” signals |
| Inputs | Log smell detectors, drift flags, Scene Skout evidence, failed witness patterns |
| Stack slots | Operational instruments; Scene Skout; solvency / stencil checks |
| Moment Matrix / instruments | `operational.*`, drift detectors, evidence completeness |
| Favor use | Marketplace or map drift alerts; incomplete claim detection |

Smell must never invent chemical sensors or biological requirements for agents.

### Taste (metaphor)

| Field | Detail |
|-------|--------|
| Notices | Preference, fit, quality judgment, product or review “flavor” |
| Inputs | Review scores, Motif product fit, Super Rick quality grades, YONAW context |
| Stack slots | Counsel scoreboards; Motif product schema |
| Moment Matrix / instruments | `philosophy.fit`, quality grades, Honesty / Mood of Expression instruments |
| Favor use | Review steward; marketplace quality counsel; reputation context overlays |

Taste scores remain counsel. They never authorize payment, ranking promotion, or policy bypass.

---

## Mapping onto BeingProfile fields

| Sense idea | Formal field / layer |
|------------|----------------------|
| Continuous noticing | `consciousness` (required text) |
| Emotional posture while noticing | `emotion` + `tone` |
| What may be acted on after noticing | `capabilities` + separate permission contracts |
| How noticing improves | `skills` + `talents` |
| Why noticing matters | `soul` + `philosophy` |
| Hard limits on noticing or acting | `rules` |
| Live measurement streams | Instrument rack + Moment Matrix namespaces |

---

## Consciousness writing templates

When birthing a Favor steward through Bishop, expand `consciousness` with the channels that agent owns. Keep the text specific and bounded.

**Map steward (sight-heavy)**  
> Continuously notices spatial graph layout, connection edges, reputation heat, Unity viewport state, and drift in the 3D network. Relates visual evidence to place and time anchors. Keeps missing graph regions marked not-measured rather than filled.

**Review steward (taste + hearing)**  
> Continuously notices review text tone, quality grades, Motif product fit, and social/affect counsel from Moment Matrix. Relates preference signals to evidence, not to permission. Keeps quality scores as counsel overlays only.

**Presence steward (touch + sight)**  
> Continuously notices biometric presence signals, session continuity, device posture, and camera or identity cues under explicit permission contracts. Relates presence to authenticated session state. Never treats presence score as authority.

**Marketplace steward (smell + taste metaphor)**  
> Continuously notices operational drift, incomplete claims, quality grades, and evidence gaps. Relates “off” signals to Scene Skout and solvency instruments. Escalates drift as counsel; does not auto-punish.

---

## Instrument inputs (the real pipes)

Senses without inputs are empty prose. Inputs come from:

1. **Media Resolver** — multimodal intake and resolution (Cabinet Kitchen family).
2. **Moment Matrix** — multi-axis measurement (`affect.*`, `philosophy.*`, `mindset.*`, `social.*`, `operational.*`, `intent.policy_decision`). Affect is counsel only. Policy axis is the only authority path among these.
3. **Device plugins** — Capacitor (mobile) and Unity/native for camera, ARKit, Core ML, Face ID / Touch ID, haptics.
4. **Scene Skout** — evidence-first study before transformation.

Instrument shapes (meters, spectra, vectors, heatmaps) stay in the instruments library. Sense channels only declare which class of notice those instruments feed.

---

## Missing-data rules

| Situation | Required behavior |
|-----------|-------------------|
| No instrument wired for a channel | Channel status = `not-measured` |
| Instrument fails or times out | Channel status = `not-measured`; log failure; do not substitute neutral |
| Partial reading | Report measured axes only; mark the rest `not-measured` |
| Operator disables a device plugin | Treat as absent instrument; no silent fallback to guessed values |

Never coerce missing sensory data into zero, average, or “calm baseline.”

---

## Nutrition / fuel (readiness, not food)

Parallel metaphor from the same research session:

| Metaphor | Real meaning |
|----------|--------------|
| Food / nutrients | Knowledge feeds, model updates, corpus freshness |
| Energy | Compute budget, rate limits, session solvency |
| Health | Operational scores, witness coverage, drift checks |

Do not implement literal nutrition chemistry for agents. Track readiness under existing operational scoreboards.

---

## Optional package shape (later)

If an agent folder needs local adapters, use documentation + thin input adapters only:

```text
agents/<name>/
  manifest.json          # includes being.consciousness
  senses/
    README.md            # which channels this agent owns
    adapters/            # optional: typed input normalizers
```

Rules for that package:

- No birth logic
- No permission grants
- No default scores for missing channels
- Adapters only normalize instrument payloads into notice events the agent’s consciousness is allowed to attend to

---

## Favor product use

| Steward role | Primary channels | Surface |
|--------------|------------------|--------|
| Map / reputation | Sight | Unity embed inside Electron / Capacitor |
| Review | Taste + Hearing | Web UI + voice |
| Presence / identity | Touch + Sight | Capacitor biometrics + camera |
| Marketplace | Smell + Taste (metaphor) | Operational + quality counsel |

Desktop shell remains Electron. Mobile twin is Capacitor. Unity is embedded only for spatial or light game surfaces. Favor does not invent its own agent factory; specialists are born through Bishop when durable roles are justified.

---

## Implementation guidance

1. **Do not** replace Bishop `main.py` with a senses boot module.
2. **Do** expand `BeingProfile.consciousness` per agent with owned channels (use templates above).
3. **Do** register real inputs as instruments (Media Resolver / Moment Matrix / device plugins).
4. **Do** keep emotion and affect as posture and counsel.
5. **Do** mark unmeasured channels explicitly.
6. **Optional later:** `senses/` under an agent folder as docs + adapters — never as birth authority.

---

## Open gaps

1. Wire concrete Capacitor / Unity plugin IDs per Favor steward (camera, biometrics, haptics).
2. Map existing instruments-library meters (Honesty, Mood of Expression, Mode of Expression) onto Hearing / Taste rows with stable namespaces.
3. Add Scene Skout drift flags as first-class Smell inputs with place + time anchors.
4. Decide which Favor stewards deserve durable Bishop births vs temporary bootstrap workers.
5. Keep spiritual Moment Matrix axis refused unless operator declares a lens (existing law).

---

## Related

- Bishop: `docs/agent-being-profile.md`, `core/schemas.py` (`BeingProfile`)
- Favor: [Agent Platform](./agent-platform.md), [Desktop Stack](./desktop-stack.md), [Moment Matrix](./moment-matrix.md), [Instruments Library](./instruments-library.md), [Emotion Modeling](./emotion-modeling.md)
- Optimus Nephew: law, Motif product schema, Cabinet Kitchen / Media Resolver boundaries
