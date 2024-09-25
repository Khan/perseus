#!/usr/bin/env bash

# Runs all tests (Jest and Cypress) with coverage enabled and merge all results
# into a single unified coverage report.

# https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -e # Exit immediately if a command exits with a non-zero status.
set -o pipefail
set -u # Treat unset variables as an error when substituting.

# Identifies the path that the script is in (http://stackoverflow.com/a/246128/11807)
MYPATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# ROOT is the root directory of our project.
ROOT="$MYPATH/.."

pushd "$ROOT"

OPEN_REPORT=NO

while [[ $# -gt 0 ]]; do
  case $1 in
    -o|--open)
      OPEN_REPORT=YES
      shift # past argument
      ;;
    -*|--*)
      echo "Unknown option $1"
      exit 1
      ;;
  esac
done


clean() {
    rm -rf .nyc_output/
    rm -rf coverage/
    rm -rf reports/
}

run_jest() {
    yarn cross-env NODE_OPTIONS=--max_old_space_size=8192 jest --coverage
}

run_cypress() {
    yarn cross-env BABEL_COVERAGE=1 cypress run --component --env CYPRESS_COVERAGE=1
}

merge_reports() {
    rm -rf coverage/reports
    mkdir coverage/reports
    cp coverage/jest/coverage-final.json coverage/reports/from-jest.json
    cp coverage/cypress/coverage-final.json coverage/reports/from-cypress.json

    rm -rf .nyc_output
    mkdir .nyc_output
    yarn nyc merge coverage/reports/ .nyc_output/out.json

    yarn nyc report --reporter lcov --reporter text-summary --report-dir coverage/final
}

clean
run_jest
run_cypress
merge_reports

if [[ $OPEN_REPORT == YES ]]; then
    open coverage/final/lcov-report/index.html
fi
