# Infrastructure Atlas — Machines · Toolchain · Pipeline

**Status:** Role map + ops stubs + GitTalk forge layer noted, 2026-08-08.  
**Honest scope:** Scripts and folder law are in-repo. Live mounts, host IPs, and signed `.dmg` builds still need the LAN checklist. Forge parity uses GitTalk sync receipts, not pack scripts alone.

Related: [dependency-table.md](./dependency-table.md) · [desktop-stack.md](./desktop-stack.md) · [gittalk-sync.md](./gittalk-sync.md) · [ops/README.md](./ops/README.md)

---

## Decision in one line

**MacBook Pro M5 Max is the primary Electron/desktop build and day-to-day dev host. DGX Spark owns GPU/model and heavy offline jobs. UGREEN DXP6800 Pro is the shared store for build artifacts and media. GitTalk governs forge handoffs and home/mirror synchronization. Product dependency order still follows the engineering dependency table.**

---

## 1. Hardware inventory

| Machine | Specs (as stated) | Primary role | Secondary role |
|---------|-------------------|--------------|----------------|
| **MacBook Pro M5 Max** | Apple silicon, **18-core**, **128 GB** unified memory, **8 TB** local storage | Daily development; **Electron** packaging (macOS); Capacitor iOS prep; local Unity editor when needed | Light API/services; signing and notarization for Mac builds |
| **NVIDIA DGX Spark** | DGX-class GPU workstation | Model inference/training; Moment Matrix / SNF heavy jobs; offline media/instrument batch; optional Linux CI | Linux Electron/Node CI if we add Linux desktop targets |
| **UGREEN DXP6800 Pro** | NAS / mini-server, **64 GB RAM** | Artifact store; media and instrument libraries; shared Postgres/object storage when promoted off laptop | Optional light services (registry cache, internal npm, build cache) |

**Fill live fields:** [ops/host-inventory.md](./ops/host-inventory.md)

---

## 2. Software stack spine

```text
Operators / users
    ├── Electron app (Chromium UI + Node main + optional Unity embed)
    ├── Capacitor app (mobile twin)
    └── WordPress + WooCommerce (+ Dokan when multi-vendor)

Build & data plane
    ├── Node.js + pnpm/npm
    ├── electron-builder (preferred) or Electron Forge
    ├── Xcode / Apple notarization (MacBook only)
    ├── Unity Editor (spatial embed)
    ├── Python / CUDA on DGX
    └── Postgres + object storage (favor/vote stores)

Forge coordination
    ├── GitTalk protocol (handoffs, operator Boolean block, CLI triggers)
    ├── GitTalk sync-request/v1 (external forge → GitMore Gitea home)
    └── GitMore family policy + Nephew executors
```

Product-first path: storage → IdentityScore × credits → quadratic → voting UI → API → **then** harden Electron. Packaging does not replace P0 storage.

---

## 3. What builds Electron

| Layer | Tooling | Where |
|-------|---------|--------|
| App source | TypeScript / web UI | MacBook primary |
| Runtime | Electron | `electron .` on MacBook |
| Packager | electron-builder | MacBook macOS targets |
| Signing | Developer ID + notarization | **MacBook only** |
| Artifact copy | `scripts/pack-electron-mac.sh` | → DXP6800 `/releases/favor/{version}/mac` |

Electron is not built by Unity, WordPress, or GitTalk. GitTalk coordinates **git/forge** truth, not the Chromium shell binary.

---

## 4. Machine role matrix

| Concern | MacBook | DGX Spark | DXP6800 |
|---------|---------|-----------|---------|
| Edit / Electron dev | **Primary** | optional Linux smoke | — |
| Package macOS | **Primary** | — | stores output |
| Capacitor iOS | **Primary** | — | stores IPA |
| GPU / Matrix batch | light local | **Primary** | checkpoints |
| Artifact store | local `dist/` | scratch | **Primary durable** |
| Signing keys | **here** | tokens only | backups of non-keys |

---

## 5. Pipelines (keep separate)

**A. Desktop artifact pipeline**

```text
MacBook git work → GitHub
    └─ ./scripts/pack-electron-mac.sh → DXP6800 releases/favor/{version}/mac
Spark batch → ./scripts/spark-batch-example.sh → DXP6800 models/{job}/
```

NAS tree: [ops/dxp6800-layout.md](./ops/dxp6800-layout.md)

**B. Forge sync pipeline (GitTalk)**

```text
accepted commit on GitHub/GitLab
    → gittalk/sync-request/v1 envelope
    → Nephew/GitMore executor (fast-forward only)
    → Gitea gitmore-home first, then mirrors
    → fetch-back + per-target receipts
```

Detail: [gittalk-sync.md](./gittalk-sync.md)

---

## 6. Checklist — wired live

| # | Item | Status | Done when |
|---|------|--------|-----------|
| 1 | Host record template | **In repo** | Fields filled in [ops/host-inventory.md](./ops/host-inventory.md) |
| 2 | Artifact folder law | **In repo** | Paths created on NAS per [ops/dxp6800-layout.md](./ops/dxp6800-layout.md) |
| 3 | Electron pack script | **In repo** (scaffold-safe) | `scripts/pack-electron-mac.sh` run on MacBook |
| 4 | Copy-to-NAS | **Scripted** | Artifact under `releases/favor/{version}/mac` |
| 5 | Spark job example | **In repo** | `scripts/spark-batch-example.sh` writes `models/` |
| 6 | Product P0 still first | Law | Storage + vote path not skipped |
| 7 | Secrets policy | Law | Signing keys only on MacBook |
| 8 | GitTalk sync docs | **In repo** | [gittalk-sync.md](./gittalk-sync.md); live sync still needs executor receipts |

Until host IPs are filled and scripts run against real mounts, machine ops are **ops ready**, not factory complete. Until sync receipts exist, do not claim home/mirror parity.

---

## Related

- [ops/README.md](./ops/README.md)
- [GitTalk Sync](./gittalk-sync.md)
- [Desktop Stack](./desktop-stack.md)
- [Dependency Table](./dependency-table.md)
- [Open Work](./open-work.md)
- [Dokan Marketplace](./dokan-marketplace.md)
