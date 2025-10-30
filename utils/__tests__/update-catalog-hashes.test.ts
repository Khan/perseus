/**
 * @jest-environment node
 */
import {describe, expect, it, jest, beforeEach} from "@jest/globals";
import fs from "node:fs";
import fastGlob from "fast-glob";
import yaml from "yaml";

import * as MaybeUpdateCatalogHash from "../maybe-update-catalog-hash";
import {updateCatalogHashes} from "../update-catalog-hashes";

// Mock fs to prevent actual file system operations
jest.mock("node:fs");
jest.mock("fast-glob");
jest.mock("yaml");

type PnpmWorkspace = {
    catalogs: {
        prodDeps?: Record<string, string>;
        peerDeps?: Record<string, string>;
        devDeps?: Record<string, string>;
    };
};

describe("updateCatalogHashes", () => {
    beforeEach(() => {
        jest.clearAllMocks();
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

    const getMockChangesetConfig = () => ({
        ignore: ["@khanacademy/test-package"],
    });

    describe("unpublished packages setup", () => {
        it("should include packages from changeset config and root package", () => {
            // Arrange
            jest.spyOn(fs, "readFileSync")
                .mockReturnValueOnce(
                    JSON.stringify(getMockChangesetConfig()),
                ) // changeset config
                .mockReturnValueOnce(
                    yaml.stringify(getMockPnpmWorkspace()),
                ); // pnpm workspace
            jest.spyOn(yaml, "parse").mockReturnValue(getMockPnpmWorkspace());
            jest.spyOn(fastGlob, "sync").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
                "/mock/perseus/root/packages/package2/package.json",
            ] as any);
            const maybeUpdateSpy = jest
                .spyOn(MaybeUpdateCatalogHash, "maybeUpdateCatalogHash")
                .mockReturnValue(false);

            // Act
            updateCatalogHashes(false);

            // Assert - Should be called with unpublished packages set including root + ignore list
            expect(maybeUpdateSpy).toHaveBeenCalledWith(
                expect.any(String),
                new Set(["@khanacademy/test-package", "perseus"]),
                expect.any(Object),
                false,
                false,
            );
        });
    });

    describe("package processing", () => {
        it("should process all package.json files", () => {
            // Arrange
            jest.spyOn(fs, "readFileSync")
                .mockReturnValueOnce(
                    JSON.stringify(getMockChangesetConfig()),
                ) // changeset config
                .mockReturnValueOnce(
                    yaml.stringify(getMockPnpmWorkspace()),
                ); // pnpm workspace
            jest.spyOn(yaml, "parse").mockReturnValue(getMockPnpmWorkspace());
            jest.spyOn(fastGlob, "sync").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
                "/mock/perseus/root/packages/package2/package.json",
                "/mock/perseus/root/packages/package3/package.json",
            ] as any);
            const maybeUpdateSpy = jest
                .spyOn(MaybeUpdateCatalogHash, "maybeUpdateCatalogHash")
                .mockReturnValue(false);

            // Act
            updateCatalogHashes(false);

            // Assert - Should process each package.json file found
            expect(maybeUpdateSpy).toHaveBeenCalledTimes(3);
        });

        it("should call maybeUpdateCatalogHash with correct parameters", () => {
            // Arrange
            const packagePath =
                "/mock/perseus/root/packages/package1/package.json";
            const mockWorkspace = getMockPnpmWorkspace();
            jest.spyOn(fs, "readFileSync")
                .mockReturnValueOnce(
                    JSON.stringify(getMockChangesetConfig()),
                ) // changeset config
                .mockReturnValueOnce(
                    yaml.stringify(mockWorkspace),
                ); // pnpm workspace
            jest.spyOn(yaml, "parse").mockReturnValue(mockWorkspace);
            jest.spyOn(fastGlob, "sync").mockReturnValue([
                packagePath,
            ] as any);
            const maybeUpdateSpy = jest
                .spyOn(MaybeUpdateCatalogHash, "maybeUpdateCatalogHash")
                .mockReturnValue(false);

            // Act
            updateCatalogHashes(false);

            // Assert - Should call with correct parameters
            expect(maybeUpdateSpy).toHaveBeenCalledWith(
                packagePath,
                new Set(["@khanacademy/test-package", "perseus"]),
                expect.objectContaining({
                    catalogs: mockWorkspace.catalogs,
                }),
                false,
                false,
            );
        });
    });

    describe("dry-run mode", () => {
        it("should show dry-run message when no updates are needed", () => {
            // Arrange
            const consoleLogSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});
            jest.spyOn(fs, "readFileSync")
                .mockReturnValueOnce(
                    JSON.stringify(getMockChangesetConfig()),
                ) // changeset config
                .mockReturnValueOnce(
                    yaml.stringify(getMockPnpmWorkspace()),
                ); // pnpm workspace
            jest.spyOn(yaml, "parse").mockReturnValue(getMockPnpmWorkspace());
            jest.spyOn(fastGlob, "sync").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
                "/mock/perseus/root/packages/package2/package.json",
            ] as any);
            jest.spyOn(
                MaybeUpdateCatalogHash,
                "maybeUpdateCatalogHash",
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
            const consoleLogSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});
            jest.spyOn(fs, "readFileSync")
                .mockReturnValueOnce(
                    JSON.stringify(getMockChangesetConfig()),
                ) // changeset config
                .mockReturnValueOnce(
                    yaml.stringify(getMockPnpmWorkspace()),
                ); // pnpm workspace
            jest.spyOn(yaml, "parse").mockReturnValue(getMockPnpmWorkspace());
            jest.spyOn(fastGlob, "sync").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
                "/mock/perseus/root/packages/package2/package.json",
                "/mock/perseus/root/packages/package3/package.json",
            ] as any);
            jest.spyOn(MaybeUpdateCatalogHash, "maybeUpdateCatalogHash")
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

        it("should call maybeUpdateCatalogHash with isDryRun=true", () => {
            // Arrange
            jest.spyOn(fs, "readFileSync")
                .mockReturnValueOnce(
                    JSON.stringify(getMockChangesetConfig()),
                ) // changeset config
                .mockReturnValueOnce(
                    yaml.stringify(getMockPnpmWorkspace()),
                ); // pnpm workspace
            jest.spyOn(yaml, "parse").mockReturnValue(getMockPnpmWorkspace());
            jest.spyOn(fastGlob, "sync").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
            ] as any);
            const maybeUpdateSpy = jest
                .spyOn(MaybeUpdateCatalogHash, "maybeUpdateCatalogHash")
                .mockReturnValue(false);

            // Act
            updateCatalogHashes(true);

            // Assert
            expect(maybeUpdateSpy).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(Set),
                expect.any(Object),
                true, // isDryRun
                false,
            );
        });
    });

    describe("normal mode", () => {
        it("should show success message when no updates are needed", () => {
            // Arrange
            const consoleLogSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});
            jest.spyOn(fs, "readFileSync")
                .mockReturnValueOnce(
                    JSON.stringify(getMockChangesetConfig()),
                ) // changeset config
                .mockReturnValueOnce(
                    yaml.stringify(getMockPnpmWorkspace()),
                ); // pnpm workspace
            jest.spyOn(yaml, "parse").mockReturnValue(getMockPnpmWorkspace());
            jest.spyOn(fastGlob, "sync").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
                "/mock/perseus/root/packages/package2/package.json",
            ] as any);
            jest.spyOn(
                MaybeUpdateCatalogHash,
                "maybeUpdateCatalogHash",
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
            const consoleLogSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});
            jest.spyOn(fs, "readFileSync")
                .mockReturnValueOnce(
                    JSON.stringify(getMockChangesetConfig()),
                ) // changeset config
                .mockReturnValueOnce(
                    yaml.stringify(getMockPnpmWorkspace()),
                ); // pnpm workspace
            jest.spyOn(yaml, "parse").mockReturnValue(getMockPnpmWorkspace());
            jest.spyOn(fastGlob, "sync").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
                "/mock/perseus/root/packages/package2/package.json",
                "/mock/perseus/root/packages/package3/package.json",
            ] as any);
            jest.spyOn(MaybeUpdateCatalogHash, "maybeUpdateCatalogHash")
                .mockReturnValueOnce(true)
                .mockReturnValueOnce(false)
                .mockReturnValueOnce(true);

            // Act
            updateCatalogHashes(false);

            // Assert
            expect(consoleLogSpy).toHaveBeenCalledWith(
                "✅ Updated 2 package.json files",
            );
        });
    });

    describe("verbose mode", () => {
        it("should pass verbose flag to maybeUpdateCatalogHash", () => {
            // Arrange
            jest.spyOn(fs, "readFileSync")
                .mockReturnValueOnce(
                    JSON.stringify(getMockChangesetConfig()),
                ) // changeset config
                .mockReturnValueOnce(
                    yaml.stringify(getMockPnpmWorkspace()),
                ); // pnpm workspace
            jest.spyOn(yaml, "parse").mockReturnValue(getMockPnpmWorkspace());
            jest.spyOn(fastGlob, "sync").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
            ] as any);
            const maybeUpdateSpy = jest
                .spyOn(MaybeUpdateCatalogHash, "maybeUpdateCatalogHash")
                .mockReturnValue(false);

            // Act
            updateCatalogHashes(false, true);

            // Assert
            expect(maybeUpdateSpy).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(Set),
                expect.any(Object),
                false,
                true, // verbose
            );
        });
    });

    describe("integration scenarios", () => {
        it("should handle empty package list", () => {
            // Arrange
            const consoleLogSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});
            jest.spyOn(fs, "readFileSync")
                .mockReturnValueOnce(
                    JSON.stringify(getMockChangesetConfig()),
                ) // changeset config
                .mockReturnValueOnce(
                    yaml.stringify(getMockPnpmWorkspace()),
                ); // pnpm workspace
            jest.spyOn(yaml, "parse").mockReturnValue(getMockPnpmWorkspace());
            jest.spyOn(fastGlob, "sync").mockReturnValue([] as any);
            const maybeUpdateSpy = jest
                .spyOn(MaybeUpdateCatalogHash, "maybeUpdateCatalogHash")
                .mockReturnValue(false);

            // Act
            updateCatalogHashes(false);

            // Assert
            expect(maybeUpdateSpy).not.toHaveBeenCalled();
            expect(consoleLogSpy).toHaveBeenCalledWith(
                "✅ Updated 0 package.json files",
            );
        });

        it("should handle changeset config with no ignore list", () => {
            // Arrange
            jest.spyOn(fs, "readFileSync")
                .mockReturnValueOnce(JSON.stringify({})) // changeset config with no ignore
                .mockReturnValueOnce(
                    yaml.stringify(getMockPnpmWorkspace()),
                ); // pnpm workspace
            jest.spyOn(yaml, "parse").mockReturnValue(getMockPnpmWorkspace());
            jest.spyOn(fastGlob, "sync").mockReturnValue([
                "/mock/perseus/root/packages/package1/package.json",
            ] as any);
            const maybeUpdateSpy = jest
                .spyOn(MaybeUpdateCatalogHash, "maybeUpdateCatalogHash")
                .mockReturnValue(false);

            // Act
            updateCatalogHashes(false);

            // Assert - Should only include root package in unpublished set
            expect(maybeUpdateSpy).toHaveBeenCalledWith(
                expect.any(String),
                new Set(["perseus"]),
                expect.any(Object),
                false,
                false,
            );
        });
    });
});