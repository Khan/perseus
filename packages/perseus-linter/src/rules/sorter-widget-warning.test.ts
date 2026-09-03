import {expectWarning} from "../__tests__/test-utils";

import sorterWidgetWarningRule, {
    sorterMaxCards,
    sorterMaxIdealCards,
    sorterMaxHorizontalCards,
} from "./sorter-widget-warning";

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
                                {length: sorterMaxCards + 1},
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
                                {length: sorterMaxCards + 1},
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
