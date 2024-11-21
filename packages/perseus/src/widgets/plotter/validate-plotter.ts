import Util from "../../util";

import type {PerseusScore} from "../../types";
import type {
    PerseusPlotterUserInput,
    PerseusPlotterValidationData,
} from "../../validation.types";

const {deepEq} = Util;

/**
 * Checks user input to confirm it is not the same as the starting values for the graph.
 * This means the user has modified the graph, and the question can be scored.
 * @param userInput
 * @param validationData
 * @see 'scorePlotter' for more details on scoring.
 */
function validatePlotter(
    userInput: PerseusPlotterUserInput,
    validationData: PerseusPlotterValidationData,
): Extract<PerseusScore, {type: "invalid"}> | null {
    if (deepEq(userInput, validationData.starting)) {
        return {
            type: "invalid",
            message: null,
        };
    }
    return null;
}

export default validatePlotter;
