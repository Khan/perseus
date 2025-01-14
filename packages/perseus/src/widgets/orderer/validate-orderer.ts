import type {ValidationResult} from "../../types";
import type {PerseusOrdererUserInput} from "@khanacademy/perseus-score";

/**
 * Checks user input from the orderer widget to see if the user has started
 * ordering the options, making the widget scorable.
 * @param userInput
 * @see `scoreOrderer` for more details.
 */
function validateOrderer(userInput: PerseusOrdererUserInput): ValidationResult {
    if (userInput.current.length === 0) {
        return {
            type: "invalid",
            message: null,
        };
    }

    return null;
}

export default validateOrderer;
