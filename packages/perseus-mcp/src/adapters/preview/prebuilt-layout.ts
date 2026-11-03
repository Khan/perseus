// How a prebuilt set of pages (see scripts/build-pages-lib.ts) is laid out. Kept apart
// from the build so serving the pages doesn't load Vite.

/** The browser preview's shell and frame, and their assets in `assets/`. */
export const PREVIEW_DIR = "preview";
/** The MCP Apps page, one self-contained document. */
export const APP_PAGE_FILE = "preview-app.html";
