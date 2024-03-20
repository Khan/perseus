import type {
    DropdownWidget,
    ImageWidget,
    InputNumberWidget,
    PerseusRenderer,
} from "../perseus-types";
import type {RenderProps} from "../widgets/radio/radio";

export const dropdownWidget: DropdownWidget = {
    type: "dropdown",
    alignment: "default",
    static: false,
    graded: true,
    options: {
        static: false,
        placeholder: "greater/less than or equal to",
        choices: [
            {
                content: "greater than or equal to",
                correct: false,
            },
            {
                content: "less than or equal to",
                correct: true,
            },
        ],
    },
    version: {
        major: 0,
        minor: 0,
    },
};

export const imageWidget: ImageWidget = {
    alignment: "block",
    graded: true,
    options: {
        alt: "A number line labeled 200 to 300 with tick marks at every 5 units. The tick marks at 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, and 300 are labeled. A red circle labeled A is between 220 tick mark and 230 tick mark.",
        backgroundImage: {
            height: 80,
            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/3351ccf19e60c28a1d08664f5c16defa76ed0348",
            width: 380,
        },
    },
    static: false,
    type: "image",
    version: {major: 0, minor: 0},
};

export const inputNumberWidget: InputNumberWidget = {
    version: {
        major: 0,
        minor: 0,
    },
    type: "input-number",
    graded: true,
    alignment: "default",
    options: {
        maxError: 0.1,
        inexact: false,
        value: 0.3333333333333333,
        simplify: "optional",
        answerType: "rational",
        size: "normal",
    },
};

export const question1: PerseusRenderer = {
    content:
        "The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",
    images: {},
    widgets: {"dropdown 1": dropdownWidget},
};

export const question2: PerseusRenderer = {
    content:
        "Denis baked a peach pie and cut it into $3$ equal-sized pieces.  Denis's dad eats $1$ section of the pie.  \n\n**What fraction of the pie did Denis's dad eat?**  \n![](https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png)    \n[[\u2603 input-number 1]]  \n\n\n\n",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":
            {
                width: 200,
                height: 200,
            },
    },
    widgets: {"input-number 1": inputNumberWidget},
};

// Note that if this item is used, you _must_ first register the MockWidget
export const mockedItem: PerseusRenderer = {
    // The mock widget type is not part of the PerseusWidget type union (and
    // we don't want to make it such to avoid polluting our production types
    // for test purposes) so we force TypeScript to accept it here.
    content:
        "Mock widgets ==> [[\u2603 mock-widget 1]] [[\u2603 mock-widget 2]] [[\u2603 mock-widget 3]]",
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
    },
} as PerseusRenderer;

// Note that if this item is used, you _must_ first register the MockWidget
export const mockedRandomItem: PerseusRenderer = {
    content: "Mock widgets ==> [[\u2603 radio 1]] [[\u2603 radio 2]]",
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
        },
        "radio 2": {
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
        },
    },
} as PerseusRenderer;

export const mockedShuffledRadioProps: {[key in string]: RenderProps} = {
    "radio 1": {
        numCorrect: 1,
        countChoices: false,
        deselectEnabled: false,
        hasNoneOfTheAbove: false,
        multipleSelect: false,
        choices: [
            {
                content: "Content 4",
                correct: false,
                originalIndex: 3,
            },
            {
                content: "Content 2",
                correct: false,
                originalIndex: 1,
            },
            {
                content: "Content 1",
                correct: true,
                originalIndex: 0,
            },

            {
                content: "Content 3",
                correct: false,
                originalIndex: 2,
            },
        ],
        selectedChoices: [false, false, true, false],
    },
    "radio 2": {
        numCorrect: 1,
        countChoices: false,
        deselectEnabled: false,
        hasNoneOfTheAbove: false,
        multipleSelect: false,
        choices: [
            {
                content: "Content 4",
                correct: false,
                originalIndex: 3,
            },
            {
                content: "Content 2",
                correct: false,
                originalIndex: 1,
            },
            {
                content: "Content 1",
                correct: true,
                originalIndex: 0,
            },

            {
                content: "Content 3",
                correct: false,
                originalIndex: 2,
            },
        ],
        selectedChoices: [false, false, true, false],
    },
};
