import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "../../types";
import type {
    PerseusCategorizerRubric,
    PerseusCategorizerUserInput,
} from "../../validation.types";

function categorizerValidator(
    userInput: PerseusCategorizerUserInput,
    rubric: PerseusCategorizerRubric,
    strings: PerseusStrings,
): PerseusScore {
    let completed = true;
    let allCorrect = true;
    rubric.values.forEach((value, i) => {
        if (userInput.values[i] == null) {
            completed = false;
        }
        if (userInput.values[i] !== value) {
            allCorrect = false;
        }
    });
    if (!completed) {
        return {
            type: "invalid",
            message: strings.invalidSelection,
        };
    }
    return {
        type: "points",
        earned: allCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default categorizerValidator;
