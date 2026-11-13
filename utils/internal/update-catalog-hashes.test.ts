import fs from "node:fs";

import {describe, expect, it, vi, beforeEach} from "vitest";

import * as CatalogHashUtils from "./catalog-hash-utils";
import * as CheckForCatalogHashUpdate from "./check-for-catalog-hash-update";
import * as GetCatalogDepsHash from "./get-catalog-deps-hash";
import {updateCatalogHashes} from "./update-catalog-hashes";

import type {PnpmWorkspace} from "./catalog-hash-utils";

// Mock fs to prevent actual file writes
vi.mock("node:fs");

describe("updateCatalogHashes", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, "log").mockImplementation(() => {});
    });

    const getMockPnpmWorkspace = (): PnpmWorkspace => ({
        catalogs: {
            prodDeps: {
                "tiny-invariant": "1.3.1",
            },
            peerDeps: {
                react: "^18.2.0",
                "react-dom": "^18.2.0",
            },
            devDeps: {
                react: "18.2.0",
                "react-dom": "18.2.0",
            },
        },
    });

    const getMockPackageJson = () =>
        JSON.stringify({
            name: "@khanacademy/test-package",
            version: "1.0.0",
            dependencies: {
                "tiny-invariant": "catalog:prodDeps",
            },
            khan: {
                catalogHash: "old-hash-123",
            },
        });

    describe("package processing", () => {
        it("should process all package.json files", () => {
            // Arrange
            vi.spyOn(CatalogHashUtils, "loadPnpmWorkspace").mockReturnValue(
                getMockPnpmWorkspace(),
            );
            vi.spyOn(CatalogHashUtils, "findAllPackageJsons").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
                "/mock/perseus/root/packages/package2/package.json",
                "/mock/perseus/root/packages/package3/package.json",
            ]);
            vi.spyOn(fs, "readFileSync").mockReturnValue(getMockPackageJson());
            vi.spyOn(GetCatalogDepsHash, "getCatalogDepsHash").mockReturnValue(
                "new-hash-456",
            );
            const checkSpy = vi
                .spyOn(CheckForCatalogHashUpdate, "checkForCatalogHashUpdate")
                .mockReturnValue(false);

            // Act
            updateCatalogHashes(false);

            // Assert - Should process each package.json file found
            expect(checkSpy).toHaveBeenCalledTimes(3);
        });

        it("should call checkForCatalogHashUpdate with correct parameters", () => {
            // Arrange
            const packagePath =
                "/mock/perseus/root/packages/package1/package.json";
            const mockPackageJson = JSON.parse(getMockPackageJson());
            vi.spyOn(CatalogHashUtils, "loadPnpmWorkspace").mockReturnValue(
                getMockPnpmWorkspace(),
            );
            vi.spyOn(CatalogHashUtils, "findAllPackageJsons").mockReturnValue([
                packagePath,
            ]);
            vi.spyOn(fs, "readFileSync").mockReturnValue(getMockPackageJson());
            vi.spyOn(GetCatalogDepsHash, "getCatalogDepsHash").mockReturnValue(
                "new-hash-456",
            );
            const checkSpy = vi
                .spyOn(CheckForCatalogHashUpdate, "checkForCatalogHashUpdate")
                .mockReturnValue(false);

            // Act
            updateCatalogHashes(false);

            // Assert - Should call with correct parameters
            expect(checkSpy).toHaveBeenCalledWith(
                packagePath,
                mockPackageJson,
                "new-hash-456",
            );
        });
    });

    describe("dry-run mode", () => {
        it("should show dry-run message when no updates are needed", () => {
            // Arrange
            const consoleLogSpy = vi
                .spyOn(console, "log")
                .mockImplementation(() => {});
            vi.spyOn(CatalogHashUtils, "loadPnpmWorkspace").mockReturnValue(
                getMockPnpmWorkspace(),
            );
            vi.spyOn(CatalogHashUtils, "findAllPackageJsons").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
                "/mock/perseus/root/packages/package2/package.json",
            ]);
            vi.spyOn(fs, "readFileSync").mockReturnValue(getMockPackageJson());
            vi.spyOn(GetCatalogDepsHash, "getCatalogDepsHash").mockReturnValue(
                "new-hash-456",
            );
            vi.spyOn(
                CheckForCatalogHashUpdate,
                "checkForCatalogHashUpdate",
            ).mockReturnValue(false);

            // Act
            updateCatalogHashes(true);

            // Assert
            expect(consoleLogSpy).toHaveBeenCalledWith(
                "🔮 Would update 0 package.json files",
            );
        });

        it("should show dry-run message when updates are needed", () => {
            // Arrange
            const consoleLogSpy = vi
                .spyOn(console, "log")
                .mockImplementation(() => {});
            vi.spyOn(CatalogHashUtils, "loadPnpmWorkspace").mockReturnValue(
                getMockPnpmWorkspace(),
            );
            vi.spyOn(CatalogHashUtils, "findAllPackageJsons").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
                "/mock/perseus/root/packages/package2/package.json",
                "/mock/perseus/root/packages/package3/package.json",
            ]);
            vi.spyOn(fs, "readFileSync").mockReturnValue(getMockPackageJson());
            vi.spyOn(GetCatalogDepsHash, "getCatalogDepsHash").mockReturnValue(
                "new-hash-456",
            );
            vi.spyOn(CheckForCatalogHashUpdate, "checkForCatalogHashUpdate")
                .mockReturnValueOnce(true)
                .mockReturnValueOnce(false)
                .mockReturnValueOnce(true);

            // Act
            updateCatalogHashes(true);

            // Assert
            expect(consoleLogSpy).toHaveBeenCalledWith(
                "🔮 Would update 2 package.json files",
            );
        });

        it("should not write files in dry-run mode", () => {
            // Arrange
            vi.spyOn(CatalogHashUtils, "loadPnpmWorkspace").mockReturnValue(
                getMockPnpmWorkspace(),
            );
            vi.spyOn(CatalogHashUtils, "findAllPackageJsons").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
            ]);
            vi.spyOn(fs, "readFileSync").mockReturnValue(getMockPackageJson());
            vi.spyOn(GetCatalogDepsHash, "getCatalogDepsHash").mockReturnValue(
                "new-hash-456",
            );
            vi.spyOn(
                CheckForCatalogHashUpdate,
                "checkForCatalogHashUpdate",
            ).mockReturnValue(true);
            const writeFileSpy = vi
                .spyOn(fs, "writeFileSync")
                .mockImplementation(() => {});

            // Act
            updateCatalogHashes(true);

            // Assert
            expect(writeFileSpy).not.toHaveBeenCalled();
        });
    });

    describe("normal mode", () => {
        it("should show success message when no updates are needed", () => {
            // Arrange
            const consoleLogSpy = vi
                .spyOn(console, "log")
                .mockImplementation(() => {});
            vi.spyOn(CatalogHashUtils, "loadPnpmWorkspace").mockReturnValue(
                getMockPnpmWorkspace(),
            );
            vi.spyOn(CatalogHashUtils, "findAllPackageJsons").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
                "/mock/perseus/root/packages/package2/package.json",
            ]);
            vi.spyOn(fs, "readFileSync").mockReturnValue(getMockPackageJson());
            vi.spyOn(GetCatalogDepsHash, "getCatalogDepsHash").mockReturnValue(
                "new-hash-456",
            );
            vi.spyOn(
                CheckForCatalogHashUpdate,
                "checkForCatalogHashUpdate",
            ).mockReturnValue(false);

            // Act
            updateCatalogHashes(false);

            // Assert
            expect(consoleLogSpy).toHaveBeenCalledWith(
                "✅ Updated 0 package.json files",
            );
        });

        it("should show success message when updates are made", () => {
            // Arrange
            const consoleLogSpy = vi
                .spyOn(console, "log")
                .mockImplementation(() => {});
            vi.spyOn(CatalogHashUtils, "loadPnpmWorkspace").mockReturnValue(
                getMockPnpmWorkspace(),
            );
            vi.spyOn(CatalogHashUtils, "findAllPackageJsons").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
                "/mock/perseus/root/packages/package2/package.json",
                "/mock/perseus/root/packages/package3/package.json",
            ]);
            vi.spyOn(fs, "readFileSync").mockReturnValue(getMockPackageJson());
            vi.spyOn(GetCatalogDepsHash, "getCatalogDepsHash").mockReturnValue(
                "new-hash-456",
            );
            vi.spyOn(CheckForCatalogHashUpdate, "checkForCatalogHashUpdate")
                .mockReturnValueOnce(true)
                .mockReturnValueOnce(false)
                .mockReturnValueOnce(true);
            vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});

            // Act
            updateCatalogHashes(false);

            // Assert
            expect(consoleLogSpy).toHaveBeenCalledWith(
                "✅ Updated 2 package.json files",
            );
        });

        it("should write files when updates are needed", () => {
            // Arrange
            vi.spyOn(CatalogHashUtils, "loadPnpmWorkspace").mockReturnValue(
                getMockPnpmWorkspace(),
            );
            vi.spyOn(CatalogHashUtils, "findAllPackageJsons").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
            ]);
            vi.spyOn(fs, "readFileSync").mockReturnValue(getMockPackageJson());
            vi.spyOn(GetCatalogDepsHash, "getCatalogDepsHash").mockReturnValue(
                "new-hash-456",
            );
            vi.spyOn(
                CheckForCatalogHashUpdate,
                "checkForCatalogHashUpdate",
            ).mockReturnValue(true);
            const writeFileSpy = vi
                .spyOn(fs, "writeFileSync")
                .mockImplementation(() => {});

            // Act
            updateCatalogHashes(false);

            // Assert
            expect(writeFileSpy).toHaveBeenCalled();
        });
    });

    describe("verbose mode", () => {
        it("should pass verbose flag to getCatalogDepsHash", () => {
            // Arrange
            vi.spyOn(CatalogHashUtils, "loadPnpmWorkspace").mockReturnValue(
                getMockPnpmWorkspace(),
            );
            vi.spyOn(CatalogHashUtils, "findAllPackageJsons").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
            ]);
            vi.spyOn(fs, "readFileSync").mockReturnValue(getMockPackageJson());
            const getCatalogDepsHashSpy = vi
                .spyOn(GetCatalogDepsHash, "getCatalogDepsHash")
                .mockReturnValue("new-hash-456");
            vi.spyOn(
                CheckForCatalogHashUpdate,
                "checkForCatalogHashUpdate",
            ).mockReturnValue(false);

            // Act
            updateCatalogHashes(false, true);

            // Assert
            expect(getCatalogDepsHashSpy).toHaveBeenCalledWith(
                expect.any(Object),
                expect.any(Object),
                true, // verbose
            );
        });
    });

    describe("integration scenarios", () => {
        it("should handle empty package list", () => {
            // Arrange
            const consoleLogSpy = vi
                .spyOn(console, "log")
                .mockImplementation(() => {});
            vi.spyOn(CatalogHashUtils, "loadPnpmWorkspace").mockReturnValue(
                getMockPnpmWorkspace(),
            );
            vi.spyOn(CatalogHashUtils, "findAllPackageJsons").mockReturnValue(
                [],
            );
            const checkSpy = vi
                .spyOn(CheckForCatalogHashUpdate, "checkForCatalogHashUpdate")
                .mockReturnValue(false);

            // Act
            updateCatalogHashes(false);

            // Assert
            expect(checkSpy).not.toHaveBeenCalled();
            expect(consoleLogSpy).toHaveBeenCalledWith(
                "✅ Updated 0 package.json files",
            );
        });

        it("should process all packages found by findAllPackageJsons", () => {
            // Arrange
            vi.spyOn(CatalogHashUtils, "loadPnpmWorkspace").mockReturnValue(
                getMockPnpmWorkspace(),
            );
            vi.spyOn(CatalogHashUtils, "findAllPackageJsons").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
            ]);
            vi.spyOn(fs, "readFileSync").mockReturnValue(getMockPackageJson());
            vi.spyOn(GetCatalogDepsHash, "getCatalogDepsHash").mockReturnValue(
                "new-hash-456",
            );
            const checkSpy = vi
                .spyOn(CheckForCatalogHashUpdate, "checkForCatalogHashUpdate")
                .mockReturnValue(false);

            // Act
            updateCatalogHashes(false);

            // Assert - Should process all packages found
            expect(checkSpy).toHaveBeenCalledWith(
                "/mock/perseus/root/packages/package1/package.json",
                expect.any(Object),
                "new-hash-456",
            );
        });
    });
});
