import {rmSync} from "node:fs";
import {mkdtemp, readFile, rm} from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {createServer} from "vite";

import {
    inlineAssetsExceptSvg,
    PAGE_DIR,
    PERSEUS_VITE_CONFIG,
} from "./vite-shared";

import type {PreviewPage, PreviewPages} from "../http/server";
import type {Server} from "node:http";

/**
 * Serves the preview pages with Vite in middleware mode: it compiles the
 * pages and the Perseus sources they import as the browser asks for them, so
 * there's no build step and a source change shows on the next reload.
 *
 * Hot reload runs over `server`, so several perseus-mcp processes don't
 * compete for Vite's default WebSocket port. Each process pre-bundles the
 * pages' dependencies into a folder of its own in the system's temp folder,
 * removed when it closes: in a shared folder, two processes re-bundling at
 * once deleted each other's, and every page then got Vite's "Outdated
 * Optimize Dep" until a restart.
 */
export async function createVitePreviewPages(
    server: Server,
): Promise<PreviewPages> {
    const cacheDir = await mkdtemp(path.join(os.tmpdir(), "perseus-mcp-vite-"));
    // The server exits without closing Vite (when stdin closes, say), so
    // the folder goes then too. Only synchronous work runs on exit.
    const removeCache = () => rmSync(cacheDir, {recursive: true, force: true});
    process.once("exit", removeCache);
    const vite = await createServer({
        ...PERSEUS_VITE_CONFIG,
        root: PAGE_DIR,
        base: "/preview/",
        cacheDir,
        appType: "custom",
        server: {middlewareMode: true, hmr: {server}},
        build: {assetsInlineLimit: inlineAssetsExceptSvg},
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
        async close() {
            await vite.close();
            process.off("exit", removeCache);
            await rm(cacheDir, {recursive: true, force: true});
        },
    };
}
