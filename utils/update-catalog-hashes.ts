import fs from "node:fs";

import fastGlob from "fast-glob";
import yaml from "yaml";

import {maybeUpdateCatalogHash} from "./maybe-update-catalog-hash";

const ROOT_PACKAGE_NAME = "perseus";

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
    // Get the set of packages that we don't publish, per the changeset config.
    const {ignore = []} = loadChangesetConfig();
    const unpublishedPackages = new Set<string>(ignore);
    // The root package is always considered unpublished,
    // but is not included in the changeset config ignore list.
    unpublishedPackages.add(ROOT_PACKAGE_NAME);

    const allPackagePaths = findAllPackageJsons();
    const pnpmWorkspace = loadPnpmWorkspace();

    let updatedCount = 0;

    for (const packageJsonPath of allPackagePaths) {
        if (
            maybeUpdateCatalogHash(
                packageJsonPath,
                unpublishedPackages,
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
