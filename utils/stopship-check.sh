#!/usr/bin/env bash

# For use in Github Actions.
# We use git to search for files that contain the word STOPSHIP. If we find any
# matches, we emit them as Github Action errors.

if MATCHES=$(git grep --line-number --column  -I -eSTOPSHIP -- ':(exclude).github/workflows/node-ci.yml' ':(exclude)./utils/stopship-check.sh'); then
    echo "$MATCHES" | sed -E "s/([^:]*):([^:]*):([^:]*):(.*)/::error file=\1,line=\2,col=\3,title=STOPSHIP found!::\4/"
    exit 1
fi

PLAN_FILES=$(git ls-files '.claude/plans/')
if [ -n "$PLAN_FILES" ]; then
    while IFS= read -r file; do
        echo "::error file=$file,title=Plan file should not be committed::Remove $file from the repository before merging"
    done <<< "$PLAN_FILES"
    exit 1
fi
