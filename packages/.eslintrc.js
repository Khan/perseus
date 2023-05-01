const path = require("path");

module.exports = {
    ignorePatterns: [".eslintrc.js"],
    parserOptions: {
        // NOTE(kevinb): These options are require to use @typescript-eslint
        // rules that require type information.
        project: true,
        tsconfigRootDir: path.resolve(__dirname, ".."),
    },
    rules: {
        // NOTE(kevinb): Some of the issues flagged by this rule are false
        // positives.  It relies on type information from the TypeScript
        // compiler and the settings we're using with it.  In particular, we
        // have not enabled `noUncheckedIndexedAccess`.  This means that the
        // eslint rule will null check of index/property access on a record
        // even though this are necessary.
        // "@typescript-eslint/no-unnecessary-condition": "error",
    },
};
