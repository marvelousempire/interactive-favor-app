# Agent Platform — Bishop Factory + Optimus Nephew Fusion

**Status:** Synthesis from 2026-08-07/08 research + existing Bishop / Optimus Nephew repos.  
**Intent:** Stop building one giant agent. Build the **way** that births many agents.

---

## What already exists

### Bishop — Agent Factory Engine

Repo: `marvelousempire/bishop` (Gitea org `bishop` = Agent Factory layer).

- **Sole engine for durable named-agent birth**
- Entry: `main.py` → Kingdom agent API (uvicorn)
- Required **being profile** (manifest v1.3+) for every durable agent:
  - skills, rules, capabilities, talents
  - soul, philosophy, consciousness, emotion, tone
- Bootstrap birth runtime (`scripts/bootstrap_birth.py`) — validate + preview only; durable birth is explicit
- Creation Packs, staff cards, supervision, retirement justification
- Truth boundary: a being profile does **not** grant authority; permissions and Boss Moves stay separate

Reference steward: `agents/dressing-coach/` (DRESSING COACH).

### Optimus Nephew — The Good Intelligence Fusion Project (TGIFP)

Repo: `marvelousempire/optimus-nephew`

- **Manifest and standards**, not application code
- Declaration of Intent, philosophies, scoring ledgers, Motif product schema, WordPress/Pods/WooCommerce pipeline docs
- Nephew application depends on this manifest; Optimus does not redefine runtime
- Cabinet Kitchen, Adapter Studio, Scene Skout, Media Resolver as bounded capabilities
- Law: Policy authorizes. Scores never become permission.

### Nephew runtime

Repo: `marvelousempire/nephew` — orchestrator, doors, cassettes, forge taxonomy (Doctrine = nephew org, Agent Factory = bishop org). Includes cornerstone package `moment-matrix/`.

---

## Direction change (operator intent)

Earlier path: one large agent identity ("Nephew" as the agent).

**New path:** Bishop Factory is the production line. Optimus Nephew is the almanack / law book. The runtime is Nephew. Any specialized agent is born through Bishop with a complete being profile, not by expanding a single god-agent.

```text
Operator intent
      │
      ▼
Optimus Nephew (law, philosophy, score ledgers, product schema)
      │
      ▼
Bishop Factory (birth durable agents with being profiles)
      │
      ├── consciousness ← senses channels (what may be noticed)
      ├── emotion / tone ← posture only
      └── capabilities ← act only under permission contracts
      │
      ▼
Instrument rack (Media Resolver · Moment Matrix · device plugins)
      │
      ▼
Nephew runtime + product consoles (Favor, ReadyPlay, Briefcase, …)
      │
      ├── Electron (desktop)
      ├── Capacitor (mobile)
      └── Unity (embedded spatial only)
```

---

## Biological / senses / nutrition research (extension, not claim of sentience)

Conversation direction: treat agent capability more like a living system that needs:

- **Senses** — what the agent continuously notices (maps to Bishop `consciousness` + instrument inputs)
- **Nutrition / fuel** — data, compute budget, knowledge feeds (operational readiness, not food chemistry)
- **Emotion posture** — required Bishop field; counsel/posture only, never permission

Hard boundary:

> Emotion is an operating posture, not a claim that the software is biologically sentient.

| Biological metaphor | Existing stack slot |
|---------------------|---------------------|
| Senses | [Senses Architecture](./senses-architecture.md) + [Instrument Rack](./instrument-rack.md) |
| Attention | consciousness field + routing confidence |
| Mood / posture | emotion + tone; affect.* counsel only |
| Health / readiness | solvency / operational scores; never soul score |
| Growth | skills + talents + versioned Creation Packs |

---

## How Favor uses this

- Favor does **not** invent its own agent factory.
- Specialist agents are listed in [Favor Stewards](./favor-stewards.md) and born via **Bishop** when durable roles are justified.
- Measurement instruments and Moment Matrix remain counsel/measurement layers under SCORE-NAMESPACES law.
- Desktop/mobile surface is Electron + Capacitor; Unity only for spatial/game surfaces.
- Agents act through policy and witnesses, not through emotion scores.

---

## Open work

See consolidated [Open Work](./open-work.md). Highlights:

1. Map and birth Favor stewards (map, review, marketplace, reputation first).
2. Align consciousness with Moment Matrix namespaces (counsel only).
3. Device-sense plugins as instrument inputs, not authority.
4. Continue Electron/Capacitor shell; Unity embed only for spatial map.

---

## Related

- Bishop: `docs/agent-being-profile.md`, `docs/agent-birth-canal.md`
- Optimus Nephew: `README.md`, `docs/WHAT-WE-ARE-BUILDING.md`
- Favor: [Desktop Stack](./desktop-stack.md), [Senses Architecture](./senses-architecture.md), [Instrument Rack](./instrument-rack.md), [Moment Matrix](./moment-matrix.md), [Favor Stewards](./favor-stewards.md), [Score Namespaces](./score-namespaces.md), [Open Work](./open-work.md)
