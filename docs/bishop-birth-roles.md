# Bishop Birth Roles — Investigation

**Status:** Expanded role detail, 2026-08-08.  
**Sources:** `bishop/core/schemas.py`, `docs/agent-birth-canal.md`, `docs/expert-agent-birth.md`, `core/expert_agent_composer.py`, SNF `profiles/agent-role-registry.json`, Favor [favor-stewards.md](./favor-stewards.md).

---

## What a Bishop birth is

Bishop is the **sole factory** for any durable, named, identity-bearing agent — anything that gets a staff card:

- `manifest.json`
- `certificate-of-origin.md`
- `memory.md`
- `AI_AGENT_RULES/`
- surfaces: `Core/api`, `Core/mcp`, `Core/brain`

If it does not come down the birth canal, it is not a durable staff agent.

**Not Bishop births** (out of scope):

| Not a Bishop agent | What it is |
|--------------------|------------|
| macOS LaunchAgent daemons | launchd processes |
| Smart Git Steward ticks | closed-loop Nephew compose + receipts |
| Ephemeral subagents (Claude/Cursor sessions) | end with the turn |
| Enterprise-agent tickets | commissioning lifecycle, not birth |

Staff-card test: *does it get a certificate of origin and a memory?*

---

## Registry law (SNF)

From `profiles/agent-role-registry.json`:

> Roles describe **responsibility**. Interaction class, equipped capability, and runtime authority remain **separate** fields.

Implications:

1. Choosing `validator` does not grant policy authority.
2. Choosing `governor` does not unlock Boss Moves or sudo.
3. `primary_role` is not a permission bit and not a score.
4. Legacy hybrid roles → one `primary_role` + one or more `secondary_roles`.

Manifest rules (Bishop `AgentManifest`):

- `primary_role` must be one of the fourteen.
- `secondary_roles` unique; must not repeat primary.
- Schema default when omitted in some constructors: `executor`.
- Expert composer playbooks currently fill being profile and intent; they do **not** always pin `primary_role` — Prefer explicit role at Favor steward birth review.

---

## The fourteen roles in detail

Each row is **responsibility**, not authority. Non-duties prevent role sprawl.

### `governor`

| | |
|--|--|
| **Does** | Hold oversight posture; watch boundaries; escalate policy questions; refuse silent authority expansion |
| **Does not** | Execute day-to-day product work; become sole approver of its own proposals; invent Boss Moves |
| **Typical secondaries** | `validator`, `archivist` |
| **Interaction** | Usually `operator_interactive` |
| **Favor** | Rare as a product steward; more for a product-line oversight identity if ever born |

### `orchestrator`

| | |
|--|--|
| **Does** | Coordinate multi-agent or multi-step work; order lead sheets; hand off between workers |
| **Does not** | Replace specialist judgment; auto-approve worker mutations |
| **Typical secondaries** | `router`, `documenter` |
| **Favor** | Possible product-level Favor orchestrator boss for stewards; not required day one |

### `supplier`

| | |
|--|--|
| **Does** | Provide inputs, feeds, corpus, or upstream materials other agents consume |
| **Does not** | Own final product acceptance; mutate downstream state without commission |
| **Typical secondaries** | `archivist`, `documenter` |
| **Favor** | Knowledge / instrument feed suppliers if productized; not a core YONAW path steward |

### `creator`

| | |
|--|--|
| **Does** | Create new artifacts (docs, packs, drafts, assets) under declared scope |
| **Does not** | Publish without review; treat draft as birth or policy |
| **Typical secondaries** | `documenter`, `generator` |
| **Favor** | Content/creative paths if needed; stewards below prefer analyzer/validator |

### `validator`

| | |
|--|--|
| **Does** | Check completeness, compliance, claim shape, stencil readiness; flag failures |
| **Does not** | Auto-punish; convert counsel scores into bans; bypass policy |
| **Typical secondaries** | `analyzer`, `router`, `resource-manager` |
| **Favor** | **Marketplace steward**, **YONAW steward** (primary) |

### `generator`

| | |
|--|--|
| **Does** | Produce candidates, variants, options for human or validator choice |
| **Does not** | Select the winner as policy; hide failed candidates |
| **Typical secondaries** | `creator`, `analyzer` |
| **Favor** | Optional review-assist or ranking *proposal* tools — never silent rank write |

### `router`

| | |
|--|--|
| **Does** | Route intents, tickets, or work items to the right desk or agent |
| **Does not** | Execute the routed work by default; invent destinations without library/policy |
| **Typical secondaries** | `analyzer`, `validator` |
| **Favor** | Secondary on **YONAW steward**; Intent/VerbNoun match supports routing counsel |

### `analyzer`

| | |
|--|--|
| **Does** | Study signals, interpret measurements, separate evidence from inference |
| **Does not** | Mutate rankings or ledgers; present affect as authority |
| **Typical secondaries** | `documenter`, `validator`, `archivist` |
| **Favor** | **Review**, **Reputation**, **Ready Play** stewards (primary) |

### `documenter`

| | |
|--|--|
| **Does** | Record decisions, explain readings, produce operator-facing briefs |
| **Does not** | Alter underlying scores to make the story cleaner |
| **Typical secondaries** | `archivist`, `analyzer` |
| **Favor** | Common secondary on review / reputation / Ready Play |

### `resource-manager`

| | |
|--|--|
| **Does** | Track budgets, quotas, claim inventory, credit pools as measurement |
| **Does not** | Spend, seize, or reallocate without policy authority |
| **Typical secondaries** | `validator`, `analyzer` |
| **Favor** | Secondary on **Marketplace steward** (credits / claim completeness) |

### `executor`

| | |
|--|--|
| **Does** | Carry out bounded tasks under explicit commission; default role when unspecified |
| **Does not** | Expand scope; treat detect-stage birth as remediate authority |
| **Typical secondaries** | `validator`, `documenter` |
| **Favor** | **Presence steward** (primary); generic workers |

### `integrator`

| | |
|--|--|
| **Does** | Wire systems, adapters, instrument producers, product bridges |
| **Does not** | Own product policy; silently change authority boundaries |
| **Typical secondaries** | `executor`, `documenter` |
| **Favor** | Shell / Media Resolver / Capacitor bridge agents if born — not core reputation path |

### `visualizer`

| | |
|--|--|
| **Does** | Present spatial or visual structure (maps, graphs, Unity views) honestly |
| **Does not** | Hide missing regions as zero; invent graph edges |
| **Typical secondaries** | `analyzer`, `archivist` |
| **Favor** | **Map steward** (primary) |

### `archivist`

| | |
|--|--|
| **Does** | Preserve evidence, history, receipts, versioned readings |
| **Does not** | Rewrite history; delete source material without disposition authority |
| **Typical secondaries** | `documenter`, `validator` |
| **Favor** | Secondary on map / reputation; aligns with records-curator playbook spirit |

---

## Role vs other axes (do not collapse)

| Axis | Field | Answers |
|------|-------|--------|
| Responsibility | `primary_role` / `secondary_roles` | What kind of work is this identity for? |
| Operator relationship | `interaction_class` | Interactive, tool-executing, or background? |
| Equipped actions | `capabilities` / tools / Skills | What surfaces and tools are installed? |
| Inner posture | `being.*` | Consciousness, emotion, tone, soul, philosophy |
| Runtime authority | separate contracts / Boss Moves / policy | May it mutate, spend, or approve? |
| Measurement | instrument rack / Moment Matrix | What may it notice? |

Kingdom registry (houses / clarity-ambiguity pairs) is a **different** registry — pipeline stages and lenses, not agent `primary_role`.

Expert composer **playbook** roles (`operator`, `reviewer`, `requester`…) are operating-contract cast lists inside a domain playbook — also not the fourteen registry roles.

---

## Interaction class (orthogonal)

| Class | Meaning |
|-------|--------|
| `operator_interactive` | Talks with the operator (default) |
| `tool_executing` | Runs tools; less conversational |
| `background` | Silent / scheduled / non-interactive |

---

## Capability posture at birth

| Stage | Agent may | Earned by |
|-------|-----------|-----------|
| **1 · Detect** | observe, measure, read-only probe | birth |
| **2 · Recommend** | report findings, propose fixes | detection proven accurate |
| **3 · Remediate** | mutating / privileged action | explicit operator step-up |

Being profile does **not** grant stage 3.

---

## Birth sequence (expert path)

1. `POST /api/v1/bishop/agent-compose` — read-only decision + SHA-256 `decision_hash`
2. Human / Nephew reviews exact decision (**pin primary_role here for Favor stewards**)
3. `POST /api/v1/bishop/agent-birth` with decision + `expected_decision_hash`
4. Bishop writes package, validates (≥ 88%), registers, issues receipts

Bootstrap: `scripts/bootstrap_birth.py validate|preview` — non-mutating until explicit birth.

---

## Favor steward → registry mapping

| Favor steward | primary_role | secondary_roles | interaction_class |
|---------------|--------------|-----------------|-------------------|
| Map | `visualizer` | `analyzer`, `archivist` | `operator_interactive` |
| Review | `analyzer` | `documenter`, `validator` | `operator_interactive` |
| Marketplace | `validator` | `analyzer`, `resource-manager` | `operator_interactive` |
| Reputation | `analyzer` | `archivist`, `documenter` | `operator_interactive` |
| Presence | `executor` | `validator` | `tool_executing` / `background` |
| YONAW | `validator` | `router`, `analyzer` | `operator_interactive` |
| Ready Play | `analyzer` | `documenter` | `operator_interactive` |

All Favor stewards: birth at detect → recommend. No remediate tools until commissioned.

---

## What must not be born as staff

- One-off migration scripts
- Ephemeral Moment Matrix score sessions
- Launchd watchers without staff-card intent
- Roles invented outside the fourteen without registry update

---

## Open work

1. Explicit `primary_role` on every Favor steward compose decision (do not rely on executor default).
2. Draft full v1.3 manifests with being profiles for P1 stewards.
3. Pin `hierarchy.boss` for Favor product line.
4. Align consciousness text with instrument-rack mounts.
5. Optional: extend SNF registry with short official duty blurbs (today Favor holds the expanded table).

---

## Related

- Bishop: `docs/agent-birth-canal.md`, `docs/expert-agent-birth.md`, `docs/agent-being-profile.md`, `core/schemas.py`, `core/expert_agent_composer.py`
- SNF: `profiles/agent-role-registry.json` (list + law only), `profiles/kingdom-registry.json` (houses — different axis)
- Favor: [Agent Platform](./agent-platform.md), [Favor Stewards](./favor-stewards.md), [Senses Architecture](./senses-architecture.md), [Open Work](./open-work.md)
