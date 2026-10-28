import type {PerseusExpressionWidgetOptions} from "@khanacademy/perseus-core";

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
        {
            considered: "correct",
            form: false,
            simplify: false,
            value: "a+1",
        },
        {
            considered: "correct",
            form: false,
            simplify: false,
            value: "z/3",
        },
    ],
    times: false,
    buttonSets: ["basic"],
    functions: ["f", "g", "h"],
    buttonsVisible: "focused",
    visibleLabel: "number of cm",
    ariaLabel: "number of centimeters",
};

// LEMS-4690: regression for equivalent answers that are undefined at x = 0
export const equivalentAnswers: PerseusExpressionWidgetOptions = {
    answerForms: [
        {
            value: "-\\frac{x\\sin\\left(x\\right)+3\\cos\\left(x\\right)}{x^{4}}",
            form: false,
            simplify: false,
            considered: "correct",
            key: "0",
        },
        {
            value: "\\frac{-x\\sin\\left(x\\right)-3\\cos\\left(x\\right)}{x^{4}}",
            form: false,
            simplify: false,
            considered: "correct",
            key: "efcfedd0-703c-4f3e-ad51-706fa5fbf180",
        },
        {
            value: "\\frac{-x^{3}\\sin(x)-3x^{2}\\cos(x)}{x^{6}}",
            form: false,
            simplify: false,
            considered: "ungraded",
            key: "1783b739-eaf5-404a-a168-94255b29db4f",
        },
        {
            value: "\\frac{-x^{3}\\sin\\left(x\\right)-3x^{2}\\cos\\left(x\\right)}{x^{6}}",
            form: false,
            simplify: false,
            considered: "ungraded",
            key: "e75bdd15-ddd6-4d01-9ab1-eafff8fa3075",
        },
        {
            value: "\\frac{-x^{3}\\sin x-3x^{2}\\cos x}{x^{6}}",
            form: false,
            simplify: false,
            considered: "ungraded",
            key: "11f189c9-a58a-426b-9236-e2828a95de2d",
        },
        {
            value: "\\frac{\\left(-x^{3}\\sin x-3x^{2}\\cos x\\right)}{x^{6}}",
            form: false,
            simplify: false,
            considered: "ungraded",
            key: "790794a0-2f8c-4154-a101-02189aa477a4",
        },
    ],
    functions: ["f", "g", "h"],
    times: false,
    buttonSets: ["basic", "trig", "prealgebra"],
    extraKeys: ["x"],
};
