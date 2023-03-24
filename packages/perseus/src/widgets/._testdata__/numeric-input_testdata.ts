import type {PerseusRenderer, NumericInputWidget} from '../../perseus-types';

export const question1: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": ({
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
                        strict: false,
                        value: 1252,
                        simplify: "required",
                        message: "",
                    },
                ],
                labelText: "",
                size: "normal",
            },
            alignment: "default",
        } as NumericInputWidget),
    },
};

export const question2: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": ({
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
                        strict: false,
                        value: 1252,
                        simplify: "required",
                        message: "",
                    },
                ],
                labelText: "What's the answer?",
                size: "normal",
            },
            alignment: "default",
        } as NumericInputWidget),
    },
};

export const percentageProblem: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": ({
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
                        strict: false,
                        // $FlowFixMe[incompatible-cast] I need this to be a percent
                        value: "33%",
                        simplify: "required",
                        message: "",
                    },
                ],
                labelText: "What's the answer?",
                size: "normal",
            },
            alignment: "default",
        } as NumericInputWidget),
    },
};

export const multipleAnswers: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": ({
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
            alignment: "default",
        } as NumericInputWidget),
    },
};

export const multipleAnswersWithDecimals: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": ({
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
                        strict: false,
                        value: 12.2,
                        simplify: "required",
                        message: "",
                    },
                    {
                        status: "correct",
                        maxError: null,
                        strict: false,
                        value: 13.4,
                        simplify: "required",
                        message: "",
                    },
                ],
                labelText: "What's the answer?",
                size: "normal",
            },
            alignment: "default",
        } as NumericInputWidget),
    },
};

export const duplicatedAnswers: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": ({
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
            alignment: "default",
        } as NumericInputWidget),
    },
};

export const withCoefficient: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": ({
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
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
            alignment: "default",
        } as NumericInputWidget),
    },
};

export const question1AndAnswer: [PerseusRenderer, string, string] = [
    question1,
    "1252",
    "1/2",
];
