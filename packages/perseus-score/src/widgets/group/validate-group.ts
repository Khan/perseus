import {validateUserInput} from "../../validate";

import type {
    PerseusGroupUserInput,
    GroupPublicWidgetOptions,
    ValidationResult,
} from "@khanacademy/perseus-core";

// A group hosts a full Perseus renderer, so it validates its widgets the way
// an item does, and reports their messages (e.g. an answer that's too long),
// not only whether one is empty.
function validateGroup(
    userInput: PerseusGroupUserInput | undefined,
    validationData: GroupPublicWidgetOptions,
    locale: string,
): ValidationResult {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const result = validateUserInput(validationData, userInput, locale);
    // validateUserInput combines only invalid results, so it never returns
    // points; the check narrows its type to a ValidationResult.
    return result?.type === "invalid" ? result : null;
}

export default validateGroup;
