import {readFile} from "node:fs/promises";

import type {GuidelinesSource} from "../../ports/guidelines-source";

/**
 * Reads the guidelines from a Markdown file on each call, so edits to it
 * apply without restarting the server.
 */
export function fileGuidelinesSource(
    path: string | undefined,
): GuidelinesSource {
    return {
        async read() {
            if (path == null || path === "") {
                return {
                    ok: false,
                    reason:
                        "no guidelines are set up. Export them as a Markdown " +
                        "file and set PERSEUS_MCP_GUIDELINES to its path in " +
                        "the server's environment.",
                };
            }
            try {
                return {ok: true, path, text: await readFile(path, "utf8")};
            } catch (e) {
                return {
                    ok: false,
                    reason:
                        `couldn't read ${path} (PERSEUS_MCP_GUIDELINES): ` +
                        String(e),
                };
            }
        },
    };
}
