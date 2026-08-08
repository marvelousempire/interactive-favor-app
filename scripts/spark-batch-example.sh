#!/usr/bin/env bash
# DGX Spark batch smoke → DXP6800 models/
# export FAVOR_NAS_ROOT=/mnt/favor-nas
# ./scripts/spark-batch-example.sh [job-name]

set -euo pipefail
JOB_NAME="${1:-matrix-smoke}"
NAS_ROOT="${FAVOR_NAS_ROOT:-}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
SHA="$(git rev-parse --short HEAD 2>/dev/null || echo nosha)"

if [[ -z "${NAS_ROOT}" || ! -d "${NAS_ROOT}" ]]; then
  echo "ERROR: set FAVOR_NAS_ROOT to mounted NAS"
  exit 1
fi

OUT="${NAS_ROOT}/models/${JOB_NAME}/${STAMP}-${SHA}"
mkdir -p "${OUT}"
{
  echo "job=${JOB_NAME}"
  echo "utc=${STAMP}"
  echo "git=${SHA}"
  echo "host=$(hostname)"
  command -v nvidia-smi >/dev/null 2>&1 && nvidia-smi -L || echo "nvidia-smi: n/a"
} > "${OUT}/MANIFEST.txt"
echo "smoke ok" > "${OUT}/result.txt"
echo "==> Wrote ${OUT}"
