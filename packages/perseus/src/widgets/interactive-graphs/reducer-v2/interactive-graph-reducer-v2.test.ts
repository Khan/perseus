import {InteractiveGraphStateV2} from "./types";
import {interactiveGraphReducerV2} from "./interactive-graph-reducer-v2";
import {moveControlPoint} from "./interactive-graph-action-v2";

const baseGraphState: InteractiveGraphStateV2 = {
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    objects: [],
};

describe("moveControlPoint", () => {
    it("moves the given point", () => {
        const state: InteractiveGraphStateV2 = {
            ...baseGraphState,
            objects: [
                {
                    type: "segment", points: [
                        [1, 2],
                        [3, 4],
                    ]
                },
            ],
        };

        const updated = interactiveGraphReducerV2(
            state,
            moveControlPoint(0, [5, 6], 0),
        );

        expect(updated.objects[0]).toEqual({
            type: "segment", points: [
                [5, 6],
                [3, 4],
            ]
        });
    });

    it("sets hasBeenInteractedWith", () => {
        const state: InteractiveGraphStateV2 = {
            ...baseGraphState,
            objects: [
                {
                    type: "segment", points: [
                        [1, 2],
                        [3, 4],
                    ]
                },
            ],
        };

        const updated = interactiveGraphReducerV2(
            state,
            moveControlPoint(0, [5, 6], 0),
        );

        expect(updated.hasBeenInteractedWith).toBe(true);
    });

    it("does not allow moving the endpoints of a segment to the same location", () => {
        const state: InteractiveGraphStateV2 = {
            ...baseGraphState,
            objects: [
                {
                    type: "segment", points: [
                        [1, 1],
                        [2, 2],
                    ]
                },
            ],
        };

        const updated = interactiveGraphReducerV2(
            state,
            moveControlPoint(0, [2, 2], 0),
        );

        // Assert: the move was canceled
        expect(updated.objects[0]).toEqual({
            type: "segment", points: [
                [1, 1],
                [2, 2],
            ]
        });
    });

    it("snaps points to the snap grid", () => {
        const state: InteractiveGraphStateV2 = {
            ...baseGraphState,
            snapStep: [1, 2],
            objects: [
                {
                    type: "segment", points: [
                        [1, 2],
                        [3, 4],
                    ]
                },
            ],
        };

        const updated = interactiveGraphReducerV2(
            state,
            moveControlPoint(0, [1.5, 6.6], 0),
        );

        // Assert: x snaps to the nearest whole number; y snaps to the nearest
        // multiple of 2.
        expect(updated.objects[0].points[0]).toEqual([2, 6]);
    });

    it("constrains points to be at least one snap step within the graph bounds", () => {
        const state: InteractiveGraphStateV2 = {
            ...baseGraphState,
            snapStep: [0.5, 0.5],
            range: [
                [-5, 5],
                [-8, 8],
            ],
            objects: [
                {
                    type: "segment", points: [
                        [1, 2],
                        [3, 4],
                    ]
                },
            ],
        };

        const updated = interactiveGraphReducerV2(
            state,
            moveControlPoint(0, [99, 99], 0),
        );

        expect(updated.objects[0].points[0]).toEqual([4.5, 7.5]);
    });
});
