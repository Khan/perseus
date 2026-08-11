import {mockPerseusI18nContext} from "../../../../components/i18n-context";

import {describeLinearSystemGraph} from "./linear-system";

import type {InteractiveGraphState} from "../../types";

const baseLinearSystemState: InteractiveGraphState = {
    type: "linear-system",
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
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

describe("describeLinearSystemGraph", () => {
    it("describes a default linear system graph", () => {
        // Arrange, Act
        const linearSystemGraphDescription = describeLinearSystemGraph(
            baseLinearSystemState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(
            linearSystemGraphDescription.srLinearSystemInteractiveElements,
        ).toEqual(
            "Interactive elements: Two lines on a coordinate plane. Line 1 has two points, point 1 at -5 comma 5 and point 2 at 5 comma 5. Line 2 has two points, point 1 at -5 comma -5 and point 2 at 5 comma -5.",
        );
    });

    it("describes a linear system graph with updated points", () => {
        // Arrange, Act
        const linearSystemGraphDescription = describeLinearSystemGraph(
            {
                ...baseLinearSystemState,
                coords: [
                    [
                        [-2, 3],
                        [3, 3],
                    ],
                    [
                        [-2, -3],
                        [3, -3],
                    ],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(
            linearSystemGraphDescription.srLinearSystemInteractiveElements,
        ).toEqual(
            "Interactive elements: Two lines on a coordinate plane. Line 1 has two points, point 1 at -2 comma 3 and point 2 at 3 comma 3. Line 2 has two points, point 1 at -2 comma -3 and point 2 at 3 comma -3.",
        );
    });

    it("returns the whole-graph aria-label", () => {
        // Arrange, Act
        const {srLinearSystemGraph} = describeLinearSystemGraph(
            baseLinearSystemState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(srLinearSystemGraph).toEqual("Two lines on a coordinate plane.");
    });

    it("returns aria strings for each line", () => {
        // Arrange, Act
        const {srLines} = describeLinearSystemGraph(
            baseLinearSystemState,
            mockPerseusI18nContext,
        );

        // Assert — both horizontal lines: y-intercept only, zero slope.
        expect(srLines).toEqual([
            {
                point1AriaLabel: "Point 1 on line 1 at -5 comma 5.",
                point2AriaLabel: "Point 2 on line 1 at 5 comma 5.",
                grabHandleAriaLabel:
                    "Line 1 going through point -5 comma 5 and point 5 comma 5.",
                pointsDescription:
                    "Line 1 has two points, point 1 at -5 comma 5 and point 2 at 5 comma 5.",
                interceptDescription:
                    "The line crosses the Y-axis at 0 comma 5.",
                slopeDescription: "Its slope is zero.",
            },
            {
                point1AriaLabel: "Point 1 on line 2 at -5 comma -5.",
                point2AriaLabel: "Point 2 on line 2 at 5 comma -5.",
                grabHandleAriaLabel:
                    "Line 2 going through point -5 comma -5 and point 5 comma -5.",
                pointsDescription:
                    "Line 2 has two points, point 1 at -5 comma -5 and point 2 at 5 comma -5.",
                interceptDescription:
                    "The line crosses the Y-axis at 0 comma -5.",
                slopeDescription: "Its slope is zero.",
            },
        ]);
    });

    it("describes the intersection point when the lines intersect", () => {
        // Arrange, Act — y = x and y = -x cross at the origin.
        const {srIntersectionDescription} = describeLinearSystemGraph(
            {
                ...baseLinearSystemState,
                coords: [
                    [
                        [-5, -5],
                        [5, 5],
                    ],
                    [
                        [-5, 5],
                        [5, -5],
                    ],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(srIntersectionDescription).toEqual(
            "Line 1 and line 2 intersect at point 0 comma 0.",
        );
    });

    it("describes parallel lines that never intersect", () => {
        // Arrange, Act — the base state's lines are both horizontal.
        const {srIntersectionDescription} = describeLinearSystemGraph(
            baseLinearSystemState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(srIntersectionDescription).toEqual(
            "Line 1 and line 2 are parallel.",
        );
    });

    it("weaves custom pointLabels into each point's aria-label", () => {
        // Arrange, Act — pointLabels is flat across both lines:
        // [line0Start, line0End, line1Start, line1End].
        const {srLines} = describeLinearSystemGraph(
            {
                ...baseLinearSystemState,
                pointLabels: ["A", "B", "C", "D"],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(srLines[0].point1AriaLabel).toEqual(
            "Point A on line 1 at -5 comma 5.",
        );
        expect(srLines[0].point2AriaLabel).toEqual(
            "Point B on line 1 at 5 comma 5.",
        );
        expect(srLines[1].point1AriaLabel).toEqual(
            "Point C on line 2 at -5 comma -5.",
        );
        expect(srLines[1].point2AriaLabel).toEqual(
            "Point D on line 2 at 5 comma -5.",
        );
    });

    it("falls back to the within-line point number for missing and empty-string labels", () => {
        // Arrange, Act — only line 1's start point is named; line 1's end
        // point is an explicit empty string and line 2 has no entries.
        const {srLines} = describeLinearSystemGraph(
            {
                ...baseLinearSystemState,
                pointLabels: ["A", ""],
            },
            mockPerseusI18nContext,
        );

        // Assert — the numeric fallback restarts at 1 for each line.
        expect(srLines[0].point1AriaLabel).toEqual(
            "Point A on line 1 at -5 comma 5.",
        );
        expect(srLines[0].point2AriaLabel).toEqual(
            "Point 2 on line 1 at 5 comma 5.",
        );
        expect(srLines[1].point1AriaLabel).toEqual(
            "Point 1 on line 2 at -5 comma -5.",
        );
        expect(srLines[1].point2AriaLabel).toEqual(
            "Point 2 on line 2 at 5 comma -5.",
        );
    });
});
