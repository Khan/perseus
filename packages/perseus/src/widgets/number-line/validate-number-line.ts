import type {PerseusScore} from "../../types";
import type {
    PerseusNumberLineUserInput,
    PerseusNumberLineValidationData,
} from "../../validation.types";

/**
 * Checks user input is within the allowed range and not the same as the initial
 * state.
 * @param userInput
 * @param validationData
 * @see 'scoreNumberLine' for the scoring logic.
 */
function validateNumberLine(
    userInput: PerseusNumberLineUserInput,
    validationData: PerseusNumberLineValidationData,
): Extract<PerseusScore, {type: "invalid"}> | null {
    const range = validationData.range;
    const divisionRange = userInput.divisionRange;
    const start =
        validationData.initialX != null ? validationData.initialX : range[0];
    const startRel = validationData.isInequality ? "ge" : "eq";
    const outsideAllowedRange =
        userInput.numDivisions > divisionRange[1] ||
        userInput.numDivisions < divisionRange[0];

    // TODO: I don't think isTickCrtl is a thing anymore
    if (userInput.isTickCrtl && outsideAllowedRange) {
        return {
            type: "invalid",
            message: "Number of divisions is outside the allowed range.",
        };
    }

    if (userInput.numLinePosition === start && userInput.rel === startRel) {
        // We're where we started.
        return {
            type: "invalid",
            message: null,
        };
    }
    return null;
}

export default validateNumberLine;
