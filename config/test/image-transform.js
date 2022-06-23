// @no-flow

const path = require("path");

const createCacheKeyFunction =
    require("@jest/create-cache-key-function").default;

// See https://jestjs.io/docs/next/code-transformation#transforming-images-to-their-path
module.exports = {
    process(sourceText, sourcePath, options) {
        return {
            code: `module.exports = "mocked-image/${path.basename(
                sourcePath,
            )}";`,
        };
    },
    getCacheKey: createCacheKeyFunction([__filename]),
};
