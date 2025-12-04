import {
    applyDefaultsToWidgets,
    getWidgetIdsFromContent,
    type PerseusRenderer,
    type PerseusScore,
    type UserInput,
    type UserInputMap,
    type ValidationDataMap,
} from "@khanacademy/perseus-core";

import {flattenScores, isWidgetScoreable, scoreIsEmpty} from "./score";
import {getWidgetValidator} from "./widgets/widget-registry";

/**
 * validate, meant for client-side validation using answerless Perseus data
 *
 * TODO: this should probably just take the PerseusItem (vs the PerseusRenderer)
 * @param perseusRenderData - the answerless Perseus data
 * @param userInputMap - the user's input for each widget, mapped by ID
 * @param locale - string locale for math parsing ("de" 1.000,00 vs "en" 1,000.00)
 *
 * @returns an invalid "score" if there's invalid input, otherwise null
 */
export function validateUserInput(
    perseusRenderData: PerseusRenderer,
    userInputMap: UserInputMap,
    locale: string,
): PerseusScore | null {
    // There seems to be a chance that PerseusRenderer.widgets might include
    // widget data for widgets that are not in PerseusRenderer.content,
    // so this checks that the widgets are being used before scoring them
    const usedWidgetIds = getWidgetIdsFromContent(perseusRenderData.content);
    // TODO: do we still need this? Shouldn't this happen during parse/migrate?
    const upgradedWidgets = applyDefaultsToWidgets(perseusRenderData.widgets);

    const gradedWidgetIds = usedWidgetIds.filter((id) =>
        isWidgetScoreable(upgradedWidgets[id]),
    );

    const validationErrors: Record<string, PerseusScore> = {};
    gradedWidgetIds.forEach((id) => {
        const widget = upgradedWidgets[id];
        if (!widget) {
            return;
        }

        // TODO(benchristel): Without the explicit type annotation, the type of
        // userInput would be inferred as `any`. This is because the keys of
        // userInputMap are strings with a specific format, but `id` is any old
        // string. Find a way to make this more typesafe.
        const userInput: UserInput | undefined = userInputMap[id];
        const validator = getWidgetValidator(widget.type);

        // See if any of the widgets have validation errors
        const validationError = validator?.(userInput, widget.options, locale);
        if (validationError != null) {
            validationErrors[id] = validationError;
        }
    });

    return Object.keys(validationErrors).length > 0
        ? flattenScores(validationErrors)
        : null;
}

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
