import {SORTER_MAX_CARDS} from "@khanacademy/perseus-core";

import {linterWarning} from "../lint";
import Rule from "../rule";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";

// Exported for tests
export const sorterMaxIdealCards = 5;
export const sorterMaxHorizontalCards = 5;
// Counts TeX source, not rendered characters. Longer labels wrap, so this
// only warns.
export const sorterMaxLegendLabelLength = 30;

export const SorterLegendMissing = Rule.makeWidgetRule({
    name: "sorter-legend-missing",
    widgetType: "sorter",
    lint(widget) {
        if (widget.options.legend == null) {
            return linterWarning(
                "Sorter exercises without a labeled legend are marked inaccessible.",
            );
        }
    },
});

export const SorterLegendDescription = Rule.makeWidgetRule({
    name: "sorter-legend-description",
    widgetType: "sorter",
    lint(widget) {
        const {legend} = widget.options;
        if (legend != null && legend.ariaLabel.trim() === "") {
            return linterWarning("Sorter legend description cannot be blank.");
        }
    },
});

export const SorterLegendLabels = Rule.makeWidgetRule({
    name: "sorter-legend-labels",
    widgetType: "sorter",
    lint(widget) {
        const {legend} = widget.options;
        if (legend == null) {
            return;
        }
        const labels = [
            {side: "start", text: legend.startLabel},
            {side: "end", text: legend.endLabel},
        ];
        const warnings: string[] = [];
        for (const {side, text} of labels) {
            if (text.trim() === "") {
                warnings.push(`Sorter legend ${side} label cannot be blank.`);
            } else if (text.length > sorterMaxLegendLabelLength) {
                warnings.push(
                    `Sorter legend ${side} label is longer than ` +
                        `${sorterMaxLegendLabelLength} characters.`,
                );
            }
        }
        return warnings.map((warning) => linterWarning(warning));
    },
});

export default Rule.makeWidgetRule({
    name: "sorter-widget-warning",
    widgetType: "sorter",
    lint(widget) {
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

        return warnings.map((warning) => linterWarning(warning));
    },
});
