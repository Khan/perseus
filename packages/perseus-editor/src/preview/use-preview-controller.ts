import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";

import {logBridgeHint} from "./log-bridge-hint";
import {
    createPreviewClearHighlightsMessage,
    createPreviewHighlightIssuesMessage,
    createPreviewIframeInitMessage,
    createPreviewSetA11yScanningEnabledMessage,
    PREVIEW_MESSAGE_SOURCE,
} from "./message-types";
import {isIframeToParentMessage} from "./message-validators";
import {sanitizePreviewData} from "./preview-data-sanitizer";

import type {ParentToIframeMessage, PreviewContent} from "./message-types";
import type {A11yIssue} from "../components/issues-panel";

export type A11yReport = {
    violations: A11yIssue[];
    needsReview: A11yIssue[];
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
    setA11yScanningEnabled: (enabled: boolean) => void;
    /**
     * Highlight the elements for the given instanceIds in the iframe
     */
    highlightIssues: (instanceIds: string[]) => void;
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
    const currentA11yScanningEnabledRef = React.useRef(false);

    React.useEffect(() => {
        logBridgeHint();
    }, []);

    // Sends a message to the iframe, dropping it if the iframe isn't
    // currently mounted (eg. during a reload/remount).
    const postToIframe = React.useCallback(
        (message: ParentToIframeMessage) => {
            iframeRef.current?.contentWindow?.postMessage(message, "/");
        },
        [iframeRef],
    );

    // Monotonic version of the preview content, bumped on every `sendData`.
    // Lets us discard scan results and highlights that a newer edit has
    // already superseded: we stamp each content update with it and the iframe
    // echoes it back.
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
                    postToIframe(
                        createPreviewIframeInitMessage(
                            currentContentRef.current
                                ? sanitizePreviewData(currentContentRef.current)
                                : null,
                            currentA11yScanningEnabledRef.current,
                            contentVersionRef.current,
                        ),
                    );
                    setIsIframeReady(true);
                    break;
                }

                case "height-update":
                    setHeight(message.height);
                    break;

                case "a11y-report":
                    // Discard a report computed against content a newer edit
                    // has since superseded.
                    if (message.contentVersion !== contentVersionRef.current) {
                        break;
                    }
                    setA11yReport({
                        violations: message.violations,
                        needsReview: message.needsReview,
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
    }, [iframeRef, postToIframe]);

    // Memoized function to send data to iframe
    const sendData = React.useCallback(
        (data: PreviewContent) => {
            currentContentRef.current = data;
            contentVersionRef.current += 1;

            // We can safely bail here. We'll send a full init message later
            // once the iframe sends it's 'iframe-ready' message.
            if (!isIframeReady) {
                return;
            }

            const message: ParentToIframeMessage = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "content-data",
                content: sanitizePreviewData(data),
                contentVersion: contentVersionRef.current,
            };

            postToIframe(message);
        },
        [isIframeReady, postToIframe],
    );

    // Enables/disables accessibility scanning in the iframe
    const setA11yScanningEnabled = React.useCallback(
        (enabled: boolean) => {
            currentA11yScanningEnabledRef.current = enabled;

            // We can safely bail here. We'll send a full init message later
            // once the iframe sends it's 'iframe-ready' message.
            if (!isIframeReady) {
                return;
            }

            postToIframe(createPreviewSetA11yScanningEnabledMessage(enabled));
        },
        [isIframeReady, postToIframe],
    );

    // Highlights elements in the iframe by instanceId
    const highlightIssues = React.useCallback(
        (instanceIds: string[]) => {
            postToIframe(
                createPreviewHighlightIssuesMessage(
                    instanceIds,
                    contentVersionRef.current,
                ),
            );
        },
        [postToIframe],
    );

    // Clears any highlighted elements in the iframe
    const clearHighlights = React.useCallback(() => {
        postToIframe(createPreviewClearHighlightsMessage());
    }, [postToIframe]);

    return {
        sendData,
        height,
        setA11yScanningEnabled,
        highlightIssues,
        clearHighlights,
        a11yReport,
    };
}
