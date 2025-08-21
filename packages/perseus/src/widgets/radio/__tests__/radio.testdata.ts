import {radioQuestionBuilder} from "../radio-question-builder";

import type {
    PerseusRenderer,
    RadioWidget,
    PassageWidget,
} from "@khanacademy/perseus-core";

export const question: PerseusRenderer = radioQuestionBuilder()
    .withContent(
        "Which of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
    )
    .addChoice("$-8$ and $8$", {
        correct: false,
        rationale:
            "The square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number, so $x$ is equal to *only* $8$.",
    })
    .addChoice("$-8$", {
        correct: false,
        rationale:
            "While $(-8)^2=64$, the square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number.",
    })
    .addChoice("$8$", {
        correct: true,
        rationale: "$8$ is the positive square root of $64$.",
    })
    .addChoice("No value of $x$ satisfies the equation.", {
        correct: false,
        rationale: "$8$ satisfies the equation.",
    })
    .build();

export const questionAndAnswer: [
    PerseusRenderer,
    number,
    ReadonlyArray<number>,
] = [question, 2, [0, 1, 3]];

// Can't use radioQuestionBuilder here because it also includes a passage widget.
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
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content: "$-8$ and $8$",
                        correct: false,
                        rationale:
                            "The square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number, so $x$ is equal to *only* $8$.",
                    },
                    {
                        id: "1-1-1-1-1",
                        content: "$-8$",
                        correct: false,
                        rationale:
                            "While $(-8)^2=64$, the square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number.",
                    },
                    {
                        id: "2-2-2-2-2",
                        content: "$8$ {{passage-ref 1 1}}\n\n",
                        correct: true,
                        isNoneOfTheAbove: false,
                        rationale: "$8$ is the positive square root of $64$.",
                    },
                    {
                        id: "3-3-3-3-3",
                        content: "No value of $x$ satisfies the equation.",
                        correct: false,
                        isNoneOfTheAbove: false,
                        rationale: "$8$ satisfies the equation.",
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

// Can't use radioQuestionBuilder here because it also includes a passage widget.
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
                choices: [
                    {
                        id: "4-4-4-4-4",
                        content:
                            "Same \nLine\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\nSame\nLine",
                        correct: false,
                        rationale:
                            "The markdown only has single lines between each item, so they should be treated as one complete line.",
                    },
                    {
                        id: "5-5-5-5-5",
                        content:
                            "Text \n\nBefore\n\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",
                        correct: false,
                        rationale:
                            "There are two 'new line' characters between the preceding text and the image. Therefore, the image should be on its own line.",
                    },
                    {
                        id: "6-6-6-6-6",
                        content:
                            "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\nText \n\nAfter",
                        correct: false,
                        rationale:
                            "There are two 'new line' characters between the image and the text that follows. Therefore, the image should be on its own line.",
                    },
                    {
                        id: "7-7-7-7-7",
                        content:
                            "Text \n\nBefore\n\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\nText \n\nAfter",
                        correct: false,
                        rationale:
                            "There are two 'new line' characters between the image and the text that surrounds it. Therefore, the image should be on its own line.",
                    },
                    {
                        id: "8-8-8-8-8",
                        content:
                            "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",
                        correct: false,
                        rationale:
                            "The markdown only has an image (no text), so nothing should be adjusted.",
                    },
                    {
                        id: "9-9-9-9-9",
                        content:
                            "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",
                        correct: false,
                        rationale:
                            "The markdown has two images (no text) with two 'new line' characters between them, so they should be on their own lines.",
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

export const SingleSelectOverflowImageContent: PerseusRenderer =
    radioQuestionBuilder()
        .withContent("Select 9 ponies.[[\u2603 radio 1]]\n\n")
        .addChoice(
            "![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",
            {correct: true, rationale: "Count the ponies in the image."},
        )
        .addChoice(
            "![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)",
            {correct: false, rationale: "Count the ponies in the image."},
        )
        .addChoice(
            "![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)",
            {correct: false, rationale: "Count the ponies in the image."},
        )
        .build();

// Can't use radioQuestionBuilder here because it also includes a passage widget.
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
                choices: [
                    {
                        id: "10-10-10-10-10",
                        content:
                            "$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",
                        correct: true,
                        rationale: "Add the following numbers to get 75.",
                    },
                    {
                        id: "11-11-11-11-11",
                        content: "$100-50$",
                        correct: false,
                        rationale: "Subtract the following numbers.",
                    },
                    {
                        id: "12-12-12-12-12",
                        content: "$200-125+10$",
                        correct: false,
                        isNoneOfTheAbove: false,
                        rationale: "Calculate the following numbers.",
                    },
                    {
                        id: "13-13-13-13-13",
                        content: "$10+10+10+10$",
                        correct: false,
                        isNoneOfTheAbove: false,
                        rationale: "Add the following numbers.",
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

export const multiChoiceQuestion: PerseusRenderer = radioQuestionBuilder()
    .withContent(
        "**Select all input values for which $g(x)=2$.**\n\n[[\u2603 radio 1]]\n\n ![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/4613e0d9c906b3053fb5523eed83d4f779fdf6bb)",
    )
    .addChoice("$x=-6$", {correct: false})
    .addChoice("$x=4$", {correct: false})
    .addChoice("$x=7$", {correct: false, isNoneOfTheAbove: false})
    .addChoice("There is no such input value.", {
        correct: true,
        isNoneOfTheAbove: true,
    })
    .withHasNoneOfTheAbove(true)
    .withMultipleSelect(true)
    .withRandomize(false)
    .build();

export const multiChoiceQuestionSimple: PerseusRenderer = radioQuestionBuilder()
    .withContent("What are some ways to say hello?\n\n[[\u2603 radio 1]]")
    .addChoice("Hola", {
        correct: true,
        rationale: "The Spanish-speaking countries typically say Hola.",
    })
    .addChoice("Hey", {
        correct: true,
        rationale: "This is used to attract someone's attention.",
    })
    .addChoice("Hi", {
        correct: true,
        rationale: "This is used as friendly greeting.",
    })
    .addChoice("Goodbye", {
        correct: false,
        rationale: "Some people like to say Goodbye.",
    })
    .addChoice("None of these", {correct: false, isNoneOfTheAbove: true})
    .withHasNoneOfTheAbove(true)
    .withMultipleSelect(true)
    .build();

export const multiChoiceQuestionSimpleOverflowContent: PerseusRenderer =
    radioQuestionBuilder()
        .withContent(
            "Which are the same as the number 75?\n\n[[\u2603 radio 1]]",
        )
        .addChoice("$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$", {
            correct: true,
            rationale: "Add the following numbers to get 75.",
        })
        .addChoice("$5+4+1+9+1+2+2+2+2+2+3+3+3+1+4+4+2+5+5+10+3+2$", {
            correct: true,
            rationale: "Add the following numbers to get 75.",
        })
        .addChoice("$10+10+10+10+10+10+10+5$", {
            correct: true,
            rationale: "Add the following numbers to get 75.",
        })
        .addChoice("$10+10+10+10+10+10+10+3+2$", {
            correct: false,
            rationale: "Add the following numbers to get 75.",
        })
        .addChoice("None of these", {correct: false, isNoneOfTheAbove: true})
        .withHasNoneOfTheAbove(true)
        .withMultipleSelect(true)
        .withRandomize(false)
        .build();

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

export const shuffledQuestion: PerseusRenderer = radioQuestionBuilder()
    .withContent("[[\u2603 radio 1]]")
    .addChoice("Incorrect Choice 1", {correct: false})
    .addChoice("Incorrect Choice 2", {correct: false})
    .addChoice("Correct Choice", {correct: true})
    .addChoice("Incorrect Choice 3", {correct: false})
    .withRandomize(true)
    .build();

export const shuffledNoneQuestion: PerseusRenderer = radioQuestionBuilder()
    .withContent("[[\u2603 radio 1]]")
    .addChoice("Incorrect Choice 1", {correct: false})
    .addChoice("Incorrect Choice 2", {correct: false})
    .addChoice("Incorrect Choice 3", {correct: false})
    .addChoice("Incorrect Choice 4", {correct: false})
    .addChoice("None of the above", {correct: true, isNoneOfTheAbove: true})
    .withHasNoneOfTheAbove(true)
    .withRandomize(true)
    .build();

export const questionWithUndefinedCorrect: PerseusRenderer =
    radioQuestionBuilder()
        .withContent(
            "**Select the correct choice. This tests the LEMS-2909 bug fix.**\n\n[[\u2603 radio 1]]",
        )
        .addChoice("Choice A", {correct: undefined})
        .addChoice("Choice B", {correct: true})
        .addChoice("Choice C", {correct: undefined})
        .withMultipleSelect(true)
        .withRandomize(true)
        .build();
