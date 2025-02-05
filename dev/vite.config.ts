import react from "@vitejs/plugin-react";
import {mergeConfig} from "vite";

import viteConfig from "../vite.config";

export default mergeConfig(viteConfig, {
    plugins: [react({jsxRuntime: "automatic"})],
});
