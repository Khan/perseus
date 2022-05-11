const babelConfig = require("../babel.config.js");
const util = require("util");
const path = require("path");

module.exports = {
    stories: ["../packages/**/*.@(stories|fixturestories).@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-a11y",
    ],
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
            return rule.test.toString() !== /\.css$/.toString();
        });

        const updateWebpackConfig = {
            ...webpackConfig,
            resolve: {
                ...webpackConfig.resolve,
                alias: {
                    ...webpackConfig.resolve?.alias,
                    raphael: path.join(__dirname, "../vendor/raphael"),
                    jsdiff: path.join(__dirname, "../vendor/jsdiff"),
                    hubble: path.join(__dirname, "../vendor/hubble"),
                },
            },
            module: {
                ...webpackConfig.module,
                rules: [
                    ...rulesWithoutCss,
                    // sync-start:webpack-style-config 905510231 services/static/webpack/configs/webpack.common.js
                    {
                        test: /\.less$/,
                        /**
                         * We want to disable url processing in the css-loader so that images
                         * are not processed. Images are handled as static assets outside of
                         * webpack.
                         */
                        use: [
                            "style-loader",
                            "css-loader?url=false",
                            "less-loader",
                        ],
                    },
                    {
                        test: /\.css$/,
                        use: [
                            "style-loader",
                            // We use `css-loader` to resolve `url()` for
                            // KaTeX fonts, which are then emitted to the
                            // `fonts` output path by `file-loader` below.
                            {
                                loader: "css-loader",
                                options: {
                                    url: (url, resourcePath) =>
                                        /\.(woff|woff2|ttf|otf)$/.test(url),
                                },
                            },
                        ],
                    },
                    // sync-end:webpack-style-config
                ],
            },
        };

        return updateWebpackConfig;
    },
};
