/* eslint-disable import/no-commonjs */
const createBabelPlugins = require("./create-babel-plugins");
const createBabelPresets = require("./create-babel-presets");

// This config is used for Jest and Cypress here in this repository, only.
module.exports = {
    assumptions: {
        constantReexports: true,
    },
    presets: createBabelPresets({
        platform: "browser",
        format: "cjs",
    }),
    plugins: createBabelPlugins({
        platform: "browser",
        format: "cjs",
        coverage: process.env["BABEL_COVERAGE"],
    }),
};
