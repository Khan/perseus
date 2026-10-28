import path from "node:path";

import {defineConfig, devices} from "@playwright/test";

import {GALLERY_URL, REPO_ROOT} from "./constants";

/**
 * Playwright configuration for our component tests.
 *
 * Component tests mount a single React tree into a real browser (rather
 * than JSDOM), for the cases Jest can't cover: real CSS, layout, focus order,
 * and native mouse and keyboard input. Prefer Jest + React Testing Library
 * for everything else.
 *
 * Specs live beside the code they test and end in `.spec.ts`. They import
 * `test` and `expect` from `@internal/playwright` (./fixtures.ts), and mount
 * a story into the story gallery (./gallery), which Vite builds and serves
 * while the tests run.
 *
 * Run them with `pnpm pw` (UI mode) or `pnpm pw:ci` (headless).
 */
const isCI = Boolean(process.env.CI);

export default defineConfig({
    testDir: path.join(REPO_ROOT, "packages"),
    testMatch: "**/*.spec.ts",
    outputDir: path.join(REPO_ROOT, "genfiles/playwright/test-results"),
    fullyParallel: true,
    forbidOnly: isCI,
    retries: isCI ? 2 : 0,
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
    use: {
        baseURL: GALLERY_URL,
        locale: "en",
        // Trace every first attempt and keep only the ones that fail, so a
        // flaky test leaves a trace of the attempt that failed, not just of
        // the retry that passed.
        trace: "retain-on-first-failure",
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
