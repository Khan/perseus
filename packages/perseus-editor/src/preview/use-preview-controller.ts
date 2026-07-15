import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";

import {
    createPreviewClearHighlightsMessage,
    createPreviewHighlightIssuesMessage,
    createPreviewIframeInitMessage,
    createPreviewSetA11yEnabledMessage,
    PREVIEW_MESSAGE_SOURCE,
} from "./message-types";
import {isIframeToParentMessage} from "./message-validators";
import {sanitizePreviewData} from "./preview-data-sanitizer";

import type {ParentToIframeMessage, PreviewContent} from "./message-types";
import type {A11yIssue} from "../components/issues-panel";

export type A11yReport = {
    violations: A11yIssue[];
    incompletes: A11yIssue[];
};

type UsePreviewControllerResult = {
    /**
     * Send preview content data to the iframe
     */
    sendData: (data: PreviewContent) => void;
    /**
     * Current height of the iframe content (null if not yet reported)
     */
    height: number | null;
    /**
     * Enable or disable axe-core accessibility scanning in the iframe
     */
    setA11yEnabled: (enabled: boolean) => void;
    /**
     * Highlight the elements for the given previewIds in the iframe
     */
    highlightIssues: (previewIds: string[]) => void;
    /**
     * Clear any highlighted elements currently shown in the iframe
     */
    clearHighlights: () => void;
    /**
     * The latest accessibility report received from the iframe (null if none)
     */
    a11yReport: A11yReport | null;
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
    const [a11yReport, setA11yReport] = React.useState<A11yReport | null>(null);

    // The current desired preview state, resent in full as an `iframe-init`
    // reply whenever the iframe announces `iframe-ready` — including on a
    // later reload/remount, not just the first time. This way a freshly
    // (re)loaded iframe never has to rely on messages sent before it was
    // listening.
    const currentContentRef = React.useRef<PreviewContent | null>(null);
    const currentA11yEnabledRef = React.useRef(false);

    // Monotonic version of the preview content, incremented on every
    // `sendData`. It's stamped onto each content update sent to the iframe and
    // echoed back on the iframe's scan report, so a report (or a "Show Me"
    // highlight) computed against content that a newer edit has since
    // superseded can be discarded.
    const contentVersionRef = React.useRef(0);

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
                            currentA11yEnabledRef.current,
                            contentVersionRef.current,
                        ),
                        "/",
                    );
                    setIsIframeReady(true);
                    break;
                }

                case "height-update":
                    setHeight(message.height);
                    break;

                case "a11y-report":
                    setA11yReport({
                        violations: message.violations,
                        incompletes: message.incompletes,
                    });
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
            contentVersionRef.current += 1;

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
                contentVersion: contentVersionRef.current,
            };

            contentWindow.postMessage(message, "/");
        },
        [iframeRef, isIframeReady],
    );

    // Enables/disables accessibility scanning in the iframe
    const setA11yEnabled = React.useCallback(
        (enabled: boolean) => {
            currentA11yEnabledRef.current = enabled;

            // If iframe hasn't sent iframe-ready yet, the iframe-init reply
            // above will carry this once it does.
            if (!isIframeReady) {
                return;
            }

            const contentWindow = iframeRef.current?.contentWindow;
            if (!contentWindow) {
                return;
            }

            contentWindow.postMessage(
                createPreviewSetA11yEnabledMessage(enabled),
                "/",
            );
        },
        [iframeRef, isIframeReady],
    );

    // Highlights elements in the iframe by previewId
    const highlightIssues = React.useCallback(
        (previewIds: string[]) => {
            const contentWindow = iframeRef.current?.contentWindow;
            if (!contentWindow) {
                return;
            }

            contentWindow.postMessage(
                createPreviewHighlightIssuesMessage(
                    previewIds,
                    contentVersionRef.current,
                ),
                "/",
            );
        },
        [iframeRef],
    );

    // Clears any highlighted elements in the iframe
    const clearHighlights = React.useCallback(() => {
        const contentWindow = iframeRef.current?.contentWindow;
        if (!contentWindow) {
            return;
        }

        contentWindow.postMessage(createPreviewClearHighlightsMessage(), "/");
    }, [iframeRef]);

    return {
        sendData,
        height,
        setA11yEnabled,
        highlightIssues,
        clearHighlights,
        a11yReport,
    };
}
