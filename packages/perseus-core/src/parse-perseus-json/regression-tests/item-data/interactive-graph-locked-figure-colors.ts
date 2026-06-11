// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "A graph with locked figures of different colors.\n\n[[☃ interactive-graph 1]]\n\n",
        images: {},
        widgets: {
            "interactive-graph 1": {
                type: "interactive-graph",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    step: [1, 0.5],
                    backgroundImage: {
                        url: null,
                    },
                    markings: "graph",
                    labels: ["$x$", "$y$"],
                    labelLocation: "onAxis",
                    showProtractor: false,
                    showTooltips: false,
                    range: [
                        [0, 8],
                        [0, 2],
                    ],
                    showAxisArrows: {
                        xMin: true,
                        xMax: true,
                        yMin: true,
                        yMax: true,
                    },
                    showAxisTicks: {
                        x: true,
                        y: true,
                    },
                    gridStep: [0.5, 0.1],
                    snapStep: [0.25, 0.05],
                    lockedFigures: [
                        {
                            type: "point",
                            coord: [1, 1],
                            color: "blue",
                            filled: true,
                            labels: [],
                        },
                        {
                            type: "point",
                            coord: [2, 1],
                            color: "gold",
                            filled: true,
                            labels: [],
                        },
                        {
                            type: "point",
                            coord: [3, 1],
                            color: "green",
                            filled: true,
                            labels: [],
                        },
                        {
                            type: "point",
                            coord: [4, 1],
                            color: "grayH",
                            filled: true,
                            labels: [],
                        },
                        {
                            type: "point",
                            coord: [5, 1],
                            color: "purple",
                            filled: true,
                            labels: [],
                        },
                        {
                            type: "point",
                            coord: [5, 1],
                            color: "pink",
                            filled: true,
                            labels: [],
                        },
                        {
                            type: "point",
                            coord: [6, 1],
                            color: "red",
                            filled: true,
                            labels: [],
                        },
                        {
                            type: "point",
                            coord: [7, 1],
                            // deprecated color
                            color: "orange",
                            filled: true,
                            labels: [],
                        },
                    ],
                    graph: {
                        type: "none",
                    },
                    correct: {
                        type: "none",
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        calculator: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTable: false,
        periodicTableWithKey: false,
    },
    hints: [],
};
