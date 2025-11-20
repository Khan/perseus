import Rule from "../rule";

export default Rule.makeRule({
    name: "numeric-input-widget-error",
    severity: Rule.Severity.ERROR,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at numeric input widgets
        if (state.currentNode().widgetType !== "numeric-input") {
            return;
        }

        const nodeId = state.currentNode().id;
        if (!nodeId) {
            return;
        }

        // If it can't find a definition for the widget it does nothing
        const widget = context?.widgets?.[nodeId];
        if (!widget) {
            return;
        }

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

        const allWarningsString = issues.join("\n\n");
        return allWarningsString;
    },
}) as Rule;
