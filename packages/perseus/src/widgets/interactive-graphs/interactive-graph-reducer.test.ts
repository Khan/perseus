import {moveControlPoint, moveSegment} from "./interactive-graph-action";
import {interactiveGraphReducer} from "./interactive-graph-reducer";

import type {InteractiveGraphState} from "./types";

const baseSegmentGraphState: InteractiveGraphState = {
    hasBeenInteractedWith: false,
    type: "segment",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    coords: [],
};

describe("moveControlPoint", () => {
    it("moves the given point", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            moveControlPoint(0, [5, 6], 0),
        );

        expect(updated.coords?.[0]).toEqual([
            [5, 6],
            [3, 4],
        ]);
    });

    it("sets hasBeenInteractedWith", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            moveControlPoint(0, [5, 6], 0),
        );

        expect(updated.hasBeenInteractedWith).toBe(true);
    });

    it("does not allow moving the endpoints of a segment to the same location", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
            coords: [
                [
                    [1, 1],
                    [2, 2],
                ],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            moveControlPoint(0, [2, 2], 0),
        );

        // Assert: the move was canceled
        expect(updated.coords?.[0]).toEqual([
            [1, 1],
            [2, 2],
        ]);
    });

    it("snaps points to the snap grid", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
            snapStep: [1, 2],
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            moveControlPoint(0, [1.5, 6.6], 0),
        );

        // Assert: x snaps to the nearest whole number; y snaps to the nearest
        // multiple of 2.
        expect(updated.coords?.[0][0]).toEqual([2, 6]);
    });

    it("constrains points to be at least one snap step within the graph bounds", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
            snapStep: [0.5, 0.5],
            range: [
                [-5, 5],
                [-8, 8],
            ],
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            moveControlPoint(0, [99, 99], 0),
        );

        expect(updated.coords?.[0][0]).toEqual([4.5, 7.5]);
    });
});

describe("moveSegment", () => {
    it("moves an entire segment by the given delta vector", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        };

        const updated = interactiveGraphReducer(state, moveSegment(0, [5, -3]));

        expect(updated.coords?.[0]).toEqual([
            [6, -1],
            [8, 1],
        ]);
    });

    it("snaps to the snap grid", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            moveSegment(0, [0.5, 0.5]),
        );

        expect(updated.coords?.[0]).toEqual([
            [2, 3],
            [4, 5],
        ]);
    });

    it("keeps the segment within the graph bounds", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            moveSegment(0, [99, 99]),
        );

        expect(updated.coords?.[0]).toEqual([
            [7, 7],
            [9, 9],
        ]);
    });

    it("sets hasBeenInteractedWith", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        };

        const updated = interactiveGraphReducer(state, moveSegment(0, [1, 1]));

        expect(updated.hasBeenInteractedWith).toBe(true);
    });
});
