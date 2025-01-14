import Util from "../../util";

import validatePlotter from "./validate-plotter";

import type {PerseusScore} from "../../types";
import type {
    PerseusPlotterScoringData,
    PerseusPlotterUserInput,
} from "@khanacademy/perseus-score";

const {deepEq} = Util;

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
        earned: deepEq(userInput, scoringData.correct) ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scorePlotter;
