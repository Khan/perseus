import {
    generateIGLockedEllipse,
    generateIGLockedFunction,
    generateIGLockedLabel,
    generateIGLockedLine,
    generateIGLockedPoint,
    generateIGLockedPolygon,
    generateIGLockedVector,
} from "@khanacademy/perseus-core";

import type {LockedFigure, StrokeWeight} from "@khanacademy/perseus-core";

// Builds an array of locked figures that include:
// - Every kind of locked figure type
// - in all available stroke styles where applicable (solid/dashed)
//   - open/filled for locked points
//   - different sizes for locked labels
// - for the specified stroke weight
export function lockedFiguresWithWeight(weight: StrokeWeight): LockedFigure[] {
    return [
        // Point
        generateIGLockedPoint({coord: [3, 6], color: "blue", filled: false}),
        generateIGLockedPoint({coord: [3, 4], color: "blue", filled: true}),

        // Line - Segment
        generateIGLockedLine({
            kind: "segment",
            weight,
            lineStyle: "solid",
            color: "blue",
            points: [
                generateIGLockedPoint({coord: [-5, 0], color: "blue"}),
                generateIGLockedPoint({coord: [0, 5], color: "blue"}),
            ],
        }),
        generateIGLockedLine({
            kind: "segment",
            weight,
            lineStyle: "dashed",
            color: "blue",
            points: [
                generateIGLockedPoint({coord: [-4, 0], color: "blue"}),
                generateIGLockedPoint({coord: [0, 4], color: "blue"}),
            ],
        }),

        // Line - Ray
        generateIGLockedLine({
            kind: "ray",
            weight,
            lineStyle: "solid",
            color: "green",
            points: [
                generateIGLockedPoint({coord: [-7, 0], color: "green"}),
                generateIGLockedPoint({coord: [0, 7], color: "green"}),
            ],
        }),
        generateIGLockedLine({
            kind: "ray",
            weight,
            lineStyle: "dashed",
            color: "green",
            points: [
                generateIGLockedPoint({coord: [-6, 0], color: "green"}),
                generateIGLockedPoint({coord: [0, 6], color: "green"}),
            ],
        }),

        // Line - Line
        generateIGLockedLine({
            kind: "line",
            weight,
            lineStyle: "solid",
            color: "purple",
            points: [
                generateIGLockedPoint({coord: [-9, 0], color: "purple"}),
                generateIGLockedPoint({coord: [0, 9], color: "purple"}),
            ],
        }),
        generateIGLockedLine({
            kind: "line",
            weight,
            lineStyle: "dashed",
            color: "purple",
            points: [
                generateIGLockedPoint({coord: [-8, 0], color: "purple"}),
                generateIGLockedPoint({coord: [0, 8], color: "purple"}),
            ],
        }),

        // Vector
        generateIGLockedVector({
            points: [
                [-3, 0],
                [0, 3],
            ],
            weight,
            color: "gold",
        }),

        // Ellipse
        generateIGLockedEllipse({
            center: [-6, -3],
            radius: [2.5, 1.5],
            weight,
            strokeStyle: "solid",
            color: "red",
        }),
        generateIGLockedEllipse({
            center: [-6, -7],
            radius: [2.5, 1.5],
            weight,
            strokeStyle: "dashed",
            color: "red",
        }),

        // Polygon
        generateIGLockedPolygon({
            points: [
                [-9, 7],
                [-7.5, 9],
                [-6, 7],
            ],
            weight,
            strokeStyle: "solid",
            color: "pink",
        }),
        generateIGLockedPolygon({
            points: [
                [-9, 6],
                [-7.5, 4],
                [-6, 6],
            ],
            weight,
            strokeStyle: "dashed",
            color: "pink",
        }),
        // Function
        generateIGLockedFunction({
            equation: "(x - 7)^3 - 1",
            weight,
            strokeStyle: "solid",
            color: "grayH",
        }),
        generateIGLockedFunction({
            equation: "(x - 5)^3 - 1",
            weight,
            strokeStyle: "dashed",
            color: "grayH",
        }),

        // Locked Labels
        generateIGLockedLabel({
            text: "A1",
            coord: [7, -2],
            color: "blue",
            size: "small",
        }),
        generateIGLockedLabel({
            text: "B2",
            coord: [7, -4],
            color: "blue",
            size: "medium",
        }),
        generateIGLockedLabel({
            text: "C3",
            coord: [7, -6],
            color: "blue",
            size: "large",
        }),
    ];
}
