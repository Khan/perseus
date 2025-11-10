import fs from "node:fs";

import fastGlob from "fast-glob";
import yaml from "yaml";

export type PackageJson = {
    name: string;
    private?: boolean;
    dependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    khan?: {
        catalogHash?: string;
    };
};

export type PnpmWorkspace = {
    catalogs: {
        prodDeps?: Record<string, string>;
        peerDeps?: Record<string, string>;
        devDeps?: Record<string, string>;
    };
};

/**
 * Load the pnpm workspace configuration containing catalog dependencies.
 */
export function loadPnpmWorkspace(): PnpmWorkspace {
    const workspaceContent = fs.readFileSync("pnpm-workspace.yaml", "utf-8");
    return yaml.parse(workspaceContent);
}

/**
 * Find all package.json files in the workspace.
 */
export function findAllPackageJsons(): string[] {
    const packageJsonPaths = fastGlob.sync("**/package.json", {
        absolute: true,
        ignore: ["**/node_modules/**", "**/dist/**"],
    });
    return packageJsonPaths;
}

export const ROOT_PACKAGE_NAME = "perseus";