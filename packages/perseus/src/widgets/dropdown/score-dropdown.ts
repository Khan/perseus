import validateDropdown from "./validate-dropdown";

import type {PerseusScore} from "../../types";
import type {
    PerseusDropdownScoringData,
    PerseusDropdownUserInput,
} from "../../validation.types";

function scoreDropdown(
    userInput: PerseusDropdownUserInput,
    scoringData: PerseusDropdownScoringData,
): PerseusScore {
    const validationError = validateDropdown(userInput);
    if (validationError) {
        return validationError;
    }
    const correct = scoringData.choices[userInput.value - 1].correct;
    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreDropdown;
