import {
    ItemExtras,
    type InputNumberWidget,
    type LabelImageWidget,
    type PerseusItem,
    type PerseusRenderer,
    type PerseusAnswerArea,
    type ExpressionWidget,
    type RadioWidget,
    type NumericInputWidget,
} from "@khanacademy/perseus-core";

export const itemWithInput: PerseusItem = {
    question: {
        content:
            "Enter the number $$-42$$ in the box: [[\u2603 input-number 1]]",
        images: {},
        widgets: {
            "input-number 1": {
                type: "input-number",
                graded: true,
                options: {
                    answerType: "number",
                    value: "-42",
                    simplify: "required",
                    size: "normal",
                    inexact: false,
                    maxError: 0.1,
                },
            } as InputNumberWidget,
        },
    },
    hints: [
        {content: "Hint #1", images: {}, widgets: {}},
        {content: "Hint #2", images: {}, widgets: {}},
        {content: "Hint #3", images: {}, widgets: {}},
    ],
    answerArea: null,
    itemDataVersion: {major: 0, minor: 0},
    answer: null,
};

export const itemWithMultipleInputNumbers: PerseusItem = {
    question: {
        content:
            "Enter the number $$1$$ in box one: [[\u2603 input-number 1]] \n\n Enter the number $$2$$ in box two: [[\u2603 input-number 2]]",
        images: {},
        widgets: {
            "input-number 1": {
                type: "input-number",
                graded: true,
                options: {
                    answerType: "number",
                    value: "1",
                    simplify: "required",
                    size: "normal",
                    inexact: false,
                    maxError: 0.1,
                },
            } as InputNumberWidget,
            "input-number 2": {
                type: "input-number",
                graded: true,
                options: {
                    answerType: "number",
                    value: "2",
                    simplify: "required",
                    size: "normal",
                    inexact: false,
                    maxError: 0.1,
                },
            } as InputNumberWidget,
        },
    },
    hints: [
        {content: "Hint #1", images: {}, widgets: {}},
        {content: "Hint #2", images: {}, widgets: {}},
        {content: "Hint #3", images: {}, widgets: {}},
    ],
    answerArea: null,
    itemDataVersion: {major: 0, minor: 0},
    answer: null,
};

export const itemWithNumericAndNumberInputs: PerseusItem = {
    question: {
        content:
            "Enter the number $$1$$ in box one: [[\u2603 input-number 1]] \n\n Enter the number $$2$$ in box two: [[\u2603 numeric-input 1]]",
        images: {},
        widgets: {
            "input-number 1": {
                type: "input-number",
                graded: true,
                options: {
                    answerType: "number",
                    value: "1",
                    simplify: "required",
                    size: "normal",
                    inexact: false,
                    maxError: 0.1,
                },
            } as InputNumberWidget,
            "numeric-input 1": {
                graded: true,
                static: false,
                type: "numeric-input",
                options: {
                    coefficient: false,
                    static: false,
                    answers: [
                        {
                            status: "correct",
                            maxError: null,
                            strict: false,
                            value: 1252,
                            simplify: "required",
                            message: "",
                        },
                    ],
                    labelText: "",
                    size: "normal",
                },
                alignment: "default",
            } as NumericInputWidget,
        },
    },
    hints: [
        {content: "Hint #1", images: {}, widgets: {}},
        {content: "Hint #2", images: {}, widgets: {}},
        {content: "Hint #3", images: {}, widgets: {}},
    ],
    answerArea: null,
    itemDataVersion: {major: 0, minor: 0},
    answer: null,
};

export const itemWithRadioAndExpressionWidgets: PerseusItem = {
    question: {
        content:
            "Here's a radio widget: [[\u2603 radio 1]] \n\n Here's an expression widget: [[\u2603 expression 1]]",
        images: {},
        widgets: {
            "radio 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                numCorrect: 1,
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                countChoices: false,
                deselectEnabled: false,
                type: "radio",
                options: {
                    static: false,
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
                            clue: "Clue 1",
                        },
                        {
                            content: "Content 2",
                            correct: false,
                            clue: "Clue 2",
                        },
                        {
                            content: "Content 3",
                            correct: false,
                            clue: "Clue 3",
                        },
                        {
                            content: "Content 4",
                            correct: false,
                            clue: "Clue 4",
                        },
                    ],
                },
                alignment: "default",
            } as RadioWidget,
            "expression 1": {
                type: "expression",
                graded: true,
                version: {
                    major: 1,
                    minor: 0,
                },
                static: false,
                options: {
                    answerForms: [
                        {
                            considered: "correct",
                            form: true,
                            simplify: false,
                            value: "x^2",
                        },
                        {
                            considered: "wrong",
                            form: true,
                            simplify: false,
                            value: "x^3",
                        },
                    ],
                    times: true,
                    buttonSets: ["basic"],
                    functions: ["f", "g", "h"],
                    buttonsVisible: "always",
                    alignment: "default",
                },
            } as ExpressionWidget,
        },
    },
    hints: [
        {content: "Hint #1", images: {}, widgets: {}},
        {content: "Hint #2", images: {}, widgets: {}},
        {content: "Hint #3", images: {}, widgets: {}},
    ],
    answerArea: null,
    itemDataVersion: {major: 0, minor: 0},
    answer: null,
};

export const labelImageItem: PerseusItem = {
    answerArea: Object.fromEntries(
        ItemExtras.map((extra) => [extra, false]),
    ) as PerseusAnswerArea,
    answer: null,
    hints: [],
    itemDataVersion: {major: 0, minor: 1},
    question: {
        content:
            "Catherine created a chart and a bar graph to show how many dogs of each breed the animal shelter placed into good homes last year. \n\nDog breed  | Number of dogs \n:- | :-: \nBulldog | $32$ \nGreyhound | $72$ \nMastiff | $56$ \nCollie | $40$ \n\n**Label each bar on the bar graph.**\n\n[[☃ label-image 1]]\n\n\n\n",
        images: {
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/2f60b533892fe6cb9351f704ffdada8ae4bc655c":
                {height: 365, width: 503},
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/75f937c6ea133d655dd9f698a58182efd6cc85d4":
                {height: 293, width: 331},
        },
        widgets: {
            "label-image 1": {
                alignment: "default",
                graded: true,
                static: false,
                type: "label-image",
                version: {major: 0, minor: 0},
                options: {
                    choices: ["Bulldog", "Greyhound", "Mastiff", "Collie"],
                    hideChoicesFromInstructions: true,
                    imageAlt:
                        "A bar graph with four bar lines shows the horizontal axis labeled Dog breed and the vertical axis labeled Number of dogs. The vertical axis is labeled from the bottom of the axis to the top of the axis as follows: 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, and 80. The horizontal axis has, from left to right, four unlabeled bar lines as follows: the first unlabeled bar line extends to 56, the second unlabeled bar line extends to 72, the third unlabeled bar line extends to 40, and the fourth unlabeled bar line extends to 32.",
                    imageHeight: 293,
                    imageUrl:
                        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/64ace45942546183c3dc842cb0e9e4f64a312727",
                    imageWidth: 331,
                    markers: [
                        {
                            answers: ["Bulldog"],
                            label: "The fourth unlabeled bar line.",
                            x: 87.3,
                            y: 90.2,
                        },
                        {
                            answers: ["Collie"],
                            label: "The third unlabeled bar line.",
                            x: 67.7,
                            y: 90.5,
                        },
                        {
                            answers: ["Greyhound"],
                            label: "The second unlabeled bar line.",
                            x: 47.7,
                            y: 90.2,
                        },
                        {
                            answers: ["Mastiff"],
                            label: "The first unlabeled bar line.",
                            x: 27.8,
                            y: 90.5,
                        },
                    ],
                    multipleAnswers: false,
                    static: false,
                },
            } as LabelImageWidget,
        },
    },
};

export const definitionItem: PerseusItem = {
    // The mock widget type is not part of the PerseusWidget type union (and
    // we don't want to make it such to avoid polluting our production types
    // for test purposes) so we force TypeScript to accept it here.
    question: {
        content:
            "Mock widget ==> [[\u2603 definition 1]] [[\u2603 definition 2]] [[\u2603 definition 3]] [[\u2603 definition 4]]",
        images: {},
        widgets: {
            "definition 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "definition",
                options: {
                    togglePrompt: "word",
                    definition: "",
                    static: false,
                },
                alignment: "default",
            },
            "definition 2": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "definition",
                options: {
                    togglePrompt: "word",
                    definition: "",
                    static: false,
                },
                alignment: "default",
            },
            "definition 3": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "definition",
                options: {
                    togglePrompt: "word",
                    definition: "",
                    static: false,
                },
                alignment: "default",
            },
            "definition 4": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "definition",
                options: {
                    togglePrompt: "word",
                    definition: "",
                    static: false,
                },
                alignment: "default",
            },
        },
    } as PerseusRenderer,
    hints: [],
    answerArea: null,
    itemDataVersion: {major: 0, minor: 0},
    answer: null,
};

export const itemWithLintingError: PerseusItem = {
    question: {
        content: "# h1s aren't allowed",
        images: {},
        widgets: {},
    },
    hints: [],
    answerArea: null,
    itemDataVersion: {major: 0, minor: 0},
    answer: null,
};

export const itemWithImages: PerseusItem = {
    question: {
        content: `_An example of the different images and their alignments._

All articles in the main content of Articles and Exercises should be **centered**.

A small portrait image:
[[\u2603 image 1]]

A large portrait Jpeg image:
[[\u2603 image 2]]

A small landscape image:
[[\u2603 image 3]]

A large portrait image:
[[\u2603 image 4]]

And what follows are _hints_...
`,
        images: {},
        widgets: {
            "image 1": {
                type: "image",
                alignment: "block",
                static: false,
                graded: true,
                options: {
                    static: false,
                    title: "",
                    backgroundImage: {
                        url: "https://ka-perseus-graphie.s3.amazonaws.com/532e339d4d95f9cf6423e66bdc70dd06f1143a97.png",
                        width: 300,
                        height: 270,
                    },
                    alt: "A right triangle word problem. How far does the parachute fall?",
                    caption:
                        "A right triangle word problem. How far does the parachute fall?",
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "image 2": {
                type: "image",
                alignment: "block",
                static: false,
                graded: true,
                options: {
                    backgroundImage: {
                        url: "https://ka-perseus-images.s3.amazonaws.com/12d7324ae8a09074f029d778bc4939aa85a6ee63.jpg",
                        width: 2317,
                        height: 2535,
                    },
                    alt: "The patron, Enrico Scrovegni presenting the Arena Chapel to the Three Marys (detail), Giotto, Last Judgment, Arena (Scrovegni) Chapel, 1305-06, fresco, Padua (photo: Steven Zucker: CC BY-NC-SA 2.0)",
                    caption:
                        "The patron, Enrico Scrovegni presenting the Arena Chapel to the Three Marys (detail), Giotto, *Last Judgment*, Arena (Scrovegni) Chapel, 1305-06, fresco, Padua (photo: Steven Zucker: CC BY-NC-SA 2.0)",
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
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
                    box: [228, 89],
                    backgroundImage: {
                        url: "https://ka-perseus-images.s3.amazonaws.com/d0f2df15737d3feeaeea4cf4ec640413c493a875.png",
                        width: 228,
                        height: 89,
                    },
                    labels: [],
                    alt: "A chemical diagram with O atom in the center connected on one side to an R atom by a single bond and on the other side to an H atom by a single bond.",
                    caption:
                        "A chemical diagram with O atom in the center connected on one side to an R atom by a single bond and on the other side to an H atom by a single bond.",
                },
                version: {major: 0, minor: 0},
            },
            "image 4": {
                type: "image",
                alignment: "block",
                static: false,
                graded: true,
                options: {
                    static: false,
                    title: "",
                    backgroundImage: {
                        url: "https://ka-perseus-images.s3.amazonaws.com/c983f96a29a07e5c3369a85f2c9b6ae9d2d07d2b.jpg",
                        height: 2503,
                        width: 3587,
                    },
                    alt: "Milo dreaming he is riding on a bird's back to the moon.",
                    caption:
                        "Milo dreaming he is riding on a bird's back to the moon.",
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
            content:
                "A image widget with a portrait orientation:\n\n_should be left-aligned in hints_\n[[\u2603 image 1]]\n\n",
            images: {},
            widgets: {
                "image 1": {
                    type: "image",
                    alignment: "block",
                    static: false,
                    graded: true,
                    options: {
                        backgroundImage: {
                            url: "https://ka-perseus-images.s3.amazonaws.com/12d7324ae8a09074f029d778bc4939aa85a6ee63.jpg",
                            width: 2317,
                            height: 2535,
                        },
                        alt: "The patron, Enrico Scrovegni presenting the Arena Chapel to the Three Marys (detail), Giotto, Last Judgment, Arena (Scrovegni) Chapel, 1305-06, fresco, Padua (photo: Steven Zucker: CC BY-NC-SA 2.0)",
                        caption:
                            "The patron, Enrico Scrovegni presenting the Arena Chapel to the Three Marys (detail), Giotto, *Last Judgment*, Arena (Scrovegni) Chapel, 1305-06, fresco, Padua (photo: Steven Zucker: CC BY-NC-SA 2.0)",
                    },
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
            },
        },
        {
            content:
                "A image widget with a portrait orientation:\n\n_should be left-aligned in hints_\n[[\u2603 image 1]]\n\n",
            images: {},
            widgets: {
                "image 1": {
                    type: "image",
                    alignment: "block",
                    static: false,
                    graded: true,
                    options: {
                        backgroundImage: {
                            url: "https://ka-perseus-images.s3.amazonaws.com/12d7324ae8a09074f029d778bc4939aa85a6ee63.jpg",
                            width: 2317,
                            height: 2535,
                        },
                        alt: "The patron, Enrico Scrovegni presenting the Arena Chapel to the Three Marys (detail), Giotto, Last Judgment, Arena (Scrovegni) Chapel, 1305-06, fresco, Padua (photo: Steven Zucker: CC BY-NC-SA 2.0)",
                        caption:
                            "The patron, Enrico Scrovegni presenting the Arena Chapel to the Three Marys (detail), Giotto, *Last Judgment*, Arena (Scrovegni) Chapel, 1305-06, fresco, Padua (photo: Steven Zucker: CC BY-NC-SA 2.0)",
                    },
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
            },
        },
        {
            content:
                "A Portrait Markdown image:\n![The patron, Enrico Scrovegni presenting the Arena Chapel to the Three Marys (detail), Giotto, Last Judgment, Arena (Scrovegni) Chapel, 1305-06, fresco, Padua (photo: Steven Zucker: CC BY-NC-SA 2.0)](https://ka-perseus-images.s3.amazonaws.com/12d7324ae8a09074f029d778bc4939aa85a6ee63.jpg)\n\n",
            images: {
                "https://ka-perseus-images.s3.amazonaws.com/12d7324ae8a09074f029d778bc4939aa85a6ee63.jpg":
                    {width: 2317, height: 2535},
            },
            widgets: {},
        },
        {
            content:
                "A small Landscape Markdown image:\n\n![Some building](https://ka-perseus-images.s3.amazonaws.com/84c9521c5f9ec8c6d2a06435e48295817db54b65.jpeg)\n\n",
            images: {
                "https://ka-perseus-images.s3.amazonaws.com/84c9521c5f9ec8c6d2a06435e48295817db54b65.jpeg":
                    {width: 450 / 2, height: 288 / 2},
            },
            widgets: {},
        },
    ],
    answerArea: null,
    itemDataVersion: {major: 0, minor: 0},
    answer: null,
};
