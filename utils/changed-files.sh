#!/bin/bash
set -e

# Prints files changed from $UPSTREAM, an in-progress rebase's target, or
# the fork point from main. A branch's tracking ref may point to its own
# remote branch, so it cannot reliably identify the target branch. Set
# UPSTREAM explicitly when the target is not main.

if [ -z "${UPSTREAM}" ]; then
    # Git records the original tip and target during a rebase. --git-path
    # also finds these files in worktrees.
    onto="$(git rev-parse --git-path rebase-merge/onto)"
    [ -f "$onto" ] || onto="$(git rev-parse --git-path rebase-apply/onto)"

    tip=HEAD
    if [ -f "$onto" ]; then
        target="$(cat "$onto")"
        orig_head="$(cat "$(dirname "$onto")/orig-head")"
        if git merge-base --is-ancestor "$target" "$orig_head"; then
            # An in-place rebase can start after earlier feature commits.
            tip="$orig_head"
        else
            UPSTREAM="$target"
        fi
    fi

    if [ -z "${UPSTREAM:-}" ]; then
        # Include incoming heads in the prospective merge commit, so changes
        # already brought in from main do not appear as feature changes.
        merge_heads=()
        merge_head="$(git rev-parse --git-path MERGE_HEAD)"
        if [ -f "$merge_head" ]; then
            while IFS= read -r head; do
                merge_heads+=("$head")
            done < "$merge_head"
        fi
        UPSTREAM="$(git merge-base main "$tip" "${merge_heads[@]}")"
    fi
fi

files="$(
    git ls-files --others --exclude-standard
    git diff --name-only --diff-filter=ACMRTUB "$UPSTREAM"
)"

echo "$files"
