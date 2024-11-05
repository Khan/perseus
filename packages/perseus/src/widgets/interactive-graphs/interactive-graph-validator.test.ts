import invariant from "tiny-invariant";

import {clone} from "../../../../../testing/object-utils";

import interactiveGraphValidator from "./interactive-graph-validator";

import type {PerseusGraphType} from "../../perseus-types";
import type {PerseusInteractiveGraphRubric} from "../../validation.types";

describe("InteractiveGraph.validate on a segment question", () => {
    it("marks the answer invalid if guess.coords is missing", () => {
        const guess: PerseusGraphType = {type: "segment"};
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {
                type: "segment",
                coords: [
                    [
                        [0, 0],
                        [1, 1],
                    ],
                ],
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

        const result = interactiveGraphValidator(guess, rubric);

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
            graph: {
                type: "segment",
                coords: [
                    [
                        [0, 0],
                        [1, 1],
                    ],
                ],
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

        const result = interactiveGraphValidator(guess, rubric);

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
            graph: {
                type: "segment",
                coords: [
                    [
                        [0, 0],
                        [1, 1],
                    ],
                ],
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

        const result = interactiveGraphValidator(guess, rubric);

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
            graph: {
                type: "segment",
                coords: [
                    [
                        [0, 0],
                        [1, 1],
                    ],
                ],
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

        const result = interactiveGraphValidator(guess, rubric);

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
            graph: {
                type: "segment",
                coords: [
                    [
                        [0, 0],
                        [1, 1],
                    ],
                ],
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

        interactiveGraphValidator(guess, rubric);

        expect(guess.coords).toEqual([
            [
                [1, 1],
                [0, 0],
            ],
        ]);
    });

    it("does not modify the `rubric` data", () => {
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
            graph: {
                type: "segment",
                coords: [
                    [
                        [1, 1],
                        [0, 0],
                    ],
                ],
            },
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

        interactiveGraphValidator(guess, rubric);

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

describe("InteractiveGraph.validate on an angle question", () => {
    it("marks the answer invalid if guess.coords is missing", () => {
        const guess: PerseusGraphType = {type: "angle"};
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {
                type: "angle",
                coords: [
                    [1, 1],
                    [0, 0],
                    [-1, -1],
                ],
            },
            correct: {
                type: "angle",
                coords: [
                    [1, 1],
                    [0, 0],
                    [-1, -1],
                ],
            },
        };

        const result = interactiveGraphValidator(guess, rubric);

        expect(result).toHaveInvalidInput();
    });
});

describe("InteractiveGraph.validate on a point question", () => {
    it("marks the answer invalid if guess.coords is missing", () => {
        const guess: PerseusGraphType = {type: "point"};
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {
                type: "point",
                coords: [[0, 0]],
            },
            correct: {
                type: "point",
                coords: [[0, 0]],
            },
        };

        const result = interactiveGraphValidator(guess, rubric);

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

        expect(() => interactiveGraphValidator(guess, rubric)).toThrowError();
    });

    it("does not award points if guess.coords is wrong", () => {
        const guess: PerseusGraphType = {
            type: "point",
            coords: [[9, 9]],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {
                type: "point",
                coords: [[0, 0]],
            },
            correct: {
                type: "point",
                coords: [[0, 0]],
            },
        };

        const result = interactiveGraphValidator(guess, rubric);

        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("awards points if guess.coords is right", () => {
        const guess: PerseusGraphType = {
            type: "point",
            coords: [[7, 8]],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {
                type: "point",
                coords: [[7, 8]],
            },
            correct: {
                type: "point",
                coords: [[7, 8]],
            },
        };

        const result = interactiveGraphValidator(guess, rubric);

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
            graph: {
                type: "point",
                coords: [
                    [5, 6],
                    [7, 8],
                ],
            },
            correct: {
                type: "point",
                coords: [
                    [5, 6],
                    [7, 8],
                ],
            },
        };

        const result = interactiveGraphValidator(guess, rubric);

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
            graph: {
                type: "point",
                coords: [
                    [5, 6],
                    [7, 8],
                ],
            },
            correct: {
                type: "point",
                coords: [
                    [5, 6],
                    [7, 8],
                ],
            },
        };

        const guessClone = clone(guess);

        interactiveGraphValidator(guess, rubric);

        expect(guess).toEqual(guessClone);
    });

    it("does not modify the `rubric` data", () => {
        const guess: PerseusGraphType = {
            type: "point",
            coords: [
                [7, 8],
                [5, 6],
            ],
        };
        const rubric: PerseusInteractiveGraphRubric = {
            graph: {
                type: "point",
                coords: [
                    [5, 6],
                    [7, 8],
                ],
            },
            correct: {
                type: "point",
                coords: [
                    [5, 6],
                    [7, 8],
                ],
            },
        };

        const rubricClone = clone(rubric);

        interactiveGraphValidator(guess, rubric);

        expect(rubric).toEqual(rubricClone);
    });
});
