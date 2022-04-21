/* eslint-disable import/no-commonjs */
/**
 * This is the main jest config.  It runs tests using the default
 * test environment: jest-environment-node.
 */
const path = require("path");

module.exports = {
    rootDir: path.join(__dirname, "../../"),
    transform: {
        "^.+\\.jsx?$": "<rootDir>/config/test/test.transform.js",
    },
    restoreMocks: true,
    resetMocks: true,
    testEnvironment: "jest-environment-node",
    testMatch: ["<rootDir>/**/*.test.js"],
    setupFilesAfterEnv: [
        "jest-extended/all",
        "<rootDir>/config/test/test-setup.js",
    ],
    moduleNameMapper: {
        "^@khanacademy/perseus(.*)$":
            "<rootDir>/packages/perseus$1/src/index.js",
    },
    collectCoverageFrom: [
        "packages/**/*.js",
        "!packages/**/types.js",
        "!packages/**/src/**/index.js",
        "!packages/**/dist/**/*.js",
        "!<rootDir>/node_modules/",
        "!packages/**/node_modules/",
    ],
    // Only output log messages on test failure. From:
    // https://github.com/facebook/jest/issues/4156#issuecomment-490764080
    reporters: ["<rootDir>/config/test/log-on-fail-reporter.js"],
};
