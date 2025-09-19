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
        content: "[[☃ number-line 1]]\n\n",
        images: {},
        widgets: {
            "number-line 1": {
                graded: true,
                options: {
                    correctRel: "eq",
                    correctX: 0.5,
                    divisionRange: [1, 12],
                    initialX: 0,
                    isInequality: false,
                    isTickCtrl: false,
                    labelRange: [null, null],
                    labelStyle: "improper",
                    labelTicks: true,
                    numDivisions: 8,
                    range: [0, 1],
                    snapDivisions: 1,
                    tickStep: null,
                },
                type: "number-line",
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
};
