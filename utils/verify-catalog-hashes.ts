import fs from "node:fs";
import path from "node:path";

import fastGlob from "fast-glob";
import yaml from "yaml";

import {getCatalogDepsHash} from "./get-catalog-deps-hash";

const ROOT_PACKAGE_NAME = "perseus";

type PackageJson = {
    name: string;
    dependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    khan?: {
        catalogHash?: string;
    };
};

type ChangesetConfig = {
    ignore?: string[];
};

type PnpmWorkspace = {
    catalogs: {
        prodDeps?: Record<string, string>;
        peerDeps?: Record<string, string>;
        devDeps?: Record<string, string>;
    };
};

/**
 * Load the changeset configuration to determine which packages are unpublished.
 */
function loadChangesetConfig(): ChangesetConfig {
    const configContent = fs.readFileSync(".changeset/config.json", "utf-8");
    return JSON.parse(configContent);
}

/**
 * Load the pnpm workspace configuration containing catalog dependencies.
 */
function loadPnpmWorkspace(): PnpmWorkspace {
    const workspaceContent = fs.readFileSync("pnpm-workspace.yaml", "utf-8");
    return yaml.parse(workspaceContent);
}

/**
 * Find all package.json files in the workspace.
 */
function findAllPackageJsons(): string[] {
    const packageJsonPaths = fastGlob.sync("**/package.json", {
        absolute: true,
        ignore: ["**/node_modules/**", "**/dist/**"],
    });
    return packageJsonPaths;
}

/**
 * Verify that catalog hashes are up-to-date for all published packages.
 *
 * @returns An object with `success` boolean and optional `errors` array.
 */
export function verifyCatalogHashes(): {
    success: boolean;
    errors: string[];
} {
    const {ignore = []} = loadChangesetConfig();
    const unpublishedPackages = new Set<string>(ignore);
    unpublishedPackages.add(ROOT_PACKAGE_NAME);

    const allPackagePaths = findAllPackageJsons();
    const pnpmWorkspace = loadPnpmWorkspace();
    const errors: string[] = [];

    for (const packageJsonPath of allPackagePaths) {
        const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
        const packageJson: PackageJson = JSON.parse(packageJsonContent);
        const name = packageJson.name;

        // Skip unpublished packages
        if (unpublishedPackages.has(name)) {
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
