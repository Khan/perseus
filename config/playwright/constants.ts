/**
 * Values shared by the Playwright config, the Vite config that serves the
 * story gallery, and our test fixtures.
 */
import path from "node:path";
import {fileURLToPath} from "node:url";

export const REPO_ROOT = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../..",
);

/** The port Vite serves the story gallery on. */
export const GALLERY_PORT = 3100;

/** Where the story gallery is served. */
export const GALLERY_URL = `http://localhost:${GALLERY_PORT}/`;

/** Where `vite build` writes the story gallery. */
export const GALLERY_BUILD_DIR = path.join(
    REPO_ROOT,
    "genfiles/playwright/gallery",
);

/**
 * Set to "true" to collect JavaScript coverage from the Playwright tests
 * (see `pnpm coverage`).
 */
export const COVERAGE_ENABLED = process.env.PW_COVERAGE === "true";

/** Where the Playwright tests write their coverage, one file per test. */
export const COVERAGE_DIR = path.join(REPO_ROOT, "coverage/playwright/raw");
