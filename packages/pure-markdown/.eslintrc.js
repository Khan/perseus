/* eslint-disable import/no-commonjs */
const path = require("path");

module.exports = {
    rules: {
        "import/no-extraneous-dependencies": [
            "error",
            {packageDir: [__dirname, path.join(__dirname, "../../")]},
        ],
    },
};
