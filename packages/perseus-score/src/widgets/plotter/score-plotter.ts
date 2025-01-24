import {approximateDeepEqual} from "@khanacademy/perseus-core";
import _ from "underscore";

import validatePlotter from "./validate-plotter";

import type {
    PerseusPlotterUserInput,
    PerseusPlotterRubric,
    PerseusScore,
} from "../../validation.types";

function scorePlotter(
    userInput: PerseusPlotterUserInput,
    rubric: PerseusPlotterRubric,
): PerseusScore {
    const validationError = validatePlotter(userInput, rubric);
    if (validationError) {
        return validationError;
    }
    return {
        type: "points",
        earned: approximateDeepEqual(userInput, rubric.correct) ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scorePlotter;
