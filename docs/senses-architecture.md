# Senses Architecture — Five Channels into Being Profile

**Status:** Architecture note from 2026-08-07/08 research.  
**Intent:** Formalize the main.py → senses analogy. Do not invent a second factory. Map five sensory channels onto Bishop BeingProfile + instrument rack.

---

## What this is

Bishop already requires a complete **being profile** for every durable agent (manifest v1.3+):

- skills, rules, capabilities, talents
- soul, philosophy, **consciousness**, emotion, tone

**Consciousness** is defined as: what the agent continuously notices, relates, and keeps in view.

The “senses” work is an expansion of that field — a design checklist for what an agent is allowed to notice — plus the real input pipes that feed it. It is not a claim of biological sentience.

Bishop’s hard boundary still holds:

> Emotion is an operating posture, not a claim that the software is biologically sentient.

---

## Why not a god-level senses.py

Earlier sketch: convert a single main entry into a senses module, then split into five sense files.

That direction is useful as metaphor. It is wrong as architecture if it becomes a second authority path beside Bishop.

Correct placement:

```text
Optimus Nephew (law / philosophy)
        │
        ▼
Bishop Factory (birth + BeingProfile)
        │
        ├── consciousness  ← five-sense checklist lives here (what may be noticed)
        ├── emotion / tone ← posture only
        └── capabilities   ← what may be acted on under separate permission contracts
        │
        ▼
Instrument rack (actual inputs)
        ├── Media Resolver instruments
        ├── Moment Matrix axes (affect.*, operational.*, …)
        └── Device plugins (Capacitor / Unity / native)
```

Bishop’s `main.py` stays the thin factory entry (uvicorn → kingdom.agent:app). Senses are not the boot process.

---

## Five channels (checklist)

Each channel is a **class of notice**, not a permission to act.

| Channel | What it notices | Typical inputs | Stack slot |
|---------|-----------------|----------------|------------|
| **Sight** | Visual scene, layout, identity signals, spatial graph | Camera, screen capture, Unity viewport, image instruments | Media Resolver visual + Unity embed |
| **Hearing** | Audio presence, speech, ambient cues | Mic, system audio, voice session | Media Resolver audio / voice capability |
| **Touch** | Contact, haptics, gesture, device posture | Capacitor haptics, touch events, biometrics (presence) | Device plugins |
| **Smell** | Metaphor: environment quality / drift signals | Log smells, drift detectors, Scene Skout evidence flags | Operational + evidence instruments |
| **Taste** | Metaphor: preference, fit, quality judgment | Review scores, Motif product fit, Super Rick quality grades | Counsel scores (never permission) |

Smell and taste stay metaphorical. They must not invent chemical or biological requirements for software agents. Food/nutrient lists, if ever written, belong in human-operator research notes or simulation scenarios only.

---

## Mapping onto BeingProfile fields

| Sense idea | Formal field / layer |
|------------|----------------------|
| Continuous noticing | `consciousness` (required text) |
| Emotional posture while noticing | `emotion` + `tone` |
| What it is allowed to do after noticing | `capabilities` + separate permission contracts |
| How it learns to notice better | `skills` + `talents` |
| Why it cares what it notices | `soul` + `philosophy` |
| Live measurement streams | Instrument rack + Moment Matrix namespaces |

When composing a new agent in Bishop, expand `consciousness` with the channels that agent is responsible for. Example for a map steward: spatial graph, connection edges, reputation heat — sight-heavy. Example for a review steward: quality grades, fit, tone of feedback — taste/hearing mix.

---

## Instrument inputs (the real pipes)

Senses without inputs are empty prose. Inputs come from:

1. **Media Resolver** — multimodal intake and resolution capability (Optimus / Cabinet Kitchen family).
2. **Moment Matrix** — multi-axis measurement (affect, philosophy, mindset, social, operational, policy). Affect is counsel only.
3. **Device plugins** — Capacitor (mobile) and Unity/native plugins for camera, ARKit, Core ML, Face ID / Touch ID, haptics.
4. **Scene Skout** — evidence-first study before transformation.

Scores from these pipes never become permission. Policy and Boss Moves remain separate contracts (Optimus Nephew law).

---

## Nutrition / fuel (readiness, not food)

Parallel metaphor from the same research session:

| Metaphor | Real meaning |
|----------|--------------|
| Food / nutrients | Knowledge feeds, model updates, corpus freshness |
| Energy | Compute budget, rate limits, session solvency |
| Health | Operational scores, witness coverage, drift checks |

Do not implement literal nutrition chemistry for agents. Track readiness as operational measurement under existing scoreboards.

---

## Favor product use

- Reputation / map stewards: sight-heavy consciousness (3D network, Unity view).
- Review / marketplace stewards: taste + hearing (quality grades, conversation tone).
- Device-backed identity or presence: touch + sight via Capacitor/Unity plugins, still under permission contracts.
- Desktop shell remains Electron; mobile twin Capacitor; Unity only for spatial/game surfaces.

Favor does not invent its own agent factory. Specialists are born through Bishop when durable roles are justified.

---

## Implementation guidance

1. **Do not** replace Bishop `main.py` with a senses boot module.
2. **Do** expand `BeingProfile.consciousness` text per agent with the channels that agent owns.
3. **Do** register real inputs as instruments (Media Resolver / Moment Matrix / device plugins).
4. **Do** keep emotion and affect as posture and counsel.
5. **Optional later:** a small `senses/` package under an agent folder as documentation + input adapters — never as a second birth authority.

---

## Related

- Bishop: `docs/agent-being-profile.md`, `core/schemas.py` (`BeingProfile`)
- Favor: [Agent Platform](./agent-platform.md), [Desktop Stack](./desktop-stack.md), [Moment Matrix](./moment-matrix.md), [Instruments Library](./instruments-library.md)
- Optimus Nephew: law, Motif product schema, Cabinet Kitchen / Media Resolver boundaries
