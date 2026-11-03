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
