import {mergeConfig} from "vite";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

import type {StorybookConfig} from "@storybook/react-vite";

// This is a temporary plugin option to mimic what is in PROD in regard to cascade layers.
// Perseus LESS files are wrapped in the 'shared' layer in Webapp.
// To get the same ordering of precedence in Storybook, the imported LESS files need to be wrapped accordingly.
// Once the LESS files have cascade layers included (LEMS-2801),
//     then the following plugin option should be removed.
const lessWrapper = {
    name: "wrap-less-in-layer",
    transform: (code: string, pathname: string) => {
        if (pathname.endsWith(".less")) {
            const layerStatements =
                "@layer reset, shared, legacy;\n@layer shared";
            return {
                code: `${layerStatements} { ${code} }`,
                map: null,
            };
        }
    },
};

const config: StorybookConfig = {
    // This framework automatically reads the vite.config.ts in the root dir
    // https://www.npmjs.com/package/@storybook/builder-vite#customize-vite-config
    framework: "@storybook/react-vite",
    stories: [
        // NOTE(jeremy): This glob is extremely finicky! I would have written
        // this as a negated match to exclude node_modules, but I was never
        // able to get it to work. For example, the following regex included
        // stories from wonder-blocks packages in node_modules.
        //     "../packages!(/node_modules)/**/*@(.stories|.fixturestories).@(js|jsx|ts|tsx|mdx)",
        // So, instead of fighting it, I changed this glob to restrict stories
        // to be ones in any of our local packages 'src' dirs. This effectively
        // eliminates stories showing up inside node_modules within any package
        // dir.
        "../packages/*/src/**/*@(.stories|.fixturestories).@(ts|tsx)",
    ],

    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-a11y",
    ],

    // NOTE(kevinb): We customize the padding a bit so that so that stories
    // using the on-screen keypad render correctly.  Storybook adds its own
    // padding as a class to <body> so we use !important to override that.
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
            plugins: [lessWrapper],
        });
    },
    staticDirs: ["../static"],
};

export default config;
