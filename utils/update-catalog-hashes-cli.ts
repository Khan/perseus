#!/usr/bin/env -S node -r @swc-node/register
/**
 * CLI script to update catalog hashes in package.json files.
 *
 * This script updates the 'catalogHash' field in package.json files for published
 * packages when their catalog dependencies have changed. This helps ensure that
 * packages are rebuilt when their catalog dependencies are updated, even if the
 * package itself hasn't changed.
 */
import process from "node:process";

import {updateCatalogHashes} from "./internal/update-catalog-hashes";

function printHelp() {
    console.log("Usage: update-catalog-hashes-cli.ts [options]");
    console.log("");
    console.log("Updates catalog hashes in package.json files");
    console.log("");
    console.log("Options:");
    console.log(
        "  --dry-run    Show what would be updated without making changes",
    );
    console.log(
        "  --verbose    Show detailed information about catalog dependencies",
    );
    console.log("  --help       Show this help message");
    console.log("");
}

function main(argv: string[]) {
    const args = argv.slice(2);

    if (args.includes("--help") || args.includes("-h")) {
        printHelp();
        process.exit(0);
    }

    const isDryRun = args.includes("--dry-run");
    const verbose = args.includes("--verbose");

    try {
        updateCatalogHashes(isDryRun, verbose);
    } catch (error) {
        console.error(
            `‼️ Unexpected error: ${error instanceof Error ? error.stack ?? error : error}`,
        );
        process.exit(1);
    }
}

main(process.argv);
