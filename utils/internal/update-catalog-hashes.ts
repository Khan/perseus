import fs from "node:fs";

import {
    findAllPackageJsons,
    loadPnpmWorkspace,
    type PackageJson,
} from "./catalog-hash-utils";
import {checkForCatalogHashUpdate} from "./check-for-catalog-hash-update";
import {getCatalogDepsHash} from "./get-catalog-deps-hash";

/**
 * Update the catalog hashes in all package.json files in the project.
 *
 * This function will update the catalog hash in all package.json files
 * in the project if the catalog dependencies have changed.
 *
 * @param isDryRun If true, will not update the catalog hashes, but will log
 * what would be updated.
 * @param verbose If true, will log detailed information about catalog dependencies.
 */
export function updateCatalogHashes(isDryRun: boolean, verbose = false): void {
    const allPackagePaths = findAllPackageJsons();
    const pnpmWorkspace = loadPnpmWorkspace();

    let updatedCount = 0;

    for (const packageJsonPath of allPackagePaths) {
        const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
        const packageJson: PackageJson = JSON.parse(packageJsonContent);

        const newCatalogDepsHash = getCatalogDepsHash(
            pnpmWorkspace,
            packageJson,
            verbose,
        );

        if (
            checkForCatalogHashUpdate(
                packageJsonPath,
                packageJson,
                newCatalogDepsHash,
            )
        ) {
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

            updatedCount++;
        }
    }

    console.log("");

    if (isDryRun) {
        console.log(`🔮 Would update ${updatedCount} package.json files`);
    } else {
        console.log(`✅ Updated ${updatedCount} package.json files`);
    }
}
