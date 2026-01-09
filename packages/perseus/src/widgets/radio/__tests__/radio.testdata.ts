import {
    type PerseusRenderer,
    generateRadioWidget,
    generateTestPerseusRenderer,
    generateRadioOptions,
    generateRadioChoice,
    generateSimpleRadioQuestion,
    generateGradedGroupSetWidget,
} from "@khanacademy/perseus-core";

export const question: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "Which of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
    widgets: {
        "radio 1": generateRadioWidget({
            options: generateRadioOptions({
                choices: [
                    generateRadioChoice("$-8$ and $8$", {
                        rationale:
                            "The square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number, so $x$ is equal to *only* $8$.",
                    }),
                    generateRadioChoice("$-8$", {
                        rationale:
                            "While $(-8)^2=64$, the square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number.",
                    }),
                    generateRadioChoice("$8$", {
                        correct: true,
                        rationale: "$8$ is the positive square root of $64$.",
                    }),
                    generateRadioChoice(
                        "No value of $x$ satisfies the equation.",
                        {
                            rationale: "$8$ satisfies the equation.",
                        },
                    ),
                ],
            }),
        }),
    },
});

export const questionAndAnswer: [
    PerseusRenderer,
    number,
    ReadonlyArray<number>,
] = [question, 2, [0, 1, 3]];

export const questionWithRationale: PerseusRenderer =
    generateTestPerseusRenderer({
        content:
            "What ship was Jean-Luc Picard's first command?\n\n[[\u2603 radio 1]]\n\n",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    choices: [
                        generateRadioChoice("USS Voyager (NCC-74656)", {
                            rationale: "Commanded by Captain Kathryn Janeway.",
                        }),
                        generateRadioChoice("USS Enterprise (NCC-1701)", {
                            rationale:
                                "\nThis rationale has a blank line at the start, which should **NOT** affect the rendered rationale. More text: " +
                                "Shields up. I recommend we transfer power to phasers and arm the photon torpedoes. Something strange on the detector circuit. " +
                                "The weapons must have disrupted our communicators. You saw something as tasty as meat, but inorganically materialized out of patterns used by our transporters. " +
                                "Captain, the most elementary and valuable statement in science, the beginning of wisdom, is 'I do not know.'" +
                                '\n\n**Top tip!** This is the ship he commands in the series, but it is not his first command. Watch *"The Battle"* (Season 1, Episode 9) for more. And, as always, beware of Ferengi!',
                        }),
                        generateRadioChoice("USS Enterprise (NX-01)", {
                            rationale: "Commanded by Captain Jonathan Archer.",
                        }),
                        generateRadioChoice("USS Stargazer (NCC-2893)", {
                            correct: true,
                            rationale:
                                "**This is the correct choice.** In one of the battles with the Ferengi, he killed the son of DaiMon Bok, who later sought revenge on Picard.",
                        }),
                    ],
                }),
            }),
        },
    });

export const choicesWithImages: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "The following options have images. All but one of them should be on their own line. [[☃ radio 1]]",
    widgets: {
        "radio 1": generateRadioWidget({
            options: generateRadioOptions({
                choices: [
                    generateRadioChoice(
                        "Same \nLine\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\nSame\nLine",
                        {
                            rationale:
                                "The markdown only has single lines between each item, so they should be treated as one complete line.",
                        },
                    ),
                    generateRadioChoice(
                        "Text \n\nBefore\n\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",
                        {
                            rationale:
                                "There are two 'new line' characters between the preceding text and the image. Therefore, the image should be on its own line.",
                        },
                    ),
                    generateRadioChoice(
                        "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\nText \n\nAfter",
                        {
                            rationale:
                                "There are two 'new line' characters between the image and the text that follows. Therefore, the image should be on its own line.",
                        },
                    ),
                    generateRadioChoice(
                        "Text \n\nBefore\n\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\nText \n\nAfter",
                        {
                            rationale:
                                "There are two 'new line' characters between the image and the text that surrounds it. Therefore, the image should be on its own line.",
                        },
                    ),
                    generateRadioChoice(
                        "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",
                        {
                            rationale:
                                "The markdown only has an image (no text), so nothing should be adjusted.",
                        },
                    ),
                    generateRadioChoice(
                        "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",
                        {
                            rationale:
                                "The markdown has two images (no text) with two 'new line' characters between them, so they should be on their own lines.",
                        },
                    ),
                ],
            }),
        }),
    },
});

export const SingleSelectOverflowImageContent: PerseusRenderer =
    generateTestPerseusRenderer({
        content: "Select 9 ponies.[[\u2603 radio 1]]\n\n",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    choices: [
                        generateRadioChoice(
                            "![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",
                            {
                                correct: true,
                                rationale: "Count the ponies in the image.",
                            },
                        ),
                        generateRadioChoice(
                            "![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)",
                            {
                                rationale: "Count the ponies in the image.",
                            },
                        ),
                        generateRadioChoice(
                            "![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)",
                            {
                                rationale: "Count the ponies in the image.",
                            },
                        ),
                    ],
                }),
            }),
        },
    });

export const SingleSelectOverflowContent: PerseusRenderer =
    generateTestPerseusRenderer({
        content: "Which are the same as the number 75?[[\u2603 radio 1]]\n\n",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    choices: [
                        generateRadioChoice(
                            "$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",
                            {
                                correct: true,
                                rationale:
                                    "Add the following numbers to get 75.",
                            },
                        ),
                        generateRadioChoice("$100-50$", {
                            rationale: "Subtract the following numbers.",
                        }),
                        generateRadioChoice("$200-125+10$", {
                            rationale: "Calculate the following numbers.",
                        }),
                        generateRadioChoice("$10+10+10+10$", {
                            rationale: "Add the following numbers.",
                        }),
                    ],
                }),
            }),
        },
    });

export const multiChoiceQuestion: PerseusRenderer = generateTestPerseusRenderer(
    {
        content:
            "**Select all input values for which $g(x)=2$.**\n\n[[\u2603 radio 1]]\n\n ![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/4613e0d9c906b3053fb5523eed83d4f779fdf6bb)",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    hasNoneOfTheAbove: true,
                    multipleSelect: true,
                    randomize: false,
                    choices: [
                        generateRadioChoice("$x=-6$"),
                        generateRadioChoice("$x=4$"),
                        generateRadioChoice("$x=7$"),
                        generateRadioChoice("There is no such input value.", {
                            correct: true,
                            isNoneOfTheAbove: true,
                        }),
                    ],
                }),
            }),
        },
    },
);

export const multiChoiceQuestionSimple: PerseusRenderer =
    generateTestPerseusRenderer({
        content: "What are some ways to say hello?\n\n[[\u2603 radio 1]]",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    hasNoneOfTheAbove: true,
                    multipleSelect: true,
                    choices: [
                        generateRadioChoice("Hola", {
                            correct: true,
                            rationale:
                                "The Spanish-speaking countries typically say Hola.",
                        }),
                        generateRadioChoice("Hey", {
                            correct: true,
                            rationale:
                                "This is used to attract someone's attention.",
                        }),
                        generateRadioChoice("Hi", {
                            correct: true,
                            rationale: "This is used as friendly greeting.",
                        }),
                        generateRadioChoice("Goodbye", {
                            rationale: "Some people like to say Goodbye.",
                        }),
                        generateRadioChoice("None of these", {
                            isNoneOfTheAbove: true,
                        }),
                    ],
                }),
            }),
        },
    });

export const multiChoiceQuestionSimpleOverflowContent: PerseusRenderer =
    generateTestPerseusRenderer({
        content: "Which are the same as the number 75?\n\n[[\u2603 radio 1]]",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    hasNoneOfTheAbove: true,
                    multipleSelect: true,
                    randomize: false,
                    choices: [
                        generateRadioChoice(
                            "$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",
                            {
                                correct: true,
                                rationale:
                                    "Add the following numbers to get 75.",
                            },
                        ),
                        generateRadioChoice(
                            "$5+4+1+9+1+2+2+2+2+2+3+3+3+1+4+4+2+5+5+10+3+2$",
                            {
                                correct: true,
                                rationale:
                                    "Add the following numbers to get 75.",
                            },
                        ),
                        generateRadioChoice("$10+10+10+10+10+10+10+5$", {
                            correct: true,
                            rationale: "Add the following numbers to get 75.",
                        }),
                        generateRadioChoice("$10+10+10+10+10+10+10+3+2$", {
                            rationale: "Add the following numbers to get 75.",
                        }),
                        generateRadioChoice("None of these", {
                            isNoneOfTheAbove: true,
                        }),
                    ],
                }),
            }),
        },
    });

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

export const shuffledQuestion: PerseusRenderer = generateSimpleRadioQuestion({
    randomize: true,
    choices: [
        generateRadioChoice("Incorrect Choice 1"),
        generateRadioChoice("Incorrect Choice 2"),
        generateRadioChoice("Correct Choice", {correct: true}),
        generateRadioChoice("Incorrect Choice 3"),
    ],
});

export const shuffledNoneQuestion: PerseusRenderer =
    generateSimpleRadioQuestion({
        hasNoneOfTheAbove: true,
        randomize: true,
        choices: [
            generateRadioChoice("Incorrect Choice 1"),
            generateRadioChoice("Incorrect Choice 2"),
            generateRadioChoice("Incorrect Choice 3"),
            generateRadioChoice("Incorrect Choice 4"),
            generateRadioChoice("None of the above", {
                correct: true,
                isNoneOfTheAbove: true,
            }),
        ],
    });

export const questionWithUndefinedCorrect: PerseusRenderer =
    generateTestPerseusRenderer({
        content:
            "**Select the correct choice. This tests the LEMS-2909 bug fix.**\n\n[[\u2603 radio 1]]",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    multipleSelect: true,
                    randomize: true,
                    choices: [
                        generateRadioChoice("Choice A", {
                            correct: undefined,
                        }),
                        generateRadioChoice("Choice B", {correct: true}),
                        generateRadioChoice("Choice C", {
                            correct: undefined,
                        }),
                    ],
                }),
            }),
        },
    });

export const overflowContentInGradedGroupSet: PerseusRenderer = {
    content:
        "#Testing scrollbar color when background color exists\n\n[[☃ graded-group-set 1]]\n\n\nFade color should match the background.",
    images: {},
    widgets: {
        "graded-group-set 1": generateGradedGroupSetWidget({
            options: {
                gradedGroups: [
                    {
                        ...SingleSelectOverflowContent,
                        title: "Single Select - Math",
                        widgetEnabled: true,
                        immutableWidgets: false,
                    },
                    {
                        ...SingleSelectOverflowImageContent,
                        title: "Single Select - Image",
                        widgetEnabled: true,
                        immutableWidgets: false,
                    },
                    {
                        ...multiChoiceQuestionSimpleOverflowContent,
                        title: "Multi Choice - Math",
                        widgetEnabled: true,
                        immutableWidgets: false,
                    },
                ],
            },
        }),
    },
};

export const choicesWithGraphie: PerseusRenderer = {
    ...generateTestPerseusRenderer({
        content:
            "The double number line shows that it takes $4$ hours for Karin to fold $28$ paper cranes.\n\n" +
            "![A double number line with 5 equally spaced tick marks. The line labeled Hours, reads from left to right: 0, three unlabeled tick marks, 4. " +
            "The line labeled Cranes, reads from left to right: 0, three unlabeled tick marks, 28.]" +
            "(web+graphie://ka-perseus-graphie.s3.amazonaws.com/669d6011774f3c0f6809553d210b4f51b7e3e4fe)\n\n" +
            "**Select the double number line that shows the other values of hours and cranes.**\n\n[[☃ radio 1]]",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    choices: [
                        generateRadioChoice(
                            "![A double number line with 5 equally spaced tick marks. The line labeled Distance, kilometers, reads from left to right: 0, 1, 2, 3, 4.  The line labeled Elevation, meters, reads from left to right: 0, 40, 80, 120, 160.](web+graphie://ka-perseus-graphie.s3.amazonaws.com/e4bdfd23b56729130cbd113a03c5792bb8790247)",
                            {correct: true},
                        ),
                        generateRadioChoice(
                            "![A double number line with 5 equally spaced tick marks. The line labeled Distance, kilometers, reads from left to right: 0, 1, 2, 3, 4.  The line labeled Elevation, meters, reads from left to right: 0, 80, 100, 120, 140.](web+graphie://ka-perseus-graphie.s3.amazonaws.com/ef0bd0163c21f51752bda0a4102dc29818c75463)",
                        ),
                    ],
                }),
            }),
        },
    }),
    images: {
        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/def25e9c056a6f782f5a8492ae55ee85670f0ab7":
            {
                width: 398,
                height: 80,
            },
        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/2b86af8e76b455f59e53a25a1b577b35a5414216":
            {
                width: 398,
                height: 80,
            },
    },
};

export const choicesWithMathFont = (options?: {
    multipleSelect: boolean;
}): PerseusRenderer => {
    return generateTestPerseusRenderer({
        content:
            "Which of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    multipleSelect: options?.multipleSelect ?? false,
                    choices: [
                        generateRadioChoice(
                            "Both $-8$ and $8$ satisfy the equation $\\sqrt{64}=x$",
                        ),
                        generateRadioChoice(
                            "Only $-8$ satisfies the equation $\\sqrt{64}=x$",
                        ),
                        generateRadioChoice(
                            "Only $8$ satisfies the equation $\\sqrt{64}=x$",
                        ),
                        generateRadioChoice(
                            "No value of $x$ satisfies the equation $\\sqrt{64}=x$",
                        ),
                    ],
                }),
            }),
        },
    });
};
