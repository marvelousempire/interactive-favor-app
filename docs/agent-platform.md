# Agent Platform — Bishop Factory + Optimus Nephew Fusion

**Status:** Synthesis from 2026-08-07 research + existing Bishop / Optimus Nephew repos.  
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

Repo: `marvelousempire/nephew` — orchestrator, doors, cassettes, forge taxonomy (Doctrine = nephew org, Agent Factory = bishop org).

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
      ▼
Nephew runtime + product consoles (Favor, ReadyPlay, Briefcase, …)
```

---

## Biological / senses / nutrition research (extension, not claim of sentience)

Conversation direction: treat agent capability more like a living system that needs:

- **Senses** — what the agent continuously notices (maps to Bishop `consciousness` + instrument inputs: camera, audio, biometrics, Moment Matrix affect, Media Resolver instruments)
- **Nutrition / fuel** — data, compute budget, knowledge feeds, update cadence (operational readiness, not food chemistry as product requirement)
- **Emotion posture** — already a required Bishop field; must stay counsel/posture, never permission

Hard boundary (already in Bishop docs):

> Emotion is an operating posture, not a claim that the software is biologically sentient.

Any “biological” framing is **metaphor and capability checklist** for building richer agents, not a claim of organism-level life. Food/nutrient lists, if pursued, belong as research notes for human operator health or simulation scenarios — not as requirements to “feed” software agents.

Practical fusion:

| Biological metaphor | Existing stack slot |
|---------------------|---------------------|
| Senses | Instrument rack (Media Resolver) + device plugins (Capacitor/Unity) + Moment Matrix axes |
| Attention | consciousness field in being profile + routing confidence |
| Mood / posture | emotion + tone fields; affect.* scores (counsel only) |
| Health / readiness | solvency / operational scores; never “soul score” |
| Growth | skills + talents + versioned Creation Packs |

---

## How Favor uses this

- Favor does **not** invent its own agent factory.
- Specialist agents (reputation steward, marketplace steward, map steward, review steward) are born via **Bishop** when needed.
- Measurement instruments and Moment Matrix remain counsel/measurement layers under Semantic Node Framework law.
- Desktop/mobile surface (Electron + Capacitor + Unity) is the human interface; agents act through policy and witnesses, not through emotion scores.

---

## Open work

1. Map Favor-specific steward roles that deserve durable Bishop births (vs temporary bootstrap workers).
2. Keep being-profile emotion/consciousness aligned with Moment Matrix affect namespaces (counsel only).
3. Document any device-sense plugins (biometrics, camera) as instrument inputs, not authority.
4. Continue Electron/Capacitor app shell; embed Unity only for spatial/game surfaces.

---

## Related

- Bishop: `docs/agent-being-profile.md`, `docs/agent-birth-canal.md`
- Optimus Nephew: `README.md`, `docs/WHAT-WE-ARE-BUILDING.md`
- Favor: [Desktop Stack](./desktop-stack.md), [Moment Matrix](./moment-matrix.md), [Instruments Library](./instruments-library.md)
