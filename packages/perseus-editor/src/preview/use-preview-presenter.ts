import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";

import {
    createPreviewIframeReadyMessage,
    PREVIEW_MESSAGE_SOURCE,
} from "./message-types";
import {isParentToIframeMessage} from "./message-validators";

import type {
    IframeToParentMessage,
    ParentToIframeMessage,
    PreviewContent,
} from "./message-types";

type UsePreviewPresenterResult = {
    /**
     * The preview content received from the parent, or null if not yet loaded
     */
    content: PreviewContent | null;
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
 *   const { content, isMobile, reportHeight } = usePreviewPresenter();
 *
 *   React.useEffect(() => {
 *     if (containerRef.current) {
 *       reportHeight(containerRef.current.scrollHeight);
 *     }
 *   }, [content, reportHeight]);
 *
 *   if (!content) return <div>Loading...</div>;
 *   return <PreviewRenderer
 *       ref={containerRef}
 *       content={content}
 *       isMobile={isMobile}
 *   />;
 * }
 * ```
 */
export function usePreviewPresenter(): UsePreviewPresenterResult {
    const [content, setContent] = React.useState<PreviewContent | null>(null);

    // eslint-disable-next-line no-restricted-syntax
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
                    setContent(message.content);
                    break;

                case "iframe-init":
                    setContent(message.content);
                    break;

                default:
                    throw new UnreachableCaseError(message);
            }
        };

        window.addEventListener("message", handleMessage);

        // Tell parent we're ready for data.
        window.parent.postMessage(createPreviewIframeReadyMessage(), "/");

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
        content,
        isMobile: iframe.dataset.mobile === "true",
        hasLintGutter: iframe.dataset.lintGutter === "true",
        reportHeight,
    };
}
