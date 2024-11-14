import {generateTestPerseusItem} from "../util/test-utils";

export const PerseusItemWithRadioWidget = generateTestPerseusItem({
    question: {
        content: "Here's a radio widget: [[\u2603 radio 1]] \n\n",
        images: {},
        widgets: {
            "radio 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "radio",
                options: {
                    countChoices: false,
                    deselectEnabled: false,
                    displayCount: null,
                    hasNoneOfTheAbove: false,
                    multipleSelect: false,
                    randomize: true,
                    choices: [
                        {
                            content: "Content 1",
                            correct: true,
                        },
                        {
                            content: "Content 2",
                            correct: false,
                        },
                        {
                            content: "Content 3",
                            correct: false,
                        },
                        {
                            content: "Content 4",
                            correct: false,
                        },
                    ],
                },
                alignment: "default",
            },
            // This widget is not used in the content for testing purposes.
            "radio 2": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "radio",
                options: {
                    countChoices: false,
                    deselectEnabled: false,
                    displayCount: null,
                    hasNoneOfTheAbove: false,
                    multipleSelect: false,
                    randomize: true,
                    choices: [
                        {
                            content: "Content 1",
                            correct: true,
                        },
                        {
                            content: "Content 2",
                            correct: false,
                        },
                        {
                            content: "Content 3",
                            correct: false,
                        },
                        {
                            content: "Content 4",
                            correct: false,
                        },
                    ],
                },
                alignment: "default",
            },
        },
    },
    hints: [
        {content: "Hint #1", images: {}, widgets: {}},
        {content: "Hint #2", images: {}, widgets: {}},
        {content: "Hint #3", images: {}, widgets: {}},
    ],
    answerArea: null,
    itemDataVersion: {major: 0, minor: 0},
    answer: null,
});

export const PerseusItemWithNumericInput = generateTestPerseusItem({
    question: {
        content:
            "$6 \\text{ tens}+6 \\text { ones} =$ \n[[☃ numeric-input 1]]",
        images: {} as Record<any, any>,
        widgets: {
            "numeric-input 1": {
                type: "numeric-input",
                graded: true,
                options: {
                    static: false,
                    answers: [
                        {
                            value: 66,
                            status: "correct",
                            message: "",
                            simplify: "required",
                            strict: true,
                            maxError: 0,
                        },
                    ],
                    size: "normal",
                    coefficient: false,
                    labelText: "",
                    rightAlign: false,
                },
            },
        },
    },
    hints: [
        {
            replace: false,
            content:
                "$\\blueD6 \\text{ tens}+\\goldD6 \\text { ones} =\\blueD{10}+\\blueD{10}+\\blueD{10}+\\blueD{10}+\\blueD{10}+\\blueD{10}+\\goldD6$ ",
            images: {} as Record<any, any>,
            widgets: {} as Record<any, any>,
        },
        {
            replace: false,
            content:
                "$\\blueD6 \\text{ tens}+\\goldD6 \\text { ones} =\\blueD{60}+\\goldD6$ ",
            images: {} as Record<any, any>,
            widgets: {} as Record<any, any>,
        },
        {
            replace: false,
            content:
                "$\\blueD6 \\text{ tens}+\\goldD6 \\text { ones} =\\blueD{6}\\goldD6$ ",
            images: {} as Record<any, any>,
            widgets: {} as Record<any, any>,
        },
    ],
});
