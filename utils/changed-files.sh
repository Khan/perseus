#!/bin/sh
set -e

# Prints a null-separated list of files changed since the commit referred to by
# $UPSTREAM, or since the current branch's upstream if $UPSTREAM is empty or
# not set. Untracked files are included.

if [ -z "${UPSTREAM}" ]; then
    if ! git rev-parse --abbrev-ref '@{u}' > /dev/null 2>&1; then
        echo "error: UPSTREAM is not set and the current branch has no upstream" >&2
        exit 1
    fi
fi

git ls-files --others --exclude-standard -z
git diff -z --name-only --diff-filter=ACMRTUB "${UPSTREAM:-@{u}}"
