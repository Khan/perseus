import {removeOrphanedWidgets, removeOrphanedWidgetsFromPerseusItem} from "./remove-orphaned-widgets";

import type {PerseusRenderer, PerseusItem} from "../data-schema";

describe("removeOrphanedWidgetsFromPerseusItem", () => {
    it("removes orphaned widgets from the question and hints", () => {
        const renderer: PerseusRenderer = {
            content: "",
            images: {},
            widgets: {
                "radio 1": {
                    type: "radio",
                    version: {major: 3, minor: 0},
                    options: {
                        choices: [],
                    },
                },
            },
        };

        const item: PerseusItem = {
            question: renderer,
            hints: [renderer],
            answerArea: {
                calculator: false,
                financialCalculatorMonthlyPayment: false,
                financialCalculatorTotalAmount: false,
                financialCalculatorTimeToPayOff: false,
                periodicTable: false,
                periodicTableWithKey: false
            },
        };

        const result = removeOrphanedWidgetsFromPerseusItem(item);

        expect(result.question.widgets).toEqual({})
        expect(result.hints[0].widgets).toEqual({})
    });
})

describe("removeOrphanedWidgets", () => {
    it("removes an orphaned widget", () => {
        const renderer: PerseusRenderer = {
            content: "",
            images: {},
            widgets: {
                "radio 1": {
                    type: "radio",
                    version: {major: 3, minor: 0},
                    options: {
                        choices: [],
                    },
                },
            },
        };

        const result = removeOrphanedWidgets(renderer);

        // Assert: the radio widget is removed because it's not referenced.
        expect(result.widgets).toEqual({});
    });

    it("does not mutate its argument", () => {
        const renderer: PerseusRenderer = {
            content: "",
            images: {},
            widgets: {
                "radio 1": {
                    type: "radio",
                    version: {major: 3, minor: 0},
                    options: {
                        choices: [],
                    },
                },
            },
        };

        removeOrphanedWidgets(renderer);

        // Assert: the original renderer is unmodified.
        expect(renderer.widgets).toHaveProperty("radio 1");
    });

    it("keeps widgets that are referenced in the `content`", () => {
        const renderer: PerseusRenderer = {
            content: "[[☃ radio 1]]",
            images: {},
            widgets: {
                "radio 1": {
                    type: "radio",
                    version: {major: 3, minor: 0},
                    options: {
                        choices: [],
                    },
                },
            },
        };

        const result = removeOrphanedWidgets(renderer);

        expect(result.widgets).toHaveProperty("radio 1");
    });

    it("is idempotent", () => {
        const renderer: PerseusRenderer = {
            content: "[[☃ radio 1]]",
            images: {},
            widgets: {
                "radio 1": {
                    type: "radio",
                    version: {major: 3, minor: 0},
                    options: {
                        choices: [],
                    },
                },
                "radio 2": {
                    type: "radio",
                    version: {major: 3, minor: 0},
                    options: {
                        choices: [],
                    },
                },
            },
        };

        const result1 = removeOrphanedWidgets(renderer);

        expect(result1.widgets).toHaveProperty("radio 1");
        expect(result1.widgets).not.toHaveProperty("radio 2");

        const result2 = removeOrphanedWidgets(result1);

        expect(result2.widgets).toHaveProperty("radio 1");
        expect(result2.widgets).not.toHaveProperty("radio 2");
    });
});
