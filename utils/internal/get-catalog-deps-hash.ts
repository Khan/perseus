import {createHash} from "node:crypto";

import type {PackageJson, PnpmWorkspace} from "./catalog-hash-utils";

/**
 * Get the hash of the catalog dependencies for a package.
 *
 * This function calculates a hash based on:
 * - Dependencies and peerDependencies with versions like "catalog:prodDeps" or "catalog:peerDeps"
 * - Their resolved versions from the pnpm-workspace.yaml catalogs
 * - Does NOT include devDependencies with "catalog:devDeps"
 *
 * @param pnpmWorkspace The PNPM workspace configuration containing catalog dependencies.
 * @param packageJson The package.json file to get the catalog dependencies hash for.
 * @param verbose Whether to log verbose output.
 * @returns The hash of the catalog dependencies used in the package.json file.
 */
export function getCatalogDepsHash(
    pnpmWorkspace: PnpmWorkspace,
    packageJson: PackageJson,
    verbose = false,
): string {
    // Generate a list of all dependency names and their resolved versions
    const catalogDepVersions: Array<[string, string]> = [];

    // Process regular dependencies (prodDeps and peerDeps, but NOT devDeps)
    for (const [dep, version] of Object.entries(
        packageJson.dependencies ?? {},
    )) {
        if (version.startsWith("catalog:")) {
            const catalogName = version.replace(
                "catalog:",
                "",
            ) as keyof typeof pnpmWorkspace.catalogs;
            // Skip devDeps catalog
            if (catalogName === "devDeps") {
                continue;
            }
            const resolvedVersion = pnpmWorkspace.catalogs[catalogName]?.[dep];
            if (resolvedVersion) {
                catalogDepVersions.push([dep, resolvedVersion]);
            }
        }
    }

    // Process peer dependencies
    for (const [dep, version] of Object.entries(
        packageJson.peerDependencies ?? {},
    )) {
        if (version.startsWith("catalog:")) {
            const catalogName = version.replace(
                "catalog:",
                "",
            ) as keyof typeof pnpmWorkspace.catalogs;
            const resolvedVersion = pnpmWorkspace.catalogs[catalogName]?.[dep];
            if (resolvedVersion) {
                catalogDepVersions.push([dep, resolvedVersion]);
            }
        }
    }

    if (verbose) {
        console.log(`  📦 Processing ${packageJson.name}:`);
        console.log(
            `     Catalog dependencies: ${catalogDepVersions.map(([n, v]) => `${n}@${v}`).join(", ")}`,
        );
    }

    // Create a hash of the catalogDeps using Node's built-in crypto
    const inputString = catalogDepVersions
        // Sort by dependency name so that the hash is deterministic
        .sort((a, b) => a[0].localeCompare(b[0]))
        // Include both the name and version so that the hash is deterministic
        .map(([dep, version]) => `${dep}@${version}`)
        .join(",");

    // Use first 16 characters of SHA-256 (64 bits) for a shorter, more readable hash
    // while maintaining extremely low collision probability
    return createHash("sha256")
        .update(inputString)
        .digest("hex")
        .substring(0, 16);
}
