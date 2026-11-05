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
    /**
     * Where drafts were saved before they moved to `defaultDataDir`, to copy
     * them from once.
     */
    previousDataDir?: string;
    /** Where Graffiti and its runner are; Graffiti diagrams need them. */
    graffiti?: GraffitiPaths;
};

export type GraffitiPaths = {
    /** `runner.mjs`, which runs one diagram script. */
    runner: string;
    /** The Graffiti library's entry point. */
    module: string;
};

/** Running from this monorepo's sources, as `bin/perseus-mcp.mjs` does. */
export function checkoutPaths(): RuntimePaths {
    const repoRoot = path.resolve(import.meta.dirname, "../../..");
    return {
        perseusCoreTypesDir: path.join(repoRoot, "packages/perseus-core/src"),
        // The same folder the bundle uses, so drafts don't depend on how the
        // server was started.
        defaultDataDir: userDataDir(
            process.platform,
            process.env,
            os.homedir(),
        ),
        // Drafts were kept in the checkout (`.perseus-mcp/`, gitignored)
        // until then.
        previousDataDir: path.join(repoRoot, ".perseus-mcp"),
        graffiti: {
            runner: path.join(
                repoRoot,
                "packages/perseus-mcp/src/adapters/graffiti/runner.mjs",
            ),
            // Graffiti exports only its built entry point.
            module: path.join(
                repoRoot,
                "packages/perseus-mcp/node_modules/graffiti/dist/index.js",
            ),
        },
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
 * Running from a bundle laid out as `scripts/build-bundle-lib.ts` builds it,
 * in `root`: `server/index.mjs`, `types/`, `pages/` and `graffiti/` (the
 * runner, and the Graffiti library in `lib/`). Drafts go in the
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
        graffiti: {
            runner: path.join(root, "graffiti/runner.mjs"),
            module: path.join(root, "graffiti/lib/index.js"),
        },
    };
}
