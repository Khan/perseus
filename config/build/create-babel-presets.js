/* eslint-disable import/no-commonjs */
module.exports = function createBabelPresets({platform, format}) {
    const targets = {};

    if (platform === "node") {
        targets.node = true;
    }

    switch (format) {
        case "cjs":
            if (platform === "browser") {
                targets.browsers = ["defaults", "not IE 11"];
            }
            break;

        case "esm":
            targets.esmodules = true;
            break;
    }
    return [
        "@babel/preset-typescript",
        [
            "@babel/preset-env",
            {
                targets,
            },
        ],
        "@babel/preset-react",
    ];
};
