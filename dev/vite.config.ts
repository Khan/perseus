import react from "@vitejs/plugin-react";
import {mergeConfig} from "vite";

// eslint-disable-next-line import/no-relative-packages
import viteConfig from "../vite.config";

export default mergeConfig(viteConfig, {
    plugins: [react({jsxRuntime: "automatic"})],
});
