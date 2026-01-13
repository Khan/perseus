import getRadioPublicWidgetOptions, {
    type RadioPublicWidgetOptions,
} from "./radio-util";

import type {PerseusRadioWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const currentVersion = {major: 3, minor: 0};

export type RadioDefaultWidgetOptions = Pick<
    PerseusRadioWidgetOptions,
    | "choices"
    | "randomize"
    | "hasNoneOfTheAbove"
    | "multipleSelect"
    | "countChoices"
    | "deselectEnabled"
>;

const defaultWidgetOptions: RadioDefaultWidgetOptions = {
    choices: [
        {content: "", id: "radio-choice-0"},
        {content: "", id: "radio-choice-1"},
        {content: "", id: "radio-choice-2"},
        {content: "", id: "radio-choice-3"},
    ],
    randomize: false,
    hasNoneOfTheAbove: false,
    multipleSelect: false,
    countChoices: false,
    deselectEnabled: false,
};

const radioWidgetLogic: WidgetLogic<
    PerseusRadioWidgetOptions,
    RadioPublicWidgetOptions
> = {
    name: "radio",
    version: currentVersion,
    defaultWidgetOptions: defaultWidgetOptions,
    getPublicWidgetOptions: getRadioPublicWidgetOptions,
    accessible: true,
};

export default radioWidgetLogic;
