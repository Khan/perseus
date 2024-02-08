import {defineConfig} from "vite";

export default defineConfig({
    css: {
        preprocessorOptions: {
            less: {
                math: "always"
            }
        }
    }
})
