module.exports = {
    verbose: true,
    testMatch: ["**/test/*_spec.js"],
    setupFilesAfterEnv: [
        "./node_modules/jest-enzyme/lib/index.js",
        "<rootDir>/jest.setup.js",
    ],
};
