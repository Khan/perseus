import fs from "node:fs";
import {resolve, dirname, join} from "node:path";

import glob from "fast-glob";
import {defineConfig} from "vite";

// Create aliases for each package in the Perseus monorepo, so Vite knows
// where to look when a file imports e.g. @khanacademy/perseus.
const packageAliases = {};
glob.sync(resolve("../packages/*/package.json")).forEach((packageJsonPath) => {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    packageAliases[pkg.name] = join(dirname(packageJsonPath), pkg.source);
});

export default defineConfig({
    resolve: {
        alias: {
            hubble: resolve("../vendor/hubble/hubble.js"),
            raphael: resolve("../vendor/raphael/raphael.js"),
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
