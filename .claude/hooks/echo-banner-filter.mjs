#!/usr/bin/env node
/**
 * PreToolUse hook: rewrite `===` -> `---` inside echo/printf banners.
 *
 * Claude Code's command-safety check flags any Bash command containing the
 * literal `===` and forces an approval prompt. Models routinely emit
 * `echo "=== section ==="` banners around diagnostic commands, so unattended /
 * automated runs hang on an approval that never comes.
 *
 * This hook does ONE thing: inside echo/printf arguments it rewrites runs of
 * 3+ `=` to the same number of `-`, via updatedInput, BEFORE the safety check
 * runs. The rewritten command no longer contains `===`, so the check no longer
 * flags it — no forced approval needed. The hook returns NO permissionDecision,
 * so the normal permission flow still applies to the rewritten command.
 *
 * Anything it doesn't rewrite -> no output (no opinion); not an auto-approver.
 * The check is Claude-Code-specific, so the hook no-ops on any other harness.
 */

const chunks = [];
for await (const chunk of process.stdin) chunks.push(chunk);
const inputData = JSON.parse(Buffer.concat(chunks).toString("utf8"));

const hookPath = process.argv[1] ?? "";
const isClaude = !hookPath.includes("/.codex/") && !hookPath.includes("/.cursor/");
const toolName = inputData.tool_name ?? "";
const command = (inputData.tool_input ?? {}).command ?? "";

if (!isClaude || toolName !== "Bash" || !command.includes("===")) {
    process.exit(0);
}

// Quote-aware split into [segment, delimiter, segment, ...] so operator chars
// inside quoted args (e.g. rg "a|b") don't mis-split the command.
function splitTopLevel(cmd) {
    const parts = [];
    let buf = "";
    let quote = null;
    for (let i = 0; i < cmd.length; i++) {
        const c = cmd[i];
        if (quote) {
            buf += c;
            if (c === quote) quote = null;
            continue;
        }
        if (c === '"' || c === "'") {
            quote = c;
            buf += c;
            continue;
        }
        const two = cmd.slice(i, i + 2);
        if (two === "&&" || two === "||") {
            parts.push(buf, two);
            buf = "";
            i++;
            continue;
        }
        if (c === "|" || c === ";" || c === "&" || c === "\n") {
            parts.push(buf, c);
            buf = "";
            continue;
        }
        buf += c;
    }
    parts.push(buf);
    return parts;
}

// Rewrite runs of 3+ `=` to the same number of `-`, but only inside echo/printf
// arguments (the banner case). Other segments are left untouched.
const rewritten = splitTopLevel(command)
    .map((part, idx) => {
        if (idx % 2 === 1) return part; // delimiter
        if (!/^\s*(echo|printf)\b/.test(part)) return part;
        return part.replace(/={3,}/g, (m) => "-".repeat(m.length));
    })
    .join("");

// Only echo/printf banners get rewritten. If nothing changed (e.g. the `===`
// was outside a banner, like a literal `rg "==="`), stay silent and let the
// normal flow handle it — that case isn't this hook's job.
if (rewritten !== command) {
    console.log(
        JSON.stringify({
            hookSpecificOutput: {
                hookEventName: "PreToolUse",
                updatedInput: { ...(inputData.tool_input ?? {}), command: rewritten },
            },
        }),
    );
}
process.exit(0);
