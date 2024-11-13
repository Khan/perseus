import scoreGrapher from "./score-grapher";

import type {Coord} from "../../interactive2/types";
import type {
    PerseusGrapherRubric,
    PerseusGrapherUserInput,
} from "../../validation.types";

describe("grapherValidator", () => {
    it("is incorrect when user input type doesn't match rubric type", () => {
        const asymptote: [Coord, Coord] = [
            [-10, -10],
            [10, 10],
        ];
        const coords: [Coord, Coord] = [
            [-10, -10],
            [10, 10],
        ];

        // Arrange
        const userInput: PerseusGrapherUserInput = {
            type: "exponential",
            asymptote,
            coords,
        };

        const rubric: PerseusGrapherRubric = {
            correct: {
                type: "logarithm",
                asymptote,
                coords,
            },
        };

        // Act
        const result = scoreGrapher(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("is invalid when user input doesn't have coords", () => {
        const asymptote: [Coord, Coord] = [
            [-10, -10],
            [10, 10],
        ];
        const coords: [Coord, Coord] = [
            [-10, -10],
            [10, 10],
        ];

        // Arrange
        const userInput: PerseusGrapherUserInput = {
            type: "exponential",
            asymptote,
            // TODO: either the types or logic is wrong,
            // but the existing validator checks for null coords
            // @ts-expect-error - TS(2322) - Type 'null' is not assignable to type 'readonly Coord[]'.
            coords: null,
        };

        const rubric: PerseusGrapherRubric = {
            correct: {
                type: "exponential",
                asymptote,
                coords,
            },
        };

        // Act
        const result = scoreGrapher(userInput, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("is invalid when coefficients are unexpected", () => {
        // I honestly don't understand what a coefficient is
        // but this seems to get triggered when the type is "linear"
        // and the points are in the same spot
        const coords: [Coord, Coord] = [
            [-10, -10],
            [-10, -10],
        ];

        // Arrange
        const userInput: PerseusGrapherUserInput = {
            type: "linear",
            coords,
        };

        const rubric: PerseusGrapherRubric = {
            correct: {
                type: "linear",
                coords,
            },
        };

        // Act
        const result = scoreGrapher(userInput, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("can be answered correctly", () => {
        const coords: [Coord, Coord] = [
            [-10, -10],
            [10, 10],
        ];

        // Arrange
        const userInput: PerseusGrapherUserInput = {
            type: "linear",
            coords,
        };

        const rubric: PerseusGrapherRubric = {
            correct: {
                type: "linear",
                coords,
            },
        };

        // Act
        const result = scoreGrapher(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("can be answered incorrectly when user input and rubric coords don't match", () => {
        // Arrange
        const userInput: PerseusGrapherUserInput = {
            type: "linear",
            coords: [
                [2, 3],
                [-4, -5],
            ],
        };

        const rubric: PerseusGrapherRubric = {
            correct: {
                type: "linear",
                coords: [
                    [-10, -10],
                    [10, 10],
                ],
            },
        };

        // Act
        const result = scoreGrapher(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});
