/* eslint-disable import/no-commonjs */
module.exports = {
    extends: ["@khanacademy"],
    parser: "@babel/eslint-parser",
    parserOptions: {
        babelOptions: {
            configFile: "./config/build/babel.config.js",
        },
    },
    plugins: ["@babel", "import", "jest", "promise", "monorepo", "disable"],
    settings: {
        "eslint-plugin-disable": {
            paths: {
                react: ["./*.js", "src/*.js"],
                "jsx-a11y": ["./*.js", "src/*.js"],
            },
        },
    },
    globals: {
        __IS_BROWSER__: "readonly",
    },
    overrides: [
        {
            files: ["utils/*.js"],
            rules: {
                "import/no-commonjs": "off",
            },
        },
        {
            files: ["**/__tests__/*.test.js"],
            rules: {
                "max-lines": "off",
            },
        },
        {
            files: ["**/bin/**/*.js"],
            rules: {
                "no-console": "off",
            },
        },
    ],
    rules: {
        "new-cap": "off",
        "no-invalid-this": "off",
        "object-curly-spacing": "off",
        semi: "off",
        "@babel/new-cap": "error",
        "@babel/no-invalid-this": "error",
        "@babel/object-curly-spacing": "error",
        "@babel/semi": "error",
        "flowtype/no-types-missing-file-annotation": "error",
        "flowtype/no-existential-type": "error",
        "import/no-default-export": "error",
        "import/no-unresolved": "error",
        "import/named": "error",
        "import/default": "error",
        "import/no-absolute-path": "error",
        "import/no-self-import": "error",
        "import/no-useless-path-segments": "error",
        "import/no-named-as-default": "error",
        "import/no-named-as-default-member": "error",
        "import/no-deprecated": "error",
        "import/no-commonjs": "error",
        "import/first": "error",
        "import/no-duplicates": "error",
        "import/order": [
            "error",
            {
                groups: ["builtin", "external"],
            },
        ],
        "import/newline-after-import": "error",
        "import/no-unassigned-import": "error",
        "import/no-named-default": "error",
        "import/extensions": [
            "error",
            "always",
            {
                ignorePackages: true,
            },
        ],
        "jest/no-focused-tests": "error",
        "promise/always-return": "error",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        "promise/catch-or-return": "error",
        "promise/no-new-statics": "error",
        "promise/no-return-in-finally": "error",
        "monorepo/no-internal-import": "error",
        "monorepo/no-relative-import": "error",
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
    },
};
