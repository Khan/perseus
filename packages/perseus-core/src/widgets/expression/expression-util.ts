import * as KAS from "@khanacademy/kas";

import type {
    ExpressionWidget,
    PerseusExpressionWidgetOptions,
} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusExpressionWidgetOptions type
 */
export type ExpressionPublicWidgetOptions = {
    buttonSets: PerseusExpressionWidgetOptions["buttonSets"];
    functions: PerseusExpressionWidgetOptions["functions"];
    times: PerseusExpressionWidgetOptions["times"];
    visibleLabel?: PerseusExpressionWidgetOptions["visibleLabel"];
    ariaLabel?: PerseusExpressionWidgetOptions["ariaLabel"];
    buttonsVisible?: PerseusExpressionWidgetOptions["buttonsVisible"];
    extraKeys?: PerseusExpressionWidgetOptions["extraKeys"];
};

/**
 * Given a PerseusExpressionWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getExpressionPublicWidgetOptions(
    options: PerseusExpressionWidgetOptions,
): ExpressionPublicWidgetOptions {
    return {
        buttonSets: options.buttonSets,
        functions: options.functions,
        times: options.times,
        visibleLabel: options.visibleLabel,
        ariaLabel: options.ariaLabel,
        buttonsVisible: options.buttonsVisible,
        extraKeys: options.extraKeys,
    };
}

export function getSaveWarningsForExpressionWidget(
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

export default getExpressionPublicWidgetOptions;
