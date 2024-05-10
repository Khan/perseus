#!/usr/bin/env -S node -r @swc-node/register
/**
 * A script that syncs the version of all Wonder Blocks and Wonder Stuff
 * packages in this repo using the given `package.json` file as a reference.
 * This helps with the task of keeping Perseus' peer dependencies in line with
 * the webapp host application.
 */

import {execSync} from "child_process";
import * as fs from "fs";

function printHelp() {
    console.log("--- Package Dependency Sync ---");

    console.log(`
    This tool synchronizes all dev and peer dependencies found in any
    package.json file in this repo to match the versions listed in the provided
    package.json file. Typically, this would be the package.json file from the
    hosting web application (ie. webapp).
`);
    console.log("usage: sync-peer-dependencies <package.json>");
}

// Package version regexes that we don't want to sync in
const RestrictedPackageVersions = [
    /^link:.*/,
    // We don't use hot-loader/react-dom in Perseus. It's basically
    // identical to 'react-dom' with just a few patches for webpack and we
    // don't use webpack.
    /hot-loader\/react-dom/,
];

// Package names that we don't want to sync in
const RestrictedPackageNames = ["typescript"];

// There are some packages and version number constructs that we don't want to
// bring into Perseus. This function filters out packages by name or version
// that we can't use locally.
function filterUnusableTargetVersions(
    targetVersions: Record<string, string>,
    packagesInThisRepo: ReadonlyArray<string>,
): Record<string, string> {
    return Object.fromEntries(
        Object.entries(targetVersions).filter(
            ([pkgName, pkgVersion]) =>
                !RestrictedPackageVersions.some((r) => r.test(pkgVersion)) &&
                !RestrictedPackageNames.some((name) => name === pkgName) &&
                !packagesInThisRepo.some((name) => name === pkgName),
        ),
    );
}

function syncPackageDependencies(
    targetVersions: Record<string, string>,
    deps?: Record<string, string>,
) {
    if (deps == null) {
        return;
    }

    for (const pkgName of Object.keys(deps)) {
        if (pkgName in targetVersions) {
            deps[pkgName] = targetVersions[pkgName];
        }
    }
}

function main(argv: string[]) {
    // The first arg is the node binary running this script, the second arg is
    // this script itself. So, we strip these two args off so that all that's
    // left are the arguments passed to this script.
    const args = argv.slice(2);
    if (args.length !== 1) {
        printHelp();
        process.exit(1);
    }

    const packageJsonsInRepo = execSync(
        `git ls-files | grep -F "package.json" | grep -F -v "vendor/"`,
    )
        .toString()
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    const packageNamesInRepo = packageJsonsInRepo.map(
        (f) => JSON.parse(fs.readFileSync(f).toString()).name,
    );

    const targetVersions = filterUnusableTargetVersions(
        JSON.parse(fs.readFileSync(args[0]).toString()).dependencies,
        packageNamesInRepo,
    );

    for (const f of packageJsonsInRepo) {
        console.log(`  --> ${f}`);
        const pkg = JSON.parse(fs.readFileSync(f).toString());

        syncPackageDependencies(targetVersions, pkg.peerDependencies);
        syncPackageDependencies(targetVersions, pkg.devDependencies);

        // NOTE: We have to manually make sure there's a newline at end of file!
        fs.writeFileSync(f, JSON.stringify(pkg, undefined, 4) + "\n", {
            encoding: "utf-8",
        });
    }
}

main(process.argv);
