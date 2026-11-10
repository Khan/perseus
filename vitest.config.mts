import {storybookTest} from "@storybook/addon-vitest/vitest-plugin";
import {playwright} from "@vitest/browser-playwright";
import {configDefaults, defineConfig, mergeConfig} from "vitest/config";

import {argosPlugins} from "./.storybook/argos-vitest-plugin.mjs";
import viteConfig from "./vite.config.mjs";

import type {Plugin} from "vitest/config";

// SPIKE (Argos): Vitest only runs Storybook stories (in a real browser).
// Unit tests still run with Jest (`pnpm test`).
//
// Screenshots are opt-in so local `pnpm exec vitest` runs only render the
// stories (and run their play functions).
const argosEnabled = process.env.ARGOS_SCREENSHOTS === "true";

/**
 * Makes the relative URLs in `.storybook/preview-head.html` root-relative.
 *
 * `preview-head.html` loads the fonts (`./lato.css`, `fonts/lato/...`) and
 * the preview overrides (`./storybook-styles/preview.css`) by relative URL.
 * Storybook serves its preview at `/iframe.html`, so they resolve against
 * the root, where `storybookTest` serves our `staticDirs`. Vitest serves
 * each story file's page at `/<sessionId>/<test file>` instead, so the same
 * URLs 404 there and stories render without those styles.
 *
 * The URLs stay relative in `preview-head.html` itself so the published
 * Storybook keeps working when hosted under a sub-path (GitHub Pages).
 *
 * Runs `post` so it sees the head that `storybookTest` injects.
 */
const rootRelativePreviewHeadUrls: Plugin = {
    name: "perseus:root-relative-preview-head-urls",
    transformIndexHtml: {
        order: "post",
        handler: (html) =>
            html.replace(
                /(<link\b[^>]*\shref=")(?:\.\/)?(?![a-z][a-z0-9+.-]*:|\/|#)/gi,
                "$1/",
            ),
    },
};

// More info at: https://storybook.js.org/docs/writing-tests/vitest-plugin
export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            projects: [
                {
                    extends: true,
                    plugins: [
                        // See: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
                        storybookTest({
                            configDir: ".storybook",
                            storybookUrl:
                                process.env.SB_URL || "http://localhost:6006",
                        }),
                        rootRelativePreviewHeadUrls,
                        // Visual regression with Argos. When enabled, every
                        // story is screenshotted after it renders. Story
                        // modes (themes) come from the existing
                        // `chromatic.modes` parameters, and stories with
                        // `chromatic.disableSnapshot: true` (the global
                        // default) are skipped.
                        // Screenshots land in `./screenshots` and are only
                        // uploaded when `ARGOS_UPLOAD=true` (auth comes from
                        // `ARGOS_TOKEN`).
                        // See: https://argos-ci.com/docs/reference/storybook
                        ...(argosEnabled
                            ? argosPlugins({
                                  uploadToArgos:
                                      process.env.ARGOS_UPLOAD === "true",
                              })
                            : []),
                    ],
                    test: {
                        name: "storybook",
                        // `storybookTest` replaces Vitest's default
                        // `exclude` with its own list (plus whatever we pass
                        // here), so `node_modules` has to be listed again.
                        // Otherwise the `__docs__/**` stories glob follows
                        // the workspace symlinks in `__docs__/node_modules`
                        // and every story file runs twice.
                        exclude: [...configDefaults.exclude],
                        browser: {
                            enabled: true,
                            instances: [{browser: "chromium"}],
                            headless: true,
                            provider: playwright({}),
                        },
                        setupFiles: ["./.storybook/vitest.setup.ts"],
                    },
                },
            ],
        },
    }),
);
