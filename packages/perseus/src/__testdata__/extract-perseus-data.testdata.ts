import {generateTestPerseusItem} from "@khanacademy/perseus-core";

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
                    hasNoneOfTheAbove: false,
                    multipleSelect: false,
                    randomize: true,
                    choices: [
                        {
                            id: "01",
                            content: "Content 1",
                            correct: true,
                        },
                        {
                            id: "12",
                            content: "Content 2",
                            correct: false,
                        },
                        {
                            id: "23",
                            content: "Content 3",
                            correct: false,
                        },
                        {
                            id: "34",
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
                    hasNoneOfTheAbove: false,
                    multipleSelect: false,
                    randomize: true,
                    choices: [
                        {
                            id: "01",
                            content: "Content 1",
                            correct: true,
                        },
                        {
                            id: "12",
                            content: "Content 2",
                            correct: false,
                        },
                        {
                            id: "23",
                            content: "Content 3",
                            correct: false,
                        },
                        {
                            id: "34",
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
});

export const PerseusItemWithInputNumber = generateTestPerseusItem({
    question: {
        content: "$6 \\text{ tens}+6 \\text { ones} =$ \n[[☃ input-number 1]]",
        images: {} as Record<any, any>,
        widgets: {
            "input-number 1": {
                type: "input-number",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    value: 66,
                    simplify: "required",
                    size: "normal",
                    inexact: false,
                    maxError: 0.1,
                    answerType: "number",
                },
                version: {
                    major: 0,
                    minor: 0,
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
