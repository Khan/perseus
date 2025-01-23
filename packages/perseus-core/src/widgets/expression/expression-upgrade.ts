import type {PerseusExpressionWidgetOptions} from "../../data-schema";

export const currentVersion = {major: 1, minor: 0};

export const widgetOptionsUpgrades = {
    "1": (v0options: any): PerseusExpressionWidgetOptions => ({
        times: v0options.times,
        buttonSets: v0options.buttonSets,
        functions: v0options.functions,
        buttonsVisible: v0options.buttonsVisible,
        visibleLabel: v0options.visibleLabel,
        ariaLabel: v0options.ariaLabel,

        answerForms: [
            {
                considered: "correct",
                form: v0options.form,
                simplify: v0options.simplify,
                value: v0options.value,
            },
        ],
    }),
} as const;

export type ExpressionDefaultWidgetOptions = Pick<
    PerseusExpressionWidgetOptions,
    "answerForms" | "times" | "buttonSets" | "functions"
>;

export const defaultWidgetOptions: ExpressionDefaultWidgetOptions = {
    answerForms: [],
    times: false,
    buttonSets: ["basic"],
    functions: ["f", "g", "h"],
};
