import {spawnSync} from "node:child_process";
import {createHash} from "node:crypto";
import {existsSync} from "node:fs";
import {
    chmod,
    copyFile,
    cp,
    mkdir,
    readFile,
    rm,
    writeFile,
} from "node:fs/promises";
import path from "node:path";

import {productionBuild} from "../src/adapters/preview/vite-shared";
import {gitCommit} from "../src/build-info";

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
    const packageJson = JSON.parse(
        await readFile(path.join(PACKAGE_DIR, "package.json"), "utf8"),
    );
    // What get_server_info reports as this bundle's version and commit.
    const build = {
        version: packageJson.version,
        commit: gitCommit(PACKAGE_DIR),
    };
    await productionBuild({
        configFile: false,
        logLevel: "warn",
        ssr: {noExternal: true, target: "node"},
        // Bundled CommonJS (the TypeScript compiler among it) reads these,
        // which ES modules don't define.
        define: {
            __filename: "import.meta.filename",
            __dirname: "import.meta.dirname",
            __PERSEUS_MCP_BUILD__: JSON.stringify(build),
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

/** The platforms a bundle can be built for, by the name in its zip's name. */
export const PLATFORMS = [
    "macos-arm64",
    "windows-x64",
    "windows-arm64",
] as const;
export type Platform = (typeof PLATFORMS)[number];

export function isPlatform(name: string): name is Platform {
    return PLATFORMS.some((platform) => platform === name);
}

type BundledNode = {
    /** The Node binary, copied into the bundle as `binaryName`. */
    binary: string;
    binaryName: string;
    /** Node's license, which ships with it. */
    license: string;
};

/**
 * The Node that runs this build. Every bundle ships its version, so each
 * platform's server runs on the Node the build was checked with.
 */
function nodeVersion(): string {
    const version = process.versions.node;
    const [major, minor] = version.split(".").map(Number);
    if (major < MIN_NODE[0] || (major === MIN_NODE[0] && minor < MIN_NODE[1])) {
        throw new Error(
            `The bundles need Node ${MIN_NODE.join(".")} or later to ship; ` +
                `this is ${version}.`,
        );
    }
    return version;
}

/**
 * For macOS: the Node binary that runs this build, which must be an official
 * Apple silicon build (Node's own layout, signed by the Node.js Foundation,
 * so Gatekeeper accepts it once downloaded) with its license beside it, in
 * `../LICENSE`.
 */
function macosNode(): BundledNode {
    if (process.platform !== "darwin" || process.arch !== "arm64") {
        throw new Error(
            "The macOS bundle ships the Node that runs the build, so build it " +
                `on macOS on Apple silicon (this is ${process.platform}-` +
                `${process.arch}).`,
        );
    }
    return {
        binary: process.execPath,
        binaryName: "node",
        license: path.resolve(path.dirname(process.execPath), "../LICENSE"),
    };
}

/**
 * Downloads `url` into `file` with curl, which, unlike Node's fetch, goes
 * through the proxy the environment names.
 */
function download(url: string, file: string): void {
    run("curl", [
        "--fail",
        "--silent",
        "--show-error",
        "--location",
        "--output",
        file,
        url,
    ]);
}

async function sha256Of(file: string): Promise<string> {
    return createHash("sha256")
        .update(await readFile(file))
        .digest("hex");
}

/**
 * For Windows: `node.exe` and its license from Node's official zip for
 * `arch`, downloaded once into `cacheDir` and checked against the SHA-256
 * Node publishes for it.
 */
async function windowsNode(
    arch: "x64" | "arm64",
    version: string,
    cacheDir: string,
): Promise<BundledNode> {
    const name = `node-v${version}-win-${arch}`;
    const base = `https://nodejs.org/dist/v${version}`;
    const zip = path.join(cacheDir, `${name}.zip`);
    await mkdir(cacheDir, {recursive: true});
    const shasumsFile = path.join(cacheDir, `SHASUMS256-v${version}.txt`);
    download(`${base}/SHASUMS256.txt`, shasumsFile);
    const shasums = await readFile(shasumsFile, "utf8");
    const expected = shasums
        .split("\n")
        .map((line) => line.trim().split(/\s+/))
        .find(([, file]) => file === `${name}.zip`)?.[0];
    if (expected == null) {
        throw new Error(`Node's SHASUMS256.txt lists no ${name}.zip.`);
    }
    if (!existsSync(zip) || (await sha256Of(zip)) !== expected) {
        download(`${base}/${name}.zip`, zip);
        const actual = await sha256Of(zip);
        if (actual !== expected) {
            await rm(zip, {force: true});
            throw new Error(
                `${name}.zip doesn't match Node's SHA-256 (${actual}, ` +
                    `expected ${expected}).`,
            );
        }
    }
    const unpacked = path.join(cacheDir, name);
    await rm(unpacked, {recursive: true, force: true});
    run("unzip", [
        "-q",
        "-j",
        zip,
        `${name}/node.exe`,
        `${name}/LICENSE`,
        "-d",
        unpacked,
    ]);
    return {
        binary: path.join(unpacked, "node.exe"),
        binaryName: "node.exe",
        license: path.join(unpacked, "LICENSE"),
    };
}

/** The tester's instructions for macOS, at the top of the unpacked folder. */
function macosInstallNotes(version: string, nodeVersion: string): string {
    return `# perseus-mcp ${version} for Claude Desktop (macOS, Apple silicon)

An MCP server for authoring Perseus items, with Node ${nodeVersion}
included.

1. Move this \`perseus-mcp\` folder into your home folder (Finder: Go →
   Home).
2. Quit Claude Desktop (Cmd-Q).
3. Open \`~/Library/Application Support/Claude/claude_desktop_config.json\`
   (Claude Desktop: Settings → Developer → Edit Config) and add this under
   \`"mcpServers"\`, with \`YOURNAME\` replaced by your home folder's name:

   \`\`\`json
   "perseus": {
       "command": "/Users/YOURNAME/perseus-mcp/node",
       "args": ["/Users/YOURNAME/perseus-mcp/server/index.mjs", "--stdio"]
   }
   \`\`\`

4. Open Claude Desktop. The Perseus tools show under the tools menu in a
   new chat.

Drafts are saved in \`~/Library/Application Support/perseus-mcp\`. Claude
Desktop's log for the server is
\`~/Library/Logs/Claude/mcp-server-perseus.log\`.

## If something goes wrong

- **It runs but misbehaves** (a tool fails, the preview doesn't load): ask
  Claude to "get perseus-mcp's server info" and send the result to whoever
  sent you perseus-mcp. It holds nothing of your items.
- **It doesn't start** (Claude Desktop shows it as failed): open Terminal,
  paste this line, press Return, and send what it copies to your clipboard:

  \`\`\`sh
{ echo "== chip: $(/usr/bin/uname -m), macOS $(/usr/bin/sw_vers -productVersion)"; echo "== folder"; /bin/ls -la ~/perseus-mcp 2>&1 | /usr/bin/head -15; echo "== node"; ~/perseus-mcp/node --version 2>&1; /usr/bin/xattr ~/perseus-mcp/node 2>&1; echo "== server"; ~/perseus-mcp/node ~/perseus-mcp/server/index.mjs --stdio </dev/null 2>&1 | /usr/bin/head -20; echo "== config"; /usr/bin/grep -A6 '"perseus"' ~/Library/Application\\ Support/Claude/claude_desktop_config.json 2>&1; echo "== log"; /usr/bin/tail -30 ~/Library/Logs/Claude/mcp-server-perseus.log 2>&1; } | /usr/bin/pbcopy; echo "Copied."
  \`\`\`

To update, replace the folder with the new one and restart Claude Desktop.
`;
}

/** The tester's instructions for Windows, at the top of the unpacked folder. */
function windowsInstallNotes(
    version: string,
    nodeVersion: string,
    arch: string,
): string {
    return `# perseus-mcp ${version} for Claude Desktop (Windows, ${arch})

An MCP server for authoring Perseus items, with Node ${nodeVersion}
included.

1. Extract the zip (right-click → Extract All…) and move the
   \`perseus-mcp\` folder into your user folder, \`C:\\Users\\YOURNAME\`.
2. Quit Claude Desktop (File → Exit).
3. Open \`%APPDATA%\\Claude\\claude_desktop_config.json\` (Claude Desktop:
   Settings → Developer → Edit Config) and add this under
   \`"mcpServers"\`, with \`YOURNAME\` replaced by your user folder's name.
   JSON needs each backslash doubled:

   \`\`\`json
   "perseus": {
       "command": "C:\\\\Users\\\\YOURNAME\\\\perseus-mcp\\\\node.exe",
       "args": [
           "C:\\\\Users\\\\YOURNAME\\\\perseus-mcp\\\\server\\\\index.mjs",
           "--stdio"
       ]
   }
   \`\`\`

4. Open Claude Desktop. The Perseus tools show under the tools menu in a
   new chat.

Drafts are saved in \`%LOCALAPPDATA%\\perseus-mcp\`. Claude Desktop's log
for the server is \`%APPDATA%\\Claude\\logs\\mcp-server-perseus.log\`.

## If something goes wrong

- **It runs but misbehaves** (a tool fails, the preview doesn't load): ask
  Claude to "get perseus-mcp's server info" and send the result to whoever
  sent you perseus-mcp. It holds nothing of your items.
- **It doesn't start** (Claude Desktop shows it as failed): open PowerShell
  (Start menu → type PowerShell → Enter), paste this line, press Enter, and
  send what it copies to your clipboard:

  \`\`\`powershell
& { "== arch: $env:PROCESSOR_ARCHITECTURE, $((Get-CimInstance Win32_OperatingSystem).Caption)"; "== folder"; Get-ChildItem "$HOME\\perseus-mcp" 2>&1 | Out-String; "== node"; & "$HOME\\perseus-mcp\\node.exe" --version 2>&1; "signature: $((Get-AuthenticodeSignature "$HOME\\perseus-mcp\\node.exe").Status)"; "blocked as downloaded: $([bool](Get-Item "$HOME\\perseus-mcp\\node.exe" -Stream Zone.Identifier -ErrorAction SilentlyContinue))"; "== server"; $null | & "$HOME\\perseus-mcp\\node.exe" "$HOME\\perseus-mcp\\server\\index.mjs" --stdio 2>&1 | Select-Object -First 20; "== config"; Select-String -Path "$env:APPDATA\\Claude\\claude_desktop_config.json" -Pattern '"perseus"' -Context 0,6 | Out-String; "== log"; Get-Content "$env:APPDATA\\Claude\\logs\\mcp-server-perseus.log" -Tail 30 } *>&1 | Out-String | Set-Clipboard; "Copied."
  \`\`\`

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
 * Builds the parts every platform's bundle shares, laid out as
 * `packagedPaths()` expects: the server in `server/index.mjs`, perseus-core's
 * type definitions in `types/`, the prebuilt pages in `pages/`, and the
 * licenses, and Graffiti in `graffiti/`: the runner, and the built library
 * in `lib/`. Diagram scripts import the library in a process of their own,
 * so it ships as files rather than inside the server's bundle.
 */
async function buildShared(dir: string): Promise<void> {
    await rm(dir, {recursive: true, force: true});
    await buildServer(path.join(dir, "server"));
    for (const [to, from] of Object.entries(COPIED_FILES)) {
        await mkdir(path.dirname(path.join(dir, to)), {recursive: true});
        await copyFile(from, path.join(dir, to));
    }
    await buildPages(path.join(dir, "pages"));
    await copyGraffiti(path.join(dir, "graffiti"));
}

/**
 * Graffiti, linked in from its own checkout, built there with `npm run
 * build`: its `dist/` (without source maps and type definitions), and the
 * runner.
 */
async function copyGraffiti(dir: string): Promise<void> {
    const dist = path.join(PACKAGE_DIR, "node_modules/graffiti/dist");
    if (!existsSync(path.join(dist, "index.js"))) {
        throw new Error(
            `Graffiti isn't built: no ${dist}/index.js. Run \`npm run build\` ` +
                "in its checkout.",
        );
    }
    await cp(dist, path.join(dir, "lib"), {
        recursive: true,
        dereference: true,
        filter: (file) => !/\.(map|d\.ts)$/.test(file),
    });
    // Graffiti's .js files are ES modules, which Node knows from the nearest
    // package.json.
    await writeFile(
        path.join(dir, "lib/package.json"),
        JSON.stringify({type: "module"}),
    );
    await copyFile(
        path.join(PACKAGE_DIR, "src/adapters/graffiti/runner.mjs"),
        path.join(dir, "runner.mjs"),
    );
}

/**
 * Builds the bundles testers install, one per platform: a `perseus-mcp`
 * folder in `outDir/<platform>` with the shared parts and that platform's
 * Node and install notes, zipped into `perseus-mcp-<platform>.zip` next to
 * `outDir`. Returns the zips.
 */
export async function buildBundles(
    outDir: string,
    platforms: ReadonlyArray<Platform>,
): Promise<Array<string>> {
    const version = nodeVersion();
    const packageJson = JSON.parse(
        await readFile(path.join(PACKAGE_DIR, "package.json"), "utf8"),
    );
    const distDir = path.dirname(outDir);
    const shared = path.join(outDir, "shared");
    await buildShared(shared);

    const zips: Array<string> = [];
    for (const platform of platforms) {
        const node =
            platform === "macos-arm64"
                ? macosNode()
                : await windowsNode(
                      platform === "windows-x64" ? "x64" : "arm64",
                      version,
                      path.join(distDir, "node-downloads"),
                  );
        const bundleDir = path.join(outDir, platform, "perseus-mcp");
        await rm(path.dirname(bundleDir), {recursive: true, force: true});
        await cp(shared, bundleDir, {recursive: true});
        await copyFile(node.binary, path.join(bundleDir, node.binaryName));
        await chmod(path.join(bundleDir, node.binaryName), 0o755);
        await copyFile(
            node.license,
            path.join(bundleDir, "licenses/Node-LICENSE.txt"),
        );
        await writeFile(
            path.join(bundleDir, "INSTALL.md"),
            platform === "macos-arm64"
                ? macosInstallNotes(packageJson.version, version)
                : windowsInstallNotes(
                      packageJson.version,
                      version,
                      platform === "windows-x64" ? "x64" : "Arm",
                  ),
        );

        const zip = path.join(distDir, `perseus-mcp-${platform}.zip`);
        await rm(zip, {force: true});
        // ditto zips as Finder does and keeps the macOS binary's permissions
        // and signature. Without resource forks and extended attributes, the
        // zip holds nothing Windows doesn't expect.
        run("ditto", [
            "-c",
            "-k",
            "--norsrc",
            "--noextattr",
            "--keepParent",
            bundleDir,
            zip,
        ]);
        zips.push(zip);
    }
    return zips;
}
