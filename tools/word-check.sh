#!/usr/bin/env bash

repo_root=$(git rev-parse --show-toplevel) || {
    echo "Not inside a git repository"
    exit 1
}

path="$repo_root/src/deliverables"

echo "Overview"
grep -v '^\s*|' "$path/Overview.md" \
  | grep -v '^\s*!\[' \
  | sed -E 's/[^a-zA-Z0-9 \t\n]+//g' \
  | wc -w

echo ""

echo "Architecture"
grep -v '^\s*|' "$path/Architecture.md" \
  | grep -v '^\s*!\[' \
  | sed -E 's/[^a-zA-Z0-9 \t\n]+//g' \
  | wc -w

echo ""

echo "Design"
grep -v '^\s*|' "$path/Design.md" \
  | grep -v '^\s*!\[' \
  | sed -E 's/[^a-zA-Z0-9 \t\n]+//g' \
  | wc -w
