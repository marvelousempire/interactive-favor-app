# Ops — Runbooks next to the Atlas

| Doc / script | Purpose |
|--------------|---------|
| [host-inventory.md](./host-inventory.md) | Hostnames, IPs, OS for MacBook, Spark, DXP6800 |
| [dxp6800-layout.md](./dxp6800-layout.md) | NAS folder tree + mkdir |
| [../infrastructure-atlas.md](../infrastructure-atlas.md) | Role law + pipeline |
| [../gittalk-sync.md](../gittalk-sync.md) | Forge sync + GitTalk packets (not machine pack) |
| [../../scripts/pack-electron-mac.sh](../../scripts/pack-electron-mac.sh) | MacBook: pack + copy to NAS |
| [../../scripts/spark-batch-example.sh](../../scripts/spark-batch-example.sh) | Spark: sample batch → NAS |

## First run (human on the LAN)

1. Mount DXP6800 share on the MacBook and on Spark.
2. Fill [host-inventory.md](./host-inventory.md).
3. Create folders per [dxp6800-layout.md](./dxp6800-layout.md).
4. On MacBook: `chmod +x scripts/*.sh && export FAVOR_NAS_ROOT=/Volumes/favor-nas && ./scripts/pack-electron-mac.sh`
5. On Spark: `export FAVOR_NAS_ROOT=/mnt/favor-nas && ./scripts/spark-batch-example.sh`

Until Electron and electron-builder are dependencies of the app shell, the Mac script produces **scaffold stubs** under `dist/` and still exercises the NAS copy path.

## Forge sync (separate from pack)

Accepted GitHub work brought to GitMore home uses GitTalk sync envelopes — see [gittalk-sync.md](../gittalk-sync.md). Pack scripts do not claim forge parity.
