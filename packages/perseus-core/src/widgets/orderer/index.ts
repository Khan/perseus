import {getOrdererPublicWidgetOptions} from "./orderer-util";

import type {PerseusOrdererWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type OrdererDefaultWidgetOptions = Pick<
    PerseusOrdererWidgetOptions,
    "correctOptions" | "otherOptions" | "height" | "layout"
>;

const defaultWidgetOptions: OrdererDefaultWidgetOptions = {
    // eslint-disable-next-line no-restricted-syntax
    correctOptions: [{content: "$x$"}] as any,
    // eslint-disable-next-line no-restricted-syntax
    otherOptions: [{content: "$y$"}] as any,
    height: "normal",
    layout: "horizontal",
};

const ordererWidgetLogic: WidgetLogic = {
    name: "orderer",
    defaultWidgetOptions,
    getPublicWidgetOptions: getOrdererPublicWidgetOptions,
    accessible: false,
};

export default ordererWidgetLogic;
