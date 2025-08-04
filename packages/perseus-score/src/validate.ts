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
    // This is a port of old code, I'm not sure why
    // we need widgetIds vs the keys of the widgets object
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
            return scoreIsEmpty(score);
        }

        // If validator returned null, the widget is valid/filled, so not empty
        return false;
    });
}
