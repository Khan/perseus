import type {
    PerseusGroupUserInput,
    GroupPublicWidgetOptions,
    ValidationResult,
    ValidatorContext,
} from "@khanacademy/perseus-core";

function validateGroup(
    userInput: PerseusGroupUserInput | undefined,
    validationData: GroupPublicWidgetOptions,
    locale: string,
    context: ValidatorContext,
): ValidationResult {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const result = context.validateWidgets(validationData, userInput, locale);
    return result?.type === "invalid" ? result : null;
}

export default validateGroup;
