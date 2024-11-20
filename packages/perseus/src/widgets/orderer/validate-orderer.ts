import type {PerseusScore} from "../../types";
import type {PerseusOrdererUserInput} from "../../validation.types";

/**
 * Checks user inputfrom the orderer widget to see if the user has started
 * ordering the options, making the widget scorable.
 * @param userInput
 * @see `scoreOrderer` for more details.
 */
function validateOrderer(
    userInput: PerseusOrdererUserInput,
): Extract<PerseusScore, {type: "invalid"}> | null {
    if (userInput.current.length === 0) {
        return {
            type: "invalid",
            message: null,
        };
    }

    return null;
}

export default validateOrderer;
