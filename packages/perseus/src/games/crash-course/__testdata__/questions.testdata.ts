/**
 * Test data for Perseus questions used in Crash Course game
 */
import {getDefaultAnswerArea} from "@khanacademy/perseus-core";

import type {PerseusItem} from "@khanacademy/perseus-core";

/**
 * Example addition question: 12 + 8 = 20
 */
export const additionQuestion: PerseusItem = {
    question: {
        content: "What is $12 + 8$?\n\n[[☃ numeric-input 1]]",
        images: {},
        widgets: {
            "numeric-input 1": {
                type: "numeric-input",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    answers: [
                        {
                            value: 20,
                            status: "correct",
                            message: "",
                            strict: false,
                            simplify: "optional",
                            maxError: 0,
                        },
                    ],
                    size: "normal",
                    coefficient: false,
                    labelText: "",
                },
                version: {major: 0, minor: 0},
            },
        },
    },
    answerArea: getDefaultAnswerArea(),
    itemDataVersion: {major: 0, minor: 1},
    hints: [],
};

/**
 * Example subtraction question: 25 - 10 = 15
 */
export const subtractionQuestion: PerseusItem = {
    question: {
        content: "What is $25 - 10$?\n\n[[☃ numeric-input 1]]",
        images: {},
        widgets: {
            "numeric-input 1": {
                type: "numeric-input",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    answers: [
                        {
                            value: 15,
                            status: "correct",
                            message: "",
                            strict: false,
                            simplify: "optional",
                            maxError: 0,
                        },
                    ],
                    size: "normal",
                    coefficient: false,
                    labelText: "",
                },
                version: {major: 0, minor: 0},
            },
        },
    },
    answerArea: getDefaultAnswerArea(),
    itemDataVersion: {major: 0, minor: 1},
    hints: [],
};

/**
 * Example multiplication question: 6 × 7 = 42
 */
export const multiplicationQuestion: PerseusItem = {
    question: {
        content: "What is $6 \\times 7$?\n\n[[☃ numeric-input 1]]",
        images: {},
        widgets: {
            "numeric-input 1": {
                type: "numeric-input",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    answers: [
                        {
                            value: 42,
                            status: "correct",
                            message: "",
                            strict: false,
                            simplify: "optional",
                            maxError: 0,
                        },
                    ],
                    size: "normal",
                    coefficient: false,
                    labelText: "",
                },
                version: {major: 0, minor: 0},
            },
        },
    },
    answerArea: getDefaultAnswerArea(),
    itemDataVersion: {major: 0, minor: 1},
    hints: [],
};

/**
 * Example division question: 24 ÷ 6 = 4
 */
export const divisionQuestion: PerseusItem = {
    question: {
        content: "What is $24 \\div 6$?\n\n[[☃ radio 1]]",
        images: {},
        widgets: {
            "radio 1": {
                type: "radio",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    choices: [
                        {
                            id: "choice-1",
                            content: "3",
                            correct: false,
                        },
                        {
                            id: "choice-2",
                            content: "4",
                            correct: true,
                        },
                        {
                            id: "choice-3",
                            content: "5",
                            correct: false,
                        },
                        {
                            id: "choice-4",
                            content: "6",
                            correct: false,
                        },
                    ],
                    randomize: false,
                    multipleSelect: false,
                    hasNoneOfTheAbove: false,
                    deselectEnabled: false,
                },
                version: {major: 1, minor: 0},
            },
        },
    },
    answerArea: getDefaultAnswerArea(),
    itemDataVersion: {major: 0, minor: 1},
    hints: [],
};

/**
 * All question examples for easy iteration
 */
export const allQuestions = [
    additionQuestion,
    subtractionQuestion,
    multiplicationQuestion,
    divisionQuestion,
];
