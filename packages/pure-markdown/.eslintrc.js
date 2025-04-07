/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable import/no-commonjs */
const path = require("path");

module.exports = {
    rules: {
        "import/no-extraneous-dependencies": [
            "error",
            {
                packageDir: [__dirname, path.join(__dirname, "../../")],
                includeTypes: true,
            },
        ],
        // To avoid circular dependencies,
        // we only allow imports from specific Perseus packages.
        // This is overly strict to prevent accidental interdependencies,
        // so feel free to update if you know what you're doing.
        "@typescript-eslint/no-restricted-imports": [
            "error",
            "@khanacademy/kas",
            "@khanacademy/keypad-context",
            "@khanacademy/kmath",
            "@khanacademy/math-input",
            "@khanacademy/perseus",
            "@khanacademy/perseus-core",
            "@khanacademy/perseus-editor",
            "@khanacademy/perseus-linter",
            "@khanacademy/perseus-score",
            "@khanacademy/pure-markdown",
        ],
    },
};
