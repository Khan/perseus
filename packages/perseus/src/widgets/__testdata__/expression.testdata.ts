import {
    ItemExtras,
    type PerseusExpressionWidgetOptions,
    type Version,
    type PerseusItem,
    type PerseusRenderer,
    type ExpressionWidget,
    type PerseusAnswerArea,
} from "../../perseus-types";

import {
    arrayOfLength,
    randomBoolean,
    randomElement,
    randomInteger,
    randomLetter,
    randomSentence,
    randomWord,
} from "./randomizers";

const createItemJson = (
    widgetOptions: PerseusExpressionWidgetOptions,
    version: Version,
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
                    version: version,
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
    return createItemJson(
        {
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
        },
        {major: 1, minor: 0},
    );
};

export const expressionItemWithLabels = createItemJson(
    {
        answerForms: [],
        times: false,
        buttonSets: ["basic"],
        functions: [],
        buttonsVisible: "always",
        ariaLabel: "Test aria label",
        visibleLabel: "Test visible label",
    },
    {major: 1, minor: 0},
);

export const expressionItem2: PerseusItem = createItemJson(
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
    ],
    times: false,
    buttonSets: ["basic"],
    functions: ["f", "g", "h"],
    buttonsVisible: "focused",
    visibleLabel: "number of cm",
    ariaLabel: "number of centimeters",
};

export const expressionItem3: PerseusItem = createItemJson(
    expressionItem3Options,
    {
        major: 1,
        minor: 0,
    },
);

export const randomExpressionGenerator = (): PerseusRenderer => {
    const randomButtonSet = [
        "basic",
        "basic+div",
        "trig",
        "prealgebra",
        "logarithms",
        "basic relations",
        "advanced relations",
    ]
        .sort(() => {
            return randomBoolean() ? 1 : -1;
        })
        .slice(0, randomInteger(1, 6));

    const randomFunctionSet = arrayOfLength(randomInteger(0, 6)).map(
        randomLetter,
    );

    return {
        content: `${randomSentence(20)} [[☃ expression 1]]`,
        images: {},
        widgets: {
            "expression 1": {
                type: "expression",
                graded: randomBoolean(),
                version: {
                    major: 1,
                    minor: 0,
                },
                static: randomBoolean(0.05),
                options: {
                    answerForms: [
                        {
                            considered: randomElement([
                                "correct",
                                "wrong",
                                "ungraded",
                            ]),
                            form: randomBoolean(),
                            simplify: randomBoolean(),
                            value: randomWord(),
                        },
                        {
                            considered: randomElement([
                                "correct",
                                "wrong",
                                "ungraded",
                            ]),
                            form: randomBoolean(),
                            simplify: randomBoolean(),
                            value: randomWord(),
                        },
                    ],
                    times: randomBoolean(),
                    buttonSets: randomButtonSet,
                    functions: randomFunctionSet,
                    buttonsVisible: randomElement([
                        "always",
                        "never",
                        "focused",
                        undefined,
                    ]),
                    alignment: "default",
                },
            } as ExpressionWidget,
        },
    };
};
