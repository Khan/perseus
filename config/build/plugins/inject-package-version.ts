import path from "node:path";

import MagicString from "magic-string";

import type {Plugin} from "vite";

/** Create a Vite plugin that injects the package version into version.ts. */
export const createVersionPlugin = (
    packageDir: string,
    version: string,
): Plugin => {
    const versionFile = path.join(packageDir, "src/version.ts");

    return {
        name: "inject-package-version",
        transform(code, id) {
            if (id !== versionFile) {
                return;
            }

            const start = code.indexOf("__lib_version__");
            if (start === -1) {
                return;
            }

            const transformed = new MagicString(code);
            transformed.overwrite(
                start,
                start + "__lib_version__".length,
                version,
            );
            return {
                code: transformed.toString(),
                map: transformed.generateMap({hires: true, source: id}),
            };
        },
    };
};
