import {question1} from "./orderer.testdata";
import {scoreOrderer} from "./score-orderer";
import * as OrdererValidator from "./validate-orderer";

import type {
    PerseusOrdererRubric,
    PerseusOrdererUserInput,
} from "../../validation.types";

describe("scoreOrderer", () => {
    it("is correct when the userInput is in the same order and is the same length as the rubric's correctOption content items", () => {
        // Arrange
        const rubric: PerseusOrdererRubric =
            question1.widgets["orderer 1"].options;

        const userInput: PerseusOrdererUserInput = {
            current: question1.widgets["orderer 1"].options.correctOptions.map(
                (option) => option.content,
            ),
        };

        // Act
        const result = scoreOrderer(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("is incorrect when the userInput is not in the same order as the rubric's correctOption content items", () => {
        // Arrange
        const rubric: PerseusOrdererRubric =
            question1.widgets["orderer 1"].options;

        const userInput: PerseusOrdererUserInput = {
            current: ["$10.9$", "$11$", "$\\sqrt{120}$"],
        };

        // Act
        const result = scoreOrderer(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("is incorrect when the userInput is not the same length as the rubric's correctOption content items", () => {
        // Arrange
        const rubric: PerseusOrdererRubric =
            question1.widgets["orderer 1"].options;

        const userInput: PerseusOrdererUserInput = {
            current: ["$10.9$", "$11$"],
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
            question1.widgets["orderer 1"].options;

        const userInput: PerseusOrdererUserInput = {
            current: question1.widgets["orderer 1"].options.correctOptions.map(
                (option) => option.content,
            ),
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
            question1.widgets["orderer 1"].options;

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
