import invariant from "tiny-invariant";

import {getGradableGraph} from "./interactive-graph-state";

import type {PerseusGraphType} from "../../../perseus-types";
import type {InteractiveGraphState} from "../types";

const defaultAngleState: InteractiveGraphState = {
    type: "angle",
    coords: [
        [5, 0],
        [0, 0],
        [5, 5],
    ],
    hasBeenInteractedWith: true,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    showAngles: true,
    allowReflexAngles: false,
};

const defaultUnlimitedPointState: InteractiveGraphState = {
    type: "point",
    focusedPointIndex: 0,
    coords: [[5, 0]],
    numPoints: "unlimited",
    hasBeenInteractedWith: true,
    showRemovePointButton: false,
    showKeyboardInteractionInvitation: false,
    interactionMode: "mouse",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

const defaultUnlimitedPolygonState: InteractiveGraphState = {
    type: "polygon",
    closedPolygon: false,
    focusedPointIndex: 0,
    coords: [[5, 0]],
    numSides: "unlimited",
    hasBeenInteractedWith: true,
    showRemovePointButton: false,
    showKeyboardInteractionInvitation: false,
    interactionMode: "mouse",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    snapTo: "grid",
    showSides: true,
    showAngles: true,
};

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

    // (LEMS-2190): This test is to ensure that the new Mafs graph is reversing coordinates when the angle graph
    // is reflexive in a clockwise direction in order to temporarily maintain the same angle scoring with the
    // legacy graph. This logic (& the tests) should be moved to the scoring function after removing the legacy graph.
    it("returns reversed coordinates if the angle graph is reflexive when not allowed", () => {
        const state: InteractiveGraphState = {
            ...defaultAngleState,
            coords: [
                [-5, 0],
                [0, 0],
                [5, 5],
            ],
            hasBeenInteractedWith: true,
        };
        const initialGraph: PerseusGraphType = {
            type: "angle",
        };
        const result = getGradableGraph(state, initialGraph);
        invariant(result.type === "angle");
        expect(result.coords).toEqual([
            [5, 5],
            [0, 0],
            [-5, 0],
        ]);
    });

    it("does not reverse coordinates if the angle graph is not reflexive", () => {
        const state: InteractiveGraphState = {
            ...defaultAngleState,
            coords: [
                [5, 0],
                [0, 0],
                [5, 5],
            ],
            hasBeenInteractedWith: true,
        };
        const initialGraph: PerseusGraphType = {
            type: "angle",
        };
        const result = getGradableGraph(state, initialGraph);
        invariant(result.type === "angle");
        expect(result.coords).toEqual([
            [5, 0],
            [0, 0],
            [5, 5],
        ]);
    });

    it("does not reverse coordinates if the angle graph is allowed to be reflexive", () => {
        const state: InteractiveGraphState = {
            ...defaultAngleState,
            coords: [
                [5, 0],
                [0, 0],
                [-5, -5],
            ],
            hasBeenInteractedWith: true,
            allowReflexAngles: true,
        };
        const initialGraph: PerseusGraphType = {
            type: "angle",
        };
        const result = getGradableGraph(state, initialGraph);
        invariant(result.type === "angle");
        expect(result.coords).toEqual([
            [5, 0],
            [0, 0],
            [-5, -5],
        ]);
    });

    it("returns null coordinates if the unlimited point graph has an empty array of coordinates", () => {
        const state: InteractiveGraphState = {
            ...defaultUnlimitedPointState,
            coords: [],
        };
        const initialGraph: PerseusGraphType = {
            type: "point",
        };
        const result = getGradableGraph(state, initialGraph);
        invariant(result.type === "point");
        expect(result.coords).toEqual(null);
    });

    it("returns coordinates if the unlimited point graph is has at least one coordinate", () => {
        const state: InteractiveGraphState = {
            ...defaultUnlimitedPointState,
            coords: [[1, 0]],
        };
        const initialGraph: PerseusGraphType = {
            type: "point",
        };
        const result = getGradableGraph(state, initialGraph);
        invariant(result.type === "point");
        expect(result.coords).toEqual([[1, 0]]);
    });

    it("returns null coordinates if the unlimited polygon graph is open", () => {
        const state: InteractiveGraphState = {
            ...defaultUnlimitedPolygonState,
            closedPolygon: false,
        };
        const initialGraph: PerseusGraphType = {
            type: "polygon",
        };
        const result = getGradableGraph(state, initialGraph);
        invariant(result.type === "polygon");
        expect(result.coords).toEqual(null);
    });

    it("returns coordinates if the unlimited polygon graph is closed", () => {
        const state: InteractiveGraphState = {
            ...defaultUnlimitedPolygonState,
            closedPolygon: true,
        };
        const initialGraph: PerseusGraphType = {
            type: "polygon",
        };
        const result = getGradableGraph(state, initialGraph);
        invariant(result.type === "polygon");
        expect(result.coords).toEqual([[5, 0]]);
    });
});
