import {expectPass, expectWarning} from "../__tests__/test-utils";

import sorterWidgetErrorRule from "./sorter-widget-error";
import sorterWidgetWarningRule from "./sorter-widget-warning";

describe("sorter-widget-error", () => {
    it("warns for a sorter widget with a blank card", () => {
        expectWarning(
            sorterWidgetErrorRule,
            "[[☃ sorter 1]]",
            {
                widgets: {
                    "sorter 1": {
                        options: {correct: ["Cat", ""]},
                    },
                },
            },
            {message: "Sorter cards cannot be blank."},
        );
    });

    it("warns for a sorter widget with a whitespace-only card", () => {
        expectWarning(
            sorterWidgetErrorRule,
            "[[☃ sorter 1]]",
            {
                widgets: {
                    "sorter 1": {
                        options: {correct: ["Cat", "   "]},
                    },
                },
            },
            {message: "Sorter cards cannot be blank."},
        );
    });

    it("warns for a sorter widget with only one card", () => {
        expectWarning(
            sorterWidgetErrorRule,
            "[[☃ sorter 1]]",
            {
                widgets: {
                    "sorter 1": {
                        options: {correct: ["Cat"]},
                    },
                },
            },
            {message: "Sorter requires at least 2 cards."},
        );
    });

    it("warns for a sorter widget with no cards", () => {
        expectWarning(
            sorterWidgetErrorRule,
            "[[☃ sorter 1]]",
            {
                widgets: {
                    "sorter 1": {
                        options: {correct: []},
                    },
                },
            },
            {message: "Sorter requires at least 2 cards."},
        );
    });

    it("reports both problems when a sorter has a single blank card", () => {
        expectWarning(
            sorterWidgetErrorRule,
            "[[☃ sorter 1]]",
            {
                widgets: {
                    "sorter 1": {
                        options: {correct: [""]},
                    },
                },
            },
            {
                message:
                    "Sorter requires at least 2 cards.\n\nSorter cards cannot be blank.",
            },
        );
    });

    it("errors for a sorter widget with too many cards", () => {
        expectWarning(
            sorterWidgetErrorRule,
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
                        },
                        layout: "vertical",
                    },
                },
            },
            {
                message: "Sorter cannot have more than 10 cards.",
            },
        );
    });

    it("errors for a sorter widget with too many cards in horizontal layout", () => {
        expectWarning(
            sorterWidgetErrorRule,
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
                    "Sorter cannot have more than 5 cards in horizontal layout.",
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
                message: "Having more than 5 cards in Sorter is discouraged.",
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

    it("passes for a sorter widget whose cards all have text", () => {
        expectPass(sorterWidgetErrorRule, "[[☃ sorter 1]]", {
            widgets: {
                "sorter 1": {
                    options: {correct: ["Cat", "Dog", "Emu"]},
                },
            },
        });
    });

    it("passes for a widget of another type", () => {
        expectPass(sorterWidgetErrorRule, "[[☃ matcher 1]]", {
            widgets: {
                "matcher 1": {
                    options: {left: [], right: []},
                },
            },
        });
    });

    // Passes for `sorterWidgetErrorRule`. Not checking
    // `sorterWidgetWarningRule` in this test.
    it("passes for a vertical sorter with more than max horizontal cards", () => {
        expectPass(sorterWidgetErrorRule, "[[☃ sorter 1]]", {
            widgets: {
                "sorter 1": {
                    options: {
                        correct: ["1", "2", "3", "4", "5", "6"],
                        layout: "vertical",
                    },
                },
            },
        });
    });
});
