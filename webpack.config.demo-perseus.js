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
    module: require('./webpack.config.js').module,
};
