import {
    generateGradedGroupOptions,
    generateGradedGroupWidget,
} from "./generators/graded-group-widget-generator";
import {
    generateGroupOptions,
    generateGroupWidget,
} from "./generators/group-widget-generator";
import {
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
    generateSimpleRadioItem,
} from "./generators/radio-widget-generator";
import {itemHasRationales} from "./item-has-rationales";
import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "./test-utils";

describe("itemHasRationales", () => {
    it("returns true when item has radio widget with rationales", () => {
        // Arrange
        const item = generateSimpleRadioItem({
            choices: [
                {
                    id: "radio-choice-0",
                    content: "Choice 1",
                    correct: false,
                },
                {
                    id: "radio-choice-1",
                    content: "Choice 2",
                    correct: false,
                    rationale: "This is some rationale",
                },
            ],
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
                    "graded-group 1": generateGradedGroupWidget({
                        options: generateGradedGroupOptions({
                            widgets: {
                                "radio 1": generateRadioWidget({
                                    options: generateRadioOptions({
                                        choices: [
                                            generateRadioChoice("Choice 1", {
                                                rationale:
                                                    "This is some rationale",
                                            }),
                                        ],
                                    }),
                                }),
                            },
                            title: "Test group",
                            content: "Test content",
                        }),
                    }),
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
            question: generateTestPerseusRenderer({
                content: "[[☃ group 1]]",
                widgets: {
                    "group 1": generateGroupWidget({
                        options: generateGroupOptions({
                            widgets: {
                                "radio 1": generateRadioWidget({
                                    options: generateRadioOptions({
                                        choices: [
                                            generateRadioChoice("Choice 1", {
                                                rationale:
                                                    "This is some rationale",
                                            }),
                                        ],
                                    }),
                                }),
                            },
                            content: "Test content",
                        }),
                    }),
                },
            }),
        });

        // Act
        const result = itemHasRationales(item);

        // Assert
        expect(result).toBe(true);
    });

    it("returns false when item has no widgets with rationales", () => {
        // Arrange
        const item = generateSimpleRadioItem({
            choices: [
                generateRadioChoice("Choice 1"),
                generateRadioChoice("Choice 2", {
                    correct: true,
                }),
            ],
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
