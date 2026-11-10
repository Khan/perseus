import {getExpressionPublicWidgetOptions} from "./expression-util";

import type {PerseusExpressionWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";
import type {ExpressionPublicWidgetOptions} from "./expression-util";

const currentVersion = {major: 2, minor: 0};

const defaultWidgetOptions: PerseusExpressionWidgetOptions = {
    answerForms: [],
    times: false,
    buttonSets: ["basic"],
    functions: ["f", "g", "h"],
};

const expressionWidgetLogic: WidgetLogic<
    PerseusExpressionWidgetOptions,
    ExpressionPublicWidgetOptions
> = {
    name: "expression",
    version: currentVersion,
    defaultWidgetOptions: defaultWidgetOptions,
    defaultAlignment: "inline-block",
    getPublicWidgetOptions: getExpressionPublicWidgetOptions,
    accessible: true,
};

export default expressionWidgetLogic;
