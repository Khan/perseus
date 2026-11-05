import {offPaletteColors} from "./khan-style";

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

function drawing(svg: string, labelStyle: Record<string, string> = {}) {
    return {
        svg,
        data: {
            range: [
                [0, 1],
                [0, 1],
            ] satisfies [[number, number], [number, number]],
            labels: [
                {
                    content: "A",
                    alignment: "center",
                    coordinates: [0, 0] satisfies [number, number],
                    style: labelStyle,
                    typesetAsMath: false,
                },
            ],
        },
        width: 10,
        height: 10,
    };
}

describe("offPaletteColors", () => {
    it("accepts the palette's colors in any case, and no color", () => {
        // Arrange, Act
        const found = offPaletteColors(
            drawing(
                '<path stroke="#3d7586" fill="none"/><rect fill="#EDF3FE"/>',
                {
                    color: "#3D7586",
                },
            ),
            STYLE,
        );

        // Assert
        expect(found).toEqual([]);
    });

    it("lists each other color with where it's used", () => {
        // Arrange, Act
        const found = offPaletteColors(
            drawing('<path stroke="#ff0000"/><rect fill="#ff0000"/>', {
                color: "purple",
            }),
            STYLE,
        );

        // Assert
        expect(found).toEqual([
            "#ff0000 (stroke, fill)",
            'purple (label "A" color)',
        ]);
    });
});
