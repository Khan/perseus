module.exports = {
    entry: "./src/node-perseus.js",
    output: {
        path: "./build",
        filename: "node-perseus.js",
        library: "Perseus",
        libraryTarget: "commonjs2",
    },
    target: "node",
    module: require('./webpack.config.js').module,
};
