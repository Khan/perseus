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
                            id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                            content: "Content 1",
                            correct: true,
                        },
                        {
                            id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                            content: "Content 2",
                            correct: false,
                        },
                        {
                            id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
                            content: "Content 3",
                            correct: false,
                        },
                        {
                            id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
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
                            id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                            content: "Content 1",
                            correct: true,
                        },
                        {
                            id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                            content: "Content 2",
                            correct: false,
                        },
                        {
                            id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
                            content: "Content 3",
                            correct: false,
                        },
                        {
                            id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
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
