import getRadioPublicWidgetOptions from "./radio-util";

import type {PerseusRadioWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export const currentVersion = {major: 2, minor: 0};

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
    choices: [{}, {}, {}, {}] as any,
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
    accessible: true,
};

export default radioWidgetLogic;
