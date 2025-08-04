import {isItemAccessible} from "./accessibility";
import {registerCoreWidgets} from "./widgets/core-widget-registry";

import type {PerseusItem} from "./data-schema";

describe("isItemAccessible", () => {
    beforeEach(() => {
        registerCoreWidgets();
    });

    describe("widgets", () => {
        it("should return false if the item contains any inaccessible widgets", () => {
            const itemData: PerseusItem = {
                question: {
                    content:
                        "Match the following items: [[☃ matcher 1]]\n\nHere's an explanation: [[☃ explanation 1]]\n\nAnd a graph: [[☃ interactive-graph 1]]",
                    widgets: {
                        "explanation 1": {
                            type: "explanation",
                            options: {
                                showPrompt: "Show",
                                hidePrompt: "Hide",
                                explanation: "Test explanation",
                                widgets: {},
                                static: false,
                            },
                        },
                        "interactive-graph 1": {
                            type: "interactive-graph",
                            options: {
                                graph: {
                                    type: "point",
                                    numPoints: 1,
                                },
                                range: [
                                    [-10, 10],
                                    [-10, 10],
                                ],
                                step: [1, 1],
                                markings: "graph",
                                showProtractor: false,
                                correct: {
                                    type: "point",
                                    coords: [[0, 0]],
                                },
                                lockedFigures: [],
                            },
                        },
                        "matcher 1": {
                            type: "matcher",
                            options: {
                                labels: ["Concepts", "Definitions"],
                                left: ["A", "B", "C"],
                                right: ["1", "2", "3"],
                                orderMatters: false,
                                padding: true,
                            },
                        },
                    },
                    images: {},
                },
                hints: [],
                answerArea: null,
            };

            expect(isItemAccessible(itemData)).toBe(false);
        });

        it("should return true if all widgets are accessible", () => {
            const itemData: PerseusItem = {
                question: {
                    content:
                        "Here's an explanation: [[☃ explanation 1]]\n\nChoose an option: [[☃ radio 1]]",
                    widgets: {
                        "explanation 1": {
                            type: "explanation",
                            options: {
                                showPrompt: "Show",
                                hidePrompt: "Hide",
                                explanation: "Test explanation",
                                widgets: {},
                                static: false,
                            },
                        },
                        "radio 1": {
                            type: "radio",
                            options: {
                                choices: [
                                    {
                                        id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                                        content: "Option 1",
                                        correct: true,
                                    },
                                    {
                                        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                                        content: "Option 2",
                                        correct: false,
                                    },
                                ],
                            },
                        },
                    },
                    images: {},
                },
                hints: [],
                answerArea: null,
            };

            expect(isItemAccessible(itemData)).toBe(true);
        });

        it("should mark item as inaccessible if widget options are inaccessible", () => {
            const itemData: PerseusItem = {
                question: {
                    content: "Here's an image: [[☃ image 1]]",
                    widgets: {
                        "image 1": {
                            type: "image",
                            options: {
                                backgroundImage: {
                                    url: "https://example.com/image.png",
                                    width: 400,
                                    height: 300,
                                },
                                // No alt text makes this image inaccessible
                                alt: "",
                            },
                        },
                    },
                    images: {},
                },
                hints: [],
                answerArea: null,
            };

            expect(isItemAccessible(itemData)).toBe(false);
        });

        it("should mark item as accessible if widget options are accessible", () => {
            const itemData: PerseusItem = {
                question: {
                    content: "Here's an image: [[☃ image 1]]",
                    widgets: {
                        "image 1": {
                            type: "image",
                            options: {
                                backgroundImage: {
                                    url: "https://example.com/image.png",
                                    width: 400,
                                    height: 300,
                                },
                                // Alt text makes this image accessible
                                alt: "A descriptive alt text for the image",
                            },
                        },
                    },
                    images: {},
                },
                hints: [],
                answerArea: null,
            };

            expect(isItemAccessible(itemData)).toBe(true);
        });

        it("should handle empty items", () => {
            const itemData: PerseusItem = {
                question: {
                    content: "",
                    widgets: {},
                    images: {},
                },
                hints: [],
                answerArea: null,
            };

            expect(isItemAccessible(itemData)).toBe(true);
        });

        it("should handle items with no widgets", () => {
            const itemData: PerseusItem = {
                question: {
                    content: "Just some text",
                    widgets: {},
                    images: {},
                },
                hints: [],
                answerArea: null,
            };

            expect(isItemAccessible(itemData)).toBe(true);
        });

        it("should ignore widgets that are not used in the markdown content", () => {
            const itemData: PerseusItem = {
                question: {
                    content:
                        "Here's an explanation: [[☃ explanation 1]]\n\nAnd a graph: [[☃ interactive-graph 1]]\\But matcher 1 config is unused!!",
                    widgets: {
                        "explanation 1": {
                            type: "explanation",
                            options: {
                                showPrompt: "Show",
                                hidePrompt: "Hide",
                                explanation: "Test explanation",
                                widgets: {},
                                static: false,
                            },
                        },
                        "interactive-graph 1": {
                            type: "interactive-graph",
                            options: {
                                graph: {
                                    type: "point",
                                    numPoints: 1,
                                },
                                range: [
                                    [-10, 10],
                                    [-10, 10],
                                ],
                                step: [1, 1],
                                markings: "graph",
                                showProtractor: false,
                                correct: {
                                    type: "point",
                                    coords: [[0, 0]],
                                },
                                lockedFigures: [],
                            },
                        },
                        "matcher 1": {
                            type: "matcher",
                            options: {
                                labels: ["Concepts", "Definitions"],
                                left: ["A", "B", "C"],
                                right: ["1", "2", "3"],
                                orderMatters: false,
                                padding: true,
                            },
                        },
                    },
                    images: {},
                },
                hints: [],
                answerArea: null,
            };

            expect(isItemAccessible(itemData)).toBe(true);
        });
    });

    describe("markdown", () => {
        it("should return false if the item markdown contains any inaccessible images", () => {
            const itemData: PerseusItem = {
                question: {
                    content:
                        "Here's an image: ![](https://example.com/image.png)",
                    widgets: {},
                    images: {},
                },
                hints: [],
                answerArea: null,
            };

            expect(isItemAccessible(itemData)).toBe(false);
        });

        it("should return true if the item markdown contains any accessible images", () => {
            const itemData: PerseusItem = {
                question: {
                    content:
                        "Here's an image: ![alt text](https://example.com/image.png)",
                    widgets: {},
                    images: {},
                },
                hints: [],
                answerArea: null,
            };

            expect(isItemAccessible(itemData)).toBe(true);
        });

        it("should return false if the item contains any accessible markdown but has inaccessible widgets", () => {
            const itemData: PerseusItem = {
                question: {
                    content:
                        "Here's an inaccessible widget: [[☃ matcher 1]]\n\nHere's an image: ![alt text](https://example.com/image.png)",
                    widgets: {
                        "matcher 1": {
                            type: "matcher",
                            options: {
                                labels: ["Concepts", "Definitions"],
                                left: ["A", "B", "C"],
                                right: ["1", "2", "3"],
                                orderMatters: false,
                                padding: true,
                            },
                        },
                    },
                    images: {},
                },
                hints: [],
                answerArea: null,
            };

            expect(isItemAccessible(itemData)).toBe(false);
        });

        it("should return true if markdown is empty", () => {
            const itemData: PerseusItem = {
                question: {
                    content: "",
                    widgets: {},
                    images: {},
                },
                hints: [],
                answerArea: null,
            };

            expect(isItemAccessible(itemData)).toBe(true);
        });
    });
});
