#!/usr/bin/env -S node -r @swc-node/register
/**
 * Scan all workflow and action YAML files for GitHub Action references and
 * ensure they are pinned to commit SHAs. Handles two cases:
 *   1. Already pinned (`uses: owner/repo@<sha> # <tag>`) — updates stale SHAs
 *   2. Unpinned (`uses: owner/repo@<tag>`) — replaces with `@<sha> # <tag>`
 *
 * Usage: node utils/update-pinned-actions.ts
 */
import {execSync} from "node:child_process";
import fs from "node:fs";

import fg from "fast-glob";

// Matches already-pinned: `uses: owner/repo@<sha> # <tag>`
// - Lookbehind ensures no `#` before `uses:` on the same line (skips YAML comments)
// - Supports optional quotes: `uses: "owner/repo@<sha>" # <tag>`
// - Uses [^\S\n]+ instead of \s+ to prevent matching across lines
// Named groups: action, sha, quote, ref
const PINNED_RE =
    /(?<=^[^#\n]*uses:\s+"?)(?<action>[^@\s"]+)@(?<sha>[a-f0-9]{40})(?<quote>"?)[^\S\n]+#[^\S\n]*(?<ref>\S+)/gm;

// Matches pinned-without-tag: `uses: owner/repo@<sha>` (no `# <tag>` comment)
// Used only for collecting action names, not for updates.
// Named groups: action
const PINNED_NO_TAG_RE =
    /(?<=^[^#\n]*uses:\s+"?)(?<action>[^\s@"]+\/[^\s@"]+)@[a-f0-9]{40}"?\s*$/gm;

// Matches unpinned: `uses: owner/repo@<tag>` (where tag is NOT a 40-char hex SHA)
// - Excludes local actions (starting with ./)
// - Lookbehind ensures no `#` before `uses:` on the same line (skips YAML comments)
// - Supports optional quotes: `uses: "owner/repo@<tag>"`
// - Action name uses [^\s@"] to avoid capturing quotes
// Named groups: action, ref, quote
const UNPINNED_RE =
    /(?<=^[^#\n]*uses:\s+"?)(?<action>[^\s@"]+\/[^\s@"]+)@(?!(?:[a-f0-9]{40})(?:\s|"))(?<ref>[^\s"]+)(?<quote>"?)/gm;

/**
 * Resolve a tag or branch to its commit SHA via git ls-remote.
 * For annotated tags the dereferenced (^{}) commit SHA is returned.
 */
const resolveRef = (action: string, ref: string): string | null => {
    // Extract just owner/repo (ignore sub-paths like /restore, /save)
    const repo = action.split("/").slice(0, 2).join("/");
    const url = `https://github.com/${repo}.git`;

    // Try tags first (covers both lightweight and annotated)
    const tagOutput = execSync(`git ls-remote --tags ${url} ${ref} ${ref}^{}`, {
        encoding: "utf-8",
    }).trim();

    if (tagOutput) {
        const lines = tagOutput.split("\n");
        // If there's a ^{} line it's an annotated tag — use the deref SHA
        const deref = lines.find((l) => l.includes("^{}"));
        if (deref) {
            return deref.split(/\s+/)[0];
        }
        return lines[0].split(/\s+/)[0];
    }

    // Fall back to branches
    const branchOutput = execSync(`git ls-remote --heads ${url} ${ref}`, {
        encoding: "utf-8",
    }).trim();

    if (branchOutput) {
        console.warn(
            `  ⚠  ${action}@${ref} resolved via branch — consider pinning to a tag instead`,
        );
        return branchOutput.split(/\s+/)[0];
    }

    return null;
};

/**
 * Scan all YAML files and collect unique action+ref pairs to resolve,
 * plus all unique repo names (for the allowed-actions listing).
 */
export const collectActionRefs = (
    files: string[],
): {
    seen: Map<string, string | null>;
    allRepos: Set<string>;
} => {
    const seen = new Map<string, string | null>(); // key: "action@ref" → resolved SHA (filled later)
    const allRepos = new Set<string>(); // all unique owner/repo names (for listing)

    for (const file of files) {
        const content = fs.readFileSync(file, "utf-8");
        let m: RegExpExecArray | null;

        // Collect already-pinned refs
        PINNED_RE.lastIndex = 0;
        while ((m = PINNED_RE.exec(content)) !== null) {
            const {action, ref} = m.groups!;
            seen.set(`${action}@${ref}`, null);
            allRepos.add(action.split("/").slice(0, 2).join("/"));
        }

        // Collect pinned-without-tag refs (for listing only)
        PINNED_NO_TAG_RE.lastIndex = 0;
        while ((m = PINNED_NO_TAG_RE.exec(content)) !== null) {
            const {action} = m.groups!;
            allRepos.add(action.split("/").slice(0, 2).join("/"));
        }

        // Collect unpinned refs (tag/branch directly after @)
        UNPINNED_RE.lastIndex = 0;
        while ((m = UNPINNED_RE.exec(content)) !== null) {
            const {action, ref} = m.groups!;
            seen.set(`${action}@${ref}`, null);
            allRepos.add(action.split("/").slice(0, 2).join("/"));
        }
    }

    return {seen, allRepos};
};

/**
 * Resolve all action+ref pairs in `seen` to their commit SHAs.
 * Returns the number of failures.
 */
const resolveAllRefs = (seen: Map<string, string | null>): number => {
    let failures = 0;
    for (const key of seen.keys()) {
        const [action, ref] = key.split("@");
        console.log(`  Resolving ${action} @ ${ref}`);
        try {
            const sha = resolveRef(action, ref);
            if (!sha) {
                console.log(
                    `    ⚠  Could not resolve ref "${ref}" for ${action}`,
                );
                failures++;
            } else {
                seen.set(key, sha);
                console.log(`    → ${sha}`);
            }
        } catch (err: any) {
            console.log(
                `    ⚠  Error resolving ${action}@${ref}: ${err.message}`,
            );
            failures++;
        }
    }
    return failures;
};

/**
 * Update all YAML files in-place, replacing stale/unpinned refs with resolved SHAs.
 * Returns counts of updated files, updated refs, and already-current refs.
 */
const updateFiles = (
    files: string[],
    seen: Map<string, string | null>,
): {updatedFiles: number; updatedRefs: number; alreadyCurrent: number} => {
    let updatedFiles = 0;
    let updatedRefs = 0;
    let alreadyCurrent = 0;

    for (const file of files) {
        let content = fs.readFileSync(file, "utf-8");
        let fileChanged = false;

        // Update already-pinned refs with stale SHAs
        PINNED_RE.lastIndex = 0;
        content = content.replace(PINNED_RE, (match, ...args) => {
            const {
                action,
                sha: oldSha,
                quote,
                ref,
            } = args.at(-1) as {
                action: string;
                sha: string;
                quote: string;
                ref: string;
            };
            const newSha = seen.get(`${action}@${ref}`);
            if (!newSha || newSha === oldSha) {
                if (newSha === oldSha) {
                    alreadyCurrent++;
                }
                return match;
            }
            console.log(`  ${file}: ${action}@${ref}`);
            console.log(`    ${oldSha} → ${newSha}`);
            fileChanged = true;
            updatedRefs++;
            return `${action}@${newSha}${quote} # ${ref}`;
        });

        // Pin unpinned refs (tag/branch → sha # tag)
        UNPINNED_RE.lastIndex = 0;
        content = content.replace(UNPINNED_RE, (match, ...args) => {
            const {action, ref, quote} = args.at(-1) as {
                action: string;
                ref: string;
                quote: string;
            };
            const newSha = seen.get(`${action}@${ref}`);
            if (!newSha) {
                return match;
            }
            console.log(`  ${file}: ${action}@${ref} (unpinned)`);
            console.log(`    → ${newSha} # ${ref}`);
            fileChanged = true;
            updatedRefs++;
            return `${action}@${newSha}${quote} # ${ref}`;
        });

        if (fileChanged) {
            fs.writeFileSync(file, content);
            updatedFiles++;
        }
    }

    return {updatedFiles, updatedRefs, alreadyCurrent};
};

const main = () => {
    const files = fg.sync([
        ".github/workflows/*.yml",
        ".github/workflows/*.yaml",
        ".github/actions/**/*.yml",
        ".github/actions/**/*.yaml",
        "actions/**/action.yml",
        "actions/**/action.yaml",
    ]);

    const {seen, allRepos} = collectActionRefs(files);

    if (seen.size === 0) {
        console.log("No action references found.");
        process.exit(0);
    }

    // Print unique non-actions/* repos in alphabetical order
    const uniqueRepos = [...allRepos]
        .filter((repo) => !repo.startsWith("actions/"))
        .sort();
    console.group("Allowed actions:");
    for (const repo of uniqueRepos) {
        console.log(`${repo}@*,`);
    }
    console.groupEnd();
    console.log("");

    console.log(`Found ${seen.size} unique action reference(s). Resolving…\n`);
    const failures = resolveAllRefs(seen);
    console.log("");

    const {updatedFiles, updatedRefs, alreadyCurrent} = updateFiles(
        files,
        seen,
    );

    // Summary
    console.log("");
    if (updatedRefs > 0) {
        console.log(
            `🏁 Updated ${updatedRefs} reference(s) across ${updatedFiles} file(s).`,
        );
    } else {
        console.log("🏁 All pinned actions are already up-to-date.");
    }
    if (alreadyCurrent > 0) {
        console.log(`   ${alreadyCurrent} reference(s) already current.`);
    }
    if (failures > 0) {
        console.log(`   ⚠  ${failures} reference(s) could not be resolved.`);
        process.exit(1);
    }
};

if (require.main === module) {
    main();
}
