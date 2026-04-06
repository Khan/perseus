#!/usr/bin/env node
/**
 * Script to set up a GitHub token for any agents used by KA.
 *
 * Prompts user to create a new token with the required scopes,
 * then saves it to ~/.config/ka-agent-gh-token.
 */
import { createInterface } from "readline";
import { writeFileSync } from "fs";
import { execSync } from "child_process";
import { homedir } from "os";

const REQUIRED_SCOPES = ["read:org", "read:packages", "repo", "workflow"];
const TOKEN_FILE = `${homedir()}/.config/ka-agent-gh-token`;

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

const rl = createInterface({ input: process.stdin, output: process.stdout });

console.log(
    `It looks like we need a GitHub API Token.\n\n` +
        `First, go to https://github.com/settings/tokens to create a personal API token.\n` +
        `\t1. Click "Generate new token (classic) - For general use"\n` +
        `\t2. Under "Select scopes" check the following options:\n` +
        `\t   - repo\n` +
        `\t   - read:org\n` +
        `\t   - read:packages\n` +
        `\t   - workflow\n` +
        `\t3. Give it a name and click "Generate token"\n` +
        `\t4. Copy the token to the clipboard\n`,
);

rl.question("Paste your token here: ", (token) => {
    rl.close();
    token = token.trim();

    if (!token) {
        console.log("No token entered. Exiting.");
        process.exit(1);
    }

    console.log("\nValidating token...");
    const { valid, scopes } = validateToken(token);

    if (!valid) {
        console.log(
            "\nCould not validate token. Make sure gh is installed and the token is correct.",
        );
        process.exit(1);
    }

    const missing = REQUIRED_SCOPES.filter((s) => !scopes.includes(s));
    if (missing.length > 0) {
        console.log(
            `\nToken is missing required scopes: ${missing.join(", ")}\n\n` +
                `Visit https://github.com/settings/tokens, find your token, click Edit, ` +
                `and enable the following scopes: ${missing.join(", ")}.\n\n` +
                `Then re-run this script.`,
        );
        process.exit(1);
    }

    writeFileSync(TOKEN_FILE, token, { mode: 0o600 });
    console.log(
        `\nToken saved to ${TOKEN_FILE}.\nYour GitHub token is configured successfully. Please restart your agent sessions to use it.`,
    );
});
