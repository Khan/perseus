#!/usr/bin/env bash

# This script uses the `changeset` tool to version each package as a snapshot
# release (with an version suffix representing the PR the snapshot came from)
# and then publishes that release to npm with a tag named after the PR.
#
# It is designed to be run in a Github Action, and by default will abort if the
# `CI`, `GITHUB_EVENT_NAME`, or `GITHUB_REF` environment variables are unset.

# https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -e # Exit immediately if a command exits with a non-zero status.
set -o pipefail
set -u # Treat unset variables as an error when substituting.

# Identifies the path that the script is in (http://stackoverflow.com/a/246128/11807)
MYPATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# ROOT is the root directory of our project.
ROOT="$MYPATH/.."

pushd "$ROOT"

set -x

pwd
git status
git branch -vv
git log main..head

set +x

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

# Check if we need to do any work
temp_file=$(mktemp)
yarn changeset status --verbose --output "$temp_file"
jq -e '.releases | length | if . > 0 then . else "Error: No changesets found\\n" | halt_error(1) end' < "$temp_file"


echo "Running for $GITHUB_EVENT_NAME @ $GITHUB_REF"

# Example GITHUB_REF
# refs/pull/:prNumber/merge
if [[ "$GITHUB_REF" =~ refs/pull/([[:digit:]]+)/merge ]]; then
    echo "Found PR #${BASH_REMATCH[1]}"
    PR_NUMBER="PR${BASH_REMATCH[1]}"
else
    echo "Pull Request number not found in ref. Exiting!"
    exit 1
fi

# publish:ci steps
node "$ROOT/utils/pre-publish-check-ci.js"

if ! git diff --stat --exit-code HEAD; then
    echo "Git repo is dirty. This is unexpected when running in CI."
    echo "Please review the logs leading up to this error to figure out why " \
         "the repo was touched."
    exit 1
fi

yarn build
yarn extract-strings

# Now version the packages and publish a snapshot
# By using the `--snapshot` option we are asking Changeset to version the
# packages using a snapshot release. We add the formatted PR number as a prefix
# (that's what the option to `--snapshot` signifies. This results in a version
# number that looks like this: "0.0.0-PR423-20230314222716"
# The trailing numbers are a timestamp of when the version was made.
yarn changeset version --snapshot "$PR_NUMBER"

# Now we publish this snapshot version to npm. We use `--tag` to tag this
# version in npm. npm supports any number of tags; in fact, when you `yarn add
# xyz` you are really saying `yarn add xyz@latest` (where latest is a special
# tag that always exists).
# You can see this for yourself by running:
# `yarn info react --json | jq '.data["dist-tags"]'
yarn changeset publish --no-git-tag --tag "${PR_NUMBER}"

# Now we export the npm tag name so that later Github Action steps have access
# to this value in the form of:
# `steps.<name-of-step-that-calls-this-script>.outputs.npm_snapshot_tag`
echo "npm_snapshot_tag=$PR_NUMBER" >> "$GITHUB_OUTPUT"

# Now throw away all local changes (we've published a snapshot and that's all
# we needed).
git reset --hard
