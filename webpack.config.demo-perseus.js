module.exports = {
    entry: "./src/demo-perseus.js",
    output: {
        path: "./build",
        publicPath: "/build/",
        filename: "demo-perseus.js",
    },
    devServer: {
        historyApiFallback: "/build/",
    },
    plugins: require('./webpack.config.js').plugins,
    module: require('./webpack.config.js').module,
};
