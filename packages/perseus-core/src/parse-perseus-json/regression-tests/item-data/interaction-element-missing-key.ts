// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "# Functions introduction\n\nA function is something that maps one value to another.\n\nHere is a function that maps an $\\orange\\text{input dot}$ on the top to an $\\blue\\text{output dot}$ on the bottom. Try dragging the $\\orange\\text{input dot}$ on the left and see what $\\blue\\text{output}$ the function maps it to below:\n\n[[☃ interaction 1]]\n\nNot all functions are quite so simple! For example, there is no rule that the $\\blue\\text{output}$ has to increase when the $\\orange\\text{input}$ increases:\n\n[[☃ interaction 2]]\n\nThere is also no rule that a function has to map to a different value for each different input value:\n\n[[☃ interaction 3]]\n\nOr that it even has to ever map to a different value at all!\n\n[[☃ interaction 4]]\n\nBut that's sort of unsatisfying! so here's another function that demonstrates all of those concepts:\n\n[[☃ interaction 5]]\n\nNext, we'll look at some other representations of functions!",
        images: {
            "https://ka-perseus-graphie.s3.amazonaws.com/da8df81c78b22f5c69d477d8eabfb583968eaf84.png":
                {
                    width: 400,
                    height: 70,
                },
            "https://ka-perseus-graphie.s3.amazonaws.com/b59fc02ca1aae800977b8793ed22f647a1aa75ee.png":
                {
                    width: 425,
                    height: 150,
                },
        },
        widgets: {
            "interaction 1": {
                type: "interaction",
                graded: true,
                options: {
                    graph: {
                        editableSettings: ["canvas", "graph"],
                        box: [400, 200],
                        labels: ["", ""],
                        range: [
                            [0, 10],
                            [-6, 6],
                        ],
                        gridStep: [1, 3],
                        markings: "graph",
                        snapStep: [0.5, 1.5],
                        valid: true,
                        backgroundImage: {
                            url: null,
                            scale: 1,
                            bottom: 0,
                            left: 0,
                        },
                        showProtractor: false,
                        showRuler: false,
                        rulerLabel: "",
                        rulerTicks: 10,
                        tickStep: [1, 2],
                        scale: [40, 16.666666666666668],
                    },
                    elements: [
                        {
                            type: "movable-point",
                            options: {
                                startX: "5",
                                startY: "3",
                                constraint: "snap",
                                snap: 1,
                                constraintFn: "-3",
                                constraintXMin: "1",
                                constraintXMax: "8",
                                constraintYMin: "3",
                                constraintYMax: "3",
                                varSubscript: 0,
                            },
                        },
                        {
                            type: "point",
                            options: {
                                coordX: "x_0+1",
                                coordY: "-3",
                                color: "#6495ED",
                            },
                        },
                    ],
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "interaction 2": {
                type: "interaction",
                graded: true,
                options: {
                    graph: {
                        editableSettings: ["canvas", "graph"],
                        box: [400, 200],
                        labels: ["", ""],
                        range: [
                            [0, 10],
                            [-6, 6],
                        ],
                        gridStep: [1, 3],
                        markings: "graph",
                        snapStep: [0.5, 1.5],
                        valid: true,
                        backgroundImage: {
                            url: null,
                            scale: 1,
                            bottom: 0,
                            left: 0,
                        },
                        showProtractor: false,
                        showRuler: false,
                        rulerLabel: "",
                        rulerTicks: 10,
                        tickStep: [1, 2],
                        scale: [40, 16.666666666666668],
                    },
                    elements: [
                        {
                            type: "movable-point",
                            options: {
                                startX: "5",
                                startY: "3",
                                constraint: "snap",
                                snap: 1,
                                constraintFn: "-3",
                                constraintXMin: "1",
                                constraintXMax: "9",
                                constraintYMin: "3",
                                constraintYMax: "3",
                                varSubscript: 0,
                            },
                        },
                        {
                            type: "point",
                            options: {
                                coordX: "10-x_0",
                                coordY: "-3",
                                color: "#6495ED",
                            },
                        },
                    ],
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "interaction 3": {
                type: "interaction",
                graded: true,
                options: {
                    graph: {
                        editableSettings: ["canvas", "graph"],
                        box: [400, 200],
                        labels: ["", ""],
                        range: [
                            [0, 10],
                            [-6, 6],
                        ],
                        gridStep: [1, 3],
                        markings: "graph",
                        snapStep: [0.5, 1.5],
                        valid: true,
                        backgroundImage: {
                            url: null,
                            scale: 1,
                            bottom: 0,
                            left: 0,
                        },
                        showProtractor: false,
                        showRuler: false,
                        rulerLabel: "",
                        rulerTicks: 10,
                        tickStep: [1, 2],
                        scale: [40, 16.666666666666668],
                    },
                    elements: [
                        {
                            type: "movable-point",
                            options: {
                                startX: "5",
                                startY: "3",
                                constraint: "snap",
                                snap: 1,
                                constraintFn: "-3",
                                constraintXMin: "1",
                                constraintXMax: "9",
                                constraintYMin: "3",
                                constraintYMax: "3",
                                varSubscript: 0,
                            },
                        },
                        {
                            type: "point",
                            options: {
                                coordX: "\\sin\\left(x_0\\cdot\\frac{\\pi}{2}\\right)+5",
                                coordY: "-3",
                                color: "#6495ED",
                            },
                        },
                    ],
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "interaction 4": {
                type: "interaction",
                graded: true,
                options: {
                    graph: {
                        editableSettings: ["canvas", "graph"],
                        box: [400, 200],
                        labels: ["", ""],
                        range: [
                            [0, 10],
                            [-6, 6],
                        ],
                        gridStep: [1, 3],
                        markings: "graph",
                        snapStep: [0.5, 1.5],
                        valid: true,
                        backgroundImage: {
                            url: null,
                            scale: 1,
                            bottom: 0,
                            left: 0,
                        },
                        showProtractor: false,
                        showRuler: false,
                        rulerLabel: "",
                        rulerTicks: 10,
                        tickStep: [1, 2],
                        scale: [40, 16.666666666666668],
                    },
                    elements: [
                        {
                            type: "movable-point",
                            options: {
                                startX: "5",
                                startY: "3",
                                constraint: "snap",
                                snap: 1,
                                constraintFn: "-3",
                                constraintXMin: "1",
                                constraintXMax: "9",
                                constraintYMin: "3",
                                constraintYMax: "3",
                                varSubscript: 0,
                            },
                        },
                        {
                            type: "point",
                            options: {
                                coordX: "4",
                                coordY: "-3",
                                color: "#6495ED",
                            },
                        },
                    ],
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "interaction 5": {
                type: "interaction",
                graded: true,
                options: {
                    graph: {
                        editableSettings: ["canvas", "graph"],
                        box: [400, 200],
                        labels: ["", ""],
                        range: [
                            [0, 10],
                            [-6, 6],
                        ],
                        gridStep: [1, 3],
                        markings: "graph",
                        snapStep: [0.5, 1.5],
                        valid: true,
                        backgroundImage: {
                            url: null,
                            scale: 1,
                            bottom: 0,
                            left: 0,
                        },
                        showProtractor: false,
                        showRuler: false,
                        rulerLabel: "",
                        rulerTicks: 10,
                        tickStep: [1, 2],
                        scale: [40, 16.666666666666668],
                    },
                    elements: [
                        {
                            type: "movable-point",
                            options: {
                                startX: "5",
                                startY: "3",
                                constraint: "snap",
                                snap: 1,
                                constraintFn: "-3",
                                constraintXMin: "1",
                                constraintXMax: "9",
                                constraintYMin: "3",
                                constraintYMax: "3",
                                varSubscript: 0,
                            },
                        },
                        {
                            type: "point",
                            options: {
                                coordX: "5-\\left|x_0-5\\right|",
                                coordY: "-3",
                                color: "#6495ED",
                            },
                        },
                    ],
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
};
