import {approximateDeepEqual} from "@khanacademy/perseus-core";

import type {
    PerseusPlotterUserInput,
    PerseusPlotterWidgetOptions,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scorePlotter(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusPlotterUserInput | undefined,
    widgetOptions: PerseusPlotterWidgetOptions,
): PerseusScore {
    return {
        type: "points",
        earned: approximateDeepEqual(userInput, widgetOptions.correct) ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scorePlotter;
