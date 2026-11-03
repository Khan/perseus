import {copyFile, mkdir, rm} from "node:fs/promises";
import path from "node:path";

import {productionBuild} from "../src/adapters/preview/vite-shared";

import {buildPages} from "./build-pages-lib";

const PACKAGE_DIR = path.resolve(import.meta.dirname, "..");
const PERSEUS_CORE_SRC = path.resolve(PACKAGE_DIR, "../perseus-core/src");

/**
 * Bundles the packaged entry point and every dependency into one file. pnpm's
 * node_modules is symlinks, which a zip can't hold, so nothing stays
 * external. (Rolldown gives bundled CommonJS a require() of its own.)
 */
async function buildServer(outDir: string): Promise<void> {
    await productionBuild({
        configFile: false,
        logLevel: "warn",
        ssr: {noExternal: true, target: "node"},
        // Bundled CommonJS (the TypeScript compiler among it) reads these,
        // which ES modules don't define.
        define: {
            __filename: "import.meta.filename",
            __dirname: "import.meta.dirname",
        },
        build: {
            ssr: path.join(PACKAGE_DIR, "src/main-packaged.ts"),
            outDir,
            emptyOutDir: true,
            target: "node20",
            rolldownOptions: {
                output: {
                    format: "es",
                    entryFileNames: "index.mjs",
                    codeSplitting: false,
                },
            },
        },
    });
}

/**
 * Builds the package directory a Claude Desktop extension is packed from,
 * laid out as `packagedPaths()` expects: the server in `server/index.mjs`,
 * perseus-core's type definitions (which get_widget_spec reads) in `types/`,
 * and the prebuilt preview pages in `pages/`.
 */
export async function buildMcpb(outDir: string): Promise<void> {
    await rm(outDir, {recursive: true, force: true});
    await buildServer(path.join(outDir, "server"));
    await mkdir(path.join(outDir, "types"), {recursive: true});
    for (const file of ["data-schema.ts", "validation.types.ts"]) {
        await copyFile(
            path.join(PERSEUS_CORE_SRC, file),
            path.join(outDir, "types", file),
        );
    }
    await buildPages(path.join(outDir, "pages"));
}
