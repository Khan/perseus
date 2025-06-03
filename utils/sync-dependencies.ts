#!/usr/bin/env -S node -r @swc-node/register
/**
 * A script that syncs the version of all Wonder Blocks and Wonder Stuff
 * packages in this repo using the given `package.json` file as a reference.
 * This helps with the task of keeping Perseus' peer dependencies in line with
 * the webapp host application.
 */

import fs from "node:fs";

import semver from "semver";
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

type Primitive = string | number | boolean | null | undefined;

function unique<T extends Primitive>(array: readonly T[]): T[] {
    return [...new Set(array)];
}

function dedent(s: string): string {
    return s
        .trimStart()
        .split("\n")
        .map((line) => line.trimStart())
        .join("\n");
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
    const clientPackageJson = args[0];

    const workspace = yaml.parse(
        fs.readFileSync("pnpm-workspace.yaml", "utf-8"),
    );
    const packageNamesInRepo = unique(
        Object.values(workspace.catalogs).flatMap(Object.keys),
    );

    const targetVersions = filterUnusableTargetVersions(
        JSON.parse(fs.readFileSync(clientPackageJson).toString()).dependencies,
        packageNamesInRepo,
    );

    for (const pkgName of packageNamesInRepo) {
        if (pkgName in targetVersions) {
            const minVersion = semver.minVersion(
                targetVersions[pkgName],
            ).version;
            // In development, install the minimum version of each package
            // required by the client application. This ensures we don't
            // accidentally depend on features of the package added after that
            // version.
            workspace.catalogs.devDeps[pkgName] = minVersion;
            // In our peer dependencies, declare that Perseus will work with
            // any package version compatible with the one we install in dev.
            workspace.catalogs.peerDeps[pkgName] = `^${minVersion}`;
        }
    }

    // TODO(LEMS-3169): update the path to services/static/package.json to the
    // new location, once the frontend moves to its own repo.
    const comment = dedent(`
        # NOTE: The \`devDeps\` and \`peerDeps\` catalogs in this file are
        # generated from webapp's package.json. To update them, run:
        #
        #     utils/sync-dependencies.ts ../webapp/services/static/package.json
        #
        # We have two separate catalogs for dev deps and peer deps to ensure
        # that:
        #
        # - we know exactly which version of each package we're installing in
        #   dev. That way, we can truthfully claim to support all versions
        #   compatible with that one.
        # - our peer dependencies can specify a range of versions. For peer
        #   deps, want to accept any version compatible with the one we
        #   installed in dev. For example, if we installed version 1.2.3 in
        #   dev, then we want to accept ^1.2.3 (which means "any 1.x.x version
        #   equal to or later than 1.2.3") as a peer dep. We want peer deps
        #   to be specified as a range so clients don't get spurious warnings
        #   if their dependency versions are slightly different than the ones
        #   we use.
        #
        # The sync-dependencies.ts script ensures that peer deps are always
        # specified as a range, and the dev deps are always pinned to the
        # version at the bottom of that range.
    `);

    fs.writeFileSync(
        "pnpm-workspace.yaml",
        comment + yaml.stringify(workspace, {indent: 4}),
        {
            encoding: "utf-8",
        },
    );
}

main(process.argv);
