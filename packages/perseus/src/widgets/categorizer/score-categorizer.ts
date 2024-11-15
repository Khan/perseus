import validateCategorizer from "./validate-categorizer";

import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "../../types";
import type {
    PerseusCategorizerRubric,
    PerseusCategorizerUserInput,
} from "../../validation.types";

function scoreCategorizer(
    userInput: PerseusCategorizerUserInput,
    rubric: PerseusCategorizerRubric,
    strings: PerseusStrings,
): PerseusScore {
    const validationError = validateCategorizer(userInput, rubric, strings);
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
