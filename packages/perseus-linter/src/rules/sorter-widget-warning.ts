import Rule from "../rule";

// Exported for tests
export const sorterMaxCards = 10;
export const sorterMaxIdealCards = 5;
export const sorterMaxHorizontalCards = 5;

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
        const layout: "horizontal" | "vertical" = widget.options.layout;

        if (correct.length > sorterMaxCards) {
            warnings.push(
                `Sorter cannot have more than ${sorterMaxCards} cards.`,
            );
        }

        if (
            layout === "horizontal" &&
            correct.length > sorterMaxHorizontalCards
        ) {
            warnings.push(
                `Sorter cannot have more than ${sorterMaxHorizontalCards} cards in horizontal layout.`,
            );
        }

        if (correct.length > sorterMaxIdealCards) {
            warnings.push(
                `Having more than ${sorterMaxIdealCards} cards in Sorter is discouraged.`,
            );
        }

        return warnings.join("\n\n");
    },
}) as Rule;
