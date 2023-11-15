import {dirname, join} from "path";
const babelConfig = require("../babel.config");
const path = require("path");
const fs = require("fs");
const glob = require("fast-glob");

import type {StorybookConfig} from "@storybook/react-webpack5";

const config: StorybookConfig = {
    framework: "@storybook/react-webpack5",

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
    previewHead: (head) => `
        ${head}
        <style>
        html, body {
            padding: 16px 0px 0px 0px !important;
        }
        </style>
    `,

    babel: async (options) => {
        return babelConfig;
    },

    webpackFinal: async (webpackConfig) => {
        // We remove the existing rule for CSS files so that we can replace
        // it with our own.  Storybook isn't configured to use LESS out of
        // the box so we don't have to worry about removing a rule for it.
        const rulesWithoutCss = webpackConfig.module.rules.filter((rule) => {
            // We have to call .toString() on .test since regexes can't
            // be compared directly.
            return rule.test?.toString() !== /\.css$/.toString();
        });

        const aliases = {};
        glob.sync(path.join(__dirname, "../packages/*/package.json")).forEach(
            (pkgPath) => {
                const pkgJson = require(pkgPath);
                aliases[pkgJson.name] = path.join(
                    __dirname,
                    "../packages",
                    path.basename(path.dirname(pkgPath)),
                    pkgJson.source,
                );
            },
        );
        fs.readdirSync(path.join(__dirname, "../vendor")).forEach((name) => {
            aliases[name] = path.join(__dirname, "../vendor", name);
        });

        const updateWebpackConfig = {
            ...webpackConfig,
            resolve: {
                ...webpackConfig.resolve,
                alias: {
                    ...webpackConfig.resolve?.alias,
                    ...aliases,
                },
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
            module: {
                ...webpackConfig.module,
                rules: [
                    ...rulesWithoutCss,
                    {
                        test: /\.less$/,
                        /**
                         * We want to disable url processing in the css-loader so that images
                         * are not processed. Images are handled as static assets outside of
                         * webpack.
                         */
                        use: [
                            "style-loader",
                            {
                                loader: "css-loader",
                                options: {url: false},
                            },
                            {
                                loader: "less-loader",
                                options: {lessOptions: {math: "always"}},
                            },
                        ],
                    },
                    {
                        test: /\.css$/,
                        use: [
                            "style-loader",
                            // We use `css-loader` to filter out imports for
                            // KaTeX fonts. These fonts are then emitted to the
                            // `fonts` output path by `file-loader` below.
                            {
                                loader: "css-loader",
                                options: {
                                    url: {
                                        filter: (url, resourcePath) =>
                                            /\.(woff|woff2|ttf|otf)$/.test(url),
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        };

        return updateWebpackConfig;
    },

    docs: {
        autodocs: true,
    },
};

module.exports = config;
