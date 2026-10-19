import {execFile as execFileCallback} from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {promisify} from "node:util";

const execFile = promisify(execFileCallback);

/**
 * A package version that was published to npm.
 *
 * This matches the shape of the changesets/action `publishedPackages`
 * output.
 */
export type PublishedPackage = {
    name: string;
    version: string;
};

/**
 * Runs pnpm with the given arguments.
 *
 * Rejects if pnpm exits non-zero.
 */
type RunPnpm = (args: ReadonlyArray<string>) => Promise<void>;

type Dependencies = {
    checkInstallable: (pkg: PublishedPackage) => Promise<void>;
    log: (message: string) => void;
};

// A single stalled install shouldn't eat the whole wait budget.
const PNPM_TIMEOUT_MS = 2 * 60 * 1000;

async function defaultRunPnpm(args: ReadonlyArray<string>): Promise<void> {
    try {
        await execFile("pnpm", args, {timeout: PNPM_TIMEOUT_MS});
    } catch (error) {
        // pnpm puts the reason (e.g. "No matching version found") on the
        // first line of stderr. The rest is noise in a polling log.
        const stderr =
            error instanceof Error && "stderr" in error
                ? error.stderr
                : undefined;
        const reason =
            typeof stderr === "string"
                ? stderr.trim().split("\n")[0]
                : undefined;
        throw new Error(reason || String(error));
    }
}

// Each check downloads the package's full install metadata (several MB
// for @khanacademy/perseus), and npm takes minutes to make a version
// available, so polling faster than this mostly wastes downloads.
const POLL_INTERVAL_MS = 30_000;

function formatPackage(pkg: PublishedPackage): string {
    return `${pkg.name}@${pkg.version}`;
}

/**
 * Resolves if the given package version can be installed from npm, and
 * rejects with the reason otherwise.
 *
 * We use `pnpm store add` because it resolves and downloads the package the
 * same way an install does. Other lookups (e.g. `pnpm view`) can list a
 * version before an install can resolve it.
 */
export async function checkInstallable(
    pkg: PublishedPackage,
    runPnpm: RunPnpm = defaultRunPnpm,
): Promise<void> {
    // A fresh store and cache each time, so a copy of the package metadata
    // cached before the publish can't hide the new version.
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "wait-for-npm-"));
    try {
        await runPnpm([
            "store",
            "add",
            formatPackage(pkg),
            "--store-dir",
            path.join(dir, "store"),
            `--config.cache-dir=${path.join(dir, "cache")}`,
        ]);
    } finally {
        await fs.rm(dir, {recursive: true, force: true});
    }
}

/**
 * Polls npm until every given package version is installable or the
 * timeout elapses.
 *
 * @returns the packages that still weren't installable at the timeout
 *   (empty if all of them became installable).
 */
export async function waitForNpmPackages(
    packages: ReadonlyArray<PublishedPackage>,
    timeoutMs: number,
    dependencies: Dependencies = {
        checkInstallable: (pkg) => checkInstallable(pkg),
        log: (message) => console.log(message),
    },
): Promise<PublishedPackage[]> {
    const {log} = dependencies;
    const deadline = Date.now() + timeoutMs;
    let pending = [...packages];

    for (;;) {
        const checked = await Promise.all(
            pending.map((pkg) =>
                dependencies.checkInstallable(pkg).then(
                    () => ({pkg, installable: true}),
                    (error) => {
                        log(`⚠️ ${formatPackage(pkg)}: ${error.message}`);
                        return {pkg, installable: false};
                    },
                ),
            ),
        );
        for (const {pkg} of checked.filter((c) => c.installable)) {
            log(`✅ ${formatPackage(pkg)} is installable`);
        }
        pending = checked.filter((c) => !c.installable).map((c) => c.pkg);

        if (pending.length === 0) {
            return [];
        }

        if (Date.now() + POLL_INTERVAL_MS > deadline) {
            return pending;
        }

        log(
            `⏳ Waiting ${POLL_INTERVAL_MS / 1000}s for ` +
                `${pending.length} package(s): ` +
                pending.map(formatPackage).join(", "),
        );
        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    }
}

/**
 * Parses and validates a JSON list of published packages.
 *
 * @throws if the JSON isn't an array of `{name, version}` objects.
 */
export function parsePublishedPackages(json: string): PublishedPackage[] {
    const parsed: unknown = JSON.parse(json);
    if (
        !Array.isArray(parsed) ||
        !parsed.every(
            (entry) =>
                typeof entry?.name === "string" &&
                typeof entry?.version === "string",
        )
    ) {
        throw new Error(
            "Expected a JSON array of {name, version} objects, got: " + json,
        );
    }
    return parsed.map(({name, version}) => ({name, version}));
}
