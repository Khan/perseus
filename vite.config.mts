import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    resolve: {
        alias: {
            raphael: resolve(currentDir, "vendor/raphael/raphael.js"),
            jsdiff: resolve(currentDir, "vendor/jsdiff/jsdiff.js"),
            aphrodite: resolve(
                currentDir,
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
