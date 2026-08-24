import {getOrdererPublicWidgetOptions} from "./orderer-util";

import type {OrdererPublicWidgetOptions} from "./orderer-util";
import type {
    PerseusOrdererWidgetOptions,
    PerseusRenderer,
} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const toCard = (content: string): PerseusRenderer => ({
    content,
    widgets: {},
    images: {},
});

const defaultCorrectOptions = [toCard("$x$")];
const defaultOtherOptions = [toCard("$y$")];

const defaultWidgetOptions: PerseusOrdererWidgetOptions = {
    correctOptions: defaultCorrectOptions,
    otherOptions: defaultOtherOptions,
    // `options` is the deck the student picks from, which the editor keeps in
    // sync as the union of the correct answer and the distractors.
    options: [...defaultCorrectOptions, ...defaultOtherOptions],
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
