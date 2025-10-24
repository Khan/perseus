import type {PerseusItem, PerseusWidgetsMap, RadioWidget} from "../data-schema";

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
    const widgets: PerseusWidgetsMap = item.question.widgets;
    const content = item.question.content;

    // Only check widgets that are actually referenced in the content
    // (widgets can remain in the widgets object after being deleted from content)
    for (const [widgetId, widget] of Object.entries(widgets)) {
        if (!content.includes(widgetId)) {
            continue;
        }

        switch (widget.type) {
            case "radio":
                allSaveWarnings.push(...getSaveWarningsForRadioWidget(widget));
                break;
            default:
                break;
        }
    }

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
