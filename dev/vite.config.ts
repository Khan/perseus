import fs from "node:fs";
import {resolve, dirname, join} from "node:path";

import glob from "fast-glob";
import {defineConfig} from "vite";

// Create aliases for each package in the Perseus monorepo, so Vite knows
// where to look when a file imports e.g. @khanacademy/perseus.
const packageAliases = {};
glob.sync(resolve(__dirname, "../packages/*/package.json")).forEach(
    (packageJsonPath) => {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

        // "exports" is the more modern way to declare package exports. Some,
        // but not all, Perseus packages delcare "exports".
        if ("exports" in pkg) {
            // Not all packages export strings, but for those that do we need
            // to set up an alias so Vite properly resolves them.
            // Eg `import {strings, mockStrings} from "@khanacademy/perseus/strings";`
            // And MOST IMPORTANTLY, this alias _must_ precede the main
            // import, otherwise Vite will just use the main export and tack
            // `/strings` onto the end, resulting in a path like this:
            // `packages/perseus/src/index.ts/strings`
            const stringsSource = pkg.exports["./strings"]?.source;
            if (stringsSource != null) {
                packageAliases[`${pkg.name}/strings`] = join(
                    dirname(packageJsonPath),
                    stringsSource,
                );
            }

            const mainSource = pkg.exports["."]?.source;
            if (mainSource == null) {
                throw new Error(
                    "Package declares 'exports', but not provide a main export (exports[\".\"])",
                );
            }
            packageAliases[pkg.name] = join(
                dirname(packageJsonPath),
                mainSource,
            );
        } else {
            packageAliases[pkg.name] = join(
                dirname(packageJsonPath),
                pkg.source,
            );
        }
    },
);

export default defineConfig({
    define: {
        // This is used to determine if we are running in a
        // Dev/Storybook environment.
        "process.env.STORYBOOK": JSON.stringify(true),
    },
    resolve: {
        alias: {
            hubble: resolve(__dirname, "../vendor/hubble/hubble.js"),
            raphael: resolve(__dirname, "../vendor/raphael/raphael.js"),
            jsdiff: resolve(__dirname, "../vendor/jsdiff/jsdiff.js"),
            ...packageAliases,
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                math: "always",
            },
        },
    },
});
