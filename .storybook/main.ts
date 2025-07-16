import {mergeConfig} from "vite";

import type {StorybookConfig} from "@storybook/react-vite";

const excludedCssFiles = ["lato.css", "protractor.css", "mafs-styles.css"];
// This is a temporary plugin option to mimic what is in PROD in regard to cascade layers.
// Perseus CSS files are wrapped in the 'shared' layer in khan/frontend.
// To get the same ordering of precedence in Storybook, the imported CSS files need to be wrapped accordingly.
// Once the CSS files have cascade layers included (LEMS-2801),
//     then the following plugin option should be removed.
const cssWrapper = {
    name: "wrap-css-in-layer",
    transform: (code: string, pathname: string) => {
        if (pathname.endsWith(".css")) {
            // Exclude the CSS files that are not part of the shared layer.
            if (!excludedCssFiles.some((file) => pathname.endsWith(file))) {
                // Exclude any CSS file that already has a layer statement.
                if (!code.includes("@layer")) {
                    const layerStatements =
                        "@layer reset, shared, legacy;\n@layer shared";
                    return {
                        code: `${layerStatements} { ${code} }`,
                        map: null,
                    };
                }
            }
        }
    },
};

const config: StorybookConfig = {
    stories: [
        // This will be used for the main documentation pages
        "../__docs__/**/*.@(stories.ts|stories.tsx|mdx)",

        // Docs for Perseus editor
        "../packages/perseus-editor/src/**/__docs__/**/*.@(stories.ts|stories.tsx|mdx)",

        // Docs for Perseus widgets, components, and renderers
        "../packages/perseus/src/**/__docs__/**/*.@(stories.ts|stories.tsx|mdx)",
    ],
    addons: [
        "@storybook/addon-a11y",
        "@storybook/addon-docs",
        "@storybook/addon-links",
        "@storybook/addon-pseudo-states",
    ],
    // This framework automatically reads the vite.config.ts in the root dir
    // https://www.npmjs.com/package/@storybook/builder-vite#customize-vite-config
    framework: "@storybook/react-vite",

    // NOTE(kevinb): We customize the padding a bit so that stories using the
    // on-screen keypad render correctly.  Storybook adds its own padding
    // as a class to <body> so we use !important to override that.
    // NOTE(jandrade): We also need to set the font size to 62.5% so that the
    // font size is consistent with the rest of the codebase. This is because
    // all Khan frontends now use rems as the default unit for measurements, and
    // we have defined the base font size to be 10px (62.5% of 16px). We set a
    // percentage instead of a pixel value so that it scales correctly when the
    // user changes their font size in the browser.
    previewHead: (head) => `
        ${head}
        <style>
        html {
            font-size: 62.5%;
        }
        body {
            font-size: 1.4rem;
            padding: 1.6rem 1.6rem 1.6rem 4.8rem !important;
        }
        </style>
    `,

    viteFinal: async (config) => {
        return mergeConfig(config, {
            define: {
                // This is used to determine if we are running in a
                // Dev/Storybook environment.
                "process.env.STORYBOOK": "true",
            },
            build: {
                // Vite 5 has a bug with how it builds `url(data: )` urls when
                // it inlines SVGs. Given this is mostly used for static
                // storybook builds, we just tell Vite to never inline assets.
                // here.
                // Feature introduced here: https://github.com/vitejs/vite/pull/14643
                //
                assetsInlineLimit: (file) => {
                    return !file.endsWith(".svg");
                },
            },
            plugins: [cssWrapper],
        });
    },
    staticDirs: ["../static"],
};

export default config;
