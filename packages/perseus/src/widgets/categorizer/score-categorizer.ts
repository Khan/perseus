import validateCategorizer from "./validate-categorizer";

import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "../../types";
import type {
    PerseusCategorizerScoringData,
    PerseusCategorizerUserInput,
} from "../../validation.types";

function scoreCategorizer(
    userInput: PerseusCategorizerUserInput,
    scoringData: PerseusCategorizerScoringData,
    strings: PerseusStrings,
): PerseusScore {
    const validationError = validateCategorizer(
        userInput,
        scoringData,
        strings,
    );
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
