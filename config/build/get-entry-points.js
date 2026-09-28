/**
 * Find the entry points that we build for a package.
 *
 * The `source` condition in an `exports` map is non-standard; we use it to
 * record the TypeScript file that each published sub-path is built from. Jest
 * and Vite read the same convention to alias packages to their sources, so it
 * is the one place that knows about every entry point of a package.
 *
 * @param {Record<string, any>} pkgJson the parsed `package.json` of a package
 * @returns {Record<string, string>} a map of entry point name (the file name
 *     the build emits, without extension) to its package-relative source file
 */
export const getEntryPoints = (pkgJson) => {
    if (!pkgJson.exports) {
        return {index: pkgJson.source};
    }

    const entryPoints = {};
    for (const [subPath, exportConfig] of Object.entries(pkgJson.exports)) {
        // Sub-paths that resolve straight to a built asset (such as
        // `./styles.css`) have no source to build from.
        if (typeof exportConfig !== "object" || !exportConfig.source) {
            continue;
        }

        const name = subPath === "." ? "index" : subPath.replace(/^\.\//, "");
        entryPoints[name] = exportConfig.source;
    }

    return entryPoints;
};
