/* eslint-disable import/no-commonjs */
module.exports = function createBabelPresets({platform, format}) {
    const targets = {};
    const options = {targets};

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
            options.bugfixes = true;
            options.loose = true;
            break;
    }

    return [
        [
            "@babel/preset-typescript",
            {
                // NOTE(john): We need this so that we can handle the declare
                // fields inside React classes.
                allowDeclareFields: true,
            },
        ],
        ["@babel/preset-env", options],
        "@babel/preset-react",
    ];
};
