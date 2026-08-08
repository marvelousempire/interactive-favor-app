# UGREEN DXP6800 Pro — Folder Layout

Share root = `FAVOR_NAS_ROOT`.

MacBook: `export FAVOR_NAS_ROOT=/Volumes/favor-nas`  
Spark: `export FAVOR_NAS_ROOT=/mnt/favor-nas`

## Tree

```text
$FAVOR_NAS_ROOT/
├── releases/favor/{version}/mac/   # dmg, zip, sha256, latest-mac.yml
├── models/{name}/{revision}/
├── datasets/{name}/
├── instrument-rack/{mount-id}/
├── caches/{npm,electron,unity}/
└── backups/db/
```

## One-time create

```bash
export FAVOR_NAS_ROOT="/Volumes/favor-nas"
mkdir -p "$FAVOR_NAS_ROOT"/{releases/favor,models,datasets,instrument-rack,caches/{npm,electron,unity},backups/db}
```

Do not overwrite a published version folder; use new semver or `version+gitsha`.

See [host-inventory.md](./host-inventory.md) and [../infrastructure-atlas.md](../infrastructure-atlas.md).
