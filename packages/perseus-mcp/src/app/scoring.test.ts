/**
 * @jest-environment node
 */
import {
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {newDraft} from "../domain/draft";

import {DraftNotFoundError} from "./errors";
import {inMemoryRepository} from "./in-memory-draft-repository.testutils";
import {createScoringUseCases} from "./scoring";

function setUp() {
    const drafts = inMemoryRepository();
    drafts.save(
        newDraft({
            itemId: "abc",
            now: new Date("2026-01-01T00:00:00Z"),
            item: generateTestPerseusItem({
                question: generateTestPerseusRenderer({
                    content: "What is 3 ÷ 4? [[☃ numeric-input 1]]",
                    widgets: {
                        "numeric-input 1": generateNumericInputWidget({
                            options: generateNumericInputOptions({
                                answers: [
                                    generateNumericInputAnswer({
                                        value: 0.75,
                                        status: "correct",
                                    }),
                                ],
                            }),
                        }),
                    },
                }),
            }),
        }),
    );
    return createScoringUseCases({drafts});
}

function answer(currentValue: unknown) {
    return {"numeric-input 1": {currentValue}};
}

describe("scoring use cases", () => {
    describe("checkUserInputs", () => {
        it("reports which guesses don't get the expected outcome", () => {
            // Arrange
            const scoring = setUp();

            // Act
            const result = scoring.checkUserInputs("abc", [
                {
                    label: "decimal",
                    userInput: answer("0.75"),
                    expected: "correct",
                },
                {
                    label: "flipped",
                    userInput: answer("4/3"),
                    expected: "correct",
                },
            ]);

            // Assert
            expect(result).toMatchObject({
                mismatches: 1,
                results: [
                    {label: "decimal", outcome: "correct", matches: true},
                    {label: "flipped", outcome: "incorrect", matches: false},
                ],
            });
        });

        it("returns the issues of a guess that can't be scored", () => {
            // Arrange
            const scoring = setUp();

            // Act
            const result = scoring.checkUserInputs("abc", [
                {userInput: answer(0.75), expected: "correct"},
            ]);

            // Assert
            expect(result).toMatchObject({
                mismatches: 1,
                results: [
                    {
                        outcome: null,
                        matches: false,
                        issues: [{code: "invalid-user-input"}],
                    },
                ],
            });
        });

        it("throws DraftNotFoundError for an unknown itemId", () => {
            // Arrange
            const scoring = setUp();

            // Act, Assert
            expect(() =>
                scoring.checkUserInputs("nope", [
                    {userInput: answer("1"), expected: "correct"},
                ]),
            ).toThrow(DraftNotFoundError);
        });
    });

    describe("scoreItem", () => {
        it("scores numbers in the given locale", () => {
            // Arrange
            const scoring = setUp();

            // Act
            const result = scoring.scoreItem("abc", answer("0,75"), "de");

            // Assert
            expect(result).toMatchObject({
                ok: true,
                score: {outcome: "correct"},
            });
        });
    });
});
