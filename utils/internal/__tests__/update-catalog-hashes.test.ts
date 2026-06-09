/**
 * @jest-environment node
 */
import {describe, expect, it, jest, beforeEach} from "@jest/globals";

import * as CatalogHashUtils from "../catalog-hash-utils";
import {updateCatalogHashes} from "../update-catalog-hashes";
import * as UpdatePackageCatalogHash from "../update-package-catalog-hash";

import type {PnpmWorkspace} from "../catalog-hash-utils";

describe("updateCatalogHashes", () => {
    const getMockPnpmWorkspace = (): PnpmWorkspace => ({
        catalogs: {
            prodDeps: {"tiny-invariant": "1.3.1"},
            peerDeps: {react: "^18.2.0", "react-dom": "^18.2.0"},
            devDeps: {react: "18.2.0", "react-dom": "18.2.0"},
        },
    });

    const mockPackagePaths = (...paths: string[]) =>
        jest
            .spyOn(CatalogHashUtils, "findAllPackageJsons")
            .mockReturnValue(paths);

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "log").mockImplementation(() => {});
        jest.spyOn(CatalogHashUtils, "loadPnpmWorkspace").mockReturnValue(
            getMockPnpmWorkspace(),
        );
        // Default: each package is unchanged. Individual tests override.
        jest.spyOn(
            UpdatePackageCatalogHash,
            "updatePackageCatalogHash",
        ).mockReturnValue(null);
    });

    describe("package processing", () => {
        it("processes every package.json that findAllPackageJsons returns", () => {
            // Arrange
            mockPackagePaths(
                "/mock/packages/package1/package.json",
                "/mock/packages/package2/package.json",
                "/mock/packages/package3/package.json",
            );
            const updateSpy = jest.spyOn(
                UpdatePackageCatalogHash,
                "updatePackageCatalogHash",
            );

            // Act
            updateCatalogHashes(false);

            // Assert
            expect(updateSpy).toHaveBeenCalledTimes(3);
        });

        it("forwards the path, workspace, dry-run, and verbose flags to each package", () => {
            // Arrange
            const workspace = getMockPnpmWorkspace();
            jest.spyOn(CatalogHashUtils, "loadPnpmWorkspace").mockReturnValue(
                workspace,
            );
            mockPackagePaths("/mock/packages/package1/package.json");
            const updateSpy = jest.spyOn(
                UpdatePackageCatalogHash,
                "updatePackageCatalogHash",
            );

            // Act
            updateCatalogHashes(false, true);

            // Assert
            expect(updateSpy).toHaveBeenCalledWith(
                "/mock/packages/package1/package.json",
                workspace,
                false,
                true,
            );
        });
    });

    describe("return value", () => {
        it("returns the names of the packages whose hash changed", () => {
            // Arrange
            mockPackagePaths(
                "/mock/packages/package1/package.json",
                "/mock/packages/package2/package.json",
                "/mock/packages/package3/package.json",
            );
            jest.spyOn(UpdatePackageCatalogHash, "updatePackageCatalogHash")
                .mockReturnValueOnce("@khanacademy/package1")
                .mockReturnValueOnce(null)
                .mockReturnValueOnce("@khanacademy/package3");

            // Act
            const result = updateCatalogHashes(false);

            // Assert - only the packages that changed are returned
            expect(result).toEqual([
                "@khanacademy/package1",
                "@khanacademy/package3",
            ]);
        });

        it("returns an empty array when no packages changed", () => {
            // Arrange
            mockPackagePaths("/mock/packages/package1/package.json");

            // Act
            const result = updateCatalogHashes(false);

            // Assert
            expect(result).toEqual([]);
        });
    });

    describe("summary message", () => {
        it("reports the count of updated packages in normal mode", () => {
            // Arrange
            const consoleLogSpy = jest.spyOn(console, "log");
            mockPackagePaths(
                "/mock/packages/package1/package.json",
                "/mock/packages/package2/package.json",
                "/mock/packages/package3/package.json",
            );
            jest.spyOn(UpdatePackageCatalogHash, "updatePackageCatalogHash")
                .mockReturnValueOnce("@khanacademy/package1")
                .mockReturnValueOnce(null)
                .mockReturnValueOnce("@khanacademy/package3");

            // Act
            updateCatalogHashes(false);

            // Assert
            expect(consoleLogSpy).toHaveBeenCalledWith(
                "✅ Updated 2 package.json files",
            );
        });

        it("reports the count of packages that would update in dry-run mode", () => {
            // Arrange
            const consoleLogSpy = jest.spyOn(console, "log");
            mockPackagePaths(
                "/mock/packages/package1/package.json",
                "/mock/packages/package2/package.json",
            );
            jest.spyOn(UpdatePackageCatalogHash, "updatePackageCatalogHash")
                .mockReturnValueOnce("@khanacademy/package1")
                .mockReturnValueOnce("@khanacademy/package2");

            // Act
            updateCatalogHashes(true);

            // Assert
            expect(consoleLogSpy).toHaveBeenCalledWith(
                "🔮 Would update 2 package.json files",
            );
        });

        it("reports zero when no packages changed", () => {
            // Arrange
            const consoleLogSpy = jest.spyOn(console, "log");
            mockPackagePaths("/mock/packages/package1/package.json");

            // Act
            updateCatalogHashes(false);

            // Assert
            expect(consoleLogSpy).toHaveBeenCalledWith(
                "✅ Updated 0 package.json files",
            );
        });
    });

    describe("integration scenarios", () => {
        it("handles an empty package list without processing any package", () => {
            // Arrange
            const consoleLogSpy = jest.spyOn(console, "log");
            mockPackagePaths();
            const updateSpy = jest.spyOn(
                UpdatePackageCatalogHash,
                "updatePackageCatalogHash",
            );

            // Act
            const result = updateCatalogHashes(false);

            // Assert
            expect(updateSpy).not.toHaveBeenCalled();
            expect(result).toEqual([]);
            expect(consoleLogSpy).toHaveBeenCalledWith(
                "✅ Updated 0 package.json files",
            );
        });
    });
});
