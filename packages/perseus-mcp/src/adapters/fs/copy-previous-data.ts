import fs from "node:fs";
import path from "node:path";

/** Left in the data folder once the previous one has been copied into it. */
const MARKER = "copied-from-previous-data-dir.txt";

/**
 * Copies a data folder's drafts, their history, exercises and exports from
 * `from`, where an earlier version kept them, into `to`, once: a file in
 * `to` records the copy, and later starts do nothing. Files `to` already has
 * are kept. `from` is left as it was. Returns how many drafts were copied, or
 * null when there was nothing to do.
 */
export function copyPreviousData(from: string, to: string): number | null {
    const marker = path.join(to, MARKER);
    if (
        path.resolve(from) === path.resolve(to) ||
        fs.existsSync(marker) ||
        !fs.existsSync(from)
    ) {
        return null;
    }
    fs.mkdirSync(to, {recursive: true});
    fs.cpSync(from, to, {recursive: true, force: false, errorOnExist: false});
    const draftsDir = path.join(from, "drafts");
    const drafts = fs.existsSync(draftsDir)
        ? fs.readdirSync(draftsDir).filter((f) => f.endsWith(".json")).length
        : 0;
    fs.writeFileSync(
        marker,
        `Copied ${drafts} drafts from ${path.resolve(from)} on ` +
            `${new Date().toISOString()}. That folder was left as it was.\n`,
    );
    return drafts;
}
