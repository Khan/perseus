import {getBlankPublicWidgetOptions} from "./blank-util";

import type {BlankPublicWidgetOptions} from "./blank-util";
import type {PerseusBlankWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusBlankWidgetOptions = {
    displayType: "normal",
    correctId: "",
};

const blankWidgetLogic: WidgetLogic<
    PerseusBlankWidgetOptions,
    BlankPublicWidgetOptions
> = {
    name: "blank",
    version: {major: 0, minor: 0},
    defaultWidgetOptions,
    defaultAlignment: "inline-block",
    getPublicWidgetOptions: getBlankPublicWidgetOptions,
    accessible: true,
};

export default blankWidgetLogic;
