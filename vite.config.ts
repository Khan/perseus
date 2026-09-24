import {resolve} from "node:path";

import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";

export default defineConfig({
    resolve: {
        alias: {
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
