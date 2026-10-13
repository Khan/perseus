import {isCssFile} from "./css-files";

import type {parseBuildPackageMetadata} from "./package-json-parser";

/**
 * Returns `true` if `id` imports `packageName` itself or one of its sub-paths
 * (e.g. `react` or `react/jsx-runtime`), but not a different package that
 * shares its name as a prefix (e.g. `react-dom`).
 */
function isPackageImport(id: string, packageName: string) {
    return id === packageName || id.startsWith(`${packageName}/`);
}

/**
 * Builds the Rolldown `external` function for a package.
 *
 * Imports of the package's `dependencies` and `peerDependencies` stay as
 * `import` statements in the output, so the consumer's bundler resolves them
 * (and can dedupe them) instead of each Perseus package shipping its own copy.
 *
 * CSS is always bundled, including dependencies' stylesheets such as
 * `mafs/core.css`, so it all lands in `dist/index.css`.
 *
 * @returns a function that returns `true` when the module `id` should be left
 * external.
 */
export function createExternal(
    pkgJson: Pick<
        ReturnType<typeof parseBuildPackageMetadata>,
        "dependencies" | "peerDependencies"
    >,
) {
    const externalDependencies = [
        ...Object.keys(pkgJson.dependencies),
        ...Object.keys(pkgJson.peerDependencies),
    ];

    return (id: string) =>
        !isCssFile(id) &&
        externalDependencies.some((name) => isPackageImport(id, name));
}
