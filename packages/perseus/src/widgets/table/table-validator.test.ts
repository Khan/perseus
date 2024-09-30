import {mockStrings} from "../../strings";

import tableValidator from "./table-validator";

import type {
    PerseusTableRubric,
    PerseusTableUserInput,
} from "../../validation.types";

describe("tableValidator", () => {
    it("is invalid if there is an empty cell", () => {
        // Arrange
        const userInput: PerseusTableUserInput = [
            ["1", ""],
            ["3", "4"],
        ];

        const rubric: PerseusTableRubric = {
            headers: ["Col 1", "Col 2"],
            rows: 2,
            columns: 2,
            answers: [
                ["1", "2"],
                ["3", "4"],
            ],
        };

        // Act
        const result = tableValidator(userInput, rubric, mockStrings);

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
            headers: ["Col 1", "Col 2"],
            rows: 2,
            columns: 2,
            answers: [
                ["1", "2"],
                ["3", "4"],
            ],
        };

        // Act
        const result = tableValidator(userInput, rubric, mockStrings);

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
            headers: ["Col 1", "Col 2"],
            rows: 2,
            columns: 2,
            answers: [
                ["1", "2"],
                ["3", "4"],
            ],
        };

        // Act
        const result = tableValidator(userInput, rubric, mockStrings);

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
            headers: ["Col 1", "Col 2"],
            rows: 2,
            columns: 2,
            answers: [
                ["1", "2"],
                ["3", "4"],
            ],
        };

        // Act
        const result = tableValidator(userInput, rubric, mockStrings);

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
            headers: ["Col 1", "Col 2"],
            rows: 2,
            columns: 2,
            answers: [
                ["1", "2"],
                ["3", "4"],
            ],
        };

        // Act
        const result = tableValidator(userInput, rubric, mockStrings);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });
});
