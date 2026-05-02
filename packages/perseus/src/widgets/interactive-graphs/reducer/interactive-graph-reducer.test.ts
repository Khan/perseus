import {angles} from "@khanacademy/kmath";
import invariant from "tiny-invariant";

import {changeSnapStep, changeRange, actions} from "./interactive-graph-action";
import {interactiveGraphReducer} from "./interactive-graph-reducer";

import type {
    CircleGraphState,
    ExponentialGraphState,
    PointGraphState,
    InteractiveGraphState,
    PolygonGraphState,
    TangentGraphState,
    LogarithmGraphState,
    VectorGraphState,
} from "../types";
import type {GraphRange} from "@khanacademy/perseus-core";

const {getClockwiseAngle} = angles;

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

const basePointGraphState: InteractiveGraphState = {
    hasBeenInteractedWith: false,
    showRemovePointButton: false,
    interactionMode: "mouse",
    showKeyboardInteractionInvitation: false,
    type: "point",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    focusedPointIndex: null,
    snapStep: [1, 1],
    coords: [],
};

const baseUnlimitedPointGraphState: PointGraphState = {
    hasBeenInteractedWith: false,
    showRemovePointButton: false,
    interactionMode: "mouse",
    showKeyboardInteractionInvitation: false,
    type: "point",
    numPoints: "unlimited",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    focusedPointIndex: null,
    snapStep: [1, 1],
    coords: [],
};

const baseAngleGraphState: InteractiveGraphState = {
    hasBeenInteractedWith: false,
    type: "angle",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    coords: [
        [0, 0],
        [0, 1],
        [1, 0],
    ],
};

const baseCircleGraphState: InteractiveGraphState = {
    hasBeenInteractedWith: false,
    type: "circle",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    center: [0, 0],
    radiusPoint: [2, 0],
};

const baseRayGraphState: InteractiveGraphState = {
    hasBeenInteractedWith: false,
    type: "ray",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    coords: [
        [0, 0],
        [5, 5],
    ],
};

const baseSinusoidGraphState: InteractiveGraphState = {
    hasBeenInteractedWith: false,
    type: "sinusoid",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    coords: [
        [0, 0],
        [1, 1],
    ],
};

function generateTangentGraphState(
    overrides?: Partial<Omit<TangentGraphState, "type">>,
): TangentGraphState {
    return {
        hasBeenInteractedWith: false,
        type: "tangent",
        range: [
            [-10, 10],
            [-10, 10],
        ],
        snapStep: [1, 1],
        coords: [
            [0, 0],
            [1, 1],
        ],
        ...overrides,
    };
}

const baseQuadraticGraphState: InteractiveGraphState = {
    hasBeenInteractedWith: false,
    type: "quadratic",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    coords: [
        [-1, 1],
        [0, 0],
        [1, 1],
    ],
};

const basePolygonGraphState: InteractiveGraphState = {
    showRemovePointButton: false,
    interactionMode: "mouse",
    showKeyboardInteractionInvitation: false,
    focusedPointIndex: null,
    hasBeenInteractedWith: false,
    type: "polygon",
    showAngles: false,
    showSides: false,
    snapTo: "grid",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    coords: [
        [0, 0],
        [0, 1],
        [1, 0],
    ],
    closedPolygon: false,
};

const baseUnlimitedPolygonGraphState: PolygonGraphState = {
    showRemovePointButton: false,
    interactionMode: "mouse",
    showKeyboardInteractionInvitation: false,
    focusedPointIndex: null,
    hasBeenInteractedWith: false,
    type: "polygon",
    showAngles: false,
    showSides: false,
    snapTo: "grid",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    coords: [],
    numSides: "unlimited",
    closedPolygon: false,
};

describe("movePointInFigure", () => {
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
            actions.segment.movePointInFigure(0, 0, [5, 6]),
        );

        invariant(updated.type === "segment");
        expect(updated.coords[0]).toEqual([
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
            actions.segment.movePointInFigure(0, 0, [5, 6]),
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
            actions.segment.movePointInFigure(0, 0, [2, 2]),
        );

        invariant(updated.type === "segment");
        // Assert: the move was canceled
        expect(updated.coords[0]).toEqual([
            [1, 1],
            [2, 2],
        ]);
    });

    it("does not allow moving the endpoints of a linear graph to the same location", () => {
        const state: InteractiveGraphState = {
            hasBeenInteractedWith: false,
            type: "linear",
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
            coords: [
                [1, 1],
                [2, 2],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.linear.movePoint(0, [2, 2]),
        );

        invariant(updated.type === "linear");
        expect(updated.hasBeenInteractedWith).toBe(false);
        expect(updated.coords).toEqual([
            [1, 1],
            [2, 2],
        ]);
    });

    it("does not allow moving the endpoints of a ray to the same location", () => {
        const state: InteractiveGraphState = {
            hasBeenInteractedWith: false,
            type: "ray",
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
            coords: [
                [1, 1],
                [2, 2],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.ray.movePoint(0, [2, 2]),
        );

        invariant(updated.type === "ray");
        expect(updated.hasBeenInteractedWith).toBe(false);
        expect(updated.coords).toEqual([
            [1, 1],
            [2, 2],
        ]);
    });

    it("does not allow moving the endpoints of a sinusoid to the same x location", () => {
        const state: InteractiveGraphState = {
            ...baseSinusoidGraphState,
            coords: [
                [1, 1],
                [2, 2],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.sinusoid.movePoint(0, [2, 1]),
        );

        invariant(updated.type === "sinusoid");
        // Assert: the move was canceled
        expect(updated.coords).toEqual([
            [1, 1],
            [2, 2],
        ]);
    });

    it("rejects a sinusoid move with a destination that clamps onto the other point's x", () => {
        // coords: point 0 at x=8, point 1 at x=10 (at the edge).
        // Moving point 0 to [15, 5] clamps to [10, 5] (range max 10),
        // which matches point 1's x. The same-x guard rejects it.
        const state: InteractiveGraphState = {
            ...baseSinusoidGraphState,
            coords: [
                [8, 1],
                [10, 2],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.sinusoid.movePoint(0, [15, 5]),
        );

        invariant(updated.type === "sinusoid");
        expect(updated.hasBeenInteractedWith).toBe(false);
        expect(updated.coords).toEqual([
            [8, 1],
            [10, 2],
        ]);
    });

    it("does not allow moving the endpoints of a tangent to the same x location", () => {
        const state = generateTangentGraphState({
            coords: [
                [1, 1],
                [2, 2],
            ],
        });

        const updated = interactiveGraphReducer(
            state,
            actions.tangent.movePoint(0, [2, 1]),
        );

        invariant(updated.type === "tangent");
        // Assert: the move was canceled
        expect(updated.coords).toEqual([
            [1, 1],
            [2, 2],
        ]);
    });

    it("rejects a tangent move with a destination that clamps onto the other point's x", () => {
        // coords: point 0 at x=8, point 1 at x=10 (at the edge).
        // Moving point 0 to [15, 5] clamps to [10, 5] (range max 10),
        // which matches point 1's x. The same-x guard rejects it.
        const state = generateTangentGraphState({
            coords: [
                [8, 1],
                [10, 2],
            ],
        });

        const updated = interactiveGraphReducer(
            state,
            actions.tangent.movePoint(0, [15, 5]),
        );

        invariant(updated.type === "tangent");
        expect(updated.hasBeenInteractedWith).toBe(false);
        expect(updated.coords).toEqual([
            [8, 1],
            [10, 2],
        ]);
    });

    it("allows moving a tangent endpoint to a valid position", () => {
        const state = generateTangentGraphState({
            coords: [
                [0, 0],
                [1, 1],
            ],
        });

        const updated = interactiveGraphReducer(
            state,
            actions.tangent.movePoint(1, [3, 4]),
        );

        invariant(updated.type === "tangent");
        expect(updated.hasBeenInteractedWith).toBe(true);
        expect(updated.coords).toEqual([
            [0, 0],
            [3, 4],
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
            actions.segment.movePointInFigure(0, 0, [1.5, 6.6]),
        );

        // Assert
        invariant(updated.type === "segment");
        // x snaps to the nearest whole number; y snaps to the nearest
        // multiple of 2.
        expect(updated.coords[0][0]).toEqual([2, 6]);
    });

    it("constrains points to the graph edge", () => {
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
            actions.segment.movePointInFigure(0, 0, [99, 99]),
        );

        invariant(updated.type === "segment");
        expect(updated.coords[0][0]).toEqual([5, 8]);
    });

    it("allows the ray's tail (index 0) to land on the graph edge", () => {
        const state: InteractiveGraphState = {...baseRayGraphState};

        const updated = interactiveGraphReducer(
            state,
            actions.ray.movePoint(0, [99, 99]),
        );

        invariant(updated.type === "ray");
        expect(updated.coords[0]).toEqual([10, 10]);
    });

    it("insets the ray's terminal point (index 1) by one snap step", () => {
        const state: InteractiveGraphState = {...baseRayGraphState};

        const updated = interactiveGraphReducer(
            state,
            actions.ray.movePoint(1, [99, 99]),
        );

        invariant(updated.type === "ray");
        expect(updated.coords[1]).toEqual([9, 9]);
    });

    it("keeps linear-system points inset by one snap step", () => {
        // Linear-system lines have arrows on both ends, so both points
        // stay on boundAndSnapToGrid (inset).
        const state: InteractiveGraphState = {
            hasBeenInteractedWith: false,
            type: "linear-system",
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
                [
                    [2, 2],
                    [3, 3],
                ],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.linearSystem.movePointInFigure(0, 0, [99, 99]),
        );

        invariant(updated.type === "linear-system");
        expect(updated.coords[0][0]).toEqual([9, 9]);
    });
});

describe("moveSegment", () => {
    it("sets segment coords to the given positions", () => {
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
            actions.segment.moveLine(0, [6, -1]),
        );

        invariant(updated.type === "segment");
        expect(updated.coords[0]).toEqual([
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
            actions.segment.moveLine(0, [1.5, 2.5]),
        );

        invariant(updated.type === "segment");
        expect(updated.coords[0]).toEqual([
            [2, 3],
            [4, 5],
        ]);
    });

    it("preserves the segment's shape when the translation would push a point past the graph bounds", () => {
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
            actions.segment.moveLine(0, [99, 99]),
        );

        invariant(updated.type === "segment");
        // Both endpoints move by the same delta — the largest one that
        // keeps the trailing endpoint ([3, 4]) inside the graph bounds.
        expect(updated.coords[0]).toEqual([
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

        const updated = interactiveGraphReducer(
            state,
            actions.segment.moveLine(0, [2, 3]),
        );

        expect(updated.hasBeenInteractedWith).toBe(true);
    });
});

describe("movePoint on a point graph", () => {
    it("moves the point with the given index", () => {
        const state: InteractiveGraphState = {
            ...basePointGraphState,
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.movePoint(0, [5, 6]),
        );

        invariant(updated.type === "point");
        expect(updated.coords[0]).toEqual([5, 6]);
    });

    it("snaps to the snap grid", () => {
        const state: InteractiveGraphState = {
            ...basePointGraphState,
            snapStep: [3, 4],
            coords: [[0, 0]],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.movePoint(0, [-2, -2.5]),
        );

        invariant(updated.type === "point");
        expect(updated.coords[0]).toEqual([-3, -4]);
    });

    it("keeps points within the graph bounds", () => {
        const state: InteractiveGraphState = {
            ...basePointGraphState,
            coords: [[0, 0]],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.movePoint(0, [99, 99]),
        );

        invariant(updated.type === "point");
        // Points can go on the edges of the graph.
        expect(updated.coords[0]).toEqual([10, 10]);
    });

    it("sets hasBeenInteractedWith", () => {
        const state: InteractiveGraphState = {
            ...basePointGraphState,
            coords: [[1, 2]],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.movePoint(0, [1, 1]),
        );

        expect(updated.hasBeenInteractedWith).toBe(true);
    });
});

describe("movePoint on an angle graph", () => {
    it("moves the point with the given index", () => {
        const state: InteractiveGraphState = {
            ...baseAngleGraphState,
            coords: [
                [0, 5],
                [0, 0],
                [5, 0],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.angle.movePoint(0, [5, 6]),
        );

        invariant(updated.type === "angle");

        expect(
            getClockwiseAngle(updated.coords, updated.allowReflexAngles),
        ).toBeCloseTo(50);
    });

    it("snaps to the nearest snapDegrees", () => {
        const state: InteractiveGraphState = {
            ...baseAngleGraphState,
            coords: [
                [5, 5],
                [0, 0],
                [5, 0],
            ],
            snapDegrees: 5,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.angle.movePoint(0, [5, 3]),
        );

        invariant(updated.type === "angle");

        // The point will get snapped to the nearest 5 degrees, which should be 30 degrees
        expect(updated.coords[0]).toEqual([5.04975246918104, 2.91547594742265]);
        expect(
            getClockwiseAngle(
                updated.coords,
                updated.allowReflexAngles || false,
            ),
        ).toBeCloseTo(30);
    });

    it("keeps points within the graph bounds", () => {
        const state: InteractiveGraphState = {
            ...baseAngleGraphState,
            coords: [
                [5, 5],
                [0, 0],
                [0, 5],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.angle.movePoint(0, [99, 99]),
        );

        invariant(updated.type === "angle");

        // The point will get snapped to the nearest whole degree
        expect(updated.coords[0]).toEqual([9, 8.999999999999998]);
    });

    it("sets hasBeenInteractedWith", () => {
        const state: InteractiveGraphState = {
            ...baseAngleGraphState,
            coords: [
                [5, 5],
                [0, 0],
                [0, 5],
            ],
        };
        const updated = interactiveGraphReducer(
            state,
            actions.angle.movePoint(0, [1, 1]),
        );

        expect(updated.hasBeenInteractedWith).toBe(true);
    });
});

describe("movePoint on a polygon graph", () => {
    it("moves a point", () => {
        const state: InteractiveGraphState = {
            ...basePolygonGraphState,
            coords: [
                [0, 0],
                [0, 2],
                [2, 2],
                [2, 0],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.movePoint(0, [0, 1]),
        );

        invariant(updated.type === "polygon");
        expect(updated.coords[0]).toEqual([0, 1]);
    });

    it("rejects the move if it would cause sides of the polygon to intersect with grid snapping", () => {
        const state: InteractiveGraphState = {
            ...basePolygonGraphState,
            coords: [
                [0, 0],
                [0, 2],
                [2, 2],
                [2, 0],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.movePoint(0, [1, 3]),
        );

        invariant(updated.type === "polygon");
        expect(updated.coords[0]).toEqual([0, 0]);
    });

    it("rejects the move if it would cause sides of the polygon to intersect with angles snapping", () => {
        const state: InteractiveGraphState = {
            ...basePolygonGraphState,
            snapTo: "angles",
            coords: [
                [0, 0],
                [0, 2],
                [2, 2],
                [2, 0],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.movePoint(0, [1, 3]),
        );

        invariant(updated.type === "polygon");
        expect(updated.coords[0]).toEqual([0, 0]);
    });

    it("rejects the move if it would cause sides of the polygon to intersect with sides snapping", () => {
        const state: InteractiveGraphState = {
            ...basePolygonGraphState,
            snapTo: "sides",
            coords: [
                [0, 0],
                [0, 2],
                [2, 2],
                [2, 0],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.movePoint(0, [1, 3]),
        );

        invariant(updated.type === "polygon");
        expect(updated.coords[0]).toEqual([0, 0]);
    });

    it("does not reject intersecting sides if the polygon is unlimited and it's open", () => {
        const state: InteractiveGraphState = {
            ...basePolygonGraphState,
            numSides: "unlimited",
            closedPolygon: false,
            snapTo: "grid",
            coords: [
                [0, 0],
                [0, 2],
                [2, 2],
                [2, 0],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.movePoint(0, [1, 3]),
        );

        invariant(updated.type === "polygon");
        expect(updated.coords[0]).toEqual([1, 3]);
    });

    it("does not snap to grid when snapTo is angles using moveAll", () => {
        const state: InteractiveGraphState = {
            ...basePolygonGraphState,
            snapTo: "angles",
            coords: [
                [0, 0],
                [0, 2],
                [2, 2],
                [2, 0],
            ],
        };

        // Move all points less than a snapStep to show they are not snapping
        const updated = interactiveGraphReducer(
            state,
            actions.polygon.moveAll([0.3, 0]),
        );

        invariant(updated.type === "polygon");
        expect(updated.coords[0]).toEqual([0.3, 0]);
    });

    it("does not snap to grid when snapTo is sides using moveAll", () => {
        const state: InteractiveGraphState = {
            ...basePolygonGraphState,
            snapTo: "sides",
            coords: [
                [0, 0],
                [0, 2],
                [2, 2],
                [2, 0],
            ],
        };

        // Move all points less than a snapStep to show they are not snapping
        const updated = interactiveGraphReducer(
            state,
            actions.polygon.moveAll([0.3, 0]),
        );

        invariant(updated.type === "polygon");
        expect(updated.coords[0]).toEqual([0.3, 0]);
    });

    // Since the graph is snapping to angles, example points to move must be very specific
    it("does not snap to grid when snapTo is angles using movePoint", () => {
        const state: InteractiveGraphState = {
            ...basePolygonGraphState,
            snapTo: "angles",
            coords: [
                [3.1788177497461882, -2.95030212474619],
                [2.828427124746188, 2.828427124746188],
                [-2.82842712474619, 2.828427124746188],
                [-2.8284271247461916, -2.82842712474619],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.movePoint(0, [3, -2]),
        );

        invariant(updated.type === "polygon");
        expect(updated.coords[0]).toEqual([
            2.997376981064699, -2.009663752902908,
        ]);
    });

    // Since the graph is not snapping to grid, example points to move must be very specific
    it("does not snap to grid when snapTo is sides using movePoint", () => {
        const state: InteractiveGraphState = {
            ...basePolygonGraphState,
            snapTo: "sides",
            coords: [
                [3.1788177497461882, -2.95030212474619],
                [2.828427124746188, 2.828427124746188],
                [-2.82842712474619, 2.828427124746188],
                [-2.8284271247461916, -2.82842712474619],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.movePoint(0, [3, -2]),
        );

        invariant(updated.type === "polygon");
        expect(updated.coords[0]).toEqual([
            3.1344697042830383, -2.1621978801515374,
        ]);
    });
});

describe("movePoint on a quadratic graph", () => {
    it("moves a point", () => {
        const state: InteractiveGraphState = baseQuadraticGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.quadratic.movePoint(0, [-2, 4]),
        );

        invariant(updated.type === "quadratic");
        expect(updated.coords[0]).toEqual([-2, 4]);
    });

    it("rejects the move if when new coordinates would invalidate the graph", () => {
        const state: InteractiveGraphState = {
            ...baseQuadraticGraphState,
            coords: [
                [-5, 5],
                [0, -5],
                [5, 5],
            ],
        };

        // An invalid graph happens when the denominator is 0 and are unable to calculate
        // quadratic coefficients as they hit infinity.
        // For more details see the getQuadraticCoefficients function that performs this calculation.
        const updated = interactiveGraphReducer(
            state,
            actions.quadratic.movePoint(0, [0, 0]),
        );

        invariant(updated.type === "quadratic");
        expect(updated.coords[0]).toEqual([-5, 5]);
    });
});

describe("doChangeSnapStep", () => {
    it("doesn't update if there are no changes", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
        };

        const updated = interactiveGraphReducer(
            state,
            changeSnapStep(state.snapStep),
        );

        // make sure the state object is the same
        expect(state).toBe(updated);
    });

    it("does update if there are changes", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
        };

        const next: [number, number] = [5, 5];
        const updated = interactiveGraphReducer(state, changeSnapStep(next));

        // make sure the state object is different
        expect(state).not.toBe(updated);
        expect(updated.snapStep).toEqual(next);
    });
});

describe("doChangeRange", () => {
    it("doesn't update if there are no changes", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
        };

        const updated = interactiveGraphReducer(
            state,
            changeRange(state.range),
        );

        // make sure the state object is the same
        expect(state).toBe(updated);
    });

    it("does update if there are changes", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
        };

        const next: GraphRange = [
            [-20, 20],
            [-20, 20],
        ];
        const updated = interactiveGraphReducer(state, changeRange(next));

        // make sure the state object is different
        expect(state).not.toBe(updated);
        expect(updated.range).toEqual(next);
    });
});

describe("moveCenter", () => {
    it("moves the center", () => {
        const state: InteractiveGraphState = {
            ...baseCircleGraphState,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.circle.moveCenter([1, 1]),
        );

        // make sure the state object is different
        expect(state).not.toBe(updated);
        expect((updated as CircleGraphState).center).toEqual([1, 1]);
    });

    it("sets hasBeenInteractedWith", () => {
        const state: InteractiveGraphState = {
            ...baseCircleGraphState,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.circle.moveCenter([1, 1]),
        );

        expect(updated.hasBeenInteractedWith).toBe(true);
    });

    it("constrains the center to the range", () => {
        const state: InteractiveGraphState = {
            ...baseCircleGraphState,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.circle.moveCenter([11, 11]),
        );

        // make sure the state object is different
        expect(state).not.toBe(updated);
        expect((updated as CircleGraphState).center).toEqual([10, 10]);
    });

    it("updates the radius", () => {
        const state: InteractiveGraphState = {
            ...baseCircleGraphState,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.circle.moveCenter([1, 1]),
        );

        // make sure the state object is different
        expect(state).not.toBe(updated);
        expect((updated as CircleGraphState).radiusPoint).toEqual([3, 1]);
    });

    it("swaps radius sides when needed", () => {
        const state: InteractiveGraphState = {
            ...baseCircleGraphState,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.circle.moveCenter([9, 0]),
        );

        // make sure the state object is different
        expect(state).not.toBe(updated);
        expect((updated as CircleGraphState).radiusPoint).toEqual([7, 0]);
    });

    it("rejects the move when the circle is wider than the graph's half-span", () => {
        // Circle with radius 15 (wider than the graph's half-span of
        // 10). Moving the center right: newRadiusPoint X would be 16
        // (out on the right) and the flipped position would be -14
        // (out on the left). Neither side fits, so the move is
        // rejected.
        const state: InteractiveGraphState = {
            ...baseCircleGraphState,
            center: [0, 0],
            radiusPoint: [15, 0],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.circle.moveCenter([1, 0]),
        );

        // Assert — move rejected; state returned unchanged
        expect(updated).toBe(state);
    });

    it("throws for non-circle graphs", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
        };

        expect(() =>
            interactiveGraphReducer(state, actions.circle.moveCenter([1, 1])),
        ).toThrow();
    });
});

describe("doMoveRadiusPoint", () => {
    it("updates radius", () => {
        const state: InteractiveGraphState = {
            ...baseCircleGraphState,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.circle.moveRadiusPoint([5, 0]),
        );

        // make sure the state object is different
        expect(state).not.toBe(updated);
        expect((updated as CircleGraphState).radiusPoint).toEqual([5, 0]);
    });

    it("sets hasBeenInteractedWith", () => {
        const state: InteractiveGraphState = {
            ...baseCircleGraphState,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.circle.moveRadiusPoint([4, 0]),
        );

        expect(updated.hasBeenInteractedWith).toBe(true);
    });

    it("snaps", () => {
        const state: InteractiveGraphState = {
            ...baseCircleGraphState,
            snapStep: [2, 7],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.circle.moveRadiusPoint([-3.1, 0]),
        );

        // make sure the state object is different
        expect(state).not.toBe(updated);
        // Assert: the x-coordinate snaps to the nearest multiple of 2.
        expect((updated as CircleGraphState).radiusPoint).toEqual([-4, 0]);
    });

    it("constrains to range", () => {
        const state: InteractiveGraphState = {
            ...baseCircleGraphState,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.circle.moveRadiusPoint([20, 0]),
        );

        // make sure the state object is different
        expect(state).not.toBe(updated);
        expect((updated as CircleGraphState).radiusPoint).toEqual([10, 0]);
    });

    it("locks y axis", () => {
        const state: InteractiveGraphState = {
            ...baseCircleGraphState,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.circle.moveRadiusPoint([2, 20]),
        );

        // make sure the state object is different
        expect(state).not.toBe(updated);
        expect((updated as CircleGraphState).radiusPoint).toEqual([2, 0]);
    });

    it("throws for non-circle graphs", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
        };

        expect(() =>
            interactiveGraphReducer(
                state,
                actions.circle.moveRadiusPoint([5, 0]),
            ),
        ).toThrow();
    });
});

describe("doDeleteIntent", () => {
    it("does nothing when no points are selected for unlimited points", () => {
        let state: PointGraphState = {
            ...baseUnlimitedPointGraphState,
            interactionMode: "mouse",
        };

        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([1, 1]),
        ) as PointGraphState;

        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([2, 2]),
        ) as PointGraphState;

        state = interactiveGraphReducer(
            state,
            actions.pointGraph.blurPoint(),
        ) as PointGraphState;

        state = interactiveGraphReducer(
            state,
            actions.global.deleteIntent(),
        ) as PointGraphState;

        expect(state.coords).toMatchObject([
            [1, 1],
            [2, 2],
        ]);
    });

    it("does nothing when no points are selected for unlimited polygon", () => {
        let state: PolygonGraphState = {
            ...baseUnlimitedPolygonGraphState,
            interactionMode: "mouse",
        };

        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([1, 1]),
        ) as PolygonGraphState;

        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([2, 2]),
        ) as PolygonGraphState;

        state = interactiveGraphReducer(
            state,
            actions.polygon.blurPoint(),
        ) as PolygonGraphState;

        state = interactiveGraphReducer(
            state,
            actions.global.deleteIntent(),
        ) as PolygonGraphState;

        expect(state.coords).toMatchObject([
            [1, 1],
            [2, 2],
        ]);
    });

    it("removes points when a point is focused and a delete intent is received for unlimited point", () => {
        let state: PointGraphState = {
            ...baseUnlimitedPointGraphState,
        };

        // Add some points
        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([1, 1]),
        ) as PointGraphState;

        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([2, 2]),
        ) as PointGraphState;

        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([3, 3]),
        ) as PointGraphState;

        // Focus a point
        state = interactiveGraphReducer(
            state,
            actions.pointGraph.focusPoint(0),
        ) as PointGraphState;

        // Fire a delete intent
        state = interactiveGraphReducer(
            state,
            actions.global.deleteIntent(),
        ) as PointGraphState;

        expect(state.coords).toMatchObject([
            [2, 2],
            [3, 3],
        ]);
    });

    it("removes points when a point is focused and a delete intent is received for unlimited polygon", () => {
        let state: PolygonGraphState = {
            ...baseUnlimitedPolygonGraphState,
        };

        // Add some points
        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([1, 1]),
        ) as PolygonGraphState;

        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([2, 2]),
        ) as PolygonGraphState;

        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([3, 3]),
        ) as PolygonGraphState;

        // Focus a point
        state = interactiveGraphReducer(
            state,
            actions.polygon.focusPoint(0),
        ) as PolygonGraphState;

        // Fire a delete intent
        state = interactiveGraphReducer(
            state,
            actions.global.deleteIntent(),
        ) as PolygonGraphState;

        expect(state.coords).toMatchObject([
            [2, 2],
            [3, 3],
        ]);
    });
});

describe("doChangeInteractionMode", () => {
    it("does nothing when type is not an unlimited graph", () => {
        const state: InteractiveGraphState = baseCircleGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.global.changeInteractionMode("keyboard"),
        );

        expect(updated).toMatchObject(state);
    });

    it("updates interactionMode to `keyboard` and all other required state values", () => {
        const state: InteractiveGraphState = baseUnlimitedPointGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.global.changeInteractionMode("keyboard"),
        );

        invariant(updated.type === "point");
        expect(updated.interactionMode).toBe("keyboard");
        expect(updated.showKeyboardInteractionInvitation).toBeFalsy();
    });

    it("updates interactionMode to `mouse` and all other required state values", () => {
        const state: PointGraphState = {
            ...baseUnlimitedPointGraphState,
            interactionMode: "keyboard",
        };

        const updated = interactiveGraphReducer(
            state,
            actions.global.changeInteractionMode("mouse"),
        );

        invariant(updated.type === "point");
        expect(updated.interactionMode).toBe("mouse");
        expect(updated.showKeyboardInteractionInvitation).toBe(
            state.showKeyboardInteractionInvitation,
        );
    });
});

describe("doChangeKeyboardInvitationVisibility", () => {
    it("does nothing when type is not an unlimited graph", () => {
        const state: InteractiveGraphState = baseCircleGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.global.changeKeyboardInvitationVisibility(true),
        );

        expect(updated).toMatchObject(state);
    });

    it("updates keyboard invitation visibility to `true`", () => {
        const state: InteractiveGraphState = baseUnlimitedPointGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.global.changeKeyboardInvitationVisibility(true),
        );

        invariant(updated.type === "point");
        expect(updated.showKeyboardInteractionInvitation).toBeTruthy();
        expect(updated.hasBeenInteractedWith).toBeTruthy();
    });

    it("updates keyboard invitation visibility to `false`", () => {
        const state: InteractiveGraphState = baseUnlimitedPointGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.global.changeKeyboardInvitationVisibility(false),
        );

        invariant(updated.type === "point");
        expect(updated.showKeyboardInteractionInvitation).toBeFalsy();
        expect(updated.hasBeenInteractedWith).toBeTruthy();
    });

    it("hasBeenInteractedWith property is always set to 'true'", () => {
        const state: InteractiveGraphState = baseUnlimitedPointGraphState;

        const updated1 = interactiveGraphReducer(
            state,
            actions.global.changeKeyboardInvitationVisibility(false),
        );

        invariant(updated1.type === "point");
        expect(updated1.hasBeenInteractedWith).toBeTruthy();

        const updated2 = interactiveGraphReducer(
            state,
            actions.global.changeKeyboardInvitationVisibility(true),
        );

        invariant(updated2.type === "point");
        expect(updated2.hasBeenInteractedWith).toBeTruthy();
    });
});

describe("doClickPoint", () => {
    it("does nothing when type is not an unlimited graph", () => {
        const state: InteractiveGraphState = baseCircleGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.clickPoint(0),
        );

        expect(updated).toMatchObject(state);
    });

    it("updates focusedPointIndex with new index value", () => {
        const state: InteractiveGraphState = baseUnlimitedPointGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.clickPoint(0),
        );

        invariant(updated.type === "point");
        expect(updated.focusedPointIndex).toBe(0);
        expect(updated.showRemovePointButton).toBeTruthy();
    });

    it("showRemovePointButton property is always set to 'true'", () => {
        const state: InteractiveGraphState = baseUnlimitedPointGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.clickPoint(10),
        );

        invariant(updated.type === "point");
        expect(updated.showRemovePointButton).toBeTruthy();
    });
});

describe("doBlurPoint", () => {
    it("does nothing when type is not an unlimited graph", () => {
        const state: InteractiveGraphState = baseCircleGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.blurPoint(),
        );

        expect(updated).toMatchObject(state);
    });

    it("showRemovePointButton property is always set to 'false'", () => {
        const state: InteractiveGraphState = {
            ...baseUnlimitedPointGraphState,
            focusedPointIndex: 0,
            interactionMode: "keyboard",
            showRemovePointButton: true,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.blurPoint(),
        );

        invariant(updated.type === "point");
        expect(updated.focusedPointIndex).toBe(state.focusedPointIndex);
        expect(updated.showRemovePointButton).toBeFalsy();
    });

    it("if interactionMode is `mouse`, updates focusedPointIndex to null", () => {
        const state: InteractiveGraphState = {
            ...baseUnlimitedPointGraphState,
            interactionMode: "mouse",
        };
        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.blurPoint(),
        );

        invariant(updated.type === "point");
        expect(updated.focusedPointIndex).toBe(null);
        expect(updated.showRemovePointButton).toBeFalsy();
    });
});

describe("doFocusPoint", () => {
    it("does nothing when type is not an unlimited graph", () => {
        const state: InteractiveGraphState = baseCircleGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.focusPoint(0),
        );

        expect(updated).toMatchObject(state);
    });

    it("updates focusedPointIndex with new index value", () => {
        const state: InteractiveGraphState = baseUnlimitedPointGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.focusPoint(0),
        );

        invariant(updated.type === "point");
        expect(updated.focusedPointIndex).toBe(0);
        expect(updated.showRemovePointButton).toBe(state.showRemovePointButton);
    });

    it("showRemovePointButton property is not changed", () => {
        const state: InteractiveGraphState = baseUnlimitedPointGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.focusPoint(10),
        );

        invariant(updated.type === "point");
        expect(updated.showRemovePointButton).toBe(state.showRemovePointButton);
    });
});

describe("doAddPoint", () => {
    it("does nothing when type is not an unlimited graph", () => {
        const state: InteractiveGraphState = baseCircleGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([0, 0]),
        );

        expect(updated).toMatchObject(state);
    });

    it("adds a new point at a specified graph location", () => {
        const state: InteractiveGraphState = {
            ...baseUnlimitedPointGraphState,
            coords: [[2, -2]],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([0, 0]),
        );

        invariant(updated.type === "point");
        expect(updated.coords).toMatchObject([
            [2, -2],
            [0, 0],
        ]);
        expect(updated.hasBeenInteractedWith).toBeTruthy();
        expect(updated.showRemovePointButton).toBeTruthy();
        expect(updated.focusedPointIndex).toBe(1);
    });

    it("does not adds a new point if there is already a point at that location", () => {
        const state: InteractiveGraphState = {
            ...baseUnlimitedPointGraphState,
            coords: [[0, 0]],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([0, 0]),
        );

        expect(updated).toMatchObject(state);
    });
});

describe("doRemovePoint", () => {
    it("does nothing when type is not an unlimited graph", () => {
        const state: InteractiveGraphState = baseCircleGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.removePoint(0),
        );

        expect(updated).toMatchObject(state);
    });

    it("removes a point at a specific index in our coordinates array", () => {
        const state: InteractiveGraphState = {
            ...baseUnlimitedPointGraphState,
            interactionMode: "keyboard",
            coords: [
                [0, 0],
                [2, -2],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.removePoint(0),
        );

        invariant(updated.type === "point");
        expect(updated.coords).toMatchObject([[2, -2]]);
        expect(updated.showRemovePointButton).toBeTruthy();
        expect(updated.focusedPointIndex).toBe(0);
    });

    it("focusedPointIndex is set for mouse interaction mode", () => {
        const state: InteractiveGraphState = {
            ...baseUnlimitedPointGraphState,
            interactionMode: "mouse",
            focusedPointIndex: 0,
            coords: [
                [0, 0],
                [2, -2],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.removePoint(0),
        );

        invariant(updated.type === "point");
        expect(updated.coords).toMatchObject([[2, -2]]);
        expect(updated.showRemovePointButton).toBeTruthy();
        expect(updated.focusedPointIndex).toBe(0);
    });
});

describe("doClosePolygon", () => {
    it("does nothing when type is not `polygon`", () => {
        const state: InteractiveGraphState = baseUnlimitedPointGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.closePolygon(),
        );
        invariant(updated.type !== "polygon");
        expect(updated).toMatchObject(state);
    });

    it("does nothing when type is not an unlimited graph", () => {
        const state: InteractiveGraphState = {
            ...basePolygonGraphState,
            closedPolygon: false,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.closePolygon(),
        );

        invariant(updated.type === "polygon");
        expect(updated.closedPolygon).toBeFalsy();
    });

    it("changes `closedPolygon` property to true", () => {
        const state: InteractiveGraphState = {
            ...baseUnlimitedPolygonGraphState,
            closedPolygon: false,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.closePolygon(),
        );

        invariant(updated.type === "polygon");
        expect(updated.closedPolygon).toBeTruthy();
    });

    it("does not change `closedPolygon` property when it's already true", () => {
        const state: InteractiveGraphState = {
            ...baseUnlimitedPolygonGraphState,
            closedPolygon: true,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.closePolygon(),
        );

        invariant(updated.type === "polygon");
        expect(updated.closedPolygon).toBeTruthy();
    });

    it("removes duplicated points from the new state when closed", () => {
        const state: InteractiveGraphState = {
            ...baseUnlimitedPolygonGraphState,
            coords: [
                [0, 0],
                [0, 1],
                [1, 1],
                [0, 0], // last point same as first point
            ],
            closedPolygon: false,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.closePolygon(),
        );

        invariant(updated.type === "polygon");
        expect(updated.closedPolygon).toBeTruthy();
        expect(updated.coords).toEqual([
            [0, 0],
            [0, 1],
            [1, 1],
        ]);
    });
});

describe("doOpenPolygon", () => {
    it("does nothing when type is not `polygon`", () => {
        const state: InteractiveGraphState = baseUnlimitedPointGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.openPolygon(),
        );

        invariant(updated.type !== "polygon");
        expect(updated).toMatchObject(state);
    });

    it("does nothing when type is not an unlimited graph", () => {
        const state: InteractiveGraphState = {
            ...basePolygonGraphState,
            closedPolygon: true,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.openPolygon(),
        );

        invariant(updated.type === "polygon");
        expect(updated.closedPolygon).toBeTruthy();
    });

    it("changes `closedPolygon` property to false", () => {
        const state: InteractiveGraphState = {
            ...baseUnlimitedPolygonGraphState,
            closedPolygon: true,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.openPolygon(),
        );

        invariant(updated.type === "polygon");
        expect(updated.closedPolygon).toBeFalsy();
    });

    it("does not change `closedPolygon` property when it's already false", () => {
        const state: InteractiveGraphState = {
            ...baseUnlimitedPolygonGraphState,
            closedPolygon: false,
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.openPolygon(),
        );

        invariant(updated.type === "polygon");
        expect(updated.closedPolygon).toBeFalsy();
    });
});

describe("unlimited points", () => {
    it("adds points", () => {
        const state: PointGraphState = {
            ...baseUnlimitedPointGraphState,
        };

        const stateAfterAddingPoint = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([8, 10]),
        ) as PointGraphState;

        expect(stateAfterAddingPoint.coords).toMatchObject([[8, 10]]);
    });

    it("removes points", () => {
        let state: PointGraphState = {
            ...baseUnlimitedPointGraphState,
        };

        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([1, 1]),
        ) as PointGraphState;

        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([2, 2]),
        ) as PointGraphState;

        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([3, 3]),
        ) as PointGraphState;

        state = interactiveGraphReducer(
            state,
            actions.pointGraph.removePoint(1),
        ) as PointGraphState;

        expect(state.coords).toMatchObject([
            [1, 1],
            [3, 3],
        ]);
    });
});

describe("unlimited polygon", () => {
    it("adds point to polygon", () => {
        const state: PolygonGraphState = {
            ...baseUnlimitedPolygonGraphState,
        };

        const stateAfterAddingPoint = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([8, 10]),
        ) as PolygonGraphState;

        expect(stateAfterAddingPoint.coords).toMatchObject([[8, 10]]);
    });

    it("removes point to polygon", () => {
        let state: PolygonGraphState = {
            ...baseUnlimitedPolygonGraphState,
        };

        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([1, 1]),
        ) as PolygonGraphState;

        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([2, 2]),
        ) as PolygonGraphState;

        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([3, 3]),
        ) as PolygonGraphState;

        state = interactiveGraphReducer(
            state,
            actions.polygon.removePoint(1),
        ) as PolygonGraphState;

        expect(state.coords).toMatchObject([
            [1, 1],
            [3, 3],
        ]);
    });
});

function generateExponentialGraphState(
    overrides?: Partial<Omit<ExponentialGraphState, "type">>,
): ExponentialGraphState {
    return {
        hasBeenInteractedWith: false,
        type: "exponential",
        range: [
            [-10, 10],
            [-10, 10],
        ],
        snapStep: [1, 1],
        coords: [
            [0, 3],
            [2, 6],
        ],
        asymptote: 1,
        ...overrides,
    };
}

describe("movePoint on an exponential graph", () => {
    it("moves a point to the new coordinates", () => {
        // Arrange
        const state = generateExponentialGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.exponential.movePoint(0, [-1, 4]),
        );

        // Assert
        invariant(updated.type === "exponential");
        expect(updated.coords[0]).toEqual([-1, 4]);
    });

    it("sets hasBeenInteractedWith after a move", () => {
        // Arrange
        const state = generateExponentialGraphState({
            hasBeenInteractedWith: false,
        });

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.exponential.movePoint(0, [-1, 4]),
        );

        // Assert
        expect(updated.hasBeenInteractedWith).toBe(true);
    });

    it("rejects the move when both points would share the same x-coordinate", () => {
        // Arrange — point 0 at x=0, point 1 at x=2; trying to move point 0 to x=2
        const state = generateExponentialGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.exponential.movePoint(0, [2, 4]),
        );

        // Assert — move was rejected; point 0 stays at original position
        invariant(updated.type === "exponential");
        expect(updated.coords[0]).toEqual([0, 3]);
    });

    it("rejects the move when the point would land on the asymptote", () => {
        // Arrange — asymptote at y=1; trying to move point 0 to y=1
        const state = generateExponentialGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.exponential.movePoint(0, [-1, 1]),
        );

        // Assert — move was rejected
        invariant(updated.type === "exponential");
        expect(updated.coords[0]).toEqual([0, 3]);
    });
});

describe("moveCenter on an exponential graph (asymptote)", () => {
    it("moves the asymptote to a new y-value", () => {
        // Arrange
        const state = generateExponentialGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.exponential.moveCenter([-10, -2]),
        );
        invariant(updated.type === "exponential");

        // Assert — y=-2 is below both curve points (y=3 and y=6), so it's valid
        expect(updated.asymptote).toBe(-2);
    });

    it("rejects the move when the asymptote would land between the curve points", () => {
        // Arrange — curve points at y=3 and y=6; trying to move asymptote to y=4 (between them)
        const state = generateExponentialGraphState({
            coords: [
                [0, 3],
                [2, 6],
            ],
        });

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.exponential.moveCenter([0, 4]),
        );
        invariant(updated.type === "exponential");

        // Assert — y=4 < midpoint(4.5), so snaps to bottomMost - stepY = 3 - 1 = 2
        expect(updated.asymptote).toBe(2);
    });

    it("ignores the x component and only moves the asymptote vertically", () => {
        // Arrange
        const state = generateExponentialGraphState();

        // Act — pass an arbitrary x value; only y should matter
        const updated = interactiveGraphReducer(
            state,
            actions.exponential.moveCenter([99, -2]),
        );
        invariant(updated.type === "exponential");

        // Assert — asymptote moves to y=-2 regardless of the x passed
        expect(updated.asymptote).toBe(-2);
    });
});

function generateLogarithmGraphState(
    overrides?: Partial<Omit<LogarithmGraphState, "type">>,
): LogarithmGraphState {
    return {
        hasBeenInteractedWith: false,
        type: "logarithm",
        range: [
            [-10, 10],
            [-10, 10],
        ],
        snapStep: [1, 1],
        coords: [
            [-4, -3],
            [-5, -7],
        ],
        asymptote: -6,
        ...overrides,
    };
}

function generateVectorGraphState(
    overrides?: Partial<Omit<VectorGraphState, "type">>,
): VectorGraphState {
    return {
        hasBeenInteractedWith: false,
        type: "vector",
        range: [
            [-10, 10],
            [-10, 10],
        ],
        snapStep: [1, 1],
        coords: [
            [0, 0],
            [3, 4],
        ],
        ...overrides,
    };
}

describe("movePoint on a logarithm graph", () => {
    it("rejects the move when both points would share the same y-coordinate", () => {
        // Arrange — point 0 at y=-3, point 1 at y=-7; trying to move point 0 to y=-7
        const state = generateLogarithmGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(0, [-4, -7]),
        );

        // Assert — move was rejected; point 0 stays at original position
        invariant(updated.type === "logarithm");
        expect(updated.coords[0]).toEqual([-4, -3]);
    });

    it("rejects a logarithm move with a destination that clamps onto the other point's y", () => {
        // Arrange — point 0 at (-4, -7), point 1 at (-5, 10); moving point 0
        // far beyond the graph range so bounding clamps y to 10, same as
        // point 1's y under boundToEdge.
        const state = generateLogarithmGraphState({
            coords: [
                [-4, -7],
                [-5, 10],
            ],
        });

        // Act — destination y=15 is clamped to 10 by bounding, colliding with point 1
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(0, [-4, 15]),
        );

        // Assert — rejected; point 0 stays at original position
        invariant(updated.type === "logarithm");
        expect(updated.coords[0]).toEqual([-4, -7]);
        expect(updated.hasBeenInteractedWith).toBe(false);
    });

    it("rejects the move when point would land on the asymptote", () => {
        // Arrange — asymptote at x=-6; trying to move point 0 to x=-6
        const state = generateLogarithmGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(0, [-6, -2]),
        );

        // Assert — move was rejected
        invariant(updated.type === "logarithm");
        expect(updated.coords[0]).toEqual([-4, -3]);
        expect(updated.hasBeenInteractedWith).toBe(false);
    });

    it("reflects the other point when a point crosses the asymptote", () => {
        // Arrange — asymptote at x=-6, points at (-4, -3) and (-5, -7)
        // Both points are to the right of the asymptote.
        const state = generateLogarithmGraphState();

        // Act — move point 0 to x=-8 (left of asymptote at x=-6)
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(0, [-8, -3]),
        );

        // Assert — point 0 moved, point 1 reflected across asymptote:
        // reflectedX = 2 * (-6) - (-5) = -12 + 5 = -7
        invariant(updated.type === "logarithm");
        expect(updated.coords[0]).toEqual([-8, -3]);
        expect(updated.coords[1]).toEqual([-7, -7]);
    });

    it("allows a valid move", () => {
        // Arrange
        const state = generateLogarithmGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(0, [-3, -2]),
        );

        // Assert
        invariant(updated.type === "logarithm");
        expect(updated.coords[0]).toEqual([-3, -2]);
    });

    it("rejects cross-asymptote move when reflection would cause same-x collision", () => {
        // Arrange — asymptote=-6, coords=[(-4,-3), (-5,-7)], snapStep=[1,1]
        // Moving point 0 to (-7,-3) crosses the asymptote.
        // reflectedX = 2*(-6) - (-5) = -7, so both points would be at x=-7.
        const state = generateLogarithmGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(0, [-7, -3]),
        );

        // Assert — move was rejected; state is unchanged
        invariant(updated.type === "logarithm");
        expect(updated.coords[0]).toEqual([-4, -3]);
        expect(updated.coords[1]).toEqual([-5, -7]);
        expect(updated.hasBeenInteractedWith).toBe(false);
    });

    it("rejects cross-asymptote move when reflected point snaps to the asymptote x-coordinate", () => {
        // Arrange — asymptote=-6, non-grid-aligned point at x=-5.6.
        // Moving point 0 to (-8,-3) crosses the asymptote.
        // reflectedX = 2*(-6) - (-5.6) = -6.4, which snaps to -6
        // (the asymptote). This must be rejected.
        const state = generateLogarithmGraphState({
            coords: [
                [-4, -3],
                [-5.6, -7],
            ],
        });

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(0, [-8, -3]),
        );

        // Assert — move was rejected; state is unchanged
        invariant(updated.type === "logarithm");
        expect(updated.coords[0]).toEqual([-4, -3]);
        expect(updated.coords[1]).toEqual([-5.6, -7]);
        expect(updated.hasBeenInteractedWith).toBe(false);
    });
});

describe("moveCenter on a logarithm graph (asymptote)", () => {
    it("moves the asymptote to a new x-value", () => {
        // Arrange
        const state = generateLogarithmGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.moveCenter([-8, 99]),
        );
        invariant(updated.type === "logarithm");

        // Assert — x=-8 is to the left of both curve points (x=-4 and x=-5), so it's valid
        expect(updated.asymptote).toBe(-8);
    });

    it("snaps past the curve points when the asymptote is dragged between them", () => {
        // Arrange — curve points at x=-4 and x=-5; trying to move asymptote
        // between them. boundAndSnapToGrid snaps destination to x=-4.
        const state = generateLogarithmGraphState({
            coords: [
                [-4, -3],
                [-5, -7],
            ],
        });

        // Act — destination snaps to x=-4, which is on a point. Since
        // -4 >= midpoint(-4.5), snap-through pushes to rightMost + step = -3.
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.moveCenter([-4.4, 0]),
        );
        invariant(updated.type === "logarithm");

        // Assert
        expect(updated.asymptote).toBe(-3);
    });

    it("ignores the y component and only moves the asymptote horizontally", () => {
        // Arrange
        const state = generateLogarithmGraphState();

        // Act — pass an arbitrary y value; only x should matter
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.moveCenter([-8, 99]),
        );
        invariant(updated.type === "logarithm");

        // Assert — asymptote moves to x=-8 regardless of the y passed
        expect(updated.asymptote).toBe(-8);
    });

    it("rejects the move when asymptote would still be between the two points after snap-through", () => {
        // Arrange — points at x=8 and x=10. When the asymptote is dragged
        // to x=9 (between them), midpoint=(8+10)/2=9. Since 9 >= 9,
        // snap-through pushes to rightMost + step = 10 + 1 = 11. Clamping
        // to inset bounds [-9, 9] gives 9. The stillAllRight/stillAllLeft
        // check rejects because 8 < 9 < 10 — the asymptote would still
        // be between the two points.
        const state = generateLogarithmGraphState({
            coords: [
                [8, -3],
                [10, -7],
            ],
            asymptote: 0,
        });

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.moveCenter([9, 0]),
        );
        invariant(updated.type === "logarithm");

        // Assert — rejected; asymptote stays at 0
        expect(updated.asymptote).toBe(0);
    });
});

describe("moveTip on a vector graph", () => {
    it("moves the tip to the new coordinates", () => {
        // Arrange
        const state = generateVectorGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.vector.moveTip([5, 6]),
        );

        // Assert
        invariant(updated.type === "vector");
        expect(updated.coords[1]).toEqual([5, 6]);
        // Tail should remain unchanged
        expect(updated.coords[0]).toEqual([0, 0]);
    });

    it("sets hasBeenInteractedWith after a move", () => {
        // Arrange
        const state = generateVectorGraphState({
            hasBeenInteractedWith: false,
        });

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.vector.moveTip([5, 6]),
        );

        // Assert
        expect(updated.hasBeenInteractedWith).toBe(true);
    });

    it("rejects the move when tip would overlap with tail", () => {
        // Arrange — tail at [0, 0]; trying to move tip to [0, 0]
        const state = generateVectorGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.vector.moveTip([0, 0]),
        );

        // Assert — move was rejected; tip stays at original position
        invariant(updated.type === "vector");
        expect(updated.coords[1]).toEqual([3, 4]);
    });
});

describe("moveVector on a vector graph (body translation)", () => {
    it("translates both tail and tip by the same delta", () => {
        // Arrange — default tail [0,0], tip [3,4]; delta [2,1]
        const state = generateVectorGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.vector.moveVector([2, 1]),
        );

        // Assert
        invariant(updated.type === "vector");
        expect(updated.coords[0]).toEqual([2, 1]);
        expect(updated.coords[1]).toEqual([5, 5]);
    });

    it("sets hasBeenInteractedWith after a body drag", () => {
        // Arrange — default tail [0,0], tip [3,4]; delta [1,1]
        const state = generateVectorGraphState({
            hasBeenInteractedWith: false,
        });

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.vector.moveVector([1, 1]),
        );

        // Assert
        expect(updated.hasBeenInteractedWith).toBe(true);
    });

    it("preserves the vector's shape when the translation would push a point past the graph bounds", () => {
        // Arrange — tail at [0,0], tip at [3,4], range [-10,10]
        // Requested delta [8, 8] would push tip to [11, 12] (out of bounds);
        // the largest valid delta keeping tip inside [-9, 9] is [6, 5].
        const state = generateVectorGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.vector.moveVector([8, 8]),
        );

        // Assert — both endpoints moved by the same clamped delta
        invariant(updated.type === "vector");
        expect(updated.coords).toEqual([
            [6, 5],
            [9, 9],
        ]);
    });
});
