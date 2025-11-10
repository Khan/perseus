import * as KAS from "@khanacademy/kas";

import Rule from "../rule";

export default Rule.makeRule({
    name: "expression-widget-error",
    severity: Rule.Severity.ERROR,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at expression widgets
        if (state.currentNode().widgetType !== "expression") {
            return;
        }

        const nodeId = state.currentNode().id;
        if (!nodeId) {
            return;
        }

        // If it can't find a definition for the widget it does nothing
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const widget = context && context.widgets && context.widgets[nodeId];
        if (!widget) {
            return;
        }

        // Get all save warnings for the expression widget
        const issues: Array<any | string> = [];
        const {answerForms, functions} = widget.options;

        if (answerForms.length === 0) {
            issues.push("No answers specified.");
        } else {
            const hasCorrect = answerForms.some((form) => {
                return form.considered === "correct";
            });
            if (!hasCorrect) {
                issues.push("No correct answer specified.");
            }

            answerForms.forEach((form, ix) => {
                if (form.value === "") {
                    issues.push(`Answer ${ix + 1} is empty.`);
                } else {
                    // note we're not using icu for content creators
                    const expression = KAS.parse(form.value, {
                        functions: functions,
                    });
                    if (!expression.parsed) {
                        issues.push(`Couldn't parse ${form.value}.`);
                    } else if (
                        form.simplify &&
                        !expression.expr.isSimplified()
                    ) {
                        issues.push(
                            `${form.value} isn't simplified, but is required to be.`,
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

        const allWarningsString = issues.join("\n\n");
        return allWarningsString;
    },
}) as Rule;
