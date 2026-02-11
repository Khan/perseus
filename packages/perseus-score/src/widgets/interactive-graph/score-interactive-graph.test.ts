import invariant from "tiny-invariant";
import _ from "underscore";

import scoreInteractiveGraph from "./score-interactive-graph";

import type {
    PerseusGraphType,
    PerseusInteractiveGraphRubric,
} from "@khanacademy/perseus-core";

describe("InteractiveGraph scoring on a segment question", () => {
    it("marks the answer invalid if guess is undefined", () => {
        const guess = undefined;
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {
                type: "segment",
            },
            correct: {
                type: "segment",
                coords: [
                    [
                        [0, 0],
                        [1, 1],
                    ],
                ],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveInvalidInput();
    });

    it("marks the answer invalid if guess.coords is missing", () => {
        const guess: PerseusGraphType = {type: "segment"};
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {
                type: "segment",
            },
            correct: {
                type: "segment",
                coords: [
                    [
                        [0, 0],
                        [1, 1],
                    ],
                ],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveInvalidInput();
    });

    it("does not award points if guess.coords is wrong", () => {
        const guess: PerseusGraphType = {
            type: "segment",
            coords: [
                [
                    [99, 0],
                    [1, 1],
                ],
            ],
        };

        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "segment"},
            correct: {
                type: "segment",
                coords: [
                    [
                        [0, 0],
                        [1, 1],
                    ],
                ],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("awards points if guess.coords is right", () => {
        const guess: PerseusGraphType = {
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
        };

        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "segment"},
            correct: {
                type: "segment",
                coords: [
                    [
                        [0, 0],
                        [1, 1],
                    ],
                ],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("allows points of a segment to be specified in reverse order", () => {
        const guess: PerseusGraphType = {
            type: "segment",
            coords: [
                [
                    [1, 1],
                    [0, 0],
                ],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "segment"},
            correct: {
                type: "segment",
                coords: [
                    [
                        [0, 0],
                        [1, 1],
                    ],
                ],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not modify the `guess` data", () => {
        const guess: PerseusGraphType = {
            type: "segment",
            coords: [
                [
                    [1, 1],
                    [0, 0],
                ],
            ],
        };

        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "segment"},
            correct: {
                type: "segment",
                coords: [
                    [
                        [0, 0],
                        [1, 1],
                    ],
                ],
            },
        };

        scoreInteractiveGraph(guess, rubric);

        expect(guess.coords).toEqual([
            [
                [1, 1],
                [0, 0],
            ],
        ]);
    });

    it("does not modify `rubric`", () => {
        const guess: PerseusGraphType = {
            type: "segment",
            coords: [
                [
                    [1, 1],
                    [0, 0],
                ],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "segment"},
            correct: {
                type: "segment",
                coords: [
                    [
                        [1, 1],
                        [0, 0],
                    ],
                ],
            },
        };

        scoreInteractiveGraph(guess, rubric);

        // Narrow the type of `rubric.correct` to segment graph; otherwise TS
        // thinks it might not have a `coords` property.
        invariant(rubric.correct.type === "segment");
        expect(rubric.correct.coords).toEqual([
            [
                [1, 1],
                [0, 0],
            ],
        ]);
    });
});

describe("InteractiveGraph scoring on an angle question", () => {
    it("marks the answer invalid if guess.coords is missing", () => {
        const guess: PerseusGraphType = {type: "angle"};
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "angle"},
            correct: {
                type: "angle",
                coords: [
                    [1, 1],
                    [0, 0],
                    [-1, -1],
                ],
                allowReflexAngles: false,
                match: "congruent",
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveInvalidInput();
    });
});

describe("InteractiveGraph scoring on a point question", () => {
    it("marks the answer invalid if guess.coords is missing", () => {
        const guess: PerseusGraphType = {type: "point"};
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "point"},
            correct: {
                type: "point",
                coords: [[0, 0]],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveInvalidInput();
    });

    it("throws an exception if correct.coords is missing", () => {
        // Characterization test: this might not be desirable behavior, but
        // it's the current behavior as of 2024-09-25.
        const guess: PerseusGraphType = {
            type: "point",
            coords: [[0, 0]],
        };

        const rubric: PerseusInteractiveGraphRubric = {
            graph: {
                type: "point",
            },
            // @ts-expect-error: Testing exception for invalid rubric
            correct: {
                type: "point",
            },
        };

        expect(() => scoreInteractiveGraph(guess, rubric)).toThrow();
    });

    it("does not award points if guess.coords is wrong", () => {
        const guess: PerseusGraphType = {
            type: "point",
            coords: [[9, 9]],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "point"},
            correct: {
                type: "point",
                coords: [[0, 0]],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("awards points if guess.coords is right", () => {
        const guess: PerseusGraphType = {
            type: "point",
            coords: [[7, 8]],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "point"},
            correct: {
                type: "point",
                coords: [[7, 8]],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("allows points to be specified in any order", () => {
        const guess: PerseusGraphType = {
            type: "point",
            coords: [
                [7, 8],
                [5, 6],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "point"},
            correct: {
                type: "point",
                coords: [
                    [5, 6],
                    [7, 8],
                ],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not modify the `guess` data", () => {
        const guess: PerseusGraphType = {
            type: "point",
            coords: [
                [7, 8],
                [5, 6],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "point"},
            correct: {
                type: "point",
                coords: [
                    [5, 6],
                    [7, 8],
                ],
            },
        };

        const guessClone = _.clone(guess);

        scoreInteractiveGraph(guess, rubric);

        expect(guess).toEqual(guessClone);
    });

    it("does not modify `rubric`", () => {
        const guess: PerseusGraphType = {
            type: "point",
            coords: [
                [7, 8],
                [5, 6],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "point"},
            correct: {
                type: "point",
                coords: [
                    [5, 6],
                    [7, 8],
                ],
            },
        };

        const rubricClone = _.clone(rubric);

        scoreInteractiveGraph(guess, rubric);

        expect(rubric).toEqual(rubricClone);
    });
});

describe("InteractiveGraph scoring on an angle question", () => {
    it("marks the answer invalid if guess.coords is missing", () => {
        // Arrange
        const guess: PerseusGraphType = {type: "angle"};
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {
                type: "angle",
            },
            correct: {
                type: "angle",
                allowReflexAngles: false,
                coords: [
                    [-5, 0],
                    [0, 0],
                    [5, 5],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("properly reverses coordinates if angle graph is reflexive when not allowed", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "angle",
            coords: [
                [-5, 0],
                [0, 0],
                [5, 5],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {
                type: "angle",
            },
            correct: {
                type: "angle",
                allowReflexAngles: false,
                coords: [
                    [5, 5],
                    [0, 0],
                    [-5, 0],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not reverse coordinates when angle is not reflexive", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "angle",
            coords: [
                [5, 0],
                [0, 0],
                [5, 5],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {
                type: "angle",
            },
            correct: {
                type: "angle",
                allowReflexAngles: false,
                coords: [
                    [5, 0],
                    [0, 0],
                    [5, 5],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not reverse coordinates if the angle graph is allowed to be reflexive", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "angle",
            coords: [
                [5, 0],
                [0, 0],
                [-5, -5],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {
                type: "angle",
                coords: [
                    [5, 0],
                    [0, 0],
                    [-5, -5],
                ],
            },
            correct: {
                type: "angle",
                allowReflexAngles: true,
                coords: [
                    [5, 0],
                    [0, 0],
                    [-5, -5],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });
});
