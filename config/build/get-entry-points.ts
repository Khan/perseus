// Node's native ES module loader requires the file extension.
import {parseRecord, parseStringRecord} from "./package-json.ts";

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
 * @returns a map of the sub-path exports names to their package-relative
 * source files.
 *
 * See: https://nodejs.org/api/packages.html#subpath-exports
 */
export function getEntryPoints(pkgJson: unknown): Record<string, string> {
    const packageJson = parseRecord(pkgJson, "package.json");
    const sourceExports = parseStringRecord(
        packageJson.exports,
        "package.json.exports",
    );
    const publishConfig = parseRecord(
        packageJson.publishConfig,
        "package.json.publishConfig",
    );
    const publishedExports = parseStringRecord(
        publishConfig.exports,
        "package.json.publishConfig.exports",
    );
    const entryPoints: Record<string, string> = {};
    for (const [subPath, sourceFile] of Object.entries(sourceExports)) {
        const publishedFile = publishedExports[subPath];
        if (
            !sourceFile.startsWith("./src/") ||
            publishedFile === undefined ||
            !publishedFile.endsWith(".js")
        ) {
            continue;
        }

        const name = subPath === "." ? "index" : subPath.replace(/^\.\//, "");
        entryPoints[name] = sourceFile;
    }

    return entryPoints;
}
