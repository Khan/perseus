import {getFillInTheBlankPublicWidgetOptions} from "./fill-in-the-blank-util";

import type {FillInTheBlankPublicWidgetOptions} from "./fill-in-the-blank-util";
import type {PerseusFillInTheBlankWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusFillInTheBlankWidgetOptions = {
    content: "",
    widgets: {},
    tiles: [],
    maxUsesPerTile: 1,
    randomize: false,
};

const fillInTheBlankWidgetLogic = {
    name: "fill-in-the-blank",
    version: {major: 0, minor: 0},
    defaultAlignment: "block",
    defaultWidgetOptions,
    accessible: true,
    getPublicWidgetOptions: getFillInTheBlankPublicWidgetOptions,
    traverseChildWidgets: (props, traverseRenderer) => ({
        ...props,
        ...traverseRenderer(props),
    }),
} satisfies WidgetLogic<
    "fill-in-the-blank",
    PerseusFillInTheBlankWidgetOptions,
    FillInTheBlankPublicWidgetOptions
>;

export default fillInTheBlankWidgetLogic;
