import {ordererValidator} from "./orderer-validator";
import {question1} from "./orderer.testdata";

import type {
    PerseusOrdererRubric,
    PerseusOrdererUserInput,
} from "../../validation.types";

describe("ordererValiator", () => {
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
        const result = ordererValidator(userInput, rubric);

        // assert
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
        const result = ordererValidator(userInput, rubric);

        // assert
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
        const result = ordererValidator(userInput, rubric);

        // assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("is invalid when the when the user has not started ordering the options and current is empty", () => {
        // Arrange
        const rubric: PerseusOrdererRubric =
            question1.widgets["orderer 1"].options;

        const userInput: PerseusOrdererUserInput = {
            current: [],
        };

        // Act
        const result = ordererValidator(userInput, rubric);

        // assert
        expect(result).toHaveInvalidInput();
    });
});
