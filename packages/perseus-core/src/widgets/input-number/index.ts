import getInputNumberPublicWidgetOptions, {
    type InputNumberPublicWidgetOptions,
} from "./input-number-util";

import type {PerseusInputNumberWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type InputNumberDefaultWidgetOptions = Pick<
    PerseusInputNumberWidgetOptions,
    | "value"
    | "simplify"
    | "size"
    | "inexact"
    | "maxError"
    | "answerType"
    | "rightAlign"
>;

const defaultWidgetOptions: InputNumberDefaultWidgetOptions = {
    value: 0,
    simplify: "required",
    size: "normal",
    inexact: false,
    maxError: 0.1,
    answerType: "number",
    rightAlign: false,
};

const inputNumberWidgetLogic: WidgetLogic<
    PerseusInputNumberWidgetOptions,
    InputNumberPublicWidgetOptions
> = {
    name: "input-number",
    defaultWidgetOptions,
    defaultAlignment: "inline-block",
    accessible: false,
    getPublicWidgetOptions: getInputNumberPublicWidgetOptions,
};

export default inputNumberWidgetLogic;
