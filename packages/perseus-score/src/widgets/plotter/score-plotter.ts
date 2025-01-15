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
        earned: _.isEqual(userInput, scoringData.correct) ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scorePlotter;
