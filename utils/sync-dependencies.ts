#!/usr/bin/env -S node -r @swc-node/register
/**
 * A script that syncs the version of all Wonder Blocks and Wonder Stuff
 * packages in this repo using the given `pnpm-workspace.yaml` file as a reference.
 * This helps with the task of keeping Perseus' peer dependencies in line with
 * the khan/frontend host application.
 */

import {spawnSync} from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import semver from "semver";
import invariant from "tiny-invariant";
import yaml from "yaml";

import {createSyncChangeset} from "./internal/create-sync-changeset";
import {updateCatalogHashes} from "./internal/update-catalog-hashes";

/**
 * The directory (relative to the repo root) where changeset files live.
 */
export const CHANGESET_DIR = ".changeset";

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
    invariant(
        yaml.isMap(node),
        `Expected \`catalogs.${catalogName}\` to be a YAML map in pnpm-workspace.yaml`,
    );
    return node;
}

function getScalarKey(pair: yaml.Pair<unknown, unknown>): string {
    invariant(
        yaml.isScalar(pair.key) && typeof pair.key.value === "string",
        () => `Non-scalar YAML key: ${JSON.stringify(pair.key)}`,
    );
    return pair.key.value;
}

function setScalarValue(
    pair: yaml.Pair<unknown, unknown>,
    value: string,
): void {
    invariant(
        yaml.isScalar(pair.value),
        () => `Non-scalar YAML value: ${JSON.stringify(pair.value)}`,
    );
    pair.value.value = value;
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

/**
 * Resolve the git commit SHA of the repo that contains the client
 * pnpm-workspace.yaml (typically khan/frontend). This SHA is recorded in the
 * generated changeset so it's clear which version of the client app the
 * dependencies were synced from.
 *
 * Hard-fails if the SHA can't be determined, since the changeset summary is
 * required to reference it.
 */
function getFrontendCommitSha(clientPnpmWorkspaceYamlPath: string): string {
    const clientRepoDir = path.dirname(
        path.resolve(clientPnpmWorkspaceYamlPath),
    );
    const result = spawnSync(
        "git",
        ["-C", clientRepoDir, "rev-parse", "HEAD"],
        {
            encoding: "utf-8",
        },
    );

    if (result.error || result.status !== 0) {
        const detail = result.error
            ? result.error.message
            : result.stderr.trim();
        throw new Error(
            `Could not determine the frontend commit SHA by running ` +
                `\`git -C ${clientRepoDir} rev-parse HEAD\`. The changeset ` +
                `summary requires this SHA. Ensure the client ` +
                `pnpm-workspace.yaml lives inside a git repository.\n${detail}`,
        );
    }

    return result.stdout.trim();
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
        const pkgName = getScalarKey(peerDepsMapEntry);
        if (!clientCatalog.has(pkgName)) {
            throw Error(
                `Perseus needs ${pkgName} as a peer dep, but the client app doesn't provide it`,
            );
        }
        setScalarValue(
            peerDepsMapEntry,
            `^${clientCatalog.minimumVersionOf(pkgName)}`,
        );
    }

    // In development, install the minimum version of each package
    // required by the client application. This ensures we don't
    // accidentally depend on features of the package added after that
    // version.
    for (const pair of devDepsMap.items) {
        const pkgName = getScalarKey(pair);
        if (!clientCatalog.has(pkgName)) {
            continue;
        }
        setScalarValue(pair, clientCatalog.minimumVersionOf(pkgName));
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
    const affectedPackages = updateCatalogHashes(false, false);

    // Create a changeset for the packages affected by the sync so they get
    // republished with their updated dependency ranges.
    console.log("\n> Creating changeset...");
    const frontendCommitSha = getFrontendCommitSha(clientPnpmWorkspaceYamlPath);
    const changeset = createSyncChangeset(affectedPackages, frontendCommitSha);
    if (changeset == null) {
        console.log(
            "ℹ️  No packages were affected by the sync; skipping changeset.",
        );
    } else {
        const changesetPath = path.join(CHANGESET_DIR, changeset.filename);
        if (fs.existsSync(changesetPath)) {
            console.error(
                `❌ Changeset file (${changesetPath}) already exists. Please delete if you want to re-run this script.`,
            );
            process.exit(1);
        }

        fs.writeFileSync(changesetPath, changeset.contents, {
            encoding: "utf-8",
        });
        console.log(`📝 Created changeset ${changesetPath}`);
    }
}

main(process.argv);
