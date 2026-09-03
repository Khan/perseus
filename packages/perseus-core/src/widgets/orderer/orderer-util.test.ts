import {generateOrdererOption} from "../../utils/generators/orderer-widget-generator";

import {getOrdererPublicWidgetOptions, mergeCards} from "./orderer-util";

import type {PerseusOrdererWidgetOptions} from "../../data-schema";

describe("getOrdererPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusOrdererWidgetOptions = {
            otherOptions: [],
            layout: "horizontal",
            options: [
                {content: "$10.9$", images: {}, widgets: {}},
                {content: "$11$", images: {}, widgets: {}},
                {content: "$\\sqrt{120}$", images: {}, widgets: {}},
            ],
            correctOptions: [
                {content: "$10.9$", images: {}, widgets: {}},
                {content: "$\\sqrt{120}$", images: {}, widgets: {}},
                {content: "$11$", images: {}, widgets: {}},
            ],
            height: "normal",
        };

        // Act
        const publicWidgetOptions = getOrdererPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            layout: "horizontal",
            options: [
                {content: "$10.9$", images: {}, widgets: {}},
                {content: "$11$", images: {}, widgets: {}},
                {content: "$\\sqrt{120}$", images: {}, widgets: {}},
            ],
            height: "normal",
        });
    });
});

describe("mergeCards", () => {
    it("combines the correct cards and the other cards", () => {
        // Arrange, Act
        const cards = mergeCards(
            [generateOrdererOption("a")],
            [generateOrdererOption("b")],
        );

        // Assert
        expect(cards).toEqual([
            generateOrdererOption("a"),
            generateOrdererOption("b"),
        ]);
    });

    it("sorts content with numbers ahead of content without", () => {
        // Arrange, Act
        const cards = mergeCards(
            [generateOrdererOption("3"), generateOrdererOption("$b$")],
            [generateOrdererOption("2"), generateOrdererOption("a")],
        );

        // Assert
        expect(cards).toEqual([
            generateOrdererOption("2"),
            generateOrdererOption("3"),
            generateOrdererOption("$b$"),
            generateOrdererOption("a"),
        ]);
    });

    it("sorts bare variables last", () => {
        // Arrange, Act
        const cards = mergeCards(
            [generateOrdererOption("x + 1"), generateOrdererOption("$y$")],
            [generateOrdererOption("hello world")],
        );

        // Assert
        expect(cards).toEqual([
            generateOrdererOption("x + 1"),
            generateOrdererOption("hello world"),
            generateOrdererOption("$y$"),
        ]);
    });

    it("removes duplicate cards", () => {
        // Arrange, Act
        const cards = mergeCards(
            [
                generateOrdererOption("duplicate"),
                generateOrdererOption("unique"),
            ],
            [generateOrdererOption("duplicate")],
        );

        // Assert
        expect(cards).toEqual([
            generateOrdererOption("duplicate"),
            generateOrdererOption("unique"),
        ]);
    });

    it("removes empty cards", () => {
        // Arrange, Act
        const cards = mergeCards(
            [generateOrdererOption(""), generateOrdererOption("existing")],
            [generateOrdererOption(""), generateOrdererOption("valid")],
        );

        // Assert
        expect(cards).toEqual([
            generateOrdererOption("existing"),
            generateOrdererOption("valid"),
        ]);
    });
});
