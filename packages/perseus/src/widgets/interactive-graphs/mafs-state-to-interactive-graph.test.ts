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

        const result: PerseusGraphType = mafsStateToInteractiveGraph(state);

        expect(result).toEqual({
            type: "angle",
            coords: [
                [9, 10],
                [11, 12],
                [13, 14],
            ],
        });
    });

    it("converts the state of a circle graph", () => {
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

        const result: PerseusGraphType = mafsStateToInteractiveGraph(state);

        expect(result).toEqual({
            type: "circle",
            radius: 2,
            center: [1, 2],
        });
    });

    it("converts the state of a segment graph", () => {
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

        const result: PerseusGraphType = mafsStateToInteractiveGraph(state);

        expect(result).toEqual({
            type: "segment",
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        });
    });

    it("converts the state of a linear graph", () => {
        const state: LinearGraphState = {
            ...commonGraphState,
            type: "linear",
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(state);

        expect(result).toEqual({
            type: "linear",
            coords: [
                [1, 2],
                [3, 4],
            ],
        });
    });

    it("converts the state of a linear-system graph", () => {
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

        const result: PerseusGraphType = mafsStateToInteractiveGraph(state);

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
        });
    });

    it("converts the state of a ray graph", () => {
        const state: RayGraphState = {
            ...commonGraphState,
            type: "ray",
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(state);

        expect(result).toEqual({
            type: "ray",
            coords: [
                [1, 2],
                [3, 4],
            ],
        });
    });

    it("converts the state of a polygon graph", () => {
        const state: PolygonGraphState = {
            ...commonGraphState,
            type: "polygon",
            showAngles: true,
            showSides: true,
            snapTo: "sides",
            coords: [
                [1, 2],
                [3, 4],
                [5, 6],
            ],
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(state);

        expect(result).toEqual({
            type: "polygon",
            coords: [
                [1, 2],
                [3, 4],
                [5, 6],
            ],
        });
    });

    it("converts the state of a point graph", () => {
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

        const result: PerseusGraphType = mafsStateToInteractiveGraph(state);

        expect(result).toEqual({
            type: "point",
            coords: [
                [1, 2],
                [3, 4],
                [5, 6],
            ],
        });
    });

    it("converts the state of a quadratic graph", () => {
        const state: QuadraticGraphState = {
            ...commonGraphState,
            type: "quadratic",
            coords: [
                [1, 2],
                [3, 4],
                [5, 6],
            ],
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(state);

        expect(result).toEqual({
            type: "quadratic",
            coords: [
                [1, 2],
                [3, 4],
                [5, 6],
            ],
        });
    });

    it("converts the state of a sinusoid graph", () => {
        const state: SinusoidGraphState = {
            ...commonGraphState,
            type: "sinusoid",
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(state);

        expect(result).toEqual({
            type: "sinusoid",
            coords: [
                [1, 2],
                [3, 4],
            ],
        });
    });

    it("converts the state of a none-type graph", () => {
        const state: NoneGraphState = {
            ...commonGraphState,
            type: "none",
        };

        const result: PerseusGraphType = mafsStateToInteractiveGraph(state);

        expect(result).toEqual({
            type: "none",
        });
    });
});
