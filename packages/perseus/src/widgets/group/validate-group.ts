import {emptyWidgetsFunctional} from "../../renderer-util";

import type {PerseusStrings} from "../../strings";
import type {
    PerseusGroupUserInput,
    PerseusGroupValidationData,
    ValidationResult,
} from "@khanacademy/perseus-score";

function validateGroup(
    userInput: PerseusGroupUserInput,
    validationData: PerseusGroupValidationData,
    strings: PerseusStrings,
    locale: string,
): ValidationResult {
    const emptyWidgets = emptyWidgetsFunctional(
        validationData.widgets,
        Object.keys(validationData.widgets),
        userInput,
        strings,
        locale,
    );

    if (emptyWidgets.length === 0) {
        return null;
    }

    return {type: "invalid", message: null};
}

export default validateGroup;
