import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "../../types";
import type {
    PerseusCategorizerUserInput,
    PerseusCategorizerValidationData,
} from "../../validation.types";

function validateCategorizer(
    userInput: PerseusCategorizerUserInput,
    validationData: PerseusCategorizerValidationData,
    strings: PerseusStrings,
): Extract<PerseusScore, {type: "invalid"}> | null {
    const incomplete = validationData.items.some(
        (_, i) => userInput.values[i] == null,
    );

    if (incomplete) {
        return {
            type: "invalid",
            message: strings.invalidSelection,
        };
    }
    return null;
}

export default validateCategorizer;
