import path from "node:path";

import {cssWrapper} from "@internal/perseus-environment/wrap-css-in-layer";
import {build} from "vite";

import type {InlineConfig} from "vite";

const PACKAGE_DIR = path.resolve(import.meta.dirname, "../../..");
const REPO_ROOT = path.resolve(PACKAGE_DIR, "../..");

/** The browser preview's pages: the shell and the frame. */
export const PAGE_DIR = path.join(import.meta.dirname, "page");
/** The MCP Apps page. */
export const APP_DIR = path.join(import.meta.dirname, "app");

/** Where Vite caches its pre-bundled dependencies for perseus-mcp. */
export const CACHE_DIR = path.join(PACKAGE_DIR, "node_modules/.vite");

/**
 * The Vite settings every page that renders Perseus shares: the browser
 * preview's pages and the MCP Apps page.
 */
export const PERSEUS_VITE_CONFIG = {
    // The repo's config, which Storybook uses too: React, and the aphrodite
    // alias Perseus's styles rely on.
    configFile: path.join(REPO_ROOT, "vite.config.mts"),
    // Puts Perseus's CSS in the cascade layers it has in production.
    plugins: [cssWrapper],
    // Perseus and math-input fall back to their English strings in Storybook.
    // The previews are the same kind of dev environment.
    define: {"process.env.STORYBOOK": "true"},
    // Vite writes info to stdout, which carries MCP over stdio; warnings and
    // errors go to stderr.
    logLevel: "warn",
} satisfies InlineConfig;

/**
 * For `build.assetsInlineLimit` where assets are served as files. Vite
 * inlines small SVGs as `url(data:...)` without quoting them, and the quotes
 * inside Wonder Blocks' icons then break the CSS: icons show as solid
 * squares. Storybook turns this off the same way.
 */
export function inlineAssetsExceptSvg(file: string): boolean | undefined {
    return file.endsWith(".svg") ? false : undefined;
}

/**
 * Runs a production build. The browser preview's Vite dev server, in this same
 * process, sets NODE_ENV to "development", and Vite then treats any build as
 * a development one (React's development transform, which also names local
 * source files), whatever its `mode`.
 */
export async function productionBuild(
    config: InlineConfig,
): ReturnType<typeof build> {
    const nodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    try {
        return await build({...config, mode: "production"});
    } finally {
        // Assigning undefined would store the string "undefined".
        if (nodeEnv == null) {
            delete process.env.NODE_ENV;
        } else {
            process.env.NODE_ENV = nodeEnv;
        }
    }
}
