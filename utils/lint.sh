#!/bin/bash

set -eo pipefail

# Reads a list of files from standard input and checks formatting and lint in
# each one. Given `--fix`, fixes lint/formatting.

files="$(cat)"

if [ "$1" == "--fix" ]; then
    eslint_opts="--fix"
    prettier_opts="--write"
else
    eslint_opts=""
    prettier_opts="--check"
fi

# We use `tr` and `xargs -0` to operate on null-separated filenames. This
# ensures that xargs won't misinterpret filenames with spaces as multiple
# files.

# Run prettier first since it's faster and less likely to fail (it pretty much
# only fails on syntax errors, in which case eslint would fail too).
echo "$files" \
    | tr '\n' '\0' \
    | xargs -r -0 pnpm prettier --ignore-unknown $prettier_opts

# The `|| true` is needed to allow this command to exit 0 when grep doesn't
# find any JavaScript files.
echo "$files" \
    | ( grep -E "\.(js|jsx|cjs|mjs|ts|tsx|cts|mts)$" || true ) \
    | tr '\n' '\0' \
    | xargs -r -0 pnpm eslint $eslint_opts
