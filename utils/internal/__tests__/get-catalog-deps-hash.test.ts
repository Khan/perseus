/**
 * @jest-environment node
 */
import {createHash} from "node:crypto";

import {describe, expect, it, jest} from "@jest/globals";

import {getCatalogDepsHash} from "../get-catalog-deps-hash";

import type {PackageJson, PnpmWorkspace} from "../catalog-hash-utils";

// SHA-256 hash of an empty string (truncated to 16 chars) - used when a package has no catalog dependencies
const EMPTY_CATALOG_HASH = createHash("sha256")
    .update("")
    .digest("hex")
    .substring(0, 16);

const getMessagesFromSpy = (
    spy: jest.SpiedFunction<typeof console.log>,
): Array<string> =>
    // For each call to the spy, get the first argument and return as array
    spy.mock.calls.map((args) => {
        const [message] = args;
        return typeof message === "function" ? message() : message;
    });

describe("getCatalogDepsHash", () => {
    it("should return consistent hash for package with catalog dependencies", () => {
        // Arrange
        const pnpmWorkspace: PnpmWorkspace = {
            catalogs: {
                prodDeps: {
                    "tiny-invariant": "1.3.1",
                },
                peerDeps: {
                    react: "^18.2.0",
                    "react-dom": "^18.2.0",
                },
            },
        };

        const packageJson: PackageJson = {
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
        };

        // Act
        const result1 = getCatalogDepsHash(pnpmWorkspace, packageJson);
        const result2 = getCatalogDepsHash(pnpmWorkspace, packageJson);

        // Assert - Should be deterministic and produce valid hash
        expect(result1).toBe(result2);
        expect(result1).toMatch(/^[0-9a-f]{16}$/); // 16-char hex string

        // Verify it's the correct hash for these dependencies
        const expectedHash = createHash("sha256")
            .update("react@^18.2.0,react-dom@^18.2.0,tiny-invariant@1.3.1")
            .digest("hex")
            .substring(0, 16);
        expect(result1).toBe(expectedHash);
    });

    it("should return hash of empty string for packages with no catalog dependencies", () => {
        // Arrange
        const pnpmWorkspace: PnpmWorkspace = {
            catalogs: {
                peerDeps: {
                    react: "^18.2.0",
                },
            },
        };

        const packageJsonNoCatalog: PackageJson = {
            name: "@khanacademy/test-package",
            version: "1.0.0",
            dependencies: {
                "@khanacademy/perseus-core": "workspace:*",
                "some-other-dep": "1.0.0",
            },
        };

        const packageJsonNoDeps: PackageJson = {
            name: "@khanacademy/test-package",
            version: "1.0.0",
        };

        // Act
        const result1 = getCatalogDepsHash(pnpmWorkspace, packageJsonNoCatalog);
        const result2 = getCatalogDepsHash(pnpmWorkspace, packageJsonNoDeps);

        // Assert - Both should produce the empty string hash
        expect(result1).toBe(EMPTY_CATALOG_HASH);
        expect(result2).toBe(EMPTY_CATALOG_HASH);
    });

    it("should sort dependencies alphabetically for deterministic hash", () => {
        // Arrange
        const pnpmWorkspace: PnpmWorkspace = {
            catalogs: {
                peerDeps: {
                    "z-package": "^1.0.0",
                    "a-package": "^2.0.0",
                    "m-package": "^3.0.0",
                },
            },
        };

        const packageJson1: PackageJson = {
            name: "@khanacademy/test-package",
            version: "1.0.0",
            peerDependencies: {
                "z-package": "catalog:peerDeps",
                "a-package": "catalog:peerDeps",
                "m-package": "catalog:peerDeps",
            },
        };

        const packageJson2: PackageJson = {
            name: "@khanacademy/test-package",
            version: "1.0.0",
            peerDependencies: {
                "m-package": "catalog:peerDeps",
                "z-package": "catalog:peerDeps",
                "a-package": "catalog:peerDeps",
            },
        };

        // Act
        const result1 = getCatalogDepsHash(pnpmWorkspace, packageJson1);
        const result2 = getCatalogDepsHash(pnpmWorkspace, packageJson2);

        // Assert - Should produce same hash regardless of order in package.json
        expect(result1).toBe(result2);
    });

    it("should log verbose output", () => {
        // Arrange
        const pnpmWorkspace: PnpmWorkspace = {
            catalogs: {
                prodDeps: {
                    "tiny-invariant": "1.3.1",
                },
                peerDeps: {
                    react: "^18.2.0",
                },
            },
        };

        const packageJson: PackageJson = {
            name: "@khanacademy/test-package",
            version: "1.0.0",
            dependencies: {
                "tiny-invariant": "catalog:prodDeps",
            },
            peerDependencies: {
                react: "catalog:peerDeps",
            },
        };
        const consoleLogSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});

        // Act
        getCatalogDepsHash(pnpmWorkspace, packageJson, true);

        // Assert
        expect(getMessagesFromSpy(consoleLogSpy)).toMatchInlineSnapshot(`
[
  "  📦 Processing @khanacademy/test-package:",
  "     Catalog dependencies: tiny-invariant@1.3.1, react@^18.2.0",
]
`);
    });

    it("should not log when verbose is false", () => {
        // Arrange
        const pnpmWorkspace: PnpmWorkspace = {
            catalogs: {
                peerDeps: {
                    react: "^18.2.0",
                },
            },
        };

        const packageJson: PackageJson = {
            name: "@khanacademy/test-package",
            version: "1.0.0",
            peerDependencies: {
                react: "catalog:peerDeps",
            },
        };
        const consoleLogSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});

        // Act
        getCatalogDepsHash(pnpmWorkspace, packageJson, false);

        // Assert
        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it("should handle mixed catalog and non-catalog dependencies", () => {
        // Arrange
        const pnpmWorkspace: PnpmWorkspace = {
            catalogs: {
                prodDeps: {
                    lodash: "4.17.21",
                },
                peerDeps: {
                    react: "^18.2.0",
                },
            },
        };

        const packageJson: PackageJson = {
            name: "@khanacademy/test-package",
            version: "1.0.0",
            dependencies: {
                lodash: "catalog:prodDeps",
                "some-other-dep": "1.0.0",
                "@khanacademy/perseus-core": "workspace:*",
            },
            peerDependencies: {
                react: "catalog:peerDeps",
                "another-dep": "^2.0.0",
            },
        };

        // Act
        const result = getCatalogDepsHash(pnpmWorkspace, packageJson);

        // Assert - Should only include catalog dependencies (sorted: lodash, react)
        const expectedHash = createHash("sha256")
            .update("lodash@4.17.21,react@^18.2.0")
            .digest("hex")
            .substring(0, 16);
        expect(result).toBe(expectedHash);
    });

    it("should handle single catalog dependency", () => {
        // Arrange
        const pnpmWorkspace: PnpmWorkspace = {
            catalogs: {
                peerDeps: {
                    react: "^18.2.0",
                },
            },
        };

        const packageJson: PackageJson = {
            name: "@khanacademy/test-package",
            version: "1.0.0",
            peerDependencies: {
                react: "catalog:peerDeps",
            },
        };

        // Act
        const result = getCatalogDepsHash(pnpmWorkspace, packageJson);

        // Assert - Should be consistent and deterministic
        const expectedHash = createHash("sha256")
            .update("react@^18.2.0")
            .digest("hex")
            .substring(0, 16);
        expect(result).toBe(expectedHash);
    });

    it("should handle only prodDeps catalog", () => {
        // Arrange
        const pnpmWorkspace: PnpmWorkspace = {
            catalogs: {
                prodDeps: {
                    "tiny-invariant": "1.3.1",
                },
            },
        };

        const packageJson: PackageJson = {
            name: "@khanacademy/test-package",
            version: "1.0.0",
            dependencies: {
                "tiny-invariant": "catalog:prodDeps",
            },
        };

        // Act
        const result = getCatalogDepsHash(pnpmWorkspace, packageJson);

        // Assert - Should produce correct hash for prodDeps
        const expectedHash = createHash("sha256")
            .update("tiny-invariant@1.3.1")
            .digest("hex")
            .substring(0, 16);
        expect(result).toBe(expectedHash);
    });

    it("should handle only peerDeps catalog", () => {
        // Arrange
        const pnpmWorkspace: PnpmWorkspace = {
            catalogs: {
                peerDeps: {
                    react: "^18.2.0",
                    "react-dom": "^18.2.0",
                },
            },
        };

        const packageJson: PackageJson = {
            name: "@khanacademy/test-package",
            version: "1.0.0",
            peerDependencies: {
                react: "catalog:peerDeps",
                "react-dom": "catalog:peerDeps",
            },
        };

        // Act
        const result = getCatalogDepsHash(pnpmWorkspace, packageJson);

        // Assert - Should produce correct hash for peerDeps (sorted alphabetically)
        const expectedHash = createHash("sha256")
            .update("react@^18.2.0,react-dom@^18.2.0")
            .digest("hex")
            .substring(0, 16);
        expect(result).toBe(expectedHash);
    });

    it("should exclude devDeps catalog dependencies", () => {
        // Arrange
        const pnpmWorkspace: PnpmWorkspace = {
            catalogs: {
                devDeps: {
                    react: "18.2.0",
                    typescript: "5.0.0",
                },
                peerDeps: {
                    react: "^18.2.0",
                },
            },
        };

        const packageJsonWithDevDeps: PackageJson = {
            name: "@khanacademy/test-package",
            version: "1.0.0",
            dependencies: {
                typescript: "catalog:devDeps", // Should be excluded
            },
            peerDependencies: {
                react: "catalog:peerDeps", // Should be included
            },
        };

        const packageJsonWithoutDevDeps: PackageJson = {
            name: "@khanacademy/test-package",
            version: "1.0.0",
            peerDependencies: {
                react: "catalog:peerDeps", // Should be included
            },
        };

        // Act
        const resultWithDevDeps = getCatalogDepsHash(
            pnpmWorkspace,
            packageJsonWithDevDeps,
        );
        const resultWithoutDevDeps = getCatalogDepsHash(
            pnpmWorkspace,
            packageJsonWithoutDevDeps,
        );

        // Assert - Should produce same hash since devDeps are excluded
        expect(resultWithDevDeps).toBe(resultWithoutDevDeps);
        const expectedHash = createHash("sha256")
            .update("react@^18.2.0")
            .digest("hex")
            .substring(0, 16);
        expect(resultWithDevDeps).toBe(expectedHash);
    });
});
