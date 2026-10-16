#!/usr/bin/env node
/**
 * SessionStart hook to ensure the `gh` CLI and `jq` are installed.
 * Installs missing tools via Homebrew or apt-get.
 */
import { spawnSync } from "child_process";

// Which agent harness is running this hook, by its install path (.claude/.codex/.cursor).
const hookPath = process.argv[1] ?? "";
const harness = hookPath.includes("/.codex/")
    ? "codex"
    : hookPath.includes("/.cursor/")
      ? "cursor"
      : "claude";

// {decision:"block"} is not valid SessionStart output: Codex rejects it as
// "invalid session start JSON output" and Claude Code ignores it. Surface the
// problem as session context instead, using each agent's documented shape
// (Cursor uses `additional_context`; Claude Code and Codex use hookSpecificOutput).
function emitSessionContext(reason) {
    const out =
        harness === "cursor"
            ? { additional_context: reason }
            : { hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: reason } };
    console.log(JSON.stringify(out));
}

function commandExists(cmd) {
    return spawnSync("sh", ["-c", `command -v ${cmd}`], { stdio: "ignore" }).status === 0;
}

// Run a command, routing its stdout to our stderr so it never pollutes the hook's
// stdout (which the agent parses as the SessionStart contract).
function run(cmd, args) {
    return spawnSync(cmd, args, { stdio: ["ignore", 2, 2] }).status === 0;
}

function installPkg(pkg) {
    process.stderr.write(`${pkg} not found, installing...\n`);
    if (commandExists("brew")) {
        if (run("brew", ["install", pkg])) {
            process.stderr.write(`${pkg} installed successfully.\n`);
        } else {
            emitSessionContext(
                `Failed to install ${pkg} via Homebrew. Please install it manually: brew install ${pkg}`,
            );
            process.exit(0);
        }
    } else if (commandExists("apt-get")) {
        if (run("apt-get", ["update"]) && run("apt-get", ["install", "-y", pkg])) {
            process.stderr.write(`${pkg} installed successfully.\n`);
        } else {
            emitSessionContext(`Failed to install ${pkg} via apt-get. Please install it manually.`);
            process.exit(0);
        }
    } else {
        emitSessionContext(
            `No supported package manager found (brew or apt-get). Please install ${pkg} manually.`,
        );
        process.exit(0);
    }
}

if (!commandExists("gh")) installPkg("gh");
if (!commandExists("jq")) installPkg("jq");
