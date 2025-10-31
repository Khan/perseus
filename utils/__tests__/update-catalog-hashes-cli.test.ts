/**
 * @jest-environment node
 */
import {describe, expect, it, jest, beforeEach} from "@jest/globals";

// We need to mock the module before importing it
const mockUpdateCatalogHashes = jest.fn();
jest.mock("../update-catalog-hashes", () => ({
    updateCatalogHashes: mockUpdateCatalogHashes,
}));

describe("update-catalog-hashes-cli", () => {
    let mockExit: jest.SpiedFunction<typeof process.exit>;
    let mockConsoleLog: jest.SpiedFunction<typeof console.log>;
    let mockConsoleError: jest.SpiedFunction<typeof console.error>;
    let originalArgv: string[];

    beforeEach(() => {
        // Save original argv
        originalArgv = process.argv;

        jest.clearAllMocks();
        mockExit = jest
            .spyOn(process, "exit")
            .mockImplementation((() => {}) as any);
        mockConsoleLog = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});
        mockConsoleError = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore original argv
        process.argv = originalArgv;
        // Clear the module cache to allow re-importing with new argv
        jest.resetModules();
    });

    // Helper to load and execute the CLI with given args
    const runCli = (args: string[]) => {
        // Set process.argv before importing
        process.argv = ["node", "update-catalog-hashes-cli.ts", ...args];
        // Import the CLI script (which will execute main immediately)
        // Using require instead of import so it runs synchronously
        // eslint-disable-next-line import/no-unassigned-import
        require("../update-catalog-hashes-cli");
    };

    describe("help flag", () => {
        it("should show help with --help flag", () => {
            // Act
            runCli(["--help"]);

            // Assert
            expect(mockConsoleLog).toHaveBeenCalledWith(
                "Usage: update-catalog-hashes [options]",
            );
            expect(mockExit).toHaveBeenCalledWith(0);
        });

        it("should show help with -h flag", () => {
            // Act
            runCli(["-h"]);

            // Assert
            expect(mockConsoleLog).toHaveBeenCalledWith(
                "Usage: update-catalog-hashes [options]",
            );
            expect(mockExit).toHaveBeenCalledWith(0);
        });
    });

    describe("normal mode", () => {
        it("should call updateCatalogHashes with isDryRun=false by default", () => {
            // Arrange
            mockUpdateCatalogHashes.mockImplementation(() => {});

            // Act
            runCli([]);

            // Assert
            expect(mockUpdateCatalogHashes).toHaveBeenCalledWith(false, false);
        });

        it("should not call process.exit on success", () => {
            // Arrange
            mockUpdateCatalogHashes.mockImplementation(() => {});

            // Act
            runCli([]);

            // Assert
            expect(mockExit).not.toHaveBeenCalled();
        });
    });

    describe("dry-run mode", () => {
        it("should call updateCatalogHashes with isDryRun=true when --dry-run flag is passed", () => {
            // Arrange
            mockUpdateCatalogHashes.mockImplementation(() => {});

            // Act
            runCli(["--dry-run"]);

            // Assert
            expect(mockUpdateCatalogHashes).toHaveBeenCalledWith(true, false);
        });
    });

    describe("verbose mode", () => {
        it("should call updateCatalogHashes with verbose=true when --verbose flag is passed", () => {
            // Arrange
            mockUpdateCatalogHashes.mockImplementation(() => {});

            // Act
            runCli(["--verbose"]);

            // Assert
            expect(mockUpdateCatalogHashes).toHaveBeenCalledWith(false, true);
        });

        it("should support both --dry-run and --verbose flags together", () => {
            // Arrange
            mockUpdateCatalogHashes.mockImplementation(() => {});

            // Act
            runCli(["--dry-run", "--verbose"]);

            // Assert
            expect(mockUpdateCatalogHashes).toHaveBeenCalledWith(true, true);
        });
    });

    describe("error handling", () => {
        it("should exit with code 1 and show error when updateCatalogHashes throws", () => {
            // Arrange
            const error = new Error("Test error");
            mockUpdateCatalogHashes.mockImplementation(() => {
                throw error;
            });

            // Act
            runCli([]);

            // Assert
            expect(mockConsoleError).toHaveBeenCalled();
            expect(mockExit).toHaveBeenCalledWith(1);
        });

        it("should show error stack when available", () => {
            // Arrange
            const error = new Error("Test error with stack");
            error.stack = "Error: Test error with stack\n    at test:1:1";
            mockUpdateCatalogHashes.mockImplementation(() => {
                throw error;
            });

            // Act
            runCli([]);

            // Assert
            expect(mockConsoleError).toHaveBeenCalled();
            expect(mockExit).toHaveBeenCalledWith(1);
        });
    });
});
