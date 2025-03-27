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

function isFalsey(value: unknown): boolean {
    return !value;
}

const pkgPaths = fg.globSync(
    path.join(__dirname, "..", "packages", "*", "package.json"),
);

const results = pkgPaths.flatMap((pkgPath) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pkgJson = require(pkgPath);
    return [
        checkPrivate(pkgJson),
        checkPublishConfig(pkgJson),
        checkExports(pkgJson),
    ];
});

// Verify catalog hashes are up-to-date
console.log("\n🔍 Verifying catalog hashes...");
const catalogHashResult = verifyCatalogHashes();
const catalogOk = catalogHashResult.success;
if (!catalogOk) {
    console.error("\n❌ Catalog hash verification failed:\n");
    for (const err of catalogHashResult.errors) {
        console.error(`  - ${err}`);
    }
    console.error("\nTo fix, run: pnpm update-catalog-hashes\n");
} else {
    console.log("✅ All catalog hashes are up-to-date");
}

if (results.some(isFalsey) || !catalogOk) {
    process.exit(1);
}
