// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content: "[[☃ interactive-graph 1]]\n\n",
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
                    labels: ["$x$", "$y$"],
                    labelLocation: "onAxis",
                    showProtractor: false,
                    showTooltips: false,
                    range: [
                        [-10, 10],
                        [-10, 10],
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
                    lockedFigures: [
                        {
                            type: "label",
                            coord: [0, 0],
                            text: "label",
                            color: undefined,
                            size: undefined,
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
