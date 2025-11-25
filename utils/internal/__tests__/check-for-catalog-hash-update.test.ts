import {describe, expect, it} from "@jest/globals";

import {checkForCatalogHashUpdate} from "../check-for-catalog-hash-update";

import type {PackageJson} from "../catalog-hash-utils";

const getMockPackageJson = (): PackageJson => ({
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

describe("checkForCatalogHashUpdate", () => {
    describe("when package is in vendor directory", () => {
        it("should return false", () => {
            // Arrange
            const vendorPackageJson = getMockPackageJson();

            // Act
            const result = checkForCatalogHashUpdate(
                "/mock/perseus/root/vendor/raphael/package.json",
                vendorPackageJson,
                "new-hash-456",
            );

            // Assert
            expect(result).toBe(false);
        });

        it("should skip even if hash would differ", () => {
            // Arrange
            const vendorPackageJson = getMockPackageJson();

            // Act
            const result = checkForCatalogHashUpdate(
                "/mock/perseus/root/vendor/some-lib/package.json",
                vendorPackageJson,
                "different-hash",
            );

            // Assert
            expect(result).toBe(false);
        });
    });

    describe("when package is marked as private", () => {
        it("should return false", () => {
            // Arrange
            const privatePackageJson = {
                ...getMockPackageJson(),
                private: true,
            };

            // Act
            const result = checkForCatalogHashUpdate(
                "/mock/perseus/root/packages/test-package/package.json",
                privatePackageJson,
                "new-hash-456",
            );

            // Assert
            expect(result).toBe(false);
        });

        it("should skip even if hash would differ", () => {
            // Arrange
            const privatePackageJson = {
                ...getMockPackageJson(),
                private: true,
            };

            // Act
            const result = checkForCatalogHashUpdate(
                "/mock/perseus/root/packages/test-package/package.json",
                privatePackageJson,
                "different-hash",
            );

            // Assert
            expect(result).toBe(false);
        });
    });

    describe("when catalog hash has not changed", () => {
        it("should return false", () => {
            // Arrange
            const packageJson = getMockPackageJson();
            const sameHash = "old-hash-123"; // Same as existing hash

            // Act
            const result = checkForCatalogHashUpdate(
                "/mock/perseus/root/packages/test-package/package.json",
                packageJson,
                sameHash,
            );

            // Assert
            expect(result).toBe(false);
        });
    });

    describe("when catalog hash has changed", () => {
        it("should return true", () => {
            // Arrange
            const packageJson = getMockPackageJson();
            const newHash = "new-hash-456";

            // Act
            const result = checkForCatalogHashUpdate(
                "/mock/perseus/root/packages/test-package/package.json",
                packageJson,
                newHash,
            );

            // Assert
            expect(result).toBe(true);
        });
    });

    describe("when package.json has no existing catalogHash", () => {
        it("should return true", () => {
            // Arrange
            const packageJsonWithoutHash = {
                ...getMockPackageJson(),
                khan: undefined,
            };

            // Act
            const result = checkForCatalogHashUpdate(
                "/mock/perseus/root/packages/test-package/package.json",
                packageJsonWithoutHash,
                "new-hash-456",
            );

            // Assert
            expect(result).toBe(true);
        });
    });

    describe("edge cases", () => {
        it("should return true for package with no catalog dependencies when hash differs", () => {
            // Arrange
            const packageJsonNoCatalogDeps = {
                name: "@khanacademy/test-package",
                version: "1.0.0",
                dependencies: {
                    "@khanacademy/perseus-core": "workspace:*",
                },
                khan: {
                    catalogHash: "old-hash-123",
                },
            };

            // Act
            const result = checkForCatalogHashUpdate(
                "/mock/perseus/root/packages/test-package/package.json",
                packageJsonNoCatalogDeps,
                "new-hash-456",
            );

            // Assert
            expect(result).toBe(true);
        });
    });
});
