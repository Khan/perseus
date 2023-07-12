#!/usr/bin/env -S node -r @swc-node/register
/**
 * Pre-publish checks to verify that our publish will go smoothly.
 */
import path from "path";

import fg from "fast-glob";

import {
    checkPrivate,
    checkEntrypoints,
    checkSource,
    checkPublishConfig,
} from "./internal/pre-publish-utils";

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
