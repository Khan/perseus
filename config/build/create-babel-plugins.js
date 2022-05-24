/* eslint-disable import/no-commonjs */
module.exports = function createBabelPlugins({platform, format, coverage}) {
    const plugins = ["babel-plugin-transform-flow-enums"];
    if (coverage) {
        plugins.push("istanbul");
    }
    return plugins;
};
