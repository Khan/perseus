import type {PerseusPlotterWidgetOptions} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusPlotterWidgetOptions type
 */
export type PlotterPublicWidgetOptions = Omit<
    PerseusPlotterWidgetOptions,
    "correct"
>;

/**
 * Given a PerseusPlotterWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getPlotterPublicWidgetOptions(
    options: PerseusPlotterWidgetOptions,
): PlotterPublicWidgetOptions {
    const {correct: _, ...publicOptions} = options;
    return publicOptions;
}

export default getPlotterPublicWidgetOptions;
