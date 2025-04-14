import { Hint } from "@khanacademy/perseus-core";
import {generateTestPerseusItem} from "../util/test-utils";

const blankHint: Hint = {content: "", widgets: {}, images: {}, replace: false};

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
        {...blankHint, content: "Hint #1"},
        {...blankHint, content: "Hint #2"},
        {...blankHint, content: "Hint #3"},
    ],
    answerArea: null,
    itemDataVersion: {major: 0, minor: 0},
    answer: null,
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
            ...blankHint,
            content:
                "$\\blueD6 \\text{ tens}+\\goldD6 \\text { ones} =\\blueD{10}+\\blueD{10}+\\blueD{10}+\\blueD{10}+\\blueD{10}+\\blueD{10}+\\goldD6$ ",
        },
        {
            ...blankHint,
            content:
                "$\\blueD6 \\text{ tens}+\\goldD6 \\text { ones} =\\blueD{60}+\\goldD6$ ",
        },
        {
            ...blankHint,
            content:
                "$\\blueD6 \\text{ tens}+\\goldD6 \\text { ones} =\\blueD{6}\\goldD6$ ",
        },
    ],
});
