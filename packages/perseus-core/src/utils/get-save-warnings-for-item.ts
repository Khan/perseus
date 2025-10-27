import {traverse} from "../traversal";

import type {PerseusItem, RadioWidget} from "../data-schema";

/* ------- Main save warnings function for the whole item ------- */

// TODO(LEMS-3643): Remove the "WORK IN PROGRESS" comment below once all
// widgets have been migrated and the function is ready for use.
/**
 * WORK IN PROGRESS: Get the save warnings (blocking issues) for a given PerseusItem.
 *
 * @param item - The PerseusItem that will be fully parsed and checked
 *                for blocking changes that should prevent the item from being
 *                saved/published.
 * @returns An array of strings, each representing a warning that should prevent
 *          the item from being saved/published.
 */
export function getSaveWarningsForItem(item: PerseusItem): Array<string> {
    const allSaveWarnings: Array<string> = [];

    // Use traverse to check all widgets, including nested widgets
    // (e.g., widgets inside graded-group, explanation, etc.)
    traverse(
        item.question,
        null, // contentCallback - not needed for this use case
        (widgetInfo, _) => {
            // widgetCallback - called for each widget in the tree
            switch (widgetInfo.type) {
                case "radio":
                    allSaveWarnings.push(
                        ...getSaveWarningsForRadioWidget(widgetInfo),
                    );
                    break;
                default:
                    break;
            }
            // Return undefined to keep the widget unchanged
            return undefined;
        },
    );

    return allSaveWarnings;
}

/* ------- Widget-specific save warnings helper functions ------- */

/* TODO(LEMS-3643): The following widgets have getSaveWarnings implemented
within their editors. Migrate them here:
 - Expression
 - Free Response
 - Graded Group
 - Graded Group Set
 - Group
 - Matcher
 - Numeric Input
 - Phet Simulation
 - Python Program
 - Interactive Graph
 - Label Image
 - Radio (already done)
*/

function getSaveWarningsForRadioWidget(widget: RadioWidget): Array<string> {
    const issues: Array<string> = [];

    // Radio widget must have at least one correct choice.
    let hasCorrectChoice = false;
    for (const choice of widget.options.choices) {
        if (choice.correct) {
            hasCorrectChoice = true;
            break;
        }
    }
    if (!hasCorrectChoice) {
        issues.push("No choice is marked as correct.");
    }

    return issues;
}
