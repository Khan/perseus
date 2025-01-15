import _ from "underscore";

import type {
    PerseusPlotterUserInput,
    PerseusPlotterValidationData,
    ValidationResult,
} from "../../validation.types";

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
    if (_.isEqual(userInput, validationData.starting)) {
        return {
            type: "invalid",
            message: null,
        };
    }
    return null;
}

export default validatePlotter;
