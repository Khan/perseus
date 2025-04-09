import {getWidgetIdsFromContent} from "@khanacademy/perseus-core";

import type {UserInputMap} from "./validation.types";
import type {PerseusItem} from "@khanacademy/perseus-core";

/**
 * Check the emptiness of DINER widgets (for the AX team):
 * - Dropdown
 * - InteractiveGraph
 * - NumericInput
 * - Expression
 * - Radio
 *
 * @param {PerseusItem} itemData
 * @param {UserInputMap} userInputMap
 * @returns {boolean} true if there's an empty widget, otherwise false
 */
function emptyDinerCheck(
    itemData: PerseusItem,
    userInputMap: UserInputMap,
): boolean {
    const usedWidgetIds = getWidgetIdsFromContent(itemData.question.content);
    const widgets = itemData.question.widgets;

    for (const widgetId of usedWidgetIds) {
        const widget = widgets[widgetId];
        const input = userInputMap[widgetId];

        switch (widget.type) {
            case "dropdown": {
                if (input.value === 0) {
                    return true;
                }
                break;
            }
            case "interactive-graph": {
                // doesn't do client-side validation
                break;
            }
            case "numeric-input": {
                // this is possibly a source of bugs,
                // really it should be:
                // empty input && not coefficient && answer is not 1
                // but we don't have answers here
                // (see: scoreNumericInput)
                if (!input.currentValue && !widget.options.coefficient) {
                    return true;
                }
                break;
            }
            case "expression": {
                if (!input) {
                    return true;
                }
                break;
            }
            case "radio": {
                if (!input.choicesSelected.includes(true)) {
                    return true;
                }
                break;
            }
        }
    }

    return false;
}

export default emptyDinerCheck;
