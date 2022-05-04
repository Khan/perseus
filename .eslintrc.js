/* eslint-disable import/no-commonjs */
const fs = require("fs");
const path = require("path");

const pkgAliases = fs
    .readdirSync(path.join(__dirname, "packages"))
    .map((pkgName) => {
        return [
            `@khanacademy/${pkgName}`,
            `./packages/${pkgName}/src/index.js`,
        ];
    });

const vendorAliases = fs
    .readdirSync(path.join(__dirname, "vendor"))
    .map((name) => {
        return [name, `./vendor/${name}`];
    });

const allAliases = [...pkgAliases, ...vendorAliases];

module.exports = {
    extends: [
        "@khanacademy",
        // This config includes rules from storybook to enforce story best
        // practices
        "plugin:storybook/recommended",
        // This config includes rules from @testing-library/jest-dom as well
        "plugin:testing-library/react",
    ],
    parser: "@babel/eslint-parser",
    parserOptions: {
        babelOptions: {
            configFile: "./config/build/babel.config.js",
        },
    },
    plugins: [
        "@babel",
        "cypress",
        "disable",
        "import",
        "jest",
        "monorepo",
        "promise",
        "react-native",
    ],
    settings: {
        "import/resolver": {
            alias: {
                map: allAliases,
                extensions: [".ts", ".js", ".jsx", ".json"],
            },
        },
    },
    env: {
        "cypress/globals": true,
        node: true,
        browser: true,
    },
    globals: {
        // `no-undef` doesn't support `globalThis`, for details see
        // https://github.com/eslint/eslint/issues/15199.
        globalThis: false, // means it isn't writeable
    },
    overrides: [
        {
            files: ["**/__tests__/*.test.js"],
            rules: {
                "max-lines": "off",
            },
        },
        {
            files: ["testing/*"],
            rules: {
                "import/no-relative-packages": "off",
                "import/no-commonjs": "off",
            },
        },
        {
            files: ["config/test/*"],
            rules: {
                "import/no-relative-packages": "off",
                "import/no-commonjs": "off",
            },
        },
        {
            files: [
                "*.stories.jsx",
                "*.stories.js",
                "*test.js",
                "*test.jsx",
                "*.cypress.jsx",
                "*.cypress.js",
            ],
            rules: {
                "import/no-relative-packages": "off",
            },
        },
        {
            files: ["utils/**"],
            rules: {
                "import/no-commonjs": "off",
                "testing-library/no-debugging-utils": "off",
                "no-console": "off",
            },
        },
    ],
    rules: {
        "max-lines": "off",
        "new-cap": "off",
        "no-invalid-this": "off",
        "object-curly-spacing": "off",
        semi: "off",
        // "@babel/new-cap": "error",
        "@babel/no-invalid-this": "error",
        "@babel/object-curly-spacing": "error",
        "@babel/semi": "error",
        "flowtype/no-types-missing-file-annotation": "error",
        // "flowtype/no-existential-type": "error",
        // "import/no-default-export": "error",
        "import/no-unresolved": "error",
        "import/named": "error",
        "import/default": "error",
        "import/namespace": "error",
        "import/no-absolute-path": "error",
        "import/no-self-import": "error",
        "import/no-useless-path-segments": "error",
        "import/no-named-as-default": "error",
        "import/no-named-as-default-member": "error",
        "import/no-deprecated": "error",
        "import/no-commonjs": "error",
        // "import/first": "error",
        "import/no-duplicates": "error",
        "import/order": [
            "error",
            {
                alphabetize: {
                    order: "asc",
                },
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "type",
                ],
                "newlines-between": "always",
            },
        ],
        "import/newline-after-import": "error",
        "import/no-unassigned-import": [
            "error",
            {
                allow: [
                    "**/*.css",
                    "**/*.less",
                    "@testing-library/jest-dom",
                    "@testing-library/jest-dom/extend-expect",
                    "jest-enzyme",
                    "whatwg-fetch",
                ],
            },
        ],
        "import/no-named-default": "error",
        "import/no-relative-packages": "error",
        "import/extensions": [
            "error",
            "always",
            {
                ignorePackages: true,
            },
        ],
        "jest/no-focused-tests": "error",
        // "promise/always-return": "error",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        // "promise/catch-or-return": "error",
        "promise/no-new-statics": "error",
        "promise/no-return-in-finally": "error",
        "monorepo/no-internal-import": "error",
        "import/no-restricted-paths": [
            "error",
            {
                zones: [
                    {
                        target: "./packages/(?!.*test.js).*",
                        from: "utils",
                    },
                ],
            },
        ],
        "react/sort-comp": [
            "error",
            {
                // TODO(kevinb): specify where "constructor" should go
                order: [
                    "type-annotations",
                    "static-variables",
                    "static-methods",
                    "lifecycle",
                    "everything-else",
                    "render",
                ],
            },
        ],

        // react-native
        "react-native/no-unused-styles": "error",

        // testing-library
        "testing-library/prefer-user-event": "error",
        "testing-library/no-wait-for-empty-callback": "error",
        "testing-library/no-wait-for-multiple-assertions": "error",
        "testing-library/no-wait-for-side-effects": "error",
        "testing-library/no-wait-for-snapshot": "error",

        // These rules results in a lot of false positives
        "testing-library/render-result-naming-convention": "off",
        "testing-library/await-async-utils": "off",
        "testing-library/await-async-query": "off",
    },
};
