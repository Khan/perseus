import Rule from "../rule";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";

// Exported for tests
export const sorterMaxCards = 10;
export const sorterMaxIdealCards = 5;
export const sorterMaxHorizontalCards = 5;

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
        const options: PerseusSorterWidgetOptions = widget.options;
        const {layout, correct = []} = options;

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
});
