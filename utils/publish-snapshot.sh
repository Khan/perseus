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

# This is used in prepublishOnly hooks to verify that the package is correctly
# versioned for a snapshot release before proceeding.
# This is done to catch a race condition where a main release is occurring
# while a snapshot release is requested, avoiding us publishing packages
# that we shouldn't be.
# See https://khanacademy.atlassian.net/wiki/spaces/ENG/pages/3571646568/Race+condition+breaks+Perseus+release
# Need to export this so that the invoked commands see it.
export SNAPSHOT_RELEASE=1

pushd "$ROOT"

verify_env() {
    if [ -z ${CI+CI_UNSET} ]; then
        echo "Required 'CI' environment variable is unset. Exiting!"
        exit 1
    fi

    if [ -z ${GITHUB_EVENT_NAME+GITHUB_EVENT_NAME_UNSET} ]; then
        echo "Required 'GITHUB_EVENT_NAME' environment variable is unset. Exiting!"
        exit 1
    fi

    if [ -z ${GITHUB_REF+GITHUB_REF_UNSET} ]; then
        echo "Required 'GITHUB_REF' environment variable is unset. Exiting!"
        exit 1
    fi

    if [ -z ${NPM_TOKEN+NPM_TOKEN_UNSET} ]; then
        echo "Required 'NPM_TOKEN' environment variable is unset. Exiting!"
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
    if [[ "$GITHUB_REF" =~ refs/pull/([[:digit:]]+)/merge ]]; then
        echo "Found PR #${BASH_REMATCH[1]}"
        PR_NUMBER="PR${BASH_REMATCH[1]}"
    else
        echo "Pull Request number not found in ref. Exiting!"
        exit 1
    fi
}

check_for_changes() {
    # Check if we need to do any work
    # NOTE: changeset's --output flag has a bug where it always prefixes whatever
    # you pass to it with `cwd` (the code does `path.join(cwd, outputParam)`). So
    # we just allow it to write the file in our local dir (although I would prefer
    # to use `mktemp`).
    pnpm changeset status --verbose --output changeset-status.json
    # We use jq to check if the json outpu has changesets. If not, we exit the
    # process (but not with a non-zero exit status because we don't want to cause
    # the github action to exit with a failure status).
    jq -e '.releases | length | if . > 0 then . else "No changesets found" | halt_error(1) end' \
        < "changeset-status.json" || \
        exit 0
}

pre_publish_check() {
    "$ROOT/utils/pre-publish-check-ci.ts"

    if ! git diff --stat --exit-code HEAD; then
        echo "Git repo is dirty. This is unexpected when running in CI."
        echo "Please review the logs leading up to this error to figure out why " \
            "the repo was touched."
        exit 1
    fi
}

create_npmrc() {
    # Inspiration: https://github.com/changesets/action/blob/8c3f5f5637a95a2327e78d5dabcf357978aedcbb/src/index.ts#L59..L85
    echo "Checking for valid .npmrc"
    if [[ -f "$HOME/.npmrc" ]]; then
        if grep --silent "registry.npmjs.org" "$HOME/.npmrc"; then
            return
        fi
    fi

    # Append or create the file!
    printf "\n//registry.npmjs.org/:_authToken=%s\n" "$NPM_TOKEN" >> "$HOME/.npmrc"
}

######
## Now we start the actual workflow of the script
##
## A similar set of steps to the 'publish:ci' package.json script
##

verify_env
check_for_changes
pre_publish_check
create_npmrc

pnpm build
pnpm build:types

# Now version the packages and publish a snapshot
# By using the `--snapshot` option we are asking Changeset to version the
# packages using a snapshot release. We add the formatted PR number as a prefix
# (that's what the option to `--snapshot` signifies. This results in a version
# number that looks like this: "0.0.0-PR423-20230314222716"
# The trailing numbers are a timestamp of when the version was made.
pnpm changeset version --snapshot "$PR_NUMBER"

# Now we publish this snapshot version to npm. We use `--tag` to tag this
# version in npm. npm supports any number of tags; in fact, when you `pnpm add
# xyz` you are really saying `pnpm add xyz@latest` (where latest is a special
# tag that always exists).
# You can see this for yourself by running:
# `pnpm info react --json | jq '.data["dist-tags"]'
#
# Note: We set this so that (p)npm publish will include the
# provenance information in the package.json file and surface
# it in the npm registry.
# See: https://docs.npmjs.com/generating-provenance-statements
env NPM_CONFIG_PROVENANCE=true pnpm changeset publish --no-git-tag --tag "${PR_NUMBER}"

# Now we export the npm tag name so that later Github Action steps have access
# to this value in the form of:
# `steps.<name-of-step-that-calls-this-script>.outputs.npm_snapshot_tag`
echo "npm_snapshot_tag=$PR_NUMBER" >> "$GITHUB_OUTPUT"

# Now throw away all local changes (we've published a snapshot and that's all
# we needed).
git reset --hard
