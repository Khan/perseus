module.exports = {
    entry: {
        "demo-perseus": "./src/demo-perseus.js",
        "frame-perseus": "./src/perseus-frame.js",
    },
    output: {
        path: "./build",
        publicPath: "/build/",
        filename: "[name].js",
    },
    devServer: {
        historyApiFallback: "/build/",
    },
    plugins: require('./webpack.config.js').plugins,
    module: require('./webpack.config.js').module,
};
