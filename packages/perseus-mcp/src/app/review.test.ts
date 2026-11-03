/**
 * @jest-environment node
 */
import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {newDraft} from "../domain/draft";

import {DraftNotFoundError} from "./errors";
import {inMemoryRepository} from "./in-memory-draft-repository.testutils";
import {createReviewUseCases} from "./review";

describe("review use cases", () => {
    describe("reviewPrompt", () => {
        it("returns the procedure for the given draft", () => {
            // Arrange
            const drafts = inMemoryRepository();
            drafts.save(
                newDraft({
                    itemId: "abc",
                    item: generateTestPerseusItem(),
                    now: new Date("2026-01-01T00:00:00Z"),
                }),
            );
            const review = createReviewUseCases({drafts});

            // Act
            const prompt = review.reviewPrompt("abc");

            // Assert
            expect(prompt).toContain('draft "abc"');
        });

        it("throws DraftNotFoundError for an unknown itemId", () => {
            // Arrange
            const review = createReviewUseCases({drafts: inMemoryRepository()});

            // Act, Assert
            expect(() => review.reviewPrompt("nope")).toThrow(
                DraftNotFoundError,
            );
        });
    });
});
