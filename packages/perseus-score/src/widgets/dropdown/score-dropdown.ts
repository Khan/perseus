import validateDropdown from "./validate-dropdown";

import type {
    PerseusDropdownRubric,
    PerseusDropdownUserInput,
    PerseusScore,
} from "../../validation.types";

function scoreDropdown(
    userInput: PerseusDropdownUserInput,
    rubric: PerseusDropdownRubric,
): PerseusScore {
    const validationError = validateDropdown(userInput);
    if (validationError) {
        return validationError;
    }
    const correct = rubric.choices[userInput.value - 1].correct;
    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreDropdown;
