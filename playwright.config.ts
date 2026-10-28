import {defineConfig} from "@playwright/test";

/**
 * Playwright configuration for our component tests.
 *
 * Component tests mount a single React tree into a real browser (rather
 * than JSDOM), for the cases Jest can't cover: real CSS, layout, focus order,
 * and native mouse and keyboard input. Prefer Jest + React Testing Library
 * for everything else.
 *
 * Specs live beside the code they test and end in `.spec.ts`. A spec mounts a
 * story (a `*.story.tsx` export) into the story gallery in
 * config/playwright/gallery, which Vite builds and serves while the tests
 * run.
 *
 * Run them with `pnpm pw` (UI mode) or `pnpm pw:ci` (headless).
 */
const isCI = Boolean(process.env.CI);

// Vite serves the gallery on this port; see config/playwright/vite.config.mts.
const GALLERY_URL =
    "http://localhost:3100/config/playwright/gallery/index.html";
// Where Playwright writes the HTML report of a CI run.
const REPORT_DIR = "./genfiles/playwright/report";

export default defineConfig({
    testDir: "./packages",
    testMatch: "**/*.spec.ts",
    outputDir: "./genfiles/playwright/test-results",
    fullyParallel: true,
    forbidOnly: isCI,
    retries: isCI ? 2 : 0,
    reporter: isCI
        ? [["github"], ["html", {open: "never", outputFolder: REPORT_DIR}]]
        : [["list"]],
    // Nothing reads the git diff Playwright captures for its reports in CI,
    // and fetching the base commit for it can stall a run.
    captureGitInfo: {diff: false},
    use: {
        baseURL: GALLERY_URL,
        // Perseus is used primarily on mobile, so we test at an iPhone 14/15
        // Pro Max sized viewport.
        viewport: {width: 430, height: 932},
        locale: "en",
        // Trace every first attempt and keep only the ones that fail, so a
        // flaky test leaves a trace of the attempt that failed, not just of
        // the retry that passed.
        trace: "retain-on-first-failure",
        screenshot: "only-on-failure",
    },
    projects: [
        {
            name: "chromium",
            use: {browserName: "chromium"},
        },
    ],
    webServer: {
        // We build the gallery and serve the bundle, rather than using Vite's
        // dev server: every `mount()` reloads the gallery, and loading
        // Perseus's ~1,600 modules unbundled each time makes tests run about
        // twice as slow.
        //
        // To iterate on a component with live reloading instead, start
        // `pnpm pw:gallery` in another terminal; `pnpm pw` reuses it.
        command: "pnpm pw:gallery:preview",
        url: GALLERY_URL,
        reuseExistingServer: !isCI,
    },
});
