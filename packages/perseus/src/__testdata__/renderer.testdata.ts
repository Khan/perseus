import type {MockWidget} from "../widgets/mock-widgets/mock-widget-types";
import type {RenderProps} from "../widgets/radio";
import type {
    DropdownWidget,
    ImageWidget,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

export const dropdownWidget: DropdownWidget = {
    type: "dropdown",
    alignment: "default",
    static: false,
    graded: true,
    options: {
        static: false,
        ariaLabel: "Test ARIA label",
        visibleLabel: "Test visible label",
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

export const mockWidget: MockWidget = {
    type: "mock-widget",
    graded: true,
    alignment: "default",
    options: {
        value: "0.3333333333333333",
    },
    version: {
        major: 0,
        minor: 0,
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
        "Denis baked a peach pie and cut it into $3$ equal-sized pieces.  Denis's dad eats $1$ section of the pie.  \n\n**What fraction of the pie did Denis's dad eat?**  \n![](https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png)    \n[[\u2603 mock-widget 1]]  \n\n\n\n",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":
            {
                width: 200,
                height: 200,
            },
    },
    widgets: {"mock-widget 1": mockWidget},
};

export const definitionItem: PerseusRenderer = {
    content:
        "Mock widgets ==> [[\u2603 definition 1]] [[\u2603 definition 2]] [[\u2603 definition 3]]",
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
    },
} as PerseusRenderer;

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
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                randomize: true,
                numCorrect: 1,
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content: "Content 1",
                        correct: true,
                    },
                    {
                        id: "1-1-1-1-1",
                        content: "Content 2",
                        correct: false,
                    },
                    {
                        id: "2-2-2-2-2",
                        content: "Content 3",
                        correct: false,
                    },
                    {
                        id: "3-3-3-3-3",
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
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                randomize: true,
                numCorrect: 1,
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content: "Content 1",
                        correct: true,
                    },
                    {
                        id: "1-1-1-1-1",
                        content: "Content 2",
                        correct: false,
                    },
                    {
                        id: "2-2-2-2-2",
                        content: "Content 3",
                        correct: false,
                    },
                    {
                        id: "3-3-3-3-3",
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
                id: "3-3-3-3-3",
                content: "Content 4",
                correct: false,
                originalIndex: 3,
            },
            {
                id: "0-0-0-0-0",
                content: "Content 1",
                correct: true,
                originalIndex: 0,
            },
            {
                id: "1-1-1-1-1",
                content: "Content 2",
                correct: false,
                originalIndex: 1,
            },
            {
                id: "2-2-2-2-2",
                content: "Content 3",
                correct: false,
                originalIndex: 2,
            },
        ],
    },
    "radio 2": {
        numCorrect: 1,
        countChoices: false,
        deselectEnabled: false,
        hasNoneOfTheAbove: false,
        multipleSelect: false,
        choices: [
            {
                id: "3-3-3-3-3",
                content: "Content 4",
                correct: false,
                originalIndex: 3,
            },
            {
                id: "0-0-0-0-0",
                content: "Content 1",
                correct: true,
                originalIndex: 0,
            },
            {
                id: "1-1-1-1-1",
                content: "Content 2",
                correct: false,
                originalIndex: 1,
            },
            {
                id: "2-2-2-2-2",
                content: "Content 3",
                correct: false,
                originalIndex: 2,
            },
        ],
    },
};
