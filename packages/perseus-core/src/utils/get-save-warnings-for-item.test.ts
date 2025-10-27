import {radioQuestionBuilder} from "../../../perseus/src/widgets/radio/radio-question-builder";
import {registerCoreWidgets} from "../widgets/core-widget-registry";

import {getSaveWarningsForItem} from "./get-save-warnings-for-item";
import {generateTestPerseusItem} from "./test-utils";

import type {ExplanationWidget, RadioWidget} from "../data-schema";

describe("getSaveWarningsForItem", () => {
    beforeAll(() => {
        registerCoreWidgets();
    });
    it("should return an empty array for an empty item", () => {
        const item = generateTestPerseusItem();
        expect(getSaveWarningsForItem(item)).toEqual([]);
    });

    it("should return an empty array for an item with no widgets", () => {
        const item = generateTestPerseusItem({
            question: {content: "Hello world!", widgets: {}, images: {}},
        });
        expect(getSaveWarningsForItem(item)).toEqual([]);
    });

    it("should return warnings for nested widgets", () => {
        // Arrange
        const radioWidget: RadioWidget = {
            type: "radio",
            options: {
                choices: [
                    {
                        id: "radio-choice-0",
                        content: "Incorrect",
                        correct: false,
                    },
                ],
            },
        };

        const explanationWidgetWithNestedRadio: ExplanationWidget = {
            type: "explanation",
            options: {
                explanation: "Explanation",
                widgets: {
                    "radio 1": radioWidget,
                },
                showPrompt: "Show",
                hidePrompt: "Hide",
                static: false,
            },
        };

        const item = generateTestPerseusItem({
            question: {
                content: "[[☃ explanation 1]]",
                widgets: {
                    "explanation 1": explanationWidgetWithNestedRadio,
                },
                images: {},
            },
        });

        // Act
        const warnings = getSaveWarningsForItem(item);

        // Assert
        expect(warnings).toEqual(["No choice is marked as correct."]);
    });

    describe("radio widget", () => {
        it("should return a warning when no correct choice is selected", () => {
            // Arrange
            const question = radioQuestionBuilder()
                .addChoice("Incorrect 1", {correct: false})
                .addChoice("Incorrect 2", {correct: false})
                .build();
            const item = generateTestPerseusItem({question});

            // Act
            const warnings = getSaveWarningsForItem(item);

            // Assert
            expect(warnings).toEqual(["No choice is marked as correct."]);
        });

        it("should return an empty array when a correct choice is selected", () => {
            // Arrange
            const question = radioQuestionBuilder()
                .addChoice("Correct", {correct: true})
                .addChoice("Incorrect", {correct: false})
                .build();
            const item = generateTestPerseusItem({question});

            // Act
            const warnings = getSaveWarningsForItem(item);

            // Assert
            expect(warnings).toEqual([]);
        });
    });
});
