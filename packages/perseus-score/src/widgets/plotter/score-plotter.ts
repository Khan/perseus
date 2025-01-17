import {approximateDeepEqual} from "@khanacademy/perseus-core";
import _ from "underscore";

import validatePlotter from "./validate-plotter";

import type {
    PerseusPlotterUserInput,
    PerseusPlotterScoringData,
    PerseusScore,
} from "../../validation.types";

function scorePlotter(
    userInput: PerseusPlotterUserInput,
    scoringData: PerseusPlotterScoringData,
): PerseusScore {
    const validationError = validatePlotter(userInput, scoringData);
    if (validationError) {
        return validationError;
    }
    return {
        type: "points",
        earned: approximateDeepEqual(userInput, scoringData.correct) ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scorePlotter;
