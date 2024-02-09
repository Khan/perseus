import {resolve} from "node:path";

import {defineConfig} from "vite";

export default defineConfig({
    resolve: {
        alias: {
            hubble: resolve("../vendor/hubble/hubble.js"),
            raphael: resolve("../vendor/raphael/raphael.js"),
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
