import fs from "fs";
import path from "path";
import {mergeConfig} from "vite";
import istanbul from "vite-plugin-istanbul";
import fg from "fast-glob";

import {defineConfig} from "cypress";
import viteConfig from "../../vite.config";

const aliases = {};

fg.globSync(path.join(__dirname, "../../packages/*/package.json")).forEach(
    (pkgPath) => {
        const pkgJson = require(pkgPath);
        const packageDirName = pkgJson.name.replace(/^@khanacademy\//, "");
        aliases[pkgJson.name] = path.join(
            path.dirname(pkgPath),
            packageDirName,
            pkgJson.exports["."].source,
        );
    },
);
fs.readdirSync(path.join(__dirname, "../../vendor")).forEach((name) => {
    aliases[name] = path.join(__dirname, "../../vendor", name);
});

export default defineConfig({
    fixturesFolder: false,
    video: false,
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
                return mergeConfig(mergeConfig(config, viteConfig), {
                    // The istanbul plugin only enables itself if the
                    // CYPRESS_COVERAGE Cypress env is set!
                    plugins: [istanbul()],
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
