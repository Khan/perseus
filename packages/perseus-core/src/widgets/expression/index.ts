import getExpressionPublicWidgetOptions, {
    getSaveWarningsForExpressionWidget,
} from "./expression-util";

import type {PerseusExpressionWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export const currentVersion = {major: 2, minor: 0};

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

const expressionWidgetLogic: WidgetLogic = {
    name: "expression",
    version: currentVersion,
    defaultWidgetOptions: defaultWidgetOptions,
    defaultAlignment: "inline-block",
    getPublicWidgetOptions: getExpressionPublicWidgetOptions,
    getSaveWarnings: getSaveWarningsForExpressionWidget,
    accessible: true,
};

export default expressionWidgetLogic;
