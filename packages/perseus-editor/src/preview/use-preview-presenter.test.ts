import {renderHook, act, waitFor} from "@testing-library/react";

import {PREVIEW_MESSAGE_SOURCE} from "./message-types";
import {usePreviewPresenter} from "./use-preview-presenter";

import type {ParentToIframeMessage, PreviewContent} from "./message-types";

describe("usePreviewPresenter", () => {
    let mockIframeElement: {
        dataset: {[key: string]: string | undefined};
    };
    let mockParentWindow: Window;
    let originalFrameElement: Element | null;
    let originalParent: Window;

    beforeEach(() => {
        // Mock parent window with postMessage
        mockParentWindow = {
            postMessage: jest.fn(),
        } as unknown as Window;

        // Mock iframe element with dataset
        mockIframeElement = {
            dataset: {
                id: "test-iframe-id",
                mobile: "false",
                lintGutter: "false",
            },
        };

        // Save originals
        originalFrameElement = window.frameElement;
        originalParent = window.parent;

        // Override window properties
        Object.defineProperty(window, "frameElement", {
            configurable: true,
            value: mockIframeElement,
        });
        Object.defineProperty(window, "parent", {
            configurable: true,
            value: mockParentWindow,
        });
    });

    afterEach(() => {
        // Restore originals
        Object.defineProperty(window, "frameElement", {
            configurable: true,
            value: originalFrameElement,
        });
        Object.defineProperty(window, "parent", {
            configurable: true,
            value: originalParent,
        });
    });

    describe("initialization", () => {
        it("initializes with null data", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            expect(result.current.data).toBeNull();
            expect(result.current.id).toBe("test-iframe-id");
            expect(result.current.isMobile).toBe(false);
            expect(result.current.hasLintGutter).toBe(false);
        });

        it("reads iframe configuration from dataset", () => {
            mockIframeElement.dataset = {
                id: "custom-id",
                mobile: "true",
                lintGutter: "true",
            };

            const {result} = renderHook(() => usePreviewPresenter());

            expect(result.current.id).toBe("custom-id");
            expect(result.current.isMobile).toBe(true);
            expect(result.current.hasLintGutter).toBe(true);
        });

        it("sends request-data message on mount", async () => {
            renderHook(() => usePreviewPresenter());

            await waitFor(() => {
                expect(mockParentWindow.postMessage).toHaveBeenCalledWith(
                    {
                        source: PREVIEW_MESSAGE_SOURCE,
                        type: "request-data",
                        id: "test-iframe-id",
                    },
                    "/",
                );
            });
        });

        it("throws error when not used within an iframe", () => {
            Object.defineProperty(window, "frameElement", {
                configurable: true,
                value: null,
            });

            expect(() => {
                renderHook(() => usePreviewPresenter());
            }).toThrow("usePreviewPresenter must be used within an iframe");
        });

        it("throws error when missing iframe id", () => {
            mockIframeElement.dataset = {};

            expect(() => {
                renderHook(() => usePreviewPresenter());
            }).toThrow(
                "usePreviewPresenter could not identify its id from the hosting iframe",
            );
        });

        it("sets up message event listener", () => {
            const addEventListenerSpy = jest.spyOn(window, "addEventListener");

            renderHook(() => usePreviewPresenter());

            expect(addEventListenerSpy).toHaveBeenCalledWith(
                "message",
                expect.any(Function),
            );
        });

        it("cleans up message event listener on unmount", () => {
            const removeEventListenerSpy = jest.spyOn(
                window,
                "removeEventListener",
            );

            const {unmount} = renderHook(() => usePreviewPresenter());

            unmount();

            expect(removeEventListenerSpy).toHaveBeenCalledWith(
                "message",
                expect.any(Function),
            );
        });
    });

    describe("receiving content-data message", () => {
        const createContentDataMessage = (
            content: PreviewContent,
        ): ParentToIframeMessage => ({
            source: PREVIEW_MESSAGE_SOURCE,
            type: "content-data",
            id: "test-iframe-id",
            content,
        });

        it("updates data when receiving content-data message", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const questionContent: PreviewContent = {
                type: "question",
                data: {
                    item: {
                        question: {
                            content: "What is 2+2?",
                            widgets: {},
                            images: {},
                        },
                        answerArea: {calculator: false} as any,
                        hints: [],
                    },
                    apiOptions: {readOnly: true},
                    initialHintsVisible: 0,
                    device: {type: "phone"} as any,
                    linterContext: {
                        contentType: "exercise",
                        highlightLint: false,
                        paths: [],
                        stack: [],
                    },
                },
            };

            const message = createContentDataMessage(questionContent);

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: message,
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.data).toEqual(questionContent);
        });

        it("updates data for hint content", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const hintContent: PreviewContent = {
                type: "hint",
                data: {
                    hint: {
                        content: "Try this approach...",
                        widgets: {},
                        images: {},
                    },
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

            const message = createContentDataMessage(hintContent);

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: message,
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.data).toEqual(hintContent);
        });

        it("updates data for article content", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const articleContent: PreviewContent = {
                type: "article",
                data: {
                    json: [
                        {
                            content: "# Article Title\n\nArticle content",
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

            const message = createContentDataMessage(articleContent);

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: message,
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.data).toEqual(articleContent);
        });

        it("updates data for article-all content", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const articleAllContent: PreviewContent = {
                type: "article-all",
                data: [
                    {
                        json: [{content: "Section 1", widgets: {}, images: {}}],
                        apiOptions: {},
                        linterContext: {
                            contentType: "article",
                            highlightLint: false,
                            paths: [],
                            stack: [],
                        },
                    },
                    {
                        json: [{content: "Section 2", widgets: {}, images: {}}],
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

            const message = createContentDataMessage(articleAllContent);

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: message,
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.data).toEqual(articleAllContent);
        });

        it("ignores content-data with mismatched iframe ID", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const message: ParentToIframeMessage = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "content-data",
                id: "different-iframe-id",
                content: {
                    type: "question",
                    data: {} as any,
                },
            };

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: message,
                        source: mockParentWindow,
                    }),
                );
            });

            // Data should remain null
            expect(result.current.data).toBeNull();
        });

        it("updates data multiple times", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const content1: PreviewContent = {
                type: "question",
                data: {
                    item: {
                        question: {
                            content: "Question 1",
                            widgets: {},
                            images: {},
                        },
                        answerArea: {calculator: false} as any,
                        hints: [],
                    },
                    apiOptions: {},
                    initialHintsVisible: 0,
                    device: {type: "phone"} as any,
                    linterContext: {
                        contentType: "exercise",
                        highlightLint: false,
                        paths: [],
                        stack: [],
                    },
                },
            };

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: createContentDataMessage(content1),
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.data).toEqual(content1);

            const content2: PreviewContent = {
                type: "hint",
                data: {
                    hint: {content: "Hint 1", widgets: {}, images: {}},
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

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: createContentDataMessage(content2),
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.data).toEqual(content2);
        });
    });

    describe("reportHeight", () => {
        it("sends height-update message", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            act(() => {
                result.current.reportHeight(500);
            });

            expect(mockParentWindow.postMessage).toHaveBeenCalledWith(
                {
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "height-update",
                    id: "test-iframe-id",
                    height: 500,
                },
                "/",
            );
        });

        it("sends multiple height updates", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            act(() => {
                result.current.reportHeight(300);
            });

            act(() => {
                result.current.reportHeight(600);
            });

            // 1 request-data + 2 height-updates
            expect(mockParentWindow.postMessage).toHaveBeenCalledTimes(3);

            // Check the height update calls
            const calls = (mockParentWindow.postMessage as jest.Mock).mock
                .calls;
            expect(calls[1][0]).toEqual({
                source: PREVIEW_MESSAGE_SOURCE,
                type: "height-update",
                id: "test-iframe-id",
                height: 300,
            });
            expect(calls[2][0]).toEqual({
                source: PREVIEW_MESSAGE_SOURCE,
                type: "height-update",
                id: "test-iframe-id",
                height: 600,
            });
        });

        it("does not send if parent window is null", () => {
            Object.defineProperty(window, "parent", {
                configurable: true,
                value: null,
            });

            const {result} = renderHook(() => usePreviewPresenter());

            // Clear previous calls
            jest.clearAllMocks();

            act(() => {
                result.current.reportHeight(400);
            });

            expect(mockParentWindow.postMessage).not.toHaveBeenCalled();
        });

        it("reportHeight function reference remains stable", () => {
            const {result, rerender} = renderHook(() => usePreviewPresenter());

            const firstReportHeight = result.current.reportHeight;
            rerender();
            const secondReportHeight = result.current.reportHeight;

            expect(firstReportHeight).toBe(secondReportHeight);
        });
    });

    describe("reportLintWarnings", () => {
        it("sends lint-report message", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const lintWarnings = [
                {message: "Warning 1", line: 5},
                {message: "Warning 2", line: 10},
            ];

            act(() => {
                result.current.reportLintWarnings(lintWarnings);
            });

            expect(mockParentWindow.postMessage).toHaveBeenCalledWith(
                {
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "lint-report",
                    id: "test-iframe-id",
                    lintWarnings,
                },
                "/",
            );
        });

        it("sends empty lint warnings array", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            act(() => {
                result.current.reportLintWarnings([]);
            });

            expect(mockParentWindow.postMessage).toHaveBeenCalledWith(
                {
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "lint-report",
                    id: "test-iframe-id",
                    lintWarnings: [],
                },
                "/",
            );
        });

        it("does not send if parent window is null", () => {
            Object.defineProperty(window, "parent", {
                configurable: true,
                value: null,
            });

            const {result} = renderHook(() => usePreviewPresenter());

            jest.clearAllMocks();

            act(() => {
                result.current.reportLintWarnings([{message: "Warning"}]);
            });

            expect(mockParentWindow.postMessage).not.toHaveBeenCalled();
        });

        it("reportLintWarnings function reference remains stable", () => {
            const {result, rerender} = renderHook(() => usePreviewPresenter());

            const firstReportLintWarnings = result.current.reportLintWarnings;
            rerender();
            const secondReportLintWarnings = result.current.reportLintWarnings;

            expect(firstReportLintWarnings).toBe(secondReportLintWarnings);
        });
    });

    describe("message filtering", () => {
        it("ignores messages from different source window", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const differentWindow = {} as Window;

            const message: ParentToIframeMessage = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "content-data",
                id: "test-iframe-id",
                content: {
                    type: "question",
                    data: {} as any,
                },
            };

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: message,
                        source: differentWindow,
                    }),
                );
            });

            // Data should remain null
            expect(result.current.data).toBeNull();
        });

        it("ignores messages without correct source identifier", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: "wrong-source",
                            type: "content-data",
                            id: "test-iframe-id",
                            content: {},
                        },
                        source: mockParentWindow,
                    }),
                );
            });

            // Data should remain null
            expect(result.current.data).toBeNull();
        });

        it("ignores non-Perseus messages", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            type: "random-message",
                            payload: "data",
                        },
                        source: mockParentWindow,
                    }),
                );
            });

            // Should not crash or change state
            expect(result.current.data).toBeNull();
        });

        it("ignores malformed messages", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: null,
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.data).toBeNull();

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: "string-data",
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.data).toBeNull();
        });
    });

    describe("dataset configuration variations", () => {
        it.each([true, false])("handles mobile='%s' string", (isMobile) => {
            mockIframeElement.dataset = {
                id: "test-id",
                mobile: isMobile.toString(),
                lintGutter: "false",
            };

            const {result} = renderHook(() => usePreviewPresenter());

            expect(result.current.isMobile).toBe(isMobile);
        });

        it("handles mobile as any other string (treated as false)", () => {
            mockIframeElement.dataset = {
                id: "test-id",
                mobile: "yes",
                lintGutter: "false",
            };

            const {result} = renderHook(() => usePreviewPresenter());

            expect(result.current.isMobile).toBe(false);
        });

        it.each([true, false])(
            "handles lintGutter='%s' string",
            (lintGutter) => {
                mockIframeElement.dataset = {
                    id: "test-id",
                    mobile: "false",
                    lintGutter: lintGutter.toString(),
                };

                const {result} = renderHook(() => usePreviewPresenter());

                expect(result.current.hasLintGutter).toBe(lintGutter);
            },
        );

        it("handles undefined dataset values", () => {
            mockIframeElement.dataset = {
                id: "required-id",
                mobile: undefined,
                lintGutter: undefined,
            };

            const {result} = renderHook(() => usePreviewPresenter());

            expect(result.current.id).toBe("required-id");
            expect(result.current.isMobile).toBe(false);
            expect(result.current.hasLintGutter).toBe(false);
        });
    });

    describe("complex scenarios", () => {
        it("handles full lifecycle: init -> request -> receive data -> report height", async () => {
            const {result} = renderHook(() => usePreviewPresenter());

            // 1. Hook should request data on init
            await waitFor(() => {
                expect(mockParentWindow.postMessage).toHaveBeenCalledWith(
                    expect.objectContaining({
                        type: "request-data",
                    }),
                    "/",
                );
            });

            // 2. Receive content data
            const content: PreviewContent = {
                type: "question",
                data: {
                    item: {
                        question: {content: "Test", widgets: {}, images: {}},
                        answerArea: {calculator: false} as any,
                        hints: [],
                    },
                    apiOptions: {},
                    initialHintsVisible: 0,
                    device: {type: "phone"} as any,
                    linterContext: {
                        contentType: "exercise",
                        highlightLint: false,
                        paths: [],
                        stack: [],
                    },
                },
            };

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "content-data",
                            id: "test-iframe-id",
                            content,
                        },
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.data).toEqual(content);

            // 3. Report height
            act(() => {
                result.current.reportHeight(350);
            });

            expect(mockParentWindow.postMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: "height-update",
                    height: 350,
                }),
                "/",
            );
        });

        // This test documents that the preview system (and this hook) does not
        // support iframe ID changes. If we want to re-initialize to a new
        // iframe ID, we need to create a new iframe, unmount the old one, and
        // mount the new one.
        it("Does not update iframe ID if frameElement dataset changes", async () => {
            const {result, rerender} = renderHook(() => usePreviewPresenter());

            // Initial request sent
            await waitFor(() => {
                expect(mockParentWindow.postMessage).toHaveBeenCalledTimes(1);
            });

            // Change iframe ID
            mockIframeElement.dataset.id = "new-iframe-id";

            // This doesn't actually trigger a re-read in the hook because
            // the dataset read happens once on mount. This test documents
            // current behavior.
            rerender();

            // ID should remain the same (from first mount)
            expect(result.current.id).toBe("test-iframe-id");
        });

        it("handles rapid content updates", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const contents: PreviewContent[] = [
                {
                    type: "question",
                    data: {
                        item: {
                            question: {content: "Q1", widgets: {}, images: {}},
                            answerArea: {calculator: false} as any,
                            hints: [],
                        },
                        apiOptions: {},
                        initialHintsVisible: 0,
                        device: {type: "phone"} as any,
                        linterContext: {
                            contentType: "exercise",
                            highlightLint: false,
                            paths: [],
                            stack: [],
                        },
                    },
                },
                {
                    type: "hint",
                    data: {
                        hint: {content: "H1", widgets: {}, images: {}},
                        pos: 0,
                        apiOptions: {},
                        linterContext: {
                            contentType: "exercise",
                            highlightLint: false,
                            paths: [],
                            stack: [],
                        },
                    },
                },
                {
                    type: "article",
                    data: {
                        json: [{content: "A1", widgets: {}, images: {}}],
                        apiOptions: {},
                        linterContext: {
                            contentType: "article",
                            highlightLint: false,
                            paths: [],
                            stack: [],
                        },
                    },
                },
            ];

            // Send all updates in quick succession
            act(() => {
                contents.forEach((content) => {
                    window.dispatchEvent(
                        new MessageEvent("message", {
                            data: {
                                source: PREVIEW_MESSAGE_SOURCE,
                                type: "content-data",
                                id: "test-iframe-id",
                                content,
                            },
                            source: mockParentWindow,
                        }),
                    );
                });
            });

            // Should have the last content
            expect(result.current.data).toEqual(contents[2]);
        });

        it("handles concurrent height and lint reports", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            jest.clearAllMocks();

            act(() => {
                result.current.reportHeight(400);
                result.current.reportLintWarnings([{message: "Warning"}]);
            });

            expect(mockParentWindow.postMessage).toHaveBeenCalledTimes(2);

            const calls = (mockParentWindow.postMessage as jest.Mock).mock
                .calls;
            expect(calls[0][0].type).toBe("height-update");
            expect(calls[1][0].type).toBe("lint-report");
        });
    });
});
