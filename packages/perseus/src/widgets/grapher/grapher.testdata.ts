import type {PerseusRenderer} from "@khanacademy/perseus-core";

export const absoluteValueQuestion: PerseusRenderer = {
    content:
        "The graph of the function $h(x)=2|x|$ is shown on the grid below.\n\n**Graph the function $f(x)=2|x-8|+1$ in the interactive graph. **\n\n[[☃ grapher 1]]\n",
    images: {
        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/ec054de491d5cfb3ef71c06d34bf2fb7ca7feb86":
            {
                width: 425,
                height: 425,
            },
    },
    widgets: {
        "grapher 1": {
            type: "grapher",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                correct: {
                    type: "absolute_value",
                    coords: [
                        [8, 1],
                        [7, 3],
                    ],
                },
                availableTypes: ["absolute_value"],
                graph: {
                    editableSettings: ["graph", "snap", "image"],
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    labels: ["x", "y"],
                    step: [1, 1],
                    gridStep: [1, 1],
                    snapStep: [1, 1],
                    valid: true,
                    backgroundImage: {
                        url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/6fb60e5bad041fe69d3485d52b87030ddcc17ac8",
                        width: 400,
                        height: 400,
                    },
                    markings: "none",
                    rulerLabel: "",
                    rulerTicks: 10,
                    showProtractor: false,
                    showRuler: false,
                },
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const exponentialQuestion: PerseusRenderer = {
    content:
        "The interactive graph below contains the graph of $y=3^x$ as a dashed curve, with the points $(0,1)$ and $(1,3)$ highlighted.\n\n**Adjust the movable graph to draw $y=-2\\cdot 3^x+5$.**\n\n[[☃ grapher 1]]",
    images: {},
    widgets: {
        "grapher 1": {
            alignment: "default",
            graded: true,
            options: {
                availableTypes: ["exponential"],
                correct: {
                    asymptote: [
                        [-10, 5],
                        [10, 5],
                    ],
                    coords: [
                        [0, 3],
                        [1, -1],
                    ],
                    type: "exponential",
                },
                graph: {
                    backgroundImage: {
                        height: 400,
                        url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/9b46a2a967fc2d1bb7b22e610ba4449aee64d606",
                        width: 400,
                    },
                    editableSettings: ["graph", "snap", "image"],
                    gridStep: [1, 1],
                    labels: ["x", "y"],
                    markings: "none",
                    range: [
                        [-8, 8],
                        [-8, 8],
                    ],
                    rulerLabel: "",
                    rulerTicks: 10,
                    showProtractor: false,
                    showRuler: false,
                    showTooltips: false,
                    snapStep: [1, 1],
                    step: [1, 1],
                    valid: true,
                },
            },
            static: false,
            type: "grapher",
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const linearQuestion: PerseusRenderer = {
    content: "**Graph $5x+3y=15$.**\n\n[[☃ grapher 1]]",
    images: {},
    widgets: {
        "grapher 1": {
            type: "grapher",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                correct: {
                    type: "linear",
                    coords: [
                        [0, 5],
                        [3, 0],
                    ],
                },
                availableTypes: ["linear"],
                graph: {
                    editableSettings: ["graph", "snap", "image"],
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    labels: ["x", "y"],
                    step: [1, 1],
                    gridStep: [1, 1],
                    snapStep: [1, 1],
                    valid: true,
                    backgroundImage: {
                        url: null,
                    },
                    markings: "graph",
                    rulerLabel: "",
                    rulerTicks: 10,
                    showTooltips: false,
                    showProtractor: false,
                    showRuler: false,
                },
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const logarithmQuestion: PerseusRenderer = {
    content:
        "The interactive graph below contains the graph of $y=\\log_2(x)$ as a dashed curve, with the points $(1,0)$ and $(2,1)$ highlighted.\n\n**Adjust the movable graph to draw $y=4\\log_2(x+6)-7$.**\n\n[[☃ grapher 1]]",
    images: {},
    widgets: {
        "grapher 1": {
            alignment: "default",
            graded: true,
            options: {
                availableTypes: ["logarithm"],
                correct: {
                    asymptote: [
                        [-6, -10],
                        [-6, 10],
                    ],
                    coords: [
                        [-4, -3],
                        [-5, -7],
                    ],
                    type: "logarithm",
                },
                graph: {
                    backgroundImage: {
                        height: 400,
                        url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/ca5bbe65051d1e84dc6c0965865ce61402997946",
                        width: 400,
                    },
                    editableSettings: ["graph", "snap", "image"],
                    gridStep: [1, 1],
                    labels: ["x", "y"],
                    markings: "none",
                    range: [
                        [-8, 8],
                        [-8, 8],
                    ],
                    rulerLabel: "",
                    rulerTicks: 10,
                    showProtractor: false,
                    showRuler: false,
                    showTooltips: false,
                    snapStep: [1, 1],
                    step: [1, 1],
                    valid: true,
                },
            },
            static: false,
            type: "grapher",
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const quadraticQuestion: PerseusRenderer = {
    content:
        "In conclusion, the vertex of the parabola is at\n\n$(3,-8)$\n\nand the zeros are\n\n$(5,0)$ and $(1,0)$\n\nIn order to graph, we need the vertex and another point. That other point can be one of the zeros we found, like $(1,0)$:\n\n[[☃ grapher 1]]",
    images: {},
    widgets: {
        "grapher 1": {
            alignment: "default",
            graded: true,
            options: {
                availableTypes: ["quadratic"],
                correct: {
                    coords: [
                        [3, -8],
                        [1, 0],
                    ],
                    type: "quadratic",
                },
                graph: {
                    backgroundImage: {
                        url: null,
                    },
                    editableSettings: ["graph", "snap", "image"],
                    gridStep: [1, 1],
                    labels: ["x", "y"],
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
                    snapStep: [1, 1],
                    step: [1, 1],
                    valid: true,
                },
            },
            static: false,
            type: "grapher",
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const sinusoidQuestion: PerseusRenderer = {
    content:
        "###The answer\n\nWe found that the graph of $y=-4\\cos\\left(x\\right)+3$ has a minimum point at $(0,-1)$ and then intersects its midline at $\\left(\\dfrac{1}{2}\\pi,3\\right)$.\n\n[[☃ grapher 1]]\n  ",
    images: {},
    widgets: {
        "grapher 1": {
            alignment: "default",
            graded: true,
            options: {
                availableTypes: ["sinusoid"],
                correct: {
                    coords: [
                        [1, 3],
                        [0, -1],
                    ],
                    type: "sinusoid",
                },
                graph: {
                    backgroundImage: {
                        height: 400,
                        url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/72ac979a8315bfa2a1b802326d9c7f3447c10760",
                        width: 400,
                    },
                    editableSettings: ["graph", "snap", "image"],
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
                    snapStep: [1, 1],
                    step: [1, 1],
                    valid: true,
                },
            },
            static: false,
            type: "grapher",
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const multipleAvailableTypesQuestion: PerseusRenderer = {
    content:
        "Let $f(x)=- 2^{-x}-x+5$ and let $g(x)=3|x-1|-3$.  \n\nThe graph of $y=f(x)$ is shown below.\n\n**Use the interactive graph to sketch a graph of $y=g(x)$. **\n\n[[☃ grapher 1]]\n\n",
    images: {},
    widgets: {
        "grapher 1": {
            alignment: "default",
            graded: true,
            options: {
                availableTypes: [
                    "linear",
                    "absolute_value",
                    "quadratic",
                    "exponential",
                    "logarithm",
                ],
                correct: {
                    coords: [
                        [1, -3],
                        [2, 0],
                    ],
                    type: "absolute_value",
                },
                graph: {
                    backgroundImage: {
                        height: 400,
                        url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/1c79f8ae7a226fc3dedd9218cf14810e1580424f",
                        width: 400,
                    },
                    editableSettings: ["graph", "snap", "image"],
                    gridStep: [1, 1],
                    labels: ["x", "y"],
                    markings: "graph",
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    rulerLabel: "",
                    rulerTicks: 10,
                    showProtractor: false,
                    showRuler: false,
                    snapStep: [1, 1],
                    step: [1, 1],
                    valid: true,
                },
            },
            static: false,
            type: "grapher",
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const simpleQuestion: PerseusRenderer = {
    content:
        "Put one dot on { x:0, y:0 } and one dot on { x:5, y:5 }\n\n[[☃ grapher 1]]",
    widgets: {
        "grapher 1": {
            type: "grapher",
            options: {
                correct: {
                    type: "linear",
                    coords: [
                        [0, 0],
                        [5, 5],
                    ],
                },
                availableTypes: ["linear"],
                graph: {
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    labels: ["x", "y"],
                    step: [1, 1],
                    snapStep: [1, 1],
                    backgroundImage: {
                        url: null,
                    },
                    markings: "graph",
                    rulerLabel: "",
                    rulerTicks: 10,
                },
            },
        },
    },
    images: {},
};

export const staticGrapher: PerseusRenderer = {
    content:
        "Put one dot on { x:0, y:0 } and one dot on { x:5, y:5 }\n\n[[☃ grapher 1]]",
    widgets: {
        "grapher 1": {
            type: "grapher",
            static: true,
            options: {
                correct: {
                    type: "linear",
                    coords: [
                        [0, 0],
                        [5, 5],
                    ],
                },
                availableTypes: ["linear"],
                graph: {
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    labels: ["x", "y"],
                    step: [1, 1],
                    snapStep: [1, 1],
                    backgroundImage: {
                        url: null,
                    },
                    markings: "graph",
                    rulerLabel: "",
                    rulerTicks: 10,
                },
            },
        },
    },
    images: {},
};
