#!/bin/bash
set -e

# Prints a newline-separated list of files changed since the commit referred
# to by $UPSTREAM. Without $UPSTREAM, compares against, in order: the target
# of an in-progress rebase, the current branch's upstream, or the point where
# HEAD forked from main.

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

if [ -z "$files" ]; then
    # Callers like `pnpm tesc` otherwise pass silently with nothing to check.
    echo "No changed files since $UPSTREAM" >&2
    exit 0
fi

echo "$files"
