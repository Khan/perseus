import {mkdir, writeFile} from "node:fs/promises";
import path from "node:path";

import {
    APP_PAGE_FILE,
    PREVIEW_DIR,
} from "../src/adapters/preview/prebuilt-layout";
import {buildAppPage} from "../src/adapters/preview/vite-app-page";
import {
    inlineAssetsExceptSvg,
    PAGE_DIR,
    PERSEUS_VITE_CONFIG,
    productionBuild,
} from "../src/adapters/preview/vite-shared";

/**
 * Builds every preview page into `outDir`, to serve without Vite (see
 * src/adapters/preview/static-preview-pages.ts): the browser preview's shell and frame, with
 * their scripts, styles and fonts, and the MCP Apps page as one file.
 */
export async function buildPages(outDir: string): Promise<void> {
    await productionBuild({
        ...PERSEUS_VITE_CONFIG,
        root: PAGE_DIR,
        // The pages are served under /preview/, as in development.
        base: "/preview/",
        build: {
            outDir: path.join(outDir, PREVIEW_DIR),
            emptyOutDir: true,
            assetsInlineLimit: inlineAssetsExceptSvg,
            rolldownOptions: {
                input: {
                    shell: path.join(PAGE_DIR, "shell.html"),
                    frame: path.join(PAGE_DIR, "frame.html"),
                },
            },
        },
    });
    await mkdir(outDir, {recursive: true});
    await writeFile(path.join(outDir, APP_PAGE_FILE), await buildAppPage());
}
