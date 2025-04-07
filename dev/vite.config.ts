import {mergeConfig} from "vite";

// eslint-disable-next-line import/no-relative-packages
import viteConfig from "../vite.config";

export default mergeConfig(viteConfig, {
    define: {
        // This is used to determine if we are running in a
        // Dev/Storybook environment.
        "process.env.STORYBOOK": "true",
    },
});
