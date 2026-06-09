/**
 * @jest-environment node
 */
import fs from "node:fs";

import {describe, expect, it, jest, beforeEach} from "@jest/globals";

import {createSyncChangeset} from "../create-sync-changeset";

// Mock fs so we don't read or write real changeset files.
jest.mock("node:fs");

describe("createSyncChangeset", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "log").mockImplementation(() => {});
    });

    it("returns null and writes nothing when no packages are affected", () => {
        // Arrange
        const writeSpy = jest
            .spyOn(fs, "writeFileSync")
            .mockImplementation(() => {});

        // Act
        const result = createSyncChangeset([], "abc123");

        // Assert
        expect(result).toBeNull();
        expect(writeSpy).not.toHaveBeenCalled();
    });

    it("writes a changeset bumping each affected package by a patch, sorted, with the commit SHA", () => {
        // Arrange
        jest.spyOn(fs, "existsSync").mockReturnValue(false);
        const writeSpy = jest
            .spyOn(fs, "writeFileSync")
            .mockImplementation(() => {});

        // Act - intentionally pass packages out of order
        createSyncChangeset(
            ["@khanacademy/perseus", "@khanacademy/math-input"],
            "f89b0c2",
        );

        // Assert
        const content = writeSpy.mock.calls[0][1];
        expect(content).toBe(
            "---\n" +
                '"@khanacademy/math-input": patch\n' +
                '"@khanacademy/perseus": patch\n' +
                "---\n\n" +
                "Sync dependencies with frontend commit f89b0c2\n",
        );
    });

    it("returns the path of, and writes to, a file named as three dash-joined words", () => {
        // Arrange
        jest.spyOn(fs, "existsSync").mockReturnValue(false);
        const writeSpy = jest
            .spyOn(fs, "writeFileSync")
            .mockImplementation(() => {});

        // Act
        const result = createSyncChangeset(["@khanacademy/perseus"], "abc123");

        // Assert
        const filePath = writeSpy.mock.calls[0][0];
        expect(result).toBe(filePath);
        expect(filePath).toMatch(/\.changeset[/\\][a-z]+-[a-z]+-[a-z]+\.md$/);
    });

    it("re-rolls the name when it collides with an existing changeset", () => {
        // Arrange - first generated name collides, second is free
        const existsSpy = jest
            .spyOn(fs, "existsSync")
            .mockReturnValueOnce(true)
            .mockReturnValue(false);
        const writeSpy = jest
            .spyOn(fs, "writeFileSync")
            .mockImplementation(() => {});

        // Act
        createSyncChangeset(["@khanacademy/perseus"], "abc123");

        // Assert
        expect(existsSpy).toHaveBeenCalledTimes(2);
        expect(writeSpy).toHaveBeenCalledTimes(1);
    });
});
