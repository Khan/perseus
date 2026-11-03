import {spawnSync} from "node:child_process";
import {copyFile, mkdir, readFile, rm, writeFile} from "node:fs/promises";
import path from "node:path";

import {productionBuild} from "../src/adapters/preview/vite-shared";

import {buildPages} from "./build-pages-lib";

const PACKAGE_DIR = path.resolve(import.meta.dirname, "..");
const REPO_ROOT = path.resolve(PACKAGE_DIR, "../..");
const PERSEUS_CORE_SRC = path.join(REPO_ROOT, "packages/perseus-core/src");
const FONTS_DIR = path.join(REPO_ROOT, "config/environment/static/fonts");

/** Files the package carries as they are, by their path in it. */
const COPIED_FILES: Record<string, string> = {
    // get_widget_spec reads these.
    "types/data-schema.ts": path.join(PERSEUS_CORE_SRC, "data-schema.ts"),
    "types/validation.types.ts": path.join(
        PERSEUS_CORE_SRC,
        "validation.types.ts",
    ),
    "icon.png": path.join(REPO_ROOT, "logo.png"),
    LICENSE: path.join(REPO_ROOT, "LICENSE"),
    // The pages carry these fonts, whose license must go with them.
    "licenses/Lato-OFL.txt": path.join(FONTS_DIR, "lato/OFL.txt"),
    "licenses/PlusJakartaSans-OFL.txt": path.join(
        FONTS_DIR,
        "jakarta-sans/OFL.txt",
    ),
};

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
 * The extension's manifest (the MCP Bundle format, version 0.3). Claude
 * Desktop runs the server with the Node it ships, over stdio.
 */
async function manifest(): Promise<Record<string, unknown>> {
    const packageJson = JSON.parse(
        await readFile(path.join(PACKAGE_DIR, "package.json"), "utf8"),
    );
    return {
        manifest_version: "0.3",
        name: "perseus-mcp",
        display_name: "Perseus",
        version: packageJson.version,
        description: packageJson.description,
        long_description:
            "Author Khan Academy exercises (Perseus items) with Claude: " +
            "create and edit items, validate and score them, review them " +
            "against known defects, and preview them in the chat or in a " +
            "browser as learners will see them.",
        author: {name: packageJson.author},
        repository: {type: "git", url: packageJson.repository.url},
        support: packageJson.bugs.url,
        license: packageJson.license,
        icon: "icon.png",
        server: {
            type: "node",
            entry_point: "server/index.mjs",
            mcp_config: {
                command: "node",
                args: ["${__dirname}/server/index.mjs", "--stdio"],
                env: {},
            },
        },
        // The server lists its tools and prompts itself.
        tools_generated: true,
        prompts_generated: true,
        keywords: ["perseus", "khan academy", "exercises", "math"],
        compatibility: {
            platforms: ["darwin", "win32", "linux"],
            // import.meta.dirname and import.meta.filename.
            runtimes: {node: ">=20.11.0"},
        },
    };
}

/** Runs the MCP Bundle CLI (a dev dependency), failing if it fails. */
function mcpb(...args: string[]): void {
    const result = spawnSync("pnpm", ["exec", "mcpb", ...args], {
        cwd: PACKAGE_DIR,
        stdio: "inherit",
    });
    if (result.status !== 0) {
        throw new Error(`mcpb ${args.join(" ")} failed.`);
    }
}

/**
 * Builds the Claude Desktop extension: the package directory in `outDir`,
 * laid out as `packagedPaths()` expects (the server in `server/index.mjs`,
 * perseus-core's type definitions in `types/`, the prebuilt pages in
 * `pages/`) with its manifest, icon and licenses, then packed into the
 * `.mcpb` file `mcpbFile`.
 */
export async function buildMcpb(
    outDir: string,
    mcpbFile: string,
): Promise<void> {
    await rm(outDir, {recursive: true, force: true});
    await buildServer(path.join(outDir, "server"));
    for (const [to, from] of Object.entries(COPIED_FILES)) {
        await mkdir(path.dirname(path.join(outDir, to)), {recursive: true});
        await copyFile(from, path.join(outDir, to));
    }
    await buildPages(path.join(outDir, "pages"));
    await writeFile(
        path.join(outDir, "manifest.json"),
        JSON.stringify(await manifest(), null, 4) + "\n",
    );
    mcpb("validate", path.join(outDir, "manifest.json"));
    await rm(mcpbFile, {force: true});
    mcpb("pack", outDir, mcpbFile);
}
