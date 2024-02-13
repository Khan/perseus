import {resolve, dirname, join} from "node:path";
import fs from "node:fs";
import {defineConfig} from "vite";
import glob from "fast-glob";

const aliases = {};
glob.sync(resolve("../packages/*/package.json")).forEach(
    (packageJsonPath) => {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
        aliases[pkg.name] = join(
            dirname(packageJsonPath),
            pkg.source,
        );
    },
);

export default defineConfig({
    resolve: {
        alias: {
            hubble: resolve("../vendor/hubble/hubble.js"),
            raphael: resolve("../vendor/raphael/raphael.js"),
            ...aliases,
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
