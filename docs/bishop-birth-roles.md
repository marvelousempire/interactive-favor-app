# Bishop Birth Roles — Investigation

**Status:** Investigation note, 2026-08-08.  
**Sources:** `bishop/core/schemas.py`, `docs/agent-birth-canal.md`, `docs/expert-agent-birth.md`, SNF `profiles/agent-role-registry.json`, Favor [favor-stewards.md](./favor-stewards.md).

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

## Semantic Node Agent Role Registry (`primary_role`)

Canonical list (SNF + Bishop `AGENT_ROLES`):

| Role | Responsibility flavor |
|------|----------------------|
| `governor` | Oversight / authority boundary |
| `orchestrator` | Coordinate multi-agent work |
| `supplier` | Provide inputs / resources |
| `creator` | Create artifacts |
| `validator` | Check correctness / compliance |
| `generator` | Produce variants / candidates |
| `router` | Route work / intent |
| `analyzer` | Study and interpret |
| `documenter` | Record and explain |
| `resource-manager` | Allocate / track resources |
| `executor` | Carry out tasks (default) |
| `integrator` | Wire systems together |
| `visualizer` | Spatial / visual presentation |
| `archivist` | Preserve history / evidence |

**Law:** Roles describe **responsibility**. Interaction class, equipped capability, and runtime authority remain **separate** fields. Do not overload `primary_role` with permission.

Manifest rules:

- `primary_role` required; must be one of the fourteen.
- `secondary_roles` optional unique list; must not repeat primary.
- Default primary if unspecified in some paths: `executor`.

Legacy “hybrid” roles migrate to: one primary + one or more secondary.

---

## Interaction class (orthogonal to role)

From `INTERACTION_CLASSES`:

| Class | Meaning |
|-------|--------|
| `operator_interactive` | Talks with the operator (default) |
| `tool_executing` | Runs tools; less conversational |
| `background` | Silent / scheduled / non-interactive |

Interaction class is how the actor relates to the operator. It is not the same as `primary_role` and not the same as permission.

---

## Capability posture at birth (detect → recommend → remediate)

| Stage | Agent may | Earned by |
|-------|-----------|-----------|
| **1 · Detect** | observe, measure, read-only probe | birth |
| **2 · Recommend** | report findings, propose fixes | detection proven accurate |
| **3 · Remediate** | mutating / privileged action | explicit operator step-up |

Privileged tools stay detect/recommend until separately commissioned. Being profile does **not** grant authority.

---

## Birth sequence (expert path)

1. `POST /api/v1/bishop/agent-compose` — read-only decision + SHA-256 `decision_hash`
2. Human / Nephew reviews exact decision
3. `POST /api/v1/bishop/agent-birth` with decision + `expected_decision_hash`
4. Bishop writes package, validates (≥ 88%), registers, issues receipts

Hash drift, unknown domain, duplicates, missing templates, or failed validation → refuse.

Bootstrap path: `scripts/bootstrap_birth.py validate|preview` — preview only until explicit durable birth.

---

## Manifest fields that matter for Favor stewards

| Field | Role in birth |
|-------|----------------|
| `manifest_version` | ≥ 1.3 requires complete `being` |
| `primary_role` / `secondary_roles` | Responsibility registry |
| `interaction_class` | Operator relationship |
| `being` | skills, rules, capabilities, talents, soul, philosophy, **consciousness**, emotion, tone |
| `intent` | primary/secondary + optional `INT-####` ledger IDs |
| `hierarchy.boss` / `workers` | Staff reporting line |
| `category` | `core` \| `home` \| `business` |
| `capabilities` (blueprint allowlist) | chat, task_execution, tool_use, memory_access, agent_creation, orchestration, voice |

Consciousness is where [senses channels](./senses-architecture.md) are written. Emotion/tone stay posture.

---

## Favor steward → Bishop role mapping

Product steward names (map, review, marketplace…) are **not** new registry roles. They map onto the fourteen + interaction class + consciousness.

| Favor steward | primary_role | secondary_roles (suggested) | interaction_class | Birth posture |
|---------------|--------------|-----------------------------|-------------------|---------------|
| Map steward | `visualizer` | `analyzer`, `archivist` | `operator_interactive` | Detect spatial graph; recommend drift; no silent map mutation |
| Review steward | `analyzer` | `documenter`, `validator` | `operator_interactive` | Counsel on tone/quality; never auto-rank from affect |
| Marketplace steward | `validator` | `analyzer`, `resource-manager` | `operator_interactive` | Claim completeness / drift counsel |
| Reputation steward | `analyzer` | `archivist`, `documenter` | `operator_interactive` | Measure trajectories; updates only via documented engines |
| Presence steward | `executor` | `validator` | `tool_executing` or `background` | Presence detect under permission; never authority |
| YONAW steward | `validator` | `router`, `analyzer` | `operator_interactive` | Window health + policy counsel |
| Ready Play steward | `analyzer` | `documenter` | `operator_interactive` | Rating counsel only; no silent rank mutation |

Boss hierarchy for Favor stewards: typically report to a Favor product orchestrator or Nephew-side product boss — set `hierarchy.boss` explicitly at birth; do not leave null unless top-level by design.

---

## What must not be born as staff

- One-off migration scripts
- Ephemeral scoring sessions
- Launchd watchers without staff card intent
- Anything that only needs a Moment Matrix `scorePrompt` call without durable identity

Use temporary workers until the role recurs and consciousness + instruments are defined ([favor-stewards.md](./favor-stewards.md)).

---

## Package truth boundary

Birth package may include manifests, contracts, Declaration of Intent/UDIN, passport, surfaces, product metadata, Terraform/Ansible **projections**, birth/convergence receipts.

Projections are desired state — **not** evidence an external apply ran. Production actuation stays separate.

---

## Open work

1. Draft full v1.3 manifests for map / review / marketplace / reputation stewards with being profiles filled.
2. Pin `hierarchy.boss` for Favor product line.
3. Align each steward’s `consciousness` with instrument-rack mounts.
4. Keep remediate-stage tools out of initial Favor births.
5. Record Intent Ledger IDs (`INT-####`) when Optimus ledger rows exist.

---

## Related

- Bishop: `docs/agent-birth-canal.md`, `docs/expert-agent-birth.md`, `docs/agent-being-profile.md`, `core/schemas.py`
- SNF: `profiles/agent-role-registry.json`, `contracts/SCORE-NAMESPACES.md`
- Favor: [Agent Platform](./agent-platform.md), [Favor Stewards](./favor-stewards.md), [Senses Architecture](./senses-architecture.md), [Open Work](./open-work.md)
