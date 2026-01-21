/* eslint-disable @typescript-eslint/no-require-imports */
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
        "@khanacademy/eslint-config/a11y",
        "plugin:react/recommended",
        // This config includes rules from storybook to enforce story best
        // practices
        "plugin:storybook/recommended",
        // This config includes rules from @testing-library/jest-dom as well
        "plugin:testing-library/react",
    ],
    parser: "@typescript-eslint/parser",
    plugins: [
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
                project: ["tsconfig.json"],
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
        "jsx-a11y": {
            // Map perseus components to their corresponding DOM elements. This
            // helps eslint-plugin-jsx-a11y understand what the underlying
            // elements are. For more details, see
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y?tab=readme-ov-file#component-mapping
            components: {
                NumericInput: "input",
                ScrolllessNumberTextField: "input",
                BlurInput: "input",
                TextInput: "input",
                NumberInput: "input",
            },
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
                "**/__testutils__/**",
                "**/__stories__/**",
                "**/__docs__/**",
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
                "@typescript-eslint/no-require-imports": "off",
                "import/no-commonjs": "off",
                "import/no-extraneous-dependencies": "off",
                "import/no-relative-packages": "off",
                "no-console": "off",
                "testing-library/no-debugging-utils": "off",
            },
        },
        {
            files: ["score-*.ts"],
            rules: {
                "no-restricted-syntax": [
                    "error",
                    {
                        selector:
                            "ImportDeclaration > ImportSpecifier[local.name='APIOptions']",
                        message:
                            "APIOptions is not available and should not be imported in scoring functions.",
                    },
                    {
                        selector: "ImportDeclaration[source.value='react']",
                        message:
                            "React is not available and should not be imported in scoring functions.",
                    },
                ],
            },
        },
        {
            /**
             * .typetest.ts files are used to do "type testing" :mindblown:
             * It is common practice in these files to declare variables and
             * expressions that are never used.
             */
            files: ["*.typetest.ts"],
            rules: {
                "@typescript-eslint/no-unused-vars": "off",
                "@typescript-eslint/no-unused-expressions": "off",
            },
        },
        {
            files: ["*.ts", "*.tsx"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                project: ["tsconfig.json"],
            },
            rules: {
                "@typescript-eslint/strict-boolean-expressions": [
                    "error",
                    {
                        allowNumber: false, // Prevents using numbers as booleans (if (0))
                        allowAny: true, // Allow any type to bypass the rule
                        allowNullableBoolean: true, // Allow nullable booleans in conditionals (e.g., `null` or `undefined`)
                        allowNullableString: true,
                        allowNullableNumber: true,
                    },
                ],
            },
            excludedFiles: ["*.d.ts", "*.config.ts", "**/*.cypress.ts"],
        },
    ],
    rules: {
        "new-cap": "off",
        "no-invalid-this": "off", // @typescript-eslint/no-invalid-this supersedes it
        "no-unused-expressions": "off", // @typescript-eslint/no-unused-expression supersedes it
        "object-curly-spacing": "off",
        semi: "off",

        "no-alert": "error",

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
        // "import/no-unresolved": "error",
        "import/no-extraneous-dependencies": "error",
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
        "no-restricted-properties": [
            "error",
            {
                object: "Math",
                property: "random",
                message:
                    "Use seeded randomness. See: https://khanacademy.atlassian.net/browse/LEMS-3397",
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
        "react/no-string-refs": "off", // on in react/recommended, but we have #legacy-code
        "react/no-find-dom-node": "off", // on in react/recommended, but we have #legacy-code
        // On in react/recommended, but doesn't seem helpful
        // (requires quotes to be escaped to catch developer mistakes when other characters are misplaced)
        "react/no-unescaped-entities": "off",
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
        "@typescript-eslint/no-invalid-this": "error",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/consistent-type-imports": [
            "error",
            {
                prefer: "type-imports",
                fixStyle: "separate-type-imports",
            },
        ],
        "@typescript-eslint/no-restricted-imports": [
            "error",
            "@khanacademy/wonder-blocks-color",
            "@khanacademy/wonder-blocks-spacing",
        ],
    },
};
