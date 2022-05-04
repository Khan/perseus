// @flow
/**
 * This file is loaded after the jest test framework has be initialized
 * but before any tests have run.
 */
import MutationObserver from "@sheerun/mutationobserver-shim";
import {configure} from "@testing-library/dom"; // eslint-disable-line testing-library/no-dom-import, prettier/prettier
import {StyleSheetTestUtils} from "aphrodite";
import Enzyme from "enzyme"; // eslint-disable-line no-restricted-imports
import React16EnzymeAdapter from "enzyme-adapter-react-16"; // eslint-disable-line no-restricted-imports
import jestSerializerHtml from "jest-serializer-html";
import {addSerializer} from "jest-specific-snapshot";

// Prevent aphrodite from trying to inject styles into the CSSOM
StyleSheetTestUtils.suppressStyleInjection();

// Hook in the Jest HTML Serializer to our custom snapshot matcher.
// See https://www.npmjs.com/package/jest-specific-snapshot#with-custom-serializer
addSerializer(jestSerializerHtml);

// Enzyme requires an adapater for each version of React.
Enzyme.configure({adapter: new React16EnzymeAdapter()});

// @testing-library uses "data-testId" by default but wonder-blocks uses "data-test-id"
configure({
    testIdAttribute: "data-test-id",
});

if (typeof window !== "undefined") {
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

    // Override the window.location implementation to mock out assign()
    // We need to access window.location.assign to verify that we're
    // redirecting to the right place.
    /* eslint-disable no-restricted-syntax */
    const oldLocation = window.location;
    delete window.location;
    const mockedLocation = new URL("http://localhost:8081");
    window.location = {
        ...oldLocation,
        host: mockedLocation.host,
        hostname: mockedLocation.hostname,
        href: mockedLocation.href,
        origin: mockedLocation.origin,
        port: mockedLocation.port,
        protocol: mockedLocation.protocol,
        assign: jest.fn(),
    };
    /* eslint-enable no-restricted-syntax */

    // Override window.alert which doesn't exist in node and log any
    // alerts to the console instead.
    delete window.alert;
    window.alert = function (message) {
        // eslint-disable-next-line no-console
        console.log(`KA_TEST captured: window.alert("${message}")`);
    };
}

// eslint-disable-next-line import/no-commonjs
require("./attach-jsdom-window-shims.js")(globalThis);

// Make sure we capture any unhandled rejections and log them to the console
// so that we can more easily find them later
process.on("unhandledRejection", (err) => {
    // eslint-disable-next-line no-console
    console.error("Unhandled Promise Rejection:", err);
});

let consoleWarnsAndErrors = false;
const resetConsoleWarnsAndErrors = () => {
    consoleWarnsAndErrors = false;
};
const registerConsoleWarnsOrErrorCall = () => {
    consoleWarnsAndErrors = true;
};
const reportUnhandledConsoleWarnAndErrors = () => {
    if (consoleWarnsAndErrors) {
        resetConsoleWarnsAndErrors();
        throw new Error(
            "Unhandled console warnings or errors.\n" +
                "Use packages/perseus/src/logging/log.js to log, and make " +
                "sure that your test case mocks the implementation of the " +
                "Log.error call to handle your expected errors.",
        );
    }
};

beforeEach(() => {
    // Instructs Jest to use fake versions of the standard timer functions.
    // Fake versions must be run/advanced by calling appropriate jest functions.
    // See https://jestjs.io/docs/en/jest-object#mock-timers.
    jest.useFakeTimers();

    // Track all of the console errors and warnings so that we can throw an
    // error later if any of them were called
    resetConsoleWarnsAndErrors();
    const originalError = globalThis.console.error;
    jest.spyOn(globalThis.console, "error").mockImplementation((...args) => {
        registerConsoleWarnsOrErrorCall();
        originalError(...args);
    });
    const originalWarn = globalThis.console.warn;
    jest.spyOn(globalThis.console, "warn").mockImplementation((...args) => {
        const message = args[0];

        if (
            message &&
            message.includes(
                "See https://fb.me/react-unsafe-component-lifecycles for details.",
            ) &&
            args[1] // comma separated string of component names if defined
        ) {
            // We ignore React lifecycle warnings for certain components so that
            // we don't have to update these depedencies right now.
            //
            // TODO(FEI-3223): Update react-router-dom to 5.x
            // TODO(FEI-3224): Remove react-motion
            // TODO(FEI-3270): Remove all uses of wonder-blocks-modal-v1
            //
            // NOTE: This will also ignore lifecycle method warnings in any of
            // our components in webapp with the same name.
            const components = args[1].split(", ");
            const ignoredComponents = [
                // react-router-dom
                "Link",
                "MemoryRouter",
                "Redirect",
                "Route",
                "Router",
                "StaticRouter",
                "Switch",

                // react-motion
                "Motion",

                // wonder-blocks-modal-v1
                "ScrollDisabler",
            ];

            if (!components.every((name) => ignoredComponents.includes(name))) {
                registerConsoleWarnsOrErrorCall();
                originalWarn(...args);
            }
        } else {
            registerConsoleWarnsOrErrorCall();
            originalWarn(...args);
        }
    });
});

afterEach(() => {
    // Make sure that any console errors or warnings trigger a test failure.
    // Overwhelmingly these failures are due to real errors that are being
    // hidden, so we should be attempting to fix them.
    reportUnhandledConsoleWarnAndErrors();
});

afterAll(() => {
    // We track to see if there were any console warnings or errors that came
    // up *after* all the tests finished.
    reportUnhandledConsoleWarnAndErrors();
});
