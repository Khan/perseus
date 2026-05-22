import {getInputNumberPublicWidgetOptions} from "./input-number-util";

import type {InputNumberPublicWidgetOptions} from "./input-number-util";
import type {PerseusInputNumberWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type InputNumberDefaultWidgetOptions = Pick<
    PerseusInputNumberWidgetOptions,
    "answers" | "size" | "coefficient" | "rightAlign"
>;

const defaultWidgetOptions: InputNumberDefaultWidgetOptions = {
    answers: [
        {
            value: 0,
            simplify: "required",
            status: "correct",
            strict: true,
            answerForms: ["integer", "decimal", "proper", "improper", "mixed"],
            message: "",
            maxError: 0,
        },
    ],
    size: "normal",
    coefficient: false,
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
