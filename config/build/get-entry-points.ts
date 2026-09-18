type PackageJson = {
    exports?: Record<string, unknown>;
};

type ExportConfig = {
    source: string;
    default: unknown;
};

const isExportConfig = (value: unknown): value is ExportConfig =>
    typeof value === "object" &&
    value !== null &&
    "source" in value &&
    typeof value.source === "string" &&
    Boolean(value.source) &&
    "default" in value &&
    Boolean(value.default);

/**
 * Find the entry points that we build for a package.
 *
 * The `source` condition in an `exports` map is non-standard; we use it to
 * record a sub-path's TypeScript input. A `default` condition identifies the
 * corresponding published output. Jest and Vite also read `source` to alias
 * packages to their source files.
 *
 * @returns a map of entry point name (the file name the build emits, without
 *     extension) to its package-relative source file
 */
export const getEntryPoints = (
    pkgJson: PackageJson,
): Record<string, string> => {
    const entryPoints: Record<string, string> = {};
    for (const [subPath, exportConfig] of Object.entries(
        pkgJson.exports ?? {},
    )) {
        // Build only sub-paths with a source input and a published output.
        // Source-only sub-paths support source-based tooling but emit no bundle.
        if (!isExportConfig(exportConfig)) {
            continue;
        }

        const name = subPath === "." ? "index" : subPath.replace(/^\.\//, "");
        entryPoints[name] = exportConfig.source;
    }

    return entryPoints;
};
