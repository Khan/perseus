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

describe("InteractiveGraph scoring on an absolute-value question", () => {
    it("marks the answer invalid if guess is undefined", () => {
        // Arrange
        const guess = undefined;
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "absolute-value"},
            correct: {
                type: "absolute-value",
                coords: [
                    [0, 0],
                    [1, 1],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("marks the answer invalid if guess.coords is missing", () => {
        // Arrange
        const guess: PerseusGraphType = {type: "absolute-value"};
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "absolute-value"},
            correct: {
                type: "absolute-value",
                coords: [
                    [0, 0],
                    [1, 1],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("does not award points if guess.coords is wrong", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "absolute-value",
            coords: [
                [0, 0],
                [1, 2],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "absolute-value"},
            correct: {
                type: "absolute-value",
                coords: [
                    [0, 0],
                    [1, 1],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("awards points if guess.coords produce the same coefficients as the rubric", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "absolute-value",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "absolute-value"},
            correct: {
                type: "absolute-value",
                coords: [
                    [0, 0],
                    [1, 1],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("awards points when p2 is on the other arm but slope is the same", () => {
        // Arrange — vertex at (0,0), slope=1 regardless of which side p2 is on
        const guess: PerseusGraphType = {
            type: "absolute-value",
            coords: [
                [0, 0],
                [-1, 1],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "absolute-value"},
            correct: {
                type: "absolute-value",
                coords: [
                    [0, 0],
                    [1, 1],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not award points for a downward-opening graph when upward is correct", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "absolute-value",
            coords: [
                [0, 0],
                [1, -1],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "absolute-value"},
            correct: {
                type: "absolute-value",
                coords: [
                    [0, 0],
                    [1, 1],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
    
    it("does not award points when p2 shares the same x as the vertex", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "absolute-value",
            coords: [
                [0, 0],
                [0, 2], // same x as vertex → getAbsoluteValueCoefficients returns undefined
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "absolute-value"},
            correct: {
                type: "absolute-value",
                coords: [
                    [0, 0],
                    [1, 1],
                ],
            },
        };
        
        // Act
        const result = scoreInteractiveGraph(guess, rubric);
        
        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
  }); 
});

describe("InteractiveGraph scoring on a tangent question", () => {
    it("marks the answer invalid if guess is undefined", () => {
        const guess = undefined;
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "tangent"},
            correct: {
                type: "tangent",
                coords: [
                    [0.5, 0.5],
                    [0.75, 0.75],
                ],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveInvalidInput();
    });

    it("marks the answer invalid if guess has no coords", () => {
        const guess: PerseusGraphType = {type: "tangent"};
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "tangent"},
            correct: {
                type: "tangent",
                coords: [
                    [0.5, 0.5],
                    [0.75, 0.75],
                ],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveInvalidInput();
    });

    it("scores correct answer as correct", () => {
        const guess: PerseusGraphType = {
            type: "tangent",
            coords: [
                [0.5, 0.5],
                [0.75, 0.75],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "tangent"},
            correct: {
                type: "tangent",
                coords: [
                    [0.5, 0.5],
                    [0.75, 0.75],
                ],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("scores incorrect answer as incorrect", () => {
        const guess: PerseusGraphType = {
            type: "tangent",
            coords: [
                [1, 1],
                [2, 3],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "tangent"},
            correct: {
                type: "tangent",
                coords: [
                    [0.5, 0.5],
                    [0.75, 0.75],
                ],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("scores equivalent tangent curves as correct (different control points, same curve)", () => {
        // Both sets of coords produce the same canonical tangent curve
        // f(x) = tan(π/4 * x) — just shifted by one full period
        const guess: PerseusGraphType = {
            type: "tangent",
            coords: [
                [4, 0],
                [5, 1],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "tangent"},
            correct: {
                type: "tangent",
                coords: [
                    [0, 0],
                    [1, 1],
                ],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("scores tangent with negative amplitude correctly", () => {
        // Guess has coords that produce a negative amplitude tangent
        const guess: PerseusGraphType = {
            type: "tangent",
            coords: [
                [0, 0],
                [1, -2],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "tangent"},
            correct: {
                type: "tangent",
                coords: [
                    [0, 0],
                    [1, -2],
                ],
            },
        };

        const result = scoreInteractiveGraph(guess, rubric);

        expect(result).toHaveBeenAnsweredCorrectly();
    });
});
