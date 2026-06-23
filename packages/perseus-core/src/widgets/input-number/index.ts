import {getInputNumberPublicWidgetOptions} from "./input-number-util";

import type {InputNumberPublicWidgetOptions} from "./input-number-util";
import type {PerseusInputNumberWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type InputNumberDefaultWidgetOptions = PerseusInputNumberWidgetOptions;

const defaultWidgetOptions: InputNumberDefaultWidgetOptions = {
    rightAlign: false,
    coefficient: false,
    size: "normal",
    answers: [
        {
            status: "correct",
            value: 0,
            simplify: "required",
            maxError: 0,
            answerForms: [],
            message: "",
            strict: true,
        },
    ],
};

const inputNumberWidgetLogic: WidgetLogic<
    PerseusInputNumberWidgetOptions,
    InputNumberPublicWidgetOptions
> = {
    name: "input-number",
    version: {major: 1, minor: 0},
    defaultWidgetOptions,
    defaultAlignment: "inline-block",
    accessible: false,
    getPublicWidgetOptions: getInputNumberPublicWidgetOptions,
};

export default inputNumberWidgetLogic;
