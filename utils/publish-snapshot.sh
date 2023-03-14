#!/usr/bin/env bash

# https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -e # Exit immediately if a command exits with a non-zero status.
set -o pipefail
set -u # Treat unset variables as an error when substituting.

# This script uses the `changeset` tool to version each package as a snapshot
# release and then publishes that release to npm.
# It is designed to be run in a Github Action, and by default will abort if the
# `CI`, `GITHUB_EVENT_NAME`, or `GITHUB_REF` environment variables are unset.

# Identifies the path that the script is in (http://stackoverflow.com/a/246128/11807)
MYPATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# ROOT is the root directory of your project. It isn't always needed if your script is at the root of your project, but its a useful convention to adopt so that your scripts can be moved and the only thing that needs to change then is ROOT.
ROOT="$MYPATH/.."

if [ -z ${CI+CI_UNSET} ]; then
    echo "CI environment variable is unset. Exiting!"
    exit 1
fi

if [ -z ${GITHUB_EVENT_NAME+GITHUB_EVENT_NAME_UNSET} ]; then
    echo "GITHUB_EVENT_NAME environment variable is unset. Exiting!"
    exit 1
fi

if [ -z ${GITHUB_REF+GITHUB_REF_UNSET} ]; then
    echo "GITHUB_REF environment variable is unset. Exiting!"
    exit 1
fi

if [[
    "$GITHUB_EVENT_NAME" != "workflow_dispatch" \
    && "$GITHUB_EVENT_NAME" != "pull_request"
]]; then
    exit
fi

# Example GITHUB_REF
# refs/pull/:prNumber/merge

echo "Running for ref: $GITHUB_REF"

if [[ "$GITHUB_REF" =~ refs/pull/([[:digit:]]+)/merge ]]; then
    echo "Found PR #${BASH_REMATCH[1]}"
    PR_NUMBER="PR${BASH_REMATCH[1]}"
else
    echo "Pull Request number not found ref. Exiting!"
    exit 1
fi

node "$ROOT/utils/pre-publish-check-ci.js"

if ! git diff --stat --exit-code HEAD; then
    echo "Git repo is dirty. Stash/Commit your changes before running."
    exit 1
fi

yarn build
yarn extract-strings

yarn changeset version --snapshot "$PR_NUMBER"
yarn changeset publish --no-git-tag --tag "${PR_NUMBER}"

echo "npm_snapshot_tag=$PR_NUMBER" >> "$GITHUB_OUTPUT"

# Now throw away all local changes (we've published a snapshot and that's all
# we needed).
git reset –hard
