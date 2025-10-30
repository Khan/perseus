import fs from "node:fs";
import path from "node:path";

import {getCatalogDepsHash} from "./get-catalog-deps-hash";

type PackageJson = {
    name: string;
    dependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    khan?: {
        catalogHash?: string;
    };
};

type PnpmWorkspace = {
    catalogs: {
        prodDeps?: Record<string, string>;
        peerDeps?: Record<string, string>;
        devDeps?: Record<string, string>;
    };
};

/**
 * Update the catalog hash in a package.json file if it has changed.
 *
 * This function checks if a package should have its catalog hash updated based on:
 * - Whether the package is in the unpublished packages set (skips if so)
 * - Whether the package is in the packages directory (only processes packages)
 * - Whether the current catalog hash differs from the newly calculated hash
 *
 * @param packageJsonPath - The absolute path to the package.json file to potentially update
 * @param unpublishedPackages - Set of package names that should not be updated
 * @param pnpmWorkspace - The pnpm workspace configuration containing catalog dependencies
 * @param isDryRun - If true, logs what would be updated but doesn't actually modify the file
 * @param verbose - If true, logs verbose information about catalog dependencies
 * @returns `true` if the package was updated (or would be updated in dry run), `false` otherwise
 */
export function maybeUpdateCatalogHash(
    packageJsonPath: string,
    unpublishedPackages: Set<string>,
    pnpmWorkspace: PnpmWorkspace,
    isDryRun: boolean,
    verbose = false,
): boolean {
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
    const packageJson: PackageJson = JSON.parse(packageJsonContent);
    const name = packageJson.name;

    if (unpublishedPackages.has(name)) {
        return false;
    }

    const relativePackageJsonPath = path.relative(
        process.cwd(),
        packageJsonPath,
    );

    // We only care about packages in the packages directory
    if (!relativePackageJsonPath.startsWith("packages")) {
        return false;
    }

    const newCatalogDepsHash = getCatalogDepsHash(
        pnpmWorkspace,
        packageJson,
        verbose,
    );
    const oldCatalogDepsHash = packageJson.khan?.catalogHash;

    if (oldCatalogDepsHash === newCatalogDepsHash) {
        return false;
    }

    const message = isDryRun
        ? `🔮 Would update package.json for ${name}`
        : `🔄 Updating package.json for ${name}`;
    console.log(message);

    if (verbose) {
        console.log(
            `   ✨ Hash changed from ${oldCatalogDepsHash} to ${newCatalogDepsHash}`,
        );
    }

    if (!isDryRun) {
        if (!packageJson.khan) {
            packageJson.khan = {catalogHash: newCatalogDepsHash};
        } else {
            packageJson.khan.catalogHash = newCatalogDepsHash;
        }
        fs.writeFileSync(
            packageJsonPath,
            JSON.stringify(packageJson, null, 4) + "\n",
            "utf-8",
        );
    }
    return true;
}