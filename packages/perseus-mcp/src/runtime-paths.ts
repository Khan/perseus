import os from "node:os";
import path from "node:path";

/**
 * Where the server finds the files it reads at runtime, which depends on how
 * it runs: from this monorepo's sources, or installed as a package.
 */
export type RuntimePaths = {
    /** Holds perseus-core's `data-schema.ts` and `validation.types.ts`. */
    perseusCoreTypesDir: string;
    /** Where drafts are saved unless the command line says otherwise. */
    defaultDataDir: string;
};

/** Running from this monorepo's sources, as `bin/perseus-mcp.mjs` does. */
export function checkoutPaths(): RuntimePaths {
    const repoRoot = path.resolve(import.meta.dirname, "../../..");
    return {
        perseusCoreTypesDir: path.join(repoRoot, "packages/perseus-core/src"),
        // Drafts are local work, so they live in the checkout (each worktree
        // gets its own); `.perseus-mcp/` is gitignored.
        defaultDataDir: path.join(repoRoot, ".perseus-mcp"),
    };
}

/**
 * The folder the OS keeps an app's per-user data in: the Application Support
 * folder on macOS, `%LOCALAPPDATA%` on Windows, and `$XDG_DATA_HOME` (by
 * default `~/.local/share`) elsewhere.
 */
export function userDataDir(
    platform: string,
    env: Record<string, string | undefined>,
    home: string,
): string {
    switch (platform) {
        case "darwin":
            return path.posix.join(
                home,
                "Library",
                "Application Support",
                "perseus-mcp",
            );
        case "win32":
            return path.win32.join(
                env.LOCALAPPDATA ?? path.win32.join(home, "AppData", "Local"),
                "perseus-mcp",
            );
        default:
            return path.posix.join(
                env.XDG_DATA_HOME ?? path.posix.join(home, ".local", "share"),
                "perseus-mcp",
            );
    }
}

/** A package's paths: also where its prebuilt preview pages are. */
export type PackagedPaths = RuntimePaths & {pagesDir: string};

/**
 * Running from a package laid out as `scripts/build-mcpb-lib.ts` builds it,
 * in `root`: `server/index.mjs`, `types/` and `pages/`. Drafts go in the
 * user's data folder, since there's no checkout to keep them in.
 */
export function packagedPaths(root: string): PackagedPaths {
    return {
        perseusCoreTypesDir: path.join(root, "types"),
        defaultDataDir: userDataDir(
            process.platform,
            process.env,
            os.homedir(),
        ),
        pagesDir: path.join(root, "pages"),
    };
}
