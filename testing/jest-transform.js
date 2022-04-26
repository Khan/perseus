/**
 * These file export a function for compiling our JavaScript with babel.
 *
 * Usually we wouldn't need to do this, but babel.config.js which babel-jest
 * uses by default won't work when running code inside of node.  This file
 * creates a slighly modified version of our babel config and then uses it
 * to create a transformer using `createTransformer`.  babel-jest uses this
 * function internally.
 */
const {createTransformer} = require("babel-jest").default;
const getBaseBabelConfig = require("../../babel.config.js");

const DEBUG = !!process.env.DEBUG;

// Get a babel config that is set up to get the Node version
const baseBabelConfig = getBaseBabelConfig({env: (name) => name === "test"});

const cloneBabelOptions = {
    ...baseBabelConfig,

    // We ignore .babelrc files just incase.  This ensures that files are
    // always being transformed with the plugins specified in this file.
    babelrc: false,

    // Prevent babel from using the un-modified babel.config.js from the
    // root directory.
    configFile: false,

    // Include inline source maps when debugging.
    sourceMaps: DEBUG ? "inline" : false,

    // Position breakpoints correctly when debugging in VSCode.
    retainLines: true,
};

module.exports = createTransformer(cloneBabelOptions);
