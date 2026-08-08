# GitTalk Synchronization — Favor Context

**Status:** Investigation notes, 2026-08-08.  
**Canonical product:** [marvelousempire/app-gittalk](https://github.com/marvelousempire/app-gittalk)  
**Nephew law:** `RL-GITTALK-SYNC-001` (synchronization source law)

GitTalk is the governed conversational and forge-sync protocol for Favor-related repos. It does not replace Electron pack or the DXP6800 artifact store; it governs how **accepted git truth** moves between forges and how agents hand off with receipts.

---

## Decision in one line

**Forge work uses GitTalk packets and sync envelopes (fast-forward only, home first, receipted). Machine builds still follow the Infrastructure Atlas.**

---

## Two mechanisms

| Mechanism | Role |
|-----------|------|
| **Conversation protocol** | Durable identity, state, evidence, CLI trigger, Boolean operator block on issues/PRs (`GITTALK-PROTOCOL.md`) |
| **Forge sync request** | Machine contract `gittalk/sync-request/v1` — bring external forge work home to GitMore (Gitea) |

Chat alone never satisfies GitTalk. Missing CLI trigger or operator block keeps `gittalk-complete` false.

---

## Sync flow (RL-GITTALK-SYNC-001)

```text
accepted source commit
→ GitTalk synchronization envelope
→ recipient safety validation
→ registered remote discovery (never guess)
→ authority and direction resolution
→ ancestry comparison
→ fast-forward-only synchronization
→ authoritative home first, then mirrors from home
→ fetch-back verification
→ per-target receipts
→ GitTalk final disposition
```

**Stops on:** divergence, missing credentials, protected refs, unknown ownership, uncertain direction.  
**Force push:** requires separate explicit human authorization naming exact target and reason.

---

## Sync request schema summary (`gittalk/sync-request/v1`)

Source of truth: `app-gittalk/contract/gittalk-sync-request.schema.json`.

| Block | Constraints |
|-------|-------------|
| `intent` | `bring-external-forge-work-home` |
| `source.forge` | `github` \| `gitlab` |
| `destination` | `gitea` + authority `gitmore-home` |
| `scope.mode` | `inspect-only` · `missing-only` · `missing-and-fast-forward` |
| `authority.force_push` | always `false` |
| `authority.automatic_divergence_resolution` | always `false` |
| `authority.protected_ref_override` | always `false` |
| `state` | proposed → accepted → executing → blocked \| completed \| verified |
| `cli` | working_directory, trigger, expected_receipt, blocker |
| `operator` | Boolean action block + FINAL command enum |

`additionalProperties: false` on all objects. Packet transport ≠ proof that a forge moved.

Factory helper: `createSyncRequest()` in `app-gittalk/src/contract.mjs` → CLI shape `make gitmore SOURCE=… OWNER=… MODE=…` and receipt under `~/.nephew/receipts/gitmore-sync/`.

---

## External boundary rooms

Work that leaves GitHub (Gitea parity, private machines, runtime install) requires a durable GitTalk room until receipts close it. See nephew `docs/gittalk/GITTALK-EXTERNAL-BOUNDARY-ROOM-LAW.md`.

Favor Atlas actions on MacBook / DGX / DXP6800 are **outside-GitHub boundaries** when claimed complete from a GitHub-only agent session — room + receipt required, not prose.

---

## GitMore relationship

- **GitTalk** owns protocol, handoffs, operator safety, sync envelope.
- **GitMore** owns family membership, forge policy, home coordination.
- **Nephew** runs executors for sync/upkeep.

GitTalk is the first governed subsidiary member of the GitMore family (`app-gittalk/docs/GITMORE-FAMILY-MEMBERSHIP.md`).

---

## Related (this repo)

- [Infrastructure Atlas](./infrastructure-atlas.md)
- [ops/README.md](./ops/README.md)
- [Desktop Stack](./desktop-stack.md)
- [Open Work](./open-work.md)
