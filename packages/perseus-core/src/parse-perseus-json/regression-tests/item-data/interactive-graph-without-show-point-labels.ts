// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
//
// This fixture captures how an interactive-graph item looks BEFORE the
// optional `showPointLabels` field was introduced. The parser must continue
// to accept this shape and round-trip it identically, so that production
// content authored prior to the new field keeps working unchanged.
export default {
    question: {
        content: "[[☃ interactive-graph 1]]",
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
                        bottom: 0,
                        left: 0,
                        scale: 1,
                        url: null,
                    },
                    markings: "graph",
                    labels: ["x", "y"],
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
                    lockedFigures: [],
                    graph: {
                        type: "polygon",
                        numSides: 3,
                        startCoords: [
                            [0, 0],
                            [4, 0],
                            [2, 3],
                        ],
                        pointLabels: ["A", "B", "C"],
                    },
                    correct: {
                        type: "polygon",
                        numSides: 3,
                        coords: [
                            [0, 0],
                            [4, 0],
                            [2, 3],
                        ],
                        match: "exact",
                        pointLabels: ["A", "B", "C"],
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
