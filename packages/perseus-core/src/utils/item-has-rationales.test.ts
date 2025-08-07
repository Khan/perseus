import {itemHasRationales} from "./item-has-rationales";
import {generateTestPerseusItem} from "./test-utils";

describe("itemHasRationales", () => {
    it("returns true when item has radio widget with rationales", () => {
        // Arrange
        const item = generateTestPerseusItem({
            question: {
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": {
                        type: "radio",
                        options: {
                            choices: [
                                {
                                    id: "12",
                                    content: "Choice 1",
                                    correct: false,
                                },
                                {
                                    id: "23",
                                    content: "Choice 2",
                                    correct: false,
                                    rationale: "This is some rationale",
                                },
                            ],
                        },
                    },
                },
                images: {},
            },
        });

        // Act
        const result = itemHasRationales(item);

        // Assert
        expect(result).toBe(true);
    });

    it("returns true when item has label-image widget with answers", () => {
        // Arrange
        const item = generateTestPerseusItem({
            question: {
                content: "[[☃ label-image 1]]",
                widgets: {
                    "label-image 1": {
                        type: "label-image",
                        options: {
                            markers: [
                                {
                                    answers: ["answer1", "answer2"],
                                    label: "A",
                                    x: 0,
                                    y: 0,
                                },
                            ],
                            choices: [],
                            imageUrl: "https://example.com/image.png",
                            imageAlt: "Test image",
                            imageHeight: 400,
                            imageWidth: 600,
                            static: false,
                            hideChoicesFromInstructions: false,
                            multipleAnswers: true,
                        },
                    },
                },
                images: {},
            },
        });

        // Act
        const result = itemHasRationales(item);

        // Assert
        expect(result).toBe(true);
    });

    it("returns true when item has graded-group widget with rationales", () => {
        // Arrange
        const item = generateTestPerseusItem({
            question: {
                content: "[[☃ graded-group 1]]",
                widgets: {
                    "graded-group 1": {
                        type: "graded-group",
                        options: {
                            widgets: {
                                "radio 1": {
                                    type: "radio",
                                    options: {
                                        choices: [
                                            {
                                                id: "23",
                                                content: "Choice 1",
                                                correct: false,
                                                rationale:
                                                    "This is some rationale",
                                            },
                                        ],
                                    },
                                },
                            },
                            title: "Test group",
                            content: "Test content",
                            images: {},
                        },
                    },
                },
                images: {},
            },
        });

        // Act
        const result = itemHasRationales(item);

        // Assert
        expect(result).toBe(true);
    });

    it("returns true when item has group widget with rationales", () => {
        // Arrange
        const item = generateTestPerseusItem({
            question: {
                content: "[[☃ group 1]]",
                widgets: {
                    "group 1": {
                        type: "group",
                        options: {
                            widgets: {
                                "radio 1": {
                                    type: "radio",
                                    options: {
                                        choices: [
                                            {
                                                id: "12",
                                                content: "Choice 1",
                                                correct: false,
                                                rationale:
                                                    "This is some rationale",
                                            },
                                        ],
                                    },
                                },
                            },
                            content: "Test content",
                            images: {},
                        },
                    },
                },
                images: {},
            },
        });

        // Act
        const result = itemHasRationales(item);

        // Assert
        expect(result).toBe(true);
    });

    it("returns false when item has no widgets with rationales", () => {
        // Arrange
        const item = generateTestPerseusItem({
            question: {
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": {
                        type: "radio",
                        options: {
                            choices: [
                                {
                                    id: "12",
                                    content: "Choice 1",
                                    correct: false,
                                },
                                {
                                    id: "23",
                                    content: "Choice 2",
                                    correct: true,
                                },
                            ],
                        },
                    },
                },
                images: {},
            },
        });

        // Act
        const result = itemHasRationales(item);

        // Assert
        expect(result).toBe(false);
    });

    it("returns false when item has no widgets", () => {
        // Arrange
        const item = generateTestPerseusItem({
            question: {
                content: "",
                widgets: {},
                images: {},
            },
        });

        // Act
        const result = itemHasRationales(item);

        // Assert
        expect(result).toBe(false);
    });
});
