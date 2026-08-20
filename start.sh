#!/bin/bash

PORT="${PORT:-8080}"

if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server "$PORT" --bind 0.0.0.0
fi

echo "python3 not found; install python3 to serve this site" >&2
exit 1
