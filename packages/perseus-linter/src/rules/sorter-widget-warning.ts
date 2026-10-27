import {
    SORTER_MAX_CARDS,
    SORTER_MAX_LEGEND_LABEL_LENGTH,
} from "@khanacademy/perseus-core";

import Rule from "../rule";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";

// Exported for tests
export const sorterMaxIdealCards = 5;
export const sorterMaxHorizontalCards = 5;

export const SorterLegendMissing = Rule.makeWidgetRule({
    name: "sorter-legend-missing",
    widgetType: "sorter",
    severity: Rule.Severity.WARNING,
    lint(widget) {
        if (widget.options.legend == null) {
            return "Sorter exercises without a labeled legend are marked inaccessible.";
        }
    },
});

export const SorterLegendScreenReaderLabel = Rule.makeWidgetRule({
    name: "sorter-legend-screen-reader-label",
    widgetType: "sorter",
    severity: Rule.Severity.WARNING,
    lint(widget) {
        const {legend} = widget.options;
        if (legend != null && legend.ariaLabel.trim() === "") {
            return "Sorter legend screen reader label cannot be blank.";
        }
    },
});

export const SorterLegendLabels = Rule.makeWidgetRule({
    name: "sorter-legend-labels",
    widgetType: "sorter",
    severity: Rule.Severity.WARNING,
    lint(widget) {
        const {legend} = widget.options;
        if (legend == null) {
            return;
        }
        const issues: string[] = [];
        for (const [end, label] of [
            ["start", legend.startLabel],
            ["end", legend.endLabel],
        ]) {
            if (label.trim() === "") {
                issues.push(`Sorter legend ${end} label cannot be blank.`);
            } else if (label.length > SORTER_MAX_LEGEND_LABEL_LENGTH) {
                issues.push(
                    `Sorter legend ${end} label is longer than ${SORTER_MAX_LEGEND_LABEL_LENGTH} characters.`,
                );
            }
        }
        return issues.join("\n\n");
    },
});

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

        if (correct.length > SORTER_MAX_CARDS) {
            warnings.push(
                `Sorter cannot have more than ${SORTER_MAX_CARDS} cards.`,
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
