import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    resolve: {
        alias: {
            aphrodite: resolve(
                currentDir,
                "node_modules/aphrodite/no-important",
            ),
        },
    },
    plugins: [react()],
    css: {
        modules: {
            localsConvention: "camelCase",
        },
    },
});
