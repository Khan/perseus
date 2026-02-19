import getPlotterPublicWidgetOptions from "./plotter-util";

import type {PerseusPlotterWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type PlotterDefaultWidgetOptions = Pick<
    PerseusPlotterWidgetOptions,
    | "scaleY"
    | "maxY"
    | "snapsPerLine"
    | "correct"
    | "starting"
    | "type"
    | "labels"
    | "categories"
    | "picSize"
    | "picBoxHeight"
    | "plotDimensions"
    | "labelInterval"
    | "picUrl"
>;

function initializeWidgetOptions(): PlotterDefaultWidgetOptions {
    return {
        scaleY: 1,
        maxY: 10,
        snapsPerLine: 2,
        correct: [1],
        starting: [1],

        type: "bar",
        labels: ["", ""],
        categories: [""],

        picSize: 30,
        picBoxHeight: 36,
        plotDimensions: [275, 200],
        labelInterval: 1,

        picUrl: null,
    };
}

const plotterWidgetLogic: WidgetLogic<PlotterDefaultWidgetOptions> = {
    name: "plotter",
    initializeWidgetOptions,
    getPublicWidgetOptions: getPlotterPublicWidgetOptions,
    accessible: false,
};

export default plotterWidgetLogic;
