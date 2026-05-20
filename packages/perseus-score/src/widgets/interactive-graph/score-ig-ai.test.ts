// STOPSHIP: don't land this as-is, it needs to be removed or merged with the real test file

import scoreInteractiveGraph from "./score-interactive-graph";

import type {
    PerseusGraphType,
    PerseusInteractiveGraphRubric,
} from "@khanacademy/perseus-core";

// Fills in the graph-type branches not exercised by score-interactive-graph.test.ts:
// "none", linear, linear-system, quadratic, sinusoid, circle, polygon, ray, and the
// `match: "congruent"` path on angle.

describe("scoreInteractiveGraph: 'none' type", () => {
    it("returns 0 earned / 0 total (ungraded) when both graphs are 'none'", () => {
        // Arrange
        const guess: PerseusGraphType = {type: "none"};
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "none"},
            correct: {type: "none"},
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toEqual({
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        });
    });
});

describe("scoreInteractiveGraph: linear type", () => {
    const rubric: PerseusInteractiveGraphRubric = {
        graph: {type: "linear"},
        correct: {
            type: "linear",
            coords: [
                [0, 0],
                [1, 1],
            ],
        },
    };

    it("awards points when both guess points lie on the correct line", () => {
        // Arrange — different points but on y = x
        const guess: PerseusGraphType = {
            type: "linear",
            coords: [
                [2, 2],
                [3, 3],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not award points when a guess point is off the correct line", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "linear",
            coords: [
                [0, 0],
                [1, 2],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});

describe("scoreInteractiveGraph: linear-system type", () => {
    const rubric: PerseusInteractiveGraphRubric = {
        graph: {type: "linear-system"},
        correct: {
            type: "linear-system",
            coords: [
                [
                    [0, 0],
                    [1, 0],
                ], // y = 0
                [
                    [0, 0],
                    [0, 1],
                ], // x = 0
            ],
        },
    };

    it("awards points when guess lines match in the same order", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "linear-system",
            coords: [
                [
                    [2, 0],
                    [3, 0],
                ],
                [
                    [0, 2],
                    [0, 3],
                ],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("awards points when guess lines match in swapped order", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "linear-system",
            coords: [
                [
                    [0, 2],
                    [0, 3],
                ],
                [
                    [2, 0],
                    [3, 0],
                ],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not award points when a guess line doesn't match either correct line", () => {
        // Arrange — first guess is y = x, neither correct line
        const guess: PerseusGraphType = {
            type: "linear-system",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
                [
                    [0, 0],
                    [0, 1],
                ],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});

describe("scoreInteractiveGraph: quadratic type", () => {
    const rubric: PerseusInteractiveGraphRubric = {
        graph: {type: "quadratic"},
        correct: {
            type: "quadratic",
            coords: [
                [-1, 1],
                [0, 0],
                [1, 1],
            ],
        },
    };

    it("awards points when the same parabola coefficients are produced", () => {
        // Arrange — same parabola y = x^2 via different control points
        const guess: PerseusGraphType = {
            type: "quadratic",
            coords: [
                [-2, 4],
                [0, 0],
                [2, 4],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not award points for a different parabola", () => {
        // Arrange — y = x^2 + 1
        const guess: PerseusGraphType = {
            type: "quadratic",
            coords: [
                [-1, 2],
                [0, 1],
                [1, 2],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});

describe("scoreInteractiveGraph: sinusoid type", () => {
    const rubric: PerseusInteractiveGraphRubric = {
        graph: {type: "sinusoid"},
        correct: {
            type: "sinusoid",
            coords: [
                [0, 0],
                [1, 1],
            ],
        },
    };

    it("awards points when canonical sinusoid coefficients match", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "sinusoid",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not award points for a sinusoid with different amplitude", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "sinusoid",
            coords: [
                [0, 0],
                [1, 2],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});

describe("scoreInteractiveGraph: circle type", () => {
    const rubric: PerseusInteractiveGraphRubric = {
        graph: {type: "circle"},
        correct: {
            type: "circle",
            center: [0, 0],
            radius: 5,
        },
    };

    it("awards points when center and radius match", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "circle",
            center: [0, 0],
            radius: 5,
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not award points when the center is wrong", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "circle",
            center: [1, 0],
            radius: 5,
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("does not award points when the radius is wrong", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "circle",
            center: [0, 0],
            radius: 4,
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});

describe("scoreInteractiveGraph: polygon type with exact match", () => {
    // The "exact" branch is the `else` fallback in the polygon scoring
    // switch — it fires whenever `match` is not "similar"/"congruent"/"approx".
    // The type union restricts `match` to those three values, so we omit
    // `match` here to exercise the fallback.
    const rubric: PerseusInteractiveGraphRubric = {
        graph: {type: "polygon"},
        // @ts-expect-error: deliberately omitting `match` to hit the "exact" fallback
        correct: {
            type: "polygon",
            coords: [
                [0, 0],
                [1, 0],
                [0, 1],
            ],
        },
    };

    it("awards points when vertices match (order is normalized by sorting)", () => {
        // Arrange — same vertices, different order
        const guess: PerseusGraphType = {
            type: "polygon",
            coords: [
                [0, 1],
                [0, 0],
                [1, 0],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not award points when vertices differ", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "polygon",
            coords: [
                [0, 0],
                [2, 0],
                [0, 2],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});

describe("scoreInteractiveGraph: polygon type with similar match", () => {
    const rubric: PerseusInteractiveGraphRubric = {
        graph: {type: "polygon"},
        correct: {
            type: "polygon",
            match: "similar",
            coords: [
                [0, 0],
                [1, 0],
                [0, 1],
            ],
        },
    };

    it("awards points for a scaled-up similar polygon", () => {
        // Arrange — same shape at 2x scale
        const guess: PerseusGraphType = {
            type: "polygon",
            coords: [
                [0, 0],
                [2, 0],
                [0, 2],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not award points for a polygon with different proportions", () => {
        // Arrange — non-similar (3:1 vs 1:1 right triangle)
        const guess: PerseusGraphType = {
            type: "polygon",
            coords: [
                [0, 0],
                [3, 0],
                [0, 1],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});

describe("scoreInteractiveGraph: polygon type with congruent match", () => {
    const rubric: PerseusInteractiveGraphRubric = {
        graph: {type: "polygon"},
        correct: {
            type: "polygon",
            match: "congruent",
            coords: [
                [0, 0],
                [1, 0],
                [0, 1],
            ],
        },
    };

    it("awards points for a translated congruent polygon", () => {
        // Arrange — same shape and size, different position
        const guess: PerseusGraphType = {
            type: "polygon",
            coords: [
                [2, 2],
                [3, 2],
                [2, 3],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not award points for a scaled (similar but not congruent) polygon", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "polygon",
            coords: [
                [0, 0],
                [2, 0],
                [0, 2],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});

describe("scoreInteractiveGraph: polygon type with approx match", () => {
    const rubric: PerseusInteractiveGraphRubric = {
        graph: {type: "polygon"},
        correct: {
            type: "polygon",
            match: "approx",
            coords: [
                [0, 0],
                [1, 0],
                [0, 1],
            ],
        },
    };

    it("awards points for a translated polygon within tolerance", () => {
        // Arrange — same shape and size, translated by (2, 2)
        const guess: PerseusGraphType = {
            type: "polygon",
            coords: [
                [2, 2],
                [3, 2],
                [2, 3],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not award points for a polygon outside the approx tolerance", () => {
        // Arrange — 2x scale is well past 0.1 tolerance
        const guess: PerseusGraphType = {
            type: "polygon",
            coords: [
                [0, 0],
                [2, 0],
                [0, 2],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});

describe("scoreInteractiveGraph: ray type", () => {
    const rubric: PerseusInteractiveGraphRubric = {
        graph: {type: "ray"},
        correct: {
            type: "ray",
            coords: [
                [0, 0],
                [1, 1],
            ],
        },
    };

    it("awards points when origin matches and direction point is collinear", () => {
        // Arrange — same origin, different point further along y = x
        const guess: PerseusGraphType = {
            type: "ray",
            coords: [
                [0, 0],
                [2, 2],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not award points when origin is wrong", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "ray",
            coords: [
                [1, 1],
                [2, 2],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("does not award points when direction point is not on the ray's line", () => {
        // Arrange
        const guess: PerseusGraphType = {
            type: "ray",
            coords: [
                [0, 0],
                [1, 2],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});

describe("scoreInteractiveGraph: angle type with congruent match", () => {
    const rubric: PerseusInteractiveGraphRubric = {
        graph: {type: "angle"},
        correct: {
            type: "angle",
            match: "congruent",
            allowReflexAngles: false,
            coords: [
                [1, 0],
                [0, 0],
                [0, 1],
            ],
        },
    };

    it("awards points for a translated angle with the same measure", () => {
        // Arrange — same 90° angle, vertex translated to (2, 2)
        const guess: PerseusGraphType = {
            type: "angle",
            coords: [
                [3, 2],
                [2, 2],
                [2, 3],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("does not award points for an angle with a different measure", () => {
        // Arrange — straight (180°) angle vs the 90° correct angle
        const guess: PerseusGraphType = {
            type: "angle",
            coords: [
                [1, 0],
                [0, 0],
                [-1, 0],
            ],
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});

describe("scoreInteractiveGraph: angle defensive null-coords guards", () => {
    it("returns invalid when the angle guess satisfies hasValue without coords", () => {
        // Characterization: hasValue accepts a truthy `coords` OR a truthy
        // `center && radius`. Smuggling center/radius onto an angle guess
        // satisfies hasValue while leaving coords undefined, hitting the
        // defensive `if (!coords)` guard inside the angle branch.
        const guess = {
            type: "angle",
            center: [0, 0],
            radius: 5,
        } as unknown as PerseusGraphType;
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "angle"},
            correct: {
                type: "angle",
                allowReflexAngles: false,
                coords: [
                    [1, 0],
                    [0, 0],
                    [0, 1],
                ],
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("does not award points when rubric.correct.coords is missing under congruent match", () => {
        // Characterization: hits the inner `if (!coords)` guard inside the
        // _.map over [guess, correct]. With a valid guess and missing correct
        // coords, the mapped angle becomes `false`, approximateEqual fails,
        // and we fall through to incorrect.
        const guess: PerseusGraphType = {
            type: "angle",
            coords: [
                [1, 0],
                [0, 0],
                [0, 1],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {type: "angle"},
            // @ts-expect-error: testing the defensive guard for missing correct.coords
            correct: {
                type: "angle",
                match: "congruent",
                allowReflexAngles: false,
            },
        };

        // Act
        const result = scoreInteractiveGraph(guess, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});
