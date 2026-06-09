/**
 * @jest-environment node
 */
import fs from "node:fs";

import {describe, expect, it, jest, beforeEach} from "@jest/globals";

import * as CheckForCatalogHashUpdate from "../check-for-catalog-hash-update";
import * as GetCatalogDepsHash from "../get-catalog-deps-hash";
import {updatePackageCatalogHash} from "../update-package-catalog-hash";

import type {PnpmWorkspace} from "../catalog-hash-utils";

// Mock fs to prevent actual file reads/writes.
jest.mock("node:fs");

describe("updatePackageCatalogHash", () => {
    const PACKAGE_PATH = "/mock/perseus/root/packages/package1/package.json";

    const getMockPnpmWorkspace = (): PnpmWorkspace => ({
        catalogs: {
            prodDeps: {"tiny-invariant": "1.3.1"},
            peerDeps: {react: "^18.2.0", "react-dom": "^18.2.0"},
            devDeps: {react: "18.2.0", "react-dom": "18.2.0"},
        },
    });

    const getMockPackageJson = (name = "@khanacademy/test-package") =>
        JSON.stringify({
            name,
            version: "1.0.0",
            dependencies: {"tiny-invariant": "catalog:prodDeps"},
            khan: {catalogHash: "old-hash-123"},
        });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "log").mockImplementation(() => {});
        jest.spyOn(fs, "readFileSync").mockReturnValue(getMockPackageJson());
        jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
        jest.spyOn(GetCatalogDepsHash, "getCatalogDepsHash").mockReturnValue(
            "new-hash-456",
        );
        jest.spyOn(
            CheckForCatalogHashUpdate,
            "checkForCatalogHashUpdate",
        ).mockReturnValue(false);
    });

    it("computes the hash from the parsed package.json, forwarding the verbose flag", () => {
        // Arrange
        const getCatalogDepsHashSpy = jest.spyOn(
            GetCatalogDepsHash,
            "getCatalogDepsHash",
        );
        const workspace = getMockPnpmWorkspace();

        // Act
        updatePackageCatalogHash(PACKAGE_PATH, workspace, false, true);

        // Assert
        expect(getCatalogDepsHashSpy).toHaveBeenCalledWith(
            workspace,
            JSON.parse(getMockPackageJson()),
            true,
        );
    });

    it("checks for an update using the path, package.json, and new hash", () => {
        // Arrange
        const checkSpy = jest.spyOn(
            CheckForCatalogHashUpdate,
            "checkForCatalogHashUpdate",
        );

        // Act
        updatePackageCatalogHash(
            PACKAGE_PATH,
            getMockPnpmWorkspace(),
            false,
            false,
        );

        // Assert
        expect(checkSpy).toHaveBeenCalledWith(
            PACKAGE_PATH,
            JSON.parse(getMockPackageJson()),
            "new-hash-456",
        );
    });

    describe("when the hash has not changed", () => {
        beforeEach(() => {
            jest.spyOn(
                CheckForCatalogHashUpdate,
                "checkForCatalogHashUpdate",
            ).mockReturnValue(false);
        });

        it("returns null", () => {
            // Arrange, Act
            const result = updatePackageCatalogHash(
                PACKAGE_PATH,
                getMockPnpmWorkspace(),
                false,
                false,
            );

            // Assert
            expect(result).toBeNull();
        });

        it("does not write the file", () => {
            // Arrange
            const writeSpy = jest.spyOn(fs, "writeFileSync");

            // Act
            updatePackageCatalogHash(
                PACKAGE_PATH,
                getMockPnpmWorkspace(),
                false,
                false,
            );

            // Assert
            expect(writeSpy).not.toHaveBeenCalled();
        });
    });

    describe("when the hash has changed", () => {
        beforeEach(() => {
            jest.spyOn(
                CheckForCatalogHashUpdate,
                "checkForCatalogHashUpdate",
            ).mockReturnValue(true);
        });

        it("returns the package name", () => {
            // Arrange
            jest.spyOn(fs, "readFileSync").mockReturnValue(
                getMockPackageJson("@khanacademy/package1"),
            );

            // Act
            const result = updatePackageCatalogHash(
                PACKAGE_PATH,
                getMockPnpmWorkspace(),
                false,
                false,
            );

            // Assert
            expect(result).toBe("@khanacademy/package1");
        });

        it("writes the new hash back to the package.json", () => {
            // Arrange
            const writeSpy = jest.spyOn(fs, "writeFileSync");

            // Act
            updatePackageCatalogHash(
                PACKAGE_PATH,
                getMockPnpmWorkspace(),
                false,
                false,
            );

            // Assert
            expect(writeSpy).toHaveBeenCalledTimes(1);
            const [writtenPath, writtenContents] = writeSpy.mock.calls[0];
            expect(writtenPath).toBe(PACKAGE_PATH);
            expect(JSON.parse(String(writtenContents)).khan.catalogHash).toBe(
                "new-hash-456",
            );
        });

        it("logs the hash change in verbose mode", () => {
            // Arrange
            const consoleLogSpy = jest.spyOn(console, "log");

            // Act
            updatePackageCatalogHash(
                PACKAGE_PATH,
                getMockPnpmWorkspace(),
                false,
                true,
            );

            // Assert
            expect(consoleLogSpy).toHaveBeenCalledWith(
                "   ✨ Hash changed from old-hash-123 to new-hash-456",
            );
        });

        it("reports the change but does not write in dry-run mode", () => {
            // Arrange
            const writeSpy = jest.spyOn(fs, "writeFileSync");

            // Act
            const result = updatePackageCatalogHash(
                PACKAGE_PATH,
                getMockPnpmWorkspace(),
                true, // isDryRun
                false,
            );

            // Assert
            expect(result).not.toBeNull();
            expect(writeSpy).not.toHaveBeenCalled();
        });
    });
});
