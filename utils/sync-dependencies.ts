#!/usr/bin/env -S node -r @swc-node/register
/**
 * A script that syncs the version of all Wonder Blocks and Wonder Stuff
 * packages in this repo using the given `pnpm-workspace.yaml` file as a reference.
 * This helps with the task of keeping Perseus' peer dependencies in line with
 * the khan/frontend host application.
 */

import {spawnSync} from "node:child_process";
import fs from "node:fs";

import semver from "semver";
import yaml from "yaml";

function printHelp() {
    console.log("--- Package Dependency Sync ---");

    console.log(`
    This tool synchronizes all dev and peer dependencies of all Perseus
    packages. These dependencies are managed as a unit within a pnpm catalog
    (http://pnpm.io/catalogs). See the 'pnpm-workspace.yaml' file in this repo.

    This tool expects to be provided with a path to a client
    pnpm-workspace.yaml that defines the version of each of Perseus' peer and
    dev dependencies. Typically, this would be the pnpm-workspace.yaml file
    from the hosting web application (ie. khan/frontend).
`);
    console.log("usage: sync-dependencies <pnpm-workspace.yaml>");
}

function dedent(s: string): string {
    return s
        .trimStart()
        .split("\n")
        .map((line) => line.trimStart())
        .join("\n");
}

class Catalog {
    constructor(private packages: Record<string, string>) {}

    has(packageName: string): boolean {
        return Object.prototype.hasOwnProperty.call(this.packages, packageName);
    }

    minimumVersionOf(packageName: string): string {
        if (!this.has(packageName)) {
            throw new Error(
                `Can't get min version of '${packageName}'; package is not in the catalog`,
            );
        }
        const versionRange = this.packages[packageName];
        const minVersion = semver.minVersion(versionRange)?.version;
        if (!minVersion) {
            throw new Error(
                `Can't get min version of '${packageName}'; version range '${versionRange}' has no minimum`,
            );
        }
        return minVersion;
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
    const clientPnpmWorkspaceYamlPath = args[0];

    const clientWorkspace = yaml.parse(
        fs.readFileSync(clientPnpmWorkspaceYamlPath, "utf-8"),
    );

    const clientCatalog = new Catalog(clientWorkspace.catalog);

    const ourWorkspace = yaml.parse(
        fs.readFileSync("pnpm-workspace.yaml", "utf-8"),
    );

    const ourPeerDeps: string[] = Object.keys(ourWorkspace.catalogs.peerDeps);
    const ourDevDeps: string[] = Object.keys(ourWorkspace.catalogs.devDeps);

    // In our peer dependencies, declare that Perseus will work with any
    // package version compatible with the one we install in dev.
    for (const pkgName of ourPeerDeps) {
        if (!clientCatalog.has(pkgName)) {
            // TODO(benchristel): throw an error here instead of ignoring the
            // package. If the client doesn't provide a package that we need as
            // a peer dep, it's not safe to deploy Perseus!
            continue;
        }
        ourWorkspace.catalogs.peerDeps[pkgName] =
            `^${clientCatalog.minimumVersionOf(pkgName)}`;
    }

    // In development, install the minimum version of each package
    // required by the client application. This ensures we don't
    // accidentally depend on features of the package added after that
    // version.
    for (const pkgName of ourDevDeps) {
        if (!clientCatalog.has(pkgName)) {
            continue;
        }
        ourWorkspace.catalogs.devDeps[pkgName] =
            clientCatalog.minimumVersionOf(pkgName);
    }

    const comment = dedent(`
        # NOTE: The \`devDeps\` and \`peerDeps\` catalogs in this file are
        # generated from khan/frontend's pnpm-workspace.yaml. To update them, run:
        #
        #     utils/sync-dependencies.ts ../frontend/pnpm-workspace.yaml
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
        comment + yaml.stringify(ourWorkspace, {indent: 4}),
        {
            encoding: "utf-8",
        },
    );

    process.stderr.write("> pnpm install\n");
    spawnSync("pnpm", ["install"], {stdio: "inherit"});
}

main(process.argv);
