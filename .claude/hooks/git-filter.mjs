#!/usr/bin/env node
import { execSync } from "child_process";
/**
 * PreToolUse hook to filter git CLI commands.
 * Allows safe operations; denies dangerous operations.
 * Rewrites allowed commands to:
 *   - disable .git/hooks execution (core.hooksPath=/dev/null)
 *   - inject GITHUB_TOKEN credentials for network operations
 *   - convert SSH URLs to HTTPS
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

function allowWithRewrite(rewrittenCommand) {
    return {
        hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "allow",
            updatedInput: { command: rewrittenCommand },
        },
    };
}

if (toolName !== "Bash") {
    console.log(JSON.stringify(allow));
    process.exit(0);
}

// Only process commands that contain a `git` invocation.
if (!/\bgit\b/.test(command)) {
    console.log(JSON.stringify(allow));
    process.exit(0);
}

// ---------------------------------------------------------------------------
// Flag normalization
// ---------------------------------------------------------------------------

// Per-subcommand short-flag → long-flag mappings.
// Only flags that are actually checked in validation blocks are listed here.
// Normalized forms are used only for validation; the original command is preserved.
const FLAG_NORMALIZATION = {
    push: {
        "-f": "--force",
    },
    branch: {
        "-D": "--force-delete", // sentinel — no real git long form, used for check below
    },
    clean: {
        "-f": "--force",
    },
    commit: {
        "-n": "--no-verify",
    },
    merge: {
        "-n": "--no-verify",
    },
    rebase: {
        "-x": "--exec", // short form of --exec; executes arbitrary shell commands during rebase
    },
};

/**
 * Split combined short flags into individual flags.
 * e.g. "-fd" → ["-f", "-d"]  (single-char flags only)
 * Flags with values (e.g. "-m msg") are left as-is; the caller handles them.
 */
function splitCombinedFlags(token) {
    if (/^-[a-zA-Z]{2,}$/.test(token)) {
        return token
            .slice(1)
            .split("")
            .map((c) => `-${c}`);
    }
    return [token];
}

/**
 * Normalize a list of tokens for a given subcommand.
 * Returns a flat array of tokens with short flags expanded and mapped to long form.
 */
function normalizeTokens(tokens, subcommand) {
    const map = FLAG_NORMALIZATION[subcommand] ?? {};
    const result = [];
    for (const tok of tokens) {
        const expanded = splitCombinedFlags(tok);
        for (const flag of expanded) {
            result.push(map[flag] ?? flag);
        }
    }
    return result;
}

// ---------------------------------------------------------------------------
// Allowlist
// ---------------------------------------------------------------------------

// Flags that are unconditionally blocked regardless of subcommand.
const GLOBALLY_BLOCKED_FLAGS = ["--upload-pack", "--exec", "--receive-pack", "--config"];

// Subcommands that are allowed (deny anything not listed).
const ALLOWED_SUBCOMMANDS = new Set([
    // Network
    "fetch",
    "push",
    "pull",
    "ls-remote",
    // Read-only
    "status",
    "log",
    "diff",
    "show",
    "branch",
    "rev-parse",
    "ls-tree",
    "remote",
    "worktree",
    "ls-files",
    "blame",
    "reflog",
    "describe",
    "config",
    "merge-base",
    "grep",
    "shortlog",
    "for-each-ref",
    "bisect",
    // Write
    "add",
    "update-index",
    "commit",
    "checkout",
    "switch",
    "reset",
    "restore",
    "stash",
    "merge",
    "rebase",
    "cherry-pick",
    "am",
    "apply",
    "format-patch",
    "tag",
    "clean",
    "rm",
    "mv",
    "init",
    "clone",
    "notes",
]);

// Network subcommands that trigger credential injection.
const NETWORK_SUBCOMMANDS = new Set(["push", "fetch", "pull", "ls-remote"]);

// ---------------------------------------------------------------------------
// Parse invocations
// ---------------------------------------------------------------------------

// Replace $(cat <<'WORD'\n...\nWORD\n) with a placeholder so the invocation
// regex sees a clean single-line argument. Only the normalized copy is used
// for parsing; the original command is preserved for the rewrite step.
function stripHeredocs(cmd) {
    return cmd.replace(
        /\$\(cat\s+<<'([A-Za-z_][A-Za-z0-9_]*)'\s*\n[\s\S]*?\n\1\s*\n?\)/g,
        "__HEREDOC__",
    );
}

const commandForParsing = stripHeredocs(command);

// Extract the single git invocation from the command.
const gitInvocationPattern = /\bgit\s+((?:[^\n;|&`$(){}<>]|\\.)+?)(?=\s*[;&|`$(){}<>\n]|$)/;
const match = gitInvocationPattern.exec(commandForParsing);
const invocations = match ? [match[1].trim()] : [];

// If we couldn't parse any invocations but git is present, deny to be safe.
if (invocations.length === 0) {
    console.log(
        JSON.stringify(
            deny(
                `Could not parse git command: "${command}". Only allowed git subcommands may be used.`,
            ),
        ),
    );
    process.exit(0);
}

// ---------------------------------------------------------------------------
// Validate each invocation
// ---------------------------------------------------------------------------

let hasNetworkOp = false;

for (const invocation of invocations) {
    const rawTokens = invocation.split(/\s+/);

    // Check globally blocked flags anywhere in the raw invocation.
    for (const flag of GLOBALLY_BLOCKED_FLAGS) {
        if (rawTokens.includes(flag)) {
            console.log(
                JSON.stringify(
                    deny(
                        `git: flag "${flag}" is not allowed — it enables arbitrary command execution.`,
                    ),
                ),
            );
            process.exit(0);
        }
    }

    // Skip git global flags (e.g. `git -C /path status`) to find the subcommand.
    // Some global flags consume the next token as their value.
    const GIT_GLOBAL_FLAGS_WITH_VALUE = new Set([
        "-C",
        "-c",
        "--git-dir",
        "--work-tree",
        "--namespace",
    ]);
    let subCmdIndex = 0;
    while (subCmdIndex < rawTokens.length && rawTokens[subCmdIndex].startsWith("-")) {
        if (GIT_GLOBAL_FLAGS_WITH_VALUE.has(rawTokens[subCmdIndex])) {
            subCmdIndex++; // skip the value token too
        }
        subCmdIndex++;
    }
    const subcommand = rawTokens[subCmdIndex] ?? "";
    const restRaw = rawTokens.slice(subCmdIndex + 1);

    // Validate subcommand against allowlist.
    if (!ALLOWED_SUBCOMMANDS.has(subcommand)) {
        console.log(
            JSON.stringify(
                deny(
                    `git ${subcommand}: subcommand is not allowed.\n\n` +
                        `Allowed subcommands: ${[...ALLOWED_SUBCOMMANDS].sort().join(", ")}`,
                ),
            ),
        );
        process.exit(0);
    }

    if (NETWORK_SUBCOMMANDS.has(subcommand)) {
        hasNetworkOp = true;
    }

    // Normalize flags for consistent validation.
    const normalized = normalizeTokens(restRaw, subcommand);

    // --- push ---
    if (subcommand === "push") {
        const forceFlags = ["--force", "--force-with-lease", "--force-if-includes"];
        for (const flag of forceFlags) {
            if (normalized.includes(flag)) {
                console.log(
                    JSON.stringify(
                        deny(
                            `git push ${flag} is not allowed — force-pushing can overwrite remote history and requires human review.`,
                        ),
                    ),
                );
                process.exit(0);
            }
        }
        for (const flag of ["--mirror", "--delete"]) {
            if (normalized.includes(flag)) {
                console.log(
                    JSON.stringify(
                        deny(
                            `git push ${flag} is not allowed — this is a destructive remote operation that requires human review.`,
                        ),
                    ),
                );
                process.exit(0);
            }
        }
        if (normalized.includes("--no-verify")) {
            console.log(
                JSON.stringify(
                    deny(`git push --no-verify is not allowed — hooks must not be bypassed.`),
                ),
            );
            process.exit(0);
        }

        // Block pushes that include changes to sensitive paths.
        // Only examines commits that are actually being pushed (not already on remote).
        const BLOCKED_PUSH_PATHS = [
            {
                pattern: /^\.github\/(workflows|actions)\//,
                message:
                    "git push is not allowed — this push includes changes to .github/workflows/ or .github/actions/ which require human review.",
            },
            {
                pattern: /^\.claude\/settings(?:\.local)?\.json$/,
                message:
                    "git push is not allowed — this push includes changes to .claude/settings.json or .claude/settings.local.json which require human review.",
            },
        ];

        try {
            let baseRef;
            try {
                // For branches with an existing upstream, @{u} is exactly what's on the remote.
                baseRef = execSync("git rev-parse @{u}", {
                    encoding: "utf8",
                    stdio: "pipe",
                }).trim();
            } catch {
                // For new branches (first push), find the common ancestor with the default remote branch.
                // This covers only commits that diverged from the remote, i.e. what will be pushed.
                try {
                    const remoteHead = execSync(
                        "git rev-parse origin/main 2>/dev/null || git rev-parse origin/master 2>/dev/null",
                        { encoding: "utf8", stdio: "pipe", shell: true },
                    ).trim();
                    if (remoteHead) {
                        baseRef = execSync(`git merge-base HEAD ${remoteHead}`, {
                            encoding: "utf8",
                            stdio: "pipe",
                        }).trim();
                    }
                } catch {
                    /* no remote ref found */
                }
            }

            if (baseRef) {
                const changedFiles = execSync(`git diff --name-only ${baseRef}..HEAD`, {
                    encoding: "utf8",
                    stdio: "pipe",
                })
                    .trim()
                    .split("\n")
                    .filter(Boolean);

                for (const { pattern, message } of BLOCKED_PUSH_PATHS) {
                    if (changedFiles.some((f) => pattern.test(f))) {
                        console.log(JSON.stringify(deny(message)));
                        process.exit(0);
                    }
                }
            }
        } catch {
            /* if check fails, allow push */
        }
    }

    // --- commit / merge / am ---
    if (subcommand === "commit" || subcommand === "merge" || subcommand === "am") {
        if (normalized.includes("--no-verify")) {
            console.log(
                JSON.stringify(
                    deny(
                        `git ${subcommand} --no-verify is not allowed — hooks must not be bypassed.`,
                    ),
                ),
            );
            process.exit(0);
        }
    }

    // --- branch ---
    if (subcommand === "branch") {
        if (normalized.includes("--force-delete")) {
            console.log(
                JSON.stringify(
                    deny(
                        `git branch -D is not allowed — force-deleting a branch requires human review. Use -d for a safe delete.`,
                    ),
                ),
            );
            process.exit(0);
        }
    }

    // --- reset ---
    if (subcommand === "reset") {
        if (normalized.includes("--hard")) {
            console.log(
                JSON.stringify(
                    deny(
                        `git reset --hard is not allowed — discarding uncommitted changes requires human review.`,
                    ),
                ),
            );
            process.exit(0);
        }
    }

    // --- config ---
    if (subcommand === "config") {
        // Prevent writes to global/system/worktree-level git config, which persist
        // beyond the current repo and could tamper with credentials or hook paths.
        const writeScopes = ["--global", "--system", "--worktree"];
        for (const flag of writeScopes) {
            if (normalized.includes(flag)) {
                console.log(
                    JSON.stringify(
                        deny(
                            `git config ${flag} is not allowed — modifying global/system config requires human review.`,
                        ),
                    ),
                );
                process.exit(0);
            }
        }
    }

    // --- rebase ---
    if (subcommand === "rebase") {
        // --exec / -x runs an arbitrary shell command after each commit — RCE vector.
        if (normalized.includes("--exec")) {
            console.log(
                JSON.stringify(
                    deny(
                        `git rebase --exec / -x is not allowed — it executes arbitrary shell commands during rebase.`,
                    ),
                ),
            );
            process.exit(0);
        }
    }

    // --- clean ---
    if (subcommand === "clean") {
        if (normalized.includes("--force")) {
            console.log(
                JSON.stringify(
                    deny(
                        `git clean -f is not allowed — permanently deleting untracked files requires human review.`,
                    ),
                ),
            );
            process.exit(0);
        }
    }
}

// ---------------------------------------------------------------------------
// Rewrite command for safe execution
// ---------------------------------------------------------------------------

// Step A: inject -c core.hooksPath=/dev/null after the `git` keyword.
// -c is a git global option, valid before any other global options or subcommand.
// Non-global replace: only the leading `git` invocation is rewritten so that
// any occurrence of the word "git" inside a heredoc commit message is left intact.
let rewritten = command.replace(/\bgit\b/, "git -c core.hooksPath=/dev/null");

// Step B: for network operations, inject credential helper and clear cached auth headers.
if (hasNetworkOp) {
    const credHelper = `credential.helper=!f(){ echo username=x-access-token; echo password=\${GITHUB_TOKEN}; };f`;
    rewritten = rewritten.replace(
        /\bgit -c core\.hooksPath=\/dev\/null\b/,
        `git -c core.hooksPath=/dev/null -c '${credHelper}' -c http.extraheader=""`,
    );
}

// Step C: convert SSH-style GitHub URLs to HTTPS.
// git@github.com:owner/repo[.git]  →  https://github.com/owner/repo.git
rewritten = rewritten.replace(
    /\bgit@github\.com:([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+?)(?:\.git)?\b/g,
    "https://github.com/$1.git",
);
// ssh://git@github.com/owner/repo[.git]  →  https://github.com/owner/repo.git
rewritten = rewritten.replace(
    /\bssh:\/\/git@github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+?)(?:\.git)?\b/g,
    "https://github.com/$1.git",
);

console.log(JSON.stringify(allowWithRewrite(rewritten)));
process.exit(0);
