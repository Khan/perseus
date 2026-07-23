import {mockStrings} from "../../../../strings";

import {getAnnouncementText} from "./announcement";

describe("getAnnouncementText", () => {
    describe("move-point", () => {
        it("returns the correct string with a numeric default label", () => {
            const result = getAnnouncementText(
                {type: "move-point", pointLabel: "1", x: 3, y: 5},
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 1 at 3 comma 5.");
        });

        it("returns the correct string with a custom pointLabel", () => {
            const result = getAnnouncementText(
                {type: "move-point", pointLabel: "T", x: 3, y: 5},
                mockStrings,
                "en",
            );

            expect(result).toBe("Point T at 3 comma 5.");
        });
    });

    describe("move-radius-point", () => {
        it("returns the correct string when point is to the right", () => {
            const result = getAnnouncementText(
                {
                    type: "move-radius-point",
                    x: 2,
                    y: 0,
                    centerX: 0,
                    radius: 2,
                    pointLabel: undefined,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Right radius endpoint at 2 comma 0. Circle radius is 2.",
            );
        });

        it("returns the correct string when point is to the left", () => {
            const result = getAnnouncementText(
                {
                    type: "move-radius-point",
                    x: -2,
                    y: 0,
                    centerX: 0,
                    radius: 2,
                    pointLabel: undefined,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Left radius endpoint at -2 comma 0. Circle radius is 2.",
            );
        });
    });

    describe("move-center", () => {
        it("returns the correct string", () => {
            const result = getAnnouncementText(
                {type: "move-center", x: 3, y: 4},
                mockStrings,
                "en",
            );

            expect(result).toBe("Circle. The center point is at 3 comma 4.");
        });
    });

    describe("move-polygon", () => {
        it("returns a polygon summary string with each vertex", () => {
            const result = getAnnouncementText(
                {
                    type: "move-polygon",
                    coords: [
                        [0, 0],
                        [3, 0],
                        [3, 4],
                    ],
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "A polygon with 3 points. Point 1 at 0 comma 0. Point 2 at 3 comma 0. Point 3 at 3 comma 4.",
            );
        });

        it("uses the singular polygon label when the polygon has one vertex", () => {
            const result = getAnnouncementText(
                {type: "move-polygon", coords: [[1, 2]]},
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "A polygon with 1 point. Point 1 at 1 comma 2.",
            );
        });

        it("announces each vertex by its custom label, falling back to the numeric default for empty slots", () => {
            const result = getAnnouncementText(
                {
                    type: "move-polygon",
                    coords: [
                        [0, 0],
                        [3, 0],
                        [3, 4],
                    ],
                    pointLabels: ["A", "", "C"],
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "A polygon with 3 points. Point A at 0 comma 0. Point 2 at 3 comma 0. Point C at 3 comma 4.",
            );
        });
    });

    describe("move-sinusoid-point", () => {
        // Coord layout: [root(0), peak(1)]. The root always uses the
        // root label; the peak uses max/min/flat based on its y vs the
        // root's y (passed in as otherY).
        it("uses the root label for index 0", () => {
            const result = getAnnouncementText(
                {
                    type: "move-sinusoid-point",
                    pointIndex: 0,
                    pointLabel: undefined,
                    x: 1,
                    y: 1,
                    otherY: 3,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Midline intersection at 1 comma 1.");
        });

        it("uses the max-point label for the peak when y is above the root", () => {
            const result = getAnnouncementText(
                {
                    type: "move-sinusoid-point",
                    pointIndex: 1,
                    pointLabel: undefined,
                    x: 2,
                    y: 3,
                    otherY: 0,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Maximum point at 2 comma 3.");
        });

        it("uses the min-point label for the peak when y is below the root", () => {
            const result = getAnnouncementText(
                {
                    type: "move-sinusoid-point",
                    pointIndex: 1,
                    pointLabel: undefined,
                    x: 2,
                    y: -3,
                    otherY: 0,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Minimum point at 2 comma -3.");
        });

        it("uses the flat-point label for the peak when y equals the root's y", () => {
            const result = getAnnouncementText(
                {
                    type: "move-sinusoid-point",
                    pointIndex: 1,
                    pointLabel: undefined,
                    x: 2,
                    y: 0,
                    otherY: 0,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Line through point at 2 comma 0.");
        });

        it("uses the custom label with the root/peak wording when one is set", () => {
            const result = getAnnouncementText(
                {
                    type: "move-sinusoid-point",
                    pointIndex: 0,
                    pointLabel: "T",
                    x: 1,
                    y: 1,
                    otherY: 3,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Midline intersection point T at 1 comma 1.");
        });
    });

    describe("move-logarithm-point", () => {
        // Coord layout: [point1(0), point2(1)], each with its own label.
        it("uses the point-1 label for index 0", () => {
            const result = getAnnouncementText(
                {
                    type: "move-logarithm-point",
                    pointIndex: 0,
                    pointLabel: undefined,
                    x: -3,
                    y: -2,
                    hasCurve: true,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point 1 on a logarithmic curve at -3 comma -2.",
            );
        });

        it("uses the point-2 label for index 1", () => {
            const result = getAnnouncementText(
                {
                    type: "move-logarithm-point",
                    pointIndex: 1,
                    pointLabel: undefined,
                    x: 4,
                    y: 5,
                    hasCurve: true,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 2 on a logarithmic curve at 4 comma 5.");
        });

        it("drops the curve phrasing when no curve is plotted", () => {
            const result = getAnnouncementText(
                {
                    type: "move-logarithm-point",
                    pointIndex: 0,
                    pointLabel: undefined,
                    x: -3,
                    y: -2,
                    hasCurve: false,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 1 at -3 comma -2.");
        });

        it("uses the custom label with the point-1/point-2 wording when one is set", () => {
            const result = getAnnouncementText(
                {
                    type: "move-logarithm-point",
                    pointIndex: 0,
                    pointLabel: "A",
                    x: -3,
                    y: -2,
                    hasCurve: true,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point A on a logarithmic curve at -3 comma -2.",
            );
        });
    });

    describe("move-logarithm-asymptote", () => {
        it("returns the vertical-asymptote label at the new x", () => {
            const result = getAnnouncementText(
                {type: "move-logarithm-asymptote", asymptoteX: -8},
                mockStrings,
                "en",
            );

            expect(result).toBe("Vertical asymptote at x equals -8.");
        });
    });

    describe("move-absolute-value-point", () => {
        // Coord layout: [vertex(0), arm point(1)]. The vertex uses the
        // vertex label; the arm point uses the second-point label.
        it("uses the vertex label without the slope", () => {
            const result = getAnnouncementText(
                {
                    type: "move-absolute-value-point",
                    pointIndex: 0,
                    pointLabel: undefined,
                    x: -3,
                    y: 1,
                    slope: 2,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Vertex point at -3 comma 1.");
        });

        it("uses the arm-point label with the slope", () => {
            const result = getAnnouncementText(
                {
                    type: "move-absolute-value-point",
                    pointIndex: 1,
                    pointLabel: undefined,
                    x: 4,
                    y: -2,
                    slope: 2,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Point on arm at 4 comma -2. The slope is 2.");
        });

        it("uses the custom label with the vertex wording when one is set", () => {
            const result = getAnnouncementText(
                {
                    type: "move-absolute-value-point",
                    pointIndex: 0,
                    pointLabel: "V",
                    x: -3,
                    y: 1,
                    slope: 2,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Vertex point V at -3 comma 1.");
        });

        it("uses the custom label with the arm wording, keeping the slope", () => {
            const result = getAnnouncementText(
                {
                    type: "move-absolute-value-point",
                    pointIndex: 1,
                    pointLabel: "V",
                    x: 4,
                    y: -2,
                    slope: 2,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point V on arm at 4 comma -2. The slope is 2.",
            );
        });
    });

    describe("move-tangent-point", () => {
        // Coord layout: [inflection(0), second/control point(1)]. The
        // inflection point uses the inflection label; the second point uses
        // the control-point label.
        it("uses the inflection-point label for index 0", () => {
            const result = getAnnouncementText(
                {
                    type: "move-tangent-point",
                    pointIndex: 0,
                    pointLabel: undefined,
                    x: -3,
                    y: 1,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Inflection point at -3 comma 1.");
        });

        it("uses the control-point label for index 1", () => {
            const result = getAnnouncementText(
                {
                    type: "move-tangent-point",
                    pointIndex: 1,
                    pointLabel: undefined,
                    x: 4,
                    y: -2,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Control point at 4 comma -2.");
        });

        it("uses the custom label with the inflection/control-point wording when one is set", () => {
            const result = getAnnouncementText(
                {
                    type: "move-tangent-point",
                    pointIndex: 0,
                    pointLabel: "I",
                    x: -3,
                    y: 1,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Inflection point I at -3 comma 1.");
        });
    });

    describe("move-exponential-point", () => {
        // Coord layout: [point1(0), point2(1)], each with its own label.
        it("uses the point-1 label for index 0", () => {
            const result = getAnnouncementText(
                {
                    type: "move-exponential-point",
                    pointIndex: 0,
                    pointLabel: undefined,
                    x: -1,
                    y: 4,
                    hasCurve: true,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point 1 on an exponential curve at -1 comma 4.",
            );
        });

        it("uses the point-2 label for index 1", () => {
            const result = getAnnouncementText(
                {
                    type: "move-exponential-point",
                    pointIndex: 1,
                    pointLabel: undefined,
                    x: 3,
                    y: 7,
                    hasCurve: true,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point 2 on an exponential curve at 3 comma 7.",
            );
        });

        it("drops the curve phrasing when no curve is plotted", () => {
            const result = getAnnouncementText(
                {
                    type: "move-exponential-point",
                    pointIndex: 0,
                    pointLabel: undefined,
                    x: -1,
                    y: 4,
                    hasCurve: false,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 1 at -1 comma 4.");
        });

        it("uses the custom label with the point-1/point-2 wording when one is set", () => {
            const result = getAnnouncementText(
                {
                    type: "move-exponential-point",
                    pointIndex: 0,
                    pointLabel: "A",
                    x: -1,
                    y: 4,
                    hasCurve: true,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point A on an exponential curve at -1 comma 4.",
            );
        });
    });

    describe("move-exponential-asymptote", () => {
        it("returns the horizontal-asymptote label at the new y", () => {
            const result = getAnnouncementText(
                {type: "move-exponential-asymptote", asymptoteY: -2},
                mockStrings,
                "en",
            );

            expect(result).toBe("Horizontal asymptote at y equals -2");
        });
    });

    describe("move-angle-point", () => {
        // Coord layout: [endingSide(0), vertex(1), startingSide(2)]. The
        // side labels include their coords; the vertex also includes the
        // measured angle.
        it("uses the ending-side label for index 0", () => {
            const result = getAnnouncementText(
                {
                    type: "move-angle-point",
                    pointIndex: 0,
                    pointLabel: undefined,
                    x: 2,
                    y: 0,
                    angleMeasure: 90,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 1, ending side at 2 comma 0.");
        });

        it("uses the vertex label with angle measure for index 1", () => {
            const result = getAnnouncementText(
                {
                    type: "move-angle-point",
                    pointIndex: 1,
                    pointLabel: undefined,
                    x: 0,
                    y: 0,
                    angleMeasure: 90,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point 2, vertex at 0 comma 0. Angle 90 degrees.",
            );
        });

        it("uses the starting-side label for index 2", () => {
            const result = getAnnouncementText(
                {
                    type: "move-angle-point",
                    pointIndex: 2,
                    pointLabel: undefined,
                    x: 0,
                    y: 2,
                    angleMeasure: 90,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 3, starting side at 0 comma 2.");
        });

        it("uses the custom label with the side wording when one is set", () => {
            const result = getAnnouncementText(
                {
                    type: "move-angle-point",
                    pointIndex: 0,
                    pointLabel: "T",
                    x: 2,
                    y: 0,
                    angleMeasure: 90,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Point T, ending side at 2 comma 0.");
        });

        it("uses the custom label with the vertex wording, keeping the angle measure", () => {
            const result = getAnnouncementText(
                {
                    type: "move-angle-point",
                    pointIndex: 1,
                    pointLabel: "V",
                    x: 0,
                    y: 0,
                    angleMeasure: 90,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point V, vertex at 0 comma 0. Angle 90 degrees.",
            );
        });
    });

    describe("move-quadratic-point", () => {
        // Composes the point label (quadrant-aware) with the vertex
        // string when a vertex exists; vertex is undefined when the
        // parabola degenerates to a line.
        it("uses the point-quadrant label and appends the vertex string for a quadrant vertex", () => {
            const result = getAnnouncementText(
                {
                    type: "move-quadratic-point",
                    pointIndex: 0,
                    pointLabel: undefined,
                    x: -2,
                    y: 4,
                    vertex: [1, -1],
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point 1 on parabola in quadrant 2 at -2 comma 4. Vertex is in quadrant 4.",
            );
        });

        it("uses the point-axis label when the moved point lies on an axis", () => {
            const result = getAnnouncementText(
                {
                    type: "move-quadratic-point",
                    pointIndex: 1,
                    pointLabel: undefined,
                    x: 3,
                    y: 0,
                    vertex: [0, 0],
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point 2 on parabola at 3 comma 0. Vertex is at the origin.",
            );
        });

        it("uses the point-origin label when the moved point is at the origin", () => {
            const result = getAnnouncementText(
                {
                    type: "move-quadratic-point",
                    pointIndex: 2,
                    pointLabel: undefined,
                    x: 0,
                    y: 0,
                    vertex: [0, 2],
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point 3 on parabola at the origin. Vertex is on the Y-axis.",
            );
        });

        it("omits the vertex string when the parabola degenerates to a line", () => {
            const result = getAnnouncementText(
                {
                    type: "move-quadratic-point",
                    pointIndex: 0,
                    pointLabel: undefined,
                    x: -2,
                    y: -2,
                    vertex: undefined,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point 1 on parabola in quadrant 3 at -2 comma -2.",
            );
        });

        it("uses the custom label with the quadrant wording, keeping the vertex string, when one is set", () => {
            const result = getAnnouncementText(
                {
                    type: "move-quadratic-point",
                    pointIndex: 0,
                    pointLabel: "A",
                    x: -2,
                    y: 4,
                    vertex: [1, -1],
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point A on parabola in quadrant 2 at -2 comma 4. Vertex is in quadrant 4.",
            );
        });
    });

    describe("move-linear-line", () => {
        it("returns the grab-handle label", () => {
            const result = getAnnouncementText(
                {
                    type: "move-linear-line",
                    coords: [
                        [-3, 3],
                        [-1, 5],
                    ],
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Line going through point -3 comma 3 and point -1 comma 5.",
            );
        });
    });

    describe("move-ray-point", () => {
        it("returns the endpoint label at index 0", () => {
            const result = getAnnouncementText(
                {
                    type: "move-ray-point",
                    pointIndex: 0,
                    pointLabel: undefined,
                    x: -3,
                    y: 2,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Endpoint at -3 comma 2.");
        });

        it("returns the terminal-point label at index 1", () => {
            const result = getAnnouncementText(
                {
                    type: "move-ray-point",
                    pointIndex: 1,
                    pointLabel: undefined,
                    x: 5,
                    y: 6,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Through point at 5 comma 6.");
        });

        it("uses the custom label with the endpoint/through-point wording when one is set", () => {
            const result = getAnnouncementText(
                {
                    type: "move-ray-point",
                    pointIndex: 0,
                    pointLabel: "T",
                    x: -3,
                    y: 2,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Endpoint T at -3 comma 2.");
        });
    });

    describe("move-ray-line", () => {
        it("returns the grab-handle label", () => {
            const result = getAnnouncementText(
                {
                    type: "move-ray-line",
                    coords: [
                        [-3, 3],
                        [2, 8],
                    ],
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Ray with endpoint -3 comma 3 going through point 2 comma 8.",
            );
        });
    });

    describe("move-vector-point", () => {
        it("returns the generic point label at the tail (index 0)", () => {
            const result = getAnnouncementText(
                {type: "move-vector-point", pointIndex: 0, x: -1, y: 2},
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 1 at -1 comma 2.");
        });

        it("returns the head label at the head (index 1)", () => {
            const result = getAnnouncementText(
                {type: "move-vector-point", pointIndex: 1, x: 5, y: 6},
                mockStrings,
                "en",
            );

            expect(result).toBe("Vector head at 5 comma 6.");
        });
    });

    describe("move-vector-line", () => {
        it("returns the grab-handle label", () => {
            const result = getAnnouncementText(
                {
                    type: "move-vector-line",
                    coords: [
                        [2, 1],
                        [5, 5],
                    ],
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Vector from 2 comma 1 to 5 comma 5.");
        });
    });

    describe("move-linear-system-point", () => {
        it("includes the line number", () => {
            const result = getAnnouncementText(
                {
                    type: "move-linear-system-point",
                    lineIndex: 1,
                    pointIndex: 0,
                    pointLabel: undefined,
                    x: -3,
                    y: 2,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 1 on line 2 at -3 comma 2.");
        });

        it("uses the custom label with the line/point wording when one is set", () => {
            const result = getAnnouncementText(
                {
                    type: "move-linear-system-point",
                    lineIndex: 1,
                    pointIndex: 0,
                    pointLabel: "C",
                    x: -3,
                    y: 2,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Point C on line 2 at -3 comma 2.");
        });
    });

    describe("move-linear-system-line", () => {
        it("returns the grab-handle label", () => {
            const result = getAnnouncementText(
                {
                    type: "move-linear-system-line",
                    lineIndex: 1,
                    coords: [
                        [-3, -4],
                        [7, -4],
                    ],
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Line 2 going through point -3 comma -4 and point 7 comma -4.",
            );
        });
    });

    describe("move-segment-point", () => {
        it("uses the single-segment endpoint label when there is one segment", () => {
            const result = getAnnouncementText(
                {
                    type: "move-segment-point",
                    segmentIndex: 0,
                    pointIndex: 0,
                    pointLabel: undefined,
                    x: -3,
                    y: 2,
                    totalSegments: 1,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Endpoint 1 at -3 comma 2.");
        });

        it("includes the segment number when there are multiple segments", () => {
            const result = getAnnouncementText(
                {
                    type: "move-segment-point",
                    segmentIndex: 1,
                    pointIndex: 0,
                    pointLabel: undefined,
                    x: -3,
                    y: 2,
                    totalSegments: 2,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Endpoint 1 on segment 2 at -3 comma 2.");
        });

        it("uses the custom label with the endpoint wording when one is set", () => {
            const result = getAnnouncementText(
                {
                    type: "move-segment-point",
                    segmentIndex: 1,
                    pointIndex: 0,
                    pointLabel: "C",
                    x: -3,
                    y: 2,
                    totalSegments: 2,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Endpoint C on segment 2 at -3 comma 2.");
        });
    });

    describe("move-segment-line", () => {
        it("returns the grab-handle label", () => {
            const result = getAnnouncementText(
                {
                    type: "move-segment-line",
                    coords: [
                        [6, -1],
                        [8, 1],
                    ],
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Segment from 6 comma -1 to 8 comma 1.");
        });
    });

    it("throws an UnreachableCaseError for an unhandled announcement type", () => {
        expect(() =>
            getAnnouncementText(
                // @ts-expect-error - deliberately passing an unhandled type
                {type: "unhandled-type"},
                mockStrings,
                "en",
            ),
        ).toThrow("Unhandled case");
    });
});
