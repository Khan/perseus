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

function isFalsey(value: unknown): boolean {
    return !value;
}

const pkgPaths = fg.globSync(
    path.join(__dirname, "..", "packages", "*", "package.json"),
);

const results = pkgPaths.flatMap((pkgPath) => {
    const pkgJson = require(path.relative(__dirname, pkgPath));

    // allPassed is at the end of the chain because of short-circuiting
    return [
        checkPrivate(pkgJson),
        checkPublishConfig(pkgJson),
        checkExports(pkgJson),
    ];
});

// Exit only after we've processed all the packages.
if (!results.some(isFalsey)) {
    process.exit(1);
}
