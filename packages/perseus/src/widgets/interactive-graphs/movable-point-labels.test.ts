import {getLabelAttach, getLabeledMovablePoints} from "./movable-point-labels";

import type {
    AngleGraphState,
    CircleGraphState,
    InteractiveGraphState,
    LinearGraphState,
    LinearSystemGraphState,
    PointGraphState,
    PolygonGraphState,
    SegmentGraphState,
    SinusoidGraphState,
} from "./types";

const baseCommon: {
    hasBeenInteractedWith: boolean;
    range: InteractiveGraphState["range"];
    snapStep: [number, number];
} = {
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

function pointState(overrides: Partial<PointGraphState> = {}): PointGraphState {
    return {
        ...baseCommon,
        type: "point",
        coords: [[1, 2]],
        focusedPointIndex: null,
        showRemovePointButton: false,
        interactionMode: "mouse",
        showKeyboardInteractionInvitation: false,
        ...overrides,
    };
}

describe("getLabeledMovablePoints", () => {
    it("returns [] when showPointLabels is absent (legacy SR-only pointLabels case)", () => {
        // Arrange
        const state = pointState({
            coords: [
                [1, 2],
                [3, 4],
            ],
            // pointLabels is set for screen-reader text but showPointLabels
            // is unset — visible rendering must stay off.
            pointLabels: ["A", "B"],
        });

        // Act, Assert
        expect(getLabeledMovablePoints(state)).toEqual([]);
    });

    it("returns [] when showPointLabels is true but pointLabels is undefined", () => {
        // Arrange
        const state = pointState({
            coords: [[1, 2]],
            showPointLabels: true,
        });

        // Act, Assert: missing labels stay missing — no A/B/C fallback.
        expect(getLabeledMovablePoints(state)).toEqual([]);
    });

    it("skips missing or empty entries without inventing a letter", () => {
        // Arrange: pointLabels has 2 entries but coords has 3 — the
        // third slot is structurally undefined.
        const state = pointState({
            coords: [
                [1, 2],
                [3, 4],
                [5, 6],
            ],
            showPointLabels: true,
            pointLabels: ["A", ""],
        });

        // Act, Assert
        expect(getLabeledMovablePoints(state)).toEqual([
            {key: "point-0", coord: [1, 2], text: "A"},
        ]);
    });

    it("includes TeX-bearing label strings verbatim (no escaping)", () => {
        // The layer hands the raw string to TeX/replaceOutsideTeX; this
        // helper must not strip `$` or other math markers.
        // Arrange
        const state = pointState({
            coords: [[1, 2]],
            showPointLabels: true,
            pointLabels: ["$A$"],
        });

        // Act, Assert
        expect(getLabeledMovablePoints(state)).toEqual([
            {key: "point-0", coord: [1, 2], text: "$A$"},
        ]);
    });

    it("zips angle coords with effective labels by index (ending=0, vertex=1, starting=2)", () => {
        // Arrange
        const state: AngleGraphState = {
            ...baseCommon,
            type: "angle",
            coords: [
                [3, 0],
                [0, 0],
                [0, 3],
            ],
            showPointLabels: true,
            pointLabels: ["E", "V", "S"],
        };

        // Act, Assert
        expect(getLabeledMovablePoints(state)).toEqual([
            {key: "angle-0", coord: [3, 0], text: "E"},
            {key: "angle-1", coord: [0, 0], text: "V"},
            {key: "angle-2", coord: [0, 3], text: "S"},
        ]);
    });

    it("only labels the radius point on circle graphs (center stays unlabeled)", () => {
        // Arrange
        const state: CircleGraphState = {
            ...baseCommon,
            type: "circle",
            center: [0, 0],
            radiusPoint: [3, 0],
            showPointLabels: true,
            pointLabels: ["R"],
        };

        // Act, Assert
        expect(getLabeledMovablePoints(state)).toEqual([
            {key: "circle-radius", coord: [3, 0], text: "R"},
        ]);
    });

    it("flattens linear-system coords as [line0-start, line0-end, line1-start, line1-end]", () => {
        // Arrange
        const state: LinearSystemGraphState = {
            ...baseCommon,
            type: "linear-system",
            coords: [
                [
                    [-3, 0],
                    [3, 0],
                ],
                [
                    [0, -3],
                    [0, 3],
                ],
            ],
            showPointLabels: true,
            pointLabels: ["A", "B", "C", "D"],
        };

        // Act
        const result = getLabeledMovablePoints(state);

        // Assert
        expect(result.map((r) => r.text)).toEqual(["A", "B", "C", "D"]);
        expect(result.map((r) => r.coord)).toEqual([
            [-3, 0],
            [3, 0],
            [0, -3],
            [0, 3],
        ]);
    });

    it("flattens segment coords across every endpoint", () => {
        // Arrange
        const state: SegmentGraphState = {
            ...baseCommon,
            type: "segment",
            coords: [
                [
                    [-3, 0],
                    [3, 0],
                ],
                [
                    [-2, 2],
                    [2, 2],
                ],
            ],
            showPointLabels: true,
            pointLabels: ["a", "b", "c", "d"],
        };

        // Act, Assert
        expect(getLabeledMovablePoints(state).map((r) => r.text)).toEqual([
            "a",
            "b",
            "c",
            "d",
        ]);
    });

    it("handles linear / ray / sinusoid as two-endpoint state.coords", () => {
        // Arrange
        const linear: LinearGraphState = {
            ...baseCommon,
            type: "linear",
            coords: [
                [-3, 0],
                [3, 0],
            ],
            showPointLabels: true,
            pointLabels: ["s", "e"],
        };
        const sinusoid: SinusoidGraphState = {
            ...baseCommon,
            type: "sinusoid",
            coords: [
                [0, 0],
                [1, 1],
            ],
            showPointLabels: true,
            pointLabels: ["root", "peak"],
        };

        // Act, Assert
        expect(getLabeledMovablePoints(linear).map((r) => r.text)).toEqual([
            "s",
            "e",
        ]);
        expect(getLabeledMovablePoints(sinusoid).map((r) => r.text)).toEqual([
            "root",
            "peak",
        ]);
    });

    it("walks polygon coords in order", () => {
        // Arrange
        const state: PolygonGraphState = {
            ...baseCommon,
            type: "polygon",
            coords: [
                [0, 0],
                [3, 0],
                [3, 3],
            ],
            showAngles: false,
            showSides: false,
            snapTo: "grid",
            focusedPointIndex: null,
            showRemovePointButton: false,
            interactionMode: "mouse",
            showKeyboardInteractionInvitation: false,
            closedPolygon: true,
            showPointLabels: true,
            pointLabels: ["P", "Q", "R"],
        };

        // Act, Assert
        expect(getLabeledMovablePoints(state).map((r) => r.text)).toEqual([
            "P",
            "Q",
            "R",
        ]);
    });
});

describe("getLabelAttach", () => {
    // Range centered at (0, 0): [[-10, 10], [-10, 10]]
    const range: InteractiveGraphState["range"] = [
        [-10, 10],
        [-10, 10],
    ];

    it("attaches NE for points in the upper-right quadrant (default)", () => {
        // Arrange, Act, Assert
        expect(getLabelAttach([5, 5], range)).toBe("ne");
        expect(getLabelAttach([1, 1], range)).toBe("ne");
    });

    it("attaches NW when the point is in the upper-left quadrant (pushes label outward to the left)", () => {
        // Arrange, Act, Assert
        expect(getLabelAttach([-5, 5], range)).toBe("nw");
    });

    it("attaches SW when the point is in the lower-left quadrant", () => {
        // Arrange, Act, Assert
        expect(getLabelAttach([-5, -5], range)).toBe("sw");
    });

    it("attaches SE when the point is in the lower-right quadrant", () => {
        // Arrange, Act, Assert
        expect(getLabelAttach([5, -5], range)).toBe("se");
    });

    it("flips the horizontal attach inward when the point sits on the right edge so the label stays on-canvas", () => {
        // Arrange, Act
        const attach = getLabelAttach([10, 0], range);

        // Assert: without the flip, the quadrant rule would attach east
        // and the label would spill off the right side of the canvas.
        // The flip pushes the label west, into the plotted region.
        expect(attach.endsWith("w")).toBe(true);
    });

    it("flips the vertical attach inward when the point sits on the top edge", () => {
        // Arrange, Act
        const attach = getLabelAttach([0, 10], range);

        // Assert
        expect(attach.startsWith("s")).toBe(true);
    });

    it("flips the horizontal attach inward when the point sits on the left edge", () => {
        // Arrange, Act
        const attach = getLabelAttach([-10, 0], range);

        // Assert
        expect(attach.endsWith("e")).toBe(true);
    });

    it("flips the vertical attach inward when the point sits on the bottom edge", () => {
        // Arrange, Act
        const attach = getLabelAttach([0, -10], range);

        // Assert
        expect(attach.startsWith("n")).toBe(true);
    });

    it("flips both components inward at a corner so the label lands diagonally inside the graph", () => {
        // Arrange, Act: top-right corner. Default quadrant is NE; both
        // axes flip → SW (label sits below-and-left of the point).
        const attach = getLabelAttach([10, 10], range);

        // Assert
        expect(attach).toBe("sw");
    });

    it("does not flip when the point is just inside the edge-flip threshold (15% of range)", () => {
        // Arrange: x range is [-10, 10] → 15% from the right edge is
        // x = 8.5. A point at x = 7 is just inside that band and should
        // NOT flip.
        // Act
        const attach = getLabelAttach([7, 7], range);

        // Assert: default quadrant rule applies.
        expect(attach).toBe("ne");
    });

    it("flips when the point is just past the edge-flip threshold", () => {
        // Arrange: x = 8.6 is past the 15% threshold (8.5) for the
        // right edge, so the horizontal component flips W. y = 7 is
        // just inside the vertical threshold, so vertical stays N.
        // Act
        const attach = getLabelAttach([8.6, 7], range);

        // Assert
        expect(attach).toBe("nw");
    });
});
