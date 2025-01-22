import type {PerseusExpressionWidgetOptions} from "../data-schema";

export const currentVersion = {major: 1, minor: 0};

export const widgetOptionsUpgrades = {
    /* c8 ignore next */
    "1": (v0props: any): PerseusExpressionWidgetOptions => ({
        times: v0props.times,
        buttonSets: v0props.buttonSets,
        functions: v0props.functions,
        buttonsVisible: v0props.buttonsVisible,
        visibleLabel: v0props.visibleLabel,
        ariaLabel: v0props.ariaLabel,

        answerForms: [
            {
                considered: "correct",
                form: v0props.form,
                simplify: v0props.simplify,
                value: v0props.value,
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
