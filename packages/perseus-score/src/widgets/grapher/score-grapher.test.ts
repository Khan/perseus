import scoreGrapher from "./score-grapher";

import type {
    PerseusGrapherRubric,
    PerseusGrapherUserInput,
    Coord,
} from "@khanacademy/perseus-core";

describe("scoreGrapher", () => {
    it("is invalid when user input is undefined", () => {
        // Arrange
        const userInput = undefined;
        const asymptote: [Coord, Coord] = [
            [-10, -10],
            [10, 10],
        ];
        const coords: [Coord, Coord] = [
            [-10, -10],
            [10, 10],
        ];
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
        expect(result).toHaveInvalidInput();
    });

    it("is incorrect when user input type doesn't match scoring data type", () => {
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

    it("is invalid when rubric has null coords", () => {
        // The rubric.correct.coords are null in some cases in legacy data.
        // Before this test was added and made to pass, the scoring code would
        // throw an exception if the coords were null. From a learner's
        // perspective, they'd click the "check answer" button and nothing
        // would visibly happen. Returning "invalid" is slightly nicer, and has
        // a similar effect (blocking learner progress).

        // Arrange
        const userInput: PerseusGrapherUserInput = {
            type: "linear",
            coords: [
                [-10, -10],
                [10, 10],
            ],
        };

        const rubric: PerseusGrapherRubric = {
            correct: {
                type: "linear",
                coords: null,
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

    it("can be answered incorrectly when user input and scoring data coords don't match", () => {
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
