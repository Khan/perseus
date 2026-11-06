/**
 * @jest-environment node
 */
import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {newDraft} from "../domain/draft";

import {DraftNotFoundError, PreviewUnavailableError} from "./errors";
import {inMemoryRepository} from "./in-memory-draft-repository.testutils";
import {createPreviewUseCases} from "./preview";

import type {Browser} from "../ports/browser";
import type {PreviewLinks} from "../ports/preview-links";

function setUp(links: Partial<PreviewLinks>, browser?: Browser) {
    const drafts = inMemoryRepository();
    drafts.save(
        newDraft({
            itemId: "abc",
            item: generateTestPerseusItem(),
            now: new Date("2026-01-01T00:00:00Z"),
        }),
    );
    return createPreviewUseCases({
        drafts,
        exercises: {
            get: (exerciseId) =>
                exerciseId === "ex1"
                    ? {
                          exerciseId,
                          name: "Exercise",
                          createdAt: "2026-01-01T00:00:00Z",
                          updatedAt: "2026-01-01T00:00:00Z",
                          problemTypes: [],
                      }
                    : undefined,
            list: () => [],
            save: () => {},
        },
        browser,
        links: {
            urlFor: () => null,
            exerciseUrlFor: () => null,
            graffitiUrlFor: () => null,
            ...links,
        },
    });
}

describe("preview use cases", () => {
    describe("previewUrl", () => {
        it("returns the draft's preview URL", () => {
            // Arrange
            const preview = setUp({
                urlFor: (itemId) => `http://localhost:1/drafts/${itemId}`,
            });

            // Act
            const url = preview.previewUrl("abc");

            // Assert
            expect(url).toBe("http://localhost:1/drafts/abc");
        });

        it("throws DraftNotFoundError for an unknown itemId", () => {
            // Arrange
            const preview = setUp({urlFor: () => "http://localhost:1/"});

            // Act, Assert
            expect(() => preview.previewUrl("nope")).toThrow(
                DraftNotFoundError,
            );
        });

        it("throws PreviewUnavailableError when nothing serves previews", () => {
            // Arrange
            const preview = setUp({urlFor: () => null});

            // Act, Assert
            expect(() => preview.previewUrl("abc")).toThrow(
                PreviewUnavailableError,
            );
        });
    });

    describe("openInBrowser", () => {
        it("opens the draft's preview URL in the browser", () => {
            // Arrange
            const opened: string[] = [];
            const preview = setUp(
                {urlFor: (itemId) => `http://localhost:1/drafts/${itemId}`},
                {open: (url) => opened.push(url) > 0},
            );

            // Act
            const result = preview.openInBrowser({itemId: "abc"});

            // Assert
            expect({result, opened}).toEqual({
                result: {url: "http://localhost:1/drafts/abc", opened: true},
                opened: ["http://localhost:1/drafts/abc"],
            });
        });

        it("opens an exercise's grid when grid is set", () => {
            // Arrange
            const opened: string[] = [];
            const preview = setUp(
                {exerciseUrlFor: (id) => `http://localhost:1/exercises/${id}`},
                {open: (url) => opened.push(url) > 0},
            );

            // Act
            preview.openInBrowser({exerciseId: "ex1", grid: true});

            // Assert
            expect(opened).toEqual([
                "http://localhost:1/exercises/ex1?view=grid",
            ]);
        });

        it("returns opened false when no browser can be started", () => {
            // Arrange
            const preview = setUp(
                {urlFor: () => "http://localhost:1/drafts/abc"},
                {open: () => false},
            );

            // Act
            const result = preview.openInBrowser({itemId: "abc"});

            // Assert
            expect(result.opened).toBe(false);
        });

        it("throws DraftNotFoundError for an unknown itemId", () => {
            // Arrange
            const preview = setUp(
                {urlFor: () => "http://localhost:1/"},
                {open: () => true},
            );

            // Act, Assert
            expect(() => preview.openInBrowser({itemId: "nope"})).toThrow(
                DraftNotFoundError,
            );
        });
    });
});
