# Ops — Runbooks next to the Atlas

| Doc / script | Purpose |
|--------------|---------|
| [host-inventory.md](./host-inventory.md) | Hostnames, IPs, OS |
| [dxp6800-layout.md](./dxp6800-layout.md) | NAS folder tree |
| [../infrastructure-atlas.md](../infrastructure-atlas.md) | Role law |
| [../../scripts/pack-electron-mac.sh](../../scripts/pack-electron-mac.sh) | Mac pack + NAS |
| [../../scripts/spark-batch-example.sh](../../scripts/spark-batch-example.sh) | Spark → NAS |

## First run

1. Mount DXP6800 on MacBook and Spark.
2. Fill host-inventory.md.
3. mkdir per dxp6800-layout.md.
4. MacBook: `chmod +x scripts/*.sh && export FAVOR_NAS_ROOT=/Volumes/favor-nas && ./scripts/pack-electron-mac.sh`
5. Spark: `export FAVOR_NAS_ROOT=/mnt/favor-nas && ./scripts/spark-batch-example.sh`
