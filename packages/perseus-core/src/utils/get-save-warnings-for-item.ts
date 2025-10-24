import * as KAS from "@khanacademy/kas";

import type {
    PerseusItem,
    PerseusWidgetsMap,
    ExpressionWidget,
    RadioWidget,
} from "../data-schema";

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
            case "expression":
                allSaveWarnings.push(
                    ...getSaveWarningsForExpressionWidget(widget),
                );
                break;
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

function getSaveWarningsForExpressionWidget(
    widget: ExpressionWidget,
): Array<string> {
    const issues: Array<any | string> = [];
    const {answerForms, functions} = widget.options;

    if (answerForms.length === 0) {
        issues.push("No answers specified");
    } else {
        const hasCorrect = answerForms.some((form) => {
            return form.considered === "correct";
        });
        if (!hasCorrect) {
            issues.push("No correct answer specified");
        }

        answerForms.forEach((form, ix) => {
            if (form.value === "") {
                issues.push(`Answer ${ix + 1} is empty`);
            } else {
                // note we're not using icu for content creators
                const expression = KAS.parse(form.value, {
                    functions: functions,
                });
                if (!expression.parsed) {
                    issues.push(`Couldn't parse ${form.value}`);
                } else if (form.simplify && !expression.expr.isSimplified()) {
                    issues.push(
                        `${form.value} isn't simplified, but is required to be`,
                    );
                }
            }
        });

        // The following TODO is transferred over from the expression editor:
        // TODO(joel) - warn about:
        //   - unreachable answers (how??)
        //   - specific answers following unspecific answers
        //   - incorrect answers as the final form
    }

    return issues;
}

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
