// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "Custom Axis Labels:\n[[☃ interactive-graph 1]]\n\nLarge $y$-range, origin near bottom left:\n[[☃ interactive-graph 2]]\n\nLarge $x$-range, origin near left side:\n[[☃ interactive-graph 3]]\n\nFractional axis labels:\n[[☃ interactive-graph 4]]\n\nGridlines every two ticks:\n[[☃ interactive-graph 5]]\n\nGridlines every half tick:\n[[☃ interactive-graph 6]]\n\nNonsquare grid:\n[[☃ interactive-graph 7]]\n\nLocked figures:\n[[☃ interactive-graph 8]]\n",
        images: {},
        widgets: {
            "interactive-graph 1": {
                type: "interactive-graph",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    step: [1, 1],
                    backgroundImage: {
                        url: null,
                    },
                    markings: "graph",
                    labels: ["\\text{Re}", "\\text{Im}"],
                    showProtractor: false,
                    showTooltips: false,
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    gridStep: [1, 1],
                    snapStep: [0.5, 0.5],
                    graph: {
                        type: "segment",
                        numSegments: 6,
                    },
                    correct: {
                        type: "segment",
                        numSegments: 6,
                        coords: [
                            [
                                [-5, 5],
                                [5, 5],
                            ],
                            [
                                [-5, 3],
                                [5, 3],
                            ],
                            [
                                [-5, 1],
                                [5, 1],
                            ],
                            [
                                [-5, -1],
                                [5, -1],
                            ],
                            [
                                [-5, -3],
                                [5, -3],
                            ],
                            [
                                [-5, -5],
                                [5, -5],
                            ],
                        ],
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "interactive-graph 2": {
                type: "interactive-graph",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    step: [1, 10],
                    backgroundImage: {
                        url: null,
                    },
                    markings: "graph",
                    labels: ["x", "y"],
                    showProtractor: false,
                    showTooltips: false,
                    range: [
                        [-0.7, 8],
                        [-10, 100],
                    ],
                    gridStep: [1, 10],
                    snapStep: [0.5, 5],
                    graph: {
                        type: "segment",
                    },
                    correct: {
                        type: "segment",
                        coords: [
                            [
                                [1.5, 70],
                                [5.5, 70],
                            ],
                        ],
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "interactive-graph 3": {
                type: "interactive-graph",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    step: [20, 1],
                    backgroundImage: {
                        url: null,
                        width: 0,
                        height: 0,
                    },
                    markings: "graph",
                    labels: ["x", "y"],
                    showProtractor: false,
                    showTooltips: false,
                    range: [
                        [-10, 100],
                        [-10, 10],
                    ],
                    gridStep: [5, 1],
                    snapStep: [2.5, 0.5],
                    graph: {
                        type: "segment",
                    },
                    correct: {
                        type: "segment",
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "interactive-graph 4": {
                type: "interactive-graph",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    step: [0.5, 0.5],
                    backgroundImage: {
                        url: null,
                    },
                    markings: "graph",
                    labels: ["x", "y"],
                    showProtractor: false,
                    showTooltips: false,
                    range: [
                        [-3, 3],
                        [-3, 3],
                    ],
                    gridStep: [0.5, 0.5],
                    snapStep: [0.25, 0.25],
                    graph: {
                        type: "segment",
                    },
                    correct: {
                        type: "segment",
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "interactive-graph 5": {
                type: "interactive-graph",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    step: [1, 1],
                    backgroundImage: {
                        url: null,
                    },
                    markings: "graph",
                    labels: ["x", "y"],
                    showProtractor: false,
                    showTooltips: false,
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    gridStep: [2, 2],
                    snapStep: [1, 1],
                    graph: {
                        type: "segment",
                    },
                    correct: {
                        type: "segment",
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "interactive-graph 6": {
                type: "interactive-graph",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    step: [1, 1],
                    backgroundImage: {
                        url: null,
                    },
                    markings: "graph",
                    labels: ["x", "y"],
                    showProtractor: false,
                    showTooltips: false,
                    range: [
                        [-5, 5],
                        [-5, 5],
                    ],
                    gridStep: [0.5, 0.5],
                    snapStep: [0.25, 0.25],
                    graph: {
                        type: "segment",
                    },
                    correct: {
                        type: "segment",
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "interactive-graph 7": {
                type: "interactive-graph",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    step: [1, 1],
                    backgroundImage: {
                        url: null,
                    },
                    markings: "graph",
                    labels: ["x", "y"],
                    showProtractor: false,
                    showTooltips: false,
                    range: [
                        [-5, 5],
                        [-5, 5],
                    ],
                    gridStep: [2, 0.5],
                    snapStep: [1, 0.25],
                    graph: {
                        type: "segment",
                    },
                    correct: {
                        type: "segment",
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "interactive-graph 8": {
                type: "interactive-graph",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    step: [2, 2],
                    backgroundImage: {
                        url: null,
                    },
                    markings: "graph",
                    labels: ["x", "y"],
                    showProtractor: false,
                    showTooltips: false,
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    gridStep: [1, 1],
                    snapStep: [0.5, 0.5],
                    lockedFigures: [
                        {
                            type: "point",
                            coord: [-1, 5],
                            color: "green",
                            filled: true,
                        },
                        {
                            type: "point",
                            coord: [1, 5],
                            color: "grayH",
                            filled: false,
                        },
                        {
                            type: "line",
                            kind: "line",
                            points: [
                                {
                                    type: "point",
                                    coord: [0, 1],
                                    color: "grayH",
                                    filled: true,
                                },
                                {
                                    type: "point",
                                    coord: [5, 2],
                                    color: "grayH",
                                    filled: true,
                                },
                            ],
                            color: "grayH",
                            lineStyle: "solid",
                            showStartPoint: false,
                            showEndPoint: false,
                        },
                        {
                            type: "line",
                            kind: "line",
                            points: [
                                {
                                    type: "point",
                                    coord: [0, 0],
                                    color: "grayH",
                                    filled: true,
                                },
                                {
                                    type: "point",
                                    coord: [5, 1],
                                    color: "grayH",
                                    filled: false,
                                },
                            ],
                            color: "grayH",
                            lineStyle: "dashed",
                            showStartPoint: true,
                            showEndPoint: true,
                        },
                        {
                            type: "line",
                            kind: "ray",
                            points: [
                                {
                                    type: "point",
                                    coord: [0, -1],
                                    color: "pink",
                                    filled: true,
                                },
                                {
                                    type: "point",
                                    coord: [5, 0],
                                    color: "pink",
                                    filled: true,
                                },
                            ],
                            color: "pink",
                            lineStyle: "solid",
                            showStartPoint: false,
                            showEndPoint: false,
                        },
                        {
                            type: "line",
                            kind: "ray",
                            points: [
                                {
                                    type: "point",
                                    coord: [0, -2],
                                    color: "purple",
                                    filled: true,
                                },
                                {
                                    type: "point",
                                    coord: [5, -1],
                                    color: "pink",
                                    filled: false,
                                },
                            ],
                            color: "pink",
                            lineStyle: "dashed",
                            showStartPoint: true,
                            showEndPoint: true,
                        },
                        {
                            type: "line",
                            kind: "segment",
                            points: [
                                {
                                    type: "point",
                                    coord: [0, -3],
                                    color: "red",
                                    filled: true,
                                },
                                {
                                    type: "point",
                                    coord: [5, -2],
                                    color: "red",
                                    filled: true,
                                },
                            ],
                            color: "red",
                            lineStyle: "solid",
                            showStartPoint: false,
                            showEndPoint: false,
                        },
                        {
                            type: "line",
                            kind: "segment",
                            points: [
                                {
                                    type: "point",
                                    coord: [0, -4],
                                    color: "green",
                                    filled: true,
                                },
                                {
                                    type: "point",
                                    coord: [5, -3],
                                    color: "red",
                                    filled: false,
                                },
                            ],
                            color: "red",
                            lineStyle: "dashed",
                            showStartPoint: true,
                            showEndPoint: true,
                        },
                        {
                            type: "label",
                            coord: [-6, 0],
                            text: "\\frac{1}{4}?",
                            color: "blue",
                            size: "medium",
                        },
                    ],
                    graph: {
                        type: "segment",
                    },
                    correct: {
                        type: "segment",
                        hasBeenInteractedWith: true,
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        snapStep: [0.5, 0.5],
                        markings: "graph",
                        coords: [
                            [
                                [-5, -5],
                                [5, 5],
                            ],
                        ],
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
};
