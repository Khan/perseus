import {
    SORTER_MAX_CARDS,
    SORTER_MAX_LEGEND_LABEL_LENGTH,
} from "@khanacademy/perseus-core";

import {expectPass, expectWarning} from "../__tests__/test-utils";

import sorterWidgetWarningRule, {
    SorterLegendLabels,
    SorterLegendMissing,
    SorterLegendScreenReaderLabel,
    sorterMaxIdealCards,
    sorterMaxHorizontalCards,
} from "./sorter-widget-warning";

import type {SorterLegend} from "@khanacademy/perseus-core";

describe("sorter-widget-warning", () => {
    it("warns for a sorter widget with over max cards in vertical layout", () => {
        expectWarning(
            sorterWidgetWarningRule,
            "[[☃ sorter 1]]",
            {
                widgets: {
                    "sorter 1": {
                        options: {
                            correct: Array.from(
                                {length: SORTER_MAX_CARDS + 1},
                                (_, i) => i,
                            ),
                            layout: "vertical",
                        },
                    },
                },
            },
            {
                message:
                    "Sorter cannot have more than 10 cards.\n\nHaving more than 5 cards in Sorter is discouraged.",
            },
        );
    });

    it("warns for a sorter widget with over max cards in horizontal layout", () => {
        expectWarning(
            sorterWidgetWarningRule,
            "[[☃ sorter 1]]",
            {
                widgets: {
                    "sorter 1": {
                        options: {
                            correct: Array.from(
                                {length: SORTER_MAX_CARDS + 1},
                                (_, i) => i,
                            ),
                            layout: "horizontal",
                        },
                    },
                },
            },
            {
                message:
                    "Sorter cannot have more than 10 cards.\n\nSorter cannot have more than 5 cards in horizontal layout.\n\nHaving more than 5 cards in Sorter is discouraged.",
            },
        );
    });

    it("warns for a sorter widget with too many cards in horizontal layout", () => {
        expectWarning(
            sorterWidgetWarningRule,
            "[[☃ sorter 1]]",
            {
                widgets: {
                    "sorter 1": {
                        options: {
                            correct: Array.from(
                                {length: sorterMaxHorizontalCards + 1},
                                (_, i) => i,
                            ),
                            layout: "horizontal",
                        },
                    },
                },
            },
            {
                message:
                    "Sorter cannot have more than 5 cards in horizontal layout.\n\nHaving more than 5 cards in Sorter is discouraged.",
            },
        );
    });

    it("warns for a sorter widget with more than ideal number of cards in horizontal layout", () => {
        expectWarning(
            sorterWidgetWarningRule,
            "[[☃ sorter 1]]",
            {
                widgets: {
                    "sorter 1": {
                        options: {
                            correct: Array.from(
                                {length: sorterMaxIdealCards + 1},
                                (_, i) => i,
                            ),
                            layout: "horizontal",
                        },
                    },
                },
            },
            {
                message:
                    "Sorter cannot have more than 5 cards in horizontal layout.\n\nHaving more than 5 cards in Sorter is discouraged.",
            },
        );
    });

    it("warns for a sorter widget with more than ideal number of cards in vertical layout", () => {
        expectWarning(
            sorterWidgetWarningRule,
            "[[☃ sorter 1]]",
            {
                widgets: {
                    "sorter 1": {
                        options: {
                            correct: Array.from(
                                {length: sorterMaxIdealCards + 1},
                                (_, i) => i,
                            ),
                            layout: "vertical",
                        },
                    },
                },
            },
            {
                message: "Having more than 5 cards in Sorter is discouraged.",
            },
        );
    });
});

const completeLegend: SorterLegend = {
    startCap: "arrow",
    endCap: "bar",
    startLabel: "Lowest",
    endLabel: "Highest",
    ariaLabel: "Interest rates, lowest at the start to highest at the end",
    position: "above",
};

function sorterWithLegend(legend: SorterLegend | undefined) {
    return {
        widgets: {
            "sorter 1": {
                type: "sorter",
                options: {
                    correct: ["Cat", "Dog"],
                    layout: "horizontal",
                    legend,
                },
            },
        },
    };
}

describe("sorter-legend-missing", () => {
    it("warns when a sorter has no legend", () => {
        expectWarning(
            SorterLegendMissing,
            "[[☃ sorter 1]]",
            sorterWithLegend(undefined),
            {
                message:
                    "sorter 1: Sorter exercises without a labeled legend are marked inaccessible.",
            },
        );
    });

    it("passes when a sorter has a legend", () => {
        expectPass(
            SorterLegendMissing,
            "[[☃ sorter 1]]",
            sorterWithLegend(completeLegend),
        );
    });
});

describe("sorter-legend-screen-reader-label", () => {
    it("warns when the screen reader label is blank", () => {
        expectWarning(
            SorterLegendScreenReaderLabel,
            "[[☃ sorter 1]]",
            sorterWithLegend({...completeLegend, ariaLabel: " "}),
            {
                message:
                    "sorter 1: Sorter legend screen reader label cannot be blank.",
            },
        );
    });

    it("passes when the screen reader label has text", () => {
        expectPass(
            SorterLegendScreenReaderLabel,
            "[[☃ sorter 1]]",
            sorterWithLegend(completeLegend),
        );
    });

    it("passes when there is no legend", () => {
        expectPass(
            SorterLegendScreenReaderLabel,
            "[[☃ sorter 1]]",
            sorterWithLegend(undefined),
        );
    });
});

describe("sorter-legend-labels", () => {
    it("warns when the start and end labels are blank", () => {
        expectWarning(
            SorterLegendLabels,
            "[[☃ sorter 1]]",
            sorterWithLegend({...completeLegend, startLabel: "", endLabel: ""}),
            {
                message:
                    "sorter 1: Sorter legend start label cannot be blank.\n\nSorter legend end label cannot be blank.",
            },
        );
    });

    it("warns when a label is over the character limit", () => {
        expectWarning(
            SorterLegendLabels,
            "[[☃ sorter 1]]",
            sorterWithLegend({
                ...completeLegend,
                endLabel: "a".repeat(SORTER_MAX_LEGEND_LABEL_LENGTH + 1),
            }),
            {
                message: `sorter 1: Sorter legend end label is longer than ${SORTER_MAX_LEGEND_LABEL_LENGTH} characters.`,
            },
        );
    });

    it("passes when a label is exactly at the character limit", () => {
        expectPass(
            SorterLegendLabels,
            "[[☃ sorter 1]]",
            sorterWithLegend({
                ...completeLegend,
                startLabel: "a".repeat(SORTER_MAX_LEGEND_LABEL_LENGTH),
            }),
        );
    });

    it("passes when there is no legend", () => {
        expectPass(
            SorterLegendLabels,
            "[[☃ sorter 1]]",
            sorterWithLegend(undefined),
        );
    });
});
