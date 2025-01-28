import validateCategorizer from "./validate-categorizer";

import type {
    PerseusCategorizerRubric,
    PerseusCategorizerUserInput,
    PerseusScore,
} from "../../validation.types";

function scoreCategorizer(
    userInput: PerseusCategorizerUserInput,
    rubric: PerseusCategorizerRubric,
): PerseusScore {
    const validationError = validateCategorizer(userInput, rubric);
    if (validationError) {
        return validationError;
    }

    let allCorrect = true;
    rubric.values.forEach((value, i) => {
        if (userInput.values[i] !== value) {
            allCorrect = false;
        }
    });
    return {
        type: "points",
        earned: allCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreCategorizer;
