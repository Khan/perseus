#!/usr/bin/env -S node -r @swc-node/register
/**
 * A script that syncs the version of all Wonder Blocks and Wonder Stuff
 * packages in this repo using the given `package.json` file as a reference.
 * This helps with the task of keeping Perseus' peer dependencies in line with
 * the webapp host application.
 */

import fs from "node:fs";

import yaml from "yaml";

function printHelp() {
    console.log("--- Package Dependency Sync ---");

    console.log(`
    This tool synchronizes all dev and peer dependencies of all Perseus
    packages. These dependencies are managed as a unit within a pnpm catalog
    (http://pnpm.io/catalogs). See the 'pnpm-workspace.yaml' file in this repo.

    This tool expects to be provided with a path to a package.json that defines
    the version of each of Perseus' peer and dev dependencies. Typically, this
    would be the package.json file from the hosting web application
    (ie. webapp).
`);
    console.log("usage: sync-dependencies <package.json>");
}

// Package version regexes that we don't want to sync in
const RestrictedPackageVersions = [
    /^link:.*/,
    // We don't use hot-loader/react-dom in Perseus. It's basically
    // identical to 'react-dom' with just a few patches for webpack and we
    // don't use webpack.
    /hot-loader\/react-dom/,
    // Our pnpm workspace can't reference itself (I don't think)
    // TODO(LEMS-2903): figure out a way to sync peer deps that are
    // set to "workspace:*" in Webapp's package.json
    /workspace/,
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
        Object.entries(targetVersions).filter(([pkgName, pkgVersion]) => {
            // Eliminate packages who's version we don't/can't use.
            if (RestrictedPackageVersions.some((r) => r.test(pkgVersion))) {
                return false;
            }

            // Eliminate packages that we don't want to sync in.
            if (RestrictedPackageNames.includes(pkgName)) {
                return false;
            }

            // Eliminate any packages within this repo - they're managed by
            // our `changeset` tooling.
            if (!packagesInThisRepo.includes(pkgName)) {
                return false;
            }

            return true;
        }),
    );
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

    const workspace = yaml.parse(
        fs.readFileSync("pnpm-workspace.yaml", "utf-8"),
    );
    const packageNamesInRepo = Object.keys(workspace.catalog);

    const targetVersions = filterUnusableTargetVersions(
        JSON.parse(fs.readFileSync(args[0]).toString()).dependencies,
        packageNamesInRepo,
    );

    for (const pkgName of packageNamesInRepo) {
        if (pkgName in targetVersions) {
            // TODO(LEMS-3083): Remove eslint suppression
            // eslint-disable-next-line functional/immutable-data
            workspace.catalog[pkgName] = targetVersions[pkgName];
        }
    }

    fs.writeFileSync(
        "pnpm-workspace.yaml",
        yaml.stringify(workspace, {indent: 4}),
        {
            encoding: "utf-8",
        },
    );
}

main(process.argv);
