import {readFileSync} from "node:fs";
import {dirname, join, resolve} from "node:path";

import react from "@vitejs/plugin-react-swc";
import {glob} from "fast-glob";
import {defineConfig} from "vite";

// Create aliases for each package in the Perseus monorepo, so Vite knows
// where to look when a file imports e.g. @khanacademy/perseus.
const packageAliases = {};
glob.sync(join(__dirname, "/packages/*/package.json")).forEach(
    (packageJsonPath) => {
        const pkg = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
        packageAliases[pkg.name] = join(dirname(packageJsonPath), pkg.source);
    },
);

export default defineConfig({
    resolve: {
        alias: {
            ...packageAliases,
            raphael: resolve(__dirname, "vendor/raphael/raphael.js"),
            jsdiff: resolve(__dirname, "vendor/jsdiff/jsdiff.js"),
            aphrodite: resolve(
                __dirname,
                "node_modules/aphrodite/no-important",
            ),
        },
    },
    plugins: [react()],
    build: {
        commonjsOptions: {
            // We need to process CJS packages in vendor/ as CJS (along with
            // the default /node_modules/).
            // See also `optimizeDeps.include`
            include: [/node_modules/],
        },
    },
    optimizeDeps: {
        include: [
            // ViteJS needs to "pre-bundle" any dependency that is _not_ an ES
            // module. Some packages in vendor/ are older CJS packages. We pass
            // this list of package names to Vite so it knows to wrap them in
            // an ESM wrapper.
            // See also: `build.commonjsOptions`
            // Docs: https://vite.dev/guide/dep-pre-bundling
            "raphael",
        ],
    },
    css: {
        modules: {
            localsConvention: "camelCase",
        },
    },
});
