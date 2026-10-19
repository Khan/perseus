/**
 * @jest-environment node
 */
import {
    isInstallable,
    parsePublishedPackages,
    waitForNpmPackages,
} from "./wait-for-npm-packages";

const TARBALL_URL =
    "https://registry.npmjs.org/@khanacademy/kas/-/kas-3.0.2.tgz";

function metadataResponse(versions: Record<string, unknown>): Response {
    return new Response(JSON.stringify({versions}), {status: 200});
}

function publishedMetadata(version: string): Response {
    return metadataResponse({[version]: {dist: {tarball: TARBALL_URL}}});
}

// Builds a fetch stub that answers metadata and tarball requests from the
// given handlers.
function fakeFetch(handlers: {
    metadata: () => Response;
    tarball?: () => Response;
}): jest.MockedFunction<typeof fetch> {
    return jest.fn(async (input) =>
        String(input) === TARBALL_URL
            ? handlers.tarball?.() ?? new Response(null, {status: 200})
            : handlers.metadata(),
    );
}

// Builds a fake clock where sleeping advances time instantly.
function fakeClock() {
    let time = 0;
    return {
        now: () => time,
        sleep: jest.fn(async (ms: number) => {
            time += ms;
        }),
    };
}

describe("isInstallable", () => {
    it("returns true when metadata and tarball are served", async () => {
        // Arrange
        const fetchFn = fakeFetch({
            metadata: () => publishedMetadata("3.0.2"),
        });

        // Act
        const result = await isInstallable(
            {name: "@khanacademy/kas", version: "3.0.2"},
            fetchFn,
        );

        // Assert
        expect(result).toBe(true);
    });

    it("requests install metadata for the escaped name", async () => {
        // Arrange
        const fetchFn = fakeFetch({
            metadata: () => publishedMetadata("3.0.2"),
        });

        // Act
        await isInstallable(
            {name: "@khanacademy/kas", version: "3.0.2"},
            fetchFn,
        );

        // Assert
        expect(fetchFn).toHaveBeenCalledWith(
            "https://registry.npmjs.org/@khanacademy%2fkas",
            expect.objectContaining({
                headers: expect.objectContaining({
                    Accept: "application/vnd.npm.install-v1+json",
                }),
            }),
        );
    });

    it("returns false when metadata lacks the version", async () => {
        // Arrange
        const fetchFn = fakeFetch({
            metadata: () => publishedMetadata("3.0.1"),
        });

        // Act
        const result = await isInstallable(
            {name: "@khanacademy/kas", version: "3.0.2"},
            fetchFn,
        );

        // Assert
        expect(result).toBe(false);
    });

    it("returns false when the metadata request fails", async () => {
        // Arrange
        const fetchFn = fakeFetch({
            metadata: () => new Response(null, {status: 404}),
        });

        // Act
        const result = await isInstallable(
            {name: "@khanacademy/kas", version: "3.0.2"},
            fetchFn,
        );

        // Assert
        expect(result).toBe(false);
    });

    it("returns false when the tarball isn't served", async () => {
        // Arrange
        const fetchFn = fakeFetch({
            metadata: () => publishedMetadata("3.0.2"),
            tarball: () => new Response(null, {status: 404}),
        });

        // Act
        const result = await isInstallable(
            {name: "@khanacademy/kas", version: "3.0.2"},
            fetchFn,
        );

        // Assert
        expect(result).toBe(false);
    });
});

describe("waitForNpmPackages", () => {
    it("returns [] once the version becomes installable", async () => {
        // Arrange
        const clock = fakeClock();
        const responses = [
            publishedMetadata("3.0.1"),
            publishedMetadata("3.0.1"),
            publishedMetadata("3.0.2"),
        ];
        const fetchFn = fakeFetch({
            metadata: () => responses.shift() ?? publishedMetadata("3.0.2"),
        });

        // Act
        const pending = await waitForNpmPackages(
            [{name: "@khanacademy/kas", version: "3.0.2"}],
            60_000,
            {fetch: fetchFn, ...clock, log: () => {}},
        );

        // Assert
        expect(pending).toEqual([]);
        expect(clock.sleep).toHaveBeenCalledTimes(2);
    });

    it("returns packages still pending at the timeout", async () => {
        // Arrange
        const clock = fakeClock();
        const fetchFn = fakeFetch({
            metadata: () => publishedMetadata("3.0.1"),
        });

        // Act
        const pending = await waitForNpmPackages(
            [{name: "@khanacademy/kas", version: "3.0.2"}],
            60_000,
            {fetch: fetchFn, ...clock, log: () => {}},
        );

        // Assert
        expect(pending).toEqual([{name: "@khanacademy/kas", version: "3.0.2"}]);
        expect(clock.now()).toBeLessThanOrEqual(60_000);
    });

    it("keeps polling when a request throws", async () => {
        // Arrange
        const clock = fakeClock();
        let calls = 0;
        const fetchFn = fakeFetch({
            metadata: () => {
                calls++;
                if (calls === 1) {
                    throw new Error("ECONNRESET");
                }
                return publishedMetadata("3.0.2");
            },
        });

        // Act
        const pending = await waitForNpmPackages(
            [{name: "@khanacademy/kas", version: "3.0.2"}],
            60_000,
            {fetch: fetchFn, ...clock, log: () => {}},
        );

        // Assert
        expect(pending).toEqual([]);
    });

    it("returns immediately when given no packages", async () => {
        // Arrange
        const clock = fakeClock();
        const fetchFn = fakeFetch({
            metadata: () => publishedMetadata("3.0.2"),
        });

        // Act
        const pending = await waitForNpmPackages([], 60_000, {
            fetch: fetchFn,
            ...clock,
            log: () => {},
        });

        // Assert
        expect(pending).toEqual([]);
        expect(fetchFn).not.toHaveBeenCalled();
    });
});

describe("parsePublishedPackages", () => {
    it("returns the name and version of each package", () => {
        // Arrange, Act
        const result = parsePublishedPackages(
            '[{"name": "@khanacademy/kas", "version": "3.0.2"}]',
        );

        // Assert
        expect(result).toEqual([{name: "@khanacademy/kas", version: "3.0.2"}]);
    });

    it("throws when an entry has no version", () => {
        // Arrange, Act
        const underTest = () =>
            parsePublishedPackages('[{"name": "@khanacademy/kas"}]');

        // Assert
        expect(underTest).toThrow("Expected a JSON array");
    });

    it("throws when the JSON isn't an array", () => {
        // Arrange, Act
        const underTest = () => parsePublishedPackages("{}");

        // Assert
        expect(underTest).toThrow("Expected a JSON array");
    });
});
