#!/usr/bin/env node
/**
 * SessionStart hook that runs `pnpm install`. When running on Claude Code
 * web (CLAUDE_CODE_REMOTE), the default Node is older than the version
 * required by this project's engines field, so first install a compatible
 * Node via nvm and persist the PATH/NVM_* env vars to CLAUDE_ENV_FILE so
 * subsequent commands in the session pick them up.
 *
 * Before anything else, run every `*.preinstall.mjs` script installed next to this
 * hook, in name order. A module whose setup must finish before `pnpm install`
 * (such as frontend's npm-auth writing ~/.npmrc) opts in by naming its script that
 * way; it can't be a separate SessionStart hook, because those run in parallel
 * and would race this one. Pre-install scripts run whether or not there is a
 * package.json, since they may configure more than the install.
 */
import { spawnSync } from "child_process";
import { existsSync, appendFileSync, readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const HOOKS_DIR = dirname(fileURLToPath(import.meta.url));
const preinstallScripts = readdirSync(HOOKS_DIR)
    .filter((name) => name.endsWith(".preinstall.mjs"))
    .sort();

for (const name of preinstallScripts) {
    const result = spawnSync(process.execPath, [join(HOOKS_DIR, name)], {
        // Drop the script's stdout: a SessionStart hook's stdout is parsed by (or
        // added to the context of) the agent, so only this hook may write to it.
        stdio: ["ignore", "ignore", "inherit"],
    });
    if (result.status !== 0) {
        process.stderr.write(`Warning: ${name} failed. pnpm install may fail.\n`);
    }
}

if (!existsSync("package.json")) {
    process.exit(0);
}

const NVM_DIR = "/opt/nvm";
const NVM_SCRIPT = `${NVM_DIR}/nvm.sh`;
const NODE_VERSION = "24.18";

let env = { ...process.env };

if (process.env.CLAUDE_CODE_REMOTE && existsSync(NVM_SCRIPT)) {
    const nvmResult = spawnSync(
        "bash",
        [
            "-c",
            `export NVM_DIR="${NVM_DIR}" && source "${NVM_SCRIPT}" && nvm install ${NODE_VERSION} >/dev/null 2>&1 && nvm which ${NODE_VERSION}`,
        ],
        { encoding: "utf8" },
    );

    if (nvmResult.status === 0) {
        const nodeBin = nvmResult.stdout.trim();
        const nodeBinDir = dirname(nodeBin);
        env = {
            ...env,
            NVM_DIR,
            NVM_BIN: nodeBinDir,
            PATH: `${nodeBinDir}:${env.PATH ?? ""}`,
        };

        if (process.env.CLAUDE_ENV_FILE) {
            appendFileSync(
                process.env.CLAUDE_ENV_FILE,
                `export NVM_DIR="${NVM_DIR}"\n` +
                    `export NVM_BIN="${nodeBinDir}"\n` +
                    `export PATH="${nodeBinDir}:$PATH"\n`,
            );
        }
    } else {
        process.stderr.write(
            `Warning: Failed to set up Node ${NODE_VERSION} via nvm. pnpm install may fail.\n`,
        );
    }
}

const result = spawnSync("pnpm", ["install"], {
    encoding: "utf8",
    stdio: ["inherit", "pipe", "pipe"],
    env,
});

if (result.status !== 0) {
    const output = [result.stdout?.trim(), result.stderr?.trim()].filter(Boolean).join("\n");
    process.stderr.write(output ? `pnpm install failed:\n${output}\n` : "pnpm install failed\n");
    process.exit(2);
}
