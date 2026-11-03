import path from "node:path";

import {cssWrapper} from "@internal/perseus-environment/wrap-css-in-layer";

import type {InlineConfig} from "vite";

const PACKAGE_DIR = path.resolve(import.meta.dirname, "../../..");
const REPO_ROOT = path.resolve(PACKAGE_DIR, "../..");

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
