/**
 * Find the entry points that we build for a package.
 *
 * A package's `exports` map points at its TypeScript sources so that tooling
 * inside this repo (TypeScript, Jest, Vite) resolves workspace packages to
 * source without a build. `publishConfig.exports` holds the published map,
 * which pnpm swaps in when it packs the package. A sub-path is an entry point
 * when it maps a source file to a JavaScript file in `dist/`.
 *
 * @param {Record<string, any>} pkgJson the parsed `package.json` of a package
 * @returns {Record<string, string>} a map of entry point name (the file name
 *     the build emits, without extension) to its package-relative source file
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
