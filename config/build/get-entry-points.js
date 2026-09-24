/**
 * Find the entry points that we _build_ for a package.
 *
 * A package's `.exports` map points at its TypeScript sources so that tooling
 * inside this repo (TypeScript, Jest, Vite) resolves workspace packages to
 * source without a build.
 *
 * `.publishConfig.exports` defines what the `.exports` object looks like in the
 * published package. That means that exports that are not TypeScript source
 * code, only need to appear in `.publishConfig.exports` as they are created in
 * other ways than Rollup treating them as entry points. For example, the CSS
 * for each package is built using a Rollup plugin and the output filename is
 * defined in the plugin's configuration - and that output file must appear in
 * the package's `.publishConfig.exports`
 *
 * @param {Record<string, any>} pkgJson the parsed `package.json` of a package
 * @returns {Record<string, string>} a map of the sub-path exports names to
 * their package-relative source files.
 *
 * See: https://nodejs.org/api/packages.html#subpath-exports
 */
export const getEntryPoints = (pkgJson) => {
    const publishedExports = pkgJson.publishConfig?.exports ?? {};
    const entryPoints = {};
    for (const [subPath, sourceFile] of Object.entries(pkgJson.exports ?? {})) {
        const publishedFile = publishedExports[subPath];
        if (
            typeof sourceFile !== "string" ||
            !sourceFile.startsWith("./src/") ||
            typeof publishedFile !== "string" ||
            !publishedFile.endsWith(".js")
        ) {
            continue;
        }

        const name = subPath === "." ? "index" : subPath.replace(/^\.\//, "");
        entryPoints[name] = sourceFile;
    }

    return entryPoints;
};
