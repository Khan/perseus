import {checkDiagram, contrast} from "./diagram-checks";

import type {RenderedDiagram} from "./diagram";
import type {KhanStyle} from "./khan-style";

const STYLE: KhanStyle = {
    colors: {
        blue: "#3D7586",
        green: "#447A53",
        gold: "#946700",
        red: "#D92916",
        pink: "#B25071",
        purple: "#594094",
        purpleD: "#8351E8",
        gray: "#5D5F66",
        grayH: "#3B3D45",
        grayI: "#21242C",
    },
    ui: {
        ink: "#21242c",
        interactive: "#1865f2",
        line: "#909296",
        gridLine: "#dbdcdd",
        background: "#ffffff",
    },
    tints: {
        blue: "#edf3fe",
        green: "#ebf8ec",
        gold: "#fff9eb",
        red: "#fceeec",
        gray: "#ededee",
    },
};

function drawing({
    shapes = [],
    labels = [],
}: {
    shapes?: RenderedDiagram["shapes"];
    labels?: Array<{
        content: string;
        typesetAsMath?: boolean;
        style?: Record<string, string>;
    }>;
}): RenderedDiagram {
    return {
        svg: "<svg></svg>",
        data: {
            range: [
                [0, 1],
                [0, 1],
            ],
            labels: labels.map(
                ({content, typesetAsMath = false, style = {}}) => ({
                    content,
                    alignment: "center",
                    coordinates: [0, 0],
                    style,
                    typesetAsMath,
                }),
            ),
        },
        width: 10,
        height: 10,
        shapes,
    };
}

describe("contrast", () => {
    it("is 21 for black on white", () => {
        // Arrange, Act, Assert
        expect(contrast("#000", "#ffffff")).toBeCloseTo(21);
    });
});

describe("checkDiagram", () => {
    it("passes shapes and labels drawn with Khan's colors", () => {
        // Arrange, Act
        const check = checkDiagram(
            drawing({
                shapes: [
                    {
                        kind: "Polygon",
                        style: {fill: "#edf3fe", stroke: "#3D7586"},
                    },
                    {kind: "Grid", style: {stroke: "#dbdcdd"}},
                ],
                labels: [
                    {content: "A", style: {color: "#3D7586"}},
                    {content: "\\dfrac{1}{2}", typesetAsMath: true},
                ],
            }),
            STYLE,
        );

        // Assert
        expect(check).toEqual({errors: [], warnings: []});
    });

    it("refuses style keys Graffiti ignores", () => {
        // Arrange, Act
        const {errors} = checkDiagram(
            drawing({
                shapes: [
                    {
                        kind: "Polygon",
                        style: {fill: "#edf3fe", "fill-opacity": 0.2},
                    },
                ],
            }),
        );

        // Assert
        expect(errors).toEqual([
            expect.stringContaining('A Polygon\'s style has "fill-opacity"'),
        ]);
    });

    it("refuses a line too pale to see, but not a grid", () => {
        // Arrange, Act
        const {errors} = checkDiagram(
            drawing({
                shapes: [
                    {kind: "Segment", style: {stroke: "#edf3fe"}},
                    {kind: "Grid", style: {stroke: "#edf3fe"}},
                ],
            }),
            STYLE,
        );

        // Assert
        expect(errors).toEqual([
            expect.stringContaining("A Segment's stroke #edf3fe"),
        ]);
    });

    it("refuses label text too pale to read", () => {
        // Arrange, Act
        const {errors} = checkDiagram(
            drawing({labels: [{content: "A", style: {color: "#909296"}}]}),
            STYLE,
        );

        // Assert
        expect(errors).toEqual([
            expect.stringContaining('The label "A"\'s color #909296'),
        ]);
    });

    it("refuses \\frac and ungrouped large numbers in TeX labels", () => {
        // Arrange, Act
        const {errors} = checkDiagram(
            drawing({
                labels: [
                    {content: "\\frac{1}{2}", typesetAsMath: true},
                    {content: "50000", typesetAsMath: true},
                    {content: "50{,}000", typesetAsMath: true},
                    {content: "3.14159", typesetAsMath: true},
                ],
            }),
        );

        // Assert
        expect(errors).toEqual([
            expect.stringContaining("write \\dfrac"),
            expect.stringContaining("as 50{,}000"),
        ]);
    });

    it("warns about one-word text labels and colors outside the palette", () => {
        // Arrange, Act
        const {errors, warnings} = checkDiagram(
            {
                ...drawing({labels: [{content: "Rainfall"}, {content: "B"}]}),
                svg: '<path stroke="#ff0000"/>',
            },
            STYLE,
        );

        // Assert
        expect({errors, warnings}).toEqual({
            errors: [],
            warnings: [
                expect.stringContaining('The label "Rainfall" is one word'),
                expect.stringContaining("#ff0000 (stroke)"),
            ],
        });
    });
});
