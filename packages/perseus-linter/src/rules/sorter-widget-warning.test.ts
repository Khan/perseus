import {expectWarning} from "../__tests__/test-utils";

import sorterWidgetWarningRule from "./sorter-widget-warning";

describe("sorter-widget-error", () => {
    it("warns for a sorter widget with over max cards in vertical layout", () => {
        expectWarning(
            sorterWidgetWarningRule,
            "[[☃ sorter 1]]",
            {
                widgets: {
                    "sorter 1": {
                        options: {
                            correct: [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6",
                                "7",
                                "8",
                                "9",
                                "10",
                                "11",
                            ],
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
                            correct: [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6",
                                "7",
                                "8",
                                "9",
                                "10",
                                "11",
                            ],
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
                            correct: ["1", "2", "3", "4", "5", "6"],
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
                            correct: ["1", "2", "3", "4", "5", "6"],
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
                            correct: ["1", "2", "3", "4", "5", "6"],
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
