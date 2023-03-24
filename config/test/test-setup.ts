/**
 * This file is loaded after the jest test framework has be initialized
 * but before any tests have run.
 */
import MutationObserver from "@sheerun/mutationobserver-shim";
import {configure} from "@testing-library/dom"; // eslint-disable-line testing-library/no-dom-import, prettier/prettier
// @ts-expect-error [FEI-5003] - TS2305 - Module '"aphrodite"' has no exported member 'StyleSheetTestUtils'.
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
// @ts-expect-error [FEI-5003] - TS2322 - Type '() => { removeAllRanges: () => void; }' is not assignable to type '(() => Selection | null) & (() => Selection | null)'.
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
// @ts-expect-error [FEI-5003] - TS2790 - The operand of a 'delete' operator must be optional.
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
// @ts-expect-error [FEI-5003] - TS2790 - The operand of a 'delete' operator must be optional.
    delete window.alert;
    window.alert = function (message: any) {
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

const reportUnhandledConsoleWarnAndErrors = (type: string, message: any, ...args) => {
    // We push an error onto the current test's suppressedErrors.
    // This may seem counterintuitive but according to the jest code,
    // the suppressedErrors state contains errors from matchers that can fail
    // tests, and from trying this out, we can see that it does exactly what we
    // want.
    // If we just threw an error, it seems to assign the error to the incorrect
    // test case, whereas this does not.
    const replaceStr = (message, ...args) => {
        // This helper performs argument substitution to mimic what console.log
        // would do.
        let count = 0;
        if (typeof message !== "string") {
            message = JSON.stringify(message);
        }
        return message.replace(/%s/g, () => {
            const substitution = args[count++];
            if (typeof substitution === "string") {
                return substitution;
            }
            return JSON.stringify(substitution);
        });
    };
    const formattedMessage = replaceStr(message, ...args);
    expect
        .getState()
        .suppressedErrors.push(
            new Error(
                `Unhandled console.${type} call.\n` +
                    "If you expect this call, then suppress it using " +
                    `jest.spyOn(console, "${type}").mockImplmentation(); ` +
                    "otherwise, fix the test or code under test to no longer " +
                    `result in this console.${type} call.\n\n` +
                    formattedMessage,
            ),
        );
};

// Track all of the console errors and warnings so that we can throw an
// error to indicate they shouldn't be happening. We monkeypatch rather
// than using spies so that folks can't just remove our checking with a
// call to jest.resetAllMocks().
// If a test legitimately expects a console.warn or console.error call, that
// test should be using jest.spyOn with mockImplementation to suppress our
// custom handling.
if (process.env.GLOBAL_CONSOLE_MOCK !== "false") {
    globalThis.console.error = (...args) => {
// @ts-expect-error [FEI-5003] - TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
        reportUnhandledConsoleWarnAndErrors("error", ...args);
    };
    globalThis.console.warn = (...args) => {
        const message = args[0];

        const isReactUnsafe = (message, componentNames: any) =>
            message &&
            message.includes(
                "See https://fb.me/react-unsafe-component-lifecycles for details.",
            ) &&
            componentNames;

        const isReportableReactUnsafe = (message, componentNames: any) => {
            // We ignore React lifecycle warnings for certain components so that
            // we don't have to update these depedencies right now.
            //
            // TODO(FEI-3223): Update react-router-dom to 5.x
            // TODO(FEI-3224): Remove react-motion
            // TODO(FEI-3270): Remove all uses of wonder-blocks-modal-v1
            //
            // NOTE: This will also ignore lifecycle method warnings in any of
            // our components in webapp with the same name.
            const components = componentNames.split(", ");
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

            return !components.every((name) =>
                ignoredComponents.includes(name),
            );
        };

        if (
            !isReactUnsafe(message, args[1]) ||
            isReportableReactUnsafe(message, args[1])
        ) {
// @ts-expect-error [FEI-5003] - TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
            reportUnhandledConsoleWarnAndErrors("warn", ...args);
        }
    };
}

beforeEach(() => {
    // Instructs Jest to use fake versions of the standard timer functions.
    // Fake versions must be run/advanced by calling appropriate jest functions.
    // See https://jestjs.io/docs/en/jest-object#mock-timers.
    jest.useFakeTimers();
});
