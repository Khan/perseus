import react from "@vitejs/plugin-react";
import {defineConfig} from "cypress";
import {mergeConfig} from "vite";
import istanbul from "vite-plugin-istanbul";

import viteConfig from "../../vite.config.mts";

const coverageEnabled = Boolean(process.env.CYPRESS_COVERAGE);
const sharedViteConfig = {...viteConfig};
delete sharedViteConfig.plugins;

export default defineConfig({
    fixturesFolder: false,
    video: false,
    expose: {
        coverage: coverageEnabled,
    },
    defaultBrowser: "chrome",
    // Prevent Cypress from scrolling to elements before clicking them.
    scrollBehavior: false,
    // iPhone 14/15 Pro Max
    viewportWidth: 430,
    viewportHeight: 932,
    component: {
        specPattern: ["packages/**/*.cypress.{js,ts,jsx,tsx}"],
        indexHtmlFile: "config/cypress/component-index.html",
        supportFile: "config/cypress/support.ts",

        devServer: {
            bundler: "vite",
            framework: "react",
            viteConfig: async (config) => {
                return mergeConfig(mergeConfig(config, sharedViteConfig), {
                    plugins: [
                        react(),
                        ...(coverageEnabled ? [istanbul()] : []),
                    ],
                    define: {
                        // This is used to determine if we are running in a
                        // Storybook environment.
                        "process.env.STORYBOOK": "true",
                    },
                });
            },
        },

        setupNodeEvents: async (on, config) => {
            if (config.env["CYPRESS_COVERAGE"]) {
                const task = await import("@cypress/code-coverage/task");
                task.default(on, config);
            }

            config.env.reactDevtools = true;

            return config;
        },
    },
});
