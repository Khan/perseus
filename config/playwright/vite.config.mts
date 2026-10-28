/**
 * The Vite config that builds and serves our Playwright component test
 * gallery (see playwright.config.ts).
 *
 * It builds components the same way Storybook does: with the repo's root
 * Vite config, and with `process.env.STORYBOOK` set.
 */
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

import {defineConfig, loadConfigFromFile, mergeConfig} from "vite";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

export default defineConfig(async (env) => {
    const root = await loadConfigFromFile(
        env,
        resolve(repoRoot, "vite.config.mts"),
    );
    if (!root) {
        throw new Error("Could not load the repo's root vite.config.mts");
    }

    return mergeConfig(root.config, {
        root: repoRoot,
        define: {
            // Perseus checks this to see if it's running in Storybook.
            // Among other things, it makes the i18n contexts default to
            // mock strings.
            "process.env.STORYBOOK": "true",
        },
        build: {
            outDir: "genfiles/playwright/gallery",
            emptyOutDir: true,
            rollupOptions: {
                input: resolve(
                    repoRoot,
                    "config/playwright/gallery/index.html",
                ),
            },
        },
        // Both must match the port in playwright.config.ts.
        server: {port: 3100, strictPort: true},
        preview: {port: 3100, strictPort: true},
    });
});
