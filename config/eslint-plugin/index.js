// @ts-check
/**
 * ESLint rules specific to the Perseus repo. This package is private and is
 * only used by the repo's own ESLint config, where it's referenced as
 * `@internal/perseus`.
 */
module.exports = {
    rules: {
        "no-adjacent-text-nodes": require("./rules/no-adjacent-text-nodes"),
    },
};
