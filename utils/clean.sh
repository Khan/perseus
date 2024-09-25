#!/usr/bin/env bash

# Removes all build/test artifacts as well as node_modules from the repo

# https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -e # Exit immediately if a command exits with a non-zero status.
set -o pipefail
set -u # Treat unset variables as an error when substituting.

# Identifies the path that the script is in (http://stackoverflow.com/a/246128/11807)
MYPATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# ROOT is the root directory of our project.
ROOT="$MYPATH/.."

pushd "$ROOT"

rm -rf packages/*/dist
rm -rf .nyc_output/
rm -rf coverage/
rm -rf cypress/
rm -rf packages/*/*.tsbuildinfo
rm -rf storybook-static/
