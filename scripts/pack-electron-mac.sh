#!/usr/bin/env bash
# Pack Favor on MacBook Pro M5 Max; copy to DXP6800.
# export FAVOR_NAS_ROOT=/Volumes/favor-nas
# ./scripts/pack-electron-mac.sh
# SKIP_NAS=1 for local only.

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
VERSION="$(node -p "require('./package.json').version")"
SHA="$(git rev-parse --short HEAD 2>/dev/null || echo nosha)"
BUILD_ID="${VERSION}+${SHA}"
DIST_DIR="${ROOT}/dist"
NAS_ROOT="${FAVOR_NAS_ROOT:-}"

echo "==> Favor mac pack ${BUILD_ID}"
mkdir -p "${DIST_DIR}/mac-stub" "${DIST_DIR}/out"
echo "Favor ${BUILD_ID} scaffold $(date -u +%Y-%m-%dT%H:%M:%SZ)" > "${DIST_DIR}/mac-stub/BUILD.txt"

if [[ -x "${ROOT}/node_modules/.bin/electron-builder" ]] || command -v electron-builder >/dev/null 2>&1; then
  npx electron-builder --mac --publish never || true
fi

find "${DIST_DIR}" -maxdepth 3 -type f \( -name '*.dmg' -o -name '*.zip' -o -name 'BUILD.txt' -o -name '*.yml' \) -exec cp -f {} "${DIST_DIR}/out/" \; 2>/dev/null || true

if [[ "${SKIP_NAS:-0}" == "1" ]]; then
  ls -la "${DIST_DIR}/out" || true
  exit 0
fi

if [[ -z "${NAS_ROOT}" || ! -d "${NAS_ROOT}" ]]; then
  echo "ERROR: set FAVOR_NAS_ROOT to mounted DXP6800 path"
  exit 1
fi

DEST="${NAS_ROOT}/releases/favor/${BUILD_ID}/mac"
mkdir -p "${DEST}"
cp -f "${DIST_DIR}/out/"* "${DEST}/" 2>/dev/null || true
if command -v shasum >/dev/null 2>&1; then
  (cd "${DEST}" && for f in *; do [[ -f "$f" && "$f" != *.sha256 ]] && shasum -a 256 "$f" > "${f}.sha256"; done)
fi
echo "==> Done ${DEST}"
ls -la "${DEST}" || true
