/**
 * Find the entry points that we build for a package.
 *
 * The `source` condition in an `exports` map is non-standard; we use it to
 * record a sub-path's TypeScript input. A `default` condition identifies the
 * corresponding published output. Jest and Vite also read `source` to alias
 * packages to their source files.
 *
 * @param {Record<string, any>} pkgJson the parsed `package.json` of a package
 * @returns {Record<string, string>} a map of entry point name (the file name
 *     the build emits, without extension) to its package-relative source file
 */
export const getEntryPoints = (pkgJson) => {
    const entryPoints = {};
    for (const [subPath, exportConfig] of Object.entries(
        pkgJson.exports ?? {},
    )) {
        // Build only sub-paths with a source input and a published output.
        // Source-only sub-paths support source-based tooling but emit no bundle.
        if (
            typeof exportConfig !== "object" ||
            !exportConfig.source ||
            !exportConfig.default
        ) {
            continue;
        }

        const name = subPath === "." ? "index" : subPath.replace(/^\.\//, "");
        entryPoints[name] = exportConfig.source;
    }

    return entryPoints;
};
