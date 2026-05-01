import Rule from "../rule";

// eslint-disable-next-line no-restricted-syntax
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
            return `Inputs should have an aria label:
While screen readers will fallback to a default label of 'Your answer', a more descriptive label would improve accessibility.`;
        }
    },
}) as Rule;
