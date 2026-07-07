#!/usr/bin/env bash

# Runs the Jest test suite with coverage enabled and writes the report.
#
# Jest's coverage output path is configured via the "coverageDirectory" key in
# config/test/test.config.js.
#
# NOTE: Component tests run under Playwright (see playwright-ct.config.ts) and
# are not included in this coverage report.

# https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -e # Exit immediately if a command exits with a non-zero status.
set -o pipefail
set -u # Treat unset variables as an error when substituting.

# Identifies the path that the script is in (http://stackoverflow.com/a/246128/11807)
MYPATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
REPO_ROO="$MYPATH/.."

OPEN_REPORT=NO
while [[ $# -gt 0 ]]; do
  case $1 in
    -o|--open)
      OPEN_REPORT=YES
      shift # past argument
      ;;
    -*)
      echo "Unknown option $1"
      exit 1
      ;;
  esac
done

clean() {
    rm -rf coverage/
    rm -rf reports/
}

run_jest() {
    pnpm cross-env NODE_OPTIONS=--max_old_space_size=8192 jest --coverage
}

pushd "$REPO_ROO" >/dev/null 2>&1

clean
run_jest

if [[ $OPEN_REPORT == YES ]]; then
    open coverage/jest/lcov-report/index.html
fi
