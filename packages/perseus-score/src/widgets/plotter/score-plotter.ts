import {approximateDeepEqual} from "@khanacademy/perseus-core";
import _ from "underscore";

import type {
    PerseusPlotterUserInput,
    PerseusPlotterRubric,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scorePlotter(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusPlotterUserInput | undefined,
    rubric: PerseusPlotterRubric,
): PerseusScore {
    return {
        type: "points",
        earned: approximateDeepEqual(userInput, rubric.correct) ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scorePlotter;
