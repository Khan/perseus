import validateCategorizer from "./validate-categorizer";

import type {
    PerseusCategorizerScoringData,
    PerseusCategorizerUserInput,
    PerseusScore,
} from "../../validation.types";

function scoreCategorizer(
    userInput: PerseusCategorizerUserInput,
    scoringData: PerseusCategorizerScoringData,
): PerseusScore {
    const validationError = validateCategorizer(userInput, scoringData);
    if (validationError) {
        return validationError;
    }

    let allCorrect = true;
    scoringData.values.forEach((value, i) => {
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
