/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
const fs = require("fs");
const path = require("path");

const pkgNames = fs
    .readdirSync(path.join(__dirname, "packages"))
    .filter((name) => name !== ".DS_Store");

const pkgAliases = pkgNames.map((pkgName) => {
    return [`@khanacademy/${pkgName}`, `./packages/${pkgName}/src/index.js`];
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
    parserOptions: {
        babelOptions: {
            configFile: path.join(__dirname, "./config/build/babel.config.js"),
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
        "react",
        "react-hooks",
        "react-native",
    ],
    settings: {
        "import/resolver": {
            typescript: {
                project: [
                    "packages/*/tsconfig.json",
                    "packages/tsconfig-shared.json",
                ],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                moduleDirectory: ["node_modules"],
            },
            node: {
                project: [
                    "packages/*/tsconfig.json",
                    "packages/tsconfig-shared.json",
                ],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                moduleDirectory: ["node_modules"],
            },
            alias: {
                map: allAliases,
                extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
            },
        },
        react: {
            version: "detect",
        },
    },
    env: {
        "cypress/globals": true,
        "jest/globals": false,
        node: true,
        browser: true,
    },
    globals: {
        // `no-undef` doesn't support `globalThis`, for details see
        // https://github.com/eslint/eslint/issues/15199.
        globalThis: false, // means it isn't writeable
        // from node_modules/@types/react/index.d.ts
        JSX: false,
        // from lib.dom.d.t.s
        ClientRect: false,
        WindowProxy: false,
        // from types/utility.d.ts
        Empty: false,
        SpreadType: false,
    },
    overrides: [
        {
            files: [
                "*.cypress.tsx",
                "*.cypress.ts",
                "*.test.ts",
                "*.test.tsx",
                "*.stories.ts",
                "*.stories.tsx",
            ],
            rules: {
                "max-lines": "off",
                "import/no-extraneous-dependencies": "off",
                "import/no-relative-packages": "off",
            },
        },
        {
            files: ["config/**", "utils/**", "testing/*"],
            rules: {
                "@typescript-eslint/no-var-requires": "off",
                "import/no-commonjs": "off",
                "import/no-extraneous-dependencies": "off",
                "import/no-relative-packages": "off",
                "no-console": "off",
                "testing-library/no-debugging-utils": "off",
            },
        },
    ],
    rules: {
        "max-lines": "off",
        "new-cap": "off",
        "no-invalid-this": "off",
        "@typescript-eslint/no-this-alias": "off",
        "no-unused-expressions": "off",
        "object-curly-spacing": "off",
        semi: "off",

        /**
         * @babel
         */
        // "@babel/new-cap": "error",
        "@babel/no-invalid-this": "error",
        "@babel/object-curly-spacing": "error",
        "@babel/semi": "error",

        /**
         * jest
         */
        "jest/no-focused-tests": "error",

        /**
         * import
         */
        // "import/no-default-export": "error",
        "import/no-unresolved": "error",
        // NOTE(kevinb): This rule is confused by third-party TypeScript lib defs
        "import/named": "off",
        "import/default": "error",
        "import/namespace": "error",
        "import/no-absolute-path": "error",
        "import/no-self-import": "error",
        "import/no-useless-path-segments": "error",
        "import/no-named-as-default": "error",
        // NOTE(kevinb): This rule is causes issues with some uses of 'prop-types'
        "import/no-named-as-default-member": "off",
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
        "import/extensions": ["error", "never"],
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
        "no-restricted-syntax": [
            "error",
            {
                selector:
                    "MemberExpression[property.name='render'][object.name='ReactDOM']",
                message: "DEPRECATED: Use a React Portal instead.",
            },
        ],

        /**
         * monorepo
         */
        "monorepo/no-internal-import": "error",

        /**
         * promise
         */
        // "promise/always-return": "error",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        // "promise/catch-or-return": "error",
        "promise/no-new-statics": "error",
        "promise/no-return-in-finally": "error",

        /**
         * react
         */
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

        /**
         * react-hooks
         */
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",

        /**
         * react-native
         */
        "react-native/no-unused-styles": "error",

        /**
         * testing-library
         */
        "testing-library/prefer-user-event": "error",
        "testing-library/no-wait-for-empty-callback": "error",
        "testing-library/no-wait-for-multiple-assertions": "error",
        "testing-library/no-wait-for-side-effects": "error",
        "testing-library/no-wait-for-snapshot": "error",

        // These rules results in a lot of false positives
        "testing-library/render-result-naming-convention": "off",
        "testing-library/await-async-utils": "off",
        "testing-library/await-async-query": "off",

        /**
         * typescript
         */
        "@typescript-eslint/no-empty-function": "off",
    },
};
