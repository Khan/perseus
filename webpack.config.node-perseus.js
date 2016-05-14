module.exports = {
    entry: "./src/node-perseus.js",
    output: {
        path: "./build",
        filename: "node-perseus.js",
        library: "Perseus",
        libraryTarget: "commonjs2",
    },
    target: "node",
    plugins: require('./webpack.config.js').plugins,
    module: require('./webpack.config.js').module,
};
