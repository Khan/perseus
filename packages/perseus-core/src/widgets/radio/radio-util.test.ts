import getRadioPublicWidgetOptions from "./radio-util";

import type {PerseusRadioWidgetOptions} from "../../data-schema";

describe("getRadioPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusRadioWidgetOptions = {
            choices: [
                {
                    id: "0-0-0-0-0",
                    content: "$-8$ and $8$",
                    correct: false,
                    rationale:
                        "The square root operation ($\\sqrt{\\phantom{x}}$)...",
                },
                {
                    id: "1-1-1-1-1",
                    content: "$-8$",
                    correct: false,
                    rationale:
                        "While $(-8)^2=64$, the square root operation...",
                },
                {
                    id: "2-2-2-2-2",
                    content: "There is no such input value.",
                    isNoneOfTheAbove: true,
                    correct: true,
                    rationale: "This is a none of the above option.",
                    // Note(tamara): Choices in a Radio don't use the widgets key, but
                    // the key exists in prod so we want to make sure we don't
                    // break things (unknown things) by confirming it passes
                    // through the getPulicWidgetOptions function unchanged.
                },
            ],
            hasNoneOfTheAbove: false,
            countChoices: false,
            randomize: false,
            multipleSelect: false,
            deselectEnabled: false,
        };

        // Act
        const publicWidgetOptions = getRadioPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            choices: [
                {
                    id: "0-0-0-0-0",
                    content: "$-8$ and $8$",
                },
                {
                    id: "1-1-1-1-1",
                    content: "$-8$",
                },
                {
                    id: "2-2-2-2-2",
                    content: "There is no such input value.",
                    isNoneOfTheAbove: true,
                },
            ],
            hasNoneOfTheAbove: false,
            countChoices: false,
            randomize: false,
            multipleSelect: false,
            deselectEnabled: false,
        });
    });

    it("should include numCorrect if it's going to be used", () => {
        // Arrange
        const options: PerseusRadioWidgetOptions = {
            choices: [
                {
                    id: "0-0-0-0-0",
                    content: "1 Incorrect",
                    correct: false,
                },
                {
                    id: "1-1-1-1-1",
                    content: "2 Incorrect",
                    correct: true,
                },
                {
                    id: "2-2-2-2-2",
                    content: "3 Correct",
                    correct: true,
                },
            ],
            numCorrect: 2,
            countChoices: true,
            multipleSelect: true,
        };

        // Act
        const publicWidgetOptions = getRadioPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            choices: [
                {
                    id: "0-0-0-0-0",
                    content: "1 Incorrect",
                },
                {
                    id: "1-1-1-1-1",
                    content: "2 Incorrect",
                },
                {
                    id: "2-2-2-2-2",
                    content: "3 Correct",
                },
            ],
            numCorrect: 2,
            countChoices: true,
            multipleSelect: true,
        });
    });

    it("should exclude numCorrect if it's not going to be used", () => {
        // Arrange
        const options: PerseusRadioWidgetOptions = {
            choices: [
                {
                    id: "0-0-0-0-0",
                    content: "1 Incorrect",
                    correct: false,
                },
                {
                    id: "1-1-1-1-1",
                    content: "2 Incorrect",
                    correct: true,
                },
                {
                    id: "2-2-2-2-2",
                    content: "3 Correct",
                    correct: true,
                },
            ],
            numCorrect: 2,
            countChoices: false,
            multipleSelect: true,
        };

        // Act
        const publicWidgetOptions = getRadioPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            choices: [
                {
                    id: "0-0-0-0-0",
                    content: "1 Incorrect",
                },
                {
                    id: "1-1-1-1-1",
                    content: "2 Incorrect",
                },
                {
                    id: "2-2-2-2-2",
                    content: "3 Correct",
                },
            ],
            countChoices: false,
            multipleSelect: true,
        });
    });
});
