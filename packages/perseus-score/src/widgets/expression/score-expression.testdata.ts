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
