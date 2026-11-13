import type {PackageJson} from "../types";

/**
 * Find the entry points that we _build_ for a package.
 *
 * A package's `.exports` map points at its TypeScript sources so that tooling
 * inside this repo (TypeScript, Jest, Vite) resolves workspace packages to
 * source without a build.
 *
 * `.publishConfig.exports` defines what the `.exports` object looks like in the
 * published package. Exports that aren't TypeScript source only need to appear
 * in `.publishConfig.exports`, because the build creates them some other way
 * than as entry points. For example, Vite writes each package's CSS to
 * `dist/index.css` (see `build.lib.cssFileName` in create-package-config.ts),
 * and that file must appear in the package's `.publishConfig.exports`.
 *
 * @param packageJson The package's validated `package.json` (see
 * `parsePackageJson`).
 * @returns a map of the sub-path exports names to their package-relative
 * source files.
 *
 * See: https://nodejs.org/api/packages.html#subpath-exports
 */
export function getEntryPoints(
    packageJson: Pick<PackageJson, "exports" | "publishedExports">,
): Record<string, string> {
    const entryPoints: Record<string, string> = {};
    for (const [subPath, sourceFile] of Object.entries(packageJson.exports)) {
        const publishedFile = packageJson.publishedExports[subPath];
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
