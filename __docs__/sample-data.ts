import type {PerseusRenderer} from "@khanacademy/perseus-core";

// This lives here because it adds alot of noise to the MDX file if we inline
// it.
export const graphExample: PerseusRenderer = {
    content:
        "An example of a the beautiful**interactive-graph** widget:\n\n[[☃ interactive-graph 1]]",
    widgets: {
        "interactive-graph 1": {
            type: "interactive-graph",
            options: {
                graph: {
                    type: "none",
                },
                correct: {
                    type: "none",
                },
                showAxisArrows: {
                    xMin: true,
                    xMax: true,
                    yMin: true,
                    yMax: true,
                },
                lockedFigures: [
                    {
                        type: "point",
                        color: "green",
                        coord: [3, 7.5],
                        filled: true,
                        labels: [],
                    },
                    {
                        type: "line",
                        kind: "segment",
                        color: "blue",
                        lineStyle: "solid",
                        weight: "thick",
                        labels: [],
                        points: [
                            {
                                color: "blue",
                                coord: [-3, 6],
                                filled: true,
                                type: "point",
                                labels: [],
                            },
                            {
                                color: "blue",
                                coord: [8, 8],
                                filled: true,
                                type: "point",
                                labels: [],
                            },
                        ],
                        showPoint1: false,
                        showPoint2: false,
                    },
                    {
                        type: "ellipse",
                        weight: "thin",
                        labels: [],
                        angle: 0,
                        center: [0, 2],
                        color: "purple",
                        fillStyle: "none",
                        radius: [3, 1],
                        strokeStyle: "solid",
                    },
                    {
                        type: "vector",
                        weight: "medium",
                        labels: [],
                        color: "pink",
                        points: [
                            [-2, -2],
                            [-7, -4],
                        ],
                    },
                    {
                        type: "polygon",
                        labels: [],
                        color: "orange",
                        weight: "thick",
                        fillStyle: "translucent",
                        points: [
                            [7, -3],
                            [8, -5],
                            [4, -7],
                            [0, -7],
                            [2, -3],
                        ],
                        showVertices: false,
                        showAngles: false,
                        strokeStyle: "solid",
                    },
                ],
                markings: "graph",
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                rulerLabel: "",
                rulerTicks: 10,
                showProtractor: false,
                showRuler: false,
                showTooltips: false,
                step: [1, 1],
            },
            static: false,
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
    images: {},
};
