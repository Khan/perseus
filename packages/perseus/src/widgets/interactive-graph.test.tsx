import invariant from "tiny-invariant";

import InteractiveGraph, {
    type Rubric,
    shouldUseMafs,
} from "./interactive-graph";

import type {
    PerseusGraphTypeLinear,
    PerseusGraphTypePoint,
    PerseusGraphTypePolygon,
} from "../perseus-types";
import type {PerseusGraphType} from "@khanacademy/perseus";

function createRubric(graph: PerseusGraphType): Rubric {
    return {graph, correct: graph};
}

describe("InteractiveGraph.validate on a segment question", () => {
    it("marks the answer invalid if guess.coords is missing", () => {
        const guess: PerseusGraphType = {type: "segment"};
        const rubric: Rubric = createRubric({
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
        });

        const result = InteractiveGraph.widget.validate(guess, rubric, null);

        expect(result).toEqual({
            type: "invalid",
            message: null,
        });
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
        const rubric: Rubric = createRubric({
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
        });

        const result = InteractiveGraph.widget.validate(guess, rubric, null);

        expect(result).toEqual({
            type: "points",
            earned: 0,
            total: 1,
            message: null,
        });
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
        const rubric: Rubric = createRubric({
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
        });

        const result = InteractiveGraph.widget.validate(guess, rubric, null);

        expect(result).toEqual({
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        });
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
        const rubric: Rubric = createRubric({
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
        });

        const result = InteractiveGraph.widget.validate(guess, rubric, null);

        expect(result).toEqual({
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        });
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
        const rubric: Rubric = createRubric({
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
        });

        InteractiveGraph.widget.validate(guess, rubric, null);

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
        const rubric: Rubric = createRubric({
            type: "segment",
            coords: [
                [
                    [1, 1],
                    [0, 0],
                ],
            ],
        });

        InteractiveGraph.widget.validate(guess, rubric, null);

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

describe("shouldUseMafs", () => {
    it("is false given no mafs flags", () => {
        const graph: PerseusGraphTypeLinear = {
            type: "linear",
        };
        const mafsFlags = undefined;

        expect(shouldUseMafs(mafsFlags, graph)).toBe(false);
    });

    it("is false when mafs flags is a boolean", () => {
        // boolean values aren't valid; we expect the mafs flags to be an
        // object.
        const graph: PerseusGraphTypeLinear = {
            type: "linear",
        };
        const mafsFlags = true;

        expect(shouldUseMafs(mafsFlags, graph)).toBe(false);
    });

    it("is false for a point graph when the feature flag is off", () => {
        const graph: PerseusGraphTypePoint = {
            type: "point",
            numPoints: 42,
        };
        const mafsFlags = {};

        expect(shouldUseMafs(mafsFlags, graph)).toBe(false);
    });

    it("is true for a point graph when the `point` feature flag is on", () => {
        const graph: PerseusGraphTypePoint = {
            type: "point",
            numPoints: 42,
        };
        const mafsFlags = {
            "point": true,
        };

        expect(shouldUseMafs(mafsFlags, graph)).toBe(true);
    });

    it("is false for a point graph with numPoints = 'unlimited'", () => {
        const graph: PerseusGraphTypePoint = {
            type: "point",
            numPoints: "unlimited",
        };
        const mafsFlags = {
            "point": true,
        };

        expect(shouldUseMafs(mafsFlags, graph)).toBe(false);
    });

    it("is true for a point graph without numPoints set when the feature flag is on", () => {
        // numPoints defaults to 1
        const graph: PerseusGraphTypePoint = {
            type: "point",
        };
        const mafsFlags = {
            "point": true,
        };

        expect(shouldUseMafs(mafsFlags, graph)).toBe(true);
    });

    it("is false for a polygon graph when the feature flag is off", () => {
        const graph: PerseusGraphTypePolygon = {
            type: "polygon",
            numSides: 3,
        };
        const mafsFlags = {};

        expect(shouldUseMafs(mafsFlags, graph)).toBe(false);
    });

    it("is true for a polygon graph when the feature flag is on", () => {
        const graph: PerseusGraphTypePolygon = {
            type: "polygon",
            numSides: 3,
        };
        const mafsFlags = {
            polygon: true,
        };

        expect(shouldUseMafs(mafsFlags, graph)).toBe(true);
    });

    it("is false for a polygon graph when numSides is 'unlimited'", () => {
        const graph: PerseusGraphTypePolygon = {
            type: "polygon",
            numSides: "unlimited",
        };
        const mafsFlags = {
            polygon: true,
        };

        expect(shouldUseMafs(mafsFlags, graph)).toBe(false);
    });

    it("is true for a polygon graph when numSides is not set", () => {
        // numSides defaults to 3
        const graph: PerseusGraphTypePolygon = {
            type: "polygon",
        };
        const mafsFlags = {
            polygon: true,
        };

        expect(shouldUseMafs(mafsFlags, graph)).toBe(true);
    });

    it("is false for a linear graph when the feature flag is off", () => {
        const graph: PerseusGraphTypeLinear = {
            type: "linear",
        };
        const mafsFlags = {};

        expect(shouldUseMafs(mafsFlags, graph)).toBe(false);
    });

    it("is true for a linear graph when the feature flag is on", () => {
        const graph: PerseusGraphTypeLinear = {
            type: "linear",
        };
        const mafsFlags = {
            linear: true,
        };

        expect(shouldUseMafs(mafsFlags, graph)).toBe(true);
    });
});
