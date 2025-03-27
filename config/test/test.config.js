/* eslint-disable import/no-commonjs */
/**
 * This is the main jest config.
 */
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
console.log(pkgMap);

/** @type {import('jest').Config} */
module.exports = {
    rootDir: path.join(__dirname, "../../"),
    transform: {
        "^.+\\.(j|t)sx?$": "<rootDir>/config/test/test.transform.js",
        // Compile .svg files using a custom transformer that returns the
        // basename of the file being transformed.
        "^.+.svg$": "<rootDir>/config/test/svg.transform.js",
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
    ],
    moduleNameMapper: {
        ...pkgMap,
        ...vendorMap,
        // Load a .js file with no exports whenever a .css or .less file is requested.
        "\\.(css|less)$": "<rootDir>/config/test/style-mock.js",
    },
    coverageDirectory: "<rootDir>/coverage/jest/",
    collectCoverageFrom: [
        "packages/*/src/**/*.js",
        "packages/*/src/**/*.jsx",
        "packages/*/src/**/*.ts",
        "packages/*/src/**/*.tsx",
        "!packages/*/node_modules/",
        "!**/__tests__/**",
        "!**/__stories__/**",
        "!**/*.stories.tsx",
        "!**/*.testdata.ts",
    ],
    coverageProvider: "v8",
    // Only output log messages on test failure. From:
    // https://github.com/facebook/jest/issues/4156#issuecomment-490764080
    // reporters: ["<rootDir>/config/test/log-on-fail-reporter.js"],

    // TODO(LEMS-2858) We turn off Prettier as Prettier v3 is incompatible with
    // Jest v29. Once they release Jest v30 we can switch to that:
    // https://github.com/jestjs/jest/issues/14305
    prettierPath: null,
};
