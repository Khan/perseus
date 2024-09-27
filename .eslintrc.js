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

function banImportExtension(extension) {
    const message = `Unexpected use of file extension (.${extension}) in import`;
    const literalAttributeMatcher = `Literal[value=/\\.${extension}$/]`;
    return [
        {
            // import foo from 'bar.js';
            selector: `ImportDeclaration > ${literalAttributeMatcher}.source`,
            message,
        },
        {
            // const foo = import('bar.js');
            selector: `ImportExpression > ${literalAttributeMatcher}.source`,
            message,
        },
        {
            // type Foo = typeof import('bar.js');
            selector: `TSImportType > TSLiteralType > ${literalAttributeMatcher}`,
            message,
        },
        {
            // const foo = require('foo.js');
            selector: `CallExpression[callee.name = "require"] > ${literalAttributeMatcher}.arguments`,
            message,
        },
    ];
}

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
        "jsdoc",
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
        {
            files: ["*-validator.ts"],
            rules: {
                "no-restricted-syntax": [
                    "error",
                    {
                        selector:
                            "ImportDeclaration > ImportSpecifier[local.name='APIOptions']",
                        message:
                            "APIOptions is not available and should not be imported in validators.",
                    },
                    {
                        selector: "ImportDeclaration[source.value='react']",
                        message:
                            "React is not available and should not be imported in validators.",
                    },
                ],
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
         * jsdoc
         */
        "jsdoc/valid-types": "error",

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
                    "whatwg-fetch",
                ],
            },
        ],
        "import/no-named-default": "error",
        "import/no-relative-packages": "error",
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
            ...banImportExtension("js"),
            ...banImportExtension("jsx"),
            ...banImportExtension("ts"),
            ...banImportExtension("tsx"),
            {
                selector: "TSQualifiedName[left.name='React'][right.name='FC']",
                message:
                    "Use of React.FC<Props> is disallowed, use the following alternative: https://khanacademy.atlassian.net/wiki/spaces/ENG/pages/2201682693/TypeScript+for+Flow+Developers#Functional-Components",
            },
        ],

        /**
         * monorepo
         */
        "monorepo/no-internal-import": "error",

        /**
         * prettier - disabled in CI. W we run prettier manually here as its
         * faster than through ESLint and covers more types of files than
         * ESLint does.
         *
         * For Prettier, we include all files except those in
         * `.prettierignore`.
         * For ESLint we only consider TS/JS files (see `lint` script in
         * package.json).
         */
        "prettier/prettier": [process.env.CI === "true" ? "off" : "error"],

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
        // This rule results in false-positives when using some types of React
        // components (such as functional components or hooks). Since
        // TypeScript is already checking that components are only using props
        // defined in the component's `Props` type.
        "react/prop-types": "off",
        "react/sort-comp": [
            "error",
            {
                // TODO(kevinb): specify where "constructor" should go
                order: [
                    "type-annotations",
                    "static-variables",
                    "instance-variables",
                    "static-methods",
                    "constructor",
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
        "testing-library/await-async-queries": "error",
        "testing-library/prefer-user-event": "error",
        "testing-library/prefer-explicit-assert": "error",

        // These rules results in a lot of false positives
        "testing-library/render-result-naming-convention": "off",

        /**
         * typescript
         */
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/consistent-type-imports": "error",
    },
};
