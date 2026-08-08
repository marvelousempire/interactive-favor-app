# Infrastructure Atlas — Machines · Toolchain · Pipeline

**Status:** Wired as the inventory and role map, 2026-08-08.  
**Honest scope:** This is the Atlas document and proposed mesh. Runtime CI, SSH roles, and artifact paths are **not yet live** until the checklist at the bottom is closed.

Related: [dependency-table.md](./dependency-table.md) · [desktop-stack.md](./desktop-stack.md) · [open-work.md](./open-work.md)

---

## Decision in one line

**MacBook Pro M5 Max is the primary Electron/desktop build and day-to-day dev host. DGX Spark owns GPU/model and heavy offline jobs. UGREEN DXP6800 Pro is the shared store for repos mirrors, build artifacts, and media. Product dependency order still follows the engineering dependency table; this Atlas maps where each layer runs.**

---

## 1. Hardware inventory

| Machine | Specs (as stated) | Primary role | Secondary role |
|---------|-------------------|--------------|----------------|
| **MacBook Pro M5 Max** | Apple silicon, **18-core**, **128 GB** unified memory, **8 TB** local storage | Daily development; **Electron** packaging (macOS); Capacitor iOS prep; local Unity editor when needed | Light API/services; signing and notarization for Mac builds |
| **NVIDIA DGX Spark** | DGX-class GPU workstation | Model inference/training; Moment Matrix / SNF heavy jobs; offline media/instrument batch; optional Linux CI for non-Mac targets | Linux Electron/Node CI if we add Linux desktop targets |
| **UGREEN DXP6800 Pro** | NAS / mini-server, **64 GB RAM** | Artifact store; git mirrors or backup; media and instrument libraries; shared Postgres/object storage when promoted off laptop | Optional light services (registry cache, internal npm, build cache) |

**Not yet recorded (fill when known):** OS versions, hostnames, LAN IPs, VPN, SSH keys, disk layout, GPU model/SKU on Spark, whether DXP6800 runs TrueNAS/UGOS/Docker.

---

## 2. Software stack spine (what depends on what)

Top-down product packaging (see also [desktop-stack.md](./desktop-stack.md)):

```text
Operators / users
    │
    ├── Electron app (desktop shell)
    │       ├── Chromium (UI)
    │       ├── Node main process
    │       └── Embedded Unity view (map / spatial only)
    │
    ├── Capacitor app (mobile twin of same web surface)
    │
    └── Web / admin surfaces → WordPress + WooCommerce (+ Dokan when multi-vendor)

Build & data plane
    │
    ├── Node.js + package manager (pnpm/npm) — app and Electron toolchain
    ├── electron-builder or Electron Forge — package .app / installers
    ├── Xcode / Apple toolchain — Mac sign + notarize; iOS via Capacitor
    ├── Unity Editor + target modules — spatial embed builds
    ├── Python / CUDA stack on DGX — models, batch instruments
    └── Postgres (or equivalent) + object storage — favor/vote/nullifier stores
```

**Critical path remains product-first** ([dependency-table.md](./dependency-table.md)): storage → IdentityScore × voice credits → quadratic → voting UI → API/auth → **then** harden Electron shell around a working vote path. Do not invert: polished Electron packaging does not unblock missing storage.

---

## 3. What builds Electron

| Layer | Tooling | Where it runs |
|-------|---------|----------------|
| App source | TypeScript / web UI (React or equivalent) in this monorepo | MacBook (primary), optional Linux on Spark |
| Runtime shell | **Electron** (Chromium + Node) | Dev: `electron .` on MacBook |
| Packager | **electron-builder** (default preference) or Electron Forge | MacBook for macOS targets |
| Native modules | `node-gyp` / prebuilds as needed | MacBook; Spark if Linux targets |
| Code signing | Apple Developer ID + notarization | **MacBook only** (keys stay on trusted Mac) |
| Windows/Linux installers | electron-builder cross or CI on Spark/Linux | Only if those desktop targets are in scope |
| Auto-update feed | Hosted artifact index on DXP6800 or CDN | DXP6800 as internal feed origin |

**Electron is not built by Unity or WordPress.** Electron packages the web+Node desktop app. Unity produces an embeddable player/library consumed by the shell. WordPress is the remote catalog/API engine, not the desktop packager.

---

## 4. Machine role matrix

| Concern | MacBook Pro M5 Max | DGX Spark | UGREEN DXP6800 Pro |
|---------|--------------------|-----------|---------------------|
| Edit Favor / vote UI | **Primary** | — | — |
| Run Electron dev | **Primary** | Optional Linux smoke | — |
| Package macOS Electron | **Primary** | — | Stores output |
| Capacitor iOS build | **Primary** (Xcode) | — | Stores IPA archives |
| Unity embed build | Primary editor | Optional batch | Asset library |
| Moment Matrix / GPU jobs | Light local | **Primary** | Dataset / checkpoint store |
| CI runners | Local or self-hosted | Self-hosted Linux GPU/CPU | Orchestration optional |
| Artifact & release store | Local `dist/` | Scratch | **Primary durable** |
| DB / object storage (shared) | Dev DB local | — | **Staging/shared** |
| Secrets / signing keys | **Mac signing keys** | Deploy tokens as needed | Vault/backups only, not daily sign |

---

## 5. Pipeline (proposed wire)

```text
[ Developer on MacBook ]
        │  git push
        ▼
[ Git host — GitHub marvelousempire/* ]
        │  webhook / manual
        ▼
[ Build]
   ├─ MacBook (or Mac CI): Electron macOS + Capacitor iOS
   └─ DGX Spark: Linux tests, GPU jobs, optional Linux desktop package
        │
        ▼
[ Artifacts → UGREEN DXP6800 Pro ]
   /releases/favor/{version}/  .dmg / .zip / checksums
   /releases/favor/{version}/  mobile archives
   /models/  /datasets/  /instrument-rack/
        │
        ▼
[ Consume ]
   ├─ Internal install / auto-update feed
   ├─ Staging API + WooCommerce catalog
   └─ DGX reads models/data; MacBook reads release notes + feeds
```

**Stages to implement in order**

1. **Inventory lock** — hostnames, OS, disk mounts, who can SSH.
2. **Shared artifact root** on DXP6800 (`/releases`, `/models`, `/caches`).
3. **MacBook Electron script** — `pnpm build && electron-builder --mac` → copy to DXP6800.
4. **Spark job entrypoints** — documented commands for matrix/model batch; write outputs to DXP6800.
5. **CI** — GitHub Actions or self-hosted runners calling the same scripts (Mac runner for signed builds).
6. **Promotion** — tagged git release → immutable folder on DXP6800 → update feed pointer.

---

## 6. Dependency → runtime map (short)

| Product dependency (P0/P1) | Dev machine | Build machine | Data / artifacts |
|----------------------------|-------------|---------------|------------------|
| User/favor/vote storage | MacBook | — | DXP6800 Postgres/volume when shared |
| YONAW / IdentityScore / quadratic | MacBook | CI on Mac or Spark | — |
| Voting UI | MacBook | Electron package on MacBook | Releases on DXP6800 |
| API + auth | MacBook dev server | Container optional on DXP6800/Spark | DB on DXP6800 |
| Moment Matrix heavy score | MacBook light | **DGX Spark** | Checkpoints on DXP6800 |
| Unity map embed | MacBook Unity | MacBook/Spark targets | Assets on DXP6800 |
| WooCommerce / Dokan catalog | MacBook browser + WP host | — | WP data backup on DXP6800 |
| Motif / Loco strings | MacBook | — | Export backups on DXP6800 |

---

## 7. Capacity notes (why these roles)

- **128 GB / 18-core MacBook** — comfortable for Chromium+Electron+Unity editor+Xcode on one machine; primary human workstation.
- **DGX Spark** — isolate CUDA/long jobs so desktop UI stays responsive; natural home for nephew/SNF batch and future local models.
- **DXP6800 64 GB** — enough RAM for NAS services, caches, and a modest DB; not a substitute for the Mac as Electron sign host or for GPU training.

---

## 8. Checklist — when the Atlas is “wired” live

| # | Item | Done when |
|---|------|-----------|
| 1 | Host record | Hostname, OS, IP/VPN for all three machines in this doc or a private ops annex |
| 2 | Artifact mounts | DXP6800 paths exist and are writable from Mac + Spark |
| 3 | Electron pack script | One command on MacBook produces a signed or ad-hoc `.app`/`.dmg` |
| 4 | Copy-to-NAS | That artifact lands under `/releases/favor/{version}/` |
| 5 | Spark job doc | One documented GPU/batch job writes to the same NAS |
| 6 | Dependency table status | Storage + vote path still tracked as P0; shell packaging does not skip them |
| 7 | Secrets policy | Signing keys only on MacBook; NAS holds backups of non-key secrets as agreed |

Until 1–5 are checked, treat this Atlas as **role law**, not a running factory.

---

## Related

- [Desktop Stack](./desktop-stack.md)
- [Engineering Dependency Table](./dependency-table.md)
- [Open Work](./open-work.md)
- [Tech Spec](./tech-spec.md)
- [Dokan Marketplace](./dokan-marketplace.md)
