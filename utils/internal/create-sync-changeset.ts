/**
 * A changeset ready to be written to disk includ the file name and the file's
 * contents.
 */
export type SyncChangeset = {
    filename: string;
    contents: string;
};

/**
 * Build a changeset describing a dependency sync.
 *
 * Produces the file name and contents of a changeset that bumps each affected
 * package by a `patch`, with a summary that references the frontend commit the
 * dependencies were synced from. The caller is responsible for writing the
 * returned contents to disk.
 *
 * We generate the changeset filename ourselves rather than depending on the
 * changeset CLI (because it does not provide any sort of command-line options
 * or API that is usage in a script). Syncing twice on the same day reuses the
 * same name, so the later changeset overwrites the earlier one.
 *
 * @param packageNames The names of the published packages affected by the
 * sync. If empty, no changeset is built.
 * @param frontendCommit The frontend git commit SHA that the dependencies were
 * synced from. Included in the changeset summary.
 * @returns The changeset's file name and contents, or `null` if no packages
 * were affected.
 */
export function createSyncChangeset(
    packageNames: string[],
    frontendCommit: string,
): SyncChangeset | null {
    if (packageNames.length === 0) {
        return null;
    }

    const date = new Date().toISOString().slice(0, 10);

    const frontmatter = [...packageNames]
        .sort((a, b) => a.localeCompare(b))
        .map((pkg) => `"${pkg}": patch`)
        .join("\n");

    const contents = `---\n${frontmatter}\n---\n\nSync dependencies with frontend commit ${frontendCommit}\n`;

    return {filename: `sync-deps-${date}.md`, contents};
}
