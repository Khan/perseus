import plotterLogic from "../../widgets/plotter";

import type {
    PerseusPlotterWidgetOptions,
    PlotterWidget,
} from "../../data-schema";

export function generatePlotterOptions(
    options?: Partial<PerseusPlotterWidgetOptions>,
): PerseusPlotterWidgetOptions {
    return {
        ...plotterLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generatePlotterWidget(
    plotterWidgetProperties?: Partial<Omit<PlotterWidget, "type">>,
): PlotterWidget {
    return {
        type: "plotter",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generatePlotterOptions(),
        ...plotterWidgetProperties,
    };
}
