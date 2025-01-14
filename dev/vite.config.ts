import fs from "node:fs";
import {resolve, dirname, join} from "node:path";

import react from "@vitejs/plugin-react";
import glob from "fast-glob";
import {defineConfig} from "vite";

// Create aliases for each package in the Perseus monorepo, so Vite knows
// where to look when a file imports e.g. @khanacademy/perseus.
const packageAliases = {};
glob.sync(resolve(__dirname, "../packages/*/package.json")).forEach(
    (packageJsonPath) => {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
        packageAliases[pkg.name] = join(dirname(packageJsonPath), pkg.source);
    },
);

export default defineConfig({
    define: {
        // This is used to determine if we are running in a
        // Dev/Storybook environment.
        "process.env.STORYBOOK": JSON.stringify(true),
    },
    plugins: [react({jsxRuntime: "automatic"})],
    resolve: {
        alias: {
            hubble: resolve(__dirname, "../vendor/hubble/hubble.js"),
            raphael: resolve(__dirname, "../vendor/raphael/raphael.js"),
            jsdiff: resolve(__dirname, "../vendor/jsdiff/jsdiff.js"),
            aphrodite: resolve(
                __dirname,
                "../node_modules/aphrodite/no-important",
            ),
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
