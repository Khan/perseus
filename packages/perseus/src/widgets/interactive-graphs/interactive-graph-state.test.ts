import {initializeGraphState} from "./interactive-graph-state";

describe("initializeGraphState", () => {
    it("sets the range and snapStep", () => {
        const state = initializeGraphState({
            range: [
                [0, 10],
                [1, 20],
            ],
            step: [1, 1],
            snapStep: [2, 3],
            graph: {type: "segment"},
        });
        expect(state.range).toEqual([
            [0, 10],
            [1, 20],
        ]);
        expect(state.snapStep).toEqual([2, 3]);
    });

    it("puts a default segment on a segment graph", () => {
        const state = initializeGraphState({
            range: [
                [-10, 10],
                [-10, 10],
            ],
            step: [1, 1],
            snapStep: [1, 1],
            graph: {type: "segment"},
        });
        expect(state.segments).toEqual([
            [
                [-5, 5],
                [5, 5],
            ],
        ]);
    });
});
