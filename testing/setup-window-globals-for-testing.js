/**
 * Adds globals that our code expects to be set by the environment.
 *
 * @param {window} targetWindow the window global to modify
 */
const setupWindowGlobalsForTesting = (targetWindow) => {
    targetWindow.__HEADERS__ = {
        // sync-start:headers 1631937484 services/static/dev/tools/nodejs-runner/setup-window-globals-for-testing.js
        // For RequestInfo
        "X-KA-is-e2e": "false",
        "X-KA-is-phone": "false",
        "X-KA-is-tablet": "false",
        "X-KA-is-unsupported-browser": "false",
        "X-KA-is-ios": "false",
        "X-Fastly-Country": "ZZ",
        "X-KA-Lang": "en",
        "X-KA-Locale": "en",
        "X-KA-Curriculum": "",

        // For PermissionsInfo
        "X-KA-has-any-permissions": "",
        "X-KA-may-be-under13": "",
        "X-KA-is-phantom": "",

        // For DeployInfo
        "X-KA-Static-Version": "static_version",
        "X-KA-Published-Content-Version": "commit0001",
        // sync-end:headers
    };

    // NOTE(jared): This has to be defined for tests to run (otherwise we get a
    // "accessing an undefined variable" error in load-mathjax.js), but it doesn't
    // have to be anything meaningful. If we add tests that require this, then we
    // can copy the value from webpack.common.js.
    targetWindow.WEBPACK_DEFINE_MATHJAX_URL =
        "we-dont-currently-test-mathjax-i-guess";
};

module.exports = setupWindowGlobalsForTesting;
