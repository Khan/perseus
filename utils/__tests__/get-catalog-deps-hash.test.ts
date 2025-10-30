/**
 * @jest-environment node
 */
import {describe, expect, it, jest} from "@jest/globals";

import {getCatalogDepsHash} from "../get-catalog-deps-hash";

type PnpmWorkspace = {
    catalogs: {
        prodDeps?: Record<string, string>;
        peerDeps?: Record<string, string>;
        devDeps?: Record<string, string>;
    };
};

type PackageJson = {
    name: string;
    version: string;
    dependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
};

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

        // Assert - Should be deterministic
        expect(result1).toBe(result2);
        expect(result1).toBeTruthy();
        expect(typeof result1).toBe("string");
    });

    it("should return hash of empty string for package with no catalog dependencies", () => {
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
            dependencies: {
                "@khanacademy/perseus-core": "workspace:*",
                "some-other-dep": "1.0.0",
            },
        };

        // Act
        const result = getCatalogDepsHash(pnpmWorkspace, packageJson);

        // Assert - Empty string hashes to "5381" with string-hash
        expect(result).toBe("5381");
    });

    it("should return hash of empty string for package with no dependencies", () => {
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
        };

        // Act
        const result = getCatalogDepsHash(pnpmWorkspace, packageJson);

        // Assert - Empty string hashes to "5381" with string-hash
        expect(result).toBe("5381");
    });

    it("should return hash of empty string for package with undefined dependencies", () => {
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
            dependencies: undefined,
            peerDependencies: undefined,
        };

        // Act
        const result = getCatalogDepsHash(pnpmWorkspace, packageJson);

        // Assert - Empty string hashes to "5381" with string-hash
        expect(result).toBe("5381");
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

        // Assert - Should only include catalog dependencies
        expect(result).toBeTruthy();
        expect(typeof result).toBe("string");
    });

    it("should handle empty catalog dependencies array", () => {
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
            dependencies: {
                "some-other-dep": "1.0.0",
            },
            peerDependencies: {
                "another-dep": "^2.0.0",
            },
        };

        // Act
        const result = getCatalogDepsHash(pnpmWorkspace, packageJson);

        // Assert - Empty string hashes to "5381" with string-hash
        expect(result).toBe("5381");
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

        // Assert - Should be consistent
        expect(result).toBe("1430796529"); // "react@^18.2.0"
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

        // Assert - Should produce a consistent hash
        expect(result).toBeTruthy();
        expect(typeof result).toBe("string");
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

        // Assert - Should produce a consistent hash
        expect(result).toBeTruthy();
        expect(typeof result).toBe("string");
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
        expect(resultWithDevDeps).toBe("1430796529"); // "react@^18.2.0"
    });
});