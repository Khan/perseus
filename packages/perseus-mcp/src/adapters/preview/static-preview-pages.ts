import {readFile} from "node:fs/promises";
import path from "node:path";

import {APP_PAGE_FILE, PREVIEW_DIR} from "./prebuilt-layout";

import type {PreviewPage, PreviewPages} from "../http/server";

const CONTENT_TYPES: Record<string, string> = {
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".woff2": "font/woff2",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".json": "application/json; charset=utf-8",
};

/**
 * Serves a prebuilt set of preview pages (see scripts/build-pages-lib.ts)
 * from `dir`,
 * without Vite: the pages' HTML, and their assets under /preview/assets/.
 */
export function createStaticPreviewPages(dir: string): PreviewPages {
    const previewDir = path.resolve(dir, PREVIEW_DIR);
    const assetsDir = path.join(previewDir, "assets");
    return {
        middleware(req, res, next) {
            const {pathname} = new URL(req.url ?? "/", "http://localhost");
            if (!pathname.startsWith("/preview/assets/")) {
                next();
                return;
            }
            const file = path.join(
                previewDir,
                decodeURIComponent(pathname.slice("/preview/".length)),
            );
            // Nothing outside the assets directory, whatever the path says.
            if (!file.startsWith(assetsDir + path.sep)) {
                next();
                return;
            }
            readFile(file).then(
                (data) => {
                    res.writeHead(200, {
                        "Content-Type":
                            CONTENT_TYPES[path.extname(file)] ??
                            "application/octet-stream",
                        // Asset names carry a hash of their content.
                        "Cache-Control": "public, max-age=31536000, immutable",
                    });
                    res.end(data);
                },
                () => next(),
            );
        },
        html: (page: PreviewPage) =>
            readFile(path.join(previewDir, `${page}.html`), "utf8"),
        close: async () => {},
    };
}

/** The prebuilt MCP Apps page in `dir`, read once. */
export function createStaticAppPage(dir: string): {html(): Promise<string>} {
    let html: Promise<string> | null = null;
    return {
        html() {
            html ??= readFile(path.join(dir, APP_PAGE_FILE), "utf8");
            return html;
        },
    };
}
