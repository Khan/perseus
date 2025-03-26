#!/usr/bin/env -S node -r @swc-node/register
/**
 * Pre-publish checks to verify that our publish will go smoothly.
 */
import path from "path";

import fg from "fast-glob";

import {
    checkPrivate,
    checkExports,
    checkPublishConfig,
} from "./internal/pre-publish-utils";

const pkgPaths = fg.globSync(
    path.join(__dirname, "..", "packages", "*", "package.json"),
);

let allPassed = true;
for (const pkgPath of pkgPaths) {
    const pkgJson = require(path.relative(__dirname, pkgPath));

    // allPassed is at the end of the chain because of short-circuiting
    allPassed =
        checkPrivate(pkgJson) &&
        checkPublishConfig(pkgJson) &&
        checkExports(pkgJson) &&
        allPassed;
}

// Exit only after we've processed all the packages.
if (!allPassed) {
    process.exit(1);
}
