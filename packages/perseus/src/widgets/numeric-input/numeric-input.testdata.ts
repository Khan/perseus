import type {
    PerseusRenderer,
    NumericInputWidget,
} from "@khanacademy/perseus-core";

// Used for testing the NumericInput widget.
export const question1: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: false,
                        value: 1252,
                        simplify: "required",
                        message: "",
                    },
                ],
                labelText: "",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};

// Used for Storybook.
export const defaultQuestion: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: true,
                        value: 1252,
                        simplify: "required",
                        message: "",
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
                    },
                ],
                labelText: "",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};

export const decimalProblem: PerseusRenderer = {
    // Added a floating question mark to keep enough space to show the examples.
    content: "$12 + 0.52 =$ [[\u2603 numeric-input 1]] \n\n‎",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: true,
                        value: 12.52,
                        simplify: "required",
                        message: "",
                        answerForms: ["decimal"],
                    },
                ],
                labelText: "",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};

export const integerProblem: PerseusRenderer = {
    // Added a floating question mark to keep enough space to show the examples.
    content: "$5/5 + 10/10 =$ [[\u2603 numeric-input 1]] \n\n‎",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: true,
                        value: 15,
                        simplify: "required",
                        message: "",
                        answerForms: ["integer"],
                    },
                ],
                labelText: "",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};

export const improperProblem: PerseusRenderer = {
    // Added a floating question mark to keep enough space to show the examples.
    content: "$2/2 + 5/2 =$ [[\u2603 numeric-input 1]] \n\n‎\n\n‎",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: true,
                        value: 3.5,
                        simplify: "optional",
                        message: "",
                        answerForms: ["improper"],
                    },
                ],
                labelText: "",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};

export const piProblem: PerseusRenderer = {
    // Added a floating question mark to keep enough space to show the examples.
    content:
        "$pi * 32 =$ [[\u2603 numeric-input 1]] \n\n‎\n\n Hint: Enter 100.53 to get an approx of pi error.",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: false,
                        value: 100.53096491487338,
                        simplify: "required",
                        message: "",
                        answerForms: ["pi"],
                    },
                ],
                labelText: "",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};

export const mixedProblem: PerseusRenderer = {
    // Added a floating question mark to keep enough space to show the examples.
    content: "$2 + 2/10 =$ [[\u2603 numeric-input 1]] \n\n‎",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: true,
                        value: 2.2,
                        simplify: "optional",
                        message: "",
                        answerForms: ["mixed"],
                    },
                ],
                labelText: "",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};

export const properProblem: PerseusRenderer = {
    // Added a floating question mark to keep enough space to show the examples.
    content: "$3/10 + 2/10 =$ [[\u2603 numeric-input 1]] \n\n‎\n\n‎",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: true,
                        value: 0.5,
                        simplify: "optional",
                        message: "",
                        answerForms: ["proper"],
                    },
                ],
                labelText: "",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};

export const percentageProblem: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        // @ts-expect-error - TS2352 - Conversion of type '{ graded: true; version: { major: number; minor: number; }; static: false; type: "numeric-input"; options: { coefficient: false; static: false; answers: { status: string; maxError: null; strict: false; value: string; simplify: string; message: string; }[]; labelText: string; size: string; }; alignment: string; }' to type 'NumericInputWidget' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
        "numeric-input 1": {
            graded: true,
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: false,
                        value: "33%",
                        simplify: "required",
                        message: "",
                    },
                ],
                labelText: "What's the answer?",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};

export const multipleAnswers: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: false,
                        value: 1,
                        simplify: "required",
                        message: "",
                    },
                    {
                        status: "correct",
                        maxError: null,
                        strict: false,
                        value: 2,
                        simplify: "required",
                        message: "",
                    },
                ],
                labelText: "What's the answer?",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};

export const correctAndWrongAnswers: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: true,
                        value: 0.5,
                        simplify: "required",
                        answerForms: ["proper"],
                        message: "",
                    },
                    {
                        status: "wrong",
                        maxError: null,
                        strict: true,
                        value: 0.5,
                        simplify: "required",
                        answerForms: ["decimal"],
                        message: "",
                    },
                ],
                labelText: "What's the answer?",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};

export const multipleAnswersWithDecimals: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: false,
                        value: 12.2,
                        simplify: "required",
                        message: "",
                        answerForms: ["decimal"],
                    },
                    {
                        status: "correct",
                        maxError: null,
                        strict: false,
                        value: 13.4,
                        simplify: "required",
                        message: "",
                        answerForms: ["decimal"],
                    },
                ],
                labelText: "What's the answer?",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};

export const duplicatedAnswers: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: false,
                        value: 2.4,
                        simplify: "optional",
                        answerForms: ["proper", "mixed", "improper"],
                        message: "",
                    },
                    {
                        status: "correct",
                        maxError: null,
                        strict: false,
                        value: 2.4,
                        simplify: "optional",
                        answerForms: ["proper", "mixed", "improper"],
                        message: "",
                    },
                ],
                labelText: "What's the answer?",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};

export const withCoefficient: PerseusRenderer = {
    content: "$1 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            static: false,
            type: "numeric-input",
            options: {
                coefficient: true,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: false,
                        value: 1,
                        simplify: "required",
                        message: "",
                    },
                ],
                labelText: "What's the answer?",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};

export const question1AndAnswer: [
    question: PerseusRenderer,
    correct: string,
    incorrect: string,
] = [question1, "1252", "1/2"];
