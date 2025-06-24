import type {PerseusRenderer} from "@khanacademy/perseus-core";

export const article1: PerseusRenderer = {
    content:
        "#Section 1: Adding tenths less than one\n\n[[☃ graded-group-set 1]]\n\n\nBeautiful, let's move on to problems with whole numbers and tenths.",
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
                        title: "Problem 1a",
                        content: "$0.5 + 0.4 =$   [[☃ numeric-input 1]]",
                        widgets: {
                            "numeric-input 1": {
                                type: "numeric-input",
                                alignment: "default",
                                static: false,
                                graded: true,
                                options: {
                                    static: false,
                                    answers: [
                                        {
                                            value: 0.9,
                                            status: "correct",
                                            message: "",
                                            simplify: "required",
                                            strict: false,
                                            maxError: null,
                                        },
                                    ],
                                    size: "normal",
                                    coefficient: false,
                                    labelText: "",
                                },
                                version: {major: 0, minor: 0},
                            },
                        },
                        images: {},
                        hasHint: true,
                        hint: {
                            content:
                                "There are many ways to solve this problem. Let's see two student solutions.\n\n###Student A's solution:\n\nI thought in terms of tenths.\n\n$\\phantom{=}0.5 + 0.4$\n\n$=5$ tenths $+ ~4$ tenths\n\n$=9$ tenths\n\n$=0.9$\n\n###Student B's solution:\n\nI used tenths grids.\n\n[[☃ image 1]]\n\n[[☃ image 2]]\n\n[[☃ image 3]]\n\n$\\blueD{0.5} + \\greenD{0.4} = 0.9$\n\n###The answer:\n\n$0.5 + 0.4 = 0.9$",
                            images: {},
                            widgets: {
                                "image 3": {
                                    type: "image",
                                    alignment: "block",
                                    static: false,
                                    graded: true,
                                    options: {
                                        static: false,
                                        title: "",
                                        range: [
                                            [0, 10],
                                            [0, 10],
                                        ],
                                        box: [234, 132],
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/cda00c119dac3e52c8ed150ef4a9a37355f5c713",
                                            width: 234,
                                            height: 132,
                                        },
                                        labels: [],
                                        alt: "A square divided into 10 rows to show tenths. 5 of the rows are shaded in blue and 4 of the rows are shaded in green.",
                                        caption: "",
                                    },
                                    version: {major: 0, minor: 0},
                                },
                                "image 2": {
                                    type: "image",
                                    alignment: "block",
                                    static: false,
                                    graded: true,
                                    options: {
                                        static: false,
                                        title: "",
                                        range: [
                                            [0, 10],
                                            [0, 10],
                                        ],
                                        box: [180, 132],
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/217d580bc0baddb903bbcb648fc8d3ea3d0f4408",
                                            width: 180,
                                            height: 132,
                                        },
                                        labels: [],
                                        alt: "A square divided into 10 rows to show tenths. 4 of the rows are shaded to represent 4 tenths.",
                                        caption: "",
                                    },
                                    version: {major: 0, minor: 0},
                                },
                                "image 1": {
                                    options: {
                                        static: false,
                                        title: "",
                                        range: [
                                            [0, 10],
                                            [0, 10],
                                        ],
                                        box: [180, 132],
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/2a56a60275b7227ed9c5b89e489587c8cb13eb7b",
                                            width: 180,
                                            height: 132,
                                        },
                                        labels: [],
                                        alt: "A square divided into 10 rows to show tenths. 5 of the rows are shaded to represent 5 tenths.",
                                        caption: "",
                                    },
                                    type: "image",
                                    version: {major: 0, minor: 0},
                                    graded: true,
                                    alignment: "block",
                                    static: false,
                                },
                            },
                        },
                        widgetEnabled: true,
                        immutableWidgets: false,
                    },
                    {
                        title: "Problem 1b",
                        content: "$0.6 + 0.4 =$   [[☃ numeric-input 1]]",
                        widgets: {
                            "numeric-input 1": {
                                type: "numeric-input",
                                alignment: "default",
                                static: false,
                                graded: true,
                                options: {
                                    static: false,
                                    answers: [
                                        {
                                            value: 1,
                                            status: "correct",
                                            message: "",
                                            simplify: "required",
                                            strict: false,
                                            maxError: null,
                                        },
                                    ],
                                    size: "normal",
                                    coefficient: false,
                                    labelText: "",
                                },
                                version: {major: 0, minor: 0},
                            },
                        },
                        images: {},
                        hasHint: true,
                        hint: {
                            content:
                                "There are many ways to solve this problem. Let's see two student solutions.\n\n###Student A's solution:\n\nI thought in terms of tenths.\n\n$\\phantom{=}0.6 + 0.4$\n\n$=6$ tenths $+ ~4$ tenths\n\n$=10$ tenths\n\n$=1$\n\n###Student B's solution:\n\nI used tenths grids.\n\n[[☃ image 1]]\n\n[[☃ image 2]]\n\n[[☃ image 3]]\n\n$\\blueD{0.6} + \\greenD{0.4} = 1$\n\n###The answer:\n\n$0.6 + 0.4 = 1$",
                            images: {},
                            widgets: {
                                "image 3": {
                                    type: "image",
                                    alignment: "block",
                                    static: false,
                                    graded: true,
                                    options: {
                                        static: false,
                                        title: "",
                                        range: [
                                            [0, 10],
                                            [0, 10],
                                        ],
                                        box: [234, 132],
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/54fbc06d92097119f1be5d1679391596209296a7",
                                            width: 234,
                                            height: 132,
                                        },
                                        labels: [],
                                        alt: "A square divided into 10 rows to show tenths. 6 of the rows are shaded in blue and 4 of the rows are shaded in green.",
                                        caption: "",
                                    },
                                    version: {major: 0, minor: 0},
                                },
                                "image 2": {
                                    type: "image",
                                    alignment: "block",
                                    static: false,
                                    graded: true,
                                    options: {
                                        static: false,
                                        title: "",
                                        range: [
                                            [0, 10],
                                            [0, 10],
                                        ],
                                        box: [180, 132],
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/217d580bc0baddb903bbcb648fc8d3ea3d0f4408",
                                            width: 180,
                                            height: 132,
                                        },
                                        labels: [],
                                        alt: "A square divided into 10 rows to show tenths. 4 of the rows are shaded to represent 4 tenths.",
                                        caption: "",
                                    },
                                    version: {major: 0, minor: 0},
                                },
                                "image 1": {
                                    options: {
                                        static: false,
                                        title: "",
                                        range: [
                                            [0, 10],
                                            [0, 10],
                                        ],
                                        box: [180, 132],
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/8e353e65446a4322f53d640aba33dccd69b0874c",
                                            width: 180,
                                            height: 132,
                                        },
                                        labels: [],
                                        alt: "A square divided into 10 rows to show tenths. 6 of the rows are shaded to represent 6 tenths.",
                                        caption: "",
                                    },
                                    type: "image",
                                    version: {major: 0, minor: 0},
                                    graded: true,
                                    alignment: "block",
                                    static: false,
                                },
                            },
                        },
                        widgetEnabled: true,
                        immutableWidgets: false,
                    },
                    {
                        title: "Problem 1c",
                        content: "$0.8 + 0.4 =$   [[☃ numeric-input 1]]",
                        widgets: {
                            "numeric-input 1": {
                                type: "numeric-input",
                                alignment: "default",
                                static: false,
                                graded: true,
                                options: {
                                    static: false,
                                    answers: [
                                        {
                                            value: 1.2,
                                            status: "correct",
                                            message: "",
                                            simplify: "required",
                                            strict: false,
                                            maxError: null,
                                        },
                                    ],
                                    size: "normal",
                                    coefficient: false,
                                    labelText: "",
                                },
                                version: {major: 0, minor: 0},
                            },
                        },
                        images: {},
                        hasHint: true,
                        hint: {
                            content:
                                "There are many ways to solve this problem. Let's see two student solutions.\n\n###Student A's solution:\n\nI thought in terms of tenths.\n\n$\\phantom{=}0.8 + 0.4$\n\n$=8$ tenths $+ ~4$ tenths\n\n$=12$ tenths\n\n$=1.2$\n\n###Student B's solution:\n\nI used tenths grids.\n\n[[☃ image 1]]\n\n[[☃ image 2]]\n\n[[☃ image 3]]\n$\\blueD{0.8} + \\greenD{0.4} = 1.2$\n\n###The answer:\n\n$ 0.8+0.4=1.2 $",
                            images: {},
                            widgets: {
                                "image 3": {
                                    type: "image",
                                    alignment: "block",
                                    static: false,
                                    graded: true,
                                    options: {
                                        static: false,
                                        title: "",
                                        range: [
                                            [0, 10],
                                            [0, 10],
                                        ],
                                        box: [354, 132],
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/4b595ea53e5edc2b5991f2171f384a7eae2eeb24",
                                            width: 354,
                                            height: 132,
                                        },
                                        labels: [],
                                        alt: "Two equal sized squares. Each square is divided into 10 rows to show tenths. In the first square, 8 of the rows are shaded in blue and 2 of the rows are shaded in green. In the second square, 2 of the rows are shaded in green.",
                                        caption: "",
                                    },
                                    version: {major: 0, minor: 0},
                                },
                                "image 2": {
                                    type: "image",
                                    alignment: "block",
                                    static: false,
                                    graded: true,
                                    options: {
                                        static: false,
                                        title: "",
                                        range: [
                                            [0, 10],
                                            [0, 10],
                                        ],
                                        box: [180, 132],
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/217d580bc0baddb903bbcb648fc8d3ea3d0f4408",
                                            width: 180,
                                            height: 132,
                                        },
                                        labels: [],
                                        alt: "A square divided into 10 rows to show tenths. 4 of the rows are shaded to represent 4 tenths.",
                                        caption: "",
                                    },
                                    version: {major: 0, minor: 0},
                                },
                                "image 1": {
                                    options: {
                                        static: false,
                                        title: "",
                                        range: [
                                            [0, 10],
                                            [0, 10],
                                        ],
                                        box: [180, 132],
                                        backgroundImage: {
                                            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/58d09bc7bdfadbd860c55734bf146578f047edbc",
                                            width: 180,
                                            height: 132,
                                        },
                                        labels: [],
                                        alt: "A square divided into 10 rows to show tenths. 8 of the rows are shaded to represent 8 tenths.",
                                        caption: "",
                                    },
                                    type: "image",
                                    version: {major: 0, minor: 0},
                                    graded: true,
                                    alignment: "block",
                                    static: false,
                                },
                            },
                        },
                        widgetEnabled: true,
                        immutableWidgets: false,
                    },
                ],
            },
            version: {major: 0, minor: 0},
        },
    },
};

export const groupSetRadioRationaleQuestion: PerseusRenderer = {
    content:
        "#Section 1: Adding tenths less than one\n\n[[☃ graded-group-set 1]]\n\n\nBeautiful, let's move on to problems with whole numbers and tenths.",
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
                        title: "Question 1",
                        content:
                            "Select the correct answer.\n\n[[\u2603 radio 1]]\n\n",
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
                                            content: "Incorrect",
                                            correct: false,
                                            rationale:
                                                "This is not the correct answer.",
                                        },
                                        {
                                            content: "Incorrect",
                                            correct: false,
                                            rationale:
                                                "This is not the correct answer.",
                                        },
                                        {
                                            content: "Correct",
                                            correct: true,
                                            isNoneOfTheAbove: false,
                                            rationale:
                                                "This is the correct answer.",
                                        },
                                        {
                                            content: "Incorrect",
                                            correct: false,
                                            isNoneOfTheAbove: false,
                                            rationale:
                                                "This is not the correct answer.",
                                        },
                                    ],
                                    countChoices: false,
                                    hasNoneOfTheAbove: false,
                                    multipleSelect: false,
                                    randomize: false,
                                    deselectEnabled: false,
                                },
                                alignment: "default",
                            },
                        },
                        hint: {
                            content: "This is an example hint.",
                            images: {},
                            widgets: {},
                        },
                        widgetEnabled: true,
                        immutableWidgets: false,
                    },
                    {
                        title: "Question 2",
                        content:
                            "What are some ways to say hello?\n\n[[\u2603 radio 1]]",
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
                                            content: "Hola",
                                            isNoneOfTheAbove: false,
                                            correct: true,
                                            rationale:
                                                "The Spanish-speaking countries typically say Hola.",
                                        },
                                        {
                                            content: "Hey",
                                            isNoneOfTheAbove: false,
                                            correct: true,
                                            rationale:
                                                "This is used to attract someone's attention.",
                                        },
                                        {
                                            content: "Hi",
                                            isNoneOfTheAbove: false,
                                            correct: true,
                                            rationale:
                                                "This is used as friendly greeting.",
                                        },
                                        {
                                            content: "Goodbye",
                                            isNoneOfTheAbove: false,
                                            correct: false,
                                            rationale:
                                                "Some people like to say Goodbye.",
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
                            },
                        },
                        hint: {
                            content: "This is an example hint.",
                            images: {},
                            widgets: {},
                        },
                        widgetEnabled: true,
                        immutableWidgets: false,
                    },
                ],
            },
            version: {major: 0, minor: 0},
        },
    },
};

export const groupedRadioQuestion: PerseusRenderer = {
    content: "---\n\n##Check your understanding!\n\n[[☃ graded-group 1]]\n\n",
    images: {},
    widgets: {
        "graded-group 1": {
            type: "graded-group",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                title: "Metabolic strategies of bacteria",
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
                            choices: [
                                {
                                    content: "$-8$ and $8$",
                                    correct: false,
                                    rationale:
                                        "This is not the correct answer.",
                                },
                                {
                                    content: "$-8$",
                                    correct: false,
                                    rationale:
                                        "This is not the correct answer.",
                                },
                                {
                                    content: "$8$",
                                    correct: true,
                                    isNoneOfTheAbove: false,
                                    rationale: "This is the correct answer.",
                                },
                                {
                                    content:
                                        "No value of $x$ satisfies the equation.",
                                    correct: false,
                                    isNoneOfTheAbove: false,
                                    rationale:
                                        "This is not the correct answer.",
                                },
                            ],
                            countChoices: false,
                            hasNoneOfTheAbove: false,
                            multipleSelect: false,
                            randomize: false,
                            deselectEnabled: false,
                        },
                        alignment: "default",
                    },
                },
                hint: {
                    content: "This is an example hint.",
                    images: {},
                    widgets: {},
                },
            },
            version: {major: 0, minor: 0},
        },
    },
};
