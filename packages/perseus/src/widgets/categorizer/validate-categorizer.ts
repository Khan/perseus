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
    const incomplete = rubric.items.some((_, i) => userInput.values[i] == null);

    if (incomplete) {
        return {
            type: "invalid",
            message: strings.invalidSelection,
        };
    }
    return null;
}

export default validateCategorizer;
