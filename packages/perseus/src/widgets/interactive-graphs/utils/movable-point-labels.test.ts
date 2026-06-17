import {getLabelAttach, getMovablePointLabels} from "./movable-point-labels";

import type {
    AbsoluteValueGraphState,
    AngleGraphState,
    CircleGraphState,
    ExponentialGraphState,
    InteractiveGraphState,
    LinearGraphState,
    LinearSystemGraphState,
    LogarithmGraphState,
    PointGraphState,
    PolygonGraphState,
    QuadraticGraphState,
    SegmentGraphState,
    SinusoidGraphState,
    TangentGraphState,
} from "../types";

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

describe("getMovablePointLabels", () => {
    it("returns [] when showPointLabels is absent, even if pointLabels is set", () => {
        // In production, content can set `pointLabels` to drive
        // screen-reader announcements without opting into visible
        // labels. That data shape must return [].
        // Arrange
        const state = pointState({
            coords: [
                [1, 2],
                [3, 4],
            ],
            pointLabels: ["A", "B"],
        });

        // Act, Assert
        expect(getMovablePointLabels(state)).toEqual([]);
    });

    it("returns [] when showPointLabels is true but pointLabels is undefined", () => {
        // Arrange
        const state = pointState({
            coords: [[1, 2]],
            showPointLabels: true,
        });

        // Act, Assert: missing labels stay missing.
        expect(getMovablePointLabels(state)).toEqual([]);
    });

    it("skips missing or empty entries", () => {
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
        expect(getMovablePointLabels(state)).toEqual([
            {key: "point-0", coord: [1, 2], text: "A"},
        ]);
    });

    it("maps angle coords to labels by index", () => {
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
        expect(getMovablePointLabels(state)).toEqual([
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
        expect(getMovablePointLabels(state)).toEqual([
            {key: "circle-radius", coord: [3, 0], text: "R"},
        ]);
    });

    it("flattens linear-system coords across every endpoint", () => {
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
        const result = getMovablePointLabels(state);

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
        expect(getMovablePointLabels(state).map((r) => r.text)).toEqual([
            "a",
            "b",
            "c",
            "d",
        ]);
    });

    it("maps linear, ray, and sinusoid coords to labels by index", () => {
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
        expect(getMovablePointLabels(linear).map((r) => r.text)).toEqual([
            "s",
            "e",
        ]);
        expect(getMovablePointLabels(sinusoid).map((r) => r.text)).toEqual([
            "root",
            "peak",
        ]);
    });

    it("maps polygon coords to labels by index", () => {
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
        expect(getMovablePointLabels(state).map((r) => r.text)).toEqual([
            "P",
            "Q",
            "R",
        ]);
    });

    it("maps quadratic coords to labels by index", () => {
        // Arrange
        const state: QuadraticGraphState = {
            ...baseCommon,
            type: "quadratic",
            coords: [
                [-3, 2],
                [0, -2],
                [3, 2],
            ],
            showPointLabels: true,
            pointLabels: ["L", "V", "R"],
        };

        // Act, Assert
        expect(getMovablePointLabels(state)).toEqual([
            {key: "quadratic-0", coord: [-3, 2], text: "L"},
            {key: "quadratic-1", coord: [0, -2], text: "V"},
            {key: "quadratic-2", coord: [3, 2], text: "R"},
        ]);
    });

    it("maps absolute-value coords to labels by index", () => {
        // Arrange
        const state: AbsoluteValueGraphState = {
            ...baseCommon,
            type: "absolute-value",
            coords: [
                [0, 0],
                [3, 3],
            ],
            showPointLabels: true,
            pointLabels: ["V", "P"],
        };

        // Act, Assert
        expect(getMovablePointLabels(state)).toEqual([
            {key: "absolute-value-0", coord: [0, 0], text: "V"},
            {key: "absolute-value-1", coord: [3, 3], text: "P"},
        ]);
    });

    it("maps tangent coords to labels by index", () => {
        // Arrange
        const state: TangentGraphState = {
            ...baseCommon,
            type: "tangent",
            coords: [
                [0, 0],
                [1, 1],
            ],
            showPointLabels: true,
            pointLabels: ["I", "Q"],
        };

        // Act, Assert
        expect(getMovablePointLabels(state).map((r) => r.text)).toEqual([
            "I",
            "Q",
        ]);
    });

    it("maps exponential coords to labels by index (asymptote is not labeled)", () => {
        // Arrange
        const state: ExponentialGraphState = {
            ...baseCommon,
            type: "exponential",
            coords: [
                [0, 1],
                [1, 2],
            ],
            asymptote: 0,
            showPointLabels: true,
            pointLabels: ["A", "B"],
        };

        // Act, Assert
        expect(getMovablePointLabels(state).map((r) => r.text)).toEqual([
            "A",
            "B",
        ]);
    });

    it("maps logarithm coords to labels by index (asymptote is not labeled)", () => {
        // Arrange
        const state: LogarithmGraphState = {
            ...baseCommon,
            type: "logarithm",
            coords: [
                [1, 0],
                [2, 1],
            ],
            asymptote: 0,
            showPointLabels: true,
            pointLabels: ["A", "B"],
        };

        // Act, Assert
        expect(getMovablePointLabels(state).map((r) => r.text)).toEqual([
            "A",
            "B",
        ]);
    });
});

describe("getLabelAttach", () => {
    // Range centered at (0, 0): [[-10, 10], [-10, 10]]
    const range: InteractiveGraphState["range"] = [
        [-10, 10],
        [-10, 10],
    ];

    it("attaches NE for upper-right points", () => {
        expect(getLabelAttach([5, 5], range)).toBe("ne");
        expect(getLabelAttach([1, 1], range)).toBe("ne");
    });

    it("attaches NW for upper-left points", () => {
        expect(getLabelAttach([-5, 5], range)).toBe("nw");
    });

    it("attaches SW for lower-left points", () => {
        expect(getLabelAttach([-5, -5], range)).toBe("sw");
    });

    it("attaches SE for lower-right points", () => {
        expect(getLabelAttach([5, -5], range)).toBe("se");
    });

    it("shifts horizontally inward when the point is near the right edge", () => {
        expect(getLabelAttach([10, 0], range).endsWith("w")).toBe(true);
    });

    it("shifts vertically inward when the point is near the top edge", () => {
        expect(getLabelAttach([0, 10], range).startsWith("s")).toBe(true);
    });

    it("shifts horizontally inward when the point is near the left edge", () => {
        expect(getLabelAttach([-10, 0], range).endsWith("e")).toBe(true);
    });

    it("shifts vertically inward when the point is near the bottom edge", () => {
        expect(getLabelAttach([0, -10], range).startsWith("n")).toBe(true);
    });

    it("shifts both axes inward when the point is in a corner", () => {
        // Top-right corner: NE quadrant shifts on both axes → SW.
        expect(getLabelAttach([10, 10], range)).toBe("sw");
    });

    it("does not shift when the point is just inside the 15% edge threshold", () => {
        // Range is [-10, 10] → 15% from the right edge is x = 8.5.
        // x = 7 is inside that band, so no shift.
        expect(getLabelAttach([7, 7], range)).toBe("ne");
    });

    it("shifts when the point is just past the 15% edge threshold", () => {
        // x = 8.6 is past 8.5 → horizontal shifts W. y = 7 is inside
        // the vertical threshold → vertical stays N.
        expect(getLabelAttach([8.6, 7], range)).toBe("nw");
    });
});
