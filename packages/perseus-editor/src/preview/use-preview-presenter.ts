import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";

import {PREVIEW_MESSAGE_SOURCE} from "./message-types";
import {isParentToIframeMessage} from "./message-validators";

import type {
    IframeToParentMessage,
    ParentToIframeMessage,
    PreviewContent,
} from "./message-types";

type UsePreviewPresenterResult = {
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
     * Function to report the current height of the iframe content to the parent
     */
    reportHeight: (height: number) => void;
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
 *   const { data, isMobile, reportHeight } = usePreviewPresenter();
 *
 *   React.useEffect(() => {
 *     if (containerRef.current) {
 *       reportHeight(containerRef.current.scrollHeight);
 *     }
 *   }, [data, reportHeight]);
 *
 *   if (!data) return <div>Loading...</div>;
 *   return <PreviewRenderer
 *       ref={containerRef}
 *       data={data}
 *       isMobile={isMobile}
 *   />;
 * }
 * ```
 */
export function usePreviewPresenter(): UsePreviewPresenterResult {
    const [data, setData] = React.useState<PreviewContent | null>(null);

    const iframe = window.frameElement as HTMLIFrameElement | null;
    if (iframe == null) {
        throw new Error("usePreviewPresenter must be used within an iframe");
    }

    // Listen for data from parent
    React.useEffect(() => {
        const handleMessage = (event: MessageEvent<ParentToIframeMessage>) => {
            // Filter by source window - only messages from parent
            if (event.source !== window.parent) {
                return;
            }

            const message = event.data;

            // Ignore messages that aren't from Perseus preview system
            if (!isParentToIframeMessage(message)) {
                return;
            }

            switch (message.type) {
                case "content-data":
                    setData(message.content);
                    break;

                default:
                    throw new UnreachableCaseError(message.type);
            }
        };

        window.addEventListener("message", handleMessage);

        // Tell parent we're ready for data.
        const requestMessage: IframeToParentMessage = {
            source: PREVIEW_MESSAGE_SOURCE,
            type: "iframe-ready",
        };
        window.parent.postMessage(requestMessage, "/");

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    // Memoized callback to report height
    const reportHeight = React.useCallback((height: number) => {
        if (window.parent == null) {
            return;
        }

        const message: IframeToParentMessage = {
            source: PREVIEW_MESSAGE_SOURCE,
            type: "height-update",
            height,
        };
        window.parent.postMessage(message, "/");
    }, []);

    return {
        data,
        isMobile: iframe.dataset.mobile === "true",
        hasLintGutter: iframe.dataset.lintGutter === "true",
        reportHeight,
    };
}
