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

    it("warns for a sorter card with text before an image", () => {
        expectWarning(
            sorterWidgetErrorRule,
            "[[☃ sorter 1]]",
            {
                widgets: {
                    "sorter 1": {
                        options: {
                            correct: [
                                "Cat",
                                "Dog ![a dog](https://example.com/dog.png)",
                            ],
                        },
                    },
                },
            },
            {
                message:
                    "Sorter cards cannot mix images with other content. A card with an image cannot contain anything else.",
            },
        );
    });

    it("warns for a sorter card with math alongside an image", () => {
        expectWarning(
            sorterWidgetErrorRule,
            "[[☃ sorter 1]]",
            {
                widgets: {
                    "sorter 1": {
                        options: {
                            correct: [
                                "$x^2$ ![a graph](https://example.com/graph.png)",
                                "Dog",
                            ],
                        },
                    },
                },
            },
            {
                message:
                    "Sorter cards cannot mix images with other content. A card with an image cannot contain anything else.",
            },
        );
    });

    it("warns for a sorter card holding more than one image", () => {
        expectWarning(
            sorterWidgetErrorRule,
            "[[☃ sorter 1]]",
            {
                widgets: {
                    "sorter 1": {
                        options: {
                            correct: [
                                "![a cat](https://example.com/cat.png)![a dog](https://example.com/dog.png)",
                                "Emu",
                            ],
                        },
                    },
                },
            },
            {
                message:
                    "Sorter cards cannot mix images with other content. A card with an image cannot contain anything else.",
            },
        );
    });

    it("passes for a sorter widget whose cards are each a single image", () => {
        expectPass(sorterWidgetErrorRule, "[[☃ sorter 1]]", {
            widgets: {
                "sorter 1": {
                    options: {
                        correct: [
                            "![a cat](https://example.com/cat.png)",
                            "  ![a dog](https://example.com/dog.png)  ",
                        ],
                    },
                },
            },
        });
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
