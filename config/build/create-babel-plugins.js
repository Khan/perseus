/* eslint-disable import/no-commonjs */
module.exports = function createBabelPlugins({platform, format, coverage}) {
    const plugins = [];
    if (coverage) {
        plugins.push("istanbul");
    }
    return plugins;
};
