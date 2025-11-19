import Rule from "../rule";

export default Rule.makeRule({
    name: "radio-widget-error",
    severity: Rule.Severity.ERROR,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at radio widgets
        if (state.currentNode().widgetType !== "radio") {
            return;
        }

        const nodeId = state.currentNode().id;
        if (!nodeId) {
            return;
        }

        // If it can't find a definition for the widget it does nothing
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const widget = context?.widgets?.[nodeId];
        if (!widget) {
            return;
        }

        // Error if no choice is marked as correct.
        const choices = widget.options.choices;
        if (!choices.some((choice) => choice.correct)) {
            return "No choice is marked as correct.";
        }
    },
}) as Rule;
