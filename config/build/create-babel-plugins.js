/* eslint-disable import/no-commonjs */
module.exports = function createBabelPlugins({platform, format, coverage}) {
    const plugins = [
        // NOTE(john): We need this so that we can handle the declare fields
        // inside React classes.
        ["@babel/plugin-transform-typescript", {allowDeclareFields: true}],
    ];
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
