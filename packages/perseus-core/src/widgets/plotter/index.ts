import {getPlotterPublicWidgetOptions} from "./plotter-util";

import type {PlotterPublicWidgetOptions} from "./plotter-util";
import type {PerseusPlotterWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusPlotterWidgetOptions = {
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

const plotterWidgetLogic = {
    name: "plotter",
    defaultWidgetOptions,
    getPublicWidgetOptions: getPlotterPublicWidgetOptions,
    accessible: false,
} satisfies WidgetLogic<
    "plotter",
    PerseusPlotterWidgetOptions,
    PlotterPublicWidgetOptions
>;

export default plotterWidgetLogic;
