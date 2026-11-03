import {spawnSync} from "node:child_process";
import {
    chmod,
    copyFile,
    mkdir,
    readFile,
    rm,
    writeFile,
} from "node:fs/promises";
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
 * node_modules is symlinks, which the zip shouldn't hold, so nothing stays
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

/** The oldest Node the server runs on: import.meta.dirname and filename. */
const MIN_NODE = [20, 11];

/**
 * The Node binary that runs this build, which the bundle ships so testers
 * needn't install Node. Only macOS on Apple silicon is supported, and the
 * binary must be an official build (Node's own layout, signed by the Node.js
 * Foundation, so Gatekeeper accepts it once downloaded) with its license
 * beside it, in `../LICENSE`.
 */
function bundledNode(): {binary: string; license: string} {
    if (process.platform !== "darwin" || process.arch !== "arm64") {
        throw new Error(
            "The bundle is for macOS on Apple silicon; build it there " +
                `(this is ${process.platform}-${process.arch}).`,
        );
    }
    const [major, minor] = process.versions.node.split(".").map(Number);
    if (major < MIN_NODE[0] || (major === MIN_NODE[0] && minor < MIN_NODE[1])) {
        throw new Error(
            `The bundle needs Node ${MIN_NODE.join(".")} or later to ship; ` +
                `this is ${process.versions.node}.`,
        );
    }
    return {
        binary: process.execPath,
        license: path.resolve(path.dirname(process.execPath), "../LICENSE"),
    };
}

/** The tester's instructions, at the top of the unpacked folder. */
function installNotes(version: string, nodeVersion: string): string {
    return `# perseus-mcp ${version} for Claude Desktop (macOS, Apple silicon)

An MCP server for authoring Perseus items, with Node ${nodeVersion}
included.

1. Move this \`perseus-mcp\` folder to where it will stay, for example
   \`~/Applications/perseus-mcp\`.
2. Quit Claude Desktop (Cmd-Q).
3. Open \`~/Library/Application Support/Claude/claude_desktop_config.json\`
   (Claude Desktop: Settings → Developer → Edit Config) and add this under
   \`"mcpServers"\`, with \`/Users/you/Applications/perseus-mcp\` replaced by
   the folder's full path:

   \`\`\`json
   "perseus": {
       "command": "/Users/you/Applications/perseus-mcp/node",
       "args": [
           "/Users/you/Applications/perseus-mcp/server/index.mjs",
           "--stdio"
       ]
   }
   \`\`\`

4. Open Claude Desktop. The Perseus tools show under the tools menu in a
   new chat.

Drafts are saved in \`~/Library/Application Support/perseus-mcp\`. Claude
Desktop's log for the server is
\`~/Library/Logs/Claude/mcp-server-perseus.log\`.

To update, replace the folder with the new one and restart Claude Desktop.
`;
}

/** Runs a command, failing if it fails. */
function run(command: string, args: string[]): void {
    const result = spawnSync(command, args, {stdio: "inherit"});
    if (result.status !== 0) {
        throw new Error(`${command} ${args.join(" ")} failed.`);
    }
}

/**
 * Builds the bundle testers install: a \`perseus-mcp\` folder in \`outDir\`,
 * laid out as \`packagedPaths()\` expects (the server in
 * \`server/index.mjs\`, perseus-core's type definitions in \`types/\`, the
 * prebuilt pages in \`pages/\`) with the Node that runs it, the licenses and
 * install notes, then zipped into \`zipFile\`.
 */
export async function buildBundle(
    outDir: string,
    zipFile: string,
): Promise<void> {
    const node = bundledNode();
    const packageJson = JSON.parse(
        await readFile(path.join(PACKAGE_DIR, "package.json"), "utf8"),
    );
    const bundleDir = path.join(outDir, "perseus-mcp");

    await rm(outDir, {recursive: true, force: true});
    await buildServer(path.join(bundleDir, "server"));
    const copied = {
        ...COPIED_FILES,
        node: node.binary,
        "licenses/Node-LICENSE.txt": node.license,
    };
    for (const [to, from] of Object.entries(copied)) {
        await mkdir(path.dirname(path.join(bundleDir, to)), {recursive: true});
        await copyFile(from, path.join(bundleDir, to));
    }
    await chmod(path.join(bundleDir, "node"), 0o755);
    await buildPages(path.join(bundleDir, "pages"));
    await writeFile(
        path.join(bundleDir, "INSTALL.md"),
        installNotes(packageJson.version, process.versions.node),
    );

    await rm(zipFile, {force: true});
    // ditto zips as Finder does: it keeps the binary's permissions and
    // signature, and Archive Utility unpacks it with a double-click.
    run("ditto", ["-c", "-k", "--keepParent", bundleDir, zipFile]);
}
