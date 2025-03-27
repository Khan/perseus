/* eslint-disable import/no-commonjs */
/**
 * This is the main jest config.
 */
const fs = require("node:fs");
const path = require("node:path");

const ancesdir = require("ancesdir");
const fg = require("fast-glob");

const root = ancesdir(__dirname);
const vendorMap = fg
    .globSync(path.join(root, "vendor/*/package.json"))
    .reduce((map, pkgJsonPath) => {
        const pkgJson = require(pkgJsonPath);
        const packageDirName = path.basename(path.dirname(pkgJsonPath));
        return {
            ...map,
            [`^${pkgJson.name}$`]: `<rootDir>/vendor/${packageDirName}/${pkgJson.main}`,
        };
    }, {});

const pkgMap = fg
    .globSync(path.join(root, "packages/*/package.json"))
    .reduce((map, pkgJsonPath) => {
        const pkgJson = require(pkgJsonPath);
        const packageDirName = path.basename(path.dirname(pkgJsonPath));
        return {
            ...map,
            // NOTE(kevinb): we use the 'source' field here so that we can run our
            // tests without having to compile all of the packages first.
            [`^${pkgJson.name}$`]: `<rootDir>/packages/${packageDirName}/${pkgJson.exports["."].source.slice(2)}`,
        };
    }, {});

// NOTE: We need to use this plugin in order to turn the module exports
// into module.exports. This will make it so that we can mock exports
// correctly.
const swcrc = JSON.parse(fs.readFileSync(path.join(root, ".swcrc"), "utf8"));
// Check it out - Nullish coalescing _assignment_!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment
swcrc.jsc ??= {};
swcrc.jsc.experimental ??= {};
swcrc.jsc.experimental.plugins ??= [];
swcrc.jsc.experimental.plugins.push(["swc_mut_cjs_exports", {}]);

/** @type {import('jest').Config} */
module.exports = {
    setupFiles: [],
    transform: {
        "^.+\\.(j|t)sx?$": ["@swc/jest", swcrc],
        // Compile .svg files using a custom transformer that returns the
        // basename of the file being transformed.
        "^.+.svg$": "<rootDir>/config/test/svg.transform.js",
        // This is needed to pull in the class names from CSS Modules files.
        // Otherwise, they just show up as undefined, which prevents unit testing.
        "^.+\\.module\\.css$": "jest-css-modules-transform",
    },
    // Allow transforming files imported from @phosphor-icons/core.
    // This is required by the .svg transform above.
    transformIgnorePatterns: ["/node_modules/.pnpm/(?!@phosphor-icons.core@)"],
    restoreMocks: true,
    resetMocks: true,
    testEnvironment: "jsdom",
    testMatch: [
        "<rootDir>/**/*.test.js",
        "<rootDir>/**/*.test.jsx",
        "<rootDir>/**/*.test.ts",
        "<rootDir>/**/*.test.tsx",
    ],
    setupFilesAfterEnv: [
        "<rootDir>/config/test/test-setup.ts",
        "<rootDir>/config/test/custom-matchers.ts",
        "<rootDir>/config/test/crypto-polyfill.js",
    ],
    moduleNameMapper: {
        ...pkgMap,
        ...vendorMap,
        // Load a .js file with no exports whenever a .css file is requested.
        "(?<!\\.module)\\.css$": "<rootDir>/config/test/style-mock.js",
    },
    coverageDirectory: "<rootDir>/coverage/jest/",
    collectCoverageFrom: [
        "packages/*/src/**/*.js",
        "packages/*/src/**/*.jsx",
        "packages/*/src/**/*.ts",
        "packages/*/src/**/*.tsx",
        "!packages/*/node_modules/",
        "!**/__tests__/**",
        "!**/__docs__/**",
        "!**/__stories__/**",
        "!**/*.stories.tsx",
        "!**/*.testdata.ts",
    ],
    coverageProvider: "v8",
};
