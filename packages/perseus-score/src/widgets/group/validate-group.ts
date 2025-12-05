import {getWidgetIdsFromContent} from "@khanacademy/perseus-core";

import {emptyWidgetsFunctional} from "../../validate";

import type {
    PerseusGroupUserInput,
    PerseusGroupValidationData,
    ValidationResult,
} from "@khanacademy/perseus-core";

function validateGroup(
    userInput: PerseusGroupUserInput | undefined,
    validationData: PerseusGroupValidationData,
    locale: string,
): ValidationResult {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const widgetIds = getWidgetIdsFromContent(validationData.content);
    const emptyWidgets = emptyWidgetsFunctional(
        validationData.widgets,
        widgetIds,
        userInput,
        locale,
    );

    if (emptyWidgets.length === 0) {
        return null;
    }

    return {type: "invalid", message: null};
}

export default validateGroup;
