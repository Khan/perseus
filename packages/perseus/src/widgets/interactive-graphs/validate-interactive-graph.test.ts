import validateInteractiveGraph from "./validate-interactive-graph";

import type {PerseusGraphType} from "../../perseus-types";
import type {PerseusInteractiveGraphScoringData} from "../../validation.types";

describe("InteractiveGraph validating on a segment question", () => {
    it("marks the answer invalid if guess.coords is missing", () => {
        const guess: PerseusGraphType = {type: "segment"};
        const scoringData: PerseusInteractiveGraphScoringData = {
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

        const validationError = validateInteractiveGraph(guess, scoringData);

        expect(validationError).toHaveInvalidInput();
    });

    it("returns null if guess.coords is present", () => {
        const guess: PerseusGraphType = {
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
        };
        const scoringData: PerseusInteractiveGraphScoringData = {
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

        const validationError = validateInteractiveGraph(guess, scoringData);

        expect(validationError).toBeNull();
    });
});

describe("InteractiveGraph validating on an angle question", () => {
    it("marks the answer invalid if guess.coords is missing", () => {
        const guess: PerseusGraphType = {type: "angle"};
        const scoringData: PerseusInteractiveGraphScoringData = {
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

        const validationError = validateInteractiveGraph(guess, scoringData);

        expect(validationError).toHaveInvalidInput();
    });

    it("returns null if guess.coords is present", () => {
        const guess: PerseusGraphType = {
            type: "angle",
            coords: [
                [1, 1],
                [0, 0],
                [-1, -1],
            ],
            allowReflexAngles: false,
            match: "congruent",
        };
        const scoringData: PerseusInteractiveGraphScoringData = {
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

        const validationError = validateInteractiveGraph(guess, scoringData);

        expect(validationError).toBeNull();
    });
});

describe("InteractiveGraph validating on a point question", () => {
    it("marks the answer invalid if guess.coords is missing", () => {
        const guess: PerseusGraphType = {type: "point"};
        const scoringData: PerseusInteractiveGraphScoringData = {
            graph: {type: "point"},
            correct: {
                type: "point",
                coords: [[0, 0]],
            },
        };

        const validationError = validateInteractiveGraph(guess, scoringData);

        expect(validationError).toHaveInvalidInput();
    });

    it("returns null if guess.coords is present", () => {
        const guess: PerseusGraphType = {
            type: "point",
            coords: [[0, 0]],
        };
        const scoringData: PerseusInteractiveGraphScoringData = {
            graph: {type: "point"},
            correct: {
                type: "point",
                coords: [[0, 0]],
            },
        };

        const validationError = validateInteractiveGraph(guess, scoringData);

        expect(validationError).toBeNull();
    });
});
