import {mafsStateToInteractiveGraph} from "./mafs-state-to-interactive-graph";

import type {
    AngleGraphState,
    CircleGraphState,
    InteractiveGraphStateCommon,
    LinearGraphState,
    LinearSystemGraphState,
    NoneGraphState,
    PointGraphState,
    PolygonGraphState,
    QuadraticGraphState,
    RayGraphState,
    SegmentGraphState,
    SinusoidGraphState,
} from "./types";
import type {PerseusGraphType} from "../../perseus-types";

const commonGraphState: InteractiveGraphStateCommon = {
    hasBeenInteractedWith: true,
    range: [
        [-9, 9],
        [-9, 9],
    ],
    snapStep: [9, 9],
};

describe("mafsStateToInteractiveGraph", () => {
    it("converts the state of an angle graph", () => {
        const graph: PerseusGraphType = {
            type: "angle",
            match: "congruent",
        };
        const state: AngleGraphState = {
            ...commonGraphState,
            type: "angle",
            showAngles: true,
            allowReflexAngles: true,
            angleOffsetDeg: 7,
            snapDegrees: 8,
            coords: [
                [9, 10],
                [11, 12],
                [13, 14],
            ],
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(
            state,
            graph,
        );

        expect(result).toEqual({
            type: "angle",
            match: "congruent",
            coords: [
                [9, 10],
                [11, 12],
                [13, 14],
            ],
        });
    });

    it("converts the state of a circle graph", () => {
        const graph: PerseusGraphType = {
            type: "circle",
            startCoords: {
                radius: 3,
                center: [4, 5],
            },
        };
        const state: CircleGraphState = {
            type: "circle",
            center: [1, 2],
            radiusPoint: [3, 2],
            hasBeenInteractedWith: true,
            range: [
                [-9, 9],
                [-9, 9],
            ],
            snapStep: [9, 9],
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(
            state,
            graph,
        );

        expect(result).toEqual({
            type: "circle",
            radius: 2,
            center: [1, 2],
            startCoords: {
                radius: 3,
                center: [4, 5],
            },
        });
    });

    it("converts the state of a segment graph", () => {
        const graph: PerseusGraphType = {
            type: "segment",
            numSegments: 7,
        };
        const state: SegmentGraphState = {
            ...commonGraphState,
            type: "segment",
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(
            state,
            graph,
        );

        expect(result).toEqual({
            type: "segment",
            numSegments: 7,
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        });
    });

    it("converts the state of a linear graph", () => {
        const graph: PerseusGraphType = {
            type: "linear",
            startCoords: [
                [5, 6],
                [7, 8],
            ],
        };
        const state: LinearGraphState = {
            ...commonGraphState,
            type: "linear",
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(
            state,
            graph,
        );

        expect(result).toEqual({
            type: "linear",
            coords: [
                [1, 2],
                [3, 4],
            ],
            startCoords: [
                [5, 6],
                [7, 8],
            ],
        });
    });

    it("converts the state of a linear-system graph", () => {
        const graph: PerseusGraphType = {
            type: "linear-system",
            startCoords: [
                [
                    [9, 10],
                    [11, 12],
                ],
            ],
        };
        const state: LinearSystemGraphState = {
            ...commonGraphState,
            type: "linear-system",
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
                [
                    [5, 6],
                    [7, 8],
                ],
            ],
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(
            state,
            graph,
        );

        expect(result).toEqual({
            type: "linear-system",
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
                [
                    [5, 6],
                    [7, 8],
                ],
            ],
            startCoords: [
                [
                    [9, 10],
                    [11, 12],
                ],
            ],
        });
    });

    it("converts the state of a ray graph", () => {
        const graph: PerseusGraphType = {
            type: "ray",
            startCoords: [
                [5, 6],
                [7, 8],
            ],
        };
        const state: RayGraphState = {
            ...commonGraphState,
            type: "ray",
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(
            state,
            graph,
        );

        expect(result).toEqual({
            type: "ray",
            coords: [
                [1, 2],
                [3, 4],
            ],
            startCoords: [
                [5, 6],
                [7, 8],
            ],
        });
    });

    it("converts the state of a polygon graph", () => {
        const graph: PerseusGraphType = {
            type: "polygon",
            match: "approx",
        };
        const state: PolygonGraphState = {
            ...commonGraphState,
            type: "polygon",
            showAngles: true,
            showSides: true,
            snapTo: "sides",
            focusedPointIndex: 99,
            showRemovePointButton: true,
            showKeyboardInteractionInvitation: true,
            interactionMode: "mouse",
            coords: [
                [1, 2],
                [3, 4],
                [5, 6],
            ],
            closedPolygon: false,
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(
            state,
            graph,
        );

        expect(result).toEqual({
            type: "polygon",
            match: "approx",
            coords: [
                [1, 2],
                [3, 4],
                [5, 6],
            ],
        });
    });

    it("converts the state of a point graph", () => {
        const graph: PerseusGraphType = {
            type: "point",
            numPoints: "unlimited",
            startCoords: [[7, 8]],
        };
        const state: PointGraphState = {
            ...commonGraphState,
            type: "point",
            numPoints: "unlimited",
            focusedPointIndex: 99,
            showRemovePointButton: true,
            showKeyboardInteractionInvitation: true,
            interactionMode: "mouse",
            coords: [
                [1, 2],
                [3, 4],
                [5, 6],
            ],
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(
            state,
            graph,
        );

        expect(result).toEqual({
            type: "point",
            numPoints: "unlimited",
            coords: [
                [1, 2],
                [3, 4],
                [5, 6],
            ],
            startCoords: [[7, 8]],
        });
    });

    it("converts the state of a quadratic graph", () => {
        const graph: PerseusGraphType = {
            type: "quadratic",
            startCoords: [
                [7, 8],
                [9, 10],
                [11, 12],
            ],
        };
        const state: QuadraticGraphState = {
            ...commonGraphState,
            type: "quadratic",
            coords: [
                [1, 2],
                [3, 4],
                [5, 6],
            ],
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(
            state,
            graph,
        );

        expect(result).toEqual({
            type: "quadratic",
            coords: [
                [1, 2],
                [3, 4],
                [5, 6],
            ],
            startCoords: [
                [7, 8],
                [9, 10],
                [11, 12],
            ],
        });
    });

    it("converts the state of a sinusoid graph", () => {
        const graph: PerseusGraphType = {
            type: "sinusoid",
            startCoords: [
                [5, 6],
                [7, 8],
            ],
        };
        const state: SinusoidGraphState = {
            ...commonGraphState,
            type: "sinusoid",
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(
            state,
            graph,
        );

        expect(result).toEqual({
            type: "sinusoid",
            coords: [
                [1, 2],
                [3, 4],
            ],
            startCoords: [
                [5, 6],
                [7, 8],
            ],
        });
    });

    it("converts the state of a none-type graph", () => {
        const graph: PerseusGraphType = {
            type: "none",
        };
        const state: NoneGraphState = {
            ...commonGraphState,
            type: "none",
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(
            state,
            graph,
        );

        expect(result).toEqual({
            type: "none",
        });
    });
});
