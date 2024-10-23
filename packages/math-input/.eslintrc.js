/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
const path = require("path");

module.exports = {
    rules: {
        "import/no-extraneous-dependencies": [
            "error",
            {
                packageDir: [__dirname, path.join(__dirname, "../../")],
                // note(matthewc): I changed this in a time pinch and I'm not sure
                // it's right so I made a ticket to circle back to it
                // https://khanacademy.atlassian.net/browse/LC-864
                devDependencies: ["**/*.stories.tsx", "**/*.test.tsx"],
                includeTypes: true,
            },
        ],
    },
};
