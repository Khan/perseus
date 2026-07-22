#!/usr/bin/env node
/**
 * PreToolUse hook (matcher: Shell) that injects session environment variables
 * and safe-default git config into shell commands the agent runs.
 *
 * Why this exists: Cursor's `sessionStart` hook `env` output only propagates
 * to subsequent *hook* executions, not to the agent's Shell-tool terminal.
 * The only Cursor-supported channel that reaches the actual shell is
 * rewriting the command via `preToolUse` -> `updated_input.command`. This
 * hook does exactly that.
 *
 * Currently injected:
 *   - GH_TOKEN / GITHUB_TOKEN (from ~/.config/ka-agent-gh-token or ~/.config/ka-olc)
 *   - GIT_CONFIG_* entries that apply to every `git` invocation (including
 *     subprocess git calls made by other tools like pnpm), without polluting
 *     the user's global ~/.gitconfig:
 *       * core.hooksPath=/dev/null — disable local .git/hooks execution so a
 *         malicious repo cannot run pre-commit/post-checkout/etc. hooks
 *         during agent operations.
 *       * credential.helper=… — when a validated GITHUB_TOKEN is available,
 *         provide a helper that authenticates HTTPS git operations
 *         (push/fetch/pull/ls-remote) using x-access-token + the token.
 *   - SSH→HTTPS rewrite of GitHub URLs in the command string, so agent
 *     commands that reference `git@github.com:owner/repo` resolve through
 *     the HTTPS credential helper above instead of requiring SSH keys.
 *
 * Token discovery + scope validation are deliberately duplicated with
 * `git-token-init.mjs` (kept identical by hand). Both hooks read/write the
 * same on-disk validation cache at `${TMPDIR}/cursor-ka-gh-token-cache.json`,
 * so the (~200ms) `gh api` validation only runs when the source token
 * actually changes — keeping this hook cheap on every Shell invocation.
 */
import {execSync} from "child_process";
import {chmodSync, existsSync, readFileSync, writeFileSync} from "fs";
import {homedir, tmpdir} from "os";
import {join} from "path";

const REQUIRED_SCOPES = ["read:org", "read:packages", "repo", "workflow"];

const HOME = homedir();
const CACHE_PATH = join(tmpdir(), "cursor-ka-gh-token-cache.json");
const CACHE_TTL_MS = 60 * 60 * 1000;

function readFileOrNull(path) {
    try {
        return readFileSync(path, "utf8").trim() || null;
    } catch {
        return null;
    }
}

function readJsonKeyOrNull(path, key) {
    try {
        return JSON.parse(readFileSync(path, "utf8"))[key] || null;
    } catch {
        return null;
    }
}

const SOURCES = [
    {label: "env GH_TOKEN", get: () => process.env.GH_TOKEN || null},
    {label: "env GITHUB_TOKEN", get: () => process.env.GITHUB_TOKEN || null},
    {
        label: "~/.config/ka-agent-gh-token",
        get: () => readFileOrNull(`${HOME}/.config/ka-agent-gh-token`),
    },
    {
        label: "~/.config/ka-olc",
        get: () => readJsonKeyOrNull(`${HOME}/.config/ka-olc`, "token"),
    },
];

function findRawToken() {
    for (const {label, get} of SOURCES) {
        const token = get();
        if (token) return {token, label};
    }
    return null;
}

function validateScopes(token) {
    let out;
    try {
        out = execSync("gh api -i user", {
            env: {...process.env, GH_TOKEN: token, GITHUB_TOKEN: token},
            encoding: "utf8",
            stdio: ["pipe", "pipe", "pipe"],
        });
    } catch {
        return {valid: false, scopes: []};
    }
    const headerLine = out
        .split(/\r?\n/)
        .find((line) => /^x-oauth-scopes\s*:/i.test(line));
    if (!headerLine) return {valid: false, scopes: []};
    const scopes = headerLine
        .replace(/^[^:]*:\s*/, "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    const missing = REQUIRED_SCOPES.filter((s) => !scopes.includes(s));
    return {valid: missing.length === 0, scopes};
}

function readCache() {
    if (!existsSync(CACHE_PATH)) return null;
    try {
        return JSON.parse(readFileSync(CACHE_PATH, "utf8"));
    } catch {
        return null;
    }
}

function writeCache(entry) {
    try {
        writeFileSync(CACHE_PATH, JSON.stringify(entry));
        chmodSync(CACHE_PATH, 0o600);
    } catch {
        // Best-effort; caching is an optimization, not required for correctness.
    }
}

function getValidatedToken() {
    const found = findRawToken();
    if (!found) return null;

    const cache = readCache();
    if (
        cache &&
        cache.token === found.token &&
        cache.valid === true &&
        Date.now() - (cache.validatedAt ?? 0) < CACHE_TTL_MS
    ) {
        return found.token;
    }

    const {valid, scopes} = validateScopes(found.token);
    writeCache({token: found.token, valid, scopes, validatedAt: Date.now()});
    return valid ? found.token : null;
}

let raw = "";
for await (const chunk of process.stdin) raw += chunk;

let input = {};
try {
    input = JSON.parse(raw);
} catch {
    // Malformed input — fail open.
    process.stdout.write(JSON.stringify({permission: "allow"}));
    process.exit(0);
}

const toolInput = input.tool_input ?? {};
const command = toolInput.command ?? input.command ?? "";

if (typeof command !== "string" || command.length === 0) {
    process.stdout.write(JSON.stringify({permission: "allow"}));
    process.exit(0);
}

const env = {};
const token = getValidatedToken();
if (token) {
    env.GH_TOKEN = token;
    env.GITHUB_TOKEN = token;
}

// Build GIT_CONFIG_* entries for safe defaults injected into every git
// invocation (including subprocess git calls made by other tools). Git reads
// GIT_CONFIG_COUNT/_KEY_<n>/_VALUE_<n> as additional config without touching
// any on-disk gitconfig file.
const gitConfigEntries = [["core.hooksPath", "/dev/null"]];
if (token) {
    gitConfigEntries.push([
        "credential.helper",
        `!f(){ echo username=x-access-token; echo password=$GITHUB_TOKEN; };f`,
    ]);
}
env.GIT_CONFIG_COUNT = String(gitConfigEntries.length);
gitConfigEntries.forEach(([k, v], i) => {
    env[`GIT_CONFIG_KEY_${i}`] = k;
    env[`GIT_CONFIG_VALUE_${i}`] = v;
});

// Rewrite SSH-style GitHub URLs to HTTPS so HTTPS-based credentials apply.
let rewrittenCommand = command.replace(
    /\bgit@github\.com:([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+?)(?:\.git)?\b/g,
    "https://github.com/$1.git",
);
rewrittenCommand = rewrittenCommand.replace(
    /\bssh:\/\/git@github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+?)(?:\.git)?\b/g,
    "https://github.com/$1.git",
);

function shellSingleQuote(value) {
    return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

const exports = Object.entries(env)
    .map(([k, v]) => `export ${k}=${shellSingleQuote(v)}`)
    .join("; ");

const newCommand = `${exports}; ${rewrittenCommand}`;

process.stdout.write(
    JSON.stringify({
        permission: "allow",
        updated_input: {...toolInput, command: newCommand},
    }),
);
