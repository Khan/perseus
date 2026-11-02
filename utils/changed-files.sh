#!/bin/bash
set -e

# Prints a newline-separated list of files changed since the commit referred
# to by the first item from this list that applies:
#   1. $UPSTREAM
#   2. the target of an in-progress rebase, unless it's one of the branch's
#      own commits (an in-place `git rebase -i HEAD~N`)
#   3. the point where the branch, plus any in-progress merge, forked from
#      its upstream
#   4. the point where the branch forked from main

if [ -z "${UPSTREAM}" ]; then
    # Mid-rebase, HEAD is detached and has no upstream. Git records the commit
    # being rebased onto, plus the branch and commit the rebase started from;
    # `--git-path` finds them in worktrees too.
    onto="$(git rev-parse --git-path rebase-merge/onto)"
    [ -f "$onto" ] || onto="$(git rev-parse --git-path rebase-apply/onto)"

    # Mid-merge, the working tree already holds the commits being merged in,
    # which MERGE_HEAD lists one per line. `git merge-base` below treats
    # every commit after its first argument as one merge, so passing these
    # too gives the fork point the merge commit will have.
    merge_head="$(git rev-parse --git-path MERGE_HEAD)"
    merging=""
    if [ -f "$merge_head" ]; then
        merging="$(cat "$merge_head")"
    fi

    # Outside a rebase, the branch is whatever HEAD is on.
    upstream='@{u}'
    tip=HEAD

    if [ -f "$onto" ]; then
        state="$(dirname "$onto")"
        orig_head="$(cat "$state/orig-head")"
        if git merge-base --is-ancestor "$(cat "$onto")" "$orig_head"; then
            # An in-place `git rebase -i HEAD~N` rebases onto one of the
            # branch's own commits, so use the branch as it was before the
            # rebase started. head-name holds a full ref (refs/heads/...),
            # which `@{u}` doesn't accept.
            head_name="$(cat "$state/head-name")"
            upstream="${head_name#refs/heads/}@{u}"
            tip="$orig_head"
        else
            UPSTREAM="$(cat "$onto")"
        fi
    fi

    if [ -z "${UPSTREAM}" ]; then
        if git rev-parse --abbrev-ref "$upstream" > /dev/null 2>&1; then
            # Use the fork point, not the upstream's tip, so files changed
            # upstream since this branch was created aren't listed as
            # changes. ($merging is unquoted so each merged commit is its
            # own argument.)
            # shellcheck disable=SC2086
            UPSTREAM="$(git merge-base "$upstream" "$tip" $merging)"
        else
            UPSTREAM="$(git merge-base "$tip" main)"
        fi
    fi
fi

files="$(
    git ls-files --others --exclude-standard
    git diff --name-only --diff-filter=ACMRTUB "$UPSTREAM"
)"

echo "$files"
