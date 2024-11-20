import {mockStrings} from "../../strings";

import scoreTable from "./score-table";
import * as TableValidator from "./validate-table";

import type {
    PerseusTableRubric,
    PerseusTableUserInput,
} from "../../validation.types";

describe("scoreTable", () => {
    it("should be correctly answerable if validation passes", function () {
        // Arrange
        const mockValidator = jest
            .spyOn(TableValidator, "default")
            .mockReturnValue(null);

        const userInput: PerseusTableUserInput = [
            ["1", "2"],
            ["3", "4"],
        ];

        const rubric: PerseusTableRubric = {
            answers: [
                ["1", "2"],
                ["3", "4"],
            ],
        };

        // Act
        const score = scoreTable(userInput, rubric, mockStrings);

        // Assert
        expect(mockValidator).toHaveBeenCalledWith(userInput);
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("should return 'empty' result if validation fails", function () {
        // Arrange
        const mockValidator = jest
            .spyOn(TableValidator, "default")
            .mockReturnValue({type: "invalid", message: null});

        const userInput: PerseusTableUserInput = [
            ["1", "2"],
            ["3", "4"],
        ];

        const rubric: PerseusTableRubric = {
            answers: [
                ["1", "2"],
                ["3", "4"],
            ],
        };

        // Act
        const score = scoreTable(userInput, rubric, mockStrings);

        // Assert
        expect(mockValidator).toHaveBeenCalledWith(userInput);
        expect(score).toHaveInvalidInput();
    });

    it("is invalid if there is an empty cell", () => {
        // Arrange
        const userInput: PerseusTableUserInput = [
            ["1", ""],
            ["3", "4"],
        ];

        const rubric: PerseusTableRubric = {
            answers: [
                ["1", "2"],
                ["3", "4"],
            ],
        };

        // Act
        const result = scoreTable(userInput, rubric, mockStrings);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("is incorrect if input length is different than correct length", () => {
        // Arrange
        const userInput: PerseusTableUserInput = [
            ["1", "2"],
            ["3", "4"],
            ["5", "6"],
        ];

        const rubric: PerseusTableRubric = {
            answers: [
                ["1", "2"],
                ["3", "4"],
            ],
        };

        // Act
        const result = scoreTable(userInput, rubric, mockStrings);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("is incorrect if the answer is wrong", () => {
        // Arrange
        const userInput: PerseusTableUserInput = [
            ["1", "2"],
            ["3", "5"],
        ];

        const rubric: PerseusTableRubric = {
            answers: [
                ["1", "2"],
                ["3", "4"],
            ],
        };

        // Act
        const result = scoreTable(userInput, rubric, mockStrings);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("is can be answered correctly", () => {
        // Arrange
        const userInput: PerseusTableUserInput = [
            ["1", "2"],
            ["3", "4"],
        ];

        const rubric: PerseusTableRubric = {
            answers: [
                ["1", "2"],
                ["3", "4"],
            ],
        };

        // Act
        const result = scoreTable(userInput, rubric, mockStrings);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("is can be answered correctly with non-exact matches", () => {
        // Arrange
        const userInput: PerseusTableUserInput = [
            ["1.0", "2.0"],
            ["3.0", "4.0"],
        ];

        const rubric: PerseusTableRubric = {
            answers: [
                ["1", "2"],
                ["3", "4"],
            ],
        };

        // Act
        const result = scoreTable(userInput, rubric, mockStrings);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });
});
