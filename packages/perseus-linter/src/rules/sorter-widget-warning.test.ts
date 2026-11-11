import {
    SORTER_MAX_CARDS,
    SORTER_MAX_LEGEND_LABEL_LENGTH,
} from "@khanacademy/perseus-core";

import {expectIssue, expectPass} from "../__tests__/test-utils";

import sorterWidgetWarningRule, {
    SorterLegendLabels,
    SorterLegendMissing,
    SorterLegendDescription,
    sorterMaxIdealCards,
    sorterMaxHorizontalCards,
} from "./sorter-widget-warning";

import type {SorterLegend} from "@khanacademy/perseus-core";

describe("sorter-widget-warning", () => {
    it("warns for a sorter widget with over max cards in vertical layout", () => {
        expectIssue(
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
                messages: [
                    "sorter 1: Sorter cannot have more than 10 cards.",
                    "sorter 1: Having more than 5 cards in Sorter is discouraged.",
                ],
            },
        );
    });

    it("warns for a sorter widget with over max cards in horizontal layout", () => {
        expectIssue(
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
                messages: [
                    "sorter 1: Sorter cannot have more than 10 cards.",
                    "sorter 1: Sorter cannot have more than 5 cards in horizontal layout.",
                    "sorter 1: Having more than 5 cards in Sorter is discouraged.",
                ],
            },
        );
    });

    it("warns for a sorter widget with too many cards in horizontal layout", () => {
        expectIssue(
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
                messages: [
                    "sorter 1: Sorter cannot have more than 5 cards in horizontal layout.",
                    "sorter 1: Having more than 5 cards in Sorter is discouraged.",
                ],
            },
        );
    });

    it("warns for a sorter widget with more than ideal number of cards in horizontal layout", () => {
        expectIssue(
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
                messages: [
                    "sorter 1: Sorter cannot have more than 5 cards in horizontal layout.",
                    "sorter 1: Having more than 5 cards in Sorter is discouraged.",
                ],
            },
        );
    });

    it("warns for a sorter widget with more than ideal number of cards in vertical layout", () => {
        expectIssue(
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
                messages: [
                    "sorter 1: Having more than 5 cards in Sorter is discouraged.",
                ],
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
        expectIssue(
            SorterLegendMissing,
            "[[☃ sorter 1]]",
            sorterWithLegend(undefined),
            {
                messages: [
                    "sorter 1: Sorter exercises without a labeled legend are marked inaccessible.",
                ],
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

describe("sorter-legend-description", () => {
    it("warns when the description is blank", () => {
        expectIssue(
            SorterLegendDescription,
            "[[☃ sorter 1]]",
            sorterWithLegend({...completeLegend, ariaLabel: " "}),
            {
                messages: [
                    "sorter 1: Sorter legend description cannot be blank.",
                ],
            },
        );
    });

    it("passes when the description has text", () => {
        expectPass(
            SorterLegendDescription,
            "[[☃ sorter 1]]",
            sorterWithLegend(completeLegend),
        );
    });

    it("passes when there is no legend", () => {
        expectPass(
            SorterLegendDescription,
            "[[☃ sorter 1]]",
            sorterWithLegend(undefined),
        );
    });
});

describe("sorter-legend-labels", () => {
    it("warns when the start and end labels are blank", () => {
        expectIssue(
            SorterLegendLabels,
            "[[☃ sorter 1]]",
            sorterWithLegend({...completeLegend, startLabel: "", endLabel: ""}),
            {
                messages: [
                    "sorter 1: Sorter legend start label cannot be blank.",
                    "sorter 1: Sorter legend end label cannot be blank.",
                ],
            },
        );
    });

    it("warns when a label is over the character limit", () => {
        expectIssue(
            SorterLegendLabels,
            "[[☃ sorter 1]]",
            sorterWithLegend({
                ...completeLegend,
                endLabel: "a".repeat(SORTER_MAX_LEGEND_LABEL_LENGTH + 1),
            }),
            {
                messages: [
                    `sorter 1: Sorter legend end label is longer than ${SORTER_MAX_LEGEND_LABEL_LENGTH} characters.`,
                ],
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
