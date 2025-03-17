// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
    },
};
