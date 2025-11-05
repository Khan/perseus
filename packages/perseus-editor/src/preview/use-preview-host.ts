import {Log} from "@khanacademy/perseus";
import * as React from "react";

import {PREVIEW_MESSAGE_SOURCE} from "./message-types";
import {sanitizeApiOptions} from "./sanitize-api-options";

import type {
    IframeToParentMessage,
    ParentToIframeMessage,
    PreviewContent,
} from "./message-types";

type UsePreviewHostResult = {
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
 * Predicate to check if an object is an {IframeToParentMessage} type.
 */
function isIframeToParentMessage(msg: unknown): msg is IframeToParentMessage {
    return (
        typeof msg === "object" &&
        msg !== null &&
        "source" in msg &&
        typeof msg.source === "string" &&
        msg.source === PREVIEW_MESSAGE_SOURCE
    );
}

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
 *   const { sendData, height } = usePreviewHost(iframeRef);
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
export function usePreviewHost(
    iframeRef: React.RefObject<HTMLIFrameElement>,
): UsePreviewHostResult {
    const [height, setHeight] = React.useState<number | null>(null);
    const pendingDataRef = React.useRef<PreviewContent[]>([]);
    const iframeIdRef = React.useRef<string | null>(null);

    // Helper function to sanitize apiOptions in preview content
    const sanitizePreviewData = React.useCallback(
        (data: PreviewContent): PreviewContent => {
            if (
                (data.type === "question" ||
                    data.type === "hint" ||
                    data.type === "article") &&
                data.data.apiOptions != null
            ) {
                return {
                    ...data,
                    data: {
                        ...data.data,
                        apiOptions: sanitizeApiOptions(data.data.apiOptions),
                    },
                } as PreviewContent;
            }
            return data;
        },
        [],
    );

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
                    // Store the iframe ID (used for debugging/logging, not routing)
                    iframeIdRef.current = String(message.id);

                    // Send only the most recent pending message (if any)
                    if (pendingDataRef.current.length > 0) {
                        const iframe = iframeRef.current;
                        const contentWindow = iframe?.contentWindow;
                        if (contentWindow && iframeIdRef.current) {
                            const latestData =
                                pendingDataRef.current[
                                    pendingDataRef.current.length - 1
                                ];
                            const sanitizedData =
                                sanitizePreviewData(latestData);

                            const msg: ParentToIframeMessage = {
                                source: PREVIEW_MESSAGE_SOURCE,
                                type: "content-data",
                                id: iframeIdRef.current,
                                content: sanitizedData,
                            };
                            contentWindow.postMessage(msg, "*");
                        }
                        // Clear the queue
                        pendingDataRef.current = [];
                    }
                    break;
                }

                case "height-update":
                    setHeight(message.height);
                    break;

                case "lint-report":
                    Log.log("LINTER REPORT", {
                        lintWarnings: JSON.stringify(message.lintWarnings),
                    });
                    break;
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
        // iframeRef is intentionally excluded - it's a stable ref that shouldn't trigger re-runs
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sanitizePreviewData]);

    // Memoized function to send data to iframe
    const sendData = React.useCallback(
        (data: PreviewContent) => {
            const iframe = iframeRef.current;
            const contentWindow = iframe?.contentWindow;

            if (!contentWindow) {
                return;
            }

            // If iframe hasn't sent request-data yet, queue the data
            if (!iframeIdRef.current) {
                pendingDataRef.current.push(data);
                return;
            }

            // Iframe is ready, send immediately
            const sanitizedData = sanitizePreviewData(data);

            const message: ParentToIframeMessage = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "content-data",
                id: iframeIdRef.current,
                content: sanitizedData,
            };

            contentWindow.postMessage(message, "*");
        },
        // iframeRef is intentionally excluded - it's a stable ref that shouldn't trigger re-runs
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [sanitizePreviewData],
    );

    return {
        sendData,
        height,
    };
}
