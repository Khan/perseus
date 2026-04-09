#!/usr/bin/env node
/**
 * PreToolUse hook to filter gh CLI commands and API routes.
 * Allows safe read-only operations; denies dangerous write/delete operations.
 * For `gh api`, validates the path against an allowlist and blocks DELETE method.
 */

const chunks = [];
for await (const chunk of process.stdin) chunks.push(chunk);
const inputData = JSON.parse(Buffer.concat(chunks).toString("utf8"));

const toolName = inputData.tool_name ?? "";
const command = (inputData.tool_input ?? {}).command ?? "";

const allow = { hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "allow" } };

function deny(reason) {
    return {
        hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "deny",
            permissionDecisionReason: reason,
        },
    };
}

if (toolName !== "Bash") {
    console.log(JSON.stringify(allow));
    process.exit(0);
}

// Only process commands that contain a `gh` invocation
if (!/\bgh\b/.test(command)) {
    console.log(JSON.stringify(allow));
    process.exit(0);
}

// Subcommands that are explicitly blocked (deny immediately)
const BLOCKED_COMMANDS = [
    "pr merge",
    "repo delete",
    "repo archive",
    "release delete",
    "auth logout",
    "auth login",
    "config set",
];

// Subcommands that are allowed
const ALLOWED_COMMANDS = [
    "pr view",
    "pr list",
    "pr checks",
    "pr diff",
    "pr edit",
    "pr status",
    "pr comment",
    "pr review",
    "issue view",
    "issue list",
    "issue status",
    "issue comment",
    "repo view",
    "repo list",
    "release view",
    "release list",
    "auth status",
    "config get",
    "run view",
    "run list",
    "run watch",
    "workflow view",
    "workflow list",
    "api",
];

// Allowed API path patterns (GET/POST/PATCH only, no DELETE).
// Patterns match with or without a leading slash.
const ALLOWED_API_PATHS = [
    // Pull requests: list / view
    /^repos\/[^/]+\/[^/]+\/pulls$/,
    /^repos\/[^/]+\/[^/]+\/pulls\/\d+$/,
    // PR sub-resources
    /^repos\/[^/]+\/[^/]+\/pulls\/\d+\/comments$/,
    /^repos\/[^/]+\/[^/]+\/pulls\/\d+\/files$/,
    /^repos\/[^/]+\/[^/]+\/pulls\/\d+\/commits$/,
    /^repos\/[^/]+\/[^/]+\/pulls\/\d+\/requested_reviewers$/,
    /^repos\/[^/]+\/[^/]+\/pulls\/\d+\/reactions$/,
    // PR reviews
    /^repos\/[^/]+\/[^/]+\/pulls\/\d+\/reviews$/,
    /^repos\/[^/]+\/[^/]+\/pulls\/\d+\/reviews\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/pulls\/\d+\/reviews\/\d+\/comments$/,
    // PR review comments (top-level, not per-review)
    /^repos\/[^/]+\/[^/]+\/pulls\/comments\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/pulls\/comments\/\d+\/reactions$/,
    // Issues: list / view
    /^repos\/[^/]+\/[^/]+\/issues$/,
    /^repos\/[^/]+\/[^/]+\/issues\/\d+$/,
    // Issue sub-resources
    /^repos\/[^/]+\/[^/]+\/issues\/\d+\/comments$/,
    /^repos\/[^/]+\/[^/]+\/issues\/\d+\/labels$/,
    /^repos\/[^/]+\/[^/]+\/issues\/\d+\/events$/,
    /^repos\/[^/]+\/[^/]+\/issues\/\d+\/timeline$/,
    /^repos\/[^/]+\/[^/]+\/issues\/\d+\/reactions$/,
    // Issue / PR comments (top-level)
    /^repos\/[^/]+\/[^/]+\/issues\/comments\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/issues\/comments\/\d+\/reactions$/,
    // Repository info
    /^repos\/[^/]+\/[^/]+$/,
    // Branches
    /^repos\/[^/]+\/[^/]+\/branches$/,
    /^repos\/[^/]+\/[^/]+\/branches\/[^/?]+$/,
    // Commits
    /^repos\/[^/]+\/[^/]+\/commits$/,
    /^repos\/[^/]+\/[^/]+\/commits\/[a-f0-9]+$/,
    /^repos\/[^/]+\/[^/]+\/commits\/[a-f0-9]+\/comments$/,
    /^repos\/[^/]+\/[^/]+\/commits\/[a-f0-9]+\/check-runs$/,
    /^repos\/[^/]+\/[^/]+\/commits\/[a-f0-9]+\/check-suites$/,
    // Commit comments (top-level)
    /^repos\/[^/]+\/[^/]+\/comments\/\d+$/,
    // File contents
    /^repos\/[^/]+\/[^/]+\/contents\/.+$/,
    // Git refs (list/matching) and single ref
    /^repos\/[^/]+\/[^/]+\/git\/refs(\/.*)?$/,
    /^repos\/[^/]+\/[^/]+\/git\/ref\/.+$/,
    // Compare commits
    /^repos\/[^/]+\/[^/]+\/compare\/.+$/,
    // Releases
    /^repos\/[^/]+\/[^/]+\/releases$/,
    /^repos\/[^/]+\/[^/]+\/releases\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/releases\/latest$/,
    /^repos\/[^/]+\/[^/]+\/releases\/tags\/[^/?]+$/,
    // GitHub Actions: workflow runs
    /^repos\/[^/]+\/[^/]+\/actions\/runs$/,
    /^repos\/[^/]+\/[^/]+\/actions\/runs\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/actions\/runs\/\d+\/jobs$/,
    /^repos\/[^/]+\/[^/]+\/actions\/runs\/\d+\/logs$/,
    /^repos\/[^/]+\/[^/]+\/actions\/runs\/\d+\/artifacts$/,
    // GitHub Actions: jobs
    /^repos\/[^/]+\/[^/]+\/actions\/jobs\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/actions\/jobs\/\d+\/logs$/,
    // GitHub Actions: workflows
    /^repos\/[^/]+\/[^/]+\/actions\/workflows$/,
    /^repos\/[^/]+\/[^/]+\/actions\/workflows\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/actions\/workflows\/\d+\/runs$/,
    // GitHub Actions: artifacts
    /^repos\/[^/]+\/[^/]+\/actions\/artifacts$/,
    /^repos\/[^/]+\/[^/]+\/actions\/artifacts\/\d+$/,
    // Check runs and suites
    /^repos\/[^/]+\/[^/]+\/check-runs\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/check-suites\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/check-suites\/\d+\/check-runs$/,
    // Current user and user profiles
    /^user$/,
    /^users\/[^/?]+$/,
    // Orgs
    /^orgs\/[^/?]+(\/[^/?]+)?$/,
    // Search (read-only)
    /^search\/(repositories|issues|commits|code|users)(\?.*)?$/,
];

/**
 * Parse flags and positional args from a gh command string.
 * Returns { flags, positional } where flags is a Map of flag→value.
 */
function parseGhArgs(argsStr) {
    const tokens = argsStr.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) ?? [];
    const flagsWithValues = new Set([
        "-X",
        "--method",
        "-H",
        "--header",
        "-f",
        "--field",
        "-F",
        "--raw-field",
        "-q",
        "--jq",
        "-t",
        "--template",
        "-R",
        "--repo",
        "--input",
        "--cache",
        "--hostname",
    ]);
    const flags = new Map();
    const positional = [];
    let i = 0;
    while (i < tokens.length) {
        const tok = tokens[i];
        if (tok.startsWith("-")) {
            if (flagsWithValues.has(tok)) {
                flags.set(tok, tokens[i + 1] ?? "");
                i += 2;
            } else {
                flags.set(tok, true);
                i++;
            }
        } else {
            positional.push(tok);
            i++;
        }
    }
    return { flags, positional };
}

/**
 * Validate a `gh api` invocation.
 * Returns null if valid, or an error string if invalid.
 */
function validateApiCommand(argsStr) {
    const { flags, positional } = parseGhArgs(argsStr);

    // Determine HTTP method (default GET)
    const method = (flags.get("-X") || flags.get("--method") || "GET").toUpperCase();
    if (!["GET", "POST", "PATCH"].includes(method)) {
        return `gh api: HTTP method '${method}' is not allowed. Only GET, POST, and PATCH are permitted.`;
    }

    // Extract the API path (first positional arg)
    const apiPath = positional[0];
    if (!apiPath) {
        return `gh api: no API path specified.`;
    }

    // Normalize: strip leading https://api.github.com and leading slash, strip query params
    const normalizedPath = apiPath
        .replace(/^https?:\/\/api\.github\.com/, "")
        .replace(/\{owner\}/g, "owner-placeholder")
        .replace(/\{repo\}/g, "repo-placeholder")
        .replace(/^\//, "") // strip leading slash — patterns match without it
        .split("?")[0]; // strip query string before matching

    const isAllowed = ALLOWED_API_PATHS.some((pattern) => pattern.test(normalizedPath));
    if (!isAllowed) {
        return `gh api: path "${apiPath}" is not in the allowed API paths list.`;
    }

    return null;
}

// Replace $(cat <<'WORD'\n...\nWORD\n) with a placeholder so the invocation
// regex sees a clean single-line argument. Only the normalized copy is used
// for parsing; gh-filter has no rewrite step so the original is not needed.
function stripHeredocs(cmd) {
    return cmd.replace(
        /\$\(cat\s+<<'([A-Za-z_][A-Za-z0-9_]*)'\s*\n[\s\S]*?\n\1\s*\n?\)/g,
        "__HEREDOC__",
    );
}

const commandForParsing = stripHeredocs(command);

// Extract the single gh invocation from the command.
const ghInvocationPattern = /\bgh\s+((?:[^\n;|&`$(){}<>]|\\.)+?)(?=\s*[;&|`$(){}<>\n]|$)/;
const match = ghInvocationPattern.exec(commandForParsing);
const invocations = match ? [match[1].trim()] : [];

// If we couldn't parse any invocations but gh is present, deny to be safe
if (invocations.length === 0) {
    console.log(
        JSON.stringify(
            deny(
                `Could not parse gh command: "${command}". Only allowed gh subcommands may be used.`,
            ),
        ),
    );
    process.exit(0);
}

for (const invocation of invocations) {
    // Get the subcommand (first 1-2 tokens)
    const tokens = invocation.split(/\s+/);
    const sub1 = tokens[0] ?? "";
    const sub2 = tokens[1] ?? "";
    const twoWord = `${sub1} ${sub2}`.trim();
    const oneWord = sub1;

    // Check blocked (two-word first, then one-word)
    if (BLOCKED_COMMANDS.includes(twoWord)) {
        console.log(
            JSON.stringify(
                deny(`gh ${twoWord} is not allowed. This operation requires human review.`),
            ),
        );
        process.exit(0);
    }
    if (BLOCKED_COMMANDS.includes(oneWord)) {
        console.log(JSON.stringify(deny(`gh ${oneWord} is not allowed.`)));
        process.exit(0);
    }

    // Handle `gh api` specially
    if (oneWord === "api") {
        const restArgs = tokens.slice(1).join(" ");
        const err = validateApiCommand(restArgs);
        if (err) {
            console.log(JSON.stringify(deny(err)));
            process.exit(0);
        }
        continue;
    }

    // Check allowed (two-word first, then one-word)
    if (ALLOWED_COMMANDS.includes(twoWord) || ALLOWED_COMMANDS.includes(oneWord)) {
        continue;
    }

    // Not in allowlist — deny
    const allowedList = ALLOWED_COMMANDS.join(", ");
    console.log(
        JSON.stringify(
            deny(
                `gh ${twoWord} is not in the list of allowed gh commands.\n\n` +
                    `Allowed commands: ${allowedList}`,
            ),
        ),
    );
    process.exit(0);
}

console.log(JSON.stringify(allow));
process.exit(0);
