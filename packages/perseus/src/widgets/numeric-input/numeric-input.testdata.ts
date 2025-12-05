import {
    type PerseusRenderer,
    generateTestPerseusRenderer,
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
} from "@khanacademy/perseus-core";

// Used for testing the NumericInput widget.
export const question1: PerseusRenderer = generateTestPerseusRenderer({
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [generateNumericInputAnswer({value: 1252})],
            }),
        }),
    },
});

// Used for Storybook.
export const defaultQuestion: PerseusRenderer = generateTestPerseusRenderer({
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        value: 1252,
                        // We're including all the answer forms to make it easier to edit in storybook.
                        // Note: that setting all of the answer forms results in the example tooltip being hidden,
                        // which mimics our default behaviour for the widget.
                        answerForms: [
                            "integer",
                            "mixed",
                            "improper",
                            "proper",
                            "decimal",
                            "pi",
                        ],
                    }),
                ],
            }),
        }),
    },
});

export const decimalProblem: PerseusRenderer = generateTestPerseusRenderer({
    // Added a floating question mark to keep enough space to show the examples.
    content: "$12 + 0.52 =$ [[\u2603 numeric-input 1]] \n\n‎",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        value: 12.52,
                        answerForms: ["decimal"],
                    }),
                ],
            }),
        }),
    },
});

export const integerProblem: PerseusRenderer = generateTestPerseusRenderer({
    // Added a floating question mark to keep enough space to show the examples.
    content: "$5/5 + 10/10 =$ [[\u2603 numeric-input 1]] \n\n‎",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        value: 15,
                        answerForms: ["integer"],
                    }),
                ],
            }),
        }),
    },
});

export const improperProblem: PerseusRenderer = generateTestPerseusRenderer({
    // Added a floating question mark to keep enough space to show the examples.
    content: "$2/2 + 5/2 =$ [[\u2603 numeric-input 1]] \n\n‎\n\n‎",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        value: 3.5,
                        answerForms: ["improper"],
                    }),
                ],
            }),
        }),
    },
});

export const piProblem: PerseusRenderer = generateTestPerseusRenderer({
    // Added a floating question mark to keep enough space to show the examples.
    content:
        "$pi * 32 =$ [[\u2603 numeric-input 1]] \n\n‎\n\n Hint: Enter 100.53 to get an approx of pi error.",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        value: 100.53096491487338,
                        answerForms: ["pi"],
                    }),
                ],
            }),
        }),
    },
});

export const mixedProblem: PerseusRenderer = generateTestPerseusRenderer({
    // Added a floating question mark to keep enough space to show the examples.
    content: "$2 + 2/10 =$ [[\u2603 numeric-input 1]] \n\n‎",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        strict: true,
                        value: 2.2,
                        simplify: "optional",
                        answerForms: ["mixed"],
                    }),
                ],
            }),
        }),
    },
});

export const properProblem: PerseusRenderer = generateTestPerseusRenderer({
    // Added a floating question mark to keep enough space to show the examples.
    content: "$3/10 + 2/10 =$ [[\u2603 numeric-input 1]] \n\n‎\n\n‎",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        strict: true,
                        value: 0.5,
                        simplify: "optional",
                        answerForms: ["proper"],
                    }),
                ],
            }),
        }),
    },
});

export const percentageProblem: PerseusRenderer = generateTestPerseusRenderer({
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number'.
                        value: "33%",
                    }),
                ],
                labelText: "What's the answer?",
            }),
        }),
    },
});

export const multipleAnswers: PerseusRenderer = generateTestPerseusRenderer({
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        value: 1,
                    }),
                    generateNumericInputAnswer({
                        value: 2,
                    }),
                ],
                labelText: "What's the answer?",
            }),
        }),
    },
});

export const correctAndWrongAnswers: PerseusRenderer =
    generateTestPerseusRenderer({
        content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
        widgets: {
            "numeric-input 1": generateNumericInputWidget({
                options: generateNumericInputOptions({
                    answers: [
                        generateNumericInputAnswer({
                            value: 0.5,
                            strict: true,
                            answerForms: ["proper"],
                        }),
                        generateNumericInputAnswer({
                            status: "wrong",
                            value: 0.5,
                            strict: true,
                            answerForms: ["decimal"],
                        }),
                    ],
                    labelText: "What's the answer?",
                }),
            }),
        },
    });

export const multipleAnswersWithDecimals: PerseusRenderer =
    generateTestPerseusRenderer({
        content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
        widgets: {
            "numeric-input 1": generateNumericInputWidget({
                options: generateNumericInputOptions({
                    answers: [
                        generateNumericInputAnswer({
                            value: 12.2,
                            answerForms: ["decimal"],
                        }),
                        generateNumericInputAnswer({
                            value: 13.4,
                            answerForms: ["decimal"],
                        }),
                    ],
                    labelText: "What's the answer?",
                }),
            }),
        },
    });

export const duplicatedAnswers: PerseusRenderer = generateTestPerseusRenderer({
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        value: 2.4,
                        simplify: "optional",
                        answerForms: ["proper", "mixed", "improper"],
                    }),
                    generateNumericInputAnswer({
                        value: 2.4,
                        simplify: "optional",
                        answerForms: ["proper", "mixed", "improper"],
                    }),
                ],
                labelText: "What's the answer?",
            }),
        }),
    },
});

export const withCoefficient: PerseusRenderer = generateTestPerseusRenderer({
    content: "$1 =$ [[\u2603 numeric-input 1]] ",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                coefficient: true,
                answers: [
                    generateNumericInputAnswer({
                        value: 1,
                    }),
                ],
                labelText: "What's the answer?",
            }),
        }),
    },
});

export const question1AndAnswer: [
    question: PerseusRenderer,
    correct: string,
    incorrect: string,
] = [question1, "1252", "1/2"];
