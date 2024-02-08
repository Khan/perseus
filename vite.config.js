import {defineConfig} from "vite"
import {resolve} from "node:path"

export default defineConfig({
    resolve: {
        alias: {
            "raphael": resolve("./vendor/raphael/raphael.js"),
            "hubble": resolve("./vendor/hubble/hubble.js")
        }
    },

});
