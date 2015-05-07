var path = require("path");

module.exports = {
    entry: "./src/node-perseus.js",
    output: {
        path: "./build",
        filename: "node-perseus.js",
        library: "Perseus",
        libraryTarget: "commonjs2"
    },
    target: "node",
    module: {
        loaders: [
            { test: /\.json$/, loader: "json-loader" },
            // https://github.com/webpack/webpack/issues/119
            { test: /\.jsx$/, loader: path.join(__dirname, "node/jsx-loader.js") },
        ]
    }
};
