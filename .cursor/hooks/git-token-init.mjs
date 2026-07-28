#!/usr/bin/env node
/**
 * SessionStart hook to ensure a valid GitHub token is set.
 *
 * Token discovery sources (first non-empty wins):
 *   1. process.env.GH_TOKEN / GITHUB_TOKEN (already-injected)
 *   2. ~/.config/ka-agent-gh-token (raw token text)
 *   3. ~/.config/ka-olc           (JSON, key "token")
 *
 * On success (harness detected by the hook's install path):
 *   - Cursor: emits { env: { GH_TOKEN, GITHUB_TOKEN } } to stdout so Cursor's
 *     sessionStart hook contract propagates the token to downstream hooks.
 *   - Claude Code: appends exports to CLAUDE_ENV_FILE so all subsequent tool
 *     calls see the token.
 *   - Codex: no SessionStart env-injection mechanism, so nothing is emitted.
 *
 * On failure: logs a warning to stderr and exits 0 so workflows that don't
 * need GitHub access can still proceed.
 */
import {readFileSync, appendFileSync} from "fs";
import {execSync} from "child_process";
import {homedir} from "os";

const REQUIRED_SCOPES = ["read:org", "read:packages", "repo", "workflow"];
const home = homedir();

// Which agent harness is running this hook, by its install path (.claude/.codex/.cursor).
const hookPath = process.argv[1] ?? "";
const harness = hookPath.includes("/.codex/")
    ? "codex"
    : hookPath.includes("/.cursor/")
      ? "cursor"
      : "claude";

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
        label: "KA Agent GH Token",
        get: () => readFileOrNull(`${home}/.config/ka-agent-gh-token`),
    },
    {
        label: "Our Lovely CLI",
        get: () => readJsonKeyOrNull(`${home}/.config/ka-olc`, "token"),
    },
];

function validateToken(token) {
    try {
        const raw = execSync("gh api -i user", {
            env: {...process.env, GH_TOKEN: token, GITHUB_TOKEN: token},
            encoding: "utf8",
            stdio: ["pipe", "pipe", "pipe"],
        });
        // Match the literal X-OAuth-Scopes header line (not a substring of
        // Access-Control-Expose-Headers, which lists header names).
        const headerLine = raw
            .split(/\r?\n/)
            .find((line) => /^x-oauth-scopes\s*:/i.test(line));
        if (!headerLine) return {valid: false, scopes: []};
        const scopes = headerLine
            .replace(/^[^:]*:\s*/, "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        return {valid: true, scopes};
    } catch {
        return {valid: false, scopes: []};
    }
}

for (const {label, get} of SOURCES) {
    const token = get();
    if (!token) continue;

    console.error(`Trying token from ${label}...`);
    const {valid, scopes} = validateToken(token);

    if (!valid) {
        console.error(
            `Token from ${label} is invalid or could not be verified.`,
        );
        continue;
    }

    const missing = REQUIRED_SCOPES.filter((s) => !scopes.includes(s));
    if (missing.length > 0) {
        console.error(
            `Token from ${label} is missing scopes: ${missing.join(", ")}`,
        );
        continue;
    }

    console.error(
        `Valid token from ${label} with scopes: ${scopes.join(", ")}`,
    );

    if (harness === "cursor") {
        // Cursor sessionStart contract: emit env JSON to stdout so downstream
        // hooks receive the token.
        process.stdout.write(
            JSON.stringify({env: {GH_TOKEN: token, GITHUB_TOKEN: token}}),
        );
    } else if (harness === "claude" && process.env.CLAUDE_ENV_FILE) {
        // Claude Code: persist to env file so all subsequent tool calls see it.
        appendFileSync(
            process.env.CLAUDE_ENV_FILE,
            `export GH_TOKEN=${token}\n`,
        );
        appendFileSync(
            process.env.CLAUDE_ENV_FILE,
            `export GITHUB_TOKEN=${token}\n`,
        );
    }

    process.exit(0);
}

process.exit(0);
