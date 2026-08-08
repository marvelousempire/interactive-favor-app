# Open Work Backlog — Architecture Sessions 2026-08-07/08

Consolidated gaps from product framing, agent platform, senses, instrument rack, Moment Matrix, Kingdom houses, solvency formula, and desktop stack work. Update status as items close.

See also: [architecture-session-2026-08.md](./architecture-session-2026-08.md) · [dependency-table.md](./dependency-table.md) · [favor-product.md](./favor-product.md)

---

## How to read this list

| Priority | Meaning |
|----------|---------|
| **P0** | Blocks a usable product. Build first. |
| **P1** | Needed for measurement quality, agents, and real clients. |
| **P2** | Valuable later; not launch-blocking. |

For each open item: **what it is**, **why it matters**, **done when**.

---

## P0 — Product foundation (critical path)

These are the pipes. Without them, nothing else ships.

| Item | What it is | Why it matters | Done when |
|------|------------|----------------|-----------|
| User / favor / vote storage | Persistent records for accounts, locked favors, and YONAW votes | Everything else reads and writes here | Schema + CRUD live; favors and votes survive restart |
| Wire IdentityScore into voice credits | IdentityScore multiplies or gates how many quadratic credits a voter gets | Stops sybil farms from drowning real votes | Credit budget formula uses IdentityScore in production path |
| Finish quadratic module + API | Intensity spend where cost rises with the square of voice | Lets strong opinion cost more than casual clicks | Module + HTTP/API surface; burn-at-window-end behavior |
| Voting UI path | Screens to cast Yes/No + Why + tiers + intensity | Users cannot vote without UI | Electron / Capacitor path can complete one full vote |
| API layer + auth | Backend routes and login / session | Clients need a door and a lock | Auth works; core favor/vote endpoints reachable |

---

## P0 — Product exchange model (documented 2026-08-08; build next)

**Docs done.** Implementation open. This is the social-capital / barter spine from the product framing session.

| Item | Status | What it is | Why it matters | Done when |
|------|--------|------------|----------------|-----------|
| Product definition: social-capital ledger | **Docs done** | Favor as network-leverage ledger, not chore marketplace | Sets language and non-goals | [favor-product.md](./favor-product.md) |
| Verb vs Noun favor taxonomy + UI tabs | **Docs done** | Action favors vs provision favors | Parties know what is locked | [verb-noun-favors.md](./verb-noun-favors.md) |
| Barter settlement (cash % + favors) | **Docs done** | Mix cash and accepted favors to close a deal | Captures asymmetric network value | [favor-barter-solvency.md](./favor-barter-solvency.md) |
| Proposed-favors catalog data model | **Open** | Per-user list of verb/noun favors offered as payment | Payees need something concrete to accept | Catalog CRUD + link lines on an invoice/settlement |
| Escrow alternative on favor-primary deals | **Open** | Cash held so holder can claim money instead of calling the favor | Safety valve without collapsing to pure cash | Provider chosen; lock → redeem-or-cash-out path works |
| Proof tiers for high claimed values | **Open** | Caps / `unproven` flags until delivery history exists | Stops "$80k appearance" with no proof | Policy + UX; high claims gated by history or marked unproven |
| Obligation timeline / breach UX | **Open** | Redeem-by window and what happens if the verb is not performed | Unbounded IOUs rot; breach needs a path | Expiry rules + user-visible breach / close states |
| Legal stance on honor-contract enforceability | **Open** | Product position: honor-only vs stronger instrument | Sets expectations and risk | Written stance per target jurisdiction (may stay honor-first) |

---

## P1 — Favor Moment Matrix + solvency measurement

| Item | What it is | Why it matters | Done when |
|------|------------|----------------|-----------|
| Adapter wrapping `@nephew/moment-matrix` `scorePrompt` | Thin Favor-side call into the upstream package | Do not fork the engine | Favor can score a claim string via the package |
| Claim composer stencil checklist (V·N·D·Q·T) | UI that shows empty Verb/Noun/Destination/Quality/Time slots | Incomplete intent → clarify, not opaque fail | User sees missing slots and can fill before lock |
| Persist `moment_id` + hash on favor/review records | Store which observation backed a claim | Audit and EQ versioning | Fields written on create/update |
| Improve offline Destination/Quality/Time extraction | Better patterns upstream in nephew stencil | V+N-only is too weak for solvent locks | Engine/stencil returns D/Q/T more often without inventing |
| SCORE-NAMESPACES compliance in Favor API responses | No composite soul score in payloads | Hard law: scores counsel, never one blended worth | API rejects or omits illegal composite fields |

---

## P1 — Agent + measurement fusion

| Item | What it is | Why it matters | Done when |
|------|------------|----------------|-----------|
| Map Favor stewards to Bishop births | Which product roles get durable agents first | Map, review, marketplace, reputation | Birth records exist for the first four |
| Explicit `primary_role` on compose decisions | Role set from registry, not executor default | Stops silent wrong-role agents | Compose path always sets primary_role |
| Pin `hierarchy.boss` for Favor product line | Who the Favor line reports to in agent law | Clear authority chain | Config pinned in birth/law surface |
| Consciousness text per steward | Template language each steward "thinks" in | Operators understand agent posture | Templates shipped per first stewards |
| Birth posture detect→recommend only | No auto-remediate tools at birth | Safer first agents | Posture flag enforced |
| Mount schema JSON (instrument rack) | Shared shape for instrument mounts | Media Resolver + Favor share contracts | Schema file published and referenced |
| Reading schema JSON | Shape of a reading aligned to moment_observation | Consistent measurement consumers | Schema file published |
| Explicit Favor consumption contracts per instrument | Counsel vs ranking-input per instrument | Prevents score laundering into rank/pay | Doc + code paths respect the split |
| Device plugin IDs (camera, biometrics, haptics) | Capacitor / Unity device hooks | Senses need real device IDs | ID list registered for mobile/desktop |
| Keep Presence browser scorer schema-compatible | Browser twin stays aligned with nephew package | One source of truth | Presence scorer matches package schema |

---

## P1 — Moment Matrix / instruments (measurement quality)

| Item | What it is | Why it matters | Done when |
|------|------------|----------------|-----------|
| Populate `affect.dominance` for full VAD | Fill the third VAD axis | Incomplete affect otherwise | Dominance present when measured |
| Optional Plutchik overlay labels only | Labels on top of continuous scores | Labels must not replace numbers | Overlay is display-only |
| Build voice tone spectrum + speech pattern curve | Missing signal-family instruments | Richer counsel mounts | Instruments exist and mount |
| Attention decay + proof-over-time curve | Instruments for drift and sustained proof | Time dimension of credibility | Instruments exist and mount |
| Scene Skout drift flags as Smell-channel mounts | Drift as a sense-channel signal | Ties senses architecture to rack | Flags mount under Smell channel |

---

## P1 — App shell

| Item | What it is | Why it matters | Done when |
|------|------------|----------------|-----------|
| Electron shell around voting flow | Desktop app host for vote UI | Desktop users need a real shell | Vote flow runs inside Electron |
| Capacitor mobile twin | Same web surface on mobile | Mobile parity | Vote flow runs on device build |
| Unity embed only for spatial map / light game | Unity is not the outer shell | Avoids wrong architecture | Map/game embedded; shell stays Electron/Capacitor |

---

## P2 — Kingdom counsel + stewards later

Not launch-blocking.

| Item | What it is | Why it matters | Done when |
|------|------------|----------------|-----------|
| Decide which Favor decisions warrant targeted Kingdom routes | Policy list of when to ask houses | Avoids full-court noise | Written routing table |
| Pair 5 (Precision/Vision) for exact-vs-durable product questions | House 5 counsel on hard product calls | Better contrast on durability vs precision | Pair wired for those decision types |
| Scoreboard Studio Matrix + optional Kingdom counsel panels | Display counsel; never average into soul score | Operators see axes without laundering | Panels render; no composite |
| Presence steward durable birth | Agent for presence / biometrics path | Needs permission contracts first | Birth + contracts |
| Ready Play steward | Counsel only on ratings | Ranked layer stays optional | Steward born; no auto rank authority |
| YONAW / Ready Play stewards P2 after P1 four | Later stewards after map/review/marketplace/reputation | Sequencing | Born after P1 four |
| WooCommerce / catalog SKUs for instrument products | Sell instrument products via catalog | Monetization path | SKUs live in catalog |
| TrueSkill 2 engine | Team rating engine | Documented only for now | Engine only if team Ready Play needs it |
| Spiritual lens UX (operator-declared only) | Explicit opt-in lens | Never silent spiritual scoring | UX requires declared lens |

---

## Explicit non-goals

Do not schedule these as work.

- No god-agent expansion of “Nephew” as single identity
- No senses.py as second birth authority
- No composite soul score API
- No literal nutrition chemistry for software agents
- No affect/philosophy scores as automatic rank or payment authority
- No Matrix axes as Ready Play match outcomes or quadratic multipliers
- No twelve permanent agents for twelve Kingdom sides
- No inventing registry roles outside the fourteen without SNF update
- No framing Favor as a state social-credit system
- No chore-marketplace-first positioning (network leverage is the product language)

---

## Related

- [What Favor Is](./favor-product.md)
- [Verb / Noun Favors](./verb-noun-favors.md)
- [Favor Barter & Solvency](./favor-barter-solvency.md)
- [Architecture Session 2026-08](./architecture-session-2026-08.md)
- [Dependency Table](./dependency-table.md)
- [Agent Platform](./agent-platform.md)
- [Bishop Birth Roles](./bishop-birth-roles.md)
- [Favor Stewards](./favor-stewards.md)
- [Favor Moment Matrix](./favor-moment-matrix.md)
- [Instrument Rack](./instrument-rack.md)
- [Kingdom Houses](./kingdom-houses.md)
- [Microslice Solvency Formula](./microslice-solvency-formula.md)
