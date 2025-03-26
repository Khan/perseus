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
import {verifyCatalogHashes} from "./internal/verify-catalog-hashes";

const pkgPaths = fg.globSync(
    path.join(__dirname, "..", "packages", "*", "package.json"),
);

let allPassed = true;
for (const pkgPath of pkgPaths) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pkgJson = require(pkgPath);

    allPassed =
        checkPrivate(pkgJson) &&
        checkPublishConfig(pkgJson) &&
        checkExports(pkgJson) &&
        allPassed;
}

// Verify catalog hashes are up-to-date
console.log("\n🔍 Verifying catalog hashes...");
const catalogHashResult = verifyCatalogHashes();
if (!catalogHashResult.success) {
    console.error("\n❌ Catalog hash verification failed:\n");
    for (const err of catalogHashResult.errors) {
        console.error(`  - ${err}`);
    }
    console.error("\nTo fix, run: pnpm update-catalog-hashes\n");
    allPassed = false;
} else {
    console.log("✅ All catalog hashes are up-to-date");
}

if (!allPassed) {
    process.exit(1);
}
