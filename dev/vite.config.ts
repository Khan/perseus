import {defineConfig} from "vite";
import {resolve} from "node:path";

export default defineConfig({
    resolve: {
        alias: {
            "hubble": resolve("../vendor/hubble/hubble.js"),
            "raphael": resolve("../vendor/raphael/raphael.js"),
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                math: "always"
            }
        }
    }
})
