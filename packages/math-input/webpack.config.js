const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/demo.js",
    },
    output: {
        publicPath: "/",
        filename: "math-input.js",
        chunkFilename: "math-input.js",
        path: path.resolve(__dirname, "build"),
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
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            title: "math-toolbox",
        }),
        new MiniCssExtractPlugin({
            filename: "math-input.css",
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
    ],
    resolve: {
        extensions: [".js", ".json"],
        alias: {
            // "react-dom": "@hot-loader/react-dom",
        },
    },
    devtool: "source-map",
    devServer: {
        hot: true,
        liveReload: false,
        contentBase: [
            path.join(__dirname, "dist"),
            path.join(__dirname, "node_modules/mathquill/build/"),
            path.join(__dirname, "assets/"),
        ],
        compress: true,
        port: 9000,
    },
};
