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
     * Function to send preview content data to the iframe
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
    const iframeIdRef = React.useRef<string | null>(null);

    // Listen for messages from iframe
    React.useEffect(() => {
        const handleMessage = (event: MessageEvent<IframeToParentMessage>) => {
            const message = event.data;

            // Ignore messages that aren't from Perseus preview system
            if (
                typeof message !== "object" ||
                message === null ||
                message.source !== PREVIEW_MESSAGE_SOURCE
            ) {
                return;
            }

            // Handle data request
            if (message.type === "request-data") {
                // Store the iframe ID for future reference
                iframeIdRef.current = String(message.id);
                // Note: Data will be sent via sendData(), not here
                // This just registers that the iframe is ready
            }

            // Handle height update
            if (message.type === "height-update") {
                setHeight(message.height);
            }

            // Handle lint report
            if (message.type === "lint-report") {
                Log.log("LINTER REPORT", {
                    lintWarnings: JSON.stringify(message.lintWarnings),
                });
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    // Memoized function to send data to iframe
    const sendData = React.useCallback(
        (data: PreviewContent) => {
            const iframe = iframeRef.current;
            const contentWindow = iframe?.contentWindow;

            if (!contentWindow || !iframeIdRef.current) {
                return;
            }

            // Sanitize apiOptions in the data before sending
            let sanitizedData = data;
            if (data.type === "question" && data.data.apiOptions) {
                sanitizedData = {
                    ...data,
                    data: {
                        ...data.data,
                        apiOptions: sanitizeApiOptions(data.data.apiOptions),
                    },
                };
            } else if (data.type === "hint" && data.data.apiOptions) {
                sanitizedData = {
                    ...data,
                    data: {
                        ...data.data,
                        apiOptions: sanitizeApiOptions(data.data.apiOptions),
                    },
                };
            } else if (data.type === "article" && data.data.apiOptions) {
                sanitizedData = {
                    ...data,
                    data: {
                        ...data.data,
                        apiOptions: sanitizeApiOptions(data.data.apiOptions),
                    },
                };
            }

            const message: ParentToIframeMessage = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "content-data",
                id: iframeIdRef.current,
                content: sanitizedData,
            };

            contentWindow.postMessage(message, "*");
        },
        [iframeRef],
    );

    return {
        sendData,
        height,
    };
}
