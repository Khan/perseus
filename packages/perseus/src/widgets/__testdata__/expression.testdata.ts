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
        _multi: null,
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

export const complexExpressionWidget: PerseusItem = {
    answerArea: Object.fromEntries(
        ItemExtras.map((extra) => [extra, false]),
    ) as PerseusAnswerArea,
    _multi: null,
    answer: null,
    hints: [
        {
            content:
                "$f(x, y, z) = (f_0, f_1, f_2)$\n\nThe curl of $f$:\n\n$\\begin{align}\n\\text{curl}(f) &= \\det \\begin{bmatrix}\n{\\hat{\\imath}} & \\hat{\\jmath} & \\hat{k} \\\\ \\\\\n\\dfrac{\\partial}{\\partial x} & \\dfrac{\\partial}{\\partial y} & \\dfrac{\\partial}{\\partial z} \\\\ \\\\\nf_0 & f_1 & f_2\n\\end{bmatrix} \\\\ \\\\\n&= \\left( \\dfrac{\\partial f_2}{\\partial y} - \\dfrac{\\partial f_1}{\\partial z} \\right) \\hat{\\imath} \\\\ \\\\\n&+ \\left( \\dfrac{\\partial f_0}{\\partial z} - \\dfrac{\\partial f_2}{\\partial x} \\right) \\hat{\\jmath} \\\\ \\\\\n&+ \\left( \\dfrac{\\partial f_1}{\\partial x} - \\dfrac{\\partial f_0}{\\partial y} \\right) \\hat{k}\n\\end{align}$",
            images: {},
            replace: false,
            widgets: {},
        },
        {
            content:
                "$\\begin{align}\nf_0(x, y, z) &= \\tan(y) \\\\ \\\\\nf_1(x, y, z) &= z\\sin(x) \\\\ \\\\\nf_2(x, y, z) &= 2\\cos(x)\n\\end{align}$\n\nLet's calculate all the partial derivatives we'll need.\n\n | $f_0$ | $f_1$ | $f_2$\n:-: | :-: | :-: | :-:\n$\\dfrac{\\partial}{\\partial x}$ | | $z\\cos(x)$ | $-2\\sin(x)$\n$\\dfrac{\\partial}{\\partial y}$| $\\sec^2(y)$ | | $0$\n$\\dfrac{\\partial}{\\partial z}$ | $0$ | $\\sin(x)$ | \n\nNow we can put it all together.\n\n$\\begin{align}\n\\text{curl}(f) &= \\left( \\dfrac{\\partial f_2}{\\partial y} - \\dfrac{\\partial f_1}{\\partial z} \\right) \\hat{\\imath} \\\\ \\\\\n&+ \\left( \\dfrac{\\partial f_0}{\\partial z} - \\dfrac{\\partial f_2}{\\partial x} \\right) \\hat{\\jmath} \\\\ \\\\\n&+ \\left( \\dfrac{\\partial f_1}{\\partial x} - \\dfrac{\\partial f_0}{\\partial y} \\right) \\hat{k} \\\\ \\\\\n&= (0 - \\sin(x)) \\hat{\\imath} + (0 + 2\\sin(x)) \\hat{\\jmath} \\\\ \\\\\n&+ (z\\cos(x) - \\sec^2(y)) \\hat{k} \\\\ \\\\\n&= -\\sin(x) \\hat{\\imath} + 2\\sin(x) \\hat{\\jmath} + (z\\cos(x) - \\sec^2(y)) \\hat{k}\n\\end{align}$ \n\nWe could also write the $\\hat{k}$-component as $z\\cos(x) - \\dfrac{1}{\\cos^2(y)}$ because $\\sec(y) = \\dfrac{1}{\\cos(y)}$.",
            images: {},
            replace: false,
            widgets: {},
        },
        {
            content:
                "In conclusion:\n\n$\\text{curl}(f) = -\\sin(x) \\hat{\\imath} + 2\\sin(x) \\hat{\\jmath} + (z\\cos(x) - \\sec^2(y)) \\hat{k}$",
            images: {},
            replace: false,
            widgets: {},
        },
    ],
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    question: {
        content:
            "$f(x, y, z) = (\\tan(y), z\\sin(x), 2\\cos(x))$\n\n$\\text{curl}(f) = $ [[☃ expression 1]] $\\hat{\\imath} + $ [[☃ expression 2]] $\\hat{\\jmath} + $ [[☃ expression 3]] $\\hat{k}$",
        images: {},
        widgets: {
            "expression 1": {
                alignment: "default",
                graded: true,
                options: {
                    answerForms: [
                        {
                            considered: "correct",
                            form: false,
                            key: "0",
                            simplify: false,
                            value: "-\\sin\\left(x\\right)",
                        },
                    ],
                    buttonSets: ["basic", "trig", "prealgebra"],
                    functions: ["f", "g", "h"],
                    times: false,
                },
                static: false,
                type: "expression",
                version: {
                    major: 1,
                    minor: 0,
                },
            },
            "expression 2": {
                alignment: "default",
                graded: true,
                options: {
                    answerForms: [
                        {
                            considered: "correct",
                            form: false,
                            key: "0",
                            simplify: false,
                            value: "2\\sin\\left(x\\right)",
                        },
                    ],
                    buttonSets: ["basic", "trig", "prealgebra"],
                    functions: ["f", "g", "h"],
                    times: false,
                },
                static: false,
                type: "expression",
                version: {
                    major: 1,
                    minor: 0,
                },
            },
            "expression 3": {
                alignment: "default",
                graded: true,
                options: {
                    answerForms: [
                        {
                            considered: "correct",
                            form: false,
                            key: "0",
                            simplify: false,
                            value: "z\\cos\\left(x\\right)-\\sec^{2}\\left(y\\right)",
                        },
                    ],
                    buttonSets: ["basic", "trig", "prealgebra"],
                    functions: ["f", "g", "h"],
                    times: false,
                },
                static: false,
                type: "expression",
                version: {
                    major: 1,
                    minor: 0,
                },
            },
        },
    },
};
