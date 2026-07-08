#!/usr/bin/env -S node -r @swc-node/register
/* eslint-disable no-console */
/**
 * Links the local Perseus repo into the frontend for iterative local
 * development using the full standalone Docker dev stack, without needing
 * to publish packages or run the bump script.
 *
 * Requires the frontend repo to be checked out as a sibling to this repo:
 *   ~/khan/perseus  (this repo)
 *   ~/khan/frontend (frontend repo)
 *
 * Usage:
 *   ./utils/start-perseus-in-local-server.mts           # Activate local Perseus dev mode
 *   ./utils/start-perseus-in-local-server.mts -r        # Revert to published npm packages
 *   ./utils/start-perseus-in-local-server.mts --verbose # Show detailed output
 *
 * In a separate terminal, run: pnpm start:standalone
 */
import {spawn, spawnSync} from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const UTILS_DIR = fs.realpathSync(path.resolve(__dirname));
const PERSEUS_ROOT = fs.realpathSync(path.resolve(UTILS_DIR, ".."));
const FRONTEND_ROOT = fs.realpathSync(
    path.resolve(PERSEUS_ROOT, "../frontend"),
);
const PACKAGE_JSON = path.join(FRONTEND_ROOT, "package.json");
const CONTAINERS_TS = path.join(FRONTEND_ROOT, "dev/server/containers.ts");
// Put the tmp dir inside FRONTEND_ROOT/genfiles so it lives under the
// directory that Docker Desktop already shares (~/khan/frontend) and that
// is bind-mounted into the rspack container by docker-compose.yml.
// Using os.tmpdir() puts it under /private/var/folders/ which Docker
// Desktop does not share by default.
const PERSEUS_TMP_DIR = path.join(
    FRONTEND_ROOT,
    "genfiles",
    "perseus-local-dev-tmp",
);
const PERSEUS_COMPOSE_SRC = path.join(UTILS_DIR, "docker-compose.perseus.yml");
const PERSEUS_COMPOSE = path.join(
    PERSEUS_TMP_DIR,
    "docker-compose.perseus.yml",
);
const PERSEUS_ENV_FILE = path.join(
    PERSEUS_TMP_DIR,
    "docker-compose.perseus.env",
);
const WATCH_PID_FILE = path.join(PERSEUS_TMP_DIR, "watch.pid");
const LOCKFILE = path.join(FRONTEND_ROOT, "pnpm-lock.yaml");
const LOCKFILE_BACKUP = path.join(PERSEUS_TMP_DIR, "pnpm-lock.yaml.bak");
const PACKAGE_JSON_BACKUP = path.join(PERSEUS_TMP_DIR, "package.json.bak");

// ---------------------------------------------------------------------------
// Logging
// ---------------------------------------------------------------------------

let verbose = false;

function log(msg: string): void {
    if (verbose) {
        console.log(msg);
    }
}

// ---------------------------------------------------------------------------
// Patch helpers — sentinel-comment-delimited transient edits
// ---------------------------------------------------------------------------

const SENTINEL_START =
    "// LOCAL PERSEUS DEV — inserted by utils/start-perseus-in-local-server.mts";
const SENTINEL_END = "// END LOCAL PERSEUS DEV";
const SENTINEL_RE = new RegExp(
    `\n${escRe(SENTINEL_START)}\\n[\\s\\S]*?\\n${escRe(SENTINEL_END)}`,
    "g",
);

function escRe(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function patchFile(filePath: string, anchor: string, insertion: string): void {
    const content = fs.readFileSync(filePath, "utf8");
    // Check whether this specific anchor site is already patched (the sentinel
    // immediately follows the anchor). A file can have multiple patch sites so
    // we check per-anchor, not whether the sentinel appears anywhere in the file.
    if (content.includes(`${anchor}\n${SENTINEL_START}`)) {
        throw new Error(
            `${filePath} already contains the Perseus dev patch — run with -r to revert first`,
        );
    }
    if (!content.includes(anchor)) {
        throw new Error(`Anchor not found in ${filePath}: ${anchor}`);
    }
    fs.writeFileSync(
        filePath,
        content.replace(
            anchor,
            `${anchor}\n${SENTINEL_START}\n${insertion}\n${SENTINEL_END}`,
        ),
    );
}

function revertFile(filePath: string): void {
    const content = fs.readFileSync(filePath, "utf8");
    if (!content.includes(SENTINEL_START)) {
        return;
    }
    fs.writeFileSync(filePath, content.replace(SENTINEL_RE, ""));
}

// ---------------------------------------------------------------------------
// Catalog resolution
// ---------------------------------------------------------------------------

function parseCatalogs(
    workspaceYaml: string,
): Record<string, Record<string, string>> {
    const catalogs: Record<string, Record<string, string>> = {};
    let currentCatalog: string | null = null;

    for (const line of workspaceYaml.split("\n")) {
        if (/^catalogs:$/.test(line)) {
            currentCatalog = "__root__";
            continue;
        }
        if (currentCatalog !== null) {
            const catalogName = line.match(/^ {4}(\S+):\s*$/);
            if (catalogName) {
                currentCatalog = catalogName[1];
                catalogs[currentCatalog] = {};
                continue;
            }
        }
        if (currentCatalog && currentCatalog !== "__root__") {
            const entry = line.match(/^ {8}([^:]+):\s+(.+)$/);
            if (entry) {
                const key = entry[1].trim().replace(/^["']|["']$/g, "");
                catalogs[currentCatalog][key] = entry[2].trim();
            } else if (/^\S/.test(line)) {
                currentCatalog = null;
            }
        }
    }
    return catalogs;
}

// ---------------------------------------------------------------------------
// Build shallow Perseus package copies in tmp dir with catalogs resolved
// ---------------------------------------------------------------------------

function buildPerseusTmpPackages(
    pkgDirs: string[],
    overrides: Record<string, string>,
): void {
    const workspaceYaml = fs.readFileSync(
        path.join(PERSEUS_ROOT, "pnpm-workspace.yaml"),
        "utf8",
    );
    const catalogs = parseCatalogs(workspaceYaml);

    for (const pkgDir of pkgDirs) {
        const pkgDirname = path.basename(pkgDir);
        const tmpPkgDir = path.join(PERSEUS_TMP_DIR, pkgDirname);
        fs.mkdirSync(tmpPkgDir, {recursive: true});

        for (const entry of fs.readdirSync(pkgDir)) {
            if (entry === "package.json") {
                continue;
            }
            fs.symlinkSync(
                path.join(pkgDir, entry),
                path.join(tmpPkgDir, entry),
            );
        }

        const pkg = JSON.parse(
            fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"),
        );
        for (const depField of [
            "dependencies",
            "devDependencies",
            "peerDependencies",
            "optionalDependencies",
        ] as const) {
            if (!pkg[depField]) {
                continue;
            }
            for (const [name, spec] of Object.entries(pkg[depField])) {
                if (String(spec) === "workspace:*") {
                    const tmpPath = overrides[name];
                    if (tmpPath) {
                        pkg[depField][name] = tmpPath;
                    }
                    continue;
                }
                const m = String(spec).match(/^catalog:(.+)$/);
                if (!m) {
                    continue;
                }
                const resolved = catalogs[m[1]]?.[name];
                if (!resolved) {
                    throw new Error(
                        `Could not resolve catalog:${m[1]} for ${name} in ${pkgDir}`,
                    );
                }
                pkg[depField][name] = resolved;
            }
        }
        fs.writeFileSync(
            path.join(tmpPkgDir, "package.json"),
            JSON.stringify(pkg, null, 4) + "\n",
        );
        log(`  Prepared: ${tmpPkgDir}`);
    }
}

// ---------------------------------------------------------------------------
// Write docker-compose.perseus.env
//
// docker-compose.perseus.yml (checked into utils/) uses ${PERSEUS_ROOT} and
// ${FRONTEND_ROOT}. FRONTEND_ROOT is already in the frontend's env file;
// we supply PERSEUS_ROOT via a separate env file passed to docker compose.
// The file lives in PERSEUS_TMP_DIR so it is cleaned up automatically on revert.
// ---------------------------------------------------------------------------

function writePerseusEnvFile(): void {
    fs.mkdirSync(PERSEUS_TMP_DIR, {recursive: true});
    fs.copyFileSync(PERSEUS_COMPOSE_SRC, PERSEUS_COMPOSE);
    fs.writeFileSync(
        PERSEUS_ENV_FILE,
        `PERSEUS_ROOT=${PERSEUS_ROOT}\n`,
        "utf8",
    );
    log(`Wrote ${PERSEUS_ENV_FILE}`);
}

// ---------------------------------------------------------------------------
// Patch rspack.config.ts — inject resolve.alias entries for Perseus packages
//
// pnpm's --frozen-lockfile inside the container can fail to install file:
// packages if their content isn't already in the pnpm store volume, leaving
// the root node_modules named volume without Perseus entries. Aliases bypass
// module resolution entirely and point rspack directly at the Perseus ES
// dist files, which are reachable via the PERSEUS_ROOT bind mount.
// ---------------------------------------------------------------------------

const RSPACK_CONFIG = path.join(
    FRONTEND_ROOT,
    "libs/config/rspack/src/rspack.config.ts",
);

function patchRspackConfig(pkgDirs: string[]): void {
    // Build alias entries: "@khanacademy/perseus" -> "/path/to/dist/es/index.js"
    const aliasLines: string[] = [];
    for (const pkgDir of pkgDirs) {
        const pkg = JSON.parse(
            fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"),
        );
        const pkgName: string = pkg.name;
        // Use the "import" (ES module) export if available, else fall back to main
        let distEntry: string | undefined;
        const exportsField = pkg.exports?.["."];
        if (typeof exportsField === "object") {
            distEntry = exportsField.import ?? exportsField.require ?? pkg.main;
        } else {
            distEntry = pkg.main;
        }
        if (!distEntry) {
            continue;
        }
        const absPath = path.join(pkgDir, distEntry);
        if (!fs.existsSync(absPath)) {
            continue;
        }
        aliasLines.push(`        "${pkgName}": "${absPath}",`);

        // Also alias sub-path exports (e.g. "@khanacademy/perseus/strings", "@khanacademy/math-input/styles.css")
        if (pkg.exports && typeof pkg.exports === "object") {
            for (const [subpath, value] of Object.entries(pkg.exports)) {
                if (subpath === ".") {
                    continue;
                }
                const fullSubpath = `${pkgName}${subpath.slice(1)}`; // e.g. "@khanacademy/perseus/strings"
                let subEntry: string | undefined;
                if (typeof value === "string") {
                    // e.g. "./styles.css": "./dist/index.css"
                    subEntry = value;
                } else if (typeof value === "object" && value !== null) {
                    const subValue = value as Record<string, string>; // eslint-disable-line @typescript-eslint/no-explicit-any
                    subEntry =
                        subValue.import ?? subValue.require ?? subValue.default;
                }
                if (!subEntry) {
                    continue;
                }
                const absSubPath = path.join(pkgDir, subEntry);
                if (fs.existsSync(absSubPath)) {
                    aliasLines.push(
                        `        "${fullSubpath}": "${absSubPath}",`,
                    );
                }
            }
        }
    }

    if (!aliasLines.length) {
        return;
    }

    // Prepend React de-duplication aliases so that Perseus dist files (which
    // import 'react' as a bare specifier) resolve to the same React instance
    // as the frontend app, not Perseus's own node_modules/react.
    // require.resolve() runs at config-evaluation time inside the container,
    // returning the container's absolute path.
    const reactAliases = [
        `        "react": require.resolve("react"),`,
        `        "react-dom": require.resolve("react-dom"),`,
    ];

    patchFile(
        RSPACK_CONFIG,
        `    alias: {`,
        [...reactAliases, ...aliasLines].join("\n"),
    );
    log(`Patched ${RSPACK_CONFIG} with ${aliasLines.length} Perseus aliases`);
}

// ---------------------------------------------------------------------------
// Patch containers.ts
// ---------------------------------------------------------------------------

function patchContainerTs(): void {
    // Insertion 1: fs import and add GENFILES_DIR to existing import
    patchFile(
        CONTAINERS_TS,
        `import path from "node:path";`,
        `import fs from "node:fs";`,
    );
    patchFile(
        CONTAINERS_TS,
        `    DEV_SERVER_DIR,\n    FRONTEND_ROOT,\n    GENFILES_DEVSERVER_DIR,`,
        `    GENFILES_DIR,`,
    );
    // Insertion 2: variable declarations after workingOnCompose declaration
    patchFile(
        CONTAINERS_TS,
        `    const workingOnCompose = path.join(\n        GENFILES_DEVSERVER_DIR,\n        "docker-compose.working-on.yml",\n    );`,
        `    const perseusCompose = path.join(GENFILES_DIR, "perseus-local-dev-tmp", "docker-compose.perseus.yml");\n    const perseusEnvFile = path.join(GENFILES_DIR, "perseus-local-dev-tmp", "docker-compose.perseus.env");`,
    );
    // Insertion 3: splice into args array between workingOnCompose and "-p"
    patchFile(
        CONTAINERS_TS,
        `            "-f",\n            workingOnCompose,`,
        `            ...(fs.existsSync(perseusEnvFile) ? ["-f", perseusCompose, "--env-file", perseusEnvFile] : []),`,
    );
}

// ---------------------------------------------------------------------------
// pnpm.overrides helpers
// ---------------------------------------------------------------------------

function applyOverrides(overrides: Record<string, string>): void {
    if (fs.existsSync(PACKAGE_JSON_BACKUP)) {
        throw new Error(
            "package.json backup already exists — run with -r to revert first",
        );
    }
    fs.copyFileSync(PACKAGE_JSON, PACKAGE_JSON_BACKUP);
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, "utf8"));
    pkg.pnpm = {...pkg.pnpm, overrides};
    fs.writeFileSync(PACKAGE_JSON, JSON.stringify(pkg, null, 4) + "\n");
}

// ---------------------------------------------------------------------------
// Relink dist/ in pnpm virtual store (Symlink B)
//
// pnpm copies files from the file: source into its virtual store at install
// time — it does not follow symlinks. After install, the store's dist/ is a
// frozen snapshot of whatever was in dist/ at install time. Replace each
// store dist/ with a live symlink to the real Perseus dist/ so rspack picks
// up Rollup rebuilds via HMR.
// ---------------------------------------------------------------------------

function relinkVirtualStore(pkgDirs: string[]): void {
    const pnpmDir = path.join(FRONTEND_ROOT, "node_modules", ".pnpm");

    for (const pkgDir of pkgDirs) {
        const realDist = path.join(pkgDir, "dist");
        if (!fs.existsSync(realDist)) {
            continue;
        }

        const pkg = JSON.parse(
            fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"),
        );
        const pkgName: string = pkg.name; // e.g. @khanacademy/math-input
        const encodedName = pkgName.replace("/", "+");

        for (const entry of fs.readdirSync(pnpmDir)) {
            if (!entry.startsWith(`${encodedName}@file+`)) {
                continue;
            }
            const storeDistDir = path.join(
                pnpmDir,
                entry,
                "node_modules",
                pkgName,
                "dist",
            );
            if (!fs.existsSync(storeDistDir)) {
                continue;
            }
            fs.rmSync(storeDistDir, {recursive: true, force: true});
            fs.symlinkSync(realDist, storeDistDir);
            log(`  Relinked: ${entry}`);
        }
    }
}

// ---------------------------------------------------------------------------
// Symlink C — process module for ES build compatibility
//
// rspack resolves symlinks to real paths (resolve.symlinks: true). For files
// under PERSEUS_ROOT, module resolution walks up the Perseus directory tree
// and never reaches FRONTEND_ROOT/node_modules/. Perseus's ES build imports
// 'process/browser.js', which must be findable at PERSEUS_ROOT/node_modules/.
// ---------------------------------------------------------------------------

function linkProcessModule(): void {
    const pnpmDir = path.join(FRONTEND_ROOT, "node_modules", ".pnpm");
    const processEntries = fs
        .readdirSync(pnpmDir)
        .filter((e) => e.startsWith("process@"));

    if (processEntries.length === 0) {
        throw new Error("process package not found in frontend virtual store");
    }
    const processPkg = path.join(
        pnpmDir,
        processEntries[0],
        "node_modules",
        "process",
    );
    if (!fs.existsSync(processPkg)) {
        throw new Error(`process package directory not found: ${processPkg}`);
    }

    const perseusNodeModules = path.join(PERSEUS_ROOT, "node_modules");
    fs.mkdirSync(perseusNodeModules, {recursive: true});

    const symlinkPath = path.join(perseusNodeModules, "process");
    // Use lstatSync (not existsSync) to detect dangling symlinks too
    try {
        fs.lstatSync(symlinkPath);
        fs.rmSync(symlinkPath);
    } catch {
        // entry doesn't exist — nothing to remove
    }
    fs.symlinkSync(processPkg, symlinkPath);
    log(`Linked process module: ${symlinkPath} → ${processPkg}`);
}

// ---------------------------------------------------------------------------
// pnpm runner
// ---------------------------------------------------------------------------

function checkDockerRunning(): void {
    const result = spawnSync("docker", ["info"], {stdio: "pipe"});
    if (result.status !== 0) {
        console.error(
            "!!!!!!!!!!!!\nDocker is not running. Please start Docker Desktop and try again.\n!!!!!!!!!!!!\n",
        );
        process.exit(1);
    }
}

function runPnpm(args: string[], cwd: string): void {
    const stdio = verbose ? "inherit" : "ignore";
    const result = spawnSync("pnpm", args, {cwd, stdio});
    if (result.status !== 0) {
        process.exit(result.status ?? 1);
    }
}

// ---------------------------------------------------------------------------
// Cleanup — reverts all transient changes
// ---------------------------------------------------------------------------

function cleanup(): void {
    console.log("Reverting Perseus local dev setup...");

    // 0. Kill the detached watch process if we have its PID
    if (fs.existsSync(WATCH_PID_FILE)) {
        const pid = parseInt(
            fs.readFileSync(WATCH_PID_FILE, "utf8").trim(),
            10,
        );
        try {
            process.kill(pid, "SIGTERM");
            log(`Stopped pnpm watch (pid ${pid})`);
        } catch {
            // process already exited
        }
    }

    // 1. Revert containers.ts and rspack.config.ts
    revertFile(CONTAINERS_TS);
    revertFile(RSPACK_CONFIG);

    // 2. Restore package.json from snapshot
    if (fs.existsSync(PACKAGE_JSON_BACKUP)) {
        fs.copyFileSync(PACKAGE_JSON_BACKUP, PACKAGE_JSON);
        log("Restored package.json from snapshot.");
    }

    // 3. Remove Symlink C (symlink to a directory — fs.rmSync without recursive)
    const symC = path.join(PERSEUS_ROOT, "node_modules", "process");
    try {
        fs.lstatSync(symC);
        fs.rmSync(symC);
    } catch {
        // doesn't exist or already removed
    }

    // 4. (docker-compose.perseus.env is inside PERSEUS_TMP_DIR — removed in step 5)

    // 5. Restore lockfile from snapshot, then remove temp dir
    if (fs.existsSync(LOCKFILE_BACKUP)) {
        fs.copyFileSync(LOCKFILE_BACKUP, LOCKFILE);
        log("Restored pnpm-lock.yaml from snapshot.");
    }
    fs.rmSync(PERSEUS_TMP_DIR, {recursive: true, force: true});

    // 6. Restore published packages on host
    console.log("Restoring published packages...");
    runPnpm(["--silent", "install"], FRONTEND_ROOT);

    console.log("Done. The dev server will restart automatically.");
}

// ---------------------------------------------------------------------------
// Parse arguments
// ---------------------------------------------------------------------------

function usage(): void {
    console.log(
        "Links the local Perseus repo into the frontend for local development.",
    );
    console.log(
        `Requires the frontend repo to be checked out at ${FRONTEND_ROOT}`,
    );
    console.log("");
    console.log(
        `Usage: ./utils/start-perseus-in-local-server.mts [-r] [--verbose] [-h]`,
    );
    console.log("  -r         Revert to published npm packages");
    console.log("  --verbose  Show detailed output");
    console.log("  -h         Show this help");
}

const args = process.argv.slice(2);
let revertOnly = false;
for (const arg of args) {
    if (arg === "-h" || arg === "--help") {
        usage();
        process.exit(0);
    } else if (arg === "-r") {
        revertOnly = true;
    } else if (arg === "--verbose") {
        verbose = true;
    } else {
        console.error(`Unexpected option: ${arg}`);
        usage();
        process.exit(1);
    }
}

// ---------------------------------------------------------------------------
// Validate environment
// ---------------------------------------------------------------------------

if (!fs.existsSync(FRONTEND_ROOT)) {
    console.error(`Error: frontend repo not found at ${FRONTEND_ROOT}`);
    process.exit(1);
}

// ---------------------------------------------------------------------------
// Revert-only mode
// ---------------------------------------------------------------------------

if (revertOnly) {
    cleanup();
    process.exit(0);
}

// ---------------------------------------------------------------------------
// Main flow
// ---------------------------------------------------------------------------

const perseusGitResult = spawnSync(
    "git",
    ["-C", PERSEUS_ROOT, "rev-parse", "--abbrev-ref", "HEAD"],
    {encoding: "utf8"},
);
const branch = perseusGitResult.stdout.trim();

checkDockerRunning();
console.log(`Setting up Perseus local dev mode (branch: ${branch})...`);

// Step 1: Discover Perseus packages
const pkgDirs: string[] = [];
const overrides: Record<string, string> = {};

const packagesDir = path.join(PERSEUS_ROOT, "packages");
for (const entry of fs.readdirSync(packagesDir)) {
    const pkgDir = path.join(packagesDir, entry);
    const pkgJsonPath = path.join(pkgDir, "package.json");
    if (!fs.existsSync(pkgJsonPath)) {
        continue;
    }
    const pkgData = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
    log(`  Found package: ${pkgData.name}`);
    pkgDirs.push(pkgDir);
    overrides[pkgData.name] = `file:${PERSEUS_TMP_DIR}/${entry}`;
}

// Step 2: Build resolved tmp package copies
console.log("Preparing package overrides...");
buildPerseusTmpPackages(pkgDirs, overrides);

// Step 3: Write docker-compose.perseus.env (supplies PERSEUS_ROOT to docker compose)
// Step 4: Patch containers.ts and rspack.config.ts
// Step 5: Apply pnpm.overrides to package.json
console.log("Patching frontend config...");
writePerseusEnvFile();
patchContainerTs();
patchRspackConfig(pkgDirs);
applyOverrides(overrides);

// Step 6: pnpm install on host (resolves file: paths, updates lockfile)
// Snapshot the lockfile before install so we can restore it exactly on revert.
fs.copyFileSync(LOCKFILE, LOCKFILE_BACKUP);
console.log("Installing frontend dependencies...");
runPnpm(["install"], FRONTEND_ROOT);

// Step 7: Relink dist/ in virtual store and create process module symlink
console.log("Relinking Perseus packages in virtual store...");
relinkVirtualStore(pkgDirs);
linkProcessModule();

// Step 8: Build Perseus
console.log("Building Perseus...");
runPnpm(["--silent", "install"], PERSEUS_ROOT);
const buildResult = spawnSync("pnpm", ["build"], {
    cwd: PERSEUS_ROOT,
    stdio: verbose ? "inherit" : "ignore",
});
if (buildResult.status !== 0) {
    console.error("Perseus build failed. Run with --verbose for details.");
    process.exit(1);
}

// Step 9: Start watch and report
const watchProc = spawn("pnpm", ["watch"], {
    cwd: PERSEUS_ROOT,
    stdio: verbose ? "inherit" : "ignore",
    detached: true,
});
fs.writeFileSync(WATCH_PID_FILE, String(watchProc.pid));
watchProc.unref();

console.log(`Perseus local dev mode active (branch: ${branch})`);
console.log("  Edit files in packages/ — Rollup rebuilds automatically.");
console.log("  Run pnpm stop:frontend when done.");
