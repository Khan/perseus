/* eslint-disable import/no-commonjs */
const babelJest = require("babel-jest").default;

const babelConfig = require("../build/babel.config.js");

module.exports = babelJest.createTransformer(babelConfig);
