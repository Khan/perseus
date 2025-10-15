/**
 * This file is loaded after the jest test framework has be initialized
 * but before any tests have run.
 */
import MutationObserver from "@sheerun/mutationobserver-shim";
// @ts-expect-error - TS2305 - Module '"aphrodite"' has no exported member 'StyleSheetTestUtils'.
import {StyleSheetTestUtils} from "aphrodite";
import jestSerializerHtml from "jest-serializer-html";
import {addSerializer} from "jest-specific-snapshot";

import "@testing-library/jest-dom";

// Prevent aphrodite from trying to inject styles into the CSSOM
StyleSheetTestUtils.suppressStyleInjection();

// Hook in the Jest HTML Serializer to our custom snapshot matcher.
// See https://www.npmjs.com/package/jest-specific-snapshot#with-custom-serializer
addSerializer(jestSerializerHtml);

if (typeof window !== "undefined") {
    // @ts-expect-error - TS2322 - Type '() => { removeAllRanges: () => void; }' is not assignable to type '(() => Selection | null) & (() => Selection | null)'.
    window.getSelection = () => {
        return {
            removeAllRanges: () => {},
        };
    };

    // Include the MutationObserver polyfill for React Testing Library
    // compatibility. The issue is that jest.useRealTimers() doesn't play well
    // with RTL's `findByTestId/waitFor`.
    // See https://github.com/testing-library/dom-testing-library/issues/477
    // Release notes: https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0
    window.MutationObserver = MutationObserver;
}

require("./attach-jsdom-window-shims")(globalThis);

// Make sure we capture any unhandled rejections and log them to the console
// so that we can more easily find them later
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Promise Rejection:", err);
});

beforeEach(() => {
    // Instructs Jest to use fake versions of the standard timer functions.
    // Fake versions must be run/advanced by calling appropriate jest functions.
    // See https://jestjs.io/docs/en/jest-object#mock-timers.
    jest.useFakeTimers();
});
