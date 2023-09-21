/* eslint-disable import/no-commonjs */
/**
 * This is the main jest config.  It runs tests using the default
 * test environment: jest-environment-node.
 */
const fs = require("fs");
const path = require("path");

const ancesdir = require("ancesdir");

const root = ancesdir(__dirname);
const vendorMap = fs
    .readdirSync(path.join(root, "vendor"))
    .reduce((map, name) => {
        const pkgJson = JSON.parse(
            fs.readFileSync(path.join(root, "vendor", name, "package.json")),
        );
        return {
            ...map,
            [`^${name}$`]: `<rootDir>/vendor/${name}/${pkgJson.main}`,
        };
    }, {});

const pkgMap = fs
    .readdirSync(path.join(root, "packages"))
    .filter((name) => {
        const stat = fs.statSync(path.join(root, "packages", name));
        return stat.isDirectory();
    })
    .reduce((map, name) => {
        const pkgJson = JSON.parse(
            fs.readFileSync(path.join(root, "packages", name, "package.json")),
        );
        return {
            ...map,
            // NOTE(kevinb): we use the 'source' field here so that we can run our
            // tests without having to compile all of the packages first.
            [`^@khanacademy/${name}$`]: `<rootDir>/packages/${name}/${pkgJson.source}`,
        };
    }, {});

module.exports = {
    rootDir: path.join(__dirname, "../../"),
    transform: {
        "^.+\\.(j|t)sx?$": "<rootDir>/config/test/test.transform.js",
    },
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
        "jest-extended/all",
        "<rootDir>/config/test/test-setup.ts",
        "<rootDir>/config/test/custom-matchers.ts",

        // TODO(LP-11633) math-input uses these matchers. We can remove this
        // once we transition these tests to RTL
        "<rootDir>/node_modules/jest-enzyme/lib/index.js",
    ],
    moduleNameMapper: {
        ...pkgMap,
        ...vendorMap,
        // Load a .js file with no exports whenever a .css or .less file is requested.
        "\\.(css|less)$": "<rootDir>/config/test/style-mock.js",
    },
    collectCoverageFrom: [
        "packages/*/src/**/*.js",
        "packages/*/src/**/*.jsx",
        "packages/*/src/**/*.ts",
        "packages/*/src/**/*.tsx",
        "!packages/*/node_modules/",
        "!**/__tests__/**",
        "!**/__stories__/**",
        "!**/*.stories.tsx",
    ],
    coverageProvider: "v8",
    // Only output log messages on test failure. From:
    // https://github.com/facebook/jest/issues/4156#issuecomment-490764080
    // reporters: ["<rootDir>/config/test/log-on-fail-reporter.js"],
};
