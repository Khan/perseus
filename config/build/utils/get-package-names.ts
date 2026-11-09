import fs from "node:fs";
import path from "node:path";

import ancesdir from "ancesdir";

/**
 * Returns the directory names of the packages in `packages/`: every directory
 * that has a `package.json`.
 */
export function getPackageNames() {
    const rootDir = ancesdir(import.meta.dirname, "pnpm-workspace.yaml");
    return fs
        .readdirSync(path.join(rootDir, "packages"))
        .filter((name) =>
            fs.existsSync(path.join(rootDir, "packages", name, "package.json")),
        );
}
