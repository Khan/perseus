import {
    generateInteractiveGraphQuestion,
    generateIGLockedPoint,
    generateIGLockedLine,
    generateIGLockedVector,
    generateIGLockedEllipse,
    generateIGLockedPolygon,
    generateIGLockedFunction,
    generateIGLockedLabel,
} from "@khanacademy/perseus-core";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

// Data for the interactive graph widget

export const segmentWithLockedFigures: PerseusRenderer =
    generateInteractiveGraphQuestion({
        lockedFigures: [
            generateIGLockedPoint({
                coord: [-7, -7],
                labels: [generateIGLockedLabel({text: "A", coord: [-6.5, -7]})],
                ariaLabel: "Point A",
            }),
            generateIGLockedLine({
                showPoint1: true,
                showPoint2: true,
                points: [
                    generateIGLockedPoint({coord: [-7, -5]}),
                    generateIGLockedPoint({coord: [2, -3]}),
                ],
                labels: [generateIGLockedLabel({text: "B", coord: [-2.5, -4]})],
                ariaLabel: "Line B",
            }),
            generateIGLockedVector({
                points: [
                    [0, 0],
                    [8, 2],
                ],
                color: "purple",
                labels: [
                    generateIGLockedLabel({
                        text: "C",
                        coord: [4, 1],
                        color: "purple",
                    }),
                ],
                ariaLabel: "Vector C",
            }),
            generateIGLockedEllipse({
                center: [0, 5],
                radius: [4, 2],
                angle: Math.PI / 4,
                color: "blue",
                labels: [
                    generateIGLockedLabel({
                        text: "D",
                        coord: [0, 5],
                        color: "blue",
                    }),
                ],
                ariaLabel: "Ellipse D",
            }),
            generateIGLockedPolygon({
                points: [
                    [-9, 4],
                    [-6, 4],
                    [-6, 1],
                    [-9, 1],
                ],
                color: "pink",
                labels: [
                    generateIGLockedLabel({
                        text: "E",
                        coord: [-9, 4],
                        color: "pink",
                    }),
                ],
                ariaLabel: "Polygon E",
            }),
            generateIGLockedFunction({
                equation: "sin(x)",
                color: "red",
                labels: [
                    generateIGLockedLabel({
                        text: "F",
                        coord: [0, 0],
                        color: "red",
                    }),
                ],
                ariaLabel: "Function F",
            }),
            generateIGLockedLabel({
                text: "$\\sqrt{\\frac{1}{2}}$",
                coord: [6, -5],
            }),
        ],
    });
