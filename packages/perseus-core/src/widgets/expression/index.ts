import getExpressionPublicWidgetOptions from "./expression-util";

import type {PerseusExpressionWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const currentVersion = {major: 2, minor: 0};

export type ExpressionDefaultWidgetOptions = Pick<
    PerseusExpressionWidgetOptions,
    "answerForms" | "times" | "buttonSets" | "functions"
>;

function initializeWidgetOptions(): ExpressionDefaultWidgetOptions {
    return {
        answerForms: [],
        times: false,
        buttonSets: ["basic"],
        functions: ["f", "g", "h"],
    };
}

const expressionWidgetLogic: WidgetLogic<ExpressionDefaultWidgetOptions> = {
    name: "expression",
    version: currentVersion,
    initializeWidgetOptions,
    defaultAlignment: "inline-block",
    getPublicWidgetOptions: getExpressionPublicWidgetOptions,
    accessible: true,
};

export default expressionWidgetLogic;
