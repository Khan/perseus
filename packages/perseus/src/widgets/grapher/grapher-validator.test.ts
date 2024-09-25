import grapherValidator from "./grapher-validator";

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
            availableTypes: ["exponential", "logarithm"],
            correct: {
                type: "logarithm",
                asymptote,
                coords,
            },
            // The rubric type is probably wrong,
            // the validator doesn't use graph
            graph: {} as any,
        };

        // Act
        const result = grapherValidator(userInput, rubric);

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
            availableTypes: ["exponential", "logarithm"],
            correct: {
                type: "exponential",
                asymptote,
                coords,
            },
            // The rubric type is probably wrong,
            // the validator doesn't use graph
            graph: {} as any,
        };

        // Act
        const result = grapherValidator(userInput, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("is invalid when coefficients are unexpected", () => {
        // I honestly don't understand what a coefficient is
        // but this seems to get triggered when the type is "linear"
        // and the points are in the same spot
        const asymptote: [Coord, Coord] = [
            [-10, -10],
            [-10, -10],
        ];
        const coords: [Coord, Coord] = [
            [-10, -10],
            [-10, -10],
        ];

        // Arrange
        const userInput: PerseusGrapherUserInput = {
            type: "linear",
            asymptote,
            coords,
        };

        const rubric: PerseusGrapherRubric = {
            availableTypes: ["linear"],
            correct: {
                type: "linear",
                coords,
            },
            // The rubric type is probably wrong,
            // the validator doesn't use graph
            graph: {} as any,
        };

        // Act
        const result = grapherValidator(userInput, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("can be answered correctly", () => {
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
            type: "linear",
            asymptote,
            coords,
        };

        const rubric: PerseusGrapherRubric = {
            availableTypes: ["linear"],
            correct: {
                type: "linear",
                coords,
            },
            // The rubric type is probably wrong,
            // the validator doesn't use graph
            graph: {} as any,
        };

        // Act
        const result = grapherValidator(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("can be answered incorrectly", () => {
        // TODO: user input type is probably wrong,
        // I don't think asymptote is needed for all types
        const asymptote: [Coord, Coord] = [
            [10, 10],
            [-10, -10],
        ];

        // Arrange
        const userInput: PerseusGrapherUserInput = {
            type: "linear",
            asymptote,
            coords: [
                [2, 3],
                [-4, -5],
            ],
        };

        const rubric: PerseusGrapherRubric = {
            availableTypes: ["linear"],
            correct: {
                type: "linear",
                coords: [
                    [-10, -10],
                    [10, 10],
                ],
            },
            // The rubric type is probably wrong,
            // the validator doesn't use graph
            graph: {} as any,
        };

        // Act
        const result = grapherValidator(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});
