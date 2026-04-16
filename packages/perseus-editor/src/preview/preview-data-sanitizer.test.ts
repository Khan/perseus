import {getDefaultAnswerArea} from "@khanacademy/perseus-core";
import invariant from "tiny-invariant";

import {sanitizePreviewData} from "./preview-data-sanitizer";

import type {
    ArticlePreviewData,
    HintPreviewData,
    PreviewContent,
    QuestionPreviewData,
} from "./message-types";
import type {APIOptions} from "@khanacademy/perseus";

// Mock API options with both serializable and non-serializable properties
function createMockApiOptions(): APIOptions {
    return {
        // Serializable options
        readOnly: true,
        isMobile: false,
        customKeypad: true,
        // Non-serializable function callbacks (should be removed)
        onFocusChange: jest.fn(),
        answerableCallback: jest.fn(),
        getAnotherHint: jest.fn(),
        interactionCallback: jest.fn(),
        trackInteraction: jest.fn(),
    };
}

describe("sanitizePreviewData", () => {
    describe("question preview data", () => {
        it("sanitizes apiOptions in question data", () => {
            const questionData: QuestionPreviewData = {
                item: {
                    question: {
                        content: "What is 2+2?",
                        widgets: {},
                        images: {},
                    },
                    answerArea: getDefaultAnswerArea(),
                    hints: [],
                },
                apiOptions: createMockApiOptions(),
                initialHintsVisible: 0,
                device: "phone",
                linterContext: {
                    contentType: "exercise",
                    highlightLint: false,
                    paths: [],
                    stack: [],
                },
            };

            const previewContent: PreviewContent = {
                type: "question",
                data: questionData,
            };

            const result = sanitizePreviewData(previewContent);

            invariant(result.type === "question");
            // Serializable options should remain
            expect(result.data.apiOptions.readOnly).toBe(true);
            expect(result.data.apiOptions.isMobile).toBe(false);
            expect(result.data.apiOptions.customKeypad).toBe(true);

            // Non-serializable functions should be removed
            expect(result.data.apiOptions.onFocusChange).toBeUndefined();
            expect(result.data.apiOptions.answerableCallback).toBeUndefined();
            expect(result.data.apiOptions.getAnotherHint).toBeUndefined();
            expect(result.data.apiOptions.interactionCallback).toBeUndefined();
            expect(result.data.apiOptions.trackInteraction).toBeUndefined();

            // Other properties should remain unchanged
            expect(result.data.item).toBe(questionData.item);
            expect(result.data.initialHintsVisible).toBe(0);
        });

        it("handles question data with null apiOptions", () => {
            const questionData: QuestionPreviewData = {
                item: {
                    question: {content: "Test", widgets: {}, images: {}},
                    answerArea: getDefaultAnswerArea(),
                    hints: [],
                },
                apiOptions: null as any,
                initialHintsVisible: 0,
                device: "phone",
                linterContext: {
                    contentType: "exercise",
                    highlightLint: false,
                    paths: [],
                    stack: [],
                },
            };

            const previewContent: PreviewContent = {
                type: "question",
                data: questionData,
            };

            const result = sanitizePreviewData(previewContent);

            invariant(result.type === "question");
            // Should return unchanged when apiOptions is null
            expect(result).toEqual(previewContent);
        });

        it("does not mutate original question data", () => {
            const apiOptions = createMockApiOptions();
            const questionData: QuestionPreviewData = {
                item: {
                    question: {content: "Test", widgets: {}, images: {}},
                    answerArea: getDefaultAnswerArea(),
                    hints: [],
                },
                apiOptions,
                initialHintsVisible: 0,
                device: "phone",
                linterContext: {
                    contentType: "exercise",
                    highlightLint: false,
                    paths: [],
                    stack: [],
                },
            };

            const previewContent: PreviewContent = {
                type: "question",
                data: questionData,
            };

            sanitizePreviewData(previewContent);

            // Original should still have functions
            expect(apiOptions.onFocusChange).toBeDefined();
            expect(apiOptions.answerableCallback).toBeDefined();
        });
    });

    describe("hint preview data", () => {
        it("sanitizes apiOptions in hint data", () => {
            const hintData: HintPreviewData = {
                hint: {
                    content: "Try thinking about...",
                    widgets: {},
                    images: {},
                },
                pos: 0,
                apiOptions: createMockApiOptions(),
                linterContext: {
                    contentType: "exercise",
                    highlightLint: false,
                    paths: [],
                    stack: [],
                },
            };

            const previewContent: PreviewContent = {
                type: "hint",
                data: hintData,
            };

            const result = sanitizePreviewData(previewContent);

            invariant(result.type === "hint");
            // Serializable options should remain
            expect(result.data.apiOptions.readOnly).toBe(true);

            // Non-serializable functions should be removed
            expect(result.data.apiOptions.onFocusChange).toBeUndefined();
            expect(result.data.apiOptions.trackInteraction).toBeUndefined();

            // Other properties should remain unchanged
            expect(result.data.hint).toBe(hintData.hint);
            expect(result.data.pos).toBe(0);
        });

        it("handles hint data with null apiOptions", () => {
            const hintData: HintPreviewData = {
                hint: {content: "Hint", widgets: {}, images: {}},
                pos: 1,
                apiOptions: null as any,
                linterContext: {
                    contentType: "exercise",
                    highlightLint: false,
                    paths: [],
                    stack: [],
                },
            };

            const previewContent: PreviewContent = {
                type: "hint",
                data: hintData,
            };

            const result = sanitizePreviewData(previewContent);

            expect(result).toEqual(previewContent);
        });
    });

    describe("article preview data", () => {
        it("sanitizes apiOptions in article data", () => {
            const articleData: ArticlePreviewData = {
                json: [{content: "# Article Title", widgets: {}, images: {}}],
                apiOptions: createMockApiOptions(),
                linterContext: {
                    contentType: "article",
                    highlightLint: false,
                    paths: [],
                    stack: [],
                },
            };

            const previewContent: PreviewContent = {
                type: "article",
                data: articleData,
            };

            const result = sanitizePreviewData(previewContent);

            invariant(result.type === "article");
            // Serializable options should remain
            expect(result.data.apiOptions.customKeypad).toBe(true);

            // Non-serializable functions should be removed
            expect(result.data.apiOptions.interactionCallback).toBeUndefined();

            // Other properties should remain unchanged
            expect(result.data.json).toBe(articleData.json);
        });

        it("handles article data with null apiOptions", () => {
            const articleData: ArticlePreviewData = {
                json: [{content: "Content", widgets: {}, images: {}}],
                apiOptions: null as any,
                linterContext: {
                    contentType: "article",
                    highlightLint: false,
                    paths: [],
                    stack: [],
                },
            };

            const previewContent: PreviewContent = {
                type: "article",
                data: articleData,
            };

            const result = sanitizePreviewData(previewContent);

            expect(result).toEqual(previewContent);
        });
    });

    // NOTE: The article-all type currently uses ArticlePreviewData[] where
    // each section carries its own apiOptions. This will be simplified to a
    // single apiOptions when we restructure the preview data types.
    describe("article-all preview data", () => {
        it("sanitizes apiOptions in all article sections", () => {
            const section1: ArticlePreviewData = {
                json: [{content: "Section 1", widgets: {}, images: {}}],
                apiOptions: createMockApiOptions(),
                linterContext: {
                    contentType: "article",
                    highlightLint: false,
                    paths: [],
                    stack: [],
                },
            };
            const section2: ArticlePreviewData = {
                json: [{content: "Section 2", widgets: {}, images: {}}],
                apiOptions: {
                    ...createMockApiOptions(),
                    readOnly: false,
                },
                linterContext: {
                    contentType: "article",
                    highlightLint: false,
                    paths: [],
                    stack: [],
                },
            };

            const previewContent: PreviewContent = {
                type: "article-all",
                data: [section1, section2],
            };

            const result = sanitizePreviewData(previewContent);

            invariant(result.type === "article-all");
            expect(result.data).toHaveLength(2);
            expect(result.data[0].apiOptions.readOnly).toBe(true);
            expect(result.data[0].apiOptions.onFocusChange).toBeUndefined();
            expect(result.data[1].apiOptions.readOnly).toBe(false);
            expect(result.data[1].apiOptions.onFocusChange).toBeUndefined();
        });

        it("handles empty article-all array", () => {
            const previewContent: PreviewContent = {
                type: "article-all",
                data: [],
            };

            const result = sanitizePreviewData(previewContent);

            invariant(result.type === "article-all");
            expect(result.data).toHaveLength(0);
        });

        it("does not mutate original article-all data", () => {
            const apiOptions = createMockApiOptions();
            const section: ArticlePreviewData = {
                json: [{content: "Section 1", widgets: {}, images: {}}],
                apiOptions,
                linterContext: {
                    contentType: "article",
                    highlightLint: false,
                    paths: [],
                    stack: [],
                },
            };

            const previewContent: PreviewContent = {
                type: "article-all",
                data: [section],
            };

            sanitizePreviewData(previewContent);

            // Original should still have functions
            expect(apiOptions.onFocusChange).toBeDefined();
        });

        it("handles sections with null apiOptions", () => {
            const section1: ArticlePreviewData = {
                json: [{content: "Section 1", widgets: {}, images: {}}],
                apiOptions: createMockApiOptions(),
                linterContext: {
                    contentType: "article",
                    highlightLint: false,
                    paths: [],
                    stack: [],
                },
            };
            const section2: ArticlePreviewData = {
                json: [{content: "Section 2", widgets: {}, images: {}}],
                apiOptions: null as any,
                linterContext: {
                    contentType: "article",
                    highlightLint: false,
                    paths: [],
                    stack: [],
                },
            };

            const previewContent: PreviewContent = {
                type: "article-all",
                data: [section1, section2],
            };

            const result = sanitizePreviewData(previewContent);

            invariant(result.type === "article-all");
            expect(result.data).toHaveLength(2);
            expect(result.data[0].apiOptions.onFocusChange).toBeUndefined();
            // Section with null apiOptions should be unchanged
            expect(result.data[1].apiOptions).toBeNull();
        });
    });

    describe("edge cases", () => {
        it("preserves data structure for all content types", () => {
            const types: PreviewContent["type"][] = [
                "question",
                "hint",
                "article",
                "article-all",
            ];

            types.forEach((type) => {
                let previewContent: PreviewContent;

                switch (type) {
                    case "question":
                        previewContent = {
                            type: "question",
                            data: {
                                item: {
                                    question: {
                                        content: "Q",
                                        widgets: {},
                                        images: {},
                                    },
                                    answerArea: getDefaultAnswerArea(),
                                    hints: [],
                                },
                                apiOptions: {},
                                initialHintsVisible: 0,
                                device: "phone",
                                linterContext: {
                                    contentType: "exercise",
                                    highlightLint: false,
                                    paths: [],
                                    stack: [],
                                },
                            },
                        };
                        break;
                    case "hint":
                        previewContent = {
                            type: "hint",
                            data: {
                                hint: {content: "H", widgets: {}, images: {}},
                                pos: 0,
                                apiOptions: {},
                                linterContext: {
                                    contentType: "exercise",
                                    highlightLint: false,
                                    paths: [],
                                    stack: [],
                                },
                            },
                        };
                        break;
                    case "article":
                        previewContent = {
                            type: "article",
                            data: {
                                json: [
                                    {
                                        content: "A",
                                        widgets: {},
                                        images: {},
                                    },
                                ],
                                apiOptions: {},
                                linterContext: {
                                    contentType: "article",
                                    highlightLint: false,
                                    paths: [],
                                    stack: [],
                                },
                            },
                        };
                        break;
                    case "article-all":
                        previewContent = {
                            type: "article-all",
                            data: [
                                {
                                    json: [
                                        {
                                            content: "Paragraph A",
                                            widgets: {},
                                            images: {},
                                        },
                                    ],
                                    apiOptions: {},
                                    linterContext: {
                                        contentType: "article",
                                        highlightLint: false,
                                        paths: [],
                                        stack: [],
                                    },
                                },
                            ],
                        };
                        break;
                }

                const result = sanitizePreviewData(previewContent);
                expect(result.type).toBe(type);
            });
        });
    });
});
