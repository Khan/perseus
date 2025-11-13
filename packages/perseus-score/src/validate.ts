import {scoreIsEmpty} from "./score";
import {getWidgetValidator} from "./widgets/widget-registry";

import type {UserInputMap, ValidationDataMap} from "@khanacademy/perseus-core";

/**
 * Checks the given user input to see if any answerable widgets have not been
 * "filled in" (ie. if they're empty). Another way to think about this
 * function is that its a check to see if we can score the provided input.
 */
export function emptyWidgetsFunctional(
    widgets: ValidationDataMap,
    // there _could_ be widgets in the widgets map that isn't in the content,
    // so these widget IDs should be the widget IDs that are actually used
    // (see: getWidgetIdsFromContent)
    widgetIds: ReadonlyArray<string>,
    userInputMap: UserInputMap,
    locale: string,
): ReadonlyArray<string> {
    return widgetIds.filter((id) => {
        const widget = widgets[id];
        if (!widget || widget.static === true) {
            // Static widgets shouldn't count as empty
            return false;
        }

        const validator = getWidgetValidator(widget.type);
        const userInput = userInputMap[id];
        const validationData = widget.options;
        const score = validator?.(userInput, validationData, locale);

        if (score) {
            // only keep the invalid results that are considered "empty"
            return scoreIsEmpty(score);
        }

        // If validator returned null, the widget is valid/filled, so not empty
        return false;
    });
}

// TODO: this is very similar to emptyWidgetsFunctional,
// they should be merged
export function validateWidgets(
    widgets: ValidationDataMap,
    // there _could_ be widgets in the widgets map that isn't in the content,
    // so these widget IDs should be the widget IDs that are actually used
    // (see: getWidgetIdsFromContent)
    widgetIds: ReadonlyArray<string>,
    userInputMap: UserInputMap,
    locale: string,
): ReadonlyArray<string> {
    return widgetIds.filter((id) => {
        const widget = widgets[id];
        if (!widget || widget.static === true) {
            // Static widgets shouldn't count as empty
            return false;
        }

        const validator = getWidgetValidator(widget.type);
        const userInput = userInputMap[id];
        const validationData = widget.options;
        const score = validator?.(userInput, validationData, locale);

        // keep IDs for all invalid widgets
        return score?.type === "invalid";
    });
}
