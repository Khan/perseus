import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";

import {
    createPreviewIframeInitMessage,
    PREVIEW_MESSAGE_SOURCE,
} from "./message-types";
import {isIframeToParentMessage} from "./message-validators";
import {sanitizePreviewData} from "./preview-data-sanitizer";

import type {ParentToIframeMessage, PreviewContent} from "./message-types";

type UsePreviewControllerResult = {
    /**
     * Send preview content data to the iframe
     */
    sendData: (data: PreviewContent) => void;
    /**
     * Current height of the iframe content (null if not yet reported)
     */
    height: number | null;
};

/**
 * Hook for parent/editor to send data to preview iframe and receive updates.
 *
 * This hook:
 * - Sends preview content data to iframe via postMessage
 * - Listens for height updates from iframe
 * - Listens for lint reports from iframe
 * - Automatically sanitizes apiOptions before sending (removes non-serializable functions)
 *
 * @param iframeRef - Reference to the iframe element
 * @returns Object with sendData function and current height
 *
 * @example
 * ```tsx
 * function Editor() {
 *   const iframeRef = React.useRef<HTMLIFrameElement>(null);
 *   const { sendData, height } = usePreviewController(iframeRef);
 *
 *   React.useEffect(() => {
 *     sendData({
 *       type: "question",
 *       data: { item, apiOptions, ... }
 *     });
 *   }, [item, apiOptions]);
 *
 *   return <iframe ref={iframeRef} style={{ height }} />;
 * }
 * ```
 */
export function usePreviewController(
    iframeRef: React.RefObject<HTMLIFrameElement>,
): UsePreviewControllerResult {
    const [height, setHeight] = React.useState<number | null>(null);
    const [isIframeReady, setIsIframeReady] = React.useState(false);

    // The current desired preview content, resent in full as an
    // `iframe-init` reply whenever the iframe announces `iframe-ready` —
    // including on a later reload/remount, not just the first time. This way
    // a freshly (re)loaded iframe never has to rely on messages sent before
    // it was listening.
    const currentContentRef = React.useRef<PreviewContent | null>(null);

    // Listen for messages from iframe
    React.useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Filter by source window - only messages from OUR iframe
            if (
                iframeRef.current?.contentWindow == null ||
                event.source !== iframeRef.current?.contentWindow
            ) {
                return;
            }

            const message = event.data;

            // Check if it's a Perseus preview message
            if (!isIframeToParentMessage(message)) {
                return;
            }

            // Handle the message
            switch (message.type) {
                case "iframe-ready": {
                    iframeRef.current.contentWindow.postMessage(
                        createPreviewIframeInitMessage(
                            currentContentRef.current
                                ? sanitizePreviewData(currentContentRef.current)
                                : null,
                        ),
                        "/",
                    );
                    setIsIframeReady(true);
                    break;
                }

                case "height-update":
                    setHeight(message.height);
                    break;

                default:
                    throw new UnreachableCaseError(message);
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [iframeRef]);

    // Memoized function to send data to iframe
    const sendData = React.useCallback(
        (data: PreviewContent) => {
            currentContentRef.current = data;

            // If iframe hasn't sent iframe-ready yet, the iframe-init reply
            // above will carry this once it does.
            if (!isIframeReady) {
                return;
            }

            const contentWindow = iframeRef.current?.contentWindow;
            if (!contentWindow) {
                return;
            }

            const message: ParentToIframeMessage = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "content-data",
                content: sanitizePreviewData(data),
            };

            contentWindow.postMessage(message, "/");
        },
        [iframeRef, isIframeReady],
    );

    return {
        sendData,
        height,
    };
}
