/**
 * @jest-environment node
 */
import fs from "node:fs";

import {describe, expect, it, jest, beforeEach} from "@jest/globals";

import * as GetCatalogDepsHash from "../get-catalog-deps-hash";
import {maybeUpdateCatalogHash} from "../maybe-update-catalog-hash";

// Mock fs to prevent actual file writes
jest.mock("node:fs");

type PnpmWorkspace = {
    catalogs: {
        prodDeps?: Record<string, string>;
        peerDeps?: Record<string, string>;
        devDeps?: Record<string, string>;
    };
};

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

const getMockPackageJson = () => ({
    name: "@khanacademy/test-package",
    version: "1.0.0",
    dependencies: {
        "@khanacademy/perseus-core": "workspace:*",
        "tiny-invariant": "catalog:prodDeps",
    },
    peerDependencies: {
        react: "catalog:peerDeps",
        "react-dom": "catalog:peerDeps",
    },
    khan: {
        catalogHash: "old-hash-123",
    },
});

describe("maybeUpdateCatalogHash", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Mock process.cwd() to return a consistent value
        jest.spyOn(process, "cwd").mockReturnValue("/mock/perseus/root");
    });

    describe("when package is marked as private", () => {
        it("should return false", () => {
            // Arrange
            const privatePackageJson = {
                ...getMockPackageJson(),
                private: true,
            };
            jest.spyOn(fs, "readFileSync").mockReturnValue(
                JSON.stringify(privatePackageJson),
            );
            jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});

            // Act
            const result = maybeUpdateCatalogHash(
                "/mock/perseus/root/packages/test-package/package.json",
                getMockPnpmWorkspace(),
                false,
            );

            // Assert
            expect(result).toBe(false);
        });

        it("should not update the package", () => {
            // Arrange
            const privatePackageJson = {
                ...getMockPackageJson(),
                private: true,
            };
            jest.spyOn(fs, "readFileSync").mockReturnValue(
                JSON.stringify(privatePackageJson),
            );
            const mockWriteFileSync = jest
                .spyOn(fs, "writeFileSync")
                .mockImplementation(() => {});

            // Act
            maybeUpdateCatalogHash(
                "/mock/perseus/root/packages/test-package/package.json",
                getMockPnpmWorkspace(),
                false,
            );

            // Assert
            expect(mockWriteFileSync).not.toHaveBeenCalled();
        });
    });

    describe("when catalog hash has not changed", () => {
        it("should return false", () => {
            // Arrange
            const newHash = "old-hash-123"; // Same as existing hash
            jest.spyOn(fs, "readFileSync").mockReturnValue(
                JSON.stringify(getMockPackageJson()),
            );
            jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
            jest.spyOn(
                GetCatalogDepsHash,
                "getCatalogDepsHash",
            ).mockReturnValue(newHash);

            // Act
            const result = maybeUpdateCatalogHash(
                "/mock/perseus/root/packages/test-package/package.json",
                getMockPnpmWorkspace(),
                false,
            );

            // Assert
            expect(result).toBe(false);
        });

        it("should not update the package", () => {
            // Arrange
            const newHash = "old-hash-123"; // Same as existing hash
            jest.spyOn(fs, "readFileSync").mockReturnValue(
                JSON.stringify(getMockPackageJson()),
            );
            const mockWriteFileSync = jest
                .spyOn(fs, "writeFileSync")
                .mockImplementation(() => {});
            jest.spyOn(
                GetCatalogDepsHash,
                "getCatalogDepsHash",
            ).mockReturnValue(newHash);

            // Act
            maybeUpdateCatalogHash(
                "/mock/perseus/root/packages/test-package/package.json",
                getMockPnpmWorkspace(),
                false,
            );

            // Assert
            expect(mockWriteFileSync).not.toHaveBeenCalled();
        });
    });

    describe("when hash changed", () => {
        it("should log verbose message when verbose is true", () => {
            // Arrange
            jest.spyOn(fs, "readFileSync").mockReturnValue(
                JSON.stringify(getMockPackageJson()),
            );
            jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
            jest.spyOn(
                GetCatalogDepsHash,
                "getCatalogDepsHash",
            ).mockReturnValue("new-hash-456");
            const consoleLogSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});

            // Act
            maybeUpdateCatalogHash(
                "/mock/perseus/root/packages/test-package/package.json",
                getMockPnpmWorkspace(),
                true,
                true, // verbose
            );

            // Assert
            expect(consoleLogSpy).toHaveBeenCalledWith(
                "   ✨ Hash changed from old-hash-123 to new-hash-456",
            );
        });

        describe("dry run", () => {
            it("should return true", () => {
                // Arrange
                jest.spyOn(fs, "readFileSync").mockReturnValue(
                    JSON.stringify(getMockPackageJson()),
                );
                jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
                jest.spyOn(
                    GetCatalogDepsHash,
                    "getCatalogDepsHash",
                ).mockReturnValue("new-hash-456");

                // Act
                const result = maybeUpdateCatalogHash(
                    "/mock/perseus/root/packages/test-package/package.json",
                    getMockPnpmWorkspace(),
                    true,
                );

                // Assert
                expect(result).toBe(true);
            });

            it("should not update package.json", () => {
                // Arrange
                jest.spyOn(fs, "readFileSync").mockReturnValue(
                    JSON.stringify(getMockPackageJson()),
                );
                const mockWriteFileSync = jest
                    .spyOn(fs, "writeFileSync")
                    .mockImplementation(() => {});
                jest.spyOn(
                    GetCatalogDepsHash,
                    "getCatalogDepsHash",
                ).mockReturnValue("new-hash-456");

                // Act
                maybeUpdateCatalogHash(
                    "/mock/perseus/root/packages/test-package/package.json",
                    getMockPnpmWorkspace(),
                    true,
                );

                // Assert
                expect(mockWriteFileSync).not.toHaveBeenCalled();
            });
        });

        describe("actual run", () => {
            it("should return true", () => {
                // Arrange
                jest.spyOn(fs, "readFileSync").mockReturnValue(
                    JSON.stringify(getMockPackageJson()),
                );
                jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
                jest.spyOn(
                    GetCatalogDepsHash,
                    "getCatalogDepsHash",
                ).mockReturnValue("new-hash-456");

                // Act
                const result = maybeUpdateCatalogHash(
                    "/mock/perseus/root/packages/test-package/package.json",
                    getMockPnpmWorkspace(),
                    false,
                );

                // Assert
                expect(result).toBe(true);
            });

            it("should update package.json with new hash", () => {
                // Arrange
                const mockPackageJson = getMockPackageJson();
                jest.spyOn(fs, "readFileSync").mockReturnValue(
                    JSON.stringify(mockPackageJson),
                );
                const mockWriteFileSync = jest
                    .spyOn(fs, "writeFileSync")
                    .mockImplementation(() => {});
                jest.spyOn(
                    GetCatalogDepsHash,
                    "getCatalogDepsHash",
                ).mockReturnValue("new-hash-456");

                // Act
                maybeUpdateCatalogHash(
                    "/mock/perseus/root/packages/test-package/package.json",
                    getMockPnpmWorkspace(),
                    false,
                );

                // Assert
                expect(mockWriteFileSync).toHaveBeenCalledWith(
                    "/mock/perseus/root/packages/test-package/package.json",
                    JSON.stringify(
                        {
                            ...mockPackageJson,
                            khan: {
                                catalogHash: "new-hash-456",
                            },
                        },
                        null,
                        4,
                    ) + "\n",
                    "utf-8",
                );
            });
        });
    });

    describe("when package.json has no existing catalogHash", () => {
        it("should return true", () => {
            // Arrange
            const getPackageJsonWithoutHash = () => ({
                ...getMockPackageJson(),
                khan: undefined,
            });
            jest.spyOn(fs, "readFileSync").mockReturnValue(
                JSON.stringify(getPackageJsonWithoutHash()),
            );
            jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
            jest.spyOn(
                GetCatalogDepsHash,
                "getCatalogDepsHash",
            ).mockReturnValue("new-hash-456");

            // Act
            const result = maybeUpdateCatalogHash(
                "/mock/perseus/root/packages/test-package/package.json",
                getMockPnpmWorkspace(),
                false,
            );

            // Assert
            expect(result).toBe(true);
        });

        it("should create khan object and add catalogHash", () => {
            // Arrange
            const getPackageJsonWithoutHash = () => ({
                ...getMockPackageJson(),
                khan: undefined,
            });
            jest.spyOn(fs, "readFileSync").mockReturnValue(
                JSON.stringify(getPackageJsonWithoutHash()),
            );
            const mockWriteFileSync = jest
                .spyOn(fs, "writeFileSync")
                .mockImplementation(() => {});
            jest.spyOn(
                GetCatalogDepsHash,
                "getCatalogDepsHash",
            ).mockReturnValue("new-hash-456");

            // Act
            maybeUpdateCatalogHash(
                "/mock/perseus/root/packages/test-package/package.json",
                getMockPnpmWorkspace(),
                false,
            );

            // Assert
            const expectedPackageJson = {
                ...getPackageJsonWithoutHash(),
                khan: {
                    catalogHash: "new-hash-456",
                },
            };
            expect(mockWriteFileSync).toHaveBeenCalledWith(
                "/mock/perseus/root/packages/test-package/package.json",
                JSON.stringify(expectedPackageJson, null, 4) + "\n",
                "utf-8",
            );
        });
    });

    describe("edge cases", () => {
        describe("package.json with no catalog dependencies", () => {
            it("should return true when hash changes", () => {
                // Arrange
                const getPackageJsonNoCatalogDeps = () => ({
                    name: "@khanacademy/test-package",
                    version: "1.0.0",
                    dependencies: {
                        "@khanacademy/perseus-core": "workspace:*",
                    },
                    khan: {
                        catalogHash: "old-hash-123",
                    },
                });
                jest.spyOn(fs, "readFileSync").mockReturnValue(
                    JSON.stringify(getPackageJsonNoCatalogDeps()),
                );
                jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
                jest.spyOn(
                    GetCatalogDepsHash,
                    "getCatalogDepsHash",
                ).mockReturnValue("new-hash-456");

                // Act
                const result = maybeUpdateCatalogHash(
                    "/mock/perseus/root/packages/test-package/package.json",
                    getMockPnpmWorkspace(),
                    false,
                );

                // Assert
                expect(result).toBe(true);
            });

            it("should call getCatalogDepsHash with correct arguments", () => {
                // Arrange
                const getPackageJsonNoCatalogDeps = () => ({
                    name: "@khanacademy/test-package",
                    version: "1.0.0",
                    dependencies: {
                        "@khanacademy/perseus-core": "workspace:*",
                    },
                    khan: {
                        catalogHash: "old-hash-123",
                    },
                });
                const packageJson = getPackageJsonNoCatalogDeps();
                jest.spyOn(fs, "readFileSync").mockReturnValue(
                    JSON.stringify(packageJson),
                );
                jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
                const getCatalogDepsHashSpy = jest
                    .spyOn(GetCatalogDepsHash, "getCatalogDepsHash")
                    .mockReturnValue("new-hash-456");
                const mockWorkspace = getMockPnpmWorkspace();

                // Act
                maybeUpdateCatalogHash(
                    "/mock/perseus/root/packages/test-package/package.json",
                    mockWorkspace,
                    false,
                );

                // Assert
                expect(getCatalogDepsHashSpy).toHaveBeenCalledWith(
                    mockWorkspace,
                    expect.objectContaining({
                        name: "@khanacademy/test-package",
                        version: "1.0.0",
                        dependencies: {
                            "@khanacademy/perseus-core": "workspace:*",
                        },
                    }),
                    false,
                );
            });
        });
    });
});
