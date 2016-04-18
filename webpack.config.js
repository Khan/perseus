var path = require("path");

module.exports = {
    entry: "./src/perseus.js",
    output: {
        path: "./build",
        filename: "perseus.js",
        library: "Perseus",
        libraryTarget: "umd",
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, "src/"),
                    path.join(__dirname, "node_modules/react-components/"),
                ],
                // https://github.com/webpack/webpack/issues/119
                loader: path.join(__dirname, "node/jsx-loader.js")
            },
            {
                test: /\.jison$/, loader: "jison-loader"
            },
        ],
    },
};
