/**
 * The Vite config that builds and serves our Playwright component test
 * gallery (see playwright.config.ts).
 *
 * It builds components the same way Storybook does: with the repo's root
 * Vite config, and with `process.env.STORYBOOK` set.
 */
import path from "node:path";

import {defineConfig, loadConfigFromFile, mergeConfig} from "vite";

import {GALLERY_BUILD_DIR, GALLERY_PORT, REPO_ROOT} from "./constants";

export default defineConfig(async (env) => {
    const root = await loadConfigFromFile(
        env,
        path.join(REPO_ROOT, "vite.config.mts"),
    );
    if (!root) {
        throw new Error("Could not load the repo's root vite.config.mts");
    }

    return mergeConfig(root.config, {
        // Serve the gallery from `/`. Vite still lets it import from the
        // rest of the repo, since that's the pnpm workspace root.
        root: path.join(REPO_ROOT, "config/playwright/gallery"),
        cacheDir: path.join(REPO_ROOT, "genfiles/playwright/vite-cache"),
        define: {
            // Perseus checks this to see if it's running in Storybook.
            // Among other things, it makes the i18n contexts default to
            // mock strings.
            "process.env.STORYBOOK": "true",
        },
        build: {
            outDir: GALLERY_BUILD_DIR,
            emptyOutDir: true,
            // Maps the bundle back to our source, for coverage and for
            // readable stack traces in Playwright's traces.
            sourcemap: true,
        },
        server: {port: GALLERY_PORT, strictPort: true},
        preview: {port: GALLERY_PORT, strictPort: true},
    });
});
