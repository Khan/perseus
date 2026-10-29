import {SORTER_MAX_CARDS} from "@khanacademy/perseus-core";

import Rule from "../rule";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";

// Exported for tests
export const sorterMaxIdealCards = 5;
export const sorterMaxHorizontalCards = 5;

export default Rule.makeWidgetRule({
    name: "sorter-widget-warning",
    widgetType: "sorter",
    severity: Rule.Severity.WARNING,
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

        return warnings;
    },
});
