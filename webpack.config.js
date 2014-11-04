var path = require("path");

var webpack = require("webpack");

module.exports = {
    entry: "./src/perseus.js",
    output: {
        path: "./build",
        filename: "perseus.js",
        library: "Perseus",
        libraryTarget: "umd"
    },
    module: {
        loaders: [
        { test: /\.json$/, loader: "json-loader" },
        // https://github.com/webpack/webpack/issues/119
        { test: /\.jsx$/, loader: path.join(__dirname, "node/jsx-loader.js") },
        { test: /\.jison$/, loader: "jison-loader" }
        ]
    }
};
