#!/usr/bin/env node
/**
 * PreToolUse hook to filter gh CLI commands and API routes.
 * Allows reads, and the writes that are already reachable through an approved
 * command; denies dangerous write/delete operations. For `gh api`, validates
 * the path against an allowlist and refuses any method beyond GET/POST/PATCH.
 *
 * Same scope limit as git-filter: this runs only on commands that *start* with
 * `gh`, so `cd . && gh api …` never reaches it. It is not a boundary against
 * someone choosing how to spell a command; it is for judging an agent's own
 * ordinary output correctly, in both directions — a misread that asks is a
 * prompt nobody needed, and a misread that allows is a gate that silently did
 * not run.
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

if (harness !== "cursor" && toolName !== "Bash") {
    console.log(JSON.stringify(allow()));
    process.exit(0);
}

// Only process commands that contain a `gh` invocation
if (!/^\s*gh\b/.test(command)) {
    console.log(JSON.stringify(allow()));
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
    "pr create",
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
    // Downloads a completed run's artifacts (e.g. a Playwright report) to a
    // local directory. Read-only against GitHub's API — already in pi's own
    // DEFAULT_GH_ALLOW (github-broker-gh-ops.mjs), though pi's path unzips
    // through a shim that sanitizes hostile entries, while this `gh`
    // module hands the zip to the real `gh` binary; extraction hardening
    // there isn't verified here.
    "run download",
    "workflow view",
    "workflow list",
    // Read-only search across repos, issues, PRs, commits, code and users.
    // The equivalent `gh api search/*` paths are already auto-approved below,
    // so gating the porcelain only pushed callers toward the raw API.
    "search",
    // Read-only listings.
    "cache list",
    "extension list",
    "stack view",
    // PR plumbing that reaches no further than the already-approved `pr edit`:
    // stack link/unstack rewrite base branches, `pr ready` clears draft status.
    "stack link",
    "stack unstack",
    "pr ready",
    // Re-runs an existing workflow run. Spends Actions minutes; destroys nothing.
    "run rerun",
    // GitHub Agentic Workflows extension (gh-aw) — allow all subcommands
    "aw",
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

    // Replying to an existing PR review comment. `gh pr comment`, `gh pr review`
    // and POST to .../pulls/N/comments are already auto-approved, so this adds
    // no reach beyond what the allowlist already grants.
    /^repos\/[^/]+\/[^/]+\/pulls\/\d+\/comments\/\d+\/replies$/,
    // Issue and PR assignees — `gh issue edit --add-assignee` covers the same ground
    /^repos\/[^/]+\/[^/]+\/issues\/\d+\/assignees$/,
    // Compare commits
    /^repos\/[^/]+\/[^/]+\/compare\/.+$/,
    // Releases
    /^repos\/[^/]+\/[^/]+\/releases$/,
    /^repos\/[^/]+\/[^/]+\/releases\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/releases\/latest$/,
    /^repos\/[^/]+\/[^/]+\/releases\/tags\/[^/?]+$/,
    // Check runs and suites
    /^repos\/[^/]+\/[^/]+\/check-runs\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/check-suites\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/check-suites\/\d+\/check-runs$/,
    // Current user and user profiles
    /^user$/,
    /^users\/[^/?]+$/,

    // Search (read-only)
    /^search\/(repositories|issues|commits|code|users)(\?.*)?$/,
];

// Paths auto-approved for GET only. Some have a write verb GitHub serves as
// POST or PATCH — both of which `validateApiCommand` otherwise permits — so
// listing them in the method-blind tier would hand out the write with the read.
// The rest have no POST or PATCH today (DELETE, where GitHub serves one, is
// refused for every path), and keeping the whole group in one tier means a
// POST or PATCH added to any of them later is refused rather than newly
// allowed.
const GET_ONLY_API_PATHS = [
    // Git trees — a read-only object listing; POST to the collection creates one
    /^repos\/[^/]+\/[^/]+\/git\/trees\/[^/?]+$/,
    // Teams — PATCH edits the team, so reads only
    /^orgs\/[^/?]+\/teams\/[^/?]+$/,
    /^orgs\/[^/?]+\/teams\/[^/?]+\/(members|repos|memberships\/[^/?]+)$/,
    /^teams\/\d+$/,
    // GitHub Actions reads: workflows, runs, jobs, logs and artifacts. GitHub
    // serves no POST or PATCH on any of these today; they are here so that one
    // added later is refused rather than newly allowed. A workflow is addressed
    // by numeric id or by file name (`review.lock.yml`); `[^/?]+` takes both,
    // and the file-name form is what agents reach for when checking CI.
    /^repos\/[^/]+\/[^/]+\/actions\/workflows$/,
    /^repos\/[^/]+\/[^/]+\/actions\/workflows\/[^/?]+$/,
    /^repos\/[^/]+\/[^/]+\/actions\/workflows\/[^/?]+\/runs$/,
    /^repos\/[^/]+\/[^/]+\/actions\/runs$/,
    /^repos\/[^/]+\/[^/]+\/actions\/runs\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/actions\/runs\/\d+\/jobs$/,
    /^repos\/[^/]+\/[^/]+\/actions\/runs\/\d+\/logs$/,
    /^repos\/[^/]+\/[^/]+\/actions\/runs\/\d+\/artifacts$/,
    /^repos\/[^/]+\/[^/]+\/actions\/jobs\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/actions\/jobs\/\d+\/logs$/,
    /^repos\/[^/]+\/[^/]+\/actions\/artifacts$/,
    /^repos\/[^/]+\/[^/]+\/actions\/artifacts\/\d+$/,
    // Actions cache usage (read-only accounting)
    /^repos\/[^/]+\/[^/]+\/actions\/cache\/usage$/,
    // Rate limit (read-only, no repo data)
    /^rate_limit$/,
    // GitHub's published network metadata (IP ranges, allowlist domains for
    // Actions/Codespaces/etc.) — public, unauthenticated, no repo data. This
    // is what verifies/refreshes this module's enumerated artifact-storage
    // host list, below. Reaches claude, codex, and cursor; pi's own broker
    // route table (API_ROUTES in github-broker-gh-ops.mjs) has no `meta`
    // entry, and growing that table is its own reviewed change — so
    // refreshing the list from pi isn't possible today, only from the
    // other three.
    /^meta$/,
    // Git refs: reads list or resolve a ref, but PATCH to the same path moves
    // it — a force-update of a remote branch, which is the operation
    // `git push --force` asks about. Both spellings: `git/refs/…` and the
    // singular `git/ref/…`.
    /^repos\/[^/]+\/[^/]+\/git\/refs?(\/.*)?$/,
    // The repository itself: PATCH is the API spelling of `gh repo archive`
    // and of renaming or changing visibility, all of which ask as commands.
    /^repos\/[^/]+\/[^/?]+$/,
    // The organisation, and its collections. PATCH on the org rewrites
    // org-wide settings including the default permission new repositories get;
    // POST to `orgs/{org}/repos` creates a repository and to
    // `orgs/{org}/teams` a team. Reads of all of them are ordinary.
    /^orgs\/[^/?]+(\/[^/?]+)?$/,
    // Branch protection and repository rulesets. POST creates a ruleset and
    // PATCH updates one, which would let a caller take down the rules that
    // decide what may merge.
    /^repos\/[^/]+\/[^/]+\/rulesets$/,
    /^repos\/[^/]+\/[^/]+\/rulesets\/\d+$/,
    /^repos\/[^/]+\/[^/]+\/rules\/branches\/[^/?]+$/,
    /^repos\/[^/]+\/[^/]+\/branches\/[^/?]+\/protection$/,
];

// GraphQL mutations that are auto-approved, by root field name. A document with
// no mutation operation is always allowed — queries need no entry here.
//
// To auto-approve another mutation, add its root field name. The bar is the one
// the REST allowlist already sets: the mutation must reach no further than a
// command that is auto-approved today.
const ALLOWED_GRAPHQL_MUTATIONS = new Set([
    // Resolving a PR review conversation.
    "resolveReviewThread",
    "unresolveReviewThread",
    // Leaving a comment. `gh pr comment`, `gh issue comment` and `gh pr review`
    // are all auto-approved, as is POST to .../pulls/N/comments.
    "addComment",
    "addDiscussionComment",
    "addPullRequestReview",
    "addPullRequestReviewComment",
    "addPullRequestReviewThreadReply",
]);

/**
 * Remove comments and string literals from a GraphQL document.
 *
 * Both can hold braces and keywords that would derail the structural scan in
 * `parseGraphqlOperations`.
 *
 * @param doc The raw GraphQL document.
 * @returns The document with literals blanked, or null if a literal is unterminated.
 */
function stripGraphqlLiterals(doc) {
    let out = "";
    let i = 0;
    while (i < doc.length) {
        if (doc[i] === "#") {
            while (i < doc.length && doc[i] !== "\n") i++;
            continue;
        }
        if (doc.startsWith('"""', i)) {
            const end = doc.indexOf('"""', i + 3);
            if (end === -1) return null;
            out += '""';
            i = end + 3;
            continue;
        }
        if (doc[i] === '"') {
            i++;
            while (i < doc.length && doc[i] !== '"') {
                if (doc[i] === "\\") i++;
                i++;
            }
            if (i >= doc.length) return null;
            out += '""';
            i++;
            continue;
        }
        out += doc[i];
        i++;
    }
    return out;
}

/**
 * Identify the top-level operations in a GraphQL document.
 *
 * This is a structural scan, not a real parser: it tracks brace and paren depth
 * to find each operation's type and the field names directly inside its
 * selection set. It is deliberately fail-closed — anything it cannot read
 * confidently returns null so the caller asks.
 *
 * @param doc The raw GraphQL document.
 * @returns One `{type, rootFields}` per top-level operation, or null if the
 *   document could not be read.
 */
function parseGraphqlOperations(doc) {
    const src = stripGraphqlLiterals(doc);
    if (src === null) return null;

    const ops = [];
    let depth = 0;
    let parenDepth = 0;
    let pendingKeyword = null;
    let current = null;
    let i = 0;

    while (i < src.length) {
        const ch = src[i];
        if (ch === "(") {
            parenDepth++;
            i++;
            continue;
        }
        if (ch === ")") {
            parenDepth--;
            if (parenDepth < 0) return null;
            i++;
            continue;
        }
        if (ch === "{") {
            depth++;
            // A selection set opened inside parens is a default value, not an
            // operation body.
            if (depth === 1 && parenDepth === 0) {
                // A bare `{ ... }` with no keyword is an anonymous query.
                current = {
                    type: pendingKeyword ?? "query",
                    rootFields: [],
                    uncountedFields: false,
                };
                pendingKeyword = null;
            }
            i++;
            continue;
        }
        if (ch === "}") {
            depth--;
            if (depth < 0) return null;
            if (depth === 0 && current) {
                ops.push(current);
                current = null;
            }
            i++;
            continue;
        }
        const word = /^[A-Za-z_][A-Za-z0-9_]*/.exec(src.slice(i));
        if (!word) {
            i++;
            continue;
        }
        const w = word[0];
        if (depth === 0 && parenDepth === 0) {
            // First keyword wins. GraphQL puts the operation *name* in the
            // position right after the type and reserves nothing, so
            // `mutation query { … }` is a mutation named "query" — and taking
            // the last keyword recorded it as a query, which the mutation
            // check skips entirely. `pendingKeyword` is cleared when the
            // selection set opens, so the next operation starts fresh.
            if (
                pendingKeyword === null &&
                ["query", "mutation", "subscription", "fragment"].includes(w)
            ) {
                pendingKeyword = w;
            }
        } else if (depth === 1 && parenDepth === 0 && current) {
            // A root selection is an identifier followed by arguments or a
            // sub-selection. An alias (`short: realField`) is followed by `:`,
            // so skipping those lands on the real field name.
            const after = /^\s*([(:{])/.exec(src.slice(i + w.length));
            if (after && after[1] !== ":") current.rootFields.push(w);
            // A field with neither arguments nor a sub-selection is a scalar
            // selection this scan cannot name. On its own it lands on the
            // "could not identify the root field" ask; beside a counted field
            // it used to vanish, and the document was approved on the strength
            // of its companion.
            else if (!after) current.uncountedFields = true;
        }
        i += w.length;
    }
    if (depth !== 0 || parenDepth !== 0) return null;
    return ops;
}

/**
 * Report whether a document uses fragments in any form.
 *
 * Both spellings move fields out of the root selection set `parseGraphqlOperations`
 * reads. A named spread (`...F`) contributes no root field, because the scan
 * counts a word only when a `(` or `{` follows it — and the `fragment F on
 * Mutation { … }` definition that supplies the fields is recorded as its own
 * operation, which the mutation check skips. An inline fragment
 * (`... on X { … }`) buries its fields one level deeper than the scan looks.
 * Either way the fields a mutation actually selects are not the ones counted,
 * so a mutation that uses them is past what this structural scan can judge.
 *
 * @param src The GraphQL document, string literals already blanked.
 * @returns True when a spread or a fragment definition is present.
 */
function usesFragments(src) {
    return /\.\.\.|\bfragment\b/.test(src);
}

/**
 * Validate the document behind `gh api graphql`.
 *
 * The path alone says nothing: the same endpoint serves reads and writes. Every
 * query is allowed; a mutation is allowed only when every root field it selects
 * is in ALLOWED_GRAPHQL_MUTATIONS.
 *
 * @param queryDoc The value of the `query` field, or undefined if absent.
 * @returns null if allowed, otherwise the reason to ask.
 */
function validateGraphqlCommand(queryDoc) {
    if (queryDoc === undefined) {
        return `gh api graphql: no query field found — requires user approval.`;
    }
    if (queryDoc.startsWith("@")) {
        return `gh api graphql: a query read from a file requires user approval.`;
    }
    const ops = parseGraphqlOperations(queryDoc);
    if (!ops || ops.length === 0) {
        return `gh api graphql: could not parse the GraphQL document — requires user approval.`;
    }
    // Fragments only matter where a mutation is in play: a query is allowed
    // whatever it selects, so a query-only document may spread as it likes. A
    // `fragment … on Mutation` counts as a mutation even with no `mutation`
    // operation in sight, since that is the half of the attack that carries the
    // fields.
    const stripped = stripGraphqlLiterals(queryDoc) ?? "";
    const mutates =
        ops.some((op) => op.type === "mutation") ||
        /\bfragment\s+[A-Za-z_]\w*\s+on\s+Mutation\b/.test(stripped);
    if (mutates && usesFragments(stripped)) {
        return `gh api graphql: a mutation using fragments requires user approval — the fields it selects are not the ones this check can read.`;
    }
    for (const op of ops) {
        if (op.type === "subscription") {
            return `gh api graphql: subscriptions require user approval.`;
        }
        if (op.type !== "mutation") continue;
        if (op.rootFields.length === 0 || op.uncountedFields) {
            return `gh api graphql: could not identify every root field of the mutation — requires user approval.`;
        }
        for (const field of op.rootFields) {
            if (!ALLOWED_GRAPHQL_MUTATIONS.has(field)) {
                return (
                    `gh api graphql: mutation "${field}" requires user approval — not in the auto-approved mutation list.\n\n` +
                    `Auto-approved mutations: ${[...ALLOWED_GRAPHQL_MUTATIONS].sort().join(", ")}`
                );
            }
        }
    }
    return null;
}

/**
 * Split a string into the words the shell would hand `gh`.
 *
 * git-filter's `tokenize` is the same scan over the same rules; the two hooks
 * name their twin helpers alike so a fix to one is findable from the other.
 *
 * A character scan rather than a regex, for the reason `maskQuoted` below is
 * one: a regex cannot tell `\\'` from `'`, and these tokens are what the
 * method, path and field checks read. The shell's rules — a backslash escapes
 * the next character, single quotes protect their contents whole, double
 * quotes honour backslash escapes inside — so a multi-line GraphQL document
 * inside quotes stays one token, newlines and all.
 *
 * A quote left open is reported rather than guessed at: absorbing the
 * remainder into one token would hide whatever follows from the checks.
 *
 * @param str The argument string.
 * @returns `tokens`, as gh would receive them, and `unterminated` when a quote
 *   was still open at the end.
 */
function tokenize(str) {
    const tokens = [];
    let current = "";
    let started = false;
    let unterminated = false;
    let i = 0;
    while (i < str.length) {
        const ch = str[i];
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
        if (ch === "\\" && i + 1 < str.length) {
            current += str[i + 1];
            i += 2;
            continue;
        }
        if (ch === "'" || ch === '"') {
            let j = i + 1;
            while (j < str.length && str[j] !== ch) {
                // Only double quotes honour backslash escapes inside.
                if (ch === '"' && str[j] === "\\" && j + 1 < str.length) {
                    current += str[j + 1];
                    j += 2;
                    continue;
                }
                current += str[j];
                j++;
            }
            if (j >= str.length) unterminated = true;
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
 * Parse flags and positional args from a gh command string.
 * Returns { flags, positional, fields } where flags is a Map of flag→value and
 * fields collects every `-f`/`-F` value (a Map keeps only the last one, and
 * `gh api graphql` routinely passes several).
 */
function parseGhArgs(argsStr) {
    // Split the way the shell would, so the quotes it strips are gone and the
    // escapes it applies are applied. Without the first, the API path keeps its
    // literal quote characters, no ALLOWED_API_PATHS pattern can match, and
    // `gh api "repos/o/r/issues/1/events"` prompts while the same call unquoted
    // is auto-approved. Without the second, an escaped apostrophe pairs with the
    // next ordinary one and swallows what lies between — which is how
    // `-X DELETE` disappeared from the method check.
    const { tokens } = tokenize(argsStr);
    const flagsWithValues = new Set([
        "-X",
        "--method",
        "-H",
        "--header",
        // gh pairs these as `-F, --field` and `-f, --raw-field`; listed in that
        // order so the set cannot be misread as leaving `-f` out.
        "-F",
        "--field",
        "-f",
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
        // An unlisted flag is recorded as a boolean and its value falls through
        // to the positionals, so `gh api --preview user repos/o/r/…` read
        // `user` as the endpoint — matching the allowlist — while gh sent the
        // path that was never checked.
        "-p",
        "--preview",
    ]);
    const fieldFlags = new Set(["-F", "--field", "-f", "--raw-field"]);
    const flags = new Map();
    // gh's flag parser takes the last of `-X`/`--method`, so the order they
    // appear in matters and a per-name Map cannot answer it.
    let lastMethod;
    const positional = [];
    const fields = [];

    /**
     * Split a flag token into the flags it spells and any attached value.
     *
     * gh accepts `-X DELETE`, `--method=DELETE`, `-X=DELETE` and `-XDELETE`.
     * Matching the token exactly recognises only the first, so the other three
     * used to land in `flags` as booleans and the method silently read as GET.
     *
     * gh is pflag-based, so short flags also arrive in groups: pflag walks a
     * group letter by letter and lets the first value-taking letter swallow the
     * rest. Reading only the first two characters recorded `-iXDELETE` as the
     * single boolean `-i`, so the method went unread, defaulted to GET, and a
     * DELETE on a GET-only path was auto-approved.
     *
     * @param tok The token to split.
     * @returns One `{name, attached}` per flag the token spells, in order.
     *   `attached` is null when the value is a separate token, which only the
     *   last entry can be.
     */
    const splitFlag = (tok) => {
        if (tok.startsWith("--")) {
            const eq = tok.indexOf("=");
            if (eq > 0) return [{ name: tok.slice(0, eq), attached: tok.slice(eq + 1) }];
            return [{ name: tok, attached: null }];
        }
        const out = [];
        for (let c = 1; c < tok.length; c++) {
            const name = `-${tok[c]}`;
            const rest = tok.slice(c + 1);
            if (!flagsWithValues.has(name)) {
                out.push({ name, attached: null });
                continue;
            }
            // pflag strips one leading `=` and takes the remainder verbatim, so
            // a field value keeps an `=` of its own: `-fquery=mutation{…}`.
            out.push({ name, attached: rest === "" ? null : rest.replace(/^=/, "") });
            return out;
        }
        // A bare `-` spells no flags; record the token itself, as before.
        return out.length > 0 ? out : [{ name: tok, attached: null }];
    };

    let i = 0;
    while (i < tokens.length) {
        const tok = tokens[i];
        if (tok.startsWith("-")) {
            let consumesNext = false;
            for (const { name, attached } of splitFlag(tok)) {
                if (!flagsWithValues.has(name)) {
                    flags.set(name, true);
                    continue;
                }
                const value = attached ?? tokens[i + 1] ?? "";
                flags.set(name, value);
                if (name === "-X" || name === "--method") lastMethod = value;
                if (fieldFlags.has(name)) fields.push(value);
                if (attached === null) consumesNext = true;
            }
            i += consumesNext ? 2 : 1;
        } else {
            positional.push(tok);
            i++;
        }
    }
    return { flags, positional, fields, lastMethod };
}

/**
 * Validate a `gh api` invocation.
 * Returns null if valid, or an error string if invalid.
 */
function validateApiCommand(argsStr, expandsWhenRun = false) {
    const { flags, positional, fields, lastMethod } = parseGhArgs(argsStr);

    // Determine the HTTP method. gh's own help: "The default HTTP request
    // method is GET normally and POST if any parameters were added." Reading an
    // unflagged call as GET let `gh api .../rulesets -f name=x` — a ruleset
    // create — past the read-only tier that exists to stop exactly that.
    // `fields` already holds every `-f`/`-F`/`--field`/`--raw-field` value, so
    // naming two of those flags again here decided nothing.
    const sendsParameters = fields.length > 0 || flags.has("--input");
    // `-X` and `--method` are two spellings of one flag and gh's parser takes
    // whichever was written last, so preferring `-X` let
    // `-X GET --method DELETE` read as a GET while gh sent the DELETE.
    const explicitMethod = lastMethod;
    const method = (explicitMethod || (sendsParameters ? "POST" : "GET")).toUpperCase();
    // Masking runs before the invocation pattern, so a quoted `$` leaves no
    // boundary character to stop at and `gh api "repos/$O/$R" -X PATCH` read as
    // a literal path — while the unquoted spelling asked. Only the path and the
    // method are read by the checks below, so only an expansion in those two
    // makes a verdict a guess; one inside a `-f` value changes nothing here.
    if (/[$`]/.test(positional[0] ?? "") || /[$`]/.test(explicitMethod ?? "")) {
        return `gh api with a shell-expanded argument requires user approval — the path cannot be read before the shell expands it.`;
    }
    if (!["GET", "POST", "PATCH"].includes(method)) {
        return `gh api: HTTP method '${method}' requires user approval. Only GET, POST, and PATCH are auto-approved.`;
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

    // The GraphQL endpoint is one path for both reads and writes, so the
    // document decides, not the path.
    if (normalizedPath === "graphql") {
        // `--input` sends the request body from a file or from standard input,
        // and the mutation gate below reads only `-f`/`-F` fields — so a decoy
        // `-f query=<benign>` beside `--input evil.json` had the hook judge a
        // document gh was not going to send. Nothing here can close that by
        // reading the file: `--input -` is a pipe, and a file's contents can
        // change between this check and the request.
        if (flags.has("--input")) {
            return `gh api graphql --input requires user approval — the document is sent from a file or standard input, so it is not the document this check can read.`;
        }
        // Every `query=` field, not just the first: gh sends one value per key,
        // so validating only `fields.find(...)` let a second `-f query=` carry
        // a document the hook never looked at.
        const queryFields = fields.filter((f) => f.startsWith("query="));
        // For `graphql` the query field is the whole artifact the mutation
        // gate judges, so a `$` the shell will expand inside it means the
        // document being judged is not the document gh will send. That is the
        // opposite of a REST `-f` value, which is payload nothing here reads.
        if (expandsWhenRun) {
            return `gh api graphql: the query is assembled by the shell, so the document this would send cannot be read — requires user approval.`;
        }
        if (queryFields.length === 0) return validateGraphqlCommand(undefined);
        for (const field of queryFields) {
            const err = validateGraphqlCommand(field.slice("query=".length));
            if (err) return err;
        }
        return null;
    }

    if (ALLOWED_API_PATHS.some((pattern) => pattern.test(normalizedPath))) return null;

    // Paths that are only auto-approved for reads. The allowlist above ignores
    // method, and POST and PATCH are permitted, so a path whose write verb is
    // POST or PATCH cannot go there: `PATCH .../rulesets/{id}` would take down
    // the branch protection on the repository itself.
    if (GET_ONLY_API_PATHS.some((pattern) => pattern.test(normalizedPath))) {
        if (method === "GET") return null;
        return `gh api: ${method} on "${apiPath}" requires user approval — this path is auto-approved for reads only.`;
    }

    return `gh api: path "${apiPath}" requires user approval — not in the auto-approved API paths list.`;
}

// Replace $(cat <<'WORD'\n...\nWORD\n) with a placeholder so the invocation
// regex sees a clean single-line argument. Only the normalized copy is used
// for parsing; gh-filter has no rewrite step so the original is not needed.
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
 * Replace quoted runs with placeholders so the invocation regex below sees a
 * clean argument list.
 *
 * That regex stops at `{`, `(`, `$` and newlines, which a quoted argument may
 * contain — a GraphQL document contains all four. Without masking,
 * `gh api graphql -f query='mutation { ... }'` is truncated at the first brace
 * and the document never reaches validateGraphqlCommand.
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
        // gh invocation from the parse, and a deleted invocation is never
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
                // Unterminated: stop masking and leave the remainder raw, so
                // later invocations stay visible rather than disappearing.
                masked += cmd.slice(i);
                break;
            }
            store.push(cmd.slice(i, j + 1));
            masked += `__GHQUOTED${store.length - 1}__`;
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
    return str.replace(/__GHQUOTED(\d+)__/g, (_, index) => store[Number(index)] ?? "");
}

// A `\`-newline is a line continuation: the shell joins the lines before gh
// ever sees them. Without this the invocation stops at the backslash, `next`
// is the newline — a clean ending — and the arguments on the following line
// are judged as if they were not there: `gh api <path> \` / `-X DELETE` read
// as a bare GET. git-filter has had this since its own sixth round.
const commandForMasking = stripHeredocs(command).replace(/\\\n/g, " ");

const { masked: commandForParsing, store: quotedLiterals } = maskQuoted(commandForMasking);

// Extract every gh invocation from the command. Compound commands joined
// by &&, ||, ;, or pipes contain multiple invocations and each one needs to
// be validated — using a single-match regex would let later invocations slip
// past whatever check the first invocation passes.
const ghInvocationPattern = /\bgh\s+((?:[^\n;|&`$(){}<>]|\\.)+?)(?=\s*[;&|`$(){}<>\n]|$)/g;
// Characters that end an invocation without truncating its arguments: a command
// separator, a redirect, or end of input. Anything else — `$`, a backtick, `(`,
// `{` — means the shell expands something the pattern could not read, so the
// arguments seen here are a prefix of what gh actually receives.
const CLEAN_INVOCATION_ENDINGS = new Set([";", "&", "|", "\n", ">", undefined]);

/**
 * Report whether a quoted literal is one the shell will expand.
 *
 * git-filter's twin of this guard: single quotes pass their contents through,
 * so `'$X'` reaches gh as those two characters, while a double-quoted run
 * holding `$` or a backtick does not. The distinction is why this has to be
 * asked of the literal rather than of the parsed value — a GraphQL document
 * is full of `$variable`, and almost all of them are single-quoted.
 *
 * @param literal A quoted run, quote characters included.
 * @returns True when running the command changes what gh receives.
 */
function shellWillExpand(literal) {
    if (!literal.startsWith('"')) return false;
    // `stripHeredocs` has already taken the `$(` off a heredoc substitution, so
    // the character test alone cannot see one.
    return /[$`]/.test(literal) || literal.includes(HEREDOC_PLACEHOLDER);
}

const invocations = Array.from(commandForParsing.matchAll(ghInvocationPattern), (m) => {
    let text = m[1].trim();
    // `[ \t]*` and `[\s\S]`, not `\s*(.)`: `.` never matches a newline, so a
    // greedy `\s*` would step over it to the next line's first character and
    // `"\n"` in CLEAN_INVOCATION_ENDINGS could never be seen — marking every
    // non-final invocation of a multi-line command truncated, which false-asks
    // the ordinary two-line shape (`gh api …` / `echo done`).
    const next = commandForParsing.slice(m.index + m[0].length).match(/^[ \t]*([\s\S])/)?.[1];
    // The pattern stops before `>`, which leaves a redirect's file descriptor
    // attached to the invocation (`gh api path 2>&1` ends as `api path 2`).
    // Only strip it when a `>` really does follow.
    if (next === ">") text = text.replace(/\s+\d+$/, "");
    // Kept separate from `truncated`: an expansion the shell will perform makes
    // the *text* of an argument a guess, which matters where a check reads that
    // text whole — the GraphQL document — and not where it reads a field gh
    // will send as payload.
    // An unquoted heredoc substitution is masked by nothing, so it leaves no
    // literal to ask `shellWillExpand` about — the placeholder sits in the
    // invocation text itself.
    const expandsWhenRun =
        text.includes(HEREDOC_PLACEHOLDER) ||
        Array.from(text.matchAll(/__GHQUOTED(\d+)__/g)).some((q) =>
            shellWillExpand(quotedLiterals[Number(q[1])] ?? ""),
        );
    return {
        text: unmaskQuoted(text, quotedLiterals),
        truncated: !CLEAN_INVOCATION_ENDINGS.has(next),
        expandsWhenRun,
    };
});

// If we couldn't parse any invocations but gh is present, ask to be safe
if (invocations.length === 0) {
    console.log(
        JSON.stringify(
            ask(
                `Could not parse gh command: "${command}". Unparseable commands require user approval.`,
            ),
        ),
    );
    process.exit(0);
}

for (const { text: invocation, truncated, expandsWhenRun } of invocations) {
    // Get the subcommand (first 1-2 tokens)
    const tokens = invocation.split(/\s+/);
    const sub1 = tokens[0] ?? "";
    const sub2 = tokens[1] ?? "";
    const twoWord = `${sub1} ${sub2}`.trim();
    const oneWord = sub1;

    // Check sensitive commands (two-word first, then one-word)
    if (BLOCKED_COMMANDS.includes(twoWord)) {
        console.log(
            JSON.stringify(
                ask(`gh ${twoWord} requires user approval — this is a sensitive operation.`),
            ),
        );
        process.exit(0);
    }
    if (BLOCKED_COMMANDS.includes(oneWord)) {
        console.log(JSON.stringify(ask(`gh ${oneWord} requires user approval.`)));
        process.exit(0);
    }

    // Handle `gh api` specially
    if (oneWord === "api") {
        // A shell expansion inside the path leaves only a prefix here, and a
        // prefix can match an allowlisted pattern while gh is sent something
        // else entirely: `repos/o/r$X/rulesets/1` is judged as `repos/o/r`.
        if (truncated || tokenize(invocation).unterminated) {
            console.log(
                JSON.stringify(
                    ask(
                        `gh api with a shell-expanded argument requires user approval — the path cannot be read before the shell expands it.`,
                    ),
                ),
            );
            process.exit(0);
        }
        // Slice the original text rather than rejoining tokens: a split on
        // whitespace followed by a join on " " turns every newline inside a
        // quoted GraphQL document into a space, and `stripGraphqlLiterals`
        // ends a `#` comment at a newline — so a comment would swallow the
        // rest of the document the hook validates while gh still sent the
        // original text.
        const restArgs = invocation.replace(/^api\s+/, "");
        const err = validateApiCommand(restArgs, expandsWhenRun);
        if (err) {
            console.log(JSON.stringify(ask(err)));
            process.exit(0);
        }
        continue;
    }

    // Check allowed (two-word first, then one-word)
    if (ALLOWED_COMMANDS.includes(twoWord) || ALLOWED_COMMANDS.includes(oneWord)) {
        continue;
    }

    // Not in allowlist — ask for approval
    const allowedList = ALLOWED_COMMANDS.join(", ");
    console.log(
        JSON.stringify(
            ask(
                `gh ${twoWord} requires user approval — not in the auto-approved command list.\n\n` +
                    `Auto-approved commands: ${allowedList}`,
            ),
        ),
    );
    process.exit(0);
}

console.log(JSON.stringify(allow()));
process.exit(0);
