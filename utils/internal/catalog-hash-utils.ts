import {execSync} from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import yaml from "yaml";

export type PackageJson = {
    name: string;
    version?: string;
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
 * Find all package.json files in the workspace that are tracked by git.
 * This automatically excludes node_modules, dist, and other untracked files.
 */
export function findAllPackageJsons(): string[] {
    try {
        const output = execSync(
            'git ls-files "package.json" "**/package.json"',
            {
                encoding: "utf-8",
            },
        );
        return output
            .trim()
            .split("\n")
            .filter(Boolean)
            .map((p) => path.resolve(process.cwd(), p));
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error(
            `Failed to find package.json files using git. Ensure you're in a git repository. ${errorMessage}`,
        );
    }
}
