import {findAllPackageJsons, loadPnpmWorkspace} from "./catalog-hash-utils";
import {updatePackageCatalogHash} from "./update-package-catalog-hash";

/**
 * Update the catalog hashes in all package.json files in the project.
 *
 * This function will update the catalog hash in all package.json files
 * in the project if the catalog dependencies have changed.
 *
 * @param isDryRun If true, will not update the catalog hashes, but will log
 * what would be updated.
 * @param verbose If true, will log detailed information about catalog dependencies.
 * @returns The names of the published packages whose catalog hash changed (i.e.
 * the packages affected by the update). In dry-run mode, these are the packages
 * that *would* be updated.
 */
export function updateCatalogHashes(
    isDryRun: boolean,
    verbose = false,
): string[] {
    const pnpmWorkspace = loadPnpmWorkspace();

    const updatedPackageNames = findAllPackageJsons()
        .map((packageJsonPath) =>
            updatePackageCatalogHash(
                packageJsonPath,
                pnpmWorkspace,
                isDryRun,
                verbose,
            ),
        )
        .filter((name): name is string => name != null);

    console.log("");

    if (isDryRun) {
        console.log(
            `🔮 Would update ${updatedPackageNames.length} package.json files`,
        );
    } else {
        console.log(
            `✅ Updated ${updatedPackageNames.length} package.json files`,
        );
    }

    return updatedPackageNames;
}
