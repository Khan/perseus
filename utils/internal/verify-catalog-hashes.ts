import fs from "node:fs";

import {findAllPackageJsons, loadPnpmWorkspace} from "./catalog-hash-utils";
import {getCatalogDepsHash} from "./get-catalog-deps-hash";

import type {PackageJson} from "./catalog-hash-utils";

/**
 * Verify that catalog hashes are up-to-date for all published packages.
 */
export function verifyCatalogHashes(): {
    /** `true` if all catalog hashes are current. */
    success: boolean;
    /** The set of error messages if `success` is false. */
    errors: string[];
} {
    const allPackagePaths = findAllPackageJsons();
    const pnpmWorkspace = loadPnpmWorkspace();
    const errors: string[] = [];

    for (const packageJsonPath of allPackagePaths) {
        const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
        const packageJson: PackageJson = JSON.parse(packageJsonContent);
        const name = packageJson.name;

        // Skip vendor packages (third-party code we don't control)
        if (packageJsonPath.includes("/vendor/")) {
            continue;
        }

        // Skip private packages (not published to npm)
        if (packageJson.private === true) {
            continue;
        }

        // Calculate what the hash should be
        const expectedHash = getCatalogDepsHash(pnpmWorkspace, packageJson);
        const actualHash = packageJson.khan?.catalogHash;

        // Check if hash is missing or incorrect
        if (actualHash !== expectedHash) {
            errors.push(
                `${name}: catalog hash is ${actualHash === undefined ? "missing" : "out of date"}. ` +
                    `Expected "${expectedHash}", got "${actualHash}".`,
            );
        }
    }

    return {
        success: errors.length === 0,
        errors,
    };
}
