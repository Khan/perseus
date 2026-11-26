// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
//
// This fixture captures how a sorter item looks BEFORE the `legend` and
// `variant` fields were introduced. The parser must continue to accept this
// shape, leaving `legend` out and defaulting `variant` to "scale", so that
// production content authored prior to the new fields keeps working.
export default {
    question: {
        content: "Arrange the loans by interest rate.\n\n[[☃ sorter 1]]",
        images: {},
        widgets: {
            "sorter 1": {
                type: "sorter",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    correct: ["Car loan", "Student loan", "Credit card"],
                    layout: "horizontal",
                    padding: true,
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
