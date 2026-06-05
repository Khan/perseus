import {getNumericInputPublicWidgetOptions} from "./numeric-input-util";

import type {NumericInputPublicWidgetOptions} from "./numeric-input-util";
import type {PerseusNumericInputWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type NumericInputDefaultWidgetOptions = Pick<
    PerseusNumericInputWidgetOptions,
    "answers" | "size" | "coefficient" | "labelText" | "textAlign"
>;

const defaultWidgetOptions: NumericInputDefaultWidgetOptions = {
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
    textAlign: "start",
};

const numericInputWidgetLogic: WidgetLogic<
    PerseusNumericInputWidgetOptions,
    NumericInputPublicWidgetOptions
> = {
    name: "numeric-input",
    defaultWidgetOptions,
    defaultAlignment: "inline-block",
    getPublicWidgetOptions: getNumericInputPublicWidgetOptions,
    accessible: true,
};

export default numericInputWidgetLogic;
