/* eslint-disable import/no-commonjs */
module.exports = {
    assumptions: {
        constantReexports: true,
    },
    presets: [
        [
            "@babel/preset-typescript",
            {
                // NOTE(john): We need this so that we can handle the declare
                // fields inside React classes.
                allowDeclareFields: true,
            },
        ],
        [
            "@babel/preset-env",
            {
                targets: {esmodules: true},
                bugfixes: true,
                loose: true,
            },
        ],
        "@babel/preset-react",
    ],
    plugins: [
        // NOTE(john): We need this so that we can handle the declare fields
        // inside React classes.
        ["@babel/plugin-transform-typescript", {allowDeclareFields: true}],
        [
            "@babel/plugin-transform-runtime",
            {
                corejs: false,
                helpers: true,
                regenerator: false,
            },
        ],
    ],
};
