import {moveControlPoint} from "./interactive-graph-action";
import {interactiveGraphReducer} from "./interactive-graph-reducer";

import type {InteractiveGraphState} from "./interactive-graph-state";

describe("moveControlPoint", () => {
    it("moves the given point", () => {
        const state: InteractiveGraphState = {
            hasBeenInteractedWith: false,
            type: "segment",
            range: [
                [0, 10],
                [0, 10],
            ],
            snapStep: [1, 1],
            segments: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            moveControlPoint(0, 0, [5, 6]),
        );

        expect(updated.segments[0]).toEqual([
            [5, 6],
            [3, 4],
        ]);
    });

    it("sets hasBeenInteractedWith", () => {
        const state: InteractiveGraphState = {
            hasBeenInteractedWith: false,
            type: "segment",
            range: [
                [0, 10],
                [0, 10],
            ],
            snapStep: [1, 1],
            segments: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            moveControlPoint(0, 0, [5, 6]),
        );

        expect(updated.hasBeenInteractedWith).toBe(true);
    });
});
