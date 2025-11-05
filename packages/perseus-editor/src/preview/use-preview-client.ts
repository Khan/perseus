import * as React from "react";

import {PREVIEW_MESSAGE_SOURCE} from "./message-types";

import type {
    IframeToParentMessage,
    ParentToIframeMessage,
    PreviewContent,
} from "./message-types";

type UsePreviewClientResult = {
    /**
     * The preview content data received from the parent, or null if not yet loaded
     */
    data: PreviewContent | null;
    /**
     * Whether the preview should render in mobile mode (from data-mobile attribute)
     */
    isMobile: boolean;
    /**
     * Whether to show the lint gutter (from data-lint-gutter attribute)
     */
    hasLintGutter: boolean;
    /**
     * The iframe's unique identifier (from data-id attribute). Use for
     * debugging/logging, but not for message routing.
     */
    id: string | null;
    /**
     * Function to report the current height of the iframe content to the parent
     */
    reportHeight: (height: number) => void;
    /**
     * Function to report lint warnings to the parent
     */
    reportLintWarnings: (lintWarnings: ReadonlyArray<any>) => void;
};

/**
 * Hook for preview iframe to receive data from parent and send updates back.
 *
 * This hook:
 * - Reads iframe configuration from dataset attributes (id, mobile, lintGutter)
 * - Listens for content data from the parent window via postMessage
 * - Requests initial data on mount
 * - Provides functions to report height and lint warnings back to parent
 *
 * @example
 * ```tsx
 * function PreviewPage() {
 *   const { data, isMobile, reportHeight } = usePreviewClient();
 *
 *   React.useEffect(() => {
 *     if (containerRef.current) {
 *       reportHeight(containerRef.current.scrollHeight);
 *     }
 *   }, [data, reportHeight]);
 *
 *   if (!data) return <div>Loading...</div>;
 *   return <PreviewRenderer data={data} isMobile={isMobile} />;
 * }
 * ```
 */
export function usePreviewClient(): UsePreviewClientResult {
    const [data, setData] = React.useState<PreviewContent | null>(null);
    const [iframeId, setIframeId] = React.useState<string | null>(null);
    const [isMobile, setIsMobile] = React.useState(false);
    const [hasLintGutter, setHasLintGutter] = React.useState(false);

    // Read iframe configuration from dataset attributes
    React.useEffect(() => {
        const iframe = window.frameElement as HTMLIFrameElement | null;
        if (iframe) {
            // ID is used for debugging/logging, not message routing
            const id = iframe.dataset.id;
            const mobile = iframe.dataset.mobile === "true";
            const lintGutter = iframe.dataset.lintGutter === "true";

            if (id) {
                setIframeId(id);
            }
            setIsMobile(mobile);
            setHasLintGutter(lintGutter);
        }
    }, []);

    // Listen for data from parent
    React.useEffect(() => {
        const handleMessage = (event: MessageEvent<ParentToIframeMessage>) => {
            const message = event.data;

            // Ignore messages that aren't from Perseus preview system
            if (
                typeof message !== "object" ||
                message === null ||
                message.source !== PREVIEW_MESSAGE_SOURCE
            ) {
                return;
            }

            // Handle content data
            // Note: ID check is for extra validation/debugging; actual routing is by event.source
            if (message.type === "content-data" && message.id === iframeId) {
                setData(message.content);
            }
        };

        window.addEventListener("message", handleMessage);

        // Request initial data if we have an ID
        if (iframeId && window.parent != null) {
            const requestMessage: IframeToParentMessage = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "request-data",
                id: iframeId,
            };
            window.parent.postMessage(requestMessage, "*");
        }

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [iframeId]);

    // Memoized callback to report height
    const reportHeight = React.useCallback(
        (height: number) => {
            if (!iframeId || window.parent == null) {
                return;
            }

            const message: IframeToParentMessage = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "height-update",
                id: iframeId,
                height,
            };
            window.parent.postMessage(message, "*");
        },
        [iframeId],
    );

    // Memoized callback to report lint warnings
    const reportLintWarnings = React.useCallback(
        (lintWarnings: ReadonlyArray<any>) => {
            if (!iframeId || window.parent == null) {
                return;
            }

            const message: IframeToParentMessage = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "lint-report",
                id: iframeId,
                lintWarnings,
            };
            window.parent.postMessage(message, "*");
        },
        [iframeId],
    );

    return {
        data,
        isMobile,
        hasLintGutter,
        id: iframeId,
        reportHeight,
        reportLintWarnings,
    };
}
