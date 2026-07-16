import {renderHook, act, waitFor} from "@testing-library/react";

import {PREVIEW_MESSAGE_SOURCE} from "./message-types";
import {usePreviewPresenter} from "./use-preview-presenter";

import type {ParentToIframeMessage, PreviewContent} from "./message-types";

const mockAxeRun = jest.fn().mockResolvedValue({
    violations: [],
    incomplete: [],
});

jest.mock("axe-core", () => ({
    __esModule: true,
    default: {
        configure: jest.fn(),
        run: mockAxeRun,
    },
}));

describe("usePreviewPresenter", () => {
    let mockIframeElement: {
        dataset: {[key: string]: string | undefined};
    };
    let mockParentWindow: Window;
    let mockPostMessage: jest.Mock;
    let originalFrameElement: Element | null;
    let originalParent: Window;

    beforeEach(() => {
        mockAxeRun.mockResolvedValue({violations: [], incomplete: []});

        mockPostMessage = jest.fn();
        // eslint-disable-next-line no-restricted-syntax
        mockParentWindow = {
            postMessage: mockPostMessage,
        } as unknown as Window;

        // Mock iframe element with dataset
        mockIframeElement = {
            dataset: {
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
        it("initializes with null content", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            expect(result.current.content).toBeNull();
            expect(result.current.isMobile).toBe(false);
            expect(result.current.hasLintGutter).toBe(false);
        });

        it("reads iframe configuration from dataset", () => {
            mockIframeElement.dataset = {
                mobile: "true",
                lintGutter: "true",
            };

            const {result} = renderHook(() => usePreviewPresenter());

            expect(result.current.isMobile).toBe(true);
            expect(result.current.hasLintGutter).toBe(true);
        });

        it("sends iframe-ready message on mount", async () => {
            renderHook(() => usePreviewPresenter());

            await waitFor(() => {
                expect(mockParentWindow.postMessage).toHaveBeenCalledWith(
                    {
                        source: PREVIEW_MESSAGE_SOURCE,
                        type: "iframe-ready",
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
            content,
        });

        it("updates data when receiving content-data message", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const questionContent: PreviewContent = {
                type: "question",
                data: {
                    question: {
                        content: "What is 2+2?",
                        widgets: {},
                        images: {},
                    },
                    apiOptions: {readOnly: true},
                    linterContext: {
                        contentType: "exercise",
                        highlightLint: false,
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

            expect(result.current.content).toEqual(questionContent);
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

            expect(result.current.content).toEqual(hintContent);
        });

        it("updates data for article content", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const articleContent: PreviewContent = {
                type: "article-section",
                data: {
                    article: {
                        content: "# Article Title\n\nArticle content",
                        widgets: {},
                        images: {},
                    },
                    apiOptions: {},
                    linterContext: {
                        contentType: "article",
                        highlightLint: false,
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

            expect(result.current.content).toEqual(articleContent);
        });

        it("updates data for article-all content", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const articleAllContent: PreviewContent = {
                type: "article-all",
                data: {
                    article: [
                        {content: "Section 1", widgets: {}, images: {}},
                        {content: "Section 2", widgets: {}, images: {}},
                    ],
                    apiOptions: {},
                },
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

            expect(result.current.content).toEqual(articleAllContent);
        });

        it("ignores content-data from non-parent source", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            // eslint-disable-next-line no-restricted-syntax
            const mockOtherWindow = {
                postMessage: jest.fn(),
            } as unknown as Window;

            const message: ParentToIframeMessage = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "content-data",
                content: {
                    type: "question",
                    // eslint-disable-next-line no-restricted-syntax
                    data: {} as any,
                },
            };

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: message,
                        source: mockOtherWindow,
                    }),
                );
            });

            // Data should remain null
            expect(result.current.content).toBeNull();
        });

        it("updates data multiple times", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const content1: PreviewContent = {
                type: "question",
                data: {
                    question: {
                        content: "Question 1",
                        widgets: {},
                        images: {},
                    },
                    apiOptions: {},
                    linterContext: {
                        contentType: "exercise",
                        highlightLint: false,
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

            expect(result.current.content).toEqual(content1);

            const content2: PreviewContent = {
                type: "hint",
                data: {
                    hint: {content: "Hint 1", widgets: {}, images: {}},
                    pos: 0,
                    apiOptions: {},
                    linterContext: {
                        contentType: "exercise",
                        highlightLint: false,
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

            expect(result.current.content).toEqual(content2);
        });
    });

    describe("receiving iframe-init message", () => {
        it("sets content and a11yEnabled together from one message", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const questionContent: PreviewContent = {
                type: "question",
                data: {
                    question: {
                        content: "What is 2+2?",
                        widgets: {},
                        images: {},
                    },
                    apiOptions: {readOnly: true},
                    linterContext: {
                        contentType: "exercise",
                        highlightLint: false,
                    },
                },
            };

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "iframe-init",
                            content: questionContent,
                            a11yEnabled: true,
                        },
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.content).toEqual(questionContent);
            expect(result.current.a11yEnabled).toBe(true);
        });

        it("handles null content (nothing sent yet)", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "iframe-init",
                            content: null,
                            a11yEnabled: false,
                        },
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.content).toBeNull();
            expect(result.current.a11yEnabled).toBe(false);
        });
    });

    describe("receiving set-a11y-enabled message", () => {
        it("updates a11yEnabled when receiving set-a11y-enabled message", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            expect(result.current.a11yEnabled).toBe(false);

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "set-a11y-enabled",
                            enabled: true,
                        },
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.a11yEnabled).toBe(true);
        });
    });

    describe("axe-core scanning", () => {
        const enableA11yScanning = () => {
            window.dispatchEvent(
                new MessageEvent("message", {
                    data: {
                        source: PREVIEW_MESSAGE_SOURCE,
                        type: "set-a11y-enabled",
                        enabled: true,
                    },
                    source: mockParentWindow,
                }),
            );
        };

        const sendContent = (content: PreviewContent) => {
            window.dispatchEvent(
                new MessageEvent("message", {
                    data: {
                        source: PREVIEW_MESSAGE_SOURCE,
                        type: "content-data",
                        content,
                    },
                    source: mockParentWindow,
                }),
            );
        };

        it("posts an a11y-report message 1500ms after content changes while scanning is enabled", async () => {
            // Arrange
            const contentContainerRef = {
                current: document.createElement("div"),
            };

            renderHook(() => usePreviewPresenter({contentContainerRef}));

            // Act
            act(() => {
                enableA11yScanning();
                sendContent({
                    type: "question",
                    data: {
                        question: {
                            content: "What is 2+2?",
                            widgets: {},
                            images: {},
                        },
                        apiOptions: {readOnly: true},
                        linterContext: {
                            contentType: "exercise",
                            highlightLint: false,
                        },
                    },
                });
            });

            act(() => {
                jest.advanceTimersByTime(1500);
            });

            // Assert
            await waitFor(() => {
                expect(mockAxeRun).toHaveBeenCalledWith(
                    expect.objectContaining({
                        include: contentContainerRef.current,
                    }),
                    expect.objectContaining({elementRef: true}),
                );
            });

            expect(mockParentWindow.postMessage).toHaveBeenCalledWith(
                expect.objectContaining({type: "a11y-report"}),
                "/",
            );
        });
    });

    describe("receiving highlight-issues message", () => {
        it("resolves previewIds to elements via the latest scan's element map", async () => {
            // Arrange
            const targetElement = document.createElement("button");
            const contentContainerRef = {
                current: document.createElement("div"),
            };

            mockAxeRun.mockResolvedValue({
                violations: [
                    {
                        id: "button-name",
                        helpUrl: "https://example.com",
                        help: "Buttons must have discernible text",
                        impact: "serious",
                        nodes: [
                            {
                                element: targetElement,
                                all: [],
                                any: [],
                                none: [],
                            },
                        ],
                    },
                ],
                incomplete: [],
            });

            const {result} = renderHook(() =>
                usePreviewPresenter({contentContainerRef}),
            );

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "set-a11y-enabled",
                            enabled: true,
                        },
                        source: mockParentWindow,
                    }),
                );
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "content-data",
                            content: {
                                type: "question",
                                data: {
                                    question: {
                                        content: "What is 2+2?",
                                        widgets: {},
                                        images: {},
                                    },
                                    apiOptions: {readOnly: true},
                                    linterContext: {
                                        contentType: "exercise",
                                        highlightLint: false,
                                    },
                                },
                            },
                        },
                        source: mockParentWindow,
                    }),
                );
            });

            act(() => {
                jest.advanceTimersByTime(1500);
            });

            await waitFor(() => {
                expect(mockParentWindow.postMessage).toHaveBeenCalledWith(
                    expect.objectContaining({type: "a11y-report"}),
                    "/",
                );
            });

            const reportCall = mockPostMessage.mock.calls.find(
                (call) => call[0].type === "a11y-report",
            );
            const previewId = reportCall[0].violations[0].previewId;

            // Act
            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "highlight-issues",
                            previewIds: [previewId],
                        },
                        source: mockParentWindow,
                    }),
                );
            });

            // Assert
            expect(result.current.highlightTargets).toEqual([targetElement]);
        });
    });

    describe("receiving clear-highlights message", () => {
        it("resets highlightTargets to empty", async () => {
            // Arrange
            const targetElement = document.createElement("button");
            const contentContainerRef = {
                current: document.createElement("div"),
            };

            mockAxeRun.mockResolvedValue({
                violations: [
                    {
                        id: "button-name",
                        helpUrl: "https://example.com",
                        help: "Buttons must have discernible text",
                        impact: "serious",
                        nodes: [
                            {
                                element: targetElement,
                                all: [],
                                any: [],
                                none: [],
                            },
                        ],
                    },
                ],
                incomplete: [],
            });

            const {result} = renderHook(() =>
                usePreviewPresenter({contentContainerRef}),
            );

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "set-a11y-enabled",
                            enabled: true,
                        },
                        source: mockParentWindow,
                    }),
                );
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "content-data",
                            content: {
                                type: "question",
                                data: {
                                    question: {
                                        content: "What is 2+2?",
                                        widgets: {},
                                        images: {},
                                    },
                                    apiOptions: {readOnly: true},
                                    linterContext: {
                                        contentType: "exercise",
                                        highlightLint: false,
                                    },
                                },
                            },
                        },
                        source: mockParentWindow,
                    }),
                );
            });

            act(() => {
                jest.advanceTimersByTime(1500);
            });

            await waitFor(() => {
                expect(mockParentWindow.postMessage).toHaveBeenCalledWith(
                    expect.objectContaining({type: "a11y-report"}),
                    "/",
                );
            });

            const reportCall = mockPostMessage.mock.calls.find(
                (call) => call[0].type === "a11y-report",
            );
            const previewId = reportCall[0].violations[0].previewId;

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "highlight-issues",
                            previewIds: [previewId],
                        },
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.highlightTargets).toEqual([targetElement]);

            // Act
            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "clear-highlights",
                        },
                        source: mockParentWindow,
                    }),
                );
            });

            // Assert
            expect(result.current.highlightTargets).toEqual([]);
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

            // 1 iframe-ready + 2 height-updates
            expect(mockParentWindow.postMessage).toHaveBeenCalledTimes(3);

            // Check the height update calls
            // eslint-disable-next-line no-restricted-syntax
            const calls = (mockParentWindow.postMessage as jest.Mock).mock
                .calls;
            expect(calls[1][0]).toEqual({
                source: PREVIEW_MESSAGE_SOURCE,
                type: "height-update",

                height: 300,
            });
            expect(calls[2][0]).toEqual({
                source: PREVIEW_MESSAGE_SOURCE,
                type: "height-update",

                height: 600,
            });
        });

        it("reportHeight function reference remains stable", () => {
            const {result, rerender} = renderHook(() => usePreviewPresenter());

            const firstReportHeight = result.current.reportHeight;
            rerender();
            const secondReportHeight = result.current.reportHeight;

            expect(firstReportHeight).toBe(secondReportHeight);
        });
    });

    describe("message filtering", () => {
        it("ignores messages from different source window", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            // eslint-disable-next-line no-restricted-syntax
            const differentWindow = {} as Window;

            const message: ParentToIframeMessage = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "content-data",

                content: {
                    type: "question",
                    // eslint-disable-next-line no-restricted-syntax
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
            expect(result.current.content).toBeNull();
        });

        it("ignores messages without correct source identifier", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: "wrong-source",
                            type: "content-data",

                            content: {},
                        },
                        source: mockParentWindow,
                    }),
                );
            });

            // Data should remain null
            expect(result.current.content).toBeNull();
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
            expect(result.current.content).toBeNull();
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

            expect(result.current.content).toBeNull();

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: "string-data",
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.content).toBeNull();
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
                        type: "iframe-ready",
                    }),
                    "/",
                );
            });

            // 2. Receive content data
            const content: PreviewContent = {
                type: "question",
                data: {
                    question: {content: "Test", widgets: {}, images: {}},
                    apiOptions: {},
                    linterContext: {
                        contentType: "exercise",
                        highlightLint: false,
                    },
                },
            };

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "content-data",

                            content,
                        },
                        source: mockParentWindow,
                    }),
                );
            });

            expect(result.current.content).toEqual(content);

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

        it("handles rapid content updates", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            const contents: PreviewContent[] = [
                {
                    type: "question",
                    data: {
                        question: {content: "Q1", widgets: {}, images: {}},
                        apiOptions: {},
                        linterContext: {
                            contentType: "exercise",
                            highlightLint: false,
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
                        },
                    },
                },
                {
                    type: "article-section",
                    data: {
                        article: {content: "A1", widgets: {}, images: {}},
                        apiOptions: {},
                        linterContext: {
                            contentType: "article",
                            highlightLint: false,
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

                                content,
                            },
                            source: mockParentWindow,
                        }),
                    );
                });
            });

            // Should have the last content
            expect(result.current.content).toEqual(contents[2]);
        });
    });
});
