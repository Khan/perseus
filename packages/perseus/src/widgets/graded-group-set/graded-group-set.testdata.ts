import {
    generateGradedGroupOptions,
    generateGradedGroupSetWidget,
    generateImageWidget,
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateRadioChoice,
    generateRadioWidget,
    generateTestPerseusRenderer,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

export const article1: PerseusRenderer = {
    content:
        "#Section 1: Adding tenths less than one\n\n[[☃ graded-group-set 1]]\n\n\nBeautiful, let's move on to problems with whole numbers and tenths.",
    images: {},
    widgets: {
        "graded-group-set 1": generateGradedGroupSetWidget({
            options: {
                gradedGroups: [
                    generateGradedGroupOptions({
                        title: "Problem 1a",
                        content: "$0.5 + 0.4 =$   [[☃ numeric-input 1]]",
                        widgets: {
                            "numeric-input 1": generateNumericInputWidget({
                                options: generateNumericInputOptions({
                                    answers: [
                                        generateNumericInputAnswer({
                                            value: 0.9,
                                        }),
                                    ],
                                }),
                            }),
                        },
                        hasHint: true,
                        hint: generateTestPerseusRenderer({
                            content:
                                "There are many ways to solve this problem. Let's see two student solutions.\n\n###Student A's solution:\n\nI thought in terms of tenths.\n\n$\\phantom{=}0.5 + 0.4$\n\n$=5$ tenths $+ ~4$ tenths\n\n$=9$ tenths\n\n$=0.9$\n\n###Student B's solution:\n\nI used tenths grids.\n\n[[☃ image 1]]\n\n[[☃ image 2]]\n\n[[☃ image 3]]\n\n$\\blueD{0.5} + \\greenD{0.4} = 0.9$\n\n###The answer:\n\n$0.5 + 0.4 = 0.9$",
                            widgets: {
                                "image 3": generateImageWidget({
                                    options: {
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/cda00c119dac3e52c8ed150ef4a9a37355f5c713",
                                            width: 234,
                                            height: 132,
                                        },
                                        alt: "A square divided into 10 rows to show tenths. 5 of the rows are shaded in blue and 4 of the rows are shaded in green.",
                                    },
                                }),
                                "image 2": generateImageWidget({
                                    options: {
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/217d580bc0baddb903bbcb648fc8d3ea3d0f4408",
                                            width: 180,
                                            height: 132,
                                        },
                                        alt: "A square divided into 10 rows to show tenths. 4 of the rows are shaded to represent 4 tenths.",
                                    },
                                }),
                                "image 1": generateImageWidget({
                                    options: {
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/2a56a60275b7227ed9c5b89e489587c8cb13eb7b",
                                            width: 180,
                                            height: 132,
                                        },
                                        alt: "A square divided into 10 rows to show tenths. 5 of the rows are shaded to represent 5 tenths.",
                                    },
                                }),
                            },
                        }),
                        widgetEnabled: true,
                        immutableWidgets: false,
                    }),
                    generateGradedGroupOptions({
                        title: "Problem 1b",
                        content: "$0.6 + 0.4 =$   [[☃ numeric-input 1]]",
                        widgets: {
                            "numeric-input 1": generateNumericInputWidget({
                                options: generateNumericInputOptions({
                                    answers: [
                                        generateNumericInputAnswer({value: 1}),
                                    ],
                                }),
                            }),
                        },
                        hasHint: true,
                        hint: generateTestPerseusRenderer({
                            content:
                                "There are many ways to solve this problem. Let's see two student solutions.\n\n###Student A's solution:\n\nI thought in terms of tenths.\n\n$\\phantom{=}0.6 + 0.4$\n\n$=6$ tenths $+ ~4$ tenths\n\n$=10$ tenths\n\n$=1$\n\n###Student B's solution:\n\nI used tenths grids.\n\n[[☃ image 1]]\n\n[[☃ image 2]]\n\n[[☃ image 3]]\n\n$\\blueD{0.6} + \\greenD{0.4} = 1$\n\n###The answer:\n\n$0.6 + 0.4 = 1$",
                            widgets: {
                                "image 3": generateImageWidget({
                                    options: {
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/54fbc06d92097119f1be5d1679391596209296a7",
                                            width: 234,
                                            height: 132,
                                        },
                                        alt: "A square divided into 10 rows to show tenths. 6 of the rows are shaded in blue and 4 of the rows are shaded in green.",
                                    },
                                }),
                                "image 2": generateImageWidget({
                                    options: {
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/217d580bc0baddb903bbcb648fc8d3ea3d0f4408",
                                            width: 180,
                                            height: 132,
                                        },
                                        alt: "A square divided into 10 rows to show tenths. 4 of the rows are shaded to represent 4 tenths.",
                                    },
                                }),
                                "image 1": generateImageWidget({
                                    options: {
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/8e353e65446a4322f53d640aba33dccd69b0874c",
                                            width: 180,
                                            height: 132,
                                        },
                                        alt: "A square divided into 10 rows to show tenths. 6 of the rows are shaded to represent 6 tenths.",
                                    },
                                }),
                            },
                        }),
                        widgetEnabled: true,
                        immutableWidgets: false,
                    }),
                    generateGradedGroupOptions({
                        title: "Problem 1c",
                        content: "$0.8 + 0.4 =$   [[☃ numeric-input 1]]",
                        widgets: {
                            "numeric-input 1": generateNumericInputWidget({
                                options: generateNumericInputOptions({
                                    answers: [
                                        generateNumericInputAnswer({
                                            value: 1.2,
                                        }),
                                    ],
                                }),
                            }),
                        },
                        hasHint: true,
                        hint: generateTestPerseusRenderer({
                            content:
                                "There are many ways to solve this problem. Let's see two student solutions.\n\n###Student A's solution:\n\nI thought in terms of tenths.\n\n$\\phantom{=}0.8 + 0.4$\n\n$=8$ tenths $+ ~4$ tenths\n\n$=12$ tenths\n\n$=1.2$\n\n###Student B's solution:\n\nI used tenths grids.\n\n[[☃ image 1]]\n\n[[☃ image 2]]\n\n[[☃ image 3]]\n$\\blueD{0.8} + \\greenD{0.4} = 1.2$\n\n###The answer:\n\n$ 0.8+0.4=1.2 $",
                            widgets: {
                                "image 3": generateImageWidget({
                                    options: {
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/4b595ea53e5edc2b5991f2171f384a7eae2eeb24",
                                            width: 354,
                                            height: 132,
                                        },
                                        alt: "Two equal sized squares. Each square is divided into 10 rows to show tenths. In the first square, 8 of the rows are shaded in blue and 2 of the rows are shaded in green. In the second square, 2 of the rows are shaded in green.",
                                    },
                                }),
                                "image 2": generateImageWidget({
                                    options: {
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/217d580bc0baddb903bbcb648fc8d3ea3d0f4408",
                                            width: 180,
                                            height: 132,
                                        },
                                        alt: "A square divided into 10 rows to show tenths. 4 of the rows are shaded to represent 4 tenths.",
                                    },
                                }),
                                "image 1": generateImageWidget({
                                    options: {
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/58d09bc7bdfadbd860c55734bf146578f047edbc",
                                            width: 180,
                                            height: 132,
                                        },
                                        alt: "A square divided into 10 rows to show tenths. 8 of the rows are shaded to represent 8 tenths.",
                                    },
                                }),
                            },
                        }),
                        widgetEnabled: true,
                        immutableWidgets: false,
                    }),
                ],
            },
        }),
    },
};

export const groupSetRadioRationaleQuestion: PerseusRenderer =
    generateTestPerseusRenderer({
        content:
            "#Section 1: Adding tenths less than one\n\n[[☃ graded-group-set 1]]\n\n\nBeautiful, let's move on to problems with whole numbers and tenths.",
        widgets: {
            "graded-group-set 1": generateGradedGroupSetWidget({
                options: {
                    gradedGroups: [
                        generateGradedGroupOptions({
                            title: "Question 1",
                            content:
                                "Select the correct answer.\n\n[[\u2603 radio 1]]\n\n",
                            widgets: {
                                "radio 1": generateRadioWidget({
                                    options: {
                                        choices: [
                                            generateRadioChoice("Incorrect", {
                                                rationale:
                                                    "This is not the correct answer.",
                                            }),
                                            generateRadioChoice("Incorrect", {
                                                rationale:
                                                    "This is not the correct answer.",
                                            }),
                                            generateRadioChoice("Correct", {
                                                correct: true,
                                                rationale:
                                                    "This is the correct answer.",
                                            }),
                                            generateRadioChoice("Incorrect", {
                                                rationale:
                                                    "This is not the correct answer.",
                                            }),
                                        ],
                                    },
                                }),
                            },
                            hint: generateTestPerseusRenderer({
                                content: "This is an example hint.",
                            }),
                            widgetEnabled: true,
                            immutableWidgets: false,
                        }),
                        generateGradedGroupOptions({
                            title: "Question 2",
                            content:
                                "What are some ways to say hello?\n\n[[\u2603 radio 1]]",
                            widgets: {
                                "radio 1": generateRadioWidget({
                                    options: {
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
                                                rationale:
                                                    "This is used as friendly greeting.",
                                            }),
                                            generateRadioChoice("Goodbye", {
                                                rationale:
                                                    "Some people like to say Goodbye.",
                                            }),
                                            generateRadioChoice(
                                                "None of these",
                                                {
                                                    correct: false,
                                                    isNoneOfTheAbove: true,
                                                },
                                            ),
                                        ],
                                        hasNoneOfTheAbove: true,
                                        multipleSelect: true,
                                    },
                                }),
                            },
                            hint: generateTestPerseusRenderer({
                                content: "This is an example hint.",
                            }),
                            widgetEnabled: true,
                            immutableWidgets: false,
                        }),
                    ],
                },
            }),
        },
    });
