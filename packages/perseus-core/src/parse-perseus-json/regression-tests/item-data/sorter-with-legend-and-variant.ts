// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
//
// This fixture captures how a sorter item looks with the optional `legend`
// and `variant` fields, as the editor writes them. No production content had
// a legend yet when this was added, so it isn't copied from production. The
// parser must continue to accept this shape and round-trip it identically.
export default {
    question: {
        content: "Arrange the events in time order.\n\n[[☃ sorter 1]]",
        images: {},
        widgets: {
            "sorter 1": {
                type: "sorter",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    correct: ["D-Day", "Battle of the Bulge", "V-E Day"],
                    layout: "horizontal",
                    padding: true,
                    variant: "timeline",
                    legend: {
                        startCap: "bar",
                        endCap: "bar",
                        startLabel: "1944",
                        endLabel: "1946",
                        ariaLabel:
                            "Events of World War II, from 1944 at the start to 1946 at the end",
                        position: "below",
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
