import getSorterPublicWidgetOptions from "./sorter-util";

import type {PerseusSorterWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type SorterDefaultWidgetOptions = Pick<
    PerseusSorterWidgetOptions,
    "correct" | "layout" | "padding"
>;

function initializeWidgetOptions(): SorterDefaultWidgetOptions {
    return {
        correct: ["$x$", "$y$", "$z$"],
        layout: "horizontal",
        padding: true,
    };
}

const sorterWidgetLogic: WidgetLogic<SorterDefaultWidgetOptions> = {
    name: "sorter",
    initializeWidgetOptions,
    getPublicWidgetOptions: getSorterPublicWidgetOptions,
    accessible: false,
};

export default sorterWidgetLogic;
