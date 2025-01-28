import {
    emptyWidgetsFunctional,
    type PerseusGroupUserInput,
    type PerseusGroupValidationData,
    type ValidationResult,
} from "@khanacademy/perseus-score";

function validateGroup(
    userInput: PerseusGroupUserInput,
    validationData: PerseusGroupValidationData,
    locale: string,
): ValidationResult {
    const emptyWidgets = emptyWidgetsFunctional(
        validationData.widgets,
        Object.keys(validationData.widgets),
        userInput,
        locale,
    );

    if (emptyWidgets.length === 0) {
        return null;
    }

    return {type: "invalid", message: null};
}

export default validateGroup;
