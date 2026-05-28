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

    describe("move-quadratic-point announcements", () => {
        // Composes the point label (quadrant-aware) with the vertex
        // string when a vertex exists; vertex is undefined when the
        // parabola degenerates to a line.
        it("uses the point-quadrant label and appends the vertex string for a quadrant vertex", () => {
            const result = getAnnouncementText(
                {
                    type: "move-quadratic-point",
                    pointIndex: 0,
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
