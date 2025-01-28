import {emptyWidgetsFunctional} from "../../validate";

import type {
    PerseusGroupUserInput,
    PerseusGroupValidationData,
    ValidationResult,
} from "../../validation.types";

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
