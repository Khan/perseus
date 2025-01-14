import type {PerseusScore} from "../../types";
import type {PerseusNumberLineUserInput} from "@khanacademy/perseus-score";

/**
 * Checks user input is within the allowed range and not the same as the initial
 * state.
 * @param userInput
 * @see 'scoreNumberLine' for the scoring logic.
 */
function validateNumberLine(
    userInput: PerseusNumberLineUserInput,
): Extract<PerseusScore, {type: "invalid"}> | null {
    const divisionRange = userInput.divisionRange;
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
    return null;
}

export default validateNumberLine;
