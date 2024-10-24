import type {PerseusExpressionWidgetOptions} from "../../data-schema";
import deriveExtraKeys from "./derive-extra-keys";

export const currentVersion = {major: 2, minor: 0};

export const widgetOptionsUpgrades = {
    "2": (v1options: any): PerseusExpressionWidgetOptions => {
        return {
            times: v1options.times,
            buttonSets: v1options.buttonSets,
            functions: v1options.functions,
            buttonsVisible: v1options.buttonsVisible,
            visibleLabel: v1options.visibleLabel,
            ariaLabel: v1options.ariaLabel,
            answerForms: v1options.answerForms,
            extraKeys: v1options.extraKeys || deriveExtraKeys(v1options),
        };
    },
    "1": (v0options: any): PerseusExpressionWidgetOptions => {
        return {
            times: v0options.times,
            buttonSets: v0options.buttonSets,
            functions: v0options.functions,
            buttonsVisible: v0options.buttonsVisible,
            visibleLabel: v0options.visibleLabel,
            ariaLabel: v0options.ariaLabel,
            extraKeys: v0options.extraKeys,

            answerForms: [
                {
                    considered: "correct",
                    form: v0options.form,
                    simplify: v0options.simplify,
                    value: v0options.value,
                },
            ],
        };
    },
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
