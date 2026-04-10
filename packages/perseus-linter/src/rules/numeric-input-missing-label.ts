import Rule from "../rule";

export default Rule.makeRule({
    name: "numeric-input-missing-label",
    severity: Rule.Severity.WARNING,
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

        if (!widget.options.labelText) {
            return "No aria label is set. Screen readers will use a default label. Consider adding a descriptive label for accessibility.";
        }
    },
}) as Rule;
