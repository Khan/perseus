import type {
    PerseusRenderer,
    PerseusExpressionWidgetOptions,
    Version,
} from "../../perseus-types";

type Item = {
    question: PerseusRenderer;
};

const createItemJson = (
    widgetOptions: PerseusExpressionWidgetOptions,
    version: Version,
): Item => {
    return {
        question: {
            content: "[[☃ expression 1]]",
            images: {},
            widgets: {
                "expression 1": {
                    type: "expression",
                    graded: true,
                    options: widgetOptions,
                    version: version,
                },
            },
        },
        answerArea: {
            calculator: false,
        },
        itemDataVersion: {
            major: 0,
            minor: 1,
        },
        hints: [],
    };
};

export const expressionItem2: Item = createItemJson(
    {
        answerForms: [
            {
                considered: "correct",
                form: false,
                simplify: false,
                value: "123-x",
            },
            {
                considered: "correct",
                form: false,
                simplify: false,
                value: "x-123",
            },
        ],
        times: false,
        buttonSets: ["basic"],
        functions: ["f", "g", "h"],
        buttonsVisible: "always",
    },
    {major: 1, minor: 0},
);

export const expressionItem3Options: PerseusExpressionWidgetOptions = {
    answerForms: [
        {
            considered: "ungraded",
            form: false,
            simplify: false,
            value: "x+1",
        },
        {
            considered: "incorrect",
            form: false,
            simplify: false,
            value: "y+1",
        },
        {
            considered: "correct",
            form: false,
            simplify: false,
            value: "z+1",
        },
    ],
    times: false,
    buttonSets: ["basic"],
    functions: ["f", "g", "h"],
    buttonsVisible: "focused",
};

export const expressionItem3: Item = createItemJson(expressionItem3Options, {
    major: 1,
    minor: 0,
});
