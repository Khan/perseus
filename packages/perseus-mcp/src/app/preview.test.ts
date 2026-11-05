/**
 * @jest-environment node
 */
import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {newDraft} from "../domain/draft";

import {DraftNotFoundError, PreviewUnavailableError} from "./errors";
import {inMemoryRepository} from "./in-memory-draft-repository.testutils";
import {createPreviewUseCases} from "./preview";

import type {PreviewLinks} from "../ports/preview-links";

function setUp(links: Partial<PreviewLinks>) {
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
        exercises: {get: () => undefined, list: () => [], save: () => {}},
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
});
