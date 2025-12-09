import {
    type PerseusRenderer,
    type PassageWidget,
    generateRadioWidget,
    generateTestPerseusRenderer,
    generateRadioOptions,
} from "@khanacademy/perseus-core";

export const question: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "Which of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
    widgets: {
        "radio 1": generateRadioWidget({
            options: generateRadioOptions({
                choices: [
                    {
                        content: "$-8$ and $8$",
                        correct: false,
                        rationale:
                            "The square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number, so $x$ is equal to *only* $8$.",
                        id: "radio-choice-test-id-0",
                    },
                    {
                        content: "$-8$",
                        correct: false,
                        rationale:
                            "While $(-8)^2=64$, the square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number.",
                        id: "radio-choice-test-id-1",
                    },
                    {
                        content: "$8$",
                        correct: true,
                        rationale: "$8$ is the positive square root of $64$.",
                        id: "radio-choice-test-id-2",
                    },
                    {
                        content: "No value of $x$ satisfies the equation.",
                        correct: false,
                        rationale: "$8$ satisfies the equation.",
                        id: "radio-choice-test-id-3",
                    },
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

export const questionWithPassage: PerseusRenderer = generateTestPerseusRenderer(
    {
        content:
            "Read the following passage:\n\n[[\u2603 passage 1]]\n\nWhich of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
        widgets: {
            "radio 1": generateRadioWidget({
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
                            rationale:
                                "$8$ is the positive square root of $64$.",
                        },
                        {
                            id: "3-3-3-3-3",
                            content: "No value of $x$ satisfies the equation.",
                            correct: false,
                            isNoneOfTheAbove: false,
                            rationale: "$8$ satisfies the equation.",
                        },
                    ],
                },
            }),
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
    },
);

export const questionWithRationale: PerseusRenderer =
    generateTestPerseusRenderer({
        content:
            "What ship was Jean-Luc Picard's first command?\n\n[[\u2603 radio 1]]\n\n",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    choices: [
                        {
                            content: "USS Voyager (NCC-74656)",
                            correct: false,
                            rationale: "Commanded by Captain Kathryn Janeway.",
                            id: "radio-choice-test-id-0",
                        },
                        {
                            content: "USS Enterprise (NCC-1701)",
                            correct: false,
                            rationale:
                                "\nThis rationale has a blank line at the start, which should **NOT** affect the rendered rationale. More text: " +
                                "Shields up. I recommend we transfer power to phasers and arm the photon torpedoes. Something strange on the detector circuit. " +
                                "The weapons must have disrupted our communicators. You saw something as tasty as meat, but inorganically materialized out of patterns used by our transporters. " +
                                "Captain, the most elementary and valuable statement in science, the beginning of wisdom, is 'I do not know.'" +
                                '\n\n**Top tip!** This is the ship he commands in the series, but it is not his first command. Watch *"The Battle"* (Season 1, Episode 9) for more. And, as always, beware of Ferengi!',
                            id: "radio-choice-test-id-1",
                        },
                        {
                            content: "USS Enterprise (NX-01)",
                            correct: false,
                            rationale: "Commanded by Captain Jonathan Archer.",
                            id: "radio-choice-test-id-2",
                        },
                        {
                            content: "USS Stargazer (NCC-2893)",
                            correct: true,
                            rationale:
                                "**This is the correct choice.** In one of the battles with the Ferengi, he killed the son of DaiMon Bok, who later sought revenge on Picard.",
                            id: "radio-choice-test-id-3",
                        },
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
                        {
                            content:
                                "![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",
                            correct: true,
                            rationale: "Count the ponies in the image.",
                            id: "radio-choice-test-id-0",
                        },
                        {
                            content:
                                "![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)",
                            correct: false,
                            rationale: "Count the ponies in the image.",
                            id: "radio-choice-test-id-1",
                        },
                        {
                            content:
                                "![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)",
                            correct: false,
                            rationale: "Count the ponies in the image.",
                            id: "radio-choice-test-id-2",
                        },
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
                        {
                            content: "$x=-6$",
                            correct: false,
                            id: "radio-choice-test-id-0",
                        },
                        {
                            content: "$x=4$",
                            correct: false,
                            id: "radio-choice-test-id-1",
                        },
                        {
                            content: "$x=7$",
                            correct: false,
                            isNoneOfTheAbove: false,
                            id: "radio-choice-test-id-2",
                        },
                        {
                            content: "There is no such input value.",
                            correct: true,
                            isNoneOfTheAbove: true,
                            id: "radio-choice-test-id-3",
                        },
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
                        {
                            content: "Hola",
                            correct: true,
                            rationale:
                                "The Spanish-speaking countries typically say Hola.",
                            id: "radio-choice-test-id-0",
                        },
                        {
                            content: "Hey",
                            correct: true,
                            rationale:
                                "This is used to attract someone's attention.",
                            id: "radio-choice-test-id-1",
                        },
                        {
                            content: "Hi",
                            correct: true,
                            rationale: "This is used as friendly greeting.",
                            id: "radio-choice-test-id-2",
                        },
                        {
                            content: "Goodbye",
                            correct: false,
                            rationale: "Some people like to say Goodbye.",
                            id: "radio-choice-test-id-3",
                        },
                        {
                            content: "None of these",
                            correct: false,
                            isNoneOfTheAbove: true,
                            id: "radio-choice-test-id-4",
                        },
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
                        {
                            content:
                                "$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",
                            correct: true,
                            rationale: "Add the following numbers to get 75.",
                            id: "radio-choice-test-id-0",
                        },
                        {
                            content:
                                "$5+4+1+9+1+2+2+2+2+2+3+3+3+1+4+4+2+5+5+10+3+2$",
                            correct: true,
                            rationale: "Add the following numbers to get 75.",
                            id: "radio-choice-test-id-1",
                        },
                        {
                            content: "$10+10+10+10+10+10+10+5$",
                            correct: true,
                            rationale: "Add the following numbers to get 75.",
                            id: "radio-choice-test-id-2",
                        },
                        {
                            content: "$10+10+10+10+10+10+10+3+2$",
                            correct: false,
                            rationale: "Add the following numbers to get 75.",
                            id: "radio-choice-test-id-3",
                        },
                        {
                            content: "None of these",
                            correct: false,
                            isNoneOfTheAbove: true,
                            id: "radio-choice-test-id-4",
                        },
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

export const shuffledQuestion: PerseusRenderer = generateTestPerseusRenderer({
    content: "[[\u2603 radio 1]]",
    widgets: {
        "radio 1": generateRadioWidget({
            options: generateRadioOptions({
                randomize: true,
                choices: [
                    {
                        content: "Incorrect Choice 1",
                        correct: false,
                        id: "radio-choice-test-id-0",
                    },
                    {
                        content: "Incorrect Choice 2",
                        correct: false,
                        id: "radio-choice-test-id-1",
                    },
                    {
                        content: "Correct Choice",
                        correct: true,
                        id: "radio-choice-test-id-2",
                    },
                    {
                        content: "Incorrect Choice 3",
                        correct: false,
                        id: "radio-choice-test-id-3",
                    },
                ],
            }),
        }),
    },
});

export const shuffledNoneQuestion: PerseusRenderer =
    generateTestPerseusRenderer({
        content: "[[\u2603 radio 1]]",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    hasNoneOfTheAbove: true,
                    randomize: true,
                    choices: [
                        {
                            content: "Incorrect Choice 1",
                            correct: false,
                            id: "radio-choice-test-id-0",
                        },
                        {
                            content: "Incorrect Choice 2",
                            correct: false,
                            id: "radio-choice-test-id-1",
                        },
                        {
                            content: "Incorrect Choice 3",
                            correct: false,
                            id: "radio-choice-test-id-2",
                        },
                        {
                            content: "Incorrect Choice 4",
                            correct: false,
                            id: "radio-choice-test-id-3",
                        },
                        {
                            content: "None of the above",
                            correct: true,
                            isNoneOfTheAbove: true,
                            id: "radio-choice-test-id-4",
                        },
                    ],
                }),
            }),
        },
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
                        {
                            content: "Choice A",
                            correct: undefined,
                            id: "radio-choice-test-id-0",
                        },
                        {
                            content: "Choice B",
                            correct: true,
                            id: "radio-choice-test-id-1",
                        },
                        {
                            content: "Choice C",
                            correct: undefined,
                            id: "radio-choice-test-id-2",
                        },
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
        "graded-group-set 1": {
            type: "graded-group-set",
            alignment: "default",
            static: false,
            graded: true,
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
            version: {major: 0, minor: 0},
        },
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
                        {
                            content:
                                "![A double number line with 5 equally spaced tick marks. The line labeled Distance, kilometers, reads from left to right: 0, 1, 2, 3, 4.  The line labeled Elevation, meters, reads from left to right: 0, 40, 80, 120, 160.](web+graphie://ka-perseus-graphie.s3.amazonaws.com/e4bdfd23b56729130cbd113a03c5792bb8790247)",
                            correct: true,
                            id: "radio-choice-test-id-0",
                        },
                        {
                            content:
                                "![A double number line with 5 equally spaced tick marks. The line labeled Distance, kilometers, reads from left to right: 0, 1, 2, 3, 4.  The line labeled Elevation, meters, reads from left to right: 0, 80, 100, 120, 140.](web+graphie://ka-perseus-graphie.s3.amazonaws.com/ef0bd0163c21f51752bda0a4102dc29818c75463)",
                            correct: false,
                            id: "radio-choice-test-id-1",
                        },
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
                        {
                            content:
                                "Both $-8$ and $8$ satisfy the equation $\\sqrt{64}=x$",
                            correct: false,
                            id: "radio-choice-test-id-0",
                        },
                        {
                            content:
                                "Only $-8$ satisfies the equation $\\sqrt{64}=x$",
                            correct: false,
                            id: "radio-choice-test-id-1",
                        },
                        {
                            content:
                                "Only $8$ satisfies the equation $\\sqrt{64}=x$",
                            correct: false,
                            id: "radio-choice-test-id-2",
                        },
                        {
                            content:
                                "No value of $x$ satisfies the equation $\\sqrt{64}=x$",
                            correct: false,
                            id: "radio-choice-test-id-3",
                        },
                    ],
                }),
            }),
        },
    });
};
