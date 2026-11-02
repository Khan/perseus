import fs from "node:fs";
import path from "node:path";

import ancesdir from "ancesdir";
import fg from "fast-glob";

/**
 * Returns the directory names of the packages in `packages/` that we build
 * for publishing: every directory that has a `package.json` not marked
 * `"private": true`. Private packages (such as dev servers) run from source
 * and have no published entry points to build.
 */
export function getPackageNames() {
    const packagesDir = path.join(
        ancesdir(import.meta.dirname, "pnpm-workspace.yaml"),
        "packages",
    );
    return fg
        .sync("*/package.json", {cwd: packagesDir})
        .filter((packageJsonPath) => {
            const packageJson = JSON.parse(
                fs.readFileSync(
                    path.join(packagesDir, packageJsonPath),
                    "utf8",
                ),
            );
            return packageJson.private !== true;
        })
        .map((packageJsonPath) => path.dirname(packageJsonPath))
        .sort();
}
