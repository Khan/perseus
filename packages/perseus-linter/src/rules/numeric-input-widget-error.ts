import {linterError} from "../lint";
import Rule from "../rule";

import type {Lint} from "../lint";

export default Rule.makeWidgetRule({
    name: "numeric-input-widget-error",
    widgetType: "numeric-input",
    lint(widget) {
        const issues: Lint[] = [];
        const answers = widget.options.answers;
        if (answers.some((answer) => answer.value == null)) {
            issues.push(linterError("One or more answers is empty"));
        }

        answers.forEach((answer, i) => {
            const formatError =
                answer.strict &&
                (!answer.answerForms || answer.answerForms.length === 0);
            if (formatError) {
                issues.push(
                    linterError(
                        `Answer ${i + 1} requires a format, but no format was selected`,
                    ),
                );
            }
        });

        return issues;
    },
});
