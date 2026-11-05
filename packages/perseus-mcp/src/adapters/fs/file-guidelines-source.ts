import {readdir, readFile} from "node:fs/promises";
import path from "node:path";

import type {GuidelinesSource} from "../../ports/guidelines-source";

/**
 * Reads the guidelines from a folder's `.md` files on each call, so edits
 * to them apply without restarting the server. `setBy` names where the
 * folder came from, for the reason it can't be read.
 */
export function fileGuidelinesSource(
    dir: string | undefined,
    setBy: string,
): GuidelinesSource {
    return {
        async read() {
            if (dir == null || dir === "") {
                return {
                    ok: false,
                    reason:
                        "no guidelines are set up. Put them in a folder as " +
                        "Markdown files, one per topic, and set " +
                        "PERSEUS_MCP_GUIDANCE_DIR to it in the server's " +
                        "environment.",
                };
            }
            try {
                const names = (await readdir(dir))
                    .filter((name) => name.endsWith(".md"))
                    .sort();
                const files = await Promise.all(
                    names.map(async (name) => ({
                        name,
                        text: await readFile(path.join(dir, name), "utf8"),
                    })),
                );
                if (files.length === 0) {
                    return {
                        ok: false,
                        reason: `${dir} (${setBy}) has no .md files.`,
                    };
                }
                return {ok: true, dir, files};
            } catch (e) {
                return {
                    ok: false,
                    reason: `couldn't read ${dir} (${setBy}): ${String(e)}`,
                };
            }
        },
    };
}
