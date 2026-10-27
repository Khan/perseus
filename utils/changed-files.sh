#!/bin/bash
set -e

# Prints a newline-separated list of files changed since the commit referred
# to by the first item from this list that is non-empty:
#   1. $UPSTREAM
#   2. the target of an in-progress rebase
#   3. the current branch's upstream
#   4. the point where HEAD forked from main

if [ -z "${UPSTREAM}" ]; then
    # Mid-rebase, HEAD is detached and has no upstream. Git records the commit
    # being rebased onto; `--git-path` finds it in worktrees too.
    onto="$(git rev-parse --git-path rebase-merge/onto)"
    [ -f "$onto" ] || onto="$(git rev-parse --git-path rebase-apply/onto)"

    if [ -f "$onto" ]; then
        UPSTREAM="$(cat "$onto")"
    elif git rev-parse --abbrev-ref '@{u}' > /dev/null 2>&1; then
        UPSTREAM="@{u}"
    else
        UPSTREAM="$(git merge-base HEAD main)"
    fi
fi

files="$(
    git ls-files --others --exclude-standard
    git diff --name-only --diff-filter=ACMRTUB "$UPSTREAM"
)"

echo "$files"
