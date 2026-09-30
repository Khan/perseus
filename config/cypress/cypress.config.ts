import path from "node:path";
import {fileURLToPath} from "node:url";

import react from "@vitejs/plugin-react";
import {defineConfig} from "cypress";
import {mergeConfig} from "vite";
import istanbul from "vite-plugin-istanbul";

import viteConfig from "../../vite.config.mts";

const repoRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../..",
);
const coverageEnabled = process.env.CYPRESS_COVERAGE === "true";
const sharedViteConfig = {...viteConfig};
delete sharedViteConfig.plugins;

export default defineConfig({
    fixturesFolder: false,
    video: false,
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
            viteConfig: async (config) => {
                return mergeConfig(mergeConfig(config, sharedViteConfig), {
                    plugins: [
                        react(),
                        ...(coverageEnabled
                            ? [
                                  istanbul({
                                      cypress: true,
                                      cwd: repoRoot,
                                      requireEnv: true,
                                  }),
                              ]
                            : []),
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
            if (coverageEnabled) {
                const workingDirectory = process.cwd();
                // process.cwd() is this file's directory, be default, and the
                // coverage task reads NYC settings from process.cwd() so we
                // need to switch it to be the root of the repo (where the
                // `.nycrc.json` file is)
                process.chdir(repoRoot);
                try {
                    const task = await import("@cypress/code-coverage/task");
                    task.default(on, config);
                } finally {
                    process.chdir(workingDirectory);
                }
            }

            config.env.reactDevtools = true;

            return config;
        },
    },
});
