// Config for cypress
const fs = require("fs");
const path = require("path");

module.exports = (on, config) => {
    const {startDevServer} = require("@cypress/webpack-dev-server");

    const aliases = {};
    fs.readdirSync(path.join(__dirname, "../../packages")).forEach((name) => {
        aliases["@khanacademy/" + name] = path.join(
            __dirname,
            "../../packages",
            name,
            "src/index.js",
        );
    });
    fs.readdirSync(path.join(__dirname, "../../vendor")).forEach((name) => {
        aliases[name] = path.join(__dirname, "../../vendor", name);
    });

    on("dev-server:start", (options) =>
        startDevServer({
            options,
            webpackConfig: {
                resolve: {
                    alias: aliases,
                },
                module: {
                    rules: [
                        // Babel loader will use your project’s babel.config.js
                        {
                            test: /\.jsx?$/,
                            exclude: /node_modules/,
                            loader: "babel-loader",
                        },
                        // Other loaders that are needed for your components
                        {
                            test: /\.css$/,
                            use: ["style-loader", "css-loader"],
                        },
                        {
                            test: /\.(woff|woff2|ttf|otf)$/,
                            use: [{loader: "file-loader"}],
                        },
                        {
                            test: /\.(less)$/,
                            use: ["style-loader", "css-loader", "less-loader"],
                        },
                    ],
                },
            },
        }),
    );

    if (config.env["CYPRESS_COVERAGE"]) {
        require("@cypress/code-coverage/task")(on, config);
    }

    config.env.reactDevtools = true;
    return config;
};
