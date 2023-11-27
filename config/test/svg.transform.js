const path = require("path");

/**
 * This is a simple transformer that returns the basename of the file being
 * transformed. This is useful for testing that the correct file is being
 * transformed.
 *
 * For example:
 *
 * Given the following import statement:
 *
 * import CaretDown from "@phosphor-icons/core/fill/caret-down-fill.svg";
 *
 * This transformer will return:
 * module.exports = "caret-down-fill.svg";
 */
module.exports = {
    process(sourceText, sourcePath, options) {
        return {
            code: `module.exports = ${JSON.stringify(
                path.basename(sourcePath),
            )};`,
        };
    },
};
