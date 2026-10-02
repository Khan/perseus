import path from "node:path";
import {fileURLToPath} from "node:url";

import {defineConfig} from "cypress";
import istanbul from "vite-plugin-istanbul";

const repoRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../..",
);
const coverageEnabled = process.env.CYPRESS_COVERAGE === "true";

export default defineConfig({
    fixturesFolder: false,
    video: false,
    defaultBrowser: "chrome",
    expose: {
        coverage: coverageEnabled,
    },
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
            viteConfig: async () => ({
                configFile: path.join(repoRoot, "vite.config.mts"),
                build: {sourcemap: true},
                plugins: [
                    istanbul({
                        // Changes istanbul to look for the CYPRESS_COVERAGE
                        // env var instead of its default VITE_COVERAGEsß
                        cypress: true,
                        // Only instrument when CYPRESS_COVERAGE=true.
                        // Without this, istanbul instruments unless
                        // CYPRESS_COVERAGE is explicitly "false".
                        requireEnv: true,
                    }),
                ],

                define: {
                    // This is used to determine if we are running in a
                    // Storybook environment.
                    "process.env.STORYBOOK": "true",
                },
            }),
        },

        setupNodeEvents: async (on, config) => {
            if (coverageEnabled) {
                const task = await import("@cypress/code-coverage/task");
                task.default(on, config);
            }

            // Force Cypress to enable reactDevtools support
            config.env.reactDevtools = true;
            return config;
        },
    },
});
