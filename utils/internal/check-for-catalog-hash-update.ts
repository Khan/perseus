import type {PackageJson} from "./catalog-hash-utils";

/**
 * Check if a package needs its catalog hash updated.
 *
 * This function determines if a package should have its catalog hash updated based on:
 * - Whether the package is in the vendor directory (returns false if so)
 * - Whether the package is marked as private (returns false if so)
 * - Whether the current catalog hash differs from the newly calculated hash
 *
 * @param packageJsonPath - The absolute path to the package.json file to check
 * @param packageJson - The parsed package.json content
 * @param newCatalogDepsHash - The newly calculated catalog hash
 * @returns `true` if the package needs to be updated, `false` otherwise
 */
export function checkForCatalogHashUpdate(
    packageJsonPath: string,
    packageJson: PackageJson,
    newCatalogDepsHash: string,
): boolean {
    // Skip vendor packages (third-party code we don't control)
    if (packageJsonPath.includes("/vendor/")) {
        return false;
    }

    // Skip private packages (not published to npm)
    if (packageJson.private === true) {
        return false;
    }

    const oldCatalogDepsHash = packageJson.khan?.catalogHash;

    return oldCatalogDepsHash !== newCatalogDepsHash;
}
