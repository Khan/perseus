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
import {verifyCatalogHashes} from "./internal/verify-catalog-hashes";

fg(path.join(__dirname, "..", "packages", "*", "package.json")).then(
    (pkgPaths) => {
        let allPassed = true;

        for (const pkgPath of pkgPaths) {
            const pkgJson = require(path.relative(__dirname, pkgPath));
            if (
                !checkPrivate(pkgJson) &&
                !checkPublishConfig(pkgJson) &&
                !checkEntrypoints(pkgJson) &&
                !checkSource(pkgJson)
            ) {
                allPassed = false;
            }
        }

        // Verify catalog hashes are up-to-date
        console.log("\n🔍 Verifying catalog hashes...");
        const catalogHashResult = verifyCatalogHashes();
        if (!catalogHashResult.success) {
            console.error("\n❌ Catalog hash verification failed:\n");
            for (const error of catalogHashResult.errors) {
                console.error(`  - ${error}`);
            }
            console.error("\nTo fix, run: pnpm update-catalog-hashes\n");
            allPassed = false;
        } else {
            console.log("✅ All catalog hashes are up-to-date");
        }

        // Exit only after we've processed all the packages.
        if (!allPassed) {
            process.exit(1);
        }
    },
);
