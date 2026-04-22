#!/bin/bash

# Reads a list of files from standard input and checks formatting and lint in
# each one.

files="$(cat)"

# We use `tr` and `xargs -0` to operate on null-separated filenames. This
# ensures that xargs won't misinterpret filenames with spaces as multiple
# files.
echo "$files" \
    | grep -E "\.(js|jsx|cjs|mjs|ts|tsx|cts|mts)$" \
    | tr '\n' '\0' \
    | xargs -r -0 pnpm eslint

echo "$files" \
    | tr '\n' '\0' \
    | xargs -r -0 pnpm prettier --ignore-unknown --check
