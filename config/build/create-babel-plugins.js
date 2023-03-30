/* eslint-disable import/no-commonjs */
module.exports = function createBabelPlugins({platform, format, coverage}) {
    const plugins = [];
    if (coverage) {
        plugins.push("istanbul");
    }
    if (platform === "browser" && format === "esm") {
        plugins.push([
            "@babel/plugin-transform-runtime",
            {
                corejs: false,
                helpers: true,
                regenerator: false,
            },
        ]);
    }
    return plugins;
};
