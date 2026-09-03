import {getFillInTheBlankPublicWidgetOptions} from "./fill-in-the-blank-util";

import type {FillInTheBlankPublicWidgetOptions} from "./fill-in-the-blank-util";
import type {PerseusFillInTheBlankWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const currentVersion = {major: 0, minor: 0};

const defaultWidgetOptions: PerseusFillInTheBlankWidgetOptions = {
    content: "",
    widgets: {},
    tiles: [],
    tileUsage: "single",
    randomize: false,
};

const fillInTheBlankWidgetLogic: WidgetLogic<
    PerseusFillInTheBlankWidgetOptions,
    FillInTheBlankPublicWidgetOptions
> = {
    name: "fill-in-the-blank",
    version: currentVersion,
    defaultAlignment: "block",
    defaultWidgetOptions,
    accessible: true,
    getPublicWidgetOptions: getFillInTheBlankPublicWidgetOptions,
    traverseChildWidgets: (props, traverseRenderer) => ({
        ...props,
        ...traverseRenderer(props),
    }),
};

export default fillInTheBlankWidgetLogic;
