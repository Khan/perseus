/**
 * Pre-publish checks to verify that our publish will go smoothly.
 */
const path = require("path");

const fg = require("fast-glob");

const {
    checkPrivate,
    checkEntrypoints,
    checkSource,
    checkPublishConfig,
} = require("./internal/pre-publish-utils");

// eslint-disable-next-line promise/catch-or-return
fg(path.join(__dirname, "..", "packages", "*", "package.json")).then(
    (pkgPaths) => {
        // eslint-disable-next-line promise/always-return
        for (const pkgPath of pkgPaths) {
            const pkgJson = require(path.relative(__dirname, pkgPath));

            if (!checkPrivate(pkgJson)) {
                checkPublishConfig(pkgJson);
                checkEntrypoints(pkgJson);
                checkSource(pkgJson);
            }
        }
    },
);
