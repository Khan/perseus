/**
 * @jest-environment node
 */
import {
    CoreWidgetRegistry,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {createPerseusCoreSchemaSource} from "../adapters/fs/perseus-core-schema-source";
import {newDraft} from "../domain/draft";
import {checkoutPaths} from "../runtime-paths";

import {createCatalog} from "./catalog";
import {DraftNotFoundError} from "./errors";
import {inMemoryRepository} from "./in-memory-draft-repository.testutils";
import {createReviewUseCases} from "./review";

const catalog = createCatalog(
    createPerseusCoreSchemaSource(checkoutPaths().perseusCoreTypesDir),
);

describe("review use cases", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    describe("reviewItem", () => {
        it("gives the issues and the checklist entries they need", () => {
            // Arrange
            const drafts = inMemoryRepository();
            drafts.save(
                newDraft({
                    itemId: "abc",
                    item: generateTestPerseusItem({
                        question: generateTestPerseusRenderer({
                            content: "[[\u2603 radio 1]]",
                        }),
                    }),
                    now: new Date("2026-01-01T00:00:00Z"),
                }),
            );
            const review = createReviewUseCases({drafts, catalog});

            // Act
            const result = review.reviewItem("abc");

            // Assert
            expect({
                issues: result.issues.map((issue) => issue.code),
                entries: result.checklist.map((entry) => entry.id),
            }).toEqual({
                issues: ["lint:widget-placeholder-missing-widget"],
                entries: expect.arrayContaining(["placeholder-mismatch"]),
            });
        });

        it("leaves out entries for issues the draft doesn't have", () => {
            // Arrange
            const drafts = inMemoryRepository();
            drafts.save(
                newDraft({
                    itemId: "abc",
                    item: generateTestPerseusItem(),
                    now: new Date("2026-01-01T00:00:00Z"),
                }),
            );
            const review = createReviewUseCases({drafts, catalog});

            // Act
            const result = review.reviewItem("abc");

            // Assert
            expect(result.checklist.map((entry) => entry.id)).not.toContain(
                "no-correct-answer",
            );
        });
    });

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
            const review = createReviewUseCases({drafts, catalog});

            // Act
            const prompt = review.reviewPrompt("abc");

            // Assert
            expect(prompt).toContain('draft "abc"');
        });

        it("throws DraftNotFoundError for an unknown itemId", () => {
            // Arrange
            const review = createReviewUseCases({
                drafts: inMemoryRepository(),
                catalog,
            });

            // Act, Assert
            expect(() => review.reviewPrompt("nope")).toThrow(
                DraftNotFoundError,
            );
        });
    });
});
