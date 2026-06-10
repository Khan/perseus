/**
 * Question Generator
 *
 * Generates random Perseus math questions for the game.
 * Questions include addition, subtraction, multiplication, and division.
 */
import {getDefaultAnswerArea} from "@khanacademy/perseus-core";

import type {PerseusItem} from "@khanacademy/perseus-core";

/**
 * Question types for the math blaster game
 */
export type QuestionType =
    | "addition"
    | "subtraction"
    | "multiplication"
    | "division";

/**
 * Generate a random integer between min and max (inclusive)
 */
function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a Perseus item for addition questions
 */
function generateAdditionQuestion(): PerseusItem {
    const a = randomInt(1, 50);
    const b = randomInt(1, 50);
    const answer = a + b;

    return {
        question: {
            content: `What is $${a} + ${b}$?\n\n[[☃ numeric-input 1]]`,
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
                                value: answer,
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
}

/**
 * Generate a Perseus item for subtraction questions
 */
function generateSubtractionQuestion(): PerseusItem {
    const a = randomInt(10, 50);
    const b = randomInt(1, a); // Ensure positive result
    const answer = a - b;

    return {
        question: {
            content: `What is $${a} - ${b}$?\n\n[[☃ numeric-input 1]]`,
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
                                value: answer,
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
}

/**
 * Generate a Perseus item for multiplication questions
 */
function generateMultiplicationQuestion(): PerseusItem {
    const a = randomInt(2, 12);
    const b = randomInt(2, 12);
    const answer = a * b;

    return {
        question: {
            content: `What is $${a} \\times ${b}$?\n\n[[☃ numeric-input 1]]`,
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
                                value: answer,
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
}

/**
 * Generate a Perseus item for division questions
 */
function generateDivisionQuestion(): PerseusItem {
    const divisor = randomInt(2, 12);
    const quotient = randomInt(2, 12);
    const dividend = divisor * quotient; // Ensure exact division

    // Generate wrong answers
    const wrongAnswers = [quotient + 1, quotient - 1, quotient + 2].filter(
        (val) => val > 0,
    );

    // Shuffle all answers
    const allAnswers = [quotient, ...wrongAnswers.slice(0, 3)];
    const shuffled = allAnswers.sort(() => Math.random() - 0.5);

    const choices = shuffled.map((val, index) => ({
        id: `choice-${index}-${Date.now()}-${Math.random()}`,
        content: String(val),
        correct: val === quotient,
    }));

    return {
        question: {
            content: `What is $${dividend} \\div ${divisor}$?\n\n[[☃ radio 1]]`,
            images: {},
            widgets: {
                "radio 1": {
                    type: "radio",
                    alignment: "default",
                    static: false,
                    graded: true,
                    options: {
                        choices,
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
}

/**
 * Generate a random math question
 */
export function generateQuestion(): PerseusItem {
    const types: QuestionType[] = [
        "addition",
        "subtraction",
        "multiplication",
        "division",
    ];
    const randomType = types[randomInt(0, types.length - 1)];

    switch (randomType) {
        case "addition":
            return generateAdditionQuestion();
        case "subtraction":
            return generateSubtractionQuestion();
        case "multiplication":
            return generateMultiplicationQuestion();
        case "division":
            return generateDivisionQuestion();
    }
}
