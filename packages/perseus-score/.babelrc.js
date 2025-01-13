/**
 * HACK(somewhatabstract): Due to https://github.com/facebook/jest/issues/11741,
 * we need to have this file, or updating inline snapshots can fail rather
 * cryptically.
 *
 * We should remove this when jest is fixed.
 */
module.exports = require("../../config/build/babel.config");
