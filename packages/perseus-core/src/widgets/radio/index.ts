import getRadioPublicWidgetOptions, {
    getSaveWarningsForRadioWidget,
} from "./radio-util";

import type {PerseusRadioWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export const currentVersion = {major: 3, minor: 0};

export type RadioDefaultWidgetOptions = Pick<
    PerseusRadioWidgetOptions,
    | "choices"
    | "randomize"
    | "hasNoneOfTheAbove"
    | "multipleSelect"
    | "countChoices"
    | "deselectEnabled"
>;

export const defaultWidgetOptions: RadioDefaultWidgetOptions = {
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

const radioWidgetLogic: WidgetLogic = {
    name: "radio",
    version: currentVersion,
    defaultWidgetOptions: defaultWidgetOptions,
    getPublicWidgetOptions: getRadioPublicWidgetOptions,
    getSaveWarnings: getSaveWarningsForRadioWidget,
    accessible: true,
};

export default radioWidgetLogic;
