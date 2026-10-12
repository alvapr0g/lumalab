#!/usr/bin/env bash
# Activa los hooks versionados en .githooks/ para este clon. Se corre una vez.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
git config core.hooksPath .githooks
chmod +x .githooks/*
echo "Hooks activos: $(git config core.hooksPath)"
