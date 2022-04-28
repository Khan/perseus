/**
 * Configuration for the wallabyjs test runner.
 * See https://wallabyjs.com/ for details.
 *
 * To run the tests you'll need to install the wallaby plugin for
 * your IDE, see https://wallabyjs.com/download/.  Once the plugin
 * is installed, use it to select this file as the wallaby config you
 * want to use then start wallaby.
 *
 * IMPORTANT: Running all test suites takes a long time.  Usually you
 * only care about one or two test suites when using wallaby.  Use the
 * "start exclusive test run" command when running tests with wallaby.
 * See https://wallabyjs.com/blog/exclusive-test-runs.html.
 */
// eslint-disable-next-line import/no-commonjs
module.exports = (wallaby) => {
    return {
        autoDetect: true,
        runMode: "onsave",
        trace: true,
    };
};
