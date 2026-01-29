/**
 * Integration tests for the onChange to handleUserInput flow in Radio widget.
 * These tests document the current behavior before refactoring to remove onChange.
 *
 * IMPORTANT: These tests are temporary and should be removed or updated
 * after completing the onChange removal (LEMS-3542).
 */

import {
    generateRadioChoice,
    generateSimpleRadioQuestion,
} from "@khanacademy/perseus-core";
import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../../testing/test-dependencies";
import * as Dependencies from "../../../dependencies";
import {renderQuestion} from "../../__testutils__/renderQuestion";

import type {UserEvent} from "@testing-library/user-event";

describe("Radio onChange to handleUserInput flow", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("correctly passes user selection through onChange to handleUserInput", async () => {
        // Arrange
        const question = generateSimpleRadioQuestion({
            choices: [
                generateRadioChoice("First choice", {id: "choice-1"}),
                generateRadioChoice("Second choice", {id: "choice-2"}),
                generateRadioChoice("Third choice", {id: "choice-3"}),
            ],
            randomize: false,
            numCorrect: 1,
        });

        const {renderer} = renderQuestion(question);

        // Act - select the second choice
        const choices = screen.getAllByRole("button");
        await userEvent.click(choices[1]);

        // Assert
        // The data should flow through onChange to handleUserInput
        const userInput = renderer.getUserInputMap();
        expect(userInput["radio 1"]).toEqual({
            selectedChoiceIds: ["choice-2"],
        });
    });

    it("correctly handles shuffled choices through the onChange flow", async () => {
        // Arrange
        const question = generateSimpleRadioQuestion({
            choices: [
                generateRadioChoice("First choice", {
                    id: "choice-1",
                    correct: true,
                }),
                generateRadioChoice("Second choice", {id: "choice-2"}),
                generateRadioChoice("Third choice", {id: "choice-3"}),
                generateRadioChoice("Fourth choice", {id: "choice-4"}),
            ],
            randomize: true,
            numCorrect: 1,
        });

        const {renderer} = renderQuestion(question, {
            problemNum: 0, // Seed for randomization
        });

        // Act - select the first displayed choice (which is shuffled)
        const choices = screen.getAllByRole("button");
        await userEvent.click(choices[0]);

        // Assert
        const userInput = renderer.getUserInputMap();

        // The first displayed choice after shuffling with seed 0 is "choice-4"
        // This verifies that the ID is correctly tracked through shuffling
        expect(userInput["radio 1"]).toEqual({
            selectedChoiceIds: ["choice-4"],
        });
    });

    it("handles multiple selections correctly through onChange", async () => {
        // Arrange
        const question = generateSimpleRadioQuestion({
            choices: [
                generateRadioChoice("First choice", {id: "choice-1"}),
                generateRadioChoice("Second choice", {id: "choice-2"}),
                generateRadioChoice("Third choice", {id: "choice-3"}),
            ],
            randomize: false,
            multipleSelect: true,
            numCorrect: 2,
        });

        const {renderer} = renderQuestion(question);

        // Act - select multiple choices (multipleSelect still uses buttons)
        const choices = screen.getAllByRole("button");
        await userEvent.click(choices[0]);
        await userEvent.click(choices[2]);

        // Assert
        const userInput = renderer.getUserInputMap();
        expect(userInput["radio 1"]).toEqual({
            selectedChoiceIds: ["choice-1", "choice-3"],
        });
    });

    it("preserves UI state through the onChange flow", async () => {
        // Arrange
        const question = generateSimpleRadioQuestion({
            choices: [
                generateRadioChoice("First choice", {
                    id: "choice-1",
                    rationale: "This is the rationale",
                }),
                generateRadioChoice("Second choice", {id: "choice-2"}),
            ],
            randomize: false,
            numCorrect: 1,
        });

        const {renderer} = renderQuestion(question);

        // Act - select a choice
        const choices = screen.getAllByRole("button");
        await userEvent.click(choices[0]);

        // Assert - the selection is preserved
        const userInput = renderer.getUserInputMap();
        expect(userInput["radio 1"]).toEqual({
            selectedChoiceIds: ["choice-1"],
        });

        // The widget should maintain the selected state
        // This is important because the state flows through onChange
        expect(choices[0]).toHaveAttribute("aria-pressed", "true");
    });

    describe("data transformation through onChange", () => {
        it("transforms ChoiceState[] to PerseusRadioUserInput format", async () => {
            // This test documents the critical transformation that happens
            // in radio.ff.tsx's _handleChange method

            // Arrange
            const question = generateSimpleRadioQuestion({
                choices: [
                    generateRadioChoice("Option A", {id: "opt-a"}),
                    generateRadioChoice("Option B", {id: "opt-b"}),
                    generateRadioChoice("Option C", {id: "opt-c"}),
                ],
                randomize: false,
                numCorrect: 1,
            });

            const {renderer} = renderQuestion(question);

            // Act
            const choices = screen.getAllByRole("button");
            await userEvent.click(choices[1]); // Select Option B

            // Assert
            const userInput = renderer.getUserInputMap();

            // The transformation should convert from internal ChoiceState format
            // to the PerseusRadioUserInput format with selectedChoiceIds
            expect(userInput["radio 1"]).toEqual({
                selectedChoiceIds: ["opt-b"],
            });

            // Verify only the selected choice ID is included, not all choices
            expect(userInput["radio 1"].selectedChoiceIds).toHaveLength(1);
        });

        it("handles deselection in multi-select mode", async () => {
            // Arrange
            const question = generateSimpleRadioQuestion({
                choices: [
                    generateRadioChoice("Option 1", {id: "opt-1"}),
                    generateRadioChoice("Option 2", {id: "opt-2"}),
                    generateRadioChoice("Option 3", {id: "opt-3"}),
                ],
                randomize: false,
                multipleSelect: true,
                numCorrect: 2,
            });

            const {renderer} = renderQuestion(question);

            // Act - select two choices, then deselect one
            const choices = screen.getAllByRole("button");
            await userEvent.click(choices[0]); // Select Option 1
            await userEvent.click(choices[1]); // Select Option 2
            await userEvent.click(choices[0]); // Deselect Option 1

            // Assert
            const userInput = renderer.getUserInputMap();
            expect(userInput["radio 1"]).toEqual({
                selectedChoiceIds: ["opt-2"], // Only Option 2 remains selected
            });
        });

        it("handles None of the Above option correctly", async () => {
            // Arrange
            const question = generateSimpleRadioQuestion({
                choices: [
                    generateRadioChoice("Option A", {id: "opt-a"}),
                    generateRadioChoice("Option B", {id: "opt-b"}),
                    generateRadioChoice("", {
                        id: "opt-none",
                        isNoneOfTheAbove: true,
                    }),
                ],
                hasNoneOfTheAbove: true,
                randomize: false,
                numCorrect: 1,
            });

            const {renderer} = renderQuestion(question);

            // Act - select None of the Above
            const choices = screen.getAllByRole("button");
            await userEvent.click(choices[2]); // Should be last after moveNoneOfTheAboveToEnd

            // Assert
            const userInput = renderer.getUserInputMap();
            expect(userInput["radio 1"]).toEqual({
                selectedChoiceIds: ["opt-none"],
            });
        });

        it("maintains correct IDs through shuffle and None of the Above", async () => {
            // Arrange - complex scenario with shuffling and None of the Above
            const question = generateSimpleRadioQuestion({
                choices: [
                    generateRadioChoice("Choice A", {
                        id: "choice-a",
                        correct: true,
                    }),
                    generateRadioChoice("Choice B", {id: "choice-b"}),
                    generateRadioChoice("", {
                        id: "choice-none",
                        isNoneOfTheAbove: true,
                    }),
                    generateRadioChoice("Choice C", {id: "choice-c"}),
                ],
                hasNoneOfTheAbove: true,
                randomize: true,
                numCorrect: 1,
            });

            const {renderer} = renderQuestion(question, {
                problemNum: 1, // Different seed
            });

            // Act - select the last choice (should be None of the Above)
            const choices = screen.getAllByRole("button");
            await userEvent.click(choices[choices.length - 1]);

            // Assert
            const userInput = renderer.getUserInputMap();
            // None of the Above should always be last and maintain its ID
            expect(userInput["radio 1"]).toEqual({
                selectedChoiceIds: ["choice-none"],
            });
        });
    });
});
