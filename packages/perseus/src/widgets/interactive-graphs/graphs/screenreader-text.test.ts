import {mockStrings} from "../../../strings";

import {
    getAnnouncementText,
    getPiMultiple,
    srCircleCenterLabel,
    srCircleRadiusPointLabel,
    srFormatNumber,
} from "./screenreader-text";

describe("getAnnouncementText", () => {
    it("returns the correct string for a move-point announcement", () => {
        const result = getAnnouncementText(
            {type: "move-point", pointIndex: 0, x: 3, y: 5},
            mockStrings,
            "en",
        );

        expect(result).toBe("Point 1 at 3 comma 5.");
    });

    it("returns the correct string for a move-radius-point announcement when point is to the right", () => {
        const result = getAnnouncementText(
            {type: "move-radius-point", x: 2, y: 0, centerX: 0, radius: 2},
            mockStrings,
            "en",
        );

        expect(result).toBe(
            "Right radius endpoint at 2 comma 0. Circle radius is 2.",
        );
    });

    it("returns the correct string for a move-radius-point announcement when point is to the left", () => {
        const result = getAnnouncementText(
            {type: "move-radius-point", x: -2, y: 0, centerX: 0, radius: 2},
            mockStrings,
            "en",
        );

        expect(result).toBe(
            "Left radius endpoint at -2 comma 0. Circle radius is 2.",
        );
    });

    it("returns the correct string for a move-center announcement", () => {
        const result = getAnnouncementText(
            {type: "move-center", x: 3, y: 4},
            mockStrings,
            "en",
        );

        expect(result).toBe("Circle. The center point is at 3 comma 4.");
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

    describe("angle announcements", () => {
        // Coord layout: [endingSide(0), vertex(1), startingSide(2)]. The
        // ending side and starting side labels include their coords; the
        // vertex also includes the measured angle.
        it("uses the ending-side label for index 0", () => {
            const result = getAnnouncementText(
                {
                    type: "move-angle-point",
                    pointIndex: 0,
                    x: 2,
                    y: 0,
                    angleMeasure: 90,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 2, ending side at 2 comma 0.");
        });

        it("uses the vertex label with angle measure for index 1", () => {
            const result = getAnnouncementText(
                {
                    type: "move-angle-point",
                    pointIndex: 1,
                    x: 0,
                    y: 0,
                    angleMeasure: 90,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point 1, vertex at 0 comma 0. Angle 90 degrees.",
            );
        });

        it("uses the starting-side label for index 2", () => {
            const result = getAnnouncementText(
                {
                    type: "move-angle-point",
                    pointIndex: 2,
                    x: 0,
                    y: 2,
                    angleMeasure: 90,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 3, starting side at 0 comma 2.");
        });
    });

    describe("sinusoid announcements", () => {
        it("uses the root label for index 0", () => {
            const result = getAnnouncementText(
                {
                    type: "move-sinusoid-point",
                    pointIndex: 0,
                    x: 0,
                    y: 0,
                    rootY: 0,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Midline intersection at 0 comma 0.");
        });

        it("uses the max label when peak is above the root", () => {
            const result = getAnnouncementText(
                {
                    type: "move-sinusoid-point",
                    pointIndex: 1,
                    x: 1,
                    y: 2,
                    rootY: 0,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Maximum point at 1 comma 2.");
        });

        it("uses the min label when peak is below the root", () => {
            const result = getAnnouncementText(
                {
                    type: "move-sinusoid-point",
                    pointIndex: 1,
                    x: 1,
                    y: -2,
                    rootY: 0,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Minimum point at 1 comma -2.");
        });

        it("uses the flat label when peak matches the root's y", () => {
            const result = getAnnouncementText(
                {
                    type: "move-sinusoid-point",
                    pointIndex: 1,
                    x: 1,
                    y: 0,
                    rootY: 0,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Line through point at 1 comma 0.");
        });
    });

    describe("per-graph point announcements", () => {
        it("uses srExponentialPoint1 for exponential index 0", () => {
            const result = getAnnouncementText(
                {type: "move-exponential-point", pointIndex: 0, x: 1, y: 2},
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 1 at 1 comma 2.");
        });

        it("uses srExponentialPoint2 for exponential index 1", () => {
            const result = getAnnouncementText(
                {type: "move-exponential-point", pointIndex: 1, x: 3, y: 4},
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 2 at 3 comma 4.");
        });

        it("uses srLogarithmPoint1 for logarithm index 0", () => {
            const result = getAnnouncementText(
                {type: "move-logarithm-point", pointIndex: 0, x: 1, y: 2},
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 1 at 1 comma 2.");
        });

        it("uses srLogarithmPoint2 for logarithm index 1", () => {
            const result = getAnnouncementText(
                {type: "move-logarithm-point", pointIndex: 1, x: 3, y: 4},
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 2 at 3 comma 4.");
        });

        it("uses srAbsoluteValueVertexPoint for absolute-value index 0", () => {
            const result = getAnnouncementText(
                {type: "move-absolute-value-point", pointIndex: 0, x: 1, y: 2},
                mockStrings,
                "en",
            );

            expect(result).toBe("Vertex point at 1 comma 2.");
        });

        it("uses srAbsoluteValueSecondPoint for absolute-value index 1", () => {
            const result = getAnnouncementText(
                {type: "move-absolute-value-point", pointIndex: 1, x: 3, y: 4},
                mockStrings,
                "en",
            );

            expect(result).toBe("Point on arm at 3 comma 4.");
        });

        it("uses srTangentInflectionPoint for tangent index 0", () => {
            const result = getAnnouncementText(
                {type: "move-tangent-point", pointIndex: 0, x: 1, y: 2},
                mockStrings,
                "en",
            );

            expect(result).toBe("Inflection point at 1 comma 2.");
        });

        it("uses srTangentSecondPoint for tangent index 1", () => {
            const result = getAnnouncementText(
                {type: "move-tangent-point", pointIndex: 1, x: 3, y: 4},
                mockStrings,
                "en",
            );

            expect(result).toBe("Control point at 3 comma 4.");
        });

        it("uses Point N for linear endpoints (generic per-point label)", () => {
            const result = getAnnouncementText(
                {type: "move-linear-point", pointIndex: 1, x: 5, y: 6},
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 2 at 5 comma 6.");
        });

        it("uses srRayEndpoint for ray index 0", () => {
            const result = getAnnouncementText(
                {type: "move-ray-point", pointIndex: 0, x: 1, y: 2},
                mockStrings,
                "en",
            );

            expect(result).toBe("Endpoint at 1 comma 2.");
        });

        it("uses srRayTerminalPoint for ray index 1", () => {
            const result = getAnnouncementText(
                {type: "move-ray-point", pointIndex: 1, x: 3, y: 4},
                mockStrings,
                "en",
            );

            expect(result).toBe("Through point at 3 comma 4.");
        });

        it("uses generic Point 1 for vector tail (index 0)", () => {
            const result = getAnnouncementText(
                {type: "move-vector-point", pointIndex: 0, x: 1, y: 2},
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 1 at 1 comma 2.");
        });

        it("uses srVectorTipPoint for vector tip (index 1)", () => {
            const result = getAnnouncementText(
                {type: "move-vector-point", pointIndex: 1, x: 3, y: 4},
                mockStrings,
                "en",
            );

            expect(result).toBe("Tip point at 3 comma 4.");
        });

        it("includes the line number for linear-system points", () => {
            const result = getAnnouncementText(
                {
                    type: "move-linear-system-point",
                    lineIndex: 1,
                    pointIndex: 0,
                    x: 3,
                    y: 4,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 1 on line 2 at 3 comma 4.");
        });
    });

    describe("segment point announcements", () => {
        it("uses the single-segment label when there is only one segment", () => {
            const result = getAnnouncementText(
                {
                    type: "move-segment-point",
                    segmentIndex: 0,
                    pointIndex: 0,
                    x: 1,
                    y: 2,
                    totalSegments: 1,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Endpoint 1 at 1 comma 2.");
        });

        it("uses the multi-segment label when there are 2+ segments", () => {
            const result = getAnnouncementText(
                {
                    type: "move-segment-point",
                    segmentIndex: 1,
                    pointIndex: 0,
                    x: 1,
                    y: 2,
                    totalSegments: 2,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Endpoint 1 on segment 2 at 1 comma 2.");
        });
    });

    describe("quadratic point announcements", () => {
        // Parabola y = x^2 passes through (-1,1), (0,0), (1,1); vertex at origin.
        const upwardParabola: [
            [number, number],
            [number, number],
            [number, number],
        ] = [
            [-1, 1],
            [0, 0],
            [1, 1],
        ];

        it("appends the origin vertex annotation when the parabola has a vertex", () => {
            const result = getAnnouncementText(
                {
                    type: "move-quadratic-point",
                    pointIndex: 1,
                    coords: upwardParabola,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point 2 on parabola at the origin. Vertex is at the origin.",
            );
        });

        it("uses the axis label when the moved point sits on an axis", () => {
            const result = getAnnouncementText(
                {
                    type: "move-quadratic-point",
                    pointIndex: 0,
                    coords: upwardParabola,
                },
                mockStrings,
                "en",
            );

            // Point at (-1, 1) is in quadrant 2; vertex is at origin.
            expect(result).toBe(
                "Point 1 on parabola in quadrant 2 at -1 comma 1. Vertex is at the origin.",
            );
        });

        it("uses the quadrant label and quadrant vertex annotation off-origin", () => {
            // Parabola y = (x-2)^2 + 1 -> coefficients a=1, b=-4, c=5, vertex (2, 1)
            const offCenterParabola: [
                [number, number],
                [number, number],
                [number, number],
            ] = [
                [1, 2],
                [2, 1],
                [3, 2],
            ];
            const result = getAnnouncementText(
                {
                    type: "move-quadratic-point",
                    pointIndex: 0,
                    coords: offCenterParabola,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Point 1 on parabola in quadrant 1 at 1 comma 2. Vertex is in quadrant 1.",
            );
        });

        it("omits the vertex annotation when the parabola degenerates to a line", () => {
            // Three collinear points -> coeff a is 0, vertex string is omitted.
            const collinearPoints: [
                [number, number],
                [number, number],
                [number, number],
            ] = [
                [0, 0],
                [1, 1],
                [2, 2],
            ];
            const result = getAnnouncementText(
                {
                    type: "move-quadratic-point",
                    pointIndex: 0,
                    coords: collinearPoints,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Point 1 on parabola at the origin.");
        });
    });

    describe("grab handle announcements", () => {
        const lineCoords: [[number, number], [number, number]] = [
            [-1, 2],
            [3, 4],
        ];

        it("uses srLinearGrabHandle for a linear grab handle move", () => {
            const result = getAnnouncementText(
                {type: "move-linear-line", coords: lineCoords},
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Line going through point -1 comma 2 and point 3 comma 4.",
            );
        });

        it("uses srRayGrabHandle for a ray grab handle move", () => {
            const result = getAnnouncementText(
                {type: "move-ray-line", coords: lineCoords},
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Ray with endpoint -1 comma 2 going through point 3 comma 4.",
            );
        });

        it("uses srVectorGrabHandle for a vector grab handle move", () => {
            const result = getAnnouncementText(
                {type: "move-vector-line", coords: lineCoords},
                mockStrings,
                "en",
            );

            expect(result).toBe("Vector from -1 comma 2 to 3 comma 4.");
        });

        it("uses srSegmentGrabHandle for a segment grab handle move", () => {
            const result = getAnnouncementText(
                {
                    type: "move-segment-line",
                    segmentIndex: 0,
                    coords: lineCoords,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe("Segment from -1 comma 2 to 3 comma 4.");
        });

        it("uses srLinearSystemGrabHandle with the line number", () => {
            const result = getAnnouncementText(
                {
                    type: "move-linear-system-line",
                    lineIndex: 1,
                    coords: lineCoords,
                },
                mockStrings,
                "en",
            );

            expect(result).toBe(
                "Line 2 going through point -1 comma 2 and point 3 comma 4.",
            );
        });
    });
});

describe("srCircleRadiusPointLabel", () => {
    it("returns the right-side label when x is greater than centerX", () => {
        expect(srCircleRadiusPointLabel(3, 0, 0, mockStrings, "en")).toBe(
            "Right radius endpoint at 3 comma 0.",
        );
    });

    it("returns the right-side label when x equals centerX", () => {
        expect(srCircleRadiusPointLabel(0, 0, 0, mockStrings, "en")).toBe(
            "Right radius endpoint at 0 comma 0.",
        );
    });

    it("returns the left-side label when x is less than centerX", () => {
        expect(srCircleRadiusPointLabel(-3, 0, 0, mockStrings, "en")).toBe(
            "Left radius endpoint at -3 comma 0.",
        );
    });

    it("formats coordinates through srFormatNumber", () => {
        expect(srCircleRadiusPointLabel(Math.PI, 0, 0, mockStrings, "en")).toBe(
            "Right radius endpoint at 1π comma 0.",
        );
    });
});

describe("srCircleCenterLabel", () => {
    it("returns the circle center description", () => {
        expect(srCircleCenterLabel(2, 3, mockStrings, "en")).toBe(
            "Circle. The center point is at 2 comma 3.",
        );
    });

    it("formats coordinates through srFormatNumber", () => {
        expect(srCircleCenterLabel(Math.PI, 0, mockStrings, "en")).toBe(
            "Circle. The center point is at 1π comma 0.",
        );
    });
});

describe("srFormatNumber", () => {
    it("trivially converts small integers to strings", () => {
        expect(srFormatNumber(3, "en")).toBe("3");
    });

    it("does not use thousands separators", () => {
        expect(srFormatNumber(1234567, "en")).toBe("1234567");
    });

    it("does not use scientific notation", () => {
        expect(srFormatNumber(1e27, "en")).toBe("1000000000000000000000000000");
    });

    it("displays at most 3 decimal places", () => {
        expect(srFormatNumber(0.123456, "en")).toBe("0.123");
    });

    it("rounds to 3 decimal places", () => {
        expect(srFormatNumber(1.2345, "en")).toBe("1.235");
    });

    it("never displays a negative sign on zero", () => {
        expect(srFormatNumber(-0, "en")).toBe("0");
    });

    it("uses a locale-appropriate decimal separator", () => {
        expect(srFormatNumber(1.5, "de")).toBe("1,5");
    });

    it("uses pi format when the number is a multiple of pi", () => {
        expect(srFormatNumber(Math.PI, "en")).toBe("1π");
    });
});

describe("getPiMultiple", () => {
    test.each`
        num
        ${0}
        ${1e12}
        ${1e27}
        ${3.14}
        ${3.14159265}
        ${2 * 3.14159265}
        ${1}
        ${-1}
        ${-3.14}
        ${Math.PI / 7}
        ${Math.PI / 8}
        ${3.6 * Math.PI}
        ${-3.51 * Math.PI}
    `(
        "returns null for non-pi-based numbers or non-approved divisors: $num",
        ({num}) => {
            expect(getPiMultiple(num)).toBe(null);
        },
    );

    test.each`
        num                   | expectedString
        ${Math.PI}            | ${"1π"}
        ${-Math.PI}           | ${"-1π"}
        ${2 * Math.PI}        | ${"2π"}
        ${-2 * Math.PI}       | ${"-2π"}
        ${10 * Math.PI}       | ${"10π"}
        ${-10 * Math.PI}      | ${"-10π"}
        ${Math.PI / 2}        | ${"1π/2"}
        ${Math.PI / 3}        | ${"1π/3"}
        ${Math.PI / 4}        | ${"1π/4"}
        ${Math.PI / 6}        | ${"1π/6"}
        ${Math.PI / -2}       | ${"-1π/2"}
        ${Math.PI / -3}       | ${"-1π/3"}
        ${Math.PI / -4}       | ${"-1π/4"}
        ${Math.PI / -6}       | ${"-1π/6"}
        ${(7 * Math.PI) / 2}  | ${"7π/2"}
        ${3.5 * Math.PI}      | ${"7π/2"}
        ${(2 * Math.PI) / 3}  | ${"2π/3"}
        ${(3 * Math.PI) / 4}  | ${"3π/4"}
        ${(5 * Math.PI) / 6}  | ${"5π/6"}
        ${(-7 * Math.PI) / 2} | ${"-7π/2"}
        ${(-2 * Math.PI) / 3} | ${"-2π/3"}
        ${(-3 * Math.PI) / 4} | ${"-3π/4"}
        ${(-5 * Math.PI) / 6} | ${"-5π/6"}
    `(
        "returns a string showing the number as a multiple of pi: $expectedString",
        ({num, expectedString}) => {
            expect(getPiMultiple(num)).toBe(expectedString);
        },
    );
});
