import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {radioQuestionBuilder} from "../widgets/radio/radio-question-builder";

import {getSaveWarningsForItem} from "./get-save-warnings-for-item";

describe("getSaveWarningsForItem", () => {
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
