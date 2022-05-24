// This config is used for Jest and Cypress here in this repository, only.

const plugins = ["babel-plugin-transform-flow-enums"];

if (process.env["COVERAGE"]) {
    // Cypress uses Istanbul to provide test coverage stats.
    plugins.push("istanbul");
}

module.exports = {
    assumptions: {
        constantReexports: true,
    },
    presets: [
        "@babel/preset-flow",
        [
            "@babel/preset-env",
            {
                targets: ["defaults", "not IE 11"],
            },
        ],
        "@babel/preset-react",
    ],
    plugins,
};
