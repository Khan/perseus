import scoreOrderer from "./score-orderer";
import * as OrdererValidator from "./validate-orderer";

import type {
    PerseusOrdererRubric,
    PerseusOrdererUserInput,
} from "../../validation.types";

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
    it("is correct when the userInput is in the same order and is the same length as the rubric's correctOption content items", () => {
        // Arrange
        const rubric: PerseusOrdererRubric =
            generateOrdererRubric();

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
        const rubric: PerseusOrdererRubric =
            generateOrdererRubric();

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
        const rubric: PerseusOrdererRubric =
            generateOrdererRubric();

        const userInput: PerseusOrdererUserInput = {
            current: rubric.correctOptions.map((e) => e.content).slice(1),
        };

        // Act
        const result = scoreOrderer(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("should be correctly answerable if validation passes", () => {
        // Arrange
        const mockValidator = jest
            .spyOn(OrdererValidator, "default")
            .mockReturnValue(null);

        const rubric: PerseusOrdererRubric =
            generateOrdererRubric();

        const userInput: PerseusOrdererUserInput = {
            current: rubric.correctOptions.map((e) => e.content),
        };
        // Act
        const result = scoreOrderer(userInput, rubric);

        // Assert
        expect(mockValidator).toHaveBeenCalledWith(userInput);
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("should return an invalid response if validation fails", () => {
        // Arrange
        const mockValidator = jest
            .spyOn(OrdererValidator, "default")
            .mockReturnValue({
                type: "invalid",
                message: null,
            });

        const rubric: PerseusOrdererRubric =
            generateOrdererRubric();

        const userInput: PerseusOrdererUserInput = {
            current: [],
        };

        // Act
        const result = scoreOrderer(userInput, rubric);

        // Assert
        expect(mockValidator).toHaveBeenCalledWith(userInput);
        expect(result).toHaveInvalidInput();
    });
});
