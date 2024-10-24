/* eslint-disable import/no-commonjs */
/**
 * Only log console statements when the test errors out.
 * From: https://gist.github.com/GeeWee/71db0d9911b4a087e4b2486386168b05
 */
const {getConsoleOutput} = require("@jest/console");
const JestReporters = require("@jest/reporters");
const chalk = require("chalk");

const DefaultReporter = JestReporters.DefaultReporter;
const getResultHeader = JestReporters.utils.getResultHeader;

const TITLE_BULLET = chalk.bold("\u25cf ");

// This Jest reporter does not output any console.log except when the tests are
// failing, see: https://github.com/mozilla/addons-frontend/issues/2980.
class LogOnFailedTestReporter extends DefaultReporter {
    printTestFileHeader(testPath, config, result) {
        this.log(getResultHeader(result, this._globalConfig, config));

        const consoleBuffer = result.console;
        const testFailed = result.numFailingTests > 0;

        if (testFailed && consoleBuffer && consoleBuffer.length) {
            // biome-ignore format: keep these on the same line
            this.log(
         `  ${TITLE_BULLET}Console\n\n${getConsoleOutput(
           consoleBuffer,
           config,
           this._globalConfig,
         )}`
       );
        }
    }
}

module.exports = LogOnFailedTestReporter;
