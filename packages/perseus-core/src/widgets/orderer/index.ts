import {
    getOrdererPublicWidgetOptions,
    mergeCards,
    toCard,
} from "./orderer-util";

import type {OrdererPublicWidgetOptions} from "./orderer-util";
import type {PerseusOrdererWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultCorrectOptions = [toCard("$x$")];
const defaultOtherOptions = [toCard("$y$")];

const defaultWidgetOptions: PerseusOrdererWidgetOptions = {
    correctOptions: defaultCorrectOptions,
    otherOptions: defaultOtherOptions,
    // `options` is the card bank the learner picks from, derived the same way the
    // editor re-derives it on every edit.
    options: mergeCards(defaultCorrectOptions, defaultOtherOptions),
    height: "normal",
    layout: "horizontal",
};

const ordererWidgetLogic: WidgetLogic<
    PerseusOrdererWidgetOptions,
    OrdererPublicWidgetOptions
> = {
    name: "orderer",
    defaultWidgetOptions,
    getPublicWidgetOptions: getOrdererPublicWidgetOptions,
    accessible: false,
};

export default ordererWidgetLogic;
