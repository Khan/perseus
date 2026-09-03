import {getSorterPublicWidgetOptions} from "./sorter-util";

import type {SorterPublicWidgetOptions} from "./sorter-util";
import type {PerseusSorterWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusSorterWidgetOptions = {
    correct: ["$x$", "$y$", "$z$"],
    layout: "horizontal",
    padding: true,
};

const sorterWidgetLogic = {
    name: "sorter",
    defaultWidgetOptions,
    getPublicWidgetOptions: getSorterPublicWidgetOptions,
    accessible: false,
} satisfies WidgetLogic<
    "sorter",
    PerseusSorterWidgetOptions,
    SorterPublicWidgetOptions
>;

export default sorterWidgetLogic;
