import {
    ErrorCodes,
    type PerseusCategorizerUserInput,
    type PerseusCategorizerWidgetOptions,
    type ValidationResult,
} from "@khanacademy/perseus-core";

/**
 * Checks userInput from the categorizer widget to see if the user has selected
 * a category for each item.
 * @param userInput - The user's input corresponding to an array of indices that
 * represent the selected category for each row/item.
 * @param widgetOptions - The widget's options; only `items` is read, to learn
 * how many rows/items there are
 */
function validateCategorizer(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusCategorizerUserInput | undefined,
    widgetOptions: PerseusCategorizerWidgetOptions,
): ValidationResult {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const incomplete = widgetOptions.items.some(
        (_, i) => userInput.values[i] == null,
    );

    if (incomplete) {
        return {
            type: "invalid",
            message: ErrorCodes.INVALID_SELECTION_ERROR,
        };
    }
    return null;
}

export default validateCategorizer;
