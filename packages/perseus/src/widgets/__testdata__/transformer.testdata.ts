import type {PerseusRenderer, TransformerWidget} from "../../perseus-types";

export const question: PerseusRenderer = {
    content:
        "$\\overleftrightarrow{MN}$ is the perpendicular bisector of segment $\\overline{JL}$.  \n\n**Perform a reflection that proves $M$ must be equidistant from $J$ and $L$ and select the option which explains the proof.**  \nThe statement must be true for any point $M$ which lies on the perpendicular bisector.  \n\n[[☃ transformer 1]]  \n\n",
    images: {
        "https://ka-perseus-images.s3.amazonaws.com/6cf0d9f007084e9d06e3ce0e241416dde920ec9c.png":
            {height: 503, width: 504},
    },
    widgets: {
        "transformer 1": {
            graded: true,
            options: {
                correct: {
                    shape: {
                        coords: [
                            [-1.1546319456101628e-14, -1.199040866595169e-14],
                            [6.999999999999989, 6.999999999999986],
                            [-7.000000000000007, 6.999999999999989],
                        ],
                        options: [{}],
                        type: ["polygon-3"],
                    },
                    transformations: [
                        {
                            line: [
                                [1.499999999999988, -1.5000000000000002],
                                [-1.4999999999999996, 1.4999999999999882],
                            ],
                            type: "reflection",
                        },
                    ],
                },
                drawSolutionShape: false,
                gradeEmpty: false,
                graph: {
                    backgroundImage: {
                        bottom: 0,
                        height: 400,
                        left: 0,
                        scale: 1,
                        url: "https://ka-perseus-graphie.s3.amazonaws.com/778924d189c73077f3338098cb4e48fe79695f93.png",
                        width: 400,
                    },
                    gridStep: [1, 1],
                    labels: ["x", "y"],
                    markings: "none",
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    rulerLabel: "",
                    rulerTicks: 10,
                    showProtractor: false,
                    showRuler: false,
                    snapStep: [0.5, 0.5],
                    step: [1, 1],
                },
                graphMode: "interactive",
                listMode: "static",
                starting: {
                    shape: {
                        coords: [
                            [0, 0],
                            [-7, -7],
                            [-7, 7],
                        ],
                        options: [{}],
                        type: ["polygon-3"],
                    },
                    transformations: [],
                },
                tools: {
                    dilation: {
                        constraints: {fixed: false},
                        coord: [6, 6],
                        enabled: true,
                        required: false,
                    },
                    reflection: {
                        constraints: {fixed: false},
                        coords: [
                            [8, -1.5],
                            [8, 2.5],
                        ],
                        enabled: true,
                        required: false,
                    },
                    rotation: {
                        constraints: {fixed: false},
                        coord: [1, 6],
                        enabled: true,
                        required: false,
                    },
                    translation: {
                        constraints: {},
                        enabled: true,
                        required: false,
                    },
                },
                version: 1.2,
            },
            type: "transformer",
            version: {major: 0, minor: 0},
        } as TransformerWidget,
    },
};
