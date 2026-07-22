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

const baseAbsoluteValueGraphState: InteractiveGraphState = {
    hasBeenInteractedWith: false,
    type: "absolute-value",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    coords: [
        [0, 0],
        [2, 2],
    ],
};

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

    it("sets stateAnnouncement to a move-segment-point with the segment index and total", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
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
            actions.segment.movePointInFigure(1, 0, [-3, 2]),
        );

        expect(updated.stateAnnouncement).toEqual({
            type: "move-segment-point",
            segmentIndex: 1,
            pointIndex: 0,
            pointLabel: undefined,
            x: -3,
            y: 2,
            totalSegments: 2,
        });
    });

    it("carries the custom pointLabel from the flattened index when one is set", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
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
            // Flat across both segments: [seg0pt0, seg0pt1, seg1pt0, seg1pt1].
            pointLabels: ["A", "B", "C", "D"],
        };

        // Move segment 0, point 1 → flat index 0 * 2 + 1 = 1 → "B".
        const updated = interactiveGraphReducer(
            state,
            actions.segment.movePointInFigure(0, 1, [-3, 2]),
        );

        invariant(updated.stateAnnouncement?.type === "move-segment-point");
        expect(updated.stateAnnouncement.pointLabel).toBe("B");
    });

    it("passes an undefined pointLabel when the slot is empty (the announcement helper owns the fallback)", () => {
        const state: InteractiveGraphState = {
            ...baseSegmentGraphState,
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
            pointLabels: ["A", "", "C", "D"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.segment.movePointInFigure(0, 1, [-3, 2]),
        );

        invariant(updated.stateAnnouncement?.type === "move-segment-point");
        expect(updated.stateAnnouncement.pointLabel).toBeUndefined();
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

    it("allows the ray's terminal point (index 1) to land on the graph edge", () => {
        const state: InteractiveGraphState = {...baseRayGraphState};

        const updated = interactiveGraphReducer(
            state,
            actions.ray.movePoint(1, [99, 99]),
        );

        invariant(updated.type === "ray");
        expect(updated.coords[1]).toEqual([10, 10]);
    });

    it("sets stateAnnouncement to a move-ray-point with the new position", () => {
        const state: InteractiveGraphState = {...baseRayGraphState};

        const updated = interactiveGraphReducer(
            state,
            actions.ray.movePoint(1, [-3, 2]),
        );

        expect(updated.stateAnnouncement).toEqual({
            type: "move-ray-point",
            pointIndex: 1,
            pointLabel: undefined,
            x: -3,
            y: 2,
        });
    });

    it("carries the custom pointLabel when one is set", () => {
        const state: InteractiveGraphState = {
            ...baseRayGraphState,
            pointLabels: ["A", "B"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.ray.movePoint(0, [-3, 2]),
        );

        invariant(updated.stateAnnouncement?.type === "move-ray-point");
        expect(updated.stateAnnouncement.pointLabel).toBe("A");
    });

    it("passes an undefined pointLabel when the slot is empty", () => {
        const state: InteractiveGraphState = {
            ...baseRayGraphState,
            pointLabels: ["", "B"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.ray.movePoint(0, [-3, 2]),
        );

        invariant(updated.stateAnnouncement?.type === "move-ray-point");
        expect(updated.stateAnnouncement.pointLabel).toBeUndefined();
    });

    it("allows linear-system points to land on the graph edge", () => {
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
        expect(updated.coords[0][0]).toEqual([10, 10]);
    });

    it("sets stateAnnouncement to a move-linear-system-point with the line index", () => {
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
            actions.linearSystem.movePointInFigure(1, 0, [-3, 2]),
        );

        expect(updated.stateAnnouncement).toEqual({
            type: "move-linear-system-point",
            lineIndex: 1,
            pointIndex: 0,
            pointLabel: undefined,
            x: -3,
            y: 2,
        });
    });

    it("carries the custom pointLabel from the flattened index when one is set", () => {
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
            // Flat across both lines: [line0pt0, line0pt1, line1pt0, line1pt1].
            pointLabels: ["A", "B", "C", "D"],
        };

        // Move line 0, point 1 → flat index 0 * 2 + 1 = 1 → "B".
        const updated = interactiveGraphReducer(
            state,
            actions.linearSystem.movePointInFigure(0, 1, [-3, 2]),
        );

        invariant(
            updated.stateAnnouncement?.type === "move-linear-system-point",
        );
        expect(updated.stateAnnouncement.pointLabel).toBe("B");
    });

    it("passes an undefined pointLabel when the slot is empty", () => {
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
            pointLabels: ["A", "", "C", "D"],
        };

        // Move line 0, point 1 → flat index 1.
        const updated = interactiveGraphReducer(
            state,
            actions.linearSystem.movePointInFigure(0, 1, [-3, 2]),
        );

        invariant(
            updated.stateAnnouncement?.type === "move-linear-system-point",
        );
        expect(updated.stateAnnouncement.pointLabel).toBeUndefined();
    });

    it("allows linear points to land on the graph edge", () => {
        const state: InteractiveGraphState = {
            hasBeenInteractedWith: false,
            type: "linear",
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

        const updated = interactiveGraphReducer(
            state,
            actions.linear.movePoint(0, [99, 99]),
        );

        invariant(updated.type === "linear");
        expect(updated.coords[0]).toEqual([10, 10]);
    });

    it("sets stateAnnouncement to a move-point with the new position", () => {
        const state: InteractiveGraphState = {
            hasBeenInteractedWith: false,
            type: "linear",
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

        const updated = interactiveGraphReducer(
            state,
            actions.linear.movePoint(0, [-3, 2]),
        );

        expect(updated.stateAnnouncement).toEqual({
            type: "move-point",
            pointLabel: "1",
            x: -3,
            y: 2,
        });
    });

    it("carries the custom pointLabel when one is set", () => {
        const state: InteractiveGraphState = {
            hasBeenInteractedWith: false,
            type: "linear",
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
            coords: [
                [0, 0],
                [1, 1],
            ],
            pointLabels: ["A", "B"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.linear.movePoint(0, [-3, 2]),
        );

        invariant(updated.stateAnnouncement?.type === "move-point");
        expect(updated.stateAnnouncement.pointLabel).toBe("A");
    });

    it("falls back to the numeric default when the pointLabel slot is empty", () => {
        const state: InteractiveGraphState = {
            hasBeenInteractedWith: false,
            type: "linear",
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
            coords: [
                [0, 0],
                [1, 1],
            ],
            pointLabels: ["", "B"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.linear.movePoint(0, [-3, 2]),
        );

        invariant(updated.stateAnnouncement?.type === "move-point");
        expect(updated.stateAnnouncement.pointLabel).toBe("1");
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
            [8, 8],
            [10, 10],
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

    it("sets stateAnnouncement to a move-segment-line with the new endpoints", () => {
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

        invariant(updated.stateAnnouncement?.type === "move-segment-line");
        expect(updated.stateAnnouncement.coords).toEqual([
            [6, -1],
            [8, 1],
        ]);
    });
});

describe("moveLine on a linear graph", () => {
    it("allows the trailing endpoint to translate to the graph edge", () => {
        // The line spans (1, 2) to (3, 4). A large body-drag should
        // shift both endpoints by the same delta until the trailing
        // endpoint lands on the [-10, 10] edge.
        const state: InteractiveGraphState = {
            hasBeenInteractedWith: false,
            type: "linear",
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.linear.moveLine([99, 99]),
        );

        invariant(updated.type === "linear");
        expect(updated.coords).toEqual([
            [8, 8],
            [10, 10],
        ]);
    });

    it("sets stateAnnouncement to a move-linear-line with the new endpoints", () => {
        const state: InteractiveGraphState = {
            hasBeenInteractedWith: false,
            type: "linear",
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.linear.moveLine([-3, 3]),
        );

        invariant(updated.stateAnnouncement?.type === "move-linear-line");
        expect(updated.stateAnnouncement.coords).toEqual([
            [-3, 3],
            [-1, 5],
        ]);
    });
});

describe("moveLine on a linear-system graph", () => {
    it("sets stateAnnouncement to a move-linear-system-line with the line index and new endpoints", () => {
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
                    [-5, 5],
                    [5, 5],
                ],
                [
                    [-5, -5],
                    [5, -5],
                ],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.linearSystem.moveLine(1, [-3, -4]),
        );

        invariant(
            updated.stateAnnouncement?.type === "move-linear-system-line",
        );
        expect(updated.stateAnnouncement.lineIndex).toBe(1);
        expect(updated.stateAnnouncement.coords).toEqual([
            [-3, -4],
            [7, -4],
        ]);
    });
});

describe("moveRay on a ray graph", () => {
    it("allows the terminal endpoint to translate to the graph edge", () => {
        // baseRayGraphState has endpoints at (0, 0) and (5, 5).
        const state: InteractiveGraphState = {...baseRayGraphState};

        const updated = interactiveGraphReducer(
            state,
            actions.ray.moveRay([99, 99]),
        );

        invariant(updated.type === "ray");
        expect(updated.coords).toEqual([
            [5, 5],
            [10, 10],
        ]);
    });

    it("sets stateAnnouncement to a move-ray-line with the new endpoints", () => {
        // baseRayGraphState has endpoints at (0, 0) and (5, 5).
        const state: InteractiveGraphState = {...baseRayGraphState};

        const updated = interactiveGraphReducer(
            state,
            actions.ray.moveRay([-3, 3]),
        );

        invariant(updated.stateAnnouncement?.type === "move-ray-line");
        expect(updated.stateAnnouncement.coords).toEqual([
            [-3, 3],
            [2, 8],
        ]);
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

    it("sets stateAnnouncement to a move-point with the new position", () => {
        const state: InteractiveGraphState = {
            ...basePointGraphState,
            coords: [[0, 0]],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.movePoint(0, [3, 4]),
        );

        expect(updated.stateAnnouncement).toEqual({
            type: "move-point",
            pointLabel: "1",
            x: 3,
            y: 4,
        });
    });

    it("uses the custom pointLabel in the move-point announcement", () => {
        const state: InteractiveGraphState = {
            ...basePointGraphState,
            coords: [[0, 0]],
            pointLabels: ["T"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.movePoint(0, [3, 4]),
        );

        expect(updated.stateAnnouncement).toEqual({
            type: "move-point",
            pointLabel: "T",
            x: 3,
            y: 4,
        });
    });

    it("falls back to the numeric default when the pointLabel slot is empty", () => {
        // The editor encodes "only the second point labeled" as ["", "B"];
        // the reducer must keep the unlabeled slot on its numeric default
        // (stringified to match the announcement payload contract).
        const state: InteractiveGraphState = {
            ...basePointGraphState,
            coords: [
                [0, 0],
                [1, 1],
            ],
            pointLabels: ["", "B"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.pointGraph.movePoint(0, [3, 4]),
        );

        expect(updated.stateAnnouncement).toEqual({
            type: "move-point",
            pointLabel: "1",
            x: 3,
            y: 4,
        });
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

    it("sets stateAnnouncement to a move-angle-point with the measured angle for the vertex", () => {
        // Use a wider-spaced angle so moving the vertex doesn't pull the
        // side points too close (which would reject the move).
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
            actions.angle.movePoint(1, [1, 1]),
        );

        invariant(updated.stateAnnouncement?.type === "move-angle-point");
        expect(updated.stateAnnouncement.pointIndex).toBe(1);
        expect(updated.stateAnnouncement.x).toBe(1);
        expect(updated.stateAnnouncement.y).toBe(1);
        expect(typeof updated.stateAnnouncement.angleMeasure).toBe("number");
    });

    it("sets stateAnnouncement to a move-angle-point when moving a side point", () => {
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
            actions.angle.movePoint(0, [5, 5]),
        );

        invariant(updated.stateAnnouncement?.type === "move-angle-point");
        expect(updated.stateAnnouncement.pointIndex).toBe(0);
    });

    it("carries the custom pointLabel when one is set", () => {
        const state: InteractiveGraphState = {
            ...baseAngleGraphState,
            coords: [
                [0, 5],
                [0, 0],
                [5, 0],
            ],
            pointLabels: ["T", "V", "S"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.angle.movePoint(0, [5, 5]),
        );

        invariant(updated.stateAnnouncement?.type === "move-angle-point");
        expect(updated.stateAnnouncement.pointLabel).toBe("T");
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

    it("sets stateAnnouncement to a move-point with the new position", () => {
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

        expect(updated.stateAnnouncement).toEqual({
            type: "move-point",
            pointLabel: "1",
            x: 0,
            y: 1,
        });
    });

    it("uses the custom pointLabel in the move-point announcement", () => {
        const state: InteractiveGraphState = {
            ...basePolygonGraphState,
            coords: [
                [0, 0],
                [0, 2],
                [2, 2],
                [2, 0],
            ],
            pointLabels: ["A", "B", "C", "D"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.movePoint(0, [0, 1]),
        );

        expect(updated.stateAnnouncement).toEqual({
            type: "move-point",
            pointLabel: "A",
            x: 0,
            y: 1,
        });
    });

    it("falls back to the numeric default when the pointLabel slot is empty", () => {
        const state: InteractiveGraphState = {
            ...basePolygonGraphState,
            coords: [
                [0, 0],
                [0, 2],
                [2, 2],
                [2, 0],
            ],
            pointLabels: ["", "B", "C", "D"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.movePoint(0, [0, 1]),
        );

        expect(updated.stateAnnouncement).toEqual({
            type: "move-point",
            pointLabel: "1",
            x: 0,
            y: 1,
        });
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

    it("sets stateAnnouncement to a move-polygon with the new vertex coords on moveAll", () => {
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
            actions.polygon.moveAll([1, 1]),
        );

        invariant(updated.stateAnnouncement?.type === "move-polygon");
        expect(updated.stateAnnouncement.coords).toEqual([
            [1, 1],
            [1, 3],
            [3, 3],
            [3, 1],
        ]);
    });

    it("carries custom pointLabels in the move-polygon announcement on moveAll", () => {
        const state: InteractiveGraphState = {
            ...basePolygonGraphState,
            coords: [
                [0, 0],
                [0, 2],
                [2, 2],
                [2, 0],
            ],
            pointLabels: ["A", "B", "C", "D"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.polygon.moveAll([1, 1]),
        );

        invariant(updated.stateAnnouncement?.type === "move-polygon");
        expect(updated.stateAnnouncement.pointLabels).toEqual([
            "A",
            "B",
            "C",
            "D",
        ]);
    });
});

describe("movePoint on a sinusoid graph", () => {
    it("sets stateAnnouncement to a move-sinusoid-point when moving the root", () => {
        const state: InteractiveGraphState = {
            ...baseSinusoidGraphState,
            coords: [
                [0, 0],
                [2, 3],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.sinusoid.movePoint(0, [1, 1]),
        );

        invariant(updated.stateAnnouncement?.type === "move-sinusoid-point");
        expect(updated.stateAnnouncement.pointIndex).toBe(0);
        expect(updated.stateAnnouncement.x).toBe(1);
        expect(updated.stateAnnouncement.y).toBe(1);
        // otherY is the peak's y, unchanged from the starting state
        expect(updated.stateAnnouncement.otherY).toBe(3);
    });

    it("sets stateAnnouncement to a move-sinusoid-point when moving the peak", () => {
        const state: InteractiveGraphState = {
            ...baseSinusoidGraphState,
            coords: [
                [0, 0],
                [2, 3],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.sinusoid.movePoint(1, [3, -4]),
        );

        invariant(updated.stateAnnouncement?.type === "move-sinusoid-point");
        expect(updated.stateAnnouncement.pointIndex).toBe(1);
        expect(updated.stateAnnouncement.x).toBe(3);
        expect(updated.stateAnnouncement.y).toBe(-4);
        // otherY is the root's y, unchanged from the starting state
        expect(updated.stateAnnouncement.otherY).toBe(0);
    });

    it("carries the custom pointLabel when one is set", () => {
        const state: InteractiveGraphState = {
            ...baseSinusoidGraphState,
            coords: [
                [0, 0],
                [2, 3],
            ],
            pointLabels: ["T", "P"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.sinusoid.movePoint(0, [1, 1]),
        );

        invariant(updated.stateAnnouncement?.type === "move-sinusoid-point");
        expect(updated.stateAnnouncement.pointLabel).toBe("T");
    });

    it("passes an undefined pointLabel when the slot is empty (the announcement helper owns the fallback)", () => {
        const state: InteractiveGraphState = {
            ...baseSinusoidGraphState,
            coords: [
                [0, 0],
                [2, 3],
            ],
            pointLabels: ["", "P"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.sinusoid.movePoint(0, [1, 1]),
        );

        invariant(updated.stateAnnouncement?.type === "move-sinusoid-point");
        expect(updated.stateAnnouncement.pointLabel).toBeUndefined();
    });
});

describe("movePoint on an absolute-value graph", () => {
    it("sets stateAnnouncement to a move-absolute-value-point when moving the vertex", () => {
        const state: InteractiveGraphState = baseAbsoluteValueGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.absoluteValue.movePoint(0, [-3, 1]),
        );

        invariant(
            updated.stateAnnouncement?.type === "move-absolute-value-point",
        );
        expect(updated.stateAnnouncement.pointIndex).toBe(0);
        expect(updated.stateAnnouncement.x).toBe(-3);
        expect(updated.stateAnnouncement.y).toBe(1);
        expect(updated.stateAnnouncement.slope).toBe(0.2);
    });

    it("sets stateAnnouncement to a move-absolute-value-point when moving the arm point", () => {
        const state: InteractiveGraphState = baseAbsoluteValueGraphState;

        const updated = interactiveGraphReducer(
            state,
            actions.absoluteValue.movePoint(1, [4, -2]),
        );

        invariant(
            updated.stateAnnouncement?.type === "move-absolute-value-point",
        );
        expect(updated.stateAnnouncement.pointIndex).toBe(1);
        expect(updated.stateAnnouncement.x).toBe(4);
        expect(updated.stateAnnouncement.y).toBe(-2);
        // Vertex (0, 0) with arm (4, -2): slope = (-2 - 0) / |4 - 0| = -0.5.
        expect(updated.stateAnnouncement.slope).toBe(-0.5);
    });

    it("carries the custom pointLabel when one is set", () => {
        const state: InteractiveGraphState = {
            ...baseAbsoluteValueGraphState,
            pointLabels: ["V", "P"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.absoluteValue.movePoint(0, [-3, 1]),
        );

        invariant(
            updated.stateAnnouncement?.type === "move-absolute-value-point",
        );
        expect(updated.stateAnnouncement.pointLabel).toBe("V");
    });

    it("passes an undefined pointLabel when the slot is empty", () => {
        const state: InteractiveGraphState = {
            ...baseAbsoluteValueGraphState,
            pointLabels: ["", "P"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.absoluteValue.movePoint(0, [-3, 1]),
        );

        invariant(
            updated.stateAnnouncement?.type === "move-absolute-value-point",
        );
        expect(updated.stateAnnouncement.pointLabel).toBeUndefined();
    });

    it("rejects the move when both points would share the same x-coordinate", () => {
        const state: InteractiveGraphState = baseAbsoluteValueGraphState;

        // Moving the vertex onto the arm point's x (2) would make the slope
        // undefined, so the move is rejected.
        const updated = interactiveGraphReducer(
            state,
            actions.absoluteValue.movePoint(0, [2, 5]),
        );

        invariant(updated.type === "absolute-value");
        expect(updated.coords[0]).toEqual([0, 0]);
        expect(updated.stateAnnouncement).toBeUndefined();
    });
});

describe("movePoint on a tangent graph", () => {
    it("sets stateAnnouncement to a move-tangent-point when moving the inflection point", () => {
        const state = generateTangentGraphState({
            coords: [
                [0, 0],
                [2, 2],
            ],
        });

        const updated = interactiveGraphReducer(
            state,
            actions.tangent.movePoint(0, [-3, 1]),
        );

        invariant(updated.stateAnnouncement?.type === "move-tangent-point");
        expect(updated.stateAnnouncement.pointIndex).toBe(0);
        expect(updated.stateAnnouncement.x).toBe(-3);
        expect(updated.stateAnnouncement.y).toBe(1);
    });

    it("sets stateAnnouncement to a move-tangent-point when moving the second point", () => {
        const state = generateTangentGraphState({
            coords: [
                [0, 0],
                [2, 2],
            ],
        });

        const updated = interactiveGraphReducer(
            state,
            actions.tangent.movePoint(1, [4, -2]),
        );

        invariant(updated.stateAnnouncement?.type === "move-tangent-point");
        expect(updated.stateAnnouncement.pointIndex).toBe(1);
        expect(updated.stateAnnouncement.x).toBe(4);
        expect(updated.stateAnnouncement.y).toBe(-2);
    });

    it("carries the custom pointLabel when one is set", () => {
        const state = generateTangentGraphState({
            coords: [
                [0, 0],
                [2, 2],
            ],
            pointLabels: ["I", "P"],
        });

        const updated = interactiveGraphReducer(
            state,
            actions.tangent.movePoint(0, [-3, 1]),
        );

        invariant(updated.stateAnnouncement?.type === "move-tangent-point");
        expect(updated.stateAnnouncement.pointLabel).toBe("I");
    });

    it("passes an undefined pointLabel when the slot is empty", () => {
        const state = generateTangentGraphState({
            coords: [
                [0, 0],
                [2, 2],
            ],
            pointLabels: ["", "P"],
        });

        const updated = interactiveGraphReducer(
            state,
            actions.tangent.movePoint(0, [-3, 1]),
        );

        invariant(updated.stateAnnouncement?.type === "move-tangent-point");
        expect(updated.stateAnnouncement.pointLabel).toBeUndefined();
    });

    it("rejects the move when both points would share the same x-coordinate", () => {
        const state = generateTangentGraphState({
            coords: [
                [0, 0],
                [2, 2],
            ],
        });

        // Moving the inflection point onto the second point's x (2) would make
        // the coefficients undefined, so the move is rejected.
        const updated = interactiveGraphReducer(
            state,
            actions.tangent.movePoint(0, [2, 5]),
        );

        invariant(updated.type === "tangent");
        expect(updated.coords[0]).toEqual([0, 0]);
        expect(updated.stateAnnouncement).toBeUndefined();
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

    it("sets stateAnnouncement to a move-quadratic-point with the new vertex", () => {
        // Use a symmetric upward parabola: vertex sits at (0, 0).
        const state: InteractiveGraphState = {
            ...baseQuadraticGraphState,
            coords: [
                [-1, 1],
                [0, 0],
                [1, 1],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.quadratic.movePoint(0, [-2, 4]),
        );

        invariant(updated.stateAnnouncement?.type === "move-quadratic-point");
        expect(updated.stateAnnouncement.pointIndex).toBe(0);
        expect(updated.stateAnnouncement.x).toBe(-2);
        expect(updated.stateAnnouncement.y).toBe(4);
        // After this move the parabola still has vertex at (0, 0).
        expect(updated.stateAnnouncement.vertex).not.toBeUndefined();
        invariant(updated.stateAnnouncement.vertex !== undefined);
        expect(updated.stateAnnouncement.vertex[0]).toBeCloseTo(0);
        expect(updated.stateAnnouncement.vertex[1]).toBeCloseTo(0);
    });

    it("sets stateAnnouncement vertex to undefined when the parabola degenerates to a line", () => {
        // All three points collinear → a === 0 → no vertex.
        const state: InteractiveGraphState = {
            ...baseQuadraticGraphState,
            coords: [
                [-1, -1],
                [0, 0],
                [1, 1],
            ],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.quadratic.movePoint(0, [-2, -2]),
        );

        invariant(updated.stateAnnouncement?.type === "move-quadratic-point");
        expect(updated.stateAnnouncement.vertex).toBeUndefined();
    });

    it("carries the custom pointLabel when one is set", () => {
        const state: InteractiveGraphState = {
            ...baseQuadraticGraphState,
            coords: [
                [-1, 1],
                [0, 0],
                [1, 1],
            ],
            pointLabels: ["A", "B", "C"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.quadratic.movePoint(0, [-2, 4]),
        );

        invariant(updated.stateAnnouncement?.type === "move-quadratic-point");
        expect(updated.stateAnnouncement.pointLabel).toBe("A");
    });

    it("passes an undefined pointLabel when the slot is empty", () => {
        const state: InteractiveGraphState = {
            ...baseQuadraticGraphState,
            coords: [
                [-1, 1],
                [0, 0],
                [1, 1],
            ],
            pointLabels: ["", "B", "C"],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.quadratic.movePoint(0, [-2, 4]),
        );

        invariant(updated.stateAnnouncement?.type === "move-quadratic-point");
        expect(updated.stateAnnouncement.pointLabel).toBeUndefined();
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
        // eslint-disable-next-line no-restricted-syntax
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
        // eslint-disable-next-line no-restricted-syntax
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
        // eslint-disable-next-line no-restricted-syntax
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
        // eslint-disable-next-line no-restricted-syntax
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

    it("sets stateAnnouncement with the new center position", () => {
        const state: InteractiveGraphState = {
            ...baseCircleGraphState,
            center: [0, 0],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.circle.moveCenter([1, 1]),
        );

        expect(updated.stateAnnouncement).toEqual({
            type: "move-center",
            x: 1,
            y: 1,
        });
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
        // eslint-disable-next-line no-restricted-syntax
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
        // eslint-disable-next-line no-restricted-syntax
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
        // eslint-disable-next-line no-restricted-syntax
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
        // eslint-disable-next-line no-restricted-syntax
        expect((updated as CircleGraphState).radiusPoint).toEqual([2, 0]);
    });

    it("sets stateAnnouncement with the radius point position and radius", () => {
        const state: InteractiveGraphState = {
            ...baseCircleGraphState,
            center: [0, 0],
        };

        const updated = interactiveGraphReducer(
            state,
            actions.circle.moveRadiusPoint([3, 0]),
        );

        expect(updated.stateAnnouncement).toEqual({
            type: "move-radius-point",
            x: 3,
            y: 0,
            centerX: 0,
            radius: 3,
        });
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

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([1, 1]),
        ) as PointGraphState;

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([2, 2]),
        ) as PointGraphState;

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.pointGraph.blurPoint(),
        ) as PointGraphState;

        // eslint-disable-next-line no-restricted-syntax
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

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([1, 1]),
        ) as PolygonGraphState;

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([2, 2]),
        ) as PolygonGraphState;

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.polygon.blurPoint(),
        ) as PolygonGraphState;

        // eslint-disable-next-line no-restricted-syntax
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
        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([1, 1]),
        ) as PointGraphState;

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([2, 2]),
        ) as PointGraphState;

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([3, 3]),
        ) as PointGraphState;

        // Focus a point
        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.pointGraph.focusPoint(0),
        ) as PointGraphState;

        // Fire a delete intent
        // eslint-disable-next-line no-restricted-syntax
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
        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([1, 1]),
        ) as PolygonGraphState;

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([2, 2]),
        ) as PolygonGraphState;

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([3, 3]),
        ) as PolygonGraphState;

        // Focus a point
        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.polygon.focusPoint(0),
        ) as PolygonGraphState;

        // Fire a delete intent
        // eslint-disable-next-line no-restricted-syntax
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

        // eslint-disable-next-line no-restricted-syntax
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

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([1, 1]),
        ) as PointGraphState;

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([2, 2]),
        ) as PointGraphState;

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.pointGraph.addPoint([3, 3]),
        ) as PointGraphState;

        // eslint-disable-next-line no-restricted-syntax
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

        // eslint-disable-next-line no-restricted-syntax
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

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([1, 1]),
        ) as PolygonGraphState;

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([2, 2]),
        ) as PolygonGraphState;

        // eslint-disable-next-line no-restricted-syntax
        state = interactiveGraphReducer(
            state,
            actions.polygon.addPoint([3, 3]),
        ) as PolygonGraphState;

        // eslint-disable-next-line no-restricted-syntax
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

    it("allows the point to land on the asymptote", () => {
        // Arrange — asymptote at y=1; moving point 0 to y=1 used to be rejected
        // but is now allowed. The curve disappears because no exponential fits
        // a point on its own horizontal asymptote.
        const state = generateExponentialGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.exponential.movePoint(0, [-1, 1]),
        );

        // Assert
        invariant(updated.type === "exponential");
        expect(updated.coords[0]).toEqual([-1, 1]);
    });

    it("allows the point to cross the asymptote without reflecting the other point", () => {
        // Arrange — asymptote at y=1, points at y=3 and y=6 (both above).
        // Moving point 0 below the asymptote used to reflect point 1; it is
        // now allowed and the curve disappears.
        const state = generateExponentialGraphState();
        const originalOtherPoint = state.coords[1];

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.exponential.movePoint(0, [-1, -5]),
        );

        // Assert
        invariant(updated.type === "exponential");
        expect(updated.coords[0]).toEqual([-1, -5]);
        expect(updated.coords[1]).toEqual(originalOtherPoint);
    });

    it("rejects the move when the point would overlap the asymptote drag handle", () => {
        // Arrange — range is [-10,10] so midX=0; asymptote=1. The handle is
        // at (0, 1). Moving point 0 onto that coord must be rejected so the
        // user can always grab the handle.
        const state = generateExponentialGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.exponential.movePoint(0, [0, 1]),
        );

        // Assert — move was rejected
        invariant(updated.type === "exponential");
        expect(updated.coords[0]).toEqual([0, 3]);
        expect(updated.hasBeenInteractedWith).toBe(false);
    });

    it("sets stateAnnouncement to a move-exponential-point with the new position", () => {
        const state = generateExponentialGraphState();

        const updated = interactiveGraphReducer(
            state,
            actions.exponential.movePoint(0, [-1, 4]),
        );

        invariant(updated.stateAnnouncement?.type === "move-exponential-point");
        expect(updated.stateAnnouncement.pointIndex).toBe(0);
        expect(updated.stateAnnouncement.x).toBe(-1);
        expect(updated.stateAnnouncement.y).toBe(4);
        expect(updated.stateAnnouncement.hasCurve).toBe(true);
    });

    it("reports hasCurve false when the move leaves the points straddling the asymptote", () => {
        // Default points sit above asymptote y=1; move point 0 below it so no
        // exponential fits.
        const state = generateExponentialGraphState();

        const updated = interactiveGraphReducer(
            state,
            actions.exponential.movePoint(0, [-1, -2]),
        );

        invariant(updated.stateAnnouncement?.type === "move-exponential-point");
        expect(updated.stateAnnouncement.hasCurve).toBe(false);
    });

    it("carries the custom pointLabel when one is set", () => {
        const state = generateExponentialGraphState({pointLabels: ["A", "B"]});

        const updated = interactiveGraphReducer(
            state,
            actions.exponential.movePoint(1, [3, 7]),
        );

        invariant(updated.stateAnnouncement?.type === "move-exponential-point");
        expect(updated.stateAnnouncement.pointIndex).toBe(1);
        expect(updated.stateAnnouncement.pointLabel).toBe("B");
    });

    it("passes an undefined pointLabel when the slot is empty", () => {
        const state = generateExponentialGraphState({pointLabels: ["", "B"]});

        const updated = interactiveGraphReducer(
            state,
            actions.exponential.movePoint(0, [-1, 4]),
        );

        invariant(updated.stateAnnouncement?.type === "move-exponential-point");
        expect(updated.stateAnnouncement.pointLabel).toBeUndefined();
    });

    it("emits no announcement when the move is rejected", () => {
        const state = generateExponentialGraphState();

        // Moving point 0 onto point 1's x (2) is rejected.
        const updated = interactiveGraphReducer(
            state,
            actions.exponential.movePoint(0, [2, 4]),
        );

        expect(updated.stateAnnouncement).toBeUndefined();
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

    it("allows the asymptote to move between the curve points", () => {
        // Arrange — curve points at y=3 and y=6. Moving the asymptote to y=4
        // (between them) used to snap-through to y=2; it is now allowed and
        // the curve disappears.
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

        // Assert
        expect(updated.asymptote).toBe(4);
    });

    it("rejects the move when the asymptote drag handle would overlap a point", () => {
        // Arrange — range [-10,10] so midX=0. Point 0 sits at (0, 5), so
        // moving the asymptote to y=5 would place its handle on the point.
        const state = generateExponentialGraphState({
            coords: [
                [0, 5],
                [2, 8],
            ],
            asymptote: 1,
        });

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.exponential.moveCenter([0, 5]),
        );
        invariant(updated.type === "exponential");

        // Assert — move was rejected; asymptote stays at 1
        expect(updated.asymptote).toBe(1);
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

    it("sets stateAnnouncement to a move-exponential-asymptote with the new y", () => {
        const state = generateExponentialGraphState();

        const updated = interactiveGraphReducer(
            state,
            actions.exponential.moveCenter([-10, -2]),
        );

        expect(updated.stateAnnouncement).toEqual({
            type: "move-exponential-asymptote",
            asymptoteY: -2,
        });
    });

    it("emits no announcement when the asymptote move is rejected", () => {
        // Point 0 sits at (0, 5); moving the asymptote to y=5 would place its
        // handle on the point, so the move is rejected.
        const state = generateExponentialGraphState({
            coords: [
                [0, 5],
                [2, 8],
            ],
            asymptote: 1,
        });

        const updated = interactiveGraphReducer(
            state,
            actions.exponential.moveCenter([0, 5]),
        );

        expect(updated.stateAnnouncement).toBeUndefined();
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

    it("allows the point to land on the asymptote", () => {
        // Arrange — asymptote at x=-6; moving point 0 to x=-6 used to be
        // rejected but is now allowed. The curve disappears because no
        // logarithm fits a point on its own vertical asymptote.
        const state = generateLogarithmGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(0, [-6, -2]),
        );

        // Assert
        invariant(updated.type === "logarithm");
        expect(updated.coords[0]).toEqual([-6, -2]);
    });

    it("allows the point to cross the asymptote without reflecting the other point", () => {
        // Arrange — asymptote at x=-6, points at (-4, -3) and (-5, -7),
        // both to the right. Moving point 0 across the asymptote used to
        // reflect point 1; it is now allowed and the curve disappears.
        const state = generateLogarithmGraphState();
        const originalOtherPoint = state.coords[1];

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(0, [-8, -3]),
        );

        // Assert
        invariant(updated.type === "logarithm");
        expect(updated.coords[0]).toEqual([-8, -3]);
        expect(updated.coords[1]).toEqual(originalOtherPoint);
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

    it("rejects the move when the point would overlap the asymptote drag handle", () => {
        // Arrange — range is [-10,10] so midY=0; asymptote=-6. The handle
        // is at (-6, 0). Moving point 0 onto that coord must be rejected.
        const state = generateLogarithmGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(0, [-6, 0]),
        );

        // Assert — move was rejected
        invariant(updated.type === "logarithm");
        expect(updated.coords[0]).toEqual([-4, -3]);
        expect(updated.hasBeenInteractedWith).toBe(false);
    });

    it("sets stateAnnouncement to a move-logarithm-point with the new position", () => {
        const state = generateLogarithmGraphState();

        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(0, [-3, -2]),
        );

        invariant(updated.stateAnnouncement?.type === "move-logarithm-point");
        expect(updated.stateAnnouncement.pointIndex).toBe(0);
        expect(updated.stateAnnouncement.x).toBe(-3);
        expect(updated.stateAnnouncement.y).toBe(-2);
        expect(updated.stateAnnouncement.hasCurve).toBe(true);
    });

    it("reports hasCurve false when the move leaves the points in a position where no curve fits", () => {
        // Default points sit right of asymptote x=-6; move point 0 left of it
        // so the points straddle the asymptote and no logarithm fits.
        const state = generateLogarithmGraphState();

        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(0, [-8, -3]),
        );

        invariant(updated.stateAnnouncement?.type === "move-logarithm-point");
        expect(updated.stateAnnouncement.hasCurve).toBe(false);
    });

    it("carries the custom pointLabel when one is set", () => {
        const state = generateLogarithmGraphState({pointLabels: ["A", "B"]});

        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(1, [-3, 4]),
        );

        invariant(updated.stateAnnouncement?.type === "move-logarithm-point");
        expect(updated.stateAnnouncement.pointIndex).toBe(1);
        expect(updated.stateAnnouncement.pointLabel).toBe("B");
    });

    it("passes an undefined pointLabel when the slot is empty", () => {
        const state = generateLogarithmGraphState({pointLabels: ["", "B"]});

        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(0, [-3, -2]),
        );

        invariant(updated.stateAnnouncement?.type === "move-logarithm-point");
        expect(updated.stateAnnouncement.pointLabel).toBeUndefined();
    });

    it("emits no announcement when the move is rejected", () => {
        const state = generateLogarithmGraphState();

        // Moving point 0 onto point 1's y (-7) is rejected.
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.movePoint(0, [-4, -7]),
        );

        expect(updated.stateAnnouncement).toBeUndefined();
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

    it("allows the asymptote to move between the curve points", () => {
        // Arrange — curve points at x=-4 and x=-5. Moving the asymptote
        // between them used to snap-through to x=-3; it is now allowed
        // and the curve disappears.
        const state = generateLogarithmGraphState({
            coords: [
                [-4, -3],
                [-5, -7],
            ],
        });

        // Act — destination snaps to x=-4
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.moveCenter([-4.4, 0]),
        );
        invariant(updated.type === "logarithm");

        // Assert
        expect(updated.asymptote).toBe(-4);
    });

    it("rejects the move when the asymptote drag handle would overlap a point", () => {
        // Arrange — range [-10,10] so midY=0. Point 0 sits at (3, 0), so
        // moving the asymptote to x=3 would place its handle on the point.
        const state = generateLogarithmGraphState({
            coords: [
                [3, 0],
                [5, 2],
            ],
            asymptote: -6,
        });

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.moveCenter([3, 0]),
        );
        invariant(updated.type === "logarithm");

        // Assert — move was rejected; asymptote stays at -6
        expect(updated.asymptote).toBe(-6);
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

    it("sets stateAnnouncement to a move-logarithm-asymptote with the new x", () => {
        const state = generateLogarithmGraphState();

        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.moveCenter([-8, 99]),
        );

        expect(updated.stateAnnouncement).toEqual({
            type: "move-logarithm-asymptote",
            asymptoteX: -8,
        });
    });

    it("emits no announcement when the asymptote move is rejected", () => {
        // Point 0 sits at (3, 0); moving the asymptote to x=3 would place its
        // handle on the point, so the move is rejected.
        const state = generateLogarithmGraphState({
            coords: [
                [3, 0],
                [5, 2],
            ],
            asymptote: -6,
        });

        const updated = interactiveGraphReducer(
            state,
            actions.logarithm.moveCenter([3, 0]),
        );

        expect(updated.stateAnnouncement).toBeUndefined();
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

    it("sets stateAnnouncement to a move-vector-point for the tip", () => {
        // Arrange
        const state = generateVectorGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.vector.moveTip([5, 6]),
        );

        // Assert
        expect(updated.stateAnnouncement).toEqual({
            type: "move-vector-point",
            pointIndex: 1,
            x: 5,
            y: 6,
        });
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
        // the largest valid delta keeping tip inside [-10, 10] is [7, 6].
        const state = generateVectorGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.vector.moveVector([8, 8]),
        );

        // Assert — both endpoints moved by the same clamped delta
        invariant(updated.type === "vector");
        expect(updated.coords).toEqual([
            [7, 6],
            [10, 10],
        ]);
    });

    it("sets stateAnnouncement to a move-vector-line with the new endpoints", () => {
        // Arrange — default tail [0,0], tip [3,4]; delta [2,1]
        const state = generateVectorGraphState();

        // Act
        const updated = interactiveGraphReducer(
            state,
            actions.vector.moveVector([2, 1]),
        );

        // Assert
        invariant(updated.stateAnnouncement?.type === "move-vector-line");
        expect(updated.stateAnnouncement.coords).toEqual([
            [2, 1],
            [5, 5],
        ]);
    });
});
