import fs from "node:fs";
import path from "node:path";

import {getCatalogDepsHash} from "./get-catalog-deps-hash";
import {findAllPackageJsons, loadPnpmWorkspace} from "./catalog-hash-utils";

import type {PackageJson} from "./catalog-hash-utils";

/**
 * Verify that catalog hashes are up-to-date for all published packages.
 *
 * @returns An object with `success` boolean and optional `errors` array.
 */
export function verifyCatalogHashes(): {
    success: boolean;
    errors: string[];
} {
    const allPackagePaths = findAllPackageJsons();
    const pnpmWorkspace = loadPnpmWorkspace();
    const errors: string[] = [];

    for (const packageJsonPath of allPackagePaths) {
        const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
        const packageJson: PackageJson = JSON.parse(packageJsonContent);
        const name = packageJson.name;

        // Skip private packages (not published to npm)
        if (packageJson.private === true) {
            continue;
        }

        const relativePackageJsonPath = path.relative(
            process.cwd(),
            packageJsonPath,
        );

        // Only process packages in the packages directory
        if (!relativePackageJsonPath.startsWith("packages")) {
            continue;
        }

        // Calculate what the hash should be
        const expectedHash = getCatalogDepsHash(pnpmWorkspace, packageJson);
        const actualHash = packageJson.khan?.catalogHash;

        // Check if hash is missing or incorrect
        if (actualHash !== expectedHash) {
            errors.push(
                `${name}: catalog hash is ${actualHash === undefined ? "missing" : "out of date"}. ` +
                    `Expected "${expectedHash}", got "${actualHash}". ` +
                    `Run "pnpm update-catalog-hashes" to fix.`,
            );
        }
    }

    return {
        success: errors.length === 0,
        errors,
    };
}
