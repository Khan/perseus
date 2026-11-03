import {readFile} from "node:fs/promises";
import path from "node:path";

import {createServer} from "vite";

import {CACHE_DIR, PERSEUS_VITE_CONFIG} from "./vite-shared";

import type {PreviewPage, PreviewPages} from "../http/server";
import type {Server} from "node:http";

const PAGE_DIR = path.join(import.meta.dirname, "page");

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
        ...PERSEUS_VITE_CONFIG,
        root: PAGE_DIR,
        base: "/preview/",
        cacheDir: CACHE_DIR,
        appType: "custom",
        server: {middlewareMode: true, hmr: {server}},
        // Vite inlines small SVGs as `url(data:...)` without quoting them, and
        // the quotes inside Wonder Blocks' icons then break the CSS: icons
        // show as solid squares. Storybook turns this off the same way.
        build: {
            assetsInlineLimit: (file) =>
                file.endsWith(".svg") ? false : undefined,
        },
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
