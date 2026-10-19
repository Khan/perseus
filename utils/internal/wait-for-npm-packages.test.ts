/**
 * @jest-environment node
 */
import fs from "node:fs";

import {
    checkInstallable,
    parsePublishedPackages,
    waitForNpmPackages,
} from "./wait-for-npm-packages";

import type {PublishedPackage} from "./wait-for-npm-packages";

// Builds a stub that rejects the first `failures` calls and resolves after
// that.
function succeedsAfter(failures: number) {
    let calls = 0;
    return async () => {
        calls++;
        if (calls <= failures) {
            throw new Error("No matching version found");
        }
    };
}

describe("checkInstallable", () => {
    it("adds the exact version to a fresh pnpm store", async () => {
        // Arrange
        const runPnpm = jest.fn(async () => {});

        // Act
        await checkInstallable(
            {name: "@khanacademy/kas", version: "3.0.2"},
            runPnpm,
        );

        // Assert
        expect(runPnpm).toHaveBeenCalledWith([
            "store",
            "add",
            "@khanacademy/kas@3.0.2",
            "--store-dir",
            expect.stringContaining("wait-for-npm-"),
            expect.stringMatching(/^--config\.cache-dir=.*wait-for-npm-/),
        ]);
    });

    it("removes the temporary store when pnpm fails", async () => {
        // Arrange
        let storeDir = "";
        const runPnpm = jest.fn(async (args: ReadonlyArray<string>) => {
            storeDir = args[4];
            throw new Error("No matching version found");
        });

        // Act
        await checkInstallable(
            {name: "@khanacademy/kas", version: "3.0.2"},
            runPnpm,
        ).catch(() => {});

        // Assert
        expect(storeDir).not.toBe("");
        expect(fs.existsSync(storeDir)).toBe(false);
    });

    it("rejects with pnpm's error for an uninstallable version", async () => {
        // Arrange
        const runPnpm = succeedsAfter(1);

        // Act
        const result = checkInstallable(
            {name: "@khanacademy/kas", version: "3.0.2"},
            runPnpm,
        );

        // Assert
        await expect(result).rejects.toThrow("No matching version found");
    });
});

describe("waitForNpmPackages", () => {
    it("returns [] once the version becomes installable", async () => {
        // Arrange
        const checkInstallable = jest.fn(succeedsAfter(2));

        // Act
        const result = waitForNpmPackages(
            [{name: "@khanacademy/kas", version: "3.0.2"}],
            60_000,
            {checkInstallable, log: () => {}},
        );
        await jest.runAllTimersAsync();

        // Assert
        expect(await result).toEqual([]);
        expect(checkInstallable).toHaveBeenCalledTimes(3);
    });

    it("returns packages still pending at the timeout", async () => {
        // Arrange
        const start = Date.now();

        // Act
        const result = waitForNpmPackages(
            [{name: "@khanacademy/kas", version: "3.0.2"}],
            60_000,
            {checkInstallable: succeedsAfter(Infinity), log: () => {}},
        );
        await jest.runAllTimersAsync();

        // Assert
        expect(await result).toEqual([
            {name: "@khanacademy/kas", version: "3.0.2"},
        ]);
        expect(Date.now() - start).toBeLessThanOrEqual(60_000);
    });

    it("stops checking packages once they're installable", async () => {
        // Arrange
        const checkInstallable = jest.fn(async (pkg: PublishedPackage) => {
            if (pkg.name === "@khanacademy/kmath") {
                throw new Error("No matching version found");
            }
        });

        // Act
        const result = waitForNpmPackages(
            [
                {name: "@khanacademy/kas", version: "3.0.2"},
                {name: "@khanacademy/kmath", version: "3.1.0"},
            ],
            20_000,
            {checkInstallable, log: () => {}},
        );
        await jest.runAllTimersAsync();
        await result;

        // Assert
        expect(
            checkInstallable.mock.calls.filter(
                ([pkg]) => pkg.name === "@khanacademy/kas",
            ),
        ).toHaveLength(1);
    });

    it("returns immediately when given no packages", async () => {
        // Arrange
        const checkInstallable = jest.fn(async () => {});

        // Act
        const result = await waitForNpmPackages([], 60_000, {
            checkInstallable,
            log: () => {},
        });

        // Assert
        expect(result).toEqual([]);
        expect(checkInstallable).not.toHaveBeenCalled();
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
