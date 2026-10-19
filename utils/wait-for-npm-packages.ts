#!/usr/bin/env -S node -r @swc-node/register
/**
 * Waits until every given package version can be installed from npm.
 *
 * Newly published packages can take several minutes to become available for
 * install from npm, so we wait before announcing a release or snapshot.
 *
 * Usage: wait-for-npm-packages.ts '<json>'
 *
 * <json> is an array of `{"name": "...", "version": "..."}` objects, the
 * shape of the changesets/action `publishedPackages` output.
 *
 * Exits non-zero if any version isn't installable within the timeout.
 */
import process from "node:process";

import {
    parsePublishedPackages,
    waitForNpmPackages,
} from "./internal/wait-for-npm-packages";

const TIMEOUT_MS = 15 * 60 * 1000;

async function main(argv: string[]) {
    if (argv.length !== 1) {
        console.error("Usage: wait-for-npm-packages.ts '<json>'");
        process.exit(2);
    }

    const packages = parsePublishedPackages(argv[0]);
    console.log(
        `Waiting for ${packages.length} package(s) to be installable ` +
            "from npm...",
    );

    const pending = await waitForNpmPackages(packages, TIMEOUT_MS);
    if (pending.length > 0) {
        console.error(
            `❌ Timed out after ${TIMEOUT_MS / 60_000} minutes. ` +
                "Not yet installable: " +
                pending.map((pkg) => `${pkg.name}@${pkg.version}`).join(", "),
        );
        process.exit(1);
    }

    console.log("All packages are installable.");
}

main(process.argv.slice(2)).catch((error) => {
    console.error(error);
    process.exit(1);
});
