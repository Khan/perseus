/* eslint-disable import/no-relative-packages, import/order */
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {PreviewRenderer} from "./preview-renderer";

import type {PreviewContent} from "../../../../perseus-editor/src/preview/message-types";

/**
 * Loads the exercise preview frame
 *
 * This is loaded inside the iframe, where it sets up the ExercisePreviewFrame
 * component that handles all communication between the iframe and its parent.
 */
const ExercisePreviewPage = () => {
    const [previewData, setPreviewData] = React.useState<PreviewContent | null>(
        null,
    );
    const [iframeId, setIframeId] = React.useState<string | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Read iframe configuration from dataset attributes
    React.useEffect(() => {
        const iframe = window.frameElement as HTMLIFrameElement | null;
        if (iframe?.dataset.id) {
            setIframeId(iframe.dataset.id);
        }
    }, []);

    // Listen for data from parent
    React.useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // For now, we receive the iframe ID and look up data in parent's iframeDataStore
            if (
                typeof event.data === "string" ||
                typeof event.data === "number"
            ) {
                const id = String(event.data);
                // Access parent's iframeDataStore
                try {
                    // @ts-expect-error - accessing parent window's custom property
                    const data = window.parent.iframeDataStore?.[id];
                    if (data) {
                        setPreviewData(data);
                    }
                } catch (e) {
                    // Cross-origin access might fail in some cases
                    // Silently ignore - this is expected in cross-origin scenarios
                    // eslint-disable-next-line no-console
                    console.error("Error accessing iframeDataStore", e);
                }
            }
        };

        window.addEventListener("message", handleMessage);

        // Request initial data
        if (iframeId) {
            window.parent.postMessage(iframeId, "*");
        }

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [iframeId]);

    // Send height updates to parent
    React.useEffect(() => {
        if (!iframeId || !containerRef.current) {
            return;
        }

        const sendHeightUpdate = () => {
            const height = containerRef.current?.scrollHeight;
            if (height) {
                // NOTE(Jeremy) I'm not sure where this comes from but it's how
                // production does it.
                const bottomMargin = 30;

                window.parent.postMessage(
                    {
                        id: iframeId,
                        height: height + bottomMargin,
                    },
                    "*",
                );
            }
        };

        // Send initial height
        sendHeightUpdate();

        // Poll for height changes (to capture animations, etc.)
        const interval = setInterval(sendHeightUpdate, 500);

        // Also send on resize
        let resizeObserver: ResizeObserver | undefined;
        const container = containerRef.current;
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (container) {
            resizeObserver = new ResizeObserver(sendHeightUpdate);
            resizeObserver.observe(container);
        }

        return () => {
            clearInterval(interval);
            resizeObserver?.disconnect();
        };
    }, [iframeId, previewData]);

    if (!previewData) {
        return (
            <View style={styles.loading}>
                <div>Loading preview...</div>
            </View>
        );
    }

    return (
        <div ref={containerRef}>
            <PreviewRenderer data={previewData} />
        </div>
    );
};

const styles = StyleSheet.create({
    loading: {
        padding: spacing.medium_16,
        textAlign: "center",
    },
});

export default ExercisePreviewPage;
