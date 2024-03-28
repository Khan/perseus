import {
    getGradableGraphV2,
    initializeGraphStateV2
} from "./interactive-graph-state-v2";
import {Interval, vec} from "mafs";
import {PerseusGraphType} from "@khanacademy/perseus";
import {GraphObject, InteractiveGraphStateV2} from "./types";

describe("initializeGraphState", () => {
    const step: vec.Vector2 = [1, 1];
    const range: [Interval, Interval] = [
        [-10, 10],
        [-10, 10],
    ];

    it("puts a default segment on the graph", () => {
        const graph: PerseusGraphType = {type: "segment"}
        const result = initializeGraphStateV2({graph, range, step, snapStep: step})
        expect(result.objects).toEqual([{type: "segment", points: [[-5, 5], [5, 5]]}])
    });

    it("puts 2 default segments on the graph when numSegments is 2", () => {
        const graph: PerseusGraphType = {type: "segment", numSegments: 2}
        const result = initializeGraphStateV2({graph, range, step, snapStep: step})
        expect(result.objects).toEqual([
            {type: "segment", points: [[-5, 5], [5, 5]]},
            {type: "segment", points: [[-5, -5], [5, -5]]},
        ])
    });
});

describe("getGradableGraphV2", () => {
    it("returns a blank graph when the user has not interacted with the graph", () => {
        // This is needed to tell the grading code to mark the user's response
        // as invalid / "didn't answer the question"
        const graph: PerseusGraphType = {type: "segment"}
        const state = {
            hasBeenInteractedWith: false,
            objects: [],
        }

        expect(getGradableGraphV2(state, graph)).toEqual({type: "segment"})
    });

    it("returns the positions of a segment's points", () => {
        const graph: PerseusGraphType = {type: "segment"}
        const state = {
            hasBeenInteractedWith: true,
            objects: [{type: "segment", points: [[0, 1], [2, 3]]} as GraphObject],
        }

        expect(getGradableGraphV2(state, graph)).toEqual({
            type: "segment",
            coords: [[[0, 1], [2, 3]]],
        })
    })
})
