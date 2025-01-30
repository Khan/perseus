import {mergeConfig} from "vite";

import baseConfig from "../vite.config";

export default mergeConfig(baseConfig, {
    define: {
        // This is used to determine if we are running in a
        // Dev/Storybook environment.
        "process.env.STORYBOOK": JSON.stringify(true),
    },
});
