import type {
    PerseusRenderer,
    RadioWidget,
    PassageWidget,
} from "@khanacademy/perseus-core";

export const question: PerseusRenderer = {
    content:
        "Which of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
    images: {},
    widgets: {
        "radio 1": {
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
        } as RadioWidget,
    },
};

export const questionAndAnswer: [
    PerseusRenderer,
    number,
    ReadonlyArray<number>,
] = [question, 2, [0, 1, 3]];

export const questionWithPassage: PerseusRenderer = {
    content:
        "Read the following passage:\n\n[[\u2603 passage 1]]\n\nWhich of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
    images: {},
    widgets: {
        "radio 1": {
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
        } as RadioWidget,
        "passage 1": {
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
        } as PassageWidget,
    },
};

export const choicesWithImages: PerseusRenderer = {
    content:
        "The following options have images. All but one of them should be on their own line. [[☃ radio 1]]",
    images: {},
    widgets: {
        "radio 1": {
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
                        content:
                            "Same \nLine\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\nSame\nLine",
                        correct: false,
                        clue: "The markdown only has single lines between each item, so they should be treated as one complete line.",
                    },
                    {
                        content:
                            "Text \n\nBefore\n\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",
                        correct: false,
                        clue: "There are two 'new line' characters between the preceding text and the image. Therefore, the image should be on its own line.",
                    },
                    {
                        content:
                            "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\nText \n\nAfter",
                        correct: false,
                        clue: "There are two 'new line' characters between the image and the text that follows. Therefore, the image should be on its own line.",
                    },
                    {
                        content:
                            "Text \n\nBefore\n\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\nText \n\nAfter",
                        correct: false,
                        clue: "There are two 'new line' characters between the image and the text that surrounds it. Therefore, the image should be on its own line.",
                    },
                    {
                        content:
                            "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",
                        correct: false,
                        clue: "The markdown only has an image (no text), so nothing should be adjusted.",
                    },
                    {
                        content:
                            "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",
                        correct: false,
                        clue: "The markdown has two images (no text) with two 'new line' characters between them, so they should be on their own lines.",
                    },
                ],
                countChoices: false,
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                randomize: false,
                deselectEnabled: false,
            },
            alignment: "default",
        } as RadioWidget,
        "passage 1": {
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
        } as PassageWidget,
    },
};

export const SingleSelectOverflowImageContent: PerseusRenderer = {
    content: "Select 9 ponies.[[\u2603 radio 1]]\n\n",
    images: {},
    widgets: {
        "radio 1": {
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
                        content:
                            "![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",
                        correct: true,
                        clue: "Count the ponies in the image.",
                    },
                    {
                        content:
                            "![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)",
                        correct: false,
                        clue: "Count the ponies in the image.",
                    },
                    {
                        content:
                            "![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)",
                        correct: false,
                        isNoneOfTheAbove: false,
                        clue: "Count the ponies in the image.",
                    },
                ],
                countChoices: false,
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                randomize: false,
                deselectEnabled: false,
            },
            alignment: "default",
        } as RadioWidget,
    },
};

export const SingleSelectOverflowContent: PerseusRenderer = {
    content: "Which are the same as the number 75?[[\u2603 radio 1]]\n\n",
    images: {},
    widgets: {
        "radio 1": {
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
                        content:
                            "$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",
                        correct: true,
                        clue: "Add the following numbers to get 75.",
                    },
                    {
                        content: "$100-50$",
                        correct: false,
                        clue: "Subtract the following numbers.",
                    },
                    {
                        content: "$200-125+10$",
                        correct: false,
                        isNoneOfTheAbove: false,
                        clue: "Calculate the following numbers.",
                    },
                    {
                        content: "$10+10+10+10$",
                        correct: false,
                        isNoneOfTheAbove: false,
                        clue: "Add the following numbers.",
                    },
                ],
                countChoices: false,
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                randomize: false,
                deselectEnabled: false,
            },
            alignment: "default",
        } as RadioWidget,
        "passage 1": {
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
        } as PassageWidget,
    },
};

export const multiChoiceQuestion: PerseusRenderer = {
    content:
        "**Select all input values for which $g(x)=2$.**\n\n[[\u2603 radio 1]]\n\n ![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/4613e0d9c906b3053fb5523eed83d4f779fdf6bb)",
    images: {},
    widgets: {
        "radio 1": {
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
        } as RadioWidget,
    },
};

export const multiChoiceQuestionSimple: PerseusRenderer = {
    content: "What are some ways to say hello?\n\n[[\u2603 radio 1]]",
    images: {},
    widgets: {
        "radio 1": {
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
                        content: "Hola",
                        isNoneOfTheAbove: false,
                        correct: true,
                        clue: "The Spanish-speaking countries typically say Hola.",
                    },
                    {
                        content: "Hey",
                        isNoneOfTheAbove: false,
                        correct: true,
                        clue: "This is used to attract someone's attention.",
                    },
                    {
                        content: "Hi",
                        isNoneOfTheAbove: false,
                        correct: true,
                        clue: "This is used as friendly greeting.",
                    },
                    {
                        content: "Goodbye",
                        isNoneOfTheAbove: false,
                        correct: false,
                        clue: "Some people like to say Goodbye.",
                    },
                    {
                        content: "None of these",
                        isNoneOfTheAbove: true,
                        correct: false,
                    },
                ],
                hasNoneOfTheAbove: true,
                multipleSelect: true,
                randomize: false,
                deselectEnabled: false,
            },
            alignment: "default",
        } as RadioWidget,
    },
};

export const multiChoiceQuestionSimpleOverflowContent: PerseusRenderer = {
    content: "Which are the same as the number 75?\n\n[[\u2603 radio 1]]",
    images: {},
    widgets: {
        "radio 1": {
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
                        content:
                            "$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",
                        isNoneOfTheAbove: false,
                        correct: true,
                        clue: "Add the following numbers to get 75.",
                    },
                    {
                        content:
                            "$5+4+1+9+1+2+2+2+2+2+3+3+3+1+4+4+2+5+5+10+3+2$",
                        isNoneOfTheAbove: false,
                        correct: true,
                        clue: "Add the following numbers to get 75.",
                    },
                    {
                        content: "$10+10+10+10+10+10+10+5$",
                        isNoneOfTheAbove: false,
                        correct: true,
                        clue: "Add the following numbers to get 75.",
                    },
                    {
                        content: "$10+10+10+10+10+10+10+3+2$",
                        isNoneOfTheAbove: false,
                        correct: false,
                        clue: "Add the following numbers to get 75.",
                    },
                    {
                        content: "None of these",
                        isNoneOfTheAbove: true,
                        correct: false,
                    },
                ],
                hasNoneOfTheAbove: true,
                multipleSelect: true,
                randomize: false,
                deselectEnabled: false,
            },
            alignment: "default",
        } as RadioWidget,
    },
};

export const multiChoiceQuestionAndAnswer: [
    PerseusRenderer,
    ReadonlyArray<number>,
    ReadonlyArray<ReadonlyArray<number>>,
    ReadonlyArray<ReadonlyArray<number>>,
] = [
    multiChoiceQuestion,
    [3],
    [[0], [1], [2], [0, 1], [0, 2], [0, 1, 2], [1, 2]],
    [
        [0, 3],
        [0, 1, 2, 3],
    ],
];

export const shuffledQuestion: PerseusRenderer = {
    content: "[[\u2603 radio 1]]",
    images: {},
    widgets: {
        "radio 1": {
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
                        content: "Incorrect Choice 1",
                        correct: false,
                    },
                    {
                        content: "Incorrect Choice 2",
                        correct: false,
                    },
                    {
                        content: "Correct Choice",
                        correct: true,
                    },
                    {
                        content: "Incorrect Choice 3",
                        correct: false,
                    },
                ],
                countChoices: false,
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                randomize: true,
                deselectEnabled: false,
            },
            alignment: "default",
        } as RadioWidget,
    },
};

export const shuffledNoneQuestion: PerseusRenderer = {
    content: "[[\u2603 radio 1]]",
    images: {},
    widgets: {
        "radio 1": {
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
                        content: "Incorrect Choice 1",
                        correct: false,
                    },
                    {
                        content: "Incorrect Choice 2",
                        correct: false,
                    },
                    {
                        content: "Incorrect Choice 3",
                        correct: false,
                    },
                    {
                        content: "Incorrect Choice 4",
                        correct: false,
                    },
                    {
                        content: "None of the above",
                        correct: true,
                        isNoneOfTheAbove: true,
                    },
                ],
                countChoices: false,
                hasNoneOfTheAbove: true,
                multipleSelect: false,
                randomize: true,
                deselectEnabled: false,
            },
            alignment: "default",
        } as RadioWidget,
    },
};
