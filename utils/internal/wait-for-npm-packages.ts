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

type Dependencies = {
    fetch: typeof fetch;
    sleep: (ms: number) => Promise<void>;
    now: () => number;
    log: (message: string) => void;
};

const defaultDependencies: Dependencies = {
    fetch: (input, init) => fetch(input, init),
    sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    now: () => Date.now(),
    log: (message) => console.log(message),
};

// Delays between polls. npm makes some versions installable within seconds
// and others only after several minutes, so we back off instead of sleeping
// a fixed amount.
const POLL_DELAYS_MS = [5_000, 10_000, 20_000, 30_000];

// A single stalled request shouldn't eat the whole wait budget.
const REQUEST_TIMEOUT_MS = 10_000;

function formatPackage(pkg: PublishedPackage): string {
    return `${pkg.name}@${pkg.version}`;
}

/**
 * Returns true if npm serves both the metadata and the tarball for the
 * given package version.
 *
 * We check the same documents an install reads. The full package document
 * (what `pnpm info` shows) can list a version before an install can
 * resolve it.
 */
export async function isInstallable(
    pkg: PublishedPackage,
    fetchFn: typeof fetch = defaultDependencies.fetch,
): Promise<boolean> {
    // Scoped names need their slash escaped in registry URLs.
    const url = `https://registry.npmjs.org/${pkg.name.replace("/", "%2f")}`;
    const metadataResponse = await fetchFn(url, {
        headers: {
            // The abbreviated metadata document that installs read.
            Accept: "application/vnd.npm.install-v1+json",
            // The registry's CDN can serve a copy from before the publish.
            "Cache-Control": "no-cache",
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!metadataResponse.ok) {
        return false;
    }

    const metadata = await metadataResponse.json();
    const tarballUrl = metadata.versions?.[pkg.version]?.dist?.tarball;
    if (typeof tarballUrl !== "string") {
        return false;
    }

    const tarballResponse = await fetchFn(tarballUrl, {
        method: "HEAD",
        headers: {"Cache-Control": "no-cache"},
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    return tarballResponse.ok;
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
    dependencies: Dependencies = defaultDependencies,
): Promise<PublishedPackage[]> {
    const {fetch: fetchFn, sleep, now, log} = dependencies;
    const deadline = now() + timeoutMs;
    let pending = [...packages];

    for (let attempt = 0; ; attempt++) {
        const results = await Promise.all(
            pending.map((pkg) =>
                // Network errors mean "not yet", not "give up".
                isInstallable(pkg, fetchFn).catch((error) => {
                    log(`⚠️ ${formatPackage(pkg)}: ${error}`);
                    return false;
                }),
            ),
        );
        for (const pkg of pending.filter((_, i) => results[i])) {
            log(`✅ ${formatPackage(pkg)} is installable`);
        }
        pending = pending.filter((_, i) => !results[i]);

        if (pending.length === 0) {
            return [];
        }

        const delay =
            POLL_DELAYS_MS[Math.min(attempt, POLL_DELAYS_MS.length - 1)];
        if (now() + delay > deadline) {
            return pending;
        }

        log(
            `⏳ Waiting ${delay / 1000}s for ${pending.length} package(s): ` +
                pending.map(formatPackage).join(", "),
        );
        await sleep(delay);
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
