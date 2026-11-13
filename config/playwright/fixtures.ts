/**
 * The `test` and `expect` our Playwright specs use.
 *
 * Import them from here (`@internal/playwright`) rather than from
 * `@playwright/test`, so that the fixtures below apply to every spec.
 */
import fs from "node:fs/promises";
import path from "node:path";

import {test as base, expect as baseExpect} from "@playwright/test";

import {scoreMatchers} from "../test/score-matchers";

import {COVERAGE_DIR, COVERAGE_ENABLED} from "./constants";
import {toIstanbulCoverage} from "./coverage";

export const test = base.extend<{collectCoverage: void}>({
    // When coverage is enabled (see `pnpm coverage`), records the JavaScript
    // coverage of each test and writes it to COVERAGE_DIR for merging with
    // Jest's.
    collectCoverage: [
        async ({page, browserName}, use, testInfo) => {
            // Coverage is a Chromium-only API.
            if (!COVERAGE_ENABLED || browserName !== "chromium") {
                await use();
                return;
            }

            // Every `mount()` navigates to the gallery, so keep coverage
            // across navigations.
            await page.coverage.startJSCoverage({resetOnNavigation: false});
            await use();
            const coverage = await toIstanbulCoverage(
                await page.coverage.stopJSCoverage(),
            );

            await fs.mkdir(COVERAGE_DIR, {recursive: true});
            await fs.writeFile(
                path.join(COVERAGE_DIR, `${testInfo.testId}.json`),
                JSON.stringify(coverage),
            );
        },
        {auto: true},
    ],
});

/**
 * Playwright's `expect`, plus the score matchers our Jest tests use, such as
 * `expect(score).toHaveBeenAnsweredCorrectly()`.
 */
export const expect = baseExpect.extend(scoreMatchers);
