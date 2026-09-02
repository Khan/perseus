import Rule from "../rule";

const maxIdealCards = 5;

// eslint-disable-next-line no-restricted-syntax
export default Rule.makeRule({
    name: "sorter-widget-warning",
    severity: Rule.Severity.WARNING,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at sorter widgets
        if (state.currentNode().widgetType !== "sorter") {
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

        const warnings: string[] = [];
        const correct: string[] = widget.options.correct ?? [];

        if (correct.length > maxIdealCards) {
            warnings.push(
                `Having more than ${maxIdealCards} cards in Sorter is discouraged.`,
            );
        }

        return warnings.join("\n\n");
    },
}) as Rule;
