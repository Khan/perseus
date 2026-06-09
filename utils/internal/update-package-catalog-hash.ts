import fs from "node:fs";

import {type PackageJson, type PnpmWorkspace} from "./catalog-hash-utils";
import {checkForCatalogHashUpdate} from "./check-for-catalog-hash-update";
import {getCatalogDepsHash} from "./get-catalog-deps-hash";

/**
 * Recompute and (if needed) update the catalog hash for a single package.json.
 *
 * Reads the package.json, recomputes its catalog hash, and — when the hash has
 * changed — rewrites the file with the new hash (unless in dry-run mode).
 *
 * @param packageJsonPath The absolute path to the package.json to process.
 * @param pnpmWorkspace The parsed pnpm workspace, used to compute the hash.
 * @param isDryRun If true, don't write the file; just report what would change.
 * @param verbose If true, log detailed information about the hash change.
 * @returns The package's name if its catalog hash changed (i.e. it was, or
 * would be, updated), otherwise `null`.
 */
export function updatePackageCatalogHash(
    packageJsonPath: string,
    pnpmWorkspace: PnpmWorkspace,
    isDryRun: boolean,
    verbose: boolean,
): string | null {
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
    const packageJson: PackageJson = JSON.parse(packageJsonContent);

    const newCatalogDepsHash = getCatalogDepsHash(
        pnpmWorkspace,
        packageJson,
        verbose,
    );

    if (
        !checkForCatalogHashUpdate(
            packageJsonPath,
            packageJson,
            newCatalogDepsHash,
        )
    ) {
        return null;
    }

    const name = packageJson.name;
    const oldCatalogDepsHash = packageJson.khan?.catalogHash;

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

    return name;
}
