/**
 * Runs before each test file, after the test framework is set up and before
 * any tests run.
 */
import * as fs from "node:fs/promises";
import path from "node:path";

import {beforeEach, expect, rs} from "@rstest/core";
import * as jestDomMatchers from "@testing-library/jest-dom/matchers";
// @ts-expect-error - TS2305 - Module '"aphrodite"' has no exported member 'StyleSheetTestUtils'.
import {StyleSheetTestUtils} from "aphrodite";

// Tests call Jest's API on a `jest` global, and `rs` has the parts they use.
// Testing Library also checks for a `jest` global to decide whether to
// advance fake timers while it waits.
Object.assign(globalThis, {jest: rs});

// `@testing-library/jest-dom`'s main entry point extends a global `expect`
// when it loads, which may run before Rstest defines one. Extend Rstest's.
expect.extend(jestDomMatchers);

// These setup files are CommonJS.
await import("../crypto-polyfill");
await import("../aphrodite-snapshot-serializer");

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
