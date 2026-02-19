import getOrdererPublicWidgetOptions from "./orderer-util";

import type {PerseusOrdererWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type OrdererDefaultWidgetOptions = Pick<
    PerseusOrdererWidgetOptions,
    "correctOptions" | "otherOptions" | "height" | "layout"
>;

function initializeWidgetOptions(): OrdererDefaultWidgetOptions {
    return {
        correctOptions: [{content: "$x$"}] as any,
        otherOptions: [{content: "$y$"}] as any,
        height: "normal",
        layout: "horizontal",
    };
}

const ordererWidgetLogic: WidgetLogic<OrdererDefaultWidgetOptions> = {
    name: "orderer",
    initializeWidgetOptions,
    getPublicWidgetOptions: getOrdererPublicWidgetOptions,
    accessible: false,
};

export default ordererWidgetLogic;
