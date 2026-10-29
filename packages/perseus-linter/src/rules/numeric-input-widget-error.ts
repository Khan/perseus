import Rule from "../rule";

export default Rule.makeWidgetRule({
    name: "numeric-input-widget-error",
    widgetType: "numeric-input",
    severity: Rule.Severity.ERROR,
    lint(widget) {
        const issues: Array<any | string> = [];
        const answers = widget.options.answers;
        if (answers.some((answer) => answer.value == null)) {
            issues.push("One or more answers is empty");
        }

        answers.forEach((answer, i) => {
            const formatError =
                answer.strict &&
                (!answer.answerForms || answer.answerForms.length === 0);
            if (formatError) {
                issues.push(
                    `Answer ${i + 1} requires a format, but no format was selected`,
                );
            }
        });

        return issues;
    },
});
