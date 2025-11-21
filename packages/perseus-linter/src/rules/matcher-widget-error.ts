import Rule from "../rule";

export default Rule.makeRule({
    name: "matcher-widget-error",
    severity: Rule.Severity.ERROR,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at matcher widgets
        if (state.currentNode().widgetType !== "matcher") {
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

        if (widget.options.left.length !== widget.options.right.length) {
            return "The two halves of the matcher have different numbers of cards.";
        }
    },
}) as Rule;
