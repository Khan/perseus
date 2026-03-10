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

describe("InteractiveGraph scoring on an absolute value question", () => {
    it("marks the answer invalid if guess.coords is missing", () => {
        // Arrange
        const guess: PerseusGraphType = {type: "absolute_value"};
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "absolute_value"},
            correct: {
                type: "absolute_value",
                coords: [
                    [0, 0],
                    [2, 2],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("does not award points if the slope is wrong", () => {
        // Arrange — correct is m=1 (vertex at origin, second at (2,2));
        // guess has m=2 (vertex at origin, second at (1,2))
        const guess: PerseusGraphType = {
            type: "absolute_value",
            coords: [
                [0, 0],
                [1, 2],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "absolute_value"},
            correct: {
                type: "absolute_value",
                coords: [
                    [0, 0],
                    [2, 2],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("does not award points if the vertex is wrong", () => {
        // Arrange — correct is vertex at (0,0); guess has vertex at (1,0)
        const guess: PerseusGraphType = {
            type: "absolute_value",
            coords: [
                [1, 0],
                [3, 2],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "absolute_value"},
            correct: {
                type: "absolute_value",
                coords: [
                    [0, 0],
                    [2, 2],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("awards points when vertex and slope match exactly", () => {
        // Arrange — vertex at (0,0), second at (2,2) → m=1
        const guess: PerseusGraphType = {
            type: "absolute_value",
            coords: [
                [0, 0],
                [2, 2],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "absolute_value"},
            correct: {
                type: "absolute_value",
                coords: [
                    [0, 0],
                    [2, 2],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("awards points when the second point is on the opposite side of the vertex but describes the same curve", () => {
        // Arrange — correct: vertex (0,0), second at (2,2) → m=1
        // guess: vertex (0,0), second at (-3,3) → m = (3-0)/|(-3)-0| = 1
        // Same curve, second point placed to the left of the vertex
        const guess: PerseusGraphType = {
            type: "absolute_value",
            coords: [
                [0, 0],
                [-3, 3],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "absolute_value"},
            correct: {
                type: "absolute_value",
                coords: [
                    [0, 0],
                    [2, 2],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("awards points for a downward-opening V with negative slope", () => {
        // Arrange — vertex at (1,3), second at (3,1) → m=-1
        const guess: PerseusGraphType = {
            type: "absolute_value",
            coords: [
                [1, 3],
                [3, 1],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "absolute_value"},
            correct: {
                type: "absolute_value",
                coords: [
                    [1, 3],
                    [3, 1],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });
});
