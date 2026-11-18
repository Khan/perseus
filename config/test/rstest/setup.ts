import * as fs from "node:fs/promises";
import path from "node:path";

import {beforeEach, expect, rs} from "@rstest/core";
import * as jestDomMatchers from "@testing-library/jest-dom/matchers";
// @ts-expect-error - TS2305 - Module '"aphrodite"' has no exported member 'StyleSheetTestUtils'.
import {StyleSheetTestUtils} from "aphrodite";

// eslint-disable-next-line import/no-unassigned-import -- polyfills crypto
import "../crypto-polyfill";
// eslint-disable-next-line import/no-unassigned-import -- adds a serializer
import "../aphrodite-snapshot-serializer";

/**
 * Runs before each test file, after the test framework is set up and
 * before any tests run.
 */

// Alias `rs` to `jest` to support tests during the Jest -> rstest migration.
// Testing Library also checks for a `jest` global to decide whether to
// advance fake timers while it waits.
Object.assign(globalThis, {jest: rs});

// Add `@testing-library/jest-dom`'s matchers to Rstest's `expect`.
//
// NOTE: The main `@testing-library/jest-dom` does do this automatically, but
// it depends on us having `global: true` set in our Rstest config.
expect.extend(jestDomMatchers);

// Prevent aphrodite from injecting styles into the document. jsdom would
// apply them, and tests rely on unstyled elements (for example, popovers
// that aren't hidden and containers without `pointer-events: none`).
StyleSheetTestUtils.suppressStyleInjection();

const {default: attachShims} = await import("../attach-jsdom-window-shims");
attachShims(globalThis);

beforeEach(() => {
    rs.useFakeTimers();
});

// Globally mock the MathJax Speech Rule Engine locale data for testing.
Object.assign(globalThis, {
    SREfeature: {
        custom(locale: string): Promise<string> {
            return fs.readFile(
                path.join(__dirname, `../mathjax-sre/${locale}.json`),
                "utf-8",
            );
        },
    },
});
