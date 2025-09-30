import * as fs from "node:fs/promises"

/**
 * Determine whether a file path exists.
 * @param path
 */
export function exists(path: string): Promise<boolean> {
    return fs.stat(path).then(() => true).catch(() => false);
}
