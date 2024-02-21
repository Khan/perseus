const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const extensions = [".ts", ".tsx", ".js"];

module.exports = {
    entry: "./index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: "peruse-core",
        libraryTarget: "umd",
    },
    mode: "production",
    stats: {
        errorDetails: true,
    },
    profile: true,
    externals: {
        react: "react",
        "react-dom": "react-dom",
    },
    resolve: {
        extensions,
        plugins: [
            new TsconfigPathsPlugin({
                extensions,
            }),
        ],
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"],
        },
    },
    module: {
        rules: [
            // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.([cm]?ts|tsx)$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: false,
                            projectReferences: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                loader: "svg-inline-loader",
            },
        ],
    },
    plugins: [new CleanWebpackPlugin()],
};
