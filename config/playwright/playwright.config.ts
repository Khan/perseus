import path from "node:path";

import {defineConfig, devices} from "@playwright/test";

import {GALLERY_URL, REPO_ROOT} from "./constants";

/**
 * Playwright configuration for our component tests.
 *
 * Component tests mount a single React tree into a real browser, for what
 * our unit tests can't check: real CSS, layout, focus order, and native
 * mouse and keyboard input. Prefer unit tests for everything else.
 *
 * Specs live beside the code they test and end in `.spec.ts`. They import
 * `test` and `expect` from `@internal/playwright` (./fixtures.ts), and mount
 * a story into the story gallery (./gallery), which Vite builds and serves
 * while the tests run.
 *
 * Run them with `pnpm pw` (UI mode) or `pnpm pw:ci` (headless).
 */
const isCI = Boolean(process.env.CI);

// How long an assertion retries, and how long an action (a click, a
// `boundingBox()`, and so on) waits for its element, before failing.
// Playwright's default for actions is "no limit", so a hung action runs into
// the test timeout with nothing to say which step hung.
const ASSERTION_TIMEOUT = 5_000;
// How long a page load may take. The gallery is local, so this only needs to
// cover a slow CI runner.
const NAVIGATION_TIMEOUT = 15_000;

export default defineConfig({
    // Specs live beside the code they test, in any package. `.spec.ts` keeps
    // them apart from Jest's `.test.ts` files.
    testDir: path.join(REPO_ROOT, "packages"),
    testMatch: "**/*.spec.ts",
    // Each test's traces, screenshots and so on. Playwright empties this at
    // the start of every run.
    outputDir: path.join(REPO_ROOT, "genfiles/playwright/test-results"),
    // Run the tests within a file in parallel too, not just separate files,
    // so that one long spec file doesn't hold up the run.
    fullyParallel: true,
    // A stray `test.only()` would quietly skip every other test, so CI
    // refuses to run with one.
    forbidOnly: isCI,
    // A test that only passes on a retry is reported as flaky, so it's still
    // visible without failing the build. Khan/frontend's CI data supported
    // two retries.
    retries: isCI ? 2 : 0,
    // In CI: annotations on the PR for each failure, plus an HTML report
    // that the workflow uploads with each run. Locally: one line per test.
    reporter: isCI
        ? [
              ["github"],
              [
                  "html",
                  {
                      open: "never",
                      outputFolder: path.join(
                          REPO_ROOT,
                          "genfiles/playwright/report",
                      ),
                  },
              ],
          ]
        : [["list"]],
    // Nothing reads the git diff Playwright captures for its reports in CI,
    // and fetching the base commit for it can stall a run.
    captureGitInfo: {diff: false},
    // Playwright's default; stated so that the timeouts are all in one place.
    timeout: 30_000,
    expect: {timeout: ASSERTION_TIMEOUT},
    use: {
        // Where `mount()` loads the story gallery from.
        baseURL: GALLERY_URL,
        // The text our tests expect is English, so the browser is too.
        locale: "en",
        // So that dates and times don't depend on where the tests run.
        // (Khan/frontend found that without one, its CI browser reports its
        // time zone as `Etc/Unknown`, which `Intl` and `Temporal` reject.)
        timezoneId: "America/Los_Angeles",
        actionTimeout: ASSERTION_TIMEOUT,
        navigationTimeout: NAVIGATION_TIMEOUT,
        // Trace every first attempt and keep only the ones that fail, so a
        // flaky test leaves a trace of the attempt that failed, not just of
        // the retry that passed.
        trace: "retain-on-first-failure",
        // A screenshot of the page as each failed test left it.
        screenshot: "only-on-failure",
    },
    // Perseus runs on phones and on desktop browsers, so every spec runs in
    // both.
    projects: [
        {
            name: "mobile",
            use: {
                browserName: "chromium",
                // An iPhone 14/15 Pro Max's screen, in CSS pixels.
                viewport: {width: 430, height: 932},
                deviceScaleFactor: 3,
                isMobile: true,
                hasTouch: true,
            },
        },
        {
            name: "desktop",
            use: {...devices["Desktop Chrome"]},
        },
    ],
    webServer: {
        // We build the gallery and serve the bundle, rather than using Vite's
        // dev server: every `mount()` reloads the gallery in a fresh browser
        // context, and fetching Perseus as ~870 separate modules each time
        // (rather than a few bundled files) makes each mount about 4x
        // slower.
        //
        // To iterate on a component with live reloading instead, start
        // `pnpm pw:gallery` in another terminal; `pnpm pw` reuses it.
        command: "pnpm pw:gallery:preview",
        cwd: REPO_ROOT,
        url: GALLERY_URL,
        reuseExistingServer: !isCI,
    },
});
