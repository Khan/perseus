import {getWidgetIdsFromContent} from "@khanacademy/perseus-core";

import {emptyWidgetsFunctional} from "../../validate";

import type {
    PerseusGroupUserInput,
    PerseusGroupWidgetOptions,
    ValidationResult,
} from "@khanacademy/perseus-core";

function validateGroup(
    userInput: PerseusGroupUserInput | undefined,
    widgetOptions: PerseusGroupWidgetOptions,
    locale: string,
): ValidationResult {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const widgetIds = getWidgetIdsFromContent(widgetOptions.content);
    const emptyWidgets = emptyWidgetsFunctional(
        widgetOptions.widgets,
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
