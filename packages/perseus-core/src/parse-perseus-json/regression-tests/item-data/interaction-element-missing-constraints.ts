// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    answerArea: {
        calculator: false,
        options: {
            content: "",
            images: {},
            widgets: {},
        },
        type: "multiple",
    },
    hints: [],
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    question: {
        content: "[[☃ interaction 1]]",
        images: {},
        widgets: {
            "interaction 1": {
                graded: true,
                options: {
                    elements: [
                        {
                            key: "point-e4cd66",
                            options: {
                                color: "#28AE7B",
                                coordX: "28",
                                coordY: "35",
                            },
                            type: "point",
                        },
                        {
                            key: "point-463a3c",
                            options: {
                                color: "#FF00AF",
                                coordX: "28",
                                coordY: "35-f\\left(28\\right)",
                            },
                            type: "point",
                        },
                        {
                            key: "point-d97614",
                            options: {
                                color: "#28AE7B",
                                coordX: "17",
                                coordY: "28",
                            },
                            type: "point",
                        },
                        {
                            key: "point-334a70",
                            options: {
                                color: "#FF00AF",
                                coordX: "17",
                                coordY: "28-f\\left(17\\right)",
                            },
                            type: "point",
                        },
                        {
                            key: "point-31ac1c",
                            options: {
                                color: "#28AE7B",
                                coordX: "6",
                                coordY: "18",
                            },
                            type: "point",
                        },
                        {
                            key: "point-94798c",
                            options: {
                                color: "#FF00AF",
                                coordX: "6",
                                coordY: "18-f\\left(6\\right)",
                            },
                            type: "point",
                        },
                        {
                            key: "point-deb26e",
                            options: {
                                color: "#28AE7B",
                                coordX: "42",
                                coordY: "47",
                            },
                            type: "point",
                        },
                        {
                            key: "point-e8d73e",
                            options: {
                                color: "#FF00AF",
                                coordX: "42",
                                coordY: "47-f\\left(42\\right)",
                            },
                            type: "point",
                        },
                        {
                            key: "function-cd4dbc",
                            options: {
                                color: "#6495ED",
                                funcName: "f",
                                rangeMax: "50",
                                rangeMin: "-5",
                                strokeDasharray: "",
                                strokeWidth: 2,
                                value: "\\frac{\\left(y_1-y_0\\right)}{\\left(x_1-x_0\\right)}\\left(x-x_0\\right)+y_0",
                            },
                            type: "function",
                        },
                        {
                            key: "movable-point-64f8ec",
                            options: {
                                constraint: "none",
                                constraintFn: "0",
                                snap: 0.5,
                                startX: "0",
                                startY: "10",
                                varSubscript: 0,
                            },
                            type: "movable-point",
                        },
                        {
                            key: "movable-point-4336fb",
                            options: {
                                constraint: "none",
                                constraintFn: "0",
                                snap: 0.5,
                                startX: "40",
                                startY: "30",
                                varSubscript: 1,
                            },
                            type: "movable-point",
                        },
                    ],
                    graph: {
                        backgroundImage: {
                            bottom: 0,
                            left: 0,
                            scale: 1,
                            url: null,
                        },
                        box: [400, 400],
                        editableSettings: ["canvas", "graph"],
                        gridStep: [2, 2],
                        labels: ["x", "y"],
                        markings: "graph",
                        range: [
                            [-5, 50],
                            [-5, 50],
                        ],
                        rulerLabel: "",
                        rulerTicks: 10,
                        showProtractor: false,
                        showRuler: false,
                        snapStep: [1, 1],
                        tickStep: [5, 5],
                        valid: true,
                    },
                },
                type: "interaction",
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
};
