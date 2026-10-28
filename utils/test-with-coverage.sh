#!/usr/bin/env bash

# Runs all tests (Jest and Playwright) with coverage enabled and merges the
# results into a single unified coverage report, in coverage/final.
#
# Note that Jest and Playwright write their coverage to different places:
#   * Jest: coverage/jest (the "coverageDirectory" key in
#     config/test/test.config.js)
#   * Playwright: coverage/playwright/raw, one file per test (COVERAGE_DIR in
#     config/playwright/constants.ts)

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
    rm -rf .nyc_output/
    rm -rf coverage/
}

run_jest() {
    env NODE_OPTIONS="--max_old_space_size=8192" pnpm jest --coverage
}

run_playwright() {
    env PW_COVERAGE=true pnpm pw:ci
}

merge_reports() {
    rm -rf coverage/reports
    mkdir coverage/reports
    cp coverage/jest/coverage-final.json coverage/reports/from-jest.json
    pnpm nyc merge coverage/playwright/raw coverage/reports/from-playwright.json

    # nyc looks in `.nyc_output` for coverage info so we clear it out and copy
    # our two coverage reports there
    rm -rf .nyc_output
    mkdir .nyc_output
    pnpm nyc merge coverage/reports/ .nyc_output/out.json

    pnpm nyc report \
        --reporter lcov \
        --reporter text-summary \
        --report-dir coverage/final
}

pushd "$REPO_ROO" >/dev/null 2>&1

clean
run_jest
run_playwright
merge_reports

if [[ $OPEN_REPORT == YES ]]; then
    open coverage/final/lcov-report/index.html
fi
