// This file is loaded by each jest worker before running tests.
// It serves the same purpose as nodejs_runner_window_context_bootstrap.js.

// Prevent aphrodite from trying to inject styles into the CSSOM
const {StyleSheetTestUtils} = require("aphrodite");
StyleSheetTestUtils.suppressStyleInjection();

// Setup various shims
if (typeof self !== "undefined") {
    require("whatwg-fetch");
}
