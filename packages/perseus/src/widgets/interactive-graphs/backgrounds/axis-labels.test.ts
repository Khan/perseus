import {
    clampLabelPosition,
    fontSize,
    getGraphBottomMargin,
    getLabelPosition,
    getLabelTransform,
} from "./utils";

import type {GraphDimensions} from "../types";
import type {vec} from "mafs";

describe("getLabelPosition", () => {
    it("should return the correct position for the default graph", () => {
        const graphInfo: GraphDimensions = {
            range: [
                [-10, 10],
                [-10, 10],
            ],
            width: 400,
            height: 400,
        };
        const labelLocation = "onAxis";
        const expected = [
            [400, 200], // X Label at [Right edge of the graph, vertical center of the graph]
            [200, -2 * fontSize], // Y Label at [Horizontal center of the graph, 2x fontSize above the top edge]
        ];

        expect(getLabelPosition(graphInfo, labelLocation, [1, 1])).toEqual(
            expected,
        );
    });
    it("should return the correct position for the default graph without a labelLocation", () => {
        const graphInfo: GraphDimensions = {
            range: [
                [-10, 10],
                [-10, 10],
            ],
            width: 400,
            height: 400,
        };

        const expected = [
            [400, 200], // X Label at [Right edge of the graph, vertical center of the graph]
            [200, -2 * fontSize], // Y Label at [Horizontal center of the graph, 2x fontSize above the top edge]
        ];

        expect(getLabelPosition(graphInfo, undefined, [1, 1])).toEqual(
            expected,
        );
    });

    it("should return the correct position for a graph with high positive min-ranges", () => {
        const graphInfo: GraphDimensions = {
            range: [
                [6, 15],
                [6, 15],
            ],
            width: 400,
            height: 400,
        };
        const labelLocation = "onAxis";
        const expected = [
            [400, 400 + 1.25 * fontSize],
            [-1.5 * fontSize, -2 * fontSize],
        ];

        expect(getLabelPosition(graphInfo, labelLocation, [1, 1])).toEqual(
            expected,
        );
    });

    it("should return the correct position for a graph with low negative max-ranges", () => {
        const graphInfo: GraphDimensions = {
            range: [
                [-15, -6],
                [-15, -6],
            ],
            width: 400,
            height: 400,
        };
        const labelLocation = "onAxis";
        const expected = [
            [400, -2 * fontSize],
            [400 + 1.25 * fontSize, -2 * fontSize],
        ];

        expect(getLabelPosition(graphInfo, labelLocation, [1, 1])).toEqual(
            expected,
        );
    });

    it("should return the correct position for labels set to alongEdge", () => {
        const graphInfo: GraphDimensions = {
            range: [
                [-10, 10],
                [-10, 10],
            ],
            width: 400,
            height: 400,
        };
        const labelLocation = "alongEdge";
        const expected = [
            [200, 400 + fontSize * 1.5],
            [-fontSize * 1.25, 200 - fontSize],
        ];

        expect(getLabelPosition(graphInfo, labelLocation, [1, 1])).toEqual(
            expected,
        );
    });

    it("should return the correct position for labels set to alongEdge with wholly negative ranges", () => {
        const graphInfo: GraphDimensions = {
            range: [
                [-10, -5],
                [-10, -5],
            ],
            width: 400,
            height: 400,
        };
        const labelLocation = "alongEdge";
        const expected = [
            [200, 400 + fontSize * 1.5],
            [-fontSize * 1.25, 200 - fontSize],
        ];

        expect(getLabelPosition(graphInfo, labelLocation, [1, 1])).toEqual(
            expected,
        );
    });

    it("should return the correct position for labels set to alongEdge with wholly positive ranges", () => {
        const graphInfo: GraphDimensions = {
            range: [
                [5, 10],
                [5, 10],
            ],
            width: 400,
            height: 400,
        };
        const labelLocation = "alongEdge";
        const expected = [
            [200, 400 + 3 * fontSize],
            [-2.75 * fontSize, 200 - fontSize],
        ];

        expect(getLabelPosition(graphInfo, labelLocation, [1, 1])).toEqual(
            expected,
        );
    });

    it("should return the correct position for labels set to alongEdge with min ranges at 0", () => {
        // Should result in same position as the wholly positive range test
        const graphInfo: GraphDimensions = {
            range: [
                [0, 10],
                [0, 10],
            ],
            width: 400,
            height: 400,
        };
        const labelLocation = "alongEdge";
        const expected = [
            [200, 400 + 3 * fontSize],
            [-2.75 * fontSize, 200 - fontSize],
        ];

        expect(getLabelPosition(graphInfo, labelLocation, [1, 1])).toEqual(
            expected,
        );
    });
});
describe("getLabelTransform", () => {
    it("should return the correct transform for the default graph", () => {
        const expected = {
            xLabelTransform: "translate(7px, -50%)",
            yLabelTransform: "translate(-50%, 0px)",
        };

        expect(getLabelTransform(undefined)).toEqual(expected);
    });

    it("should return the correct transform for an onAxis graph", () => {
        const labelLocation = "onAxis";
        const expected = {
            xLabelTransform: "translate(7px, -50%)",
            yLabelTransform: "translate(-50%, 0px)",
        };

        expect(getLabelTransform(labelLocation)).toEqual(expected);
    });

    it("should return the correct transform for labels set to alongEdge", () => {
        const labelLocation = "alongEdge";
        const expected = {
            xLabelTransform: "translate(-50%, -50%)",
            yLabelTransform: "translate(-50%, 0px) rotate(-90deg)",
        };

        expect(getLabelTransform(labelLocation)).toEqual(expected);
    });
});

describe("clampLabelPosition", () => {
    it("should clamp the label position down to the max values", () => {
        const graphInfo: GraphDimensions = {
            range: [
                [-10, 10],
                [-10, 10],
            ],
            width: 400,
            height: 400,
        };
        const labelPosition: vec.Vector2 = [500, 500];
        const expected = [400 + fontSize * 1.25, 400 + fontSize * 1.25];

        expect(clampLabelPosition(labelPosition, graphInfo)).toEqual(expected);
    });
    it("should clamp the label position up to the min values", () => {
        const graphInfo: GraphDimensions = {
            range: [
                [-10, 10],
                [-10, 10],
            ],
            width: 400,
            height: 400,
        };
        const labelPosition: vec.Vector2 = [-500, -500];
        const expected = [-fontSize * 1.5, -fontSize * 2];

        expect(clampLabelPosition(labelPosition, graphInfo)).toEqual(expected);
    });
});

describe("getGraphBottomMargin", () => {
    it("returns the base margin when the x-axis label is within the graph area", () => {
        // Label Y = 200 (center of a 400px graph), well within bounds
        expect(getGraphBottomMargin(200, 400, true, true)).toBe(30);
    });

    it("returns the base margin when y-range starts at 0 (onAxis, small overflow)", () => {
        // For range [0, N], onAxis label is at Y = height (400).
        // Overflow = 400 + fontSize - 400 = 14, result = max(30, 14) = 30
        // The 30px base margin already covers this small overflow.
        expect(getGraphBottomMargin(400, 400, true, true)).toBe(30);
    });

    it("returns increased margin for wholly positive y-range (onAxis, clamped label)", () => {
        // For range [6, 15] onAxis, the label is clamped to
        // Y = height + fontSize * 1.25 = 417.5
        // Overflow = 417.5 + 14 - 400 = 31.5, result = max(30, 31.5) = 31.5
        // The margin just clears the label; the paragraph's own 22px top
        // margin then provides the visual gap.
        const clampedY = 400 + fontSize * 1.25;
        const overflow = clampedY + fontSize - 400;
        expect(getGraphBottomMargin(clampedY, 400, true, true)).toBe(overflow);
    });

    it("returns increased margin for alongEdge labels with y-range starting at 0", () => {
        // For alongEdge with yMin >= 0, the label is at Y = height + 3 * fontSize = 442
        // Overflow = 442 + 14 - 400 = 56, result = max(30, 56) = 56
        const alongEdgeY = 400 + 3 * fontSize;
        const overflow = alongEdgeY + fontSize - 400;
        expect(getGraphBottomMargin(alongEdgeY, 400, true, true)).toBe(
            overflow,
        );
    });

    it("returns the base margin when there is no x-axis label", () => {
        // Even with a label position below the graph, no x-axis label
        // means no extra margin needed
        expect(getGraphBottomMargin(500, 400, false, true)).toBe(30);
    });

    it("returns the base margin when axis labels are not shown", () => {
        // Even with a label position below the graph, if labels
        // aren't shown (markings = "none"), no extra margin needed
        expect(getGraphBottomMargin(500, 400, true, false)).toBe(30);
    });

    it("returns the base margin for negative y-range where label is within bounds", () => {
        // For range [-10, 10], the label Y = 200 (well within the 400px graph)
        expect(getGraphBottomMargin(200, 400, true, true)).toBe(30);
    });
});
