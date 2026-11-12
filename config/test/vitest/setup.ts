// SPIKE: Vitest version of config/test/test-setup.ts and the other Jest
// `setupFilesAfterEnv` entries.
import * as fs from "node:fs/promises";
import path from "node:path";

import MutationObserver from "@sheerun/mutationobserver-shim";
// @ts-expect-error - TS2305 - Module '"aphrodite"' has no exported member 'StyleSheetTestUtils'.
import {StyleSheetTestUtils} from "aphrodite";

import "@testing-library/jest-dom/vitest";

// The other setup files are CommonJS, shared with Jest.
await import("../crypto-polyfill");
await import("../aphrodite-snapshot-serializer");

StyleSheetTestUtils.suppressStyleInjection();

if (typeof window !== "undefined") {
    // @ts-expect-error - TS2322
    window.getSelection = () => ({removeAllRanges: () => {}});
    window.MutationObserver = MutationObserver;
}

const {default: attachShims} = await import("../attach-jsdom-window-shims");
attachShims(globalThis);


beforeEach(() => {
    vi.useFakeTimers();
});

// Testing Library advances fake timers only when it finds a `jest` global
// (`jestFakeTimersAreEnabled()` in @testing-library/dom). Without one, its
// `asyncWrapper` waits on a fake `setTimeout(..., 0)` that never fires, and
// every user-event call times out.
Object.assign(globalThis, {
    jest: {advanceTimersByTime: vi.advanceTimersByTime},
});

Object.assign(globalThis, {
    SREfeature: {
        custom(locale: string): Promise<string> {
            return fs.readFile(
                path.join(import.meta.dirname, `../mathjax-sre/${locale}.json`),
                "utf-8",
            );
        },
    },
});
