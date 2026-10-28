#!/usr/bin/env bash

# Runs all Jest tests with coverage enabled and writes an HTML coverage report
# to coverage/jest/lcov-report (see "coverageDirectory" in
# config/test/test.config.js).
#
# Our Playwright component tests don't collect coverage.

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
}

run_jest() {
    env NODE_OPTIONS="--max_old_space_size=8192" pnpm jest --coverage \
        --coverageReporters lcov \
        --coverageReporters text-summary
}

pushd "$REPO_ROO" >/dev/null 2>&1

clean
run_jest

if [[ $OPEN_REPORT == YES ]]; then
    open coverage/jest/lcov-report/index.html
fi
