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
        { test: /\.jsx$/, loader: "jsx-loader?harmony" }
        ]
    }
};
