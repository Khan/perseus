import {getGradableGraph} from "./interactive-graph-state";

import type {InteractiveGraphState} from "../types";
import type {PerseusGraphType} from "@khanacademy/perseus";

describe("getGradableGraph", () => {
    /**
     * Originally `getGradableGraph` was returning a PerseusGraphType with just a
     * `type` property, stripping everything else off of `initialGraph`.
     * This caused the editor to keep resetting certain properties (ie `numSegments`).
     */
    it("regression LEMS-1935: false hasBeenInteractedWith returns full initial graph", () => {
        const state: InteractiveGraphState = {
            type: "segment",
            coords: [],
            hasBeenInteractedWith: false,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
        };
        const initialGraph: PerseusGraphType = {
            type: "segment",
            numSegments: 4,
        };
        const result = getGradableGraph(state, initialGraph);

        expect(result).toEqual(initialGraph);
    });
});
