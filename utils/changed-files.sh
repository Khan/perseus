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
#
# Untracked files are listed too.
#
# Files come from `git diff <commit>`, which compares the working tree to
# <commit> and lists every file that differs, in either direction. A change
# that's in <commit> but not in the working tree is listed just like your
# own edits, so <commit> has to be where the branch forked off, not
# wherever its upstream has moved to since.
#
# Legend: M = main, Y = your commits, X = some other branch, [wt] = the
# working tree, * = the commit diffed against.
#
# Upstream moved ahead (e.g. after a `git fetch`): diff against the fork
# point (M2), not the upstream's tip (M4), which would also list the files
# M3 and M4 changed.
#
#   origin/main (@{u})   M1--M2*-M3--M4
#                             \
#   feature (HEAD)             Y1--Y2--[wt]
#
# Mid-rebase onto a new base: HEAD is detached and has no upstream, so diff
# against the commit being rebased onto (M4).
#
#   origin/main          M1--M2--M3--M4*
#                             \        \
#   original branch            Y1--Y2   Y1'--[wt: Y2' in progress]
#                                       ^ HEAD (detached)
#
# Mid-rebase in place (`git rebase -i HEAD~2`): the commit being rebased
# onto (Y2) is one of the branch's own commits, and diffing against it
# would skip the files Y1 and Y2 changed. Use the branch's fork point (M2),
# as if no rebase were in progress.
#
#   origin/main (@{u})   M1--M2*
#                             \
#   feature                    Y1--Y2--Y3--Y4      (orig-head)
#                                   \
#   rebase in progress               Y3'--[wt]     (onto = Y2)
#                                    ^ HEAD (detached)
#
# Mid-merge of the upstream (e.g. merging main in): HEAD is still the
# pre-merge commit, but the working tree already holds the commits being
# merged in. Diff against the fork point the merge commit will have (M4).
# HEAD's fork point (M2) would also list the files M3 and M4 changed.
#
#   origin/main (@{u})   M1--M2--M3--M4* (MERGE_HEAD)
#                             \        \
#   feature                    Y1--Y2--(merge in progress)
#                                   ^ HEAD
#
# Mid-merge of another branch: the fork point stays on the upstream (M2),
# so X1 and X2 are listed as part of your changes, which they are once the
# merge is committed.
#
#   origin/main (@{u})   M1--M2*
#                             \
#   feature                    Y1--Y2--(merge in progress)
#                                   ^ HEAD
#
#   other branch         M1--X1--X2 (MERGE_HEAD)
#
# Mid-cherry-pick: HEAD stays on the branch, so nothing special happens.
# The picked commit (X2) is becoming one of your changes, so its files
# should be listed.
#
#   origin/main (@{u})   M1--M2*
#                             \
#   feature (HEAD)             Y1--Y2--[wt: + X2's changes]
#
#   other branch         X1--X2 (CHERRY_PICK_HEAD)
#
# No upstream: diff against the merge-base with main (M2). On a stacked
# branch with no upstream this also lists the parent branch's files (P1);
# set UPSTREAM=<parent> to be exact.
#
#   main                 M1--M2*-M3
#                             \
#   parent                     P1
#                               \
#   feature (HEAD, no @{u})      Y1--Y2--[wt]

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
