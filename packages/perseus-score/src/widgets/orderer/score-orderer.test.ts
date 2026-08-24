import scoreOrderer from "./score-orderer";

import type {
    PerseusOrdererWidgetOptions,
    PerseusOrdererUserInput,
} from "@khanacademy/perseus-core";

function generateOrdererWidgetOptions(): PerseusOrdererWidgetOptions {
    return {
        otherOptions: [],
        layout: "horizontal",
        options: [
            {content: "a", images: {}, widgets: {}},
            {content: "c", images: {}, widgets: {}},
            {content: "b", images: {}, widgets: {}},
        ],
        correctOptions: [
            {content: "a", images: {}, widgets: {}},
            {content: "b", images: {}, widgets: {}},
            {content: "c", images: {}, widgets: {}},
        ],
        height: "normal",
    };
}

describe("scoreOrderer", () => {
    it("is invalid when the userInput is undefined", () => {
        // Arrange
        const widgetOptions: PerseusOrdererWidgetOptions =
            generateOrdererWidgetOptions();
        const userInput = undefined;

        // Act
        const result = scoreOrderer(userInput, widgetOptions);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("is correct when the userInput is in the same order and is the same length as the widgetOptions's correctOption content items", () => {
        // Arrange
        const widgetOptions: PerseusOrdererWidgetOptions =
            generateOrdererWidgetOptions();

        const userInput: PerseusOrdererUserInput = {
            current: widgetOptions.correctOptions.map((e) => e.content),
        };

        // Act
        const result = scoreOrderer(userInput, widgetOptions);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("is incorrect when the userInput is not in the same order as the widgetOptions's correctOption content items", () => {
        // Arrange
        const widgetOptions: PerseusOrdererWidgetOptions =
            generateOrdererWidgetOptions();

        const userInput: PerseusOrdererUserInput = {
            current: widgetOptions.options.map((e) => e.content),
        };

        // Act
        const result = scoreOrderer(userInput, widgetOptions);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("is incorrect when the userInput is not the same length as the widgetOptions's correctOption content items", () => {
        // Arrange
        const widgetOptions: PerseusOrdererWidgetOptions =
            generateOrdererWidgetOptions();

        const userInput: PerseusOrdererUserInput = {
            current: widgetOptions.correctOptions
                .map((e) => e.content)
                .slice(1),
        };

        // Act
        const result = scoreOrderer(userInput, widgetOptions);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});
