import {getRadioPublicWidgetOptions} from "@khanacademy/perseus-core";

import type {PerseusRadioWidgetOptions} from "../../data-schema";

describe("getRadioPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusRadioWidgetOptions = {
            choices: [
                {
                    content: "$-8$ and $8$",
                    correct: false,
                    clue: "The square root operation ($\\sqrt{\\phantom{x}}$)...",
                    widgets: {},
                },
                {
                    content: "$-8$",
                    correct: false,
                    clue: "While $(-8)^2=64$, the square root operation...",
                    widgets: {},
                },
                {
                    content: "There is no such input value.",
                    isNoneOfTheAbove: true,
                    correct: true,
                    clue: "This is a none of the above option.",
                    // Note(tamara): Choices in a Radio don't use the widgets key, but
                    // the key exists in prod so we want to make sure we don't
                    // break things (unknown things) by confirming it passes
                    // through the getPulicWidgetOptions function unchanged.
                    widgets: {
                        "sorter 1": {
                            type: "sorter",
                            options: {
                                correct: ["test"],
                                padding: true,
                                layout: "horizontal",
                            },
                        },
                    },
                },
            ],
            hasNoneOfTheAbove: false,
            countChoices: false,
            randomize: false,
            multipleSelect: false,
            deselectEnabled: false,
            onePerLine: false,
            displayCount: null,
            noneOfTheAbove: false,
        };

        // Act
        const publicWidgetOptions = getRadioPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            choices: [
                {
                    content: "$-8$ and $8$",
                    widgets: {},
                },
                {
                    content: "$-8$",
                    widgets: {},
                },
                {
                    content: "There is no such input value.",
                    isNoneOfTheAbove: true,
                    widgets: {
                        "sorter 1": {
                            type: "sorter",
                            options: {
                                correct: ["test"],
                                padding: true,
                                layout: "horizontal",
                            },
                        },
                    },
                },
            ],
            hasNoneOfTheAbove: false,
            countChoices: false,
            randomize: false,
            multipleSelect: false,
            deselectEnabled: false,
            onePerLine: false,
            displayCount: null,
            noneOfTheAbove: false,
        });
    });
});
