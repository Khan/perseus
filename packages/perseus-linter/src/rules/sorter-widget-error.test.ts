import {expectPass, expectWarning} from "../__tests__/test-utils";

import sorterWidgetErrorRule from "./sorter-widget-error";

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
});
