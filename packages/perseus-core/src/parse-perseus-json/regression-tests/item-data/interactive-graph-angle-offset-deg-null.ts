// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "**Construct a $130^\\circ$ angle.**\n\n[[☃ interactive-graph 1]]\n\n\n",
        images: {
            "https://ka-perseus-images.s3.amazonaws.com/02564832cdaa56aa507437df41dd13e1fefbe595.png":
                {
                    height: 160,
                    width: 398,
                },
            "https://ka-perseus-images.s3.amazonaws.com/37521922ea42bbbf67622075e1ea51e095f37479.png":
                {
                    height: 291,
                    width: 401,
                },
        },
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
                    markings: "none",
                    labels: ["x", "y"],
                    labelLocation: "onAxis",
                    showProtractor: true,
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
                        type: "angle",
                        startCoords: [
                            [7, -9],
                            [0, -9],
                            [7, -7.60585899672032],
                        ],
                        allowReflexAngles: false,
                        angleOffsetDeg: null,
                        showAngles: false,
                        snapDegrees: 5,
                    },
                    correct: {
                        coords: [
                            [6.322005947128351, -9],
                            [0, -9],
                            [-4.937270536554472, -3.1159901004516657],
                        ],
                        match: "congruent",
                        showAngles: false,
                        snapDegrees: 5,
                        type: "angle",
                        hasBeenInteractedWith: true,
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        snapStep: [0.5, 0.5],
                        angleOffsetDeg: null,
                        allowReflexAngles: false,
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
