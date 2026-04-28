import * as React from "react";

import {PREVIEW_MESSAGE_SOURCE} from "./message-types";
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
    const pendingDataRef = React.useRef<PreviewContent | null>(null);

    // Listen for messages from iframe
    React.useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Filter by source window - only messages from OUR iframe
            if (event.source !== iframeRef.current?.contentWindow) {
                return;
            }

            const message = event.data;

            // Check if it's a Perseus preview message
            if (!isIframeToParentMessage(message)) {
                return;
            }

            // Handle the message
            switch (message.type) {
                case "request-data": {
                    // Send the pending message (if any)
                    if (pendingDataRef.current) {
                        const contentWindow = iframeRef.current?.contentWindow;
                        if (contentWindow) {
                            const sanitizedData = sanitizePreviewData(
                                pendingDataRef.current,
                            );

                            const msg: ParentToIframeMessage = {
                                source: PREVIEW_MESSAGE_SOURCE,
                                type: "content-data",
                                content: sanitizedData,
                            };
                            contentWindow.postMessage(msg, "/");
                        }
                        // Clear the pending data
                        pendingDataRef.current = null;
                    }
                    setIsIframeReady(true);
                    break;
                }

                case "height-update":
                    setHeight(message.height);
                    break;
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
            const contentWindow = iframeRef.current?.contentWindow;

            if (!contentWindow) {
                return;
            }

            // If iframe hasn't sent request-data yet, store the data
            if (!isIframeReady) {
                pendingDataRef.current = data;
                return;
            }

            // Iframe is ready, send immediately
            const sanitizedData = sanitizePreviewData(data);

            const message: ParentToIframeMessage = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "content-data",
                content: sanitizedData,
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
