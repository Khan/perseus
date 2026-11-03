import {readFile} from "node:fs/promises";
import path from "node:path";

import {cssWrapper} from "@internal/perseus-environment/wrap-css-in-layer";
import {createServer} from "vite";

import type {PreviewPage, PreviewPages} from "../http/server";
import type {Server} from "node:http";

const PAGE_DIR = path.join(import.meta.dirname, "page");
const PACKAGE_DIR = path.resolve(import.meta.dirname, "../../..");
const REPO_ROOT = path.resolve(PACKAGE_DIR, "../..");

/**
 * Serves the preview pages with Vite in middleware mode: it compiles the
 * pages and the Perseus sources they import as the browser asks for them, so
 * there's no build step and a source change shows on the next reload.
 *
 * Hot reload runs over `server`, so several perseus-mcp processes don't
 * compete for Vite's default WebSocket port.
 */
export async function createVitePreviewPages(
    server: Server,
): Promise<PreviewPages> {
    const vite = await createServer({
        // The repo's config, which Storybook uses too: React, and the
        // aphrodite alias Perseus's styles rely on.
        configFile: path.join(REPO_ROOT, "vite.config.mts"),
        root: PAGE_DIR,
        base: "/preview/",
        cacheDir: path.join(PACKAGE_DIR, "node_modules/.vite"),
        appType: "custom",
        // Puts Perseus's CSS in the cascade layers it has in production.
        plugins: [cssWrapper],
        server: {middlewareMode: true, hmr: {server}},
        // Perseus and math-input fall back to their English strings in
        // Storybook. The preview is the same kind of dev environment.
        define: {"process.env.STORYBOOK": "true"},
        // Vite writes info to stdout, which carries MCP over stdio; warnings
        // and errors go to stderr.
        logLevel: "warn",
    });

    return {
        middleware: vite.middlewares,
        async html(page: PreviewPage, url: string) {
            const html = await readFile(
                path.join(PAGE_DIR, `${page}.html`),
                "utf8",
            );
            return vite.transformIndexHtml(url, html);
        },
        close: () => vite.close(),
    };
}
