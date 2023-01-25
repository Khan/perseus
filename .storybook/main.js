const babelConfig = require("../babel.config.js");
const util = require("util");
const path = require("path");
const fs = require("fs");

module.exports = {
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
        "../packages/*/src/**/*@(.stories|.fixturestories).@(js|jsx)",
    ],
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

        const aliases = {};
        fs.readdirSync(path.join(__dirname, "../packages")).forEach((name) => {
            aliases["@khanacademy/" + name] = path.join(
                __dirname,
                "../packages",
                name,
                "src/index.js",
            );
        });
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
                ],
            },
        };

        return updateWebpackConfig;
    },
};
