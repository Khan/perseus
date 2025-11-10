import {findAllPackageJsons, loadPnpmWorkspace} from "./catalog-hash-utils";
import {maybeUpdateCatalogHash} from "./maybe-update-catalog-hash";

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
        if (
            maybeUpdateCatalogHash(
                packageJsonPath,
                pnpmWorkspace,
                isDryRun,
                verbose,
            )
        ) {
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
