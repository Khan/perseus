import { dirname, join } from "path";
import viteConfig from "../dev/vite.config";
import {mergeConfig} from "vite";

import type {StorybookConfig} from "@storybook/react-vite";

function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
    framework: getAbsolutePath("@storybook/react-vite"),

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
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@storybook/addon-a11y"),
        "@chromatic-com/storybook"
    ],

    // NOTE(kevinb): We customize the padding a bit so that so that stories
    // using the on-screen keypad render correctly.  Storybook adds its own
    // padding as a class to <body> so we use !important to override that.
    previewHead: (head) => `
        ${head}
        <style>
        html, body {
            padding: 16px 0px 0px 0px !important;
        }
        </style>
    `,

    viteFinal: async (config, {configType}) => {
        return mergeConfig(config, {
            ...viteConfig,
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
            // Fix from: https://github.com/storybookjs/storybook/issues/25256#issuecomment-1866441206
            assetsInclude: ["/sb-preview/runtime.js"],
        });
    },

    docs: {},

    typescript: {
        reactDocgen: "react-docgen-typescript"
    }
};

export default config;
