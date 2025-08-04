import scoreOrderer from "./score-orderer";

import type {
    PerseusOrdererRubric,
    PerseusOrdererUserInput,
} from "@khanacademy/perseus-core";

function generateOrdererRubric(): PerseusOrdererRubric {
    return {
        otherOptions: [],
        layout: "horizontal",
        options: [
            {content: "a", images: {}, widgets: {}},
            {content: "c", images: {}, widgets: {}},
            {content: "b", images: {}, widgets: {}},
        ],
        correctOptions: [
            {content: "a", images: {}, widgets: {}},
            {content: "b", images: {}, widgets: {}},
            {content: "c", images: {}, widgets: {}},
        ],
        height: "normal",
    };
}

describe("scoreOrderer", () => {
    it("is invalid when the userInput is undefined", () => {
        // Arrange
        const rubric: PerseusOrdererRubric = generateOrdererRubric();
        const userInput = undefined;

        // Act
        const result = scoreOrderer(userInput, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("is correct when the userInput is in the same order and is the same length as the rubric's correctOption content items", () => {
        // Arrange
        const rubric: PerseusOrdererRubric = generateOrdererRubric();

        const userInput: PerseusOrdererUserInput = {
            current: rubric.correctOptions.map((e) => e.content),
        };

        // Act
        const result = scoreOrderer(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("is incorrect when the userInput is not in the same order as the rubric's correctOption content items", () => {
        // Arrange
        const rubric: PerseusOrdererRubric = generateOrdererRubric();

        const userInput: PerseusOrdererUserInput = {
            current: rubric.options.map((e) => e.content),
        };

        // Act
        const result = scoreOrderer(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("is incorrect when the userInput is not the same length as the rubric's correctOption content items", () => {
        // Arrange
        const rubric: PerseusOrdererRubric = generateOrdererRubric();

        const userInput: PerseusOrdererUserInput = {
            current: rubric.correctOptions.map((e) => e.content).slice(1),
        };

        // Act
        const result = scoreOrderer(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});
