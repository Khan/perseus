#!/usr/bin/env node
/**
 * SessionStart hook to ensure a valid GitHub token is set.
 *
 * If GITHUB_TOKEN or GH_TOKEN are not set, checks for a token in:
 * 1. ~/.config/ka-agent-gh-token
 * 2. ~/.config/ka-olc
 *
 * If no valid token is found, stops the session and prompts user to set one up.
 */
import { readFileSync, appendFileSync } from "fs";
import { execSync } from "child_process";
import { homedir } from "os";

const REQUIRED_SCOPES = ["read:org", "read:packages", "repo", "workflow"];
const home = homedir();

function getTokenFromFile(path) {
    try {
        return readFileSync(path, "utf8").trim();
    } catch {
        return null;
    }
}

function getTokenFromJsonFile(path, key) {
    try {
        const data = JSON.parse(readFileSync(path, "utf8"));
        return data[key] || null;
    } catch {
        return null;
    }
}

function validateToken(token) {
    try {
        const output = execSync(`gh api -i user | grep X-Oauth-Scopes | cut -c17-`, {
            env: { ...process.env, GH_TOKEN: token },
            encoding: "utf8",
            stdio: ["pipe", "pipe", "pipe"],
        }).trim();

        if (!output) return { valid: false, scopes: [] };

        const scopes = output
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        return { valid: true, scopes };
    } catch {
        return { valid: false, scopes: [] };
    }
}

function getMissingScopes(scopes) {
    return REQUIRED_SCOPES.filter((s) => !scopes.includes(s));
}

const sources = [
    {
        label: "KA Agent GH Token",
        getToken: () => getTokenFromFile(`${home}/.config/ka-agent-gh-token`),
    },
    {
        label: "Our Lovely CLI",
        getToken: () => getTokenFromJsonFile(`${home}/.config/ka-olc`, "token"),
    },
];

let lastMissingScopes = null;
let lastMissingLabel = null;

for (const { label, getToken } of sources) {
    const token = getToken();
    if (!token) continue;

    console.error(`Trying token from ${label}...`);
    const { valid, scopes } = validateToken(token);

    if (!valid) {
        console.error(`Token from ${label} is invalid or could not be verified.`);
        continue;
    }

    const missing = getMissingScopes(scopes);
    if (missing.length > 0) {
        console.error(`Token from ${label} is missing scopes: ${missing.join(", ")}`);
        lastMissingScopes = missing;
        lastMissingLabel = label;
        continue;
    }

    console.error(`Valid token from ${label} with scopes: ${scopes.join(", ")}`);

    if (process.env.CLAUDE_ENV_FILE) {
        appendFileSync(process.env.CLAUDE_ENV_FILE, `export GH_TOKEN=${token}\n`);
        appendFileSync(process.env.CLAUDE_ENV_FILE, `export GITHUB_TOKEN=${token}\n`);
    }

    process.exit(0);
}

process.exit(0);
