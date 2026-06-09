/**
 * @jest-environment node
 */
import {describe, expect, it, jest, beforeEach, afterEach} from "@jest/globals";

import {createSyncChangeset} from "../create-sync-changeset";

describe("createSyncChangeset", () => {
    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(new Date("2026-06-09T12:34:56Z"));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("returns null when no packages are affected", () => {
        // Arrange, Act
        const result = createSyncChangeset([], "abc123");

        // Assert
        expect(result).toBeNull();
    });

    it("returns contents bumping each affected package by a patch, sorted, with the commit SHA", () => {
        // Act - intentionally pass packages out of order
        const result = createSyncChangeset(
            ["@khanacademy/perseus", "@khanacademy/math-input"],
            "f89b0c2",
        );

        // Assert
        expect(result?.contents).toBe(
            "---\n" +
                '"@khanacademy/math-input": patch\n' +
                '"@khanacademy/perseus": patch\n' +
                "---\n\n" +
                "Sync dependencies with frontend commit f89b0c2\n",
        );
    });

    it("names the file sync-deps-<YYYY-MM-DD>.md using today's date", () => {
        // Act
        const result = createSyncChangeset(["@khanacademy/perseus"], "abc123");

        // Assert
        expect(result?.filename).toBe("sync-deps-2026-06-09.md");
    });
});
