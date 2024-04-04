import invariant from "tiny-invariant";

import InteractiveGraph, {type Rubric} from "./interactive-graph";

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

        invariant(rubric.correct.type === "segment");
        expect(rubric.correct.coords).toEqual([
            [
                [1, 1],
                [0, 0],
            ],
        ]);
    });
});
