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
} from "../perseus-types";

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
    _multi: null,
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
    _multi: null,
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
    _multi: null,
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
    _multi: null,
    itemDataVersion: {major: 0, minor: 0},
    answer: null,
};

export const labelImageItem: PerseusItem = {
    answerArea: Object.fromEntries(
        ItemExtras.map((extra) => [extra, false]),
    ) as PerseusAnswerArea,
    _multi: null,
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

// Note that if this item is used, you _must_ first register the MockWidget
export const mockedItem: PerseusItem = {
    // The mock widget type is not part of the PerseusWidget type union (and
    // we don't want to make it such to avoid polluting our production types
    // for test purposes) so we force TypeScript to accept it here.
    // @ts-expect-error - TS2352 - Conversion of type '{ content: string; images: {}; widgets: { "mock-widget 1": { graded: true; version: { major: number; minor: number; }; static: false; type: "mock-widget"; options: { static: false; smiling: boolean; }; alignment: string; }; "mock-widget 2": { ...; }; "mock-widget 3": { ...; }; "mock-widget 4": { ...; }; }; }' to type 'PerseusRenderer' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
    question: {
        content:
            "Mock widget ==> [[\u2603 mock-widget 1]] [[\u2603 mock-widget 2]] [[\u2603 mock-widget 3]] [[\u2603 mock-widget 4]]",
        images: {},
        widgets: {
            "mock-widget 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "mock-widget",
                options: {static: false, smiling: true},
                alignment: "default",
            },
            "mock-widget 2": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "mock-widget",
                options: {static: false, smiling: false},
                alignment: "default",
            },
            "mock-widget 3": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "mock-widget",
                options: {static: false, smiling: true},
                alignment: "default",
            },
            "mock-widget 4": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "mock-widget",
                options: {static: false, smiling: false},
                alignment: "default",
            },
        },
    } as PerseusRenderer,
    hints: [],
    answerArea: null,
    _multi: null,
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
    _multi: null,
    itemDataVersion: {major: 0, minor: 0},
    answer: null,
};
