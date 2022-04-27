// @flow
import type {
    PerseusRenderer,
    RadioWidget,
    PassageWidget,
} from "../../perseus-types.js";

export const question: PerseusRenderer = {
    content:
        "Which of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
    images: {},
    widgets: {
        "radio 1": ({
            graded: true,
            version: {
                major: 1,
                minor: 0,
            },
            static: false,
            type: "radio",
            options: {
                displayCount: null,
                onePerLine: false,
                choices: [
                    {
                        content: "$-8$ and $8$",
                        correct: false,
                        clue: "The square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number, so $x$ is equal to *only* $8$.",
                    },
                    {
                        content: "$-8$",
                        correct: false,
                        clue: "While $(-8)^2=64$, the square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number.",
                    },
                    {
                        content: "$8$",
                        correct: true,
                        isNoneOfTheAbove: false,
                        clue: "$8$ is the positive square root of $64$.",
                    },
                    {
                        content: "No value of $x$ satisfies the equation.",
                        correct: false,
                        isNoneOfTheAbove: false,
                        clue: "$8$ satisfies the equation.",
                    },
                ],
                countChoices: false,
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                randomize: false,
                deselectEnabled: false,
            },
            alignment: "default",
        }: RadioWidget),
    },
};

export const questionAndAnswer: [
    PerseusRenderer,
    number,
    $ReadOnlyArray<number>,
] = [question, 2, [0, 1, 3]];

export const passageWidget: PassageWidget = {
    alignment: "default",
    graded: true,
    options: {
        footnotes: "",
        passageText: "Line 1 {{Reference 1 \n\nis here.}}\n\n{{Another ref}}",
        passageTitle: "",
        showLineNumbers: true,
        static: false,
    },
    static: false,
    type: "passage",
    version: {major: 0, minor: 0},
};

export const questionWithPassage: PerseusRenderer = {
    content:
        "Read the following passage:\n\n[[\u2603 passage 1]]\n\nWhich of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
    images: {},
    widgets: {
        "radio 1": ({
            graded: true,
            version: {
                major: 1,
                minor: 0,
            },
            static: false,
            type: "radio",
            options: {
                displayCount: null,
                choices: [
                    {
                        content: "$-8$ and $8$",
                        correct: false,
                        clue: "The square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number, so $x$ is equal to *only* $8$.",
                    },
                    {
                        content: "$-8$",
                        correct: false,
                        clue: "While $(-8)^2=64$, the square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number.",
                    },
                    {
                        content: "$8$ {{passage-ref 1 1}}\n\n",
                        correct: true,
                        isNoneOfTheAbove: false,
                        clue: "$8$ is the positive square root of $64$.",
                    },
                    {
                        content: "No value of $x$ satisfies the equation.",
                        correct: false,
                        isNoneOfTheAbove: false,
                        clue: "$8$ satisfies the equation.",
                    },
                ],
                countChoices: false,
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                randomize: false,
                deselectEnabled: false,
            },
            alignment: "default",
        }: RadioWidget),
        "passage 1": ({
            alignment: "default",
            graded: true,
            options: {
                footnotes: "",
                passageText:
                    "Here's a passage about the positive square root. It contains a {{reference to something}}.",
                passageTitle: "",
                showLineNumbers: true,
                static: false,
            },
            static: false,
            type: "passage",
            version: {major: 0, minor: 0},
        }: PassageWidget),
    },
};

export const multiChoiceQuestion: PerseusRenderer = {
    content:
        "**Select all input values for which $g(x)=2$.**\n\n[[\u2603 radio 1]]\n\n ![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/4613e0d9c906b3053fb5523eed83d4f779fdf6bb)",
    images: {
        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/4613e0d9c906b3053fb5523eed83d4f779fdf6bb":
            {
                width: 428,
                height: 428,
            },
    },
    widgets: {
        "radio 1": ({
            graded: true,
            version: {
                major: 1,
                minor: 0,
            },
            static: false,
            type: "radio",
            options: {
                onePerLine: true,
                displayCount: null,
                choices: [
                    {
                        content: "$x=-6$",
                        correct: false,
                    },
                    {
                        content: "$x=4$",
                        correct: false,
                    },
                    {
                        content: "$x=7$",
                        isNoneOfTheAbove: false,
                        correct: false,
                    },
                    {
                        content: "There is no such input value.",
                        isNoneOfTheAbove: true,
                        correct: true,
                    },
                ],
                hasNoneOfTheAbove: true,
                multipleSelect: true,
                randomize: false,
                deselectEnabled: false,
            },
            alignment: "default",
        }: RadioWidget),
    },
};

export const multiChoiceQuestionAndAnswer: [
    PerseusRenderer,
    $ReadOnlyArray<number>,
    $ReadOnlyArray<$ReadOnlyArray<number>>,
    $ReadOnlyArray<$ReadOnlyArray<number>>,
] = [
    multiChoiceQuestion,
    [3],
    [[0], [1], [2], [0, 1], [0, 2], [0, 1, 2], [1, 2]],
    [
        [0, 3],
        [0, 1, 2, 3],
    ],
];
