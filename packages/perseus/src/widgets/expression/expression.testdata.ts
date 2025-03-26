import {
    ItemExtras,
    type PerseusExpressionWidgetOptions,
    type PerseusItem,
    type PerseusAnswerArea,
    expressionLogic,
} from "@khanacademy/perseus-core";

const createItemJson = (
    widgetOptions: PerseusExpressionWidgetOptions,
    widgetVersion = expressionLogic.version,
): PerseusItem => {
    return {
        question: {
            content: "[[☃ expression 1]]",
            images: {},
            widgets: {
                "expression 1": {
                    type: "expression",
                    graded: true,
                    options: widgetOptions,
                    version: widgetVersion,
                },
            },
        },
        answer: null,
        answerArea: Object.fromEntries(
            ItemExtras.map((extra) => [extra, false]),
        ) as PerseusAnswerArea,
        itemDataVersion: {
            major: 0,
            minor: 1,
        },
        hints: [],
    };
};

export const expressionItemWithAnswer = (answer: string): PerseusItem => {
    return createItemJson({
        answerForms: [
            {
                considered: "correct",
                form: false,
                simplify: false,
                value: answer,
            },
        ],
        times: false,
        buttonSets: ["basic"],
        functions: [],
        buttonsVisible: "always",
        extraKeys: [],
    });
};

export const expressionItemWithLabels = createItemJson({
    answerForms: [],
    times: false,
    buttonSets: ["basic"],
    functions: [],
    buttonsVisible: "always",
    ariaLabel: "Test aria label",
    visibleLabel: "Test visible label",
    extraKeys: [],
});

export const expressionItem2: PerseusItem = createItemJson({
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
    extraKeys: ["x"],
});

const expressionItem3Options: PerseusExpressionWidgetOptions = {
    answerForms: [
        {
            considered: "ungraded",
            form: false,
            simplify: false,
            value: "x+1",
        },
        {
            considered: "wrong",
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
        {
            considered: "correct",
            form: false,
            simplify: false,
            value: "a+1",
        },
    ],
    times: false,
    buttonSets: ["basic"],
    functions: ["f", "g", "h"],
    buttonsVisible: "focused",
    visibleLabel: "number of cm",
    ariaLabel: "number of centimeters",
    extraKeys: ["z", "a"],
};

export const expressionItem3: PerseusItem = createItemJson(
    expressionItem3Options,
);
