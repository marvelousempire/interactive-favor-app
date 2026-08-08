# Host Inventory — Favor Infrastructure

**Fill this on the machines.** Private IPs and keys stay off public forks if needed; keep a local copy in sync with [infrastructure-atlas.md](../infrastructure-atlas.md).

---

## MacBook Pro M5 Max (primary Electron host)

| Field | Value |
|-------|--------|
| Hostname | _e.g. favor-mbp_ |
| OS | macOS _version_ |
| Chip / cores | M5 Max · 18-core |
| RAM | 128 GB |
| Local storage | 8 TB |
| LAN IP | |
| VPN IP | |
| SSH | user@host — keys on this machine only for Apple signing |
| Xcode | _version_ |
| Node | _version_ (via nvm/fnm) |
| Role | Dev · Electron pack · Capacitor iOS · Mac signing |

**Signing:** Developer ID Application certificate installed; notarization Apple ID / app-specific password via keychain or `notarytool`.

---

## NVIDIA DGX Spark (GPU / batch)

| Field | Value |
|-------|--------|
| Hostname | _e.g. favor-spark_ |
| OS | _e.g. Ubuntu_ |
| GPU SKU | |
| RAM | |
| LAN IP | |
| VPN IP | |
| SSH | |
| CUDA / drivers | |
| Node (if Linux CI) | |
| Python | |
| Role | Models · Moment Matrix batch · optional Linux packages |

---

## UGREEN DXP6800 Pro (artifact NAS)

| Field | Value |
|-------|--------|
| Hostname | _e.g. favor-dxp_ |
| OS / firmware | UGOS / TrueNAS / other: |
| RAM | 64 GB |
| LAN IP | |
| Share protocol | SMB / NFS / both |
| Mount on MacBook | _e.g. /Volumes/favor-nas_ |
| Mount on Spark | _e.g. /mnt/favor-nas_ |
| Role | Releases · models · datasets · caches · DB volume |

**Required shares (create once):** see [dxp6800-layout.md](./dxp6800-layout.md).

---

## Network notes

| Item | Value |
|------|--------|
| LAN subnet | |
| DNS | |
| Who can SSH Spark | |
| Who can write `/releases` on NAS | MacBook CI user, Spark job user |

---

*Last filled: ____-__-__*
