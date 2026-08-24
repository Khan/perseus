import {approximateDeepEqual} from "@khanacademy/perseus-core";

import type {
    PerseusPlotterUserInput,
    PlotterPublicWidgetOptions,
    ValidationResult,
} from "@khanacademy/perseus-core";

/**
 * Checks user input to confirm it is not the same as the starting values for the graph.
 * This means the user has modified the graph, and the question can be scored.
 *
 * @see 'scorePlotter' for more details on scoring.
 */
function validatePlotter(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusPlotterUserInput | undefined,
    validationData: PlotterPublicWidgetOptions,
): ValidationResult {
    if (
        userInput == null ||
        approximateDeepEqual(userInput, validationData.starting)
    ) {
        return {
            type: "invalid",
            message: null,
        };
    }
    return null;
}

export default validatePlotter;
