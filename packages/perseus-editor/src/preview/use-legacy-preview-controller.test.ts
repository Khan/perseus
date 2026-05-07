import {renderHook, act} from "@testing-library/react";

import {useLegacyPreviewController} from "./use-legacy-preview-controller";

import type {PreviewContent} from "./message-types";
import type * as React from "react";

describe("useLegacyPreviewController", () => {
    let mockIframe: {contentWindow: Window | null; dataset: any};
    let mockContentWindow: Window;
    let iframeRef: React.RefObject<HTMLIFrameElement>;

    beforeEach(() => {
        mockContentWindow = {
            postMessage: jest.fn(),
        } as unknown as Window;

        mockIframe = {
            contentWindow: mockContentWindow,
            dataset: {},
        };

        iframeRef = {current: mockIframe as any};

        // Reset the global store between tests so leakage is impossible
        delete window.iframeDataStore;
    });

    describe("initialization", () => {
        it("returns a stable iframeId across renders", () => {
            const {result, rerender} = renderHook(() =>
                useLegacyPreviewController(iframeRef),
            );
            const initialId = result.current.iframeId;

            rerender();

            expect(result.current.iframeId).toBe(initialId);
        });

        it("returns null height before any legacy height update", () => {
            const {result} = renderHook(() =>
                useLegacyPreviewController(iframeRef),
            );

            expect(result.current.height).toBeNull();
        });

        it("creates window.iframeDataStore on first use", () => {
            renderHook(() => useLegacyPreviewController(iframeRef));

            expect(window.iframeDataStore).toBeDefined();
        });

        it("removes its entry from window.iframeDataStore on unmount", () => {
            const {result, unmount} = renderHook(() =>
                useLegacyPreviewController(iframeRef),
            );
            const id = result.current.iframeId;

            act(() => {
                result.current.sendData(createQuestionPreview());
            });
            expect(window.iframeDataStore?.[id]).toBeDefined();

            unmount();

            expect(window.iframeDataStore?.[id]).toBeUndefined();
        });
    });

    describe("sendData", () => {
        it("writes the latest data into window.iframeDataStore", () => {
            const {result} = renderHook(() =>
                useLegacyPreviewController(iframeRef),
            );
            const data = createQuestionPreview();

            act(() => {
                result.current.sendData(data);
            });

            expect(window.iframeDataStore?.[result.current.iframeId]).toBe(
                data,
            );
        });

        it("doesn't post to the iframe before the legacy handshake", () => {
            const {result} = renderHook(() =>
                useLegacyPreviewController(iframeRef),
            );

            act(() => {
                result.current.sendData(createQuestionPreview());
            });

            expect(mockContentWindow.postMessage).not.toHaveBeenCalled();
        });

        it("posts the iframeId to the iframe after the legacy handshake", () => {
            const {result} = renderHook(() =>
                useLegacyPreviewController(iframeRef),
            );
            const id = result.current.iframeId;

            // Iframe handshakes with no buffered data
            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: id,
                        source: mockContentWindow,
                    }),
                );
            });

            // Now send data — should immediately post id back
            act(() => {
                result.current.sendData(createQuestionPreview());
            });

            expect(mockContentWindow.postMessage).toHaveBeenCalledWith(id, "*");
        });
    });

    describe("legacy handshake", () => {
        it("on receiving the iframeId as a string, writes buffered data and posts the id back", () => {
            const {result} = renderHook(() =>
                useLegacyPreviewController(iframeRef),
            );
            const id = result.current.iframeId;
            const data = createQuestionPreview();

            // Buffer data before handshake
            act(() => {
                result.current.sendData(data);
            });
            expect(mockContentWindow.postMessage).not.toHaveBeenCalled();

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: id,
                        source: mockContentWindow,
                    }),
                );
            });

            expect(window.iframeDataStore?.[id]).toBe(data);
            expect(mockContentWindow.postMessage).toHaveBeenCalledWith(id, "*");
        });

        it("ignores string handshakes from other windows", () => {
            const {result} = renderHook(() =>
                useLegacyPreviewController(iframeRef),
            );
            const id = result.current.iframeId;
            const otherWindow = {postMessage: jest.fn()} as unknown as Window;

            act(() => {
                result.current.sendData(createQuestionPreview());
            });

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: id,
                        source: otherWindow,
                    }),
                );
            });

            expect(mockContentWindow.postMessage).not.toHaveBeenCalled();
        });

        it("ignores string messages that don't match this iframe's id", () => {
            const {result} = renderHook(() =>
                useLegacyPreviewController(iframeRef),
            );

            act(() => {
                result.current.sendData(createQuestionPreview());
            });

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: "some-other-id",
                        source: mockContentWindow,
                    }),
                );
            });

            expect(mockContentWindow.postMessage).not.toHaveBeenCalled();
        });
    });

    describe("legacy height updates", () => {
        it("updates height from {id, height} messages", () => {
            const {result} = renderHook(() =>
                useLegacyPreviewController(iframeRef),
            );
            const id = result.current.iframeId;

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {id, height: 320},
                        source: mockContentWindow,
                    }),
                );
            });

            expect(result.current.height).toBe(320);
        });

        it("ignores height messages with a non-matching id", () => {
            const {result} = renderHook(() =>
                useLegacyPreviewController(iframeRef),
            );

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {id: "nope", height: 320},
                        source: mockContentWindow,
                    }),
                );
            });

            expect(result.current.height).toBeNull();
        });

        it("ignores typed-protocol messages (those have source/type, not id)", () => {
            const {result} = renderHook(() =>
                useLegacyPreviewController(iframeRef),
            );

            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {
                        data: {
                            source: "perseus-preview",
                            type: "height-update",
                            height: 999,
                        },
                        source: mockContentWindow,
                    }),
                );
            });

            expect(result.current.height).toBeNull();
        });
    });
});

function createQuestionPreview(): PreviewContent {
    return {
        type: "question",
        data: {
            item: {
                question: {content: "Q", widgets: {}, images: {}},
                answerArea: {calculator: false} as any,
                hints: [],
            },
            apiOptions: {},
            initialHintsVisible: 0,
            device: "desktop",
            linterContext: {
                contentType: "exercise",
                highlightLint: false,
                stack: [],
            },
        },
    };
}
