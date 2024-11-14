import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "../../types";
import type {
    PerseusCategorizerRubric,
    PerseusCategorizerUserInput,
} from "../../validation.types";

function validateCategorizer(
    userInput: PerseusCategorizerUserInput,
    rubric: PerseusCategorizerRubric,
    strings: PerseusStrings,
): Extract<PerseusScore, {type: "invalid"}> | null {
    let completed = true;
    rubric.values.forEach((_, i) => {
        if (userInput.values[i] == null) {
            completed = false;
        }
    });
    if (!completed) {
        return {
            type: "invalid",
            message: strings.invalidSelection,
        };
    }
    return null;
}

export default validateCategorizer;
