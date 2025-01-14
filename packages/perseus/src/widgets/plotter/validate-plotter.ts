import Util from "../../util";

import type {ValidationResult} from "../../types";
import type {
    PerseusPlotterUserInput,
    PerseusPlotterValidationData,
} from "@khanacademy/perseus-score";

const {deepEq} = Util;

/**
 * Checks user input to confirm it is not the same as the starting values for the graph.
 * This means the user has modified the graph, and the question can be scored.
 *
 * @see 'scorePlotter' for more details on scoring.
 */
function validatePlotter(
    userInput: PerseusPlotterUserInput,
    validationData: PerseusPlotterValidationData,
): ValidationResult {
    if (deepEq(userInput, validationData.starting)) {
        return {
            type: "invalid",
            message: null,
        };
    }
    return null;
}

export default validatePlotter;
