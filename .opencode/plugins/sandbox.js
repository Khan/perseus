import { existsSync, lstatSync, mkdirSync, readFileSync, unlinkSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";

const FILESYSTEM_PATH_KEYS = ["allowRead", "allowWrite", "denyRead", "denyWrite"];

function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

function loadConfig(root) {
    const path = join(root, ".opencode", "sandbox.json");
    if (!existsSync(path)) {
        return { error: `OpenCode command sandbox configuration is missing: ${path}` };
    }

    let config;
    try {
        config = JSON.parse(readFileSync(path, "utf8"));
    } catch (error) {
        return {
            error: `OpenCode command sandbox configuration is invalid: ${error instanceof Error ? error.message : String(error)}`,
        };
    }

    if (!isPlainObject(config)) {
        return { error: "OpenCode command sandbox configuration must be a JSON object" };
    }
    if (config.enabled !== true) {
        return { error: "OpenCode command sandbox must be explicitly enabled" };
    }
    if (config.env !== undefined) {
        if (
            !isPlainObject(config.env) ||
            Object.values(config.env).some((value) => typeof value !== "string")
        ) {
            return { error: "OpenCode command sandbox env values must be strings" };
        }
    }
    if (
        config.excludedCommands !== undefined &&
        (!Array.isArray(config.excludedCommands) ||
            config.excludedCommands.some(
                (value) => typeof value !== "string" || value.length === 0,
            ))
    ) {
        return { error: "OpenCode command sandbox excludedCommands must be non-empty strings" };
    }

    return { config };
}

function isExcludedCommand(command, excludedCommands) {
    for (const pattern of excludedCommands ?? []) {
        if (pattern === command) return true;
        if (pattern.endsWith("*") && command.startsWith(pattern.slice(0, -1))) return true;
    }
    return false;
}

function resolveSandboxPath(root, value) {
    if (typeof value !== "string") return value;
    if (
        isAbsolute(value) ||
        value === "~" ||
        value.startsWith("~/") ||
        value.startsWith("~\\") ||
        value.startsWith("$HOME") ||
        /^%(?:USERPROFILE|HOMEDRIVE|HOMEPATH)%/i.test(value)
    ) {
        return value;
    }
    return resolve(root, value);
}

// Sandbox Runtime resolves relative policy paths against process.cwd(). That
// can differ from OpenCode's worktree in the desktop app, server mode, or when
// OpenCode is launched with an explicit project path. Anchor the policy here so
// it always protects and grants the intended repository.
function resolveFilesystemPaths(root, filesystem) {
    if (!isPlainObject(filesystem)) return filesystem;
    const resolved = { ...filesystem };
    for (const key of FILESYSTEM_PATH_KEYS) {
        if (!Array.isArray(filesystem[key])) continue;
        resolved[key] = filesystem[key].map((value) => resolveSandboxPath(root, value));
    }
    return resolved;
}

// srt write-denies these two directories unconditionally by ro-binding
// mount points there, and bwrap refuses to start when a mount point cannot
// be created inside an already-denied parent (the whole-dir .claude
// denyWrite). The pi extension pre-creates them (its
// ensureMandatoryMountPoints); this is the OpenCode equivalent, run before
// initialize so a fresh checkout with no .claude directory sandboxes
// instead of failing startup. Not module-level exports: OpenCode's legacy
// loader treats every exported function as a plugin entry point, so the
// test seams live on SandboxPlugin.testing like every other helper here.
const SRT_MANDATORY_DENY_DIRS = [".claude/agents", ".claude/commands"];

function ensureMandatoryMountPoints(root, io = {}) {
    const lstat = io.lstat ?? lstatSync;
    const mkdir = io.mkdir ?? mkdirSync;
    const unlink = io.unlink ?? unlinkSync;
    for (const rel of SRT_MANDATORY_DENY_DIRS) {
        const target = join(root, rel);
        let stat = null;
        try {
            stat = lstat(target);
        } catch {
            // Absent: create below.
        }
        if (stat) {
            if (stat.isDirectory()) continue;
            // An empty read-only regular file is a ghost mount point left
            // behind by srt's /dev/null bind (the case pi's mountPointAction
            // answers "replace"); a bare recursive mkdir would throw EEXIST
            // on it and disable bash for the session. Anything else here was
            // authored by a human and must be left alone, matching pi.
            const ghost = stat.isFile() && stat.size === 0 && (stat.mode & 0o222) === 0;
            if (!ghost) continue;
            unlink(target);
        }
        mkdir(target, { recursive: true });
    }
}

async function createSandboxPlugin(input, dependencies = {}) {
    const root = input.worktree || input.directory;
    const loaded = loadConfig(root);
    const config = loaded.config;
    let initializationError = loaded.error;
    let sandboxManager;
    let sandboxInitialized = false;

    if (config) {
        try {
            const loadSandboxManager =
                dependencies.loadSandboxManager ??
                (async () => (await import("@anthropic-ai/sandbox-runtime")).SandboxManager);
            sandboxManager = await loadSandboxManager();
            (dependencies.ensureMountPoints ?? ensureMandatoryMountPoints)(root);
            await sandboxManager.initialize({
                network: config.network,
                filesystem: resolveFilesystemPaths(root, config.filesystem),
            });
            sandboxInitialized = true;
        } catch (error) {
            initializationError = `OpenCode command sandbox failed to initialize: ${
                error instanceof Error ? error.message : String(error)
            }`;
        }
    }

    return {
        "tool.execute.before": async (hookInput, output) => {
            if (hookInput.tool !== "bash") return;
            if (initializationError) throw new Error(initializationError);
            if (!sandboxManager) throw new Error("OpenCode command sandbox is unavailable");

            const command = output.args?.command;
            if (typeof command !== "string") {
                throw new Error("OpenCode Bash tool call did not contain a string command");
            }
            if (isExcludedCommand(command, config.excludedCommands)) return;
            output.args.command = await sandboxManager.wrapWithSandbox(command);
        },
        "shell.env": async (_hookInput, output) => {
            if (!config?.env) return;
            Object.assign(output.env, config.env);
        },
        dispose: async () => {
            if (!sandboxInitialized) return;
            sandboxInitialized = false;
            await sandboxManager.reset();
        },
    };
}

export const SandboxPlugin = async (input) => createSandboxPlugin(input);

// Keep test seams on the one exported plugin function: OpenCode's legacy
// loader treats every exported function as a plugin entry point.
SandboxPlugin.testing = Object.freeze({
    createSandboxPlugin,
    ensureMandatoryMountPoints,
    isExcludedCommand,
    loadConfig,
    resolveFilesystemPaths,
    SRT_MANDATORY_DENY_DIRS,
});
