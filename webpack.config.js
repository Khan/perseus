const path = require("path");

const includeEditor = process.env.INCLUDE_EDITORS === "true";

module.exports = {
    entry: "./src/" + (includeEditor ? "editor-" : "") + "perseus.js",
    output: {
        path: "./build",
        filename: (includeEditor ? "editor-" : "") + "perseus.js",
        library: "Perseus",
        libraryTarget: "umd",
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader",
            },
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, "src/"),
                    path.join(__dirname, "node_modules/react-components/"),
                ],
                // https://github.com/webpack/webpack/issues/119
                loader: path.join(__dirname, "node/jsx-loader.js"),
            },
            {
                test: /\.jison$/, loader: "jison-loader",
            },
        ],
    },
};
