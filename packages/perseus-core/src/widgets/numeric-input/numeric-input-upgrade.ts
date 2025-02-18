import {deriveAnswerForms} from "./util";

import type {PerseusNumericInputWidgetOptions} from "../../data-schema";

export const currentVersion = {major: 1, minor: 0};

export const widgetOptionsUpgrades = {
    "1": (v0props: any): PerseusNumericInputWidgetOptions => {
        return {
            ...v0props,
            fullAnswerForms: deriveAnswerForms(v0props),
        };
    },
} as const;

export type NumericInputDefaultWidgetOptions = Pick<
    PerseusNumericInputWidgetOptions,
    "answers" | "size" | "coefficient" | "labelText" | "rightAlign"
>;

export const defaultWidgetOptions: NumericInputDefaultWidgetOptions = {
    answers: [
        {
            value: null,
            status: "correct",
            message: "",
            simplify: "required",
            answerForms: [],
            strict: false,
            maxError: null,
        },
    ],
    size: "normal",
    coefficient: false,
    labelText: "",
    rightAlign: false,
};
