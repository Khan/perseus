import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {renderHook, act, waitFor} from "@testing-library/react";

import {
    createPreviewIframeInitMessage,
    DEFAULT_PREVIEW_OPTIONS,
    PREVIEW_MESSAGE_SOURCE,
} from "./message-types";
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

const scanQuestionContent: PreviewContent = {
    type: "question",
    data: {
        question: {content: "What is 2+2?", widgets: {}, images: {}},
        apiOptions: {readOnly: true},
        linterContext: {contentType: "exercise", highlightLint: false},
    },
};

// The origin of the page the mock parent window shows.
const PARENT_ORIGIN = "https://editor.example";

describe("usePreviewPresenter", () => {
    let mockParentWindow: typeof window.parent;
    let mockPostMessage: jest.Mock;

    beforeEach(() => {
        mockAxeRun.mockResolvedValue({violations: [], incomplete: []});

        mockPostMessage = jest.fn();
        // eslint-disable-next-line no-restricted-syntax
        mockParentWindow = {
            postMessage: mockPostMessage,
        } as unknown as Window;

        jest.spyOn(window, "parent", "get").mockReturnValue(mockParentWindow);
    });

    function dispatchToPresenter(data: ParentToIframeMessage) {
        window.dispatchEvent(
            new MessageEvent("message", {
                data,
                source: mockParentWindow,
                origin: PARENT_ORIGIN,
            }),
        );
    }

    // Enables scanning, sends content at the given version, runs the debounced
    // scan, and returns the instanceId of the single violation it reports.
    async function runScanForVersion(contentVersion: number): Promise<string> {
        act(() => {
            dispatchToPresenter({
                source: PREVIEW_MESSAGE_SOURCE,
                type: "set-preview-options",
                options: {a11yScanningEnabled: true},
            });
            dispatchToPresenter({
                source: PREVIEW_MESSAGE_SOURCE,
                type: "content-data",
                content: scanQuestionContent,
                contentVersion,
            });
        });
        // Wait for debounce to time out and do axe-core scan
        act(() => {
            jest.advanceTimersByTime(1500);
        });
        await waitFor(() => {
            expect(mockPostMessage).toHaveBeenCalledWith(
                expect.objectContaining({type: "a11y-report"}),
                PARENT_ORIGIN,
            );
        });
        const reportCall = mockPostMessage.mock.calls.find(
            (call) => call[0].type === "a11y-report",
        );
        return reportCall[0].violations[0].instanceId;
    }

    describe("initialization", () => {
        it("initializes with null content", () => {
            const {result} = renderHook(() => usePreviewPresenter());

            expect(result.current.content).toBeNull();
            expect(result.current.previewOptions).toEqual(
                DEFAULT_PREVIEW_OPTIONS,
            );
        });

        it("sends iframe-ready message on mount", async () => {
            renderHook(() => usePreviewPresenter());

            await waitFor(() => {
                expect(mockParentWindow.postMessage).toHaveBeenCalledWith(
                    {
                        source: PREVIEW_MESSAGE_SOURCE,
                        type: "iframe-ready",
                    },
                    // The parent's origin isn't known yet.
                    "*",
                );
            });
        });

        it("throws error when not used within an iframe", () => {
            // A top-level window is its own parent.
            jest.spyOn(window, "parent", "get").mockReturnValue(window);

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
            contentVersion: 1,
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
                        origin: PARENT_ORIGIN,
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
                        origin: PARENT_ORIGIN,
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
                        origin: PARENT_ORIGIN,
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
                        origin: PARENT_ORIGIN,
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
                contentVersion: 1,
            };

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: message,
                        source: mockOtherWindow,
                        origin: PARENT_ORIGIN,
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
                        origin: PARENT_ORIGIN,
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
                        origin: PARENT_ORIGIN,
                    }),
                );
            });

            expect(result.current.content).toEqual(content2);
        });
    });

    describe("receiving iframe-init message", () => {
        it("sets content and preview options together from one message", () => {
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
                            previewOptions: {
                                ...DEFAULT_PREVIEW_OPTIONS,
                                isMobile: true,
                            },
                            contentVersion: 1,
                        },
                        source: mockParentWindow,
                        origin: PARENT_ORIGIN,
                    }),
                );
            });

            expect(result.current.content).toEqual(questionContent);
            expect(result.current.previewOptions.isMobile).toBe(true);
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
                            previewOptions: DEFAULT_PREVIEW_OPTIONS,
                            contentVersion: 0,
                        },
                        source: mockParentWindow,
                        origin: PARENT_ORIGIN,
                    }),
                );
            });

            expect(result.current.content).toBeNull();
        });
    });

    describe("receiving set-preview-options message", () => {
        it("changes only the options it names", () => {
            const {result} = renderHook(() => usePreviewPresenter());
            act(() => {
                dispatchToPresenter(
                    createPreviewIframeInitMessage(
                        null,
                        {...DEFAULT_PREVIEW_OPTIONS, isMobile: true},
                        0,
                    ),
                );
            });

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "set-preview-options",
                            options: {a11yScanningEnabled: true},
                        },
                        source: mockParentWindow,
                        origin: PARENT_ORIGIN,
                    }),
                );
            });

            expect(result.current.previewOptions).toEqual({
                ...DEFAULT_PREVIEW_OPTIONS,
                isMobile: true,
                a11yScanningEnabled: true,
            });
        });
    });

    describe("axe-core scanning", () => {
        const enableA11yScanning = () => {
            window.dispatchEvent(
                new MessageEvent("message", {
                    data: {
                        source: PREVIEW_MESSAGE_SOURCE,
                        type: "set-preview-options",
                        options: {a11yScanningEnabled: true},
                    },
                    source: mockParentWindow,
                    origin: PARENT_ORIGIN,
                }),
            );
        };

        const sendContent = (content: PreviewContent, contentVersion = 1) => {
            window.dispatchEvent(
                new MessageEvent("message", {
                    data: {
                        source: PREVIEW_MESSAGE_SOURCE,
                        type: "content-data",
                        content,
                        contentVersion,
                    },
                    source: mockParentWindow,
                    origin: PARENT_ORIGIN,
                }),
            );
        };

        const questionContent = (text: string): PreviewContent => ({
            type: "question",
            data: {
                question: {content: text, widgets: {}, images: {}},
                apiOptions: {readOnly: true},
                linterContext: {
                    contentType: "exercise",
                    highlightLint: false,
                },
            },
        });

        it("rescans once the in-flight scan settles when content changed mid-scan", async () => {
            // Arrange: hold the first scan open so the second request lands
            // while it is still running.
            const contentContainerRef = {
                current: document.createElement("div"),
            };
            let finishFirstScan: (results: unknown) => void = () => {};
            mockAxeRun.mockImplementationOnce(
                () =>
                    new Promise((resolve) => {
                        finishFirstScan = resolve;
                    }),
            );

            renderHook(() => usePreviewPresenter({contentContainerRef}));

            act(() => {
                enableA11yScanning();
                sendContent(questionContent("What is 2+2?"));
            });
            act(() => {
                jest.advanceTimersByTime(1500);
            });
            await waitFor(() => {
                expect(mockAxeRun).toHaveBeenCalledTimes(1);
            });

            // Act: new content arrives and its debounce fires while the first
            // scan is still in flight, then the first scan finishes.
            act(() => {
                sendContent(questionContent("What is 3+3?"));
            });
            act(() => {
                jest.advanceTimersByTime(1500);
            });
            expect(mockAxeRun).toHaveBeenCalledTimes(1);

            await act(async () => {
                finishFirstScan({violations: [], incomplete: []});
            });

            // Assert
            await waitFor(() => {
                expect(mockAxeRun).toHaveBeenCalledTimes(2);
            });
        });

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
                PARENT_ORIGIN,
            );
        });
    });

    describe("receiving highlight-issues message", () => {
        it("resolves instanceIds to elements via the latest scan's element map", async () => {
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
                            type: "set-preview-options",
                            options: {a11yScanningEnabled: true},
                        },
                        source: mockParentWindow,
                        origin: PARENT_ORIGIN,
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
                            contentVersion: 1,
                        },
                        source: mockParentWindow,
                        origin: PARENT_ORIGIN,
                    }),
                );
            });

            act(() => {
                jest.advanceTimersByTime(1500);
            });

            await waitFor(() => {
                expect(mockParentWindow.postMessage).toHaveBeenCalledWith(
                    expect.objectContaining({type: "a11y-report"}),
                    PARENT_ORIGIN,
                );
            });

            const reportCall = mockPostMessage.mock.calls.find(
                (call) => call[0].type === "a11y-report",
            );
            const instanceId = reportCall[0].violations[0].instanceId;

            // Act
            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "highlight-issues",
                            instanceIds: [instanceId],
                            contentVersion: 1,
                        },
                        source: mockParentWindow,
                        origin: PARENT_ORIGIN,
                    }),
                );
            });

            // Assert
            expect(result.current.highlightTargets).toEqual([targetElement]);
        });

        it("ignores a highlight-issues whose contentVersion is stale", async () => {
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
            const instanceId = await runScanForVersion(1);

            // Act: a highlight command stamped with a superseded version.
            act(() => {
                dispatchToPresenter({
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "highlight-issues",
                    instanceIds: [instanceId],
                    contentVersion: 2,
                });
            });

            // Assert
            expect(result.current.highlightTargets).toEqual([]);
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
                            type: "set-preview-options",
                            options: {a11yScanningEnabled: true},
                        },
                        source: mockParentWindow,
                        origin: PARENT_ORIGIN,
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
                            contentVersion: 1,
                        },
                        source: mockParentWindow,
                        origin: PARENT_ORIGIN,
                    }),
                );
            });

            act(() => {
                jest.advanceTimersByTime(1500);
            });

            await waitFor(() => {
                expect(mockParentWindow.postMessage).toHaveBeenCalledWith(
                    expect.objectContaining({type: "a11y-report"}),
                    PARENT_ORIGIN,
                );
            });

            const reportCall = mockPostMessage.mock.calls.find(
                (call) => call[0].type === "a11y-report",
            );
            const instanceId = reportCall[0].violations[0].instanceId;

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "highlight-issues",
                            instanceIds: [instanceId],
                            contentVersion: 1,
                        },
                        source: mockParentWindow,
                        origin: PARENT_ORIGIN,
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
                        origin: PARENT_ORIGIN,
                    }),
                );
            });

            // Assert
            expect(result.current.highlightTargets).toEqual([]);
        });
    });

    describe("clearing highlights on a content-version change", () => {
        it("clears highlightTargets when the content version changes", async () => {
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
            const instanceId = await runScanForVersion(1);
            act(() => {
                dispatchToPresenter({
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "highlight-issues",
                    instanceIds: [instanceId],
                    contentVersion: 1,
                });
            });
            expect(result.current.highlightTargets).toEqual([targetElement]);

            // Act: a newer edit arrives.
            act(() => {
                dispatchToPresenter({
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "content-data",
                    content: scanQuestionContent,
                    contentVersion: 2,
                });
            });

            // Assert
            expect(result.current.highlightTargets).toEqual([]);
        });
    });

    describe("reportHeight", () => {
        it("sends height-update messages to the parent's origin", () => {
            // Arrange
            const {result} = renderHook(() => usePreviewPresenter());
            act(() => {
                dispatchToPresenter(
                    createPreviewIframeInitMessage(
                        null,
                        DEFAULT_PREVIEW_OPTIONS,
                        0,
                    ),
                );
            });

            // Act
            act(() => {
                result.current.reportHeight(300);
                result.current.reportHeight(600);
            });

            // Assert
            const heightUpdates = mockPostMessage.mock.calls.filter(
                ([message]) => message.type === "height-update",
            );
            expect(heightUpdates).toEqual([
                [
                    {
                        source: PREVIEW_MESSAGE_SOURCE,
                        type: "height-update",
                        height: 300,
                    },
                    PARENT_ORIGIN,
                ],
                [
                    {
                        source: PREVIEW_MESSAGE_SOURCE,
                        type: "height-update",
                        height: 600,
                    },
                    PARENT_ORIGIN,
                ],
            ]);
        });

        it("drops height updates until the parent has sent a message", () => {
            // Arrange
            const {result} = renderHook(() => usePreviewPresenter());

            // Act
            act(() => {
                result.current.reportHeight(500);
            });

            // Assert
            expect(mockParentWindow.postMessage).not.toHaveBeenCalledWith(
                expect.objectContaining({type: "height-update"}),
                expect.anything(),
            );
        });

        it("reportHeight function reference remains stable", () => {
            const {result, rerender} = renderHook(() => usePreviewPresenter());

            const firstReportHeight = result.current.reportHeight;
            rerender();
            const secondReportHeight = result.current.reportHeight;

            expect(firstReportHeight).toBe(secondReportHeight);
        });
    });

    describe("reportRenderState", () => {
        it("reports the render state for the content version it rendered", () => {
            // Arrange
            const {result} = renderHook(() => usePreviewPresenter());
            act(() => {
                dispatchToPresenter(
                    createPreviewIframeInitMessage(
                        scanQuestionContent,
                        DEFAULT_PREVIEW_OPTIONS,
                        3,
                    ),
                );
            });

            // Act
            result.current.reportRenderState({status: "done"});

            // Assert
            const reports = mockPostMessage.mock.calls.filter(
                ([message]) => message.type === "render-state",
            );
            expect(reports).toEqual([
                [
                    {
                        source: PREVIEW_MESSAGE_SOURCE,
                        type: "render-state",
                        renderState: {status: "done"},
                        contentVersion: 3,
                    },
                    PARENT_ORIGIN,
                ],
            ]);
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
                contentVersion: 1,
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
                        origin: PARENT_ORIGIN,
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
                        origin: PARENT_ORIGIN,
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
                        origin: PARENT_ORIGIN,
                    }),
                );
            });

            expect(result.current.content).toBeNull();

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: "string-data",
                        source: mockParentWindow,
                        origin: PARENT_ORIGIN,
                    }),
                );
            });

            expect(result.current.content).toBeNull();
        });
    });

    describe("hints", () => {
        // An exercise with three hints, the second replacing the first.
        function exerciseContent(): PreviewContent {
            const hint = generateTestPerseusRenderer({content: "A hint"});
            return {
                type: "exercise",
                data: {
                    item: generateTestPerseusItem({
                        hints: [hint, {...hint, replace: true}, hint],
                    }),
                    apiOptions: {},
                    showRationales: false,
                },
            };
        }

        function renderWithExercise() {
            const rendered = renderHook(() => usePreviewPresenter());
            act(() => {
                dispatchToPresenter(
                    createPreviewIframeInitMessage(
                        exerciseContent(),
                        DEFAULT_PREVIEW_OPTIONS,
                        1,
                    ),
                );
            });
            return rendered;
        }

        function lastHintsState() {
            const reports = mockPostMessage.mock.calls.filter(
                ([message]) => message.type === "hints-state",
            );
            return reports[reports.length - 1];
        }

        it("reports the exercise's hints when content arrives", () => {
            // Arrange, Act
            renderWithExercise();

            // Assert
            expect(lastHintsState()).toEqual([
                {
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "hints-state",
                    hintsState: {
                        hintsVisible: 0,
                        total: 3,
                        visibleCount: 0,
                        isFinalHelpPage: false,
                    },
                },
                PARENT_ORIGIN,
            ]);
        });

        it("reveals the next hint when reveal-hint has no count", () => {
            // Arrange
            const {result} = renderWithExercise();

            // Act
            act(() => {
                dispatchToPresenter({
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "reveal-hint",
                });
                dispatchToPresenter({
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "reveal-hint",
                });
            });

            // Assert
            expect({
                hintsVisible: result.current.hintsVisible,
                reported: lastHintsState()[0].hintsState,
            }).toEqual({
                hintsVisible: 2,
                // The second hint replaces the first.
                reported: {
                    hintsVisible: 2,
                    total: 3,
                    visibleCount: 1,
                    isFinalHelpPage: false,
                },
            });
        });

        it("changes renderKey when hints are hidden", () => {
            // Arrange
            const {result} = renderWithExercise();
            act(() => {
                dispatchToPresenter({
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "reveal-hint",
                    hintsVisible: -1,
                });
            });
            const keyWithAllHints = result.current.renderKey;

            // Act
            act(() => {
                dispatchToPresenter({
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "reveal-hint",
                    hintsVisible: 0,
                });
            });

            // Assert
            expect({
                hintsVisible: result.current.hintsVisible,
                keyChanged: result.current.renderKey !== keyWithAllHints,
            }).toEqual({hintsVisible: 0, keyChanged: true});
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
                    "*",
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
                            contentVersion: 1,
                        },
                        source: mockParentWindow,
                        origin: PARENT_ORIGIN,
                    }),
                );
            });

            expect(result.current.content).toEqual(content);

            // 3. Report height, now that the parent's origin is known
            act(() => {
                result.current.reportHeight(350);
            });

            expect(mockParentWindow.postMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: "height-update",
                    height: 350,
                }),
                PARENT_ORIGIN,
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
                contents.forEach((content, index) => {
                    window.dispatchEvent(
                        new MessageEvent("message", {
                            data: {
                                source: PREVIEW_MESSAGE_SOURCE,
                                type: "content-data",
                                content,
                                contentVersion: index + 1,
                            },
                            source: mockParentWindow,
                            origin: PARENT_ORIGIN,
                        }),
                    );
                });
            });

            // Should have the last content
            expect(result.current.content).toEqual(contents[2]);
        });
    });
});
