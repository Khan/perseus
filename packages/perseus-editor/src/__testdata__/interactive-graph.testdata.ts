import {
    generateInteractiveGraphQuestion,
    generateIGAngleGraph,
    generateIGCircleGraph,
    generateIGExponentialGraph,
    generateIGLinearGraph,
    generateIGLinearSystemGraph,
    generateIGNoneGraph,
    generateIGPointGraph,
    generateIGPolygonGraph,
    generateIGQuadraticGraph,
    generateIGRayGraph,
    generateIGSegmentGraph,
    generateIGSinusoidGraph,
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

export const angleWithStartingCoordsQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        graph: generateIGAngleGraph({
            startCoords: [
                [5, 1],
                [1, 1],
                [4, 5],
            ],
        }),
        correct: generateIGAngleGraph(),
    });

export const pointQuestionWithStartingCoords: PerseusRenderer =
    generateInteractiveGraphQuestion({
        graph: generateIGPointGraph({
            numPoints: 2,
            startCoords: [
                [0, 0],
                [2, 2],
            ],
        }),
        correct: generateIGPointGraph({numPoints: 2}),
    });

// Clockwise points
export const polygonWithStartingCoordsQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        markings: "grid",
        graph: generateIGPolygonGraph({
            snapTo: "grid",
            numSides: 6,
            showAngles: true,
            startCoords: [
                [-7, 5],
                [1, 5],
                [6, 0],
                [1, -5],
                [-7, -5],
                [-2, 0],
            ],
        }),
        correct: generateIGPolygonGraph({
            snapTo: "grid",
            numSides: 6,
            showAngles: true,
        }),
    });

export const unlimitedPolygonWithCorrectAnswerQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        graph: generateIGPolygonGraph({
            snapTo: "grid",
            numSides: "unlimited",
        }),
        correct: generateIGPolygonGraph({
            snapTo: "grid",
            numSides: "unlimited",
            coords: [
                [-4.5, -6],
                [4.5, -5],
                [3.5, 0.5],
                [-4.5, 0],
            ],
        }),
    });

export const segmentWithStartingCoordsQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        graph: generateIGSegmentGraph({
            numSegments: 1,
            startCoords: [
                [
                    [0, 0],
                    [2, 2],
                ],
            ],
        }),
        correct: generateIGSegmentGraph({numSegments: 1}),
    });

export const segmentsWithStartingCoordsQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        graph: generateIGSegmentGraph({
            numSegments: 2,
            startCoords: [
                [
                    [0, 0],
                    [2, 2],
                ],
                [
                    [0, 2],
                    [2, 0],
                ],
            ],
        }),
        correct: generateIGSegmentGraph({numSegments: 2}),
    });

export const linearWithStartingCoordsQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        graph: generateIGLinearGraph({
            startCoords: [
                [3, 0],
                [3, 3],
            ],
        }),
        correct: generateIGLinearGraph(),
    });

export const linearSystemWithStartingCoordsQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        graph: generateIGLinearSystemGraph({
            startCoords: [
                [
                    [-3, 0],
                    [-3, 3],
                ],
                [
                    [3, 0],
                    [3, 3],
                ],
            ],
        }),
        correct: generateIGLinearSystemGraph(),
    });

export const rayWithStartingCoordsQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        graph: generateIGRayGraph({
            startCoords: [
                [3, 0],
                [3, 3],
            ],
        }),
        correct: generateIGRayGraph(),
    });

export const circleWithStartingCoordsQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        graph: generateIGCircleGraph({
            startCoords: {center: [9, 9], radius: 5},
        }),
        correct: generateIGCircleGraph(),
    });

export const quadraticWithStartingCoordsQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        graph: generateIGQuadraticGraph({
            startCoords: [
                [-1, -1],
                [0, 0],
                [1, -1],
            ],
        }),
        correct: generateIGQuadraticGraph(),
    });

export const sinusoidWithStartingCoordsAndPiTicksQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        range: [[-5 * Math.PI, 5 * Math.PI], [-10, 10]],
        step: [Math.PI, 1],
        gridStep: [Math.PI / 2, 1],
        snapStep: [Math.PI / 4, 1],
        graph: generateIGSinusoidGraph({
            startCoords: [
                [0, 0],
                [3 * Math.PI, -3],
            ],
        }),
        correct: generateIGSinusoidGraph(),
    });

export const sinusoidMinimalQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSinusoidGraph(),
    });

export const exponentialMinimalQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGExponentialGraph(),
    });

export const vectorMinimalQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder().withVector().build();

export const segmentWithLockedFigures: PerseusRenderer =
    generateInteractiveGraphQuestion({
        lockedFigures: [
            generateIGLockedPoint({
                coord: [-7, -7],
                labels: [
                    {
                        type: "label",
                        text: "A",
                        coord: [-6.5, -7],
                        color: "grayH",
                        size: "medium",
                    },
                ],
                ariaLabel: "Point A",
            }),
            generateIGLockedLine({
                showPoint1: true,
                showPoint2: true,
                points: [
                    generateIGLockedPoint({coord: [-7, -5]}),
                    generateIGLockedPoint({coord: [2, -3]}),
                ],
                labels: [
                    {
                        type: "label",
                        text: "B",
                        coord: [-2.5, -4],
                        color: "grayH",
                        size: "medium",
                    },
                ],
                ariaLabel: "Line B",
            }),
            generateIGLockedVector({
                points: [
                    [0, 0],
                    [8, 2],
                ],
                color: "purple",
                labels: [
                    {
                        type: "label",
                        text: "C",
                        coord: [4, 1],
                        color: "purple",
                        size: "medium",
                    },
                ],
                ariaLabel: "Vector C",
            }),
            generateIGLockedEllipse({
                center: [0, 5],
                radius: [4, 2],
                angle: Math.PI / 4,
                color: "blue",
                labels: [
                    {
                        type: "label",
                        text: "D",
                        coord: [0, 5],
                        color: "blue",
                        size: "medium",
                    },
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
                    {
                        type: "label",
                        text: "E",
                        coord: [-9, 4],
                        color: "pink",
                        size: "medium",
                    },
                ],
                ariaLabel: "Polygon E",
            }),
            generateIGLockedFunction({
                equation: "sin(x)",
                color: "red",
                labels: [
                    {
                        type: "label",
                        text: "F",
                        coord: [0, 0],
                        color: "red",
                        size: "medium",
                    },
                ],
                ariaLabel: "Function F",
            }),
            generateIGLockedLabel({
                text: "$\\sqrt{\\frac{1}{2}}$",
                coord: [6, -5],
            }),
        ],
    });

export const interactiveGraphWithAriaLabel: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGNoneGraph(),
        fullGraphAriaLabel: "Segment Graph Title",
        fullGraphAriaDescription:
            "There is a segment on the graph that runs from five units left and five units up to five units right and five units up.",
    });
