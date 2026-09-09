// Node's native ES module loader requires the file extension.
import {parseRecord, parseStringRecord} from "./package-json.ts"; // eslint-disable-line no-restricted-syntax

/** "./dist/widgets/index.js" -> "widgets/index" */
function toEntryName(publishedFile: string): string {
    return publishedFile.replace(/^\.\/dist\//, "").replace(/\.js$/, "");
}

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
 * Each entry is named after its published file (minus `./dist/` and `.js`) so
 * that the build writes it exactly where the published `exports` map points.
 * Wildcard sub-paths (e.g. `./widgets/*`) are expanded into one entry point
 * per source file that matches, because the build needs concrete inputs.
 *
 * @param glob lists the package-relative files matching a package-relative
 * glob pattern. Only needed when `exports` contains wildcard sub-paths.
 * @returns a map of the entry names to their package-relative source files.
 *
 * See: https://nodejs.org/api/packages.html#subpath-exports
 */
export function getEntryPoints(
    pkgJson: unknown,
    glob: (pattern: string) => ReadonlyArray<string> = () => [],
): Record<string, string> {
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

        if (subPath.includes("*")) {
            const [prefix, suffix] = sourceFile.split("*");
            for (const match of glob(sourceFile)) {
                const matchedFile = `./${match.replace(/^\.\//, "")}`;
                // The path segment the `*` matched, e.g. "radio".
                const wildcardValue = matchedFile.slice(
                    prefix.length,
                    matchedFile.length - suffix.length,
                );
                const name = toEntryName(
                    publishedFile.replace("*", wildcardValue),
                );
                entryPoints[name] = matchedFile;
            }
            continue;
        }

        entryPoints[toEntryName(publishedFile)] = sourceFile;
    }

    return entryPoints;
}
