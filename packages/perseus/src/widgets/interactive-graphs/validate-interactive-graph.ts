import _ from "underscore";

import type {PerseusScore} from "../../types";
import type {
    PerseusInteractiveGraphUserInput,
    PerseusInteractiveGraphValidationData,
} from "../../validation.types";

/**
 * Checks if the user input is the same as the starting state.
 * @param userInput
 * @param validationData
 * @see `scoreInteractiveGraph` for the scoring logic.
 */
function validateInteractiveGraph(
    userInput: PerseusInteractiveGraphUserInput,
    validationData: PerseusInteractiveGraphValidationData,
): Extract<PerseusScore, {type: "invalid"}> | null {
    // When nothing has moved, there will neither be coords nor the
    // circle's center/radius fields. When those fields are absent, skip
    // all these checks; just go mark the answer as empty.
    const hasValue = Boolean(
        // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
        userInput.coords ||
            // @ts-expect-error - TS2339 - Property 'center' does not exist on type 'PerseusGraphType'. | TS2339 - Property 'radius' does not exist on type 'PerseusGraphType'.
            (userInput.center && userInput.radius),
    );

    if (!hasValue || _.isEqual(userInput, validationData.graph)) {
        // We're where we started.
        return {
            type: "invalid",
            message: null,
        };
    }
    return null;
}

export default validateInteractiveGraph;
