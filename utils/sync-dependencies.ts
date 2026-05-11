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

import {updateCatalogHashes} from "./internal/update-catalog-hashes";

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

function getCatalogMap(doc: yaml.Document, catalogName: string): yaml.YAMLMap {
    const node = doc.getIn(["catalogs", catalogName], true);
    if (!yaml.isMap(node)) {
        throw new Error(
            `Expected \`catalogs.${catalogName}\` to be a YAML map in pnpm-workspace.yaml`,
        );
    }
    return node;
}

function packageNameOf(pair: yaml.Pair<unknown, unknown>): string {
    if (!yaml.isScalar(pair.key) || typeof pair.key.value !== "string") {
        throw new Error(
            `Expected catalog key to be a string scalar; got ${JSON.stringify(pair.key)}`,
        );
    }
    return pair.key.value;
}

function setVersion(pair: yaml.Pair<unknown, unknown>, version: string): void {
    if (!yaml.isScalar(pair.value)) {
        throw new Error(
            `Expected catalog value to be a scalar; got ${JSON.stringify(pair.value)}`,
        );
    }
    pair.value.value = version;
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

    // Parse our workspace as a Document (not a plain object) so that
    // comments — both the file-level header and any inline comments inside
    // `overrides:` etc. — round-trip through this script untouched.
    const ourWorkspace = yaml.parseDocument(
        fs.readFileSync("pnpm-workspace.yaml", "utf-8"),
    );

    const peerDepsMap = getCatalogMap(ourWorkspace, "peerDeps");
    const devDepsMap = getCatalogMap(ourWorkspace, "devDeps");

    // In our peer dependencies, declare that Perseus will work with any
    // package version compatible with the one we install in dev.
    for (const peerDepsMapEntry of peerDepsMap.items) {
        const pkgName = getKey(peerDepsMapEntry);
        if (!clientCatalog.has(pkgName)) {
            throw Error(
                `Perseus needs ${pkgName} as a peer dep, but the client app doesn't provide it`,
            );
        }
        setVersion(pair, `^${clientCatalog.minimumVersionOf(pkgName)}`);
    }

    // In development, install the minimum version of each package
    // required by the client application. This ensures we don't
    // accidentally depend on features of the package added after that
    // version.
    for (const pair of devDepsMap.items) {
        const pkgName = packageNameOf(pair);
        if (!clientCatalog.has(pkgName)) {
            continue;
        }
        setVersion(pair, clientCatalog.minimumVersionOf(pkgName));
    }

    fs.writeFileSync(
        "pnpm-workspace.yaml",
        ourWorkspace.toString({indent: 4}),
        {encoding: "utf-8"},
    );

    process.stderr.write("> pnpm install\n");
    spawnSync("pnpm", ["install"], {stdio: "inherit"});

    // Update catalog hashes after syncing dependencies
    console.log("\n> Updating catalog hashes...");
    updateCatalogHashes(false, false);
}

main(process.argv);
