import {Log} from "@khanacademy/perseus";
import {renderHook, act, waitFor} from "@testing-library/react";

import {PREVIEW_MESSAGE_SOURCE} from "./message-types";
import {usePreviewController} from "./use-preview-controller";

import type {IframeToParentMessage, PreviewContent} from "./message-types";
import type {APIOptions} from "@khanacademy/perseus";
import type * as React from "react";

// Mock the Log module
jest.mock("@khanacademy/perseus", () => ({
    Log: {
        log: jest.fn(),
    },
}));

describe("usePreviewController", () => {
    let mockIframe: {contentWindow: Window | null; dataset: any};
    let mockContentWindow: Window;
    let iframeRef: React.RefObject<HTMLIFrameElement>;

    beforeEach(() => {
        // Create mock content window with postMessage
        mockContentWindow = {
            postMessage: jest.fn(),
        } as unknown as Window;

        // Create mock iframe element
        mockIframe = {
            contentWindow: mockContentWindow,
            dataset: {},
        };

        // Create ref pointing to mock iframe
        iframeRef = {current: mockIframe as any};
    });

    describe("initialization", () => {
        it("initializes with null height", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            expect(result.current.height).toBeNull();
            expect(result.current.sendData).toBeInstanceOf(Function);
        });

        it("sets up message event listener", () => {
            const addEventListenerSpy = jest.spyOn(window, "addEventListener");

            renderHook(() => usePreviewController(iframeRef));

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

            const {unmount} = renderHook(() => usePreviewController(iframeRef));

            unmount();

            expect(removeEventListenerSpy).toHaveBeenCalledWith(
                "message",
                expect.any(Function),
            );
        });
    });

    describe("sendData", () => {
        it("stores data as pending if iframe hasn't requested data yet", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));
            const previewData = createQuestionPreview();

            act(() => {
                result.current.sendData(previewData);
            });

            // Should not post message yet
            expect(mockContentWindow.postMessage).not.toHaveBeenCalled();
        });

        it("sends only latest data once iframe requests data", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));
            const previewData1 = createQuestionPreview();
            const previewData2 = createQuestionPreview({content: "Question 2"});

            act(() => {
                result.current.sendData(previewData1);
                result.current.sendData(previewData2);
            });

            // Should not post message yet
            expect(mockContentWindow.postMessage).not.toHaveBeenCalled();

            // Simulate iframe requesting data
            const requestMessage: IframeToParentMessage = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "request-data",
                id: "test-iframe",
            };

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: requestMessage,
                        source: mockContentWindow,
                    }),
                );
            });

            expect(mockContentWindow.postMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: expect.objectContaining({
                        data: expect.objectContaining({
                            item: expect.objectContaining({
                                question: expect.objectContaining({
                                    content: "Question 2",
                                }),
                            }),
                        }),
                    }),
                }),
                "*",
            );
        });

        it("sends data immediately if iframe has already requested data", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            // Simulate iframe requesting data
            const requestMessage: IframeToParentMessage = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "request-data",
                id: "test-iframe",
            };

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: requestMessage,
                        source: mockContentWindow,
                    }),
                );
            });

            // Now send data
            const previewData = createQuestionPreview();
            act(() => {
                result.current.sendData(previewData);
            });

            expect(mockContentWindow.postMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "content-data",
                    id: "test-iframe",
                    content: expect.objectContaining({
                        type: "question",
                    }),
                }),
                "*",
            );
        });

        it("sanitizes apiOptions before sending", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            // Simulate iframe requesting data
            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "request-data",
                            id: "test-iframe",
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            const previewData = createQuestionPreview({
                apiOptions: {onFocusChange: jest.fn()},
            });
            act(() => {
                result.current.sendData(previewData);
            });

            const sentMessage = (mockContentWindow.postMessage as jest.Mock)
                .mock.calls[0][0];

            // Non-serializable functions should be removed
            expect(
                sentMessage.content.data.apiOptions.onFocusChange,
            ).toBeUndefined();
            // Serializable options should remain
            expect(sentMessage.content.data.apiOptions.readOnly).toBe(true);
        });

        it("does not send if iframe ref is null", () => {
            const nullRef = {current: null};
            const {result} = renderHook(() => usePreviewController(nullRef));

            const previewData = createQuestionPreview();
            act(() => {
                result.current.sendData(previewData);
            });

            expect(mockContentWindow.postMessage).not.toHaveBeenCalled();
        });

        it("does not send if contentWindow is null", () => {
            mockIframe.contentWindow = null;
            const {result} = renderHook(() => usePreviewController(iframeRef));

            const previewData = createQuestionPreview();
            act(() => {
                result.current.sendData(previewData);
            });

            expect(mockContentWindow.postMessage).not.toHaveBeenCalled();
        });

        it("sendData function reference remains stable", () => {
            const {result, rerender} = renderHook(() =>
                usePreviewController(iframeRef),
            );

            const firstSendData = result.current.sendData;
            rerender();
            const secondSendData = result.current.sendData;

            expect(firstSendData).toBe(secondSendData);
        });
    });

    describe("receiving request-data message", () => {
        it("responds to request-data with pending data", async () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));
            const previewData = createQuestionPreview();

            // Send data first (will be pending)
            act(() => {
                result.current.sendData(previewData);
            });

            // Now iframe requests data
            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "request-data",
                            id: "test-iframe",
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            await waitFor(() => {
                expect(mockContentWindow.postMessage).toHaveBeenCalled();
            });

            expect(mockContentWindow.postMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "content-data",
                    id: "test-iframe",
                    content: expect.objectContaining({
                        type: "question",
                    }),
                }),
                "*",
            );
        });

        it("stores iframe ID from request-data message", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "request-data",
                            id: "stored-iframe-id",
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            // Subsequent sendData should use stored ID
            const previewData = createQuestionPreview();
            act(() => {
                result.current.sendData(previewData);
            });

            expect(mockContentWindow.postMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: "stored-iframe-id",
                }),
                "*",
            );
        });

        it("clears pending data after sending", async () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));
            const previewData = createQuestionPreview();

            // Send data (will be pending)
            act(() => {
                result.current.sendData(previewData);
            });

            // Iframe requests data
            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "request-data",
                            id: "test-iframe",
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            await waitFor(() => {
                expect(mockContentWindow.postMessage).toHaveBeenCalledTimes(1);
            });

            // Second request should not send the same data again
            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "request-data",
                            id: "test-iframe-2",
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            // Should still be called only once
            expect(mockContentWindow.postMessage).toHaveBeenCalledTimes(1);
        });

        it("ignores request-data with no pending data", () => {
            renderHook(() => usePreviewController(iframeRef));

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "request-data",
                            id: "test-iframe",
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            expect(mockContentWindow.postMessage).not.toHaveBeenCalled();
        });
    });

    describe("receiving height-update message", () => {
        it("updates height from height-update message", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            expect(result.current.height).toBeNull();

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "height-update",
                            id: "test-iframe",
                            height: 500,
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            expect(result.current.height).toBe(500);
        });

        it("updates height multiple times", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "height-update",
                            id: "test-iframe",
                            height: 300,
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            expect(result.current.height).toBe(300);

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "height-update",
                            id: "test-iframe",
                            height: 600,
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            expect(result.current.height).toBe(600);
        });
    });

    describe("receiving lint-report message", () => {
        it("logs lint report", () => {
            renderHook(() => usePreviewController(iframeRef));

            const lintWarnings = [
                {message: "Warning 1"},
                {message: "Warning 2"},
            ];

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "lint-report",
                            id: "test-iframe",
                            lintWarnings,
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            expect(Log.log).toHaveBeenCalledWith("LINTER REPORT", {
                lintWarnings: JSON.stringify(lintWarnings),
            });
        });
    });

    describe("message filtering", () => {
        it("ignores messages from different source window", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            const differentWindow = {} as Window;

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "height-update",
                            id: "test-iframe",
                            height: 999,
                        },
                        source: differentWindow,
                    }),
                );
            });

            // Height should not be updated
            expect(result.current.height).toBeNull();
        });

        it("ignores messages without correct source identifier", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: "wrong-source",
                            type: "height-update",
                            id: "test-iframe",
                            height: 999,
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            // Height should not be updated
            expect(result.current.height).toBeNull();
        });

        it("ignores non-Perseus messages", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            type: "some-other-message",
                            payload: "data",
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            // Should not crash or change state
            expect(result.current.height).toBeNull();
        });

        it("ignores messages when iframe ref is null", () => {
            const nullRef = {current: null};
            const {result} = renderHook(() => usePreviewController(nullRef));

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "height-update",
                            id: "test-iframe",
                            height: 999,
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            // Height should not be updated
            expect(result.current.height).toBeNull();
        });
    });

    describe("complex scenarios", () => {
        it("handles full lifecycle: request -> send -> height update", async () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            // 1. Iframe requests data
            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "request-data",
                            id: "lifecycle-test",
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            // 2. Send preview data
            const previewData = createQuestionPreview();
            act(() => {
                result.current.sendData(previewData);
            });

            await waitFor(() => {
                expect(mockContentWindow.postMessage).toHaveBeenCalled();
            });

            // 3. Receive height update
            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "height-update",
                            id: "lifecycle-test",
                            height: 450,
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            expect(result.current.height).toBe(450);
        });

        it("handles multiple preview data updates", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            // Setup: iframe requests data
            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "request-data",
                            id: "multi-update",
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            // Send first data
            const data1 = createQuestionPreview();
            act(() => {
                result.current.sendData(data1);
            });

            expect(mockContentWindow.postMessage).toHaveBeenCalledTimes(1);

            // Send second data
            const data2: PreviewContent = {
                type: "hint",
                data: {
                    hint: {content: "Hint", widgets: {}, images: {}},
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
                result.current.sendData(data2);
            });

            expect(mockContentWindow.postMessage).toHaveBeenCalledTimes(2);

            // Verify second message contains hint data
            const secondCall = (mockContentWindow.postMessage as jest.Mock).mock
                .calls[1][0];
            expect(secondCall.content.type).toBe("hint");
        });

        it("handles article-all with multiple sections", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "request-data",
                            id: "article-all-test",
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            const articleData: PreviewContent = {
                type: "article-all",
                data: [
                    {
                        json: [{content: "Section 1", widgets: {}, images: {}}],
                        apiOptions: {
                            readOnly: true,
                            onFocusChange: jest.fn(),
                        } as any,
                        linterContext: {
                            contentType: "article",
                            highlightLint: false,
                            paths: [],
                            stack: [],
                        },
                    },
                    {
                        json: [{content: "Section 2", widgets: {}, images: {}}],
                        apiOptions: {
                            isMobile: true,
                            trackInteraction: jest.fn(),
                        } as any,
                        linterContext: {
                            contentType: "article",
                            highlightLint: false,
                            paths: [],
                            stack: [],
                        },
                    },
                ],
            };

            act(() => {
                result.current.sendData(articleData);
            });

            const sentMessage = (mockContentWindow.postMessage as jest.Mock)
                .mock.calls[0][0];

            // Both sections should have apiOptions sanitized
            expect(sentMessage.content.data).toHaveLength(2);
            expect(
                sentMessage.content.data[0].apiOptions.onFocusChange,
            ).toBeUndefined();
            expect(sentMessage.content.data[0].apiOptions.readOnly).toBe(true);
            expect(
                sentMessage.content.data[1].apiOptions.trackInteraction,
            ).toBeUndefined();
            expect(sentMessage.content.data[1].apiOptions.isMobile).toBe(true);
        });
    });
});

function createQuestionPreview(overrides?: {
    content?: string;
    apiOptions?: Partial<APIOptions>;
}): PreviewContent {
    return {
        type: "question",
        data: {
            item: {
                question: {
                    content: overrides?.content ?? "What is 2+2?",
                    widgets: {},
                    images: {},
                },
                answerArea: {calculator: false} as any,
                hints: [],
            },
            apiOptions: {
                readOnly: true,
                ...overrides?.apiOptions,
            },
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
}
