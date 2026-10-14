// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "**Label each point on the number line with the correct value.**\n\nOrder L-R: -2.9, -2 5/8, -7/3\n\n------\n\n[[☃ label-image 1]]",
        images: {},
        widgets: {
            "label-image 1": {
                type: "label-image",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    choices: [
                        "$-\\dfrac{7}{3}$",
                        "$-2\\dfrac{5}{8}$",
                        "$-2.9$",
                    ],
                    imageAlt:
                        "A number line from negative 6 halves to negative 3 halves, labeled in increments of 1 half. There are three points on the line, labeled from left to right with a, b, and c.",
                    imageUrl:
                        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/05faa925d02e5effd3069bf24da4777e3ae1a28b",
                    imageWidth: 360,
                    imageHeight: 160,
                    markers: [
                        {
                            answers: ["$-2.9$"],
                            label: "Point a is the leftmost of two points between negative 6 halves and negative 5 halves.",
                            x: 14,
                            y: 51.2,
                        },
                        {
                            answers: ["$-2\\dfrac{5}{8}$"],
                            label: "Point b is the rightmost of two points between negative 6 halves and negative 5 halves.",
                            x: 29.2,
                            y: 51.2,
                        },
                        {
                            answers: ["$-\\dfrac{7}{3}$"],
                            label: "Point c is between negative 5 halves and negative 4 halves.",
                            x: 45.5,
                            y: 50.5,
                        },
                    ],
                    multipleAnswers: false,
                    hideChoicesFromInstructions: false,
                    preferredPopoverDirection: "DOWN",
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    hints: [],
    answerArea: {
        calculator: true,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTable: true,
        periodicTableWithKey: true,
    },
};
