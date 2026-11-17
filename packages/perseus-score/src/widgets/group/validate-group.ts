import {validateUserInput} from "../../validate";

import type {
    PerseusGroupUserInput,
    GroupPublicWidgetOptions,
    ValidationResult,
} from "@khanacademy/perseus-core";

export default function validateGroup(
    userInput: PerseusGroupUserInput | undefined,
    validationData: GroupPublicWidgetOptions,
    locale: string,
): ValidationResult {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const result = validateUserInput(validationData, userInput, locale);
    return result?.type === "invalid" ? result : null;
}
