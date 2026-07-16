import {getBlankPublicWidgetOptions} from "./blank-util";

import type {BlankPublicWidgetOptions} from "./blank-util";
import type {PerseusBlankWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type BlankDefaultWidgetOptions = Pick<
    PerseusBlankWidgetOptions,
    "displayType"
>;

const defaultWidgetOptions: BlankDefaultWidgetOptions = {
    displayType: "normal",
};

const numericInputWidgetLogic: WidgetLogic<
    PerseusBlankWidgetOptions,
    BlankPublicWidgetOptions
> = {
    name: "blank",
    version: {major: 1, minor: 0},
    defaultWidgetOptions,
    defaultAlignment: "inline-block",
    getPublicWidgetOptions: getBlankPublicWidgetOptions,
    accessible: true,
};

export default numericInputWidgetLogic;
