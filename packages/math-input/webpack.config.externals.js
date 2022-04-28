const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const terserOptions = require("./terser.js");

const externalsNames = [
    "prop-types",
    "react",
    "react-dom",
    "react-transition-group",
    "react-redux",
    "redux",
    "aphrodite",
    "flow-enums-runtime",
    "jquery",
    "mathquill",
    "katex",
    "@khanacademy/wonder-blocks-clickable",
    "@khanacademy/wonder-blocks-core",
    "@khanacademy/wonder-blocks-color",
    "react-router",
    "react-router-dom",
];

const externals = {};

for (const name of externalsNames) {
    // TODO(alex): Pick just one type below, e.g. commonjs2
    externals[name] = {
        commonjs: name,
        commonjs2: name,
        amd: name,
    };
}

module.exports = {
    entry: "./src/index.js",
    mode: "production",
    output: {
        path: path.join(__dirname, "build"),
        filename: "math-input.js",
        library: "math-input",
        libraryTarget: "umd",
    },
    optimization: {
        ...terserOptions,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|mathquill)/,
                use: ["babel-loader"],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "math-input.css",
        }),
    ],
    externals: externals,
};
