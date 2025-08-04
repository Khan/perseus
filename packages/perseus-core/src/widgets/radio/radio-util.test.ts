import getRadioPublicWidgetOptions from "./radio-util";

import type {PerseusRadioWidgetOptions} from "../../data-schema";

describe("getRadioPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusRadioWidgetOptions = {
            choices: [
                {
                    id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                    content: "$-8$ and $8$",
                    correct: false,
                    rationale:
                        "The square root operation ($\\sqrt{\\phantom{x}}$)...",
                },
                {
                    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                    content: "$-8$",
                    correct: false,
                    rationale:
                        "While $(-8)^2=64$, the square root operation...",
                },
                {
                    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
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
                    id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                    content: "$-8$ and $8$",
                },
                {
                    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                    content: "$-8$",
                },
                {
                    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
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
                    id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                    content: "1 Incorrect",
                    correct: false,
                },
                {
                    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                    content: "2 Incorrect",
                    correct: true,
                },
                {
                    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
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
                    id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                    content: "1 Incorrect",
                },
                {
                    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                    content: "2 Incorrect",
                },
                {
                    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
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
                    id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                    content: "1 Incorrect",
                    correct: false,
                },
                {
                    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                    content: "2 Incorrect",
                    correct: true,
                },
                {
                    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
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
                    id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                    content: "1 Incorrect",
                },
                {
                    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                    content: "2 Incorrect",
                },
                {
                    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
                    content: "3 Correct",
                },
            ],
            countChoices: false,
            multipleSelect: true,
        });
    });
});
