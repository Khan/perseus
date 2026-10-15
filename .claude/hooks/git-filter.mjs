#!/usr/bin/env node
/**
 * PreToolUse hook to filter git CLI commands.
 * Allows safe operations; denies dangerous operations.
 * Rewrites allowed commands to:
 *   - disable .git/hooks execution (core.hooksPath=/dev/null)
 *   - inject GITHUB_TOKEN credentials for network operations
 *   - convert SSH URLs to HTTPS
 *
 * What this is, and is not. It runs only on commands that *start* with `git`,
 * so `cd . && git push --force` never reaches it, and neither does
 * `sh -c '…'`. It is therefore not a boundary against someone choosing how to
 * spell a command: anyone who can pick the wording can step around it in one
 * move, and no amount of parsing here changes that.
 *
 * What it is for is judging an agent's own ordinary output correctly, and that
 * output is overwhelmingly a line beginning with `git`. The care taken over
 * spelling — escapes, quoting, line continuations, redirect descriptors — is
 * not anti-adversarial; it is so that the everyday line is read the way git
 * will read it, in both directions. A misread that asks is a prompt the
 * reduction was meant to remove; a misread that allows is a gate that silently
 * did not run. Where the spelling cannot be resolved before the shell runs the
 * command, the answer is to ask rather than to guess.
 *
 * A real boundary would have to sit where the tool call is made, not inside a
 * pattern over its text. The gates here are worth their prompts only where an
 * ordinary line would otherwise do something silently: the `+` refspec is the
 * clearest case — `git push origin +topic` force-pushes and nothing else in
 * the line says so — and it costs nothing on the corpus this was measured
 * against, because agents do not write one by accident. A gate whose wrong
 * answer costs only a missing hint is left un-gated instead.
 *
 * Note what the rewrite below means for the gates: every allowed command is
 * given `-c core.hooksPath=/dev/null`, so a git command at the head of its
 * line runs no repo hook. The protections a repository keeps in `pre-commit`
 * or `pre-push` — Khan's don't-commit-to-master guards among them — are not
 * in force here, and no gate in this file substitutes for them.
 */

const chunks = [];
for await (const chunk of process.stdin) chunks.push(chunk);
const inputData = JSON.parse(Buffer.concat(chunks).toString("utf8"));

// Which agent harness is running this hook, detected by its install path: the
// same script is copied into .claude/, .codex/, and .cursor/. Defaults to
// "claude" (also the path the unit tests run from). The harnesses share an input
// shape but differ on PreToolUse output — see allow()/ask() below.
const hookPath = process.argv[1] ?? "";
const harness = hookPath.includes("/.codex/")
    ? "codex"
    : hookPath.includes("/.cursor/")
      ? "cursor"
      : "claude";
const toolName = inputData.tool_name ?? "";
// Cursor's beforeShellExecution puts the command at the top level; Claude Code
// and Codex pass it as tool_input.command on a Bash tool call.
const command =
    harness === "cursor" ? (inputData.command ?? "") : ((inputData.tool_input ?? {}).command ?? "");

function allow() {
    if (harness === "cursor") return { permission: "allow" };
    // Codex: a bare permissionDecision:"allow" is unsupported and surfaces a hook
    // error, so emit a no-op (no decision) and let the command run under Codex's
    // own sandbox/approval policy.
    if (harness === "codex") return { hookSpecificOutput: { hookEventName: "PreToolUse" } };
    return { hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "allow" } };
}

function ask(reason) {
    if (harness === "cursor") return { permission: "ask", agent_message: reason };
    // Codex cannot prompt from a PreToolUse hook ("ask" is unsupported), so deny
    // to gate the sensitive operation; the reason is surfaced to the model.
    if (harness === "codex") {
        return {
            hookSpecificOutput: {
                hookEventName: "PreToolUse",
                permissionDecision: "deny",
                permissionDecisionReason: reason,
            },
        };
    }
    return {
        hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "ask",
            permissionDecisionReason: reason,
        },
    };
}

function allowWithRewrite(rewrittenCommand) {
    if (harness === "cursor") {
        // Cursor does not support command rewriting — allow as-is.
        return { permission: "allow" };
    }
    return {
        hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "allow",
            updatedInput: { command: rewrittenCommand },
        },
    };
}

if (harness !== "cursor" && toolName !== "Bash") {
    console.log(JSON.stringify(allow()));
    process.exit(0);
}

// Only process commands that contain a `git` invocation.
if (!/^\s*git\b/.test(command)) {
    console.log(JSON.stringify(allow()));
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
        // Without this the `--delete` gate never saw `git push -d origin main`,
        // while the long form and the `:branch` colon form both asked.
        "-d": "--delete",
    },
    branch: {
        "-D": "--force-delete", // sentinel — no real git long form, used for check below
    },
    clean: {
        "-f": "--force",
    },
    // Only flags a gate below actually reads belong here, and only where the
    // short form means what the long one does. `merge` is the cautionary case:
    // `-n` there is `--no-stat`, not `--no-verify`, so mapping it made
    // `git merge -n topic` ask about a flag it had not been given.
    // `merge --no-verify` is gated under its long name instead.
    rebase: {
        "-x": "--exec", // short form of --exec; executes arbitrary shell commands during rebase
    },
    // `-u` is `--upload-pack` for exactly these two, and something harmless
    // everywhere else it exists: `fetch -u` and `pull -u` are
    // `--update-head-ok`, `push -u` is `--set-upstream`, `read-tree -u` updates
    // the working tree. Mapping it per subcommand is the only safe way round.
    clone: {
        "-u": "--upload-pack",
    },
    "ls-remote": {
        "-u": "--upload-pack",
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
 * Split an invocation into the words the shell would hand git.
 *
 * A plain whitespace split breaks `git -c user.name="John Resig" commit`: `-c`
 * consumes `user.name="John`, the scan stops on `Resig"`, and that becomes the
 * subcommand — so a legitimate commit is reported as an unknown subcommand.
 *
 * This is a character scan rather than a regex for the reason `maskQuoted`
 * became one: a regex cannot tell `\'` from `'`, and every flag and refspec
 * check in this file reads these tokens, so the weaker parser was the one
 * doing the security-relevant work. The two are still separate scans, and
 * deliberately so — `maskQuoted` rewrites a whole command line, preserving its
 * structure so the invocation pattern can find command boundaries, while this
 * produces the words of one invocation. They encode the same rules; a change to
 * either belongs in both. It applies the shell's own rules — a
 * backslash escapes the next character, single quotes protect their contents
 * whole, double quotes honour backslash escapes inside — so `\+main` arrives
 * as `+main` and `"John Resig"` stays one word.
 *
 * A quote left open is reported rather than guessed at. The shell would refuse
 * the line outright; absorbing the remainder into one token would instead hide
 * whatever follows from the gates, which is the one direction this file must
 * never fail in.
 *
 * @param invocation The argument string following `git`.
 * @returns `tokens`, as git would receive them, and `unterminated` when a
 *   quote was still open at the end.
 */
function tokenize(invocation) {
    const tokens = [];
    let current = "";
    let started = false;
    let unterminated = false;
    let i = 0;
    while (i < invocation.length) {
        const ch = invocation[i];
        if (/\s/.test(ch)) {
            if (started) {
                tokens.push(current);
                current = "";
                started = false;
            }
            i++;
            continue;
        }
        started = true;
        if (ch === "\\" && i + 1 < invocation.length) {
            current += invocation[i + 1];
            i += 2;
            continue;
        }
        if (ch === "'" || ch === '"') {
            let j = i + 1;
            while (j < invocation.length && invocation[j] !== ch) {
                // Only double quotes honour backslash escapes inside.
                if (ch === '"' && invocation[j] === "\\" && j + 1 < invocation.length) {
                    current += invocation[j + 1];
                    j += 2;
                    continue;
                }
                current += invocation[j];
                j++;
            }
            if (j >= invocation.length) unterminated = true;
            i = j + 1;
            continue;
        }
        current += ch;
        i++;
    }
    if (started) tokens.push(current);
    return { tokens, unterminated };
}

/**
 * Normalize a list of tokens for a given subcommand.
 * Returns a flat array of tokens with short flags expanded and mapped to long form.
 * Handles both "-X" and "-X=value" — for the latter, only the flag prefix is
 * remapped, e.g. "-D=branch" → "--force-delete=branch", so downstream hasFlag()
 * checks correctly catch the exploit form.
 */
function normalizeTokens(tokens, subcommand) {
    const map = FLAG_NORMALIZATION[subcommand] ?? {};
    const result = [];
    for (const tok of tokens) {
        const expanded = splitCombinedFlags(tok);
        for (const flag of expanded) {
            const eqIdx = flag.indexOf("=");
            if (eqIdx > 0) {
                const head = flag.slice(0, eqIdx);
                const tail = flag.slice(eqIdx); // includes "="
                result.push(`${map[head] ?? head}${tail}`);
                continue;
            }
            // A group with an attached value: git reads `-qu./prog` as `-q`
            // plus `--upload-pack=./prog`, letting the first value-taking
            // letter swallow the rest. `splitCombinedFlags` only splits a token
            // that is all letters, so a group carrying a path arrives whole and
            // its letters are examined here — reading just the first two missed
            // a mapped flag sitting behind an unmapped one. One token in, one
            // token out, so the refspec scans downstream still line up.
            if (flag.startsWith("-") && !flag.startsWith("--") && flag.length > 2) {
                const at = [...flag.slice(1)].findIndex((ch) => map[`-${ch}`]);
                if (at !== -1) {
                    const mapped = map[`-${flag[at + 1]}`];
                    const rest = flag.slice(at + 2).replace(/^=/, "");
                    result.push(rest === "" ? mapped : `${mapped}=${rest}`);
                    continue;
                }
            }
            result.push(map[flag] ?? flag);
        }
    }
    return result;
}

/**
 * Detect a flag in a token list, matching both space-separated form ("--flag")
 * and equals form ("--flag=value"). Without this, attackers can bypass
 * security checks via the equals form (e.g. `git fetch --upload-pack=evil`).
 */
function hasFlag(tokens, flag) {
    const eqPrefix = `${flag}=`;
    return tokens.some((t) => t === flag || t.startsWith(eqPrefix));
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
    "version",
    "archive",
    "fsck",
    "show-branch",
    "whatchanged",
    "annotate",
    "cherry",
    "range-diff",
    "diff-files",
    "verify-commit",
    "verify-tag",
    "verify-pack",
    "show-index",
    "check-ref-format",
    "check-mailmap",
    "patch-id",
    "stripspace",
    "get-tar-commit-id",
    "var",
    // Object writers. These add an object to the database and reference it from
    // nothing, so on their own they change nothing observable — the worst case
    // is an unreachable blob that gc collects. They are not a gate on what ends
    // up reachable: `branch`, `tag` and `update-ref` are all allowed, and
    // `commit` could build the same history anyway. The point is only that
    // writing an object is not itself a state change worth a prompt.
    "hash-object",
    "commit-tree",
    "write-tree",
    "mktree",
    "mktag",
    "unpack-file",
    // Index and working-tree writes no broader than `checkout` / `restore` /
    // `apply`, which are already here. `read-tree -u` is gated below.
    "read-tree",
    "merge-file",
    "stage",
    // Read-only plumbing. These inspect objects and refs and write nothing, so
    // they are no more sensitive than the porcelain above (`rev-list` is `log`,
    // `cat-file` is `show`, `merge-tree` computes a merge without touching the
    // worktree, `check-ignore` queries .gitignore).
    "rev-list",
    "cat-file",
    "check-ignore",
    "check-attr",
    "merge-tree",
    "count-objects",
    "show-ref",
    "name-rev",
    "diff-tree",
    "diff-index",
    // Write
    // symbolic-ref writes when given a value (`git symbolic-ref HEAD <ref>`),
    // but only to a local ref — recoverable, and the documented repair for a
    // half-applied `git checkout -b`.
    "symbolic-ref",
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
    "revert",
    "am",
    // update-ref moves a local ref, which `branch`, `tag` and `reset` already
    // do. Deleting one (-d) still asks — see below.
    "update-ref",
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
// Push flags that consume the following token, so it is not a positional arg.
const PUSH_FLAGS_WITH_VALUE = new Set([
    "-o",
    "--push-option",
    "--repo",
    "--receive-pack",
    "--exec",
]);

/**
 * Report whether a quoted literal is one the shell will expand.
 *
 * Single quotes pass their contents through untouched, so `'$BRANCH'` reaches
 * git as those seven characters and is readable. A double-quoted run holding
 * `$` or a backtick is not.
 *
 * @param literal A quoted run, quote characters included.
 * @returns True when running the command changes what git receives.
 */
function shellWillExpand(literal) {
    if (!literal.startsWith('"')) return false;
    // `stripHeredocs` has already taken the `$(` off a heredoc substitution, so
    // the character test alone cannot see one.
    return /[$`]/.test(literal) || literal.includes(HEREDOC_PLACEHOLDER);
}

/**
 * Report whether any refspec carries the `+` force marker.
 *
 * `git push origin +topic` forces without naming `--force`, so the flag checks
 * never see it.
 *
 * @param tokens Normalized tokens following `push`.
 * @returns True when a refspec is prefixed with `+`.
 */
function hasForceRefspec(tokens) {
    return pushRefspecs(tokens).some((spec) => spec.startsWith("+"));
}

/**
 * Collect the refspecs of a push, whichever way the remote was supplied.
 *
 * Positionals are `[remote, refspec...]` — unless `--repo <remote>` named the
 * remote, in which case every positional is a refspec and dropping the first
 * discards one.
 *
 * @param tokens Normalized tokens following `push`.
 * @returns The refspecs.
 */
function pushRefspecs(tokens) {
    const positional = pushPositionals(tokens);
    return tokens.some((t) => t === "--repo" || t.startsWith("--repo="))
        ? positional
        : positional.slice(1);
}

/**
 * Collect a push's positional arguments: `[remote, refspec...]`.
 *
 * @param tokens Normalized tokens following `push`.
 * @returns The positional arguments, flags and their values removed.
 */
function pushPositionals(tokens) {
    const positional = [];
    for (let i = 0; i < tokens.length; i++) {
        const tok = tokens[i];
        if (!tok.startsWith("-")) {
            positional.push(tok);
            continue;
        }
        if (PUSH_FLAGS_WITH_VALUE.has(tok)) i++;
    }
    return positional;
}

// ---------------------------------------------------------------------------
// Parse invocations
// ---------------------------------------------------------------------------

// Replace $(cat <<'WORD'\n...\nWORD\n) with a placeholder so the invocation
// regex sees a clean single-line argument. Only the normalized copy is used
// for parsing; the original command is preserved for the rewrite step.
// The placeholder carries no `$`, by design: the invocation pattern stops at
// one, and a heredoc argument would cut every invocation short. That makes it
// read as an ordinary, fully-expanded word, so the checks that ask "can I read
// this argument?" have to be told about it by name — see `HEREDOC_PLACEHOLDER`
// below. Leaving them uninformed is how a heredoc came to carry a document,
// refspec or config value past the gate that judges one.
const HEREDOC_PLACEHOLDER = "__HEREDOC__";

function stripHeredocs(cmd) {
    return cmd.replace(
        /\$\(cat\s+<<'([A-Za-z_][A-Za-z0-9_]*)'\s*\n[\s\S]*?\n\1\s*\n?\)/g,
        HEREDOC_PLACEHOLDER,
    );
}

/**
 * Replace quoted runs with placeholders so the invocation regex sees a clean
 * argument list.
 *
 * That regex stops at `{`, `(`, `$`, `<` and newlines, all of which a quoted
 * argument may contain — `git push -o "ci.skip=(yes)" origin +main` would
 * otherwise be cut off before the refspec, so the refspec checks would look at
 * a push whose arguments are not all there.
 *
 * @param cmd The command to mask.
 * @returns The masked command and the literals needed to restore it.
 */
function maskQuoted(cmd) {
    const store = [];
    let masked = "";
    let i = 0;
    while (i < cmd.length) {
        const ch = cmd[i];
        // Outside quotes a backslash escapes the next character, so `\'` is a
        // literal apostrophe and must not open a quoted run. A regex cannot
        // tell the two apart, and pairing an escaped apostrophe with the next
        // ordinary one masks across a command separator — which deletes a whole
        // git invocation from the parse, and a deleted invocation is never
        // gated at all.
        if (ch === "\\" && i + 1 < cmd.length) {
            masked += cmd.slice(i, i + 2);
            i += 2;
            continue;
        }
        if (ch === "'" || ch === '"') {
            let j = i + 1;
            while (j < cmd.length && cmd[j] !== ch) {
                // Only double quotes honour backslash escapes inside.
                if (ch === '"' && cmd[j] === "\\") j++;
                j++;
            }
            if (j >= cmd.length) {
                // An unterminated quote stops the masking and leaves the rest
                // raw, so every later git invocation stays visible to the loop
                // rather than disappearing inside a masked run. An apostrophe
                // in a commit message or a heredoc body is ordinary and must
                // not itself prompt.
                masked += cmd.slice(i);
                break;
            }
            store.push(cmd.slice(i, j + 1));
            masked += `__GITQUOTED${store.length - 1}__`;
            i = j + 1;
            continue;
        }
        masked += ch;
        i++;
    }
    return { masked, store };
}

/**
 * Restore the literals `maskQuoted` replaced.
 *
 * @param str A slice of the masked command.
 * @param store The literals returned by `maskQuoted`.
 * @returns The slice with its quoted runs put back.
 */
function unmaskQuoted(str, store) {
    return str.replace(/__GITQUOTED(\d+)__/g, (_, index) => store[Number(index)] ?? "");
}

// A `\`-newline is a line continuation: the shell joins the lines before git
// ever sees them. Without this the invocation stops at the backslash and the
// continuation contributes no tokens at all, so `git push origin \` /
// `+topic` parsed as a push with no refspec at all and ran.
const commandForMasking = stripHeredocs(command).replace(/\\\n/g, " ");

// Quoted content is deliberately out of scope for the invocation scan: a
// terminated quoted run becomes one sentinel token, so a git invocation inside
// it is not parsed. `git status && sh -c 'git push --force origin main'` is
// allowed on that basis, and so is the `bash -c "…"` spelling. This is the
// same boundary as the entry condition — a line that simply starts with
// `sh -c '…'` never reaches the filter at all — and masking is what makes the
// arguments of the invocations it *does* see readable. Anything that parses
// inside quotes has to parse the shell, which is a different tool.

const { masked: commandForParsing, store: quotedLiterals } = maskQuoted(commandForMasking);

// Extract every git invocation from the command. Compound commands joined
// by &&, ||, ;, or pipes contain multiple invocations and each one needs to
// be validated — using a single-match regex would let later invocations slip
// past whatever check the first invocation passes.
const gitInvocationPattern = /\bgit\s+((?:[^\n;|&`$(){}<>]|\\.)+?)(?=\s*[;&|`$(){}<>\n]|$)/g;

// Characters that end an invocation without truncating its arguments: a command
// separator, a redirect, or end of input. Anything else — `$`, a backtick, `(`,
// `{`, `<` — means the shell would expand something the pattern could not read,
// so whatever follows it is missing from the invocation.
const CLEAN_INVOCATION_ENDINGS = new Set([";", "&", "|", "\n", ">", undefined]);

const invocations = Array.from(commandForParsing.matchAll(gitInvocationPattern), (m) => {
    let text = m[1].trim();
    // `[ \t]*` and `[\s\S]`, not `\s*(.)`: `.` never matches a newline, so a
    // greedy `\s*` would step over it to the next line's first character and
    // `"\n"` below could never be seen — marking every non-final invocation of
    // a multi-line command truncated, which false-asks the ordinary two-line
    // finish (`git push …` / `echo done`).
    const next = commandForParsing.slice(m.index + m[0].length).match(/^[ \t]*([\s\S])/)?.[1];
    // The pattern stops before `>`, which leaves a redirect's file descriptor
    // attached to the invocation: `git push origin topic 2>&1` ends as
    // `push origin topic 2`, and that trailing `2` reads as a second refspec.
    // Only strip it when a `>` really does follow.
    if (next === ">") text = text.replace(/\s+\d+$/, "");
    // Masking runs before this pattern, so a quoted `$` or backtick is
    // already a sentinel and leaves no boundary character to stop at:
    // `git push origin "$BRANCH"` looked like a complete invocation whose
    // refspec is the literal `$BRANCH`, and neither the `+` check nor the
    // colon-delete check matched it. A masked run the shell will expand is
    // the same unreadability as a truncated line, so it is recorded as one.
    // An unquoted heredoc substitution is masked by nothing, so it leaves no
    // literal to ask `shellWillExpand` about — the placeholder sits in the
    // invocation text itself.
    const expandsWhenRun =
        text.includes(HEREDOC_PLACEHOLDER) ||
        Array.from(text.matchAll(/__GITQUOTED(\d+)__/g)).some((q) =>
            shellWillExpand(quotedLiterals[Number(q[1])] ?? ""),
        );
    return {
        text: unmaskQuoted(text, quotedLiterals),
        // The `+`-refspec check must read a push's arguments correctly, so it
        // treats a truncated invocation as unreadable rather than guessing.
        truncated: !CLEAN_INVOCATION_ENDINGS.has(next) || expandsWhenRun,
    };
});

// If we couldn't parse any invocations but git is present, ask to be safe.
if (invocations.length === 0) {
    console.log(
        JSON.stringify(
            ask(
                `Could not parse git command: "${command}". Unparseable commands require user approval.`,
            ),
        ),
    );
    process.exit(0);
}

// ---------------------------------------------------------------------------
// Validate each invocation
// ---------------------------------------------------------------------------

let hasNetworkOp = false;

for (const { text: invocation, truncated } of invocations) {
    const { tokens: rawTokens, unterminated: quoteLeftOpen } = tokenize(invocation);

    // Check globally blocked flags anywhere in the raw invocation.
    for (const flag of GLOBALLY_BLOCKED_FLAGS) {
        if (hasFlag(rawTokens, flag)) {
            console.log(
                JSON.stringify(
                    ask(
                        `git: flag "${flag}" requires user approval — it enables arbitrary command execution.`,
                    ),
                ),
            );
            process.exit(0);
        }
    }

    // `--exec-path=<dir>` points git at another directory for its subcommands;
    // bare `--exec-path` only prints the current one.
    if (rawTokens.some((t) => t.startsWith("--exec-path="))) {
        console.log(
            JSON.stringify(
                ask(
                    `git --exec-path=... requires user approval — it changes where git loads its subcommands from.`,
                ),
            ),
        );
        process.exit(0);
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

    // Informational invocations carry no subcommand at all (`git --version`,
    // `git --list-cmds=builtins`). Without this they fall through as an empty
    // subcommand and ask, which reads as a broken filter rather than a policy
    // decision. `--exec-path` is here in its bare, printing form only; the
    // `--exec-path=<dir>` form is gated above.
    const INFORMATIONAL_FLAGS = [
        /^--version$/,
        /^--help$/,
        /^-[vh]$/,
        /^--list-cmds=/,
        /^--(html|man|info)-path$/,
        /^--build-options$/,
        /^--exec-path$/,
    ];
    if (subcommand === "" && rawTokens.every((t) => INFORMATIONAL_FLAGS.some((p) => p.test(t)))) {
        continue;
    }

    // Validate subcommand against allowlist.
    if (!ALLOWED_SUBCOMMANDS.has(subcommand)) {
        console.log(
            JSON.stringify(
                ask(
                    `git ${subcommand}: subcommand requires user approval.\n\n` +
                        `Auto-approved subcommands: ${[...ALLOWED_SUBCOMMANDS].sort().join(", ")}`,
                ),
            ),
        );
        process.exit(0);
    }

    // A quote left open makes this invocation's own tokens a guess, exactly
    // as a shell expansion makes its arguments one, so the two share a
    // verdict. The push and update-ref blocks read it.
    const unreadable = truncated || quoteLeftOpen;

    if (NETWORK_SUBCOMMANDS.has(subcommand)) {
        hasNetworkOp = true;
    }

    // Normalize flags for consistent validation.
    const normalized = normalizeTokens(restRaw, subcommand);

    // The same list, read again after normalization. The check above runs on
    // raw tokens, so it sees only the long spellings — and `git clone -u
    // ./evil.sh <url>` ran `./evil.sh` while `--upload-pack` asked. Only the
    // subcommands whose `FLAG_NORMALIZATION` entry maps a short form can reach
    // anything new here.
    for (const flag of GLOBALLY_BLOCKED_FLAGS) {
        if (hasFlag(normalized, flag)) {
            console.log(
                JSON.stringify(
                    ask(
                        `git ${subcommand}: flag "${flag}" requires user approval — it enables arbitrary command execution.`,
                    ),
                ),
            );
            process.exit(0);
        }
    }

    // --- push ---
    if (subcommand === "push") {
        // Force-pushing and bypassing hooks always ask, on the flag alone.
        // Clearing them by where the push lands would mean knowing, before the
        // command runs, which repository it runs in, which branch is checked
        // out and which remote the push resolves to — and the same line can
        // change every one of those first.
        for (const flag of ["--force", "--force-with-lease", "--force-if-includes"]) {
            if (hasFlag(normalized, flag)) {
                console.log(
                    JSON.stringify(
                        ask(
                            `git push ${flag} requires user approval — force-pushing can overwrite remote history.`,
                        ),
                    ),
                );
                process.exit(0);
            }
        }

        if (hasFlag(normalized, "--no-verify")) {
            console.log(
                JSON.stringify(
                    ask(
                        `git push --no-verify requires user approval — bypassing hooks is a sensitive operation.`,
                    ),
                ),
            );
            process.exit(0);
        }

        // A `+` refspec forces without naming a flag, so the flag checks above
        // never see it. A truncated invocation has had its refspecs cut off
        // entirely — there is nothing left to inspect for a `+` — so a push
        // whose arguments the shell will expand asks even when it names no
        // force flag at all.
        if (unreadable) {
            console.log(
                JSON.stringify(
                    ask(
                        `git push requires user approval — its arguments cannot be read before the shell expands them, so a force (\`+\`) refspec cannot be ruled out.`,
                    ),
                ),
            );
            process.exit(0);
        }
        if (hasForceRefspec(normalized)) {
            console.log(
                JSON.stringify(
                    ask(
                        `git push requires user approval — a "+" refspec force-pushes without naming a flag.`,
                    ),
                ),
            );
            process.exit(0);
        }

        // `git push origin :branch` deletes a remote branch. The --delete gate
        // below has never covered the colon spelling, so this ran unprompted on
        // any branch, `main` included.
        if (pushRefspecs(normalized).some((spec) => spec.startsWith(":"))) {
            console.log(
                JSON.stringify(
                    ask(
                        `git push <remote> :<branch> requires user approval — the colon form deletes a remote branch.`,
                    ),
                ),
            );
            process.exit(0);
        }

        for (const flag of ["--mirror", "--delete"]) {
            if (hasFlag(normalized, flag)) {
                console.log(
                    JSON.stringify(
                        ask(
                            `git push ${flag} requires user approval — this is a destructive remote operation.`,
                        ),
                    ),
                );
                process.exit(0);
            }
        }
    }

    // --- merge / am ---
    // `commit --no-verify` is deliberately absent. A commit is local and fully
    // reversible, and the flag mostly changes nothing here: the rewrite step at
    // the bottom of this file injects `-c core.hooksPath=/dev/null`, so a
    // commit that leads its command line runs no repo hook whether or not the
    // flag is given. It is not the sandbox that stops them — review corrected
    // an earlier claim to that effect.
    //
    // Where the flag does have an effect is the position the rewrite misses:
    // it replaces only the first `git` on a line, so the commit in
    // `git add -A && git commit` does run the repo's hooks. Gating it there
    // prompted on routine work while the leading spelling — the one that
    // silently skips the same hooks — went unprompted, which is the wrong way
    // round. `merge` and `am` keep the gate: both can rewrite a tree from
    // somewhere else, so their hooks are worth a prompt.
    if (subcommand === "merge" || subcommand === "am") {
        if (hasFlag(normalized, "--no-verify")) {
            console.log(
                JSON.stringify(
                    ask(
                        `git ${subcommand} --no-verify requires user approval — bypassing hooks is a sensitive operation.`,
                    ),
                ),
            );
            process.exit(0);
        }
    }

    // --- bisect ---
    if (subcommand === "bisect") {
        // `git bisect run <cmd>` executes <cmd> once per revision. That is the
        // same arbitrary execution `--exec` is blocked for above.
        if (restRaw[0] === "run") {
            console.log(
                JSON.stringify(
                    ask(
                        `git bisect run requires user approval — it executes the given command at every revision it tests.`,
                    ),
                ),
            );
            process.exit(0);
        }
    }

    // --- clone / init ---
    if (subcommand === "clone" || subcommand === "init") {
        // A template directory is copied into the repository's .git, hooks and
        // all. `init` is the sharper of the two: re-running it in a repository
        // that already exists copies the template into the one being worked in,
        // rather than into a fresh clone. This hook pins core.hooksPath for the
        // commands it rewrites, so planted hooks do not fire through it — but
        // they fire for any git run that does not start the Bash line, which is
        // most of them.
        if (normalized.some((t) => t === "--template" || t.startsWith("--template="))) {
            console.log(
                JSON.stringify(
                    ask(
                        `git ${subcommand} --template requires user approval — a template directory installs hooks into the repository.`,
                    ),
                ),
            );
            process.exit(0);
        }
    }

    // --- read-tree ---
    if (subcommand === "read-tree") {
        // Without -u this only rewrites the index. With it, git updates the
        // working tree too, which can discard uncommitted changes the way
        // `reset --hard` does.
        if (hasFlag(normalized, "-u")) {
            console.log(
                JSON.stringify(
                    ask(
                        `git read-tree -u requires user approval — it updates the working tree and can discard uncommitted changes.`,
                    ),
                ),
            );
            process.exit(0);
        }
    }

    // --- update-ref / symbolic-ref ---
    if (subcommand === "update-ref" || subcommand === "symbolic-ref") {
        // Pointing a ref somewhere new is recoverable through the reflog;
        // deleting it leaves nothing to recover from.
        if (hasFlag(normalized, "-d") || hasFlag(normalized, "--delete")) {
            console.log(
                JSON.stringify(
                    ask(
                        `git ${subcommand} -d requires user approval — deleting a ref is a destructive operation.`,
                    ),
                ),
            );
            process.exit(0);
        }
        // The gate below reads the ref name as written, so a name the shell
        // assembles is not a name this hook can check — the same position a
        // push is in when its refspecs are still unexpanded, and it asks for
        // the same reason. A prefix survives an expansion in the tail
        // (`"refs/remotes/origin/$b"` still matches), so what this covers is a
        // ref name whose own beginning is computed.
        if (unreadable) {
            console.log(
                JSON.stringify(
                    ask(
                        `git ${subcommand} requires user approval — its ref name cannot be read before the shell expands it, so a write under refs/remotes/ cannot be ruled out.`,
                    ),
                ),
            );
            process.exit(0);
        }
        // `branch`, `tag` and `reset` — the commands this subcommand is
        // allowlisted alongside — cannot write under refs/remotes/. update-ref
        // can, and an expectation-less `--force-with-lease` compares against
        // exactly that ref, so moving it forges the lease the push checks.
        if (restRaw.some((t) => /^refs\/remotes\//.test(t))) {
            console.log(
                JSON.stringify(
                    ask(
                        `git ${subcommand} under refs/remotes/ requires user approval — it rewrites what the remote is believed to hold, which is what --force-with-lease checks against.`,
                    ),
                ),
            );
            process.exit(0);
        }
        // `git update-ref --stdin` takes `delete <ref>` directives on standard
        // input, where the hook has nothing to inspect — the same position as
        // a push whose refspecs the shell has not expanded yet.
        if (hasFlag(normalized, "--stdin")) {
            console.log(
                JSON.stringify(
                    ask(
                        `git ${subcommand} --stdin requires user approval — its directives arrive on standard input, where they cannot be checked for deletions.`,
                    ),
                ),
            );
            process.exit(0);
        }
    }

    // --- branch ---
    if (subcommand === "branch") {
        if (hasFlag(normalized, "--force-delete")) {
            console.log(
                JSON.stringify(
                    ask(
                        `git branch -D requires user approval — force-deleting a branch is a destructive operation. Use -d for a safe delete.`,
                    ),
                ),
            );
            process.exit(0);
        }
    }

    // --- reset ---
    if (subcommand === "reset") {
        if (hasFlag(normalized, "--hard")) {
            console.log(
                JSON.stringify(
                    ask(
                        `git reset --hard requires user approval — discarding uncommitted changes is a destructive operation.`,
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
            if (hasFlag(normalized, flag)) {
                console.log(
                    JSON.stringify(
                        ask(
                            `git config ${flag} requires user approval — modifying global/system config is a sensitive operation.`,
                        ),
                    ),
                );
                process.exit(0);
            }
        }
    }

    // --- clean ---
    if (subcommand === "clean") {
        if (hasFlag(normalized, "--force")) {
            console.log(
                JSON.stringify(
                    ask(
                        `git clean -f requires user approval — permanently deleting untracked files is a destructive operation.`,
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
