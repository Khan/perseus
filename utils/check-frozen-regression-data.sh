#!/usr/bin/env bash

# For use in Github Actions.
#
# Guards the frozen Perseus regression-test fixtures. These files capture real
# historical Perseus data formats so the parser is forever tested against data
# that already exists in the wild. Each one carries a header reading:
#
#     // WARNING: Do not change or delete this file! ...
#
# Policy: you may ADD new fixtures, but existing ones must never be modified,
# renamed, or deleted. Editing or removing one risks letting a parser
# regression ship undetected and break clients. This script fails if a PR
# touches any existing fixture; adding new files is allowed.
#
# Usage: check-frozen-regression-data.sh <base-sha> <head-sha>

set -euo pipefail

BASE_SHA="${1:?base sha required}"
HEAD_SHA="${2:?head sha required}"

REGRESSION_DIR="packages/perseus-core/src/parse-perseus-json/regression-tests"
PROTECTED_DIRS=(
    "$REGRESSION_DIR/item-data"
    "$REGRESSION_DIR/article-data"
    "$REGRESSION_DIR/renderer-data"
    "$REGRESSION_DIR/user-input-data"
)

# --diff-filter selects only the change types we forbid:
#   D = deleted, M = modified, R = renamed, C = copied, T = type changed.
# Added (A) is intentionally excluded — adding new fixtures is allowed.
#
# The `A...B` (three-dot) range diffs B against the merge-base of A and B, i.e.
# exactly the changes this PR introduces on top of the base branch.
OFFENDING=$(git diff --name-status --diff-filter=DMRCT \
    "$BASE_SHA...$HEAD_SHA" -- "${PROTECTED_DIRS[@]}")

if [ -n "$OFFENDING" ]; then
    echo "::error title=Frozen parser regression fixture changed::Existing regression-test fixtures may not be modified, renamed, or deleted."
    echo ""
    echo "The following protected files were changed:"
    echo "$OFFENDING" | sed 's/^/    /'
    echo ""
    echo "These fixtures capture historical Perseus data formats and must never"
    echo "change so the parser is always tested against real, published data."
    echo "If you need new coverage, ADD a new file to the directory instead of"
    echo "editing an existing one. See the README for more details:"
    echo "https://github.com/Khan/perseus/tree/main/packages/perseus-core/src/parse-perseus-json#regression-testing-against-old-data"
    exit 1
fi

echo "No frozen regression-test fixtures were modified. ✅"
