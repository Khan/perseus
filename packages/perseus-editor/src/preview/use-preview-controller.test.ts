import {renderHook, act, waitFor} from "@testing-library/react";

import {
    createPreviewIframeReadyMessage,
    PREVIEW_MESSAGE_SOURCE,
} from "./message-types";
import {usePreviewController} from "./use-preview-controller";

import type {PreviewContent} from "./message-types";
import type {Issue} from "../components/issues-panel";
import type {APIOptions} from "@khanacademy/perseus";
import type * as React from "react";

const issue = (id: string): Issue => ({
    id,
    description: `description ${id}`,
    helpUrl: "https://example.com/help",
    help: "Learn more",
    impact: "medium",
    message: `message ${id}`,
});

describe("usePreviewController", () => {
    let mockIframe: {contentWindow: Window | null; dataset: any};
    let mockContentWindow: Window;
    let iframeRef: React.RefObject<HTMLIFrameElement>;

    beforeEach(() => {
        // Create mock content window with postMessage
        // eslint-disable-next-line no-restricted-syntax
        mockContentWindow = {
            postMessage: jest.fn(),
        } as unknown as Window;

        // Create mock iframe element
        mockIframe = {
            contentWindow: mockContentWindow,
            dataset: {},
        };

        // Create ref pointing to mock iframe
        // eslint-disable-next-line no-restricted-syntax
        iframeRef = {current: mockIframe as any};
    });

    function markIframeReady() {
        act(() => {
            window.dispatchEvent(
                new MessageEvent("message", {
                    data: createPreviewIframeReadyMessage(),
                    source: mockContentWindow,
                }),
            );
        });
    }

    function messagesOfType(type: string) {
        // eslint-disable-next-line no-restricted-syntax
        return (mockContentWindow.postMessage as jest.Mock).mock.calls
            .map(([msg]) => msg)
            .filter((msg) => msg.type === type);
    }

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

    describe("setA11yEnabled", () => {
        it("posts a set-a11y-enabled command to the iframe once ready", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));
            markIframeReady();

            act(() => {
                result.current.setA11yEnabled(true);
            });

            expect(mockContentWindow.postMessage).toHaveBeenCalledWith(
                {
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "set-a11y-enabled",
                    enabled: true,
                },
                "/",
            );
        });

        it("does not post immediately if the iframe isn't ready yet", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            act(() => {
                result.current.setA11yEnabled(true);
            });

            expect(mockContentWindow.postMessage).not.toHaveBeenCalled();
        });
    });

    describe("highlightIssues", () => {
        it("posts a highlight-issues command to the iframe", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            act(() => {
                result.current.highlightIssues(["violation-1", "incomplete-2"]);
            });

            expect(mockContentWindow.postMessage).toHaveBeenCalledWith(
                {
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "highlight-issues",
                    previewIds: ["violation-1", "incomplete-2"],
                    contentVersion: 0,
                },
                "/",
            );
        });
    });

    describe("clearHighlights", () => {
        it("posts a clear-highlights command to the iframe", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            act(() => {
                result.current.clearHighlights();
            });

            expect(mockContentWindow.postMessage).toHaveBeenCalledWith(
                {
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "clear-highlights",
                },
                "/",
            );
        });
    });

    describe("sendData", () => {
        it("stores data as pending if iframe isn't ready yet", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));
            const previewData = createQuestionPreview();

            act(() => {
                result.current.sendData(previewData);
            });

            // Should not post message yet
            expect(mockContentWindow.postMessage).not.toHaveBeenCalled();
        });

        it("stores data to send later if the iframe ref isn't set yet", () => {
            const localIframeRef: React.MutableRefObject<HTMLIFrameElement | null> =
                {current: null};

            const {result} = renderHook(() =>
                usePreviewController(localIframeRef),
            );

            const previewData = createQuestionPreview();
            act(() => {
                result.current.sendData(previewData);
            });

            // Should not post message yet
            expect(mockContentWindow.postMessage).not.toHaveBeenCalled();

            // iframe is now set
            localIframeRef.current = iframeRef.current;

            markIframeReady();

            // The pending content is flushed via iframe-init now that a
            // contentWindow exists
            expect(mockContentWindow.postMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: "iframe-init",
                    content: expect.objectContaining({type: "question"}),
                }),
                "/",
            );
        });

        it("sends only latest data once iframe is ready", () => {
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
            markIframeReady();

            expect(mockContentWindow.postMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: expect.objectContaining({
                        data: expect.objectContaining({
                            question: expect.objectContaining({
                                content: "Question 2",
                            }),
                        }),
                    }),
                }),
                "/",
            );
        });

        it("sends data immediately if iframe is already ready", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            // Simulate iframe requesting data
            markIframeReady();

            // Now send data
            const previewData = createQuestionPreview();
            act(() => {
                result.current.sendData(previewData);
            });

            expect(mockContentWindow.postMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "content-data",
                    content: expect.objectContaining({
                        type: "question",
                    }),
                }),
                "/",
            );
        });

        it("sanitizes apiOptions before sending", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            // Simulate iframe requesting data
            markIframeReady();

            const previewData = createQuestionPreview({
                apiOptions: {onFocusChange: jest.fn()},
            });
            act(() => {
                result.current.sendData(previewData);
            });

            const sentMessage = messagesOfType("content-data")[0];

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

    describe("receiving iframe-ready message", () => {
        it("responds to iframe-ready with pending data via iframe-init", async () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));
            const previewData = createQuestionPreview();

            // Send data first (will be pending)
            act(() => {
                result.current.sendData(previewData);
            });

            // Now iframe tells parent its ready
            markIframeReady();

            await waitFor(() => {
                expect(mockContentWindow.postMessage).toHaveBeenCalled();
            });

            expect(mockContentWindow.postMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "iframe-init",
                    content: expect.objectContaining({
                        type: "question",
                    }),
                }),
                "/",
            );
        });
    });

    describe("replying to iframe-ready with an iframe-init message", () => {
        it("sends null content and a11yEnabled: false when nothing has been set", () => {
            renderHook(() => usePreviewController(iframeRef));

            markIframeReady();

            expect(mockContentWindow.postMessage).toHaveBeenCalledWith(
                {
                    source: PREVIEW_MESSAGE_SOURCE,
                    type: "iframe-init",
                    content: null,
                    a11yEnabled: false,
                    contentVersion: 0,
                },
                "/",
            );
        });

        it("sends the latest content set before the iframe was ready", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));
            const previewData1 = createQuestionPreview();
            const previewData2 = createQuestionPreview({content: "Question 2"});

            act(() => {
                result.current.sendData(previewData1);
                result.current.sendData(previewData2);
            });
            markIframeReady();

            expect(messagesOfType("iframe-init")).toEqual([
                expect.objectContaining({
                    content: expect.objectContaining({
                        data: expect.objectContaining({
                            question: expect.objectContaining({
                                content: "Question 2",
                            }),
                        }),
                    }),
                }),
            ]);
        });

        it("sends the latest a11yEnabled value set before the iframe was ready", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            act(() => {
                result.current.setA11yEnabled(false);
                result.current.setA11yEnabled(true);
            });
            markIframeReady();

            expect(messagesOfType("iframe-init")).toEqual([
                expect.objectContaining({a11yEnabled: true}),
            ]);
        });

        it("resends the full current state again on a second iframe-ready event", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));
            const previewData = createQuestionPreview();

            act(() => {
                result.current.sendData(previewData);
                result.current.setA11yEnabled(true);
            });
            markIframeReady();

            expect(messagesOfType("iframe-init")).toHaveLength(1);

            // Simulate a genuine reload: the iframe announces ready again.
            markIframeReady();

            expect(messagesOfType("iframe-init")).toEqual([
                expect.objectContaining({a11yEnabled: true}),
                expect.objectContaining({a11yEnabled: true}),
            ]);
        });
    });

    describe("receiving a11y-report message", () => {
        it("surfaces the report from an a11y-report message", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            expect(result.current.a11yReport).toBeNull();

            const violations = [issue("v1")];
            const incompletes = [issue("i1")];

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "a11y-report",
                            violations,
                            incompletes,
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            expect(result.current.a11yReport).toEqual({
                violations,
                incompletes,
            });
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
                            height: 600,
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            expect(result.current.height).toBe(600);
        });
    });

    describe("message filtering", () => {
        it("ignores messages from different source window", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            // eslint-disable-next-line no-restricted-syntax
            const differentWindow = {} as Window;

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: PREVIEW_MESSAGE_SOURCE,
                            type: "height-update",
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
            markIframeReady();

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
            markIframeReady();

            // Send first data
            const data1 = createQuestionPreview();
            act(() => {
                result.current.sendData(data1);
            });

            expect(messagesOfType("content-data")).toHaveLength(1);

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
                    },
                },
            };
            act(() => {
                result.current.sendData(data2);
            });

            const contentDataMessages = messagesOfType("content-data");
            expect(contentDataMessages).toHaveLength(2);

            // Verify second message contains hint data
            expect(contentDataMessages[1].content.type).toBe("hint");
        });

        it("handles article-all with multiple sections", () => {
            const {result} = renderHook(() => usePreviewController(iframeRef));

            markIframeReady();

            const articleData: PreviewContent = {
                type: "article-all",
                data: {
                    article: [
                        {content: "Section 1", widgets: {}, images: {}},
                        {content: "Section 2", widgets: {}, images: {}},
                    ],
                    // eslint-disable-next-line no-restricted-syntax
                    apiOptions: {
                        readOnly: true,
                        onFocusChange: jest.fn(),
                        trackInteraction: jest.fn(),
                    } as any,
                },
            };

            act(() => {
                result.current.sendData(articleData);
            });

            const sentMessage = messagesOfType("content-data")[0];

            // The shared apiOptions should be sanitized
            expect(sentMessage.content.data.article).toHaveLength(2);
            expect(
                sentMessage.content.data.apiOptions.onFocusChange,
            ).toBeUndefined();
            expect(
                sentMessage.content.data.apiOptions.trackInteraction,
            ).toBeUndefined();
            expect(sentMessage.content.data.apiOptions.readOnly).toBe(true);
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
            question: {
                content: overrides?.content ?? "What is 2+2?",
                widgets: {},
                images: {},
            },
            apiOptions: {
                readOnly: true,
                ...overrides?.apiOptions,
            },
            linterContext: {
                contentType: "exercise",
                highlightLint: false,
            },
        },
    };
}
