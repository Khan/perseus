import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {usePreviewPresenter} from "../../preview/use-preview-presenter";

import {PreviewRenderer} from "./preview-renderer";

/**
 * Loads the exercise preview frame
 *
 * This is loaded inside the iframe, where it sets up the ExercisePreviewFrame
 * component that handles all communication between the iframe and its parent.
 *
 * Uses the usePreviewPresenter hook to receive content data from the parent
 * window and report height changes back via structured postMessage protocol.
 */
const ExercisePreviewPage = () => {
    const {data, reportHeight} = usePreviewPresenter();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const lastHeightRef = React.useRef<number | null>(null);

    // Handle body overflow for article-all type (allows scrolling)
    React.useEffect(() => {
        if (data?.type === "article-all") {
            document.body.style.overflow = "scroll";
        } else {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "hidden";
        };
    }, [data?.type]);

    // Send height updates to parent
    React.useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const sendHeightUpdate = () => {
            const height = containerRef.current?.scrollHeight;
            if (height && height !== lastHeightRef.current) {
                lastHeightRef.current = height;

                // NOTE(Jeremy) I'm not sure where this comes from but it's how
                // production does it.
                const bottomMargin = 30;

                reportHeight(height + bottomMargin);
            }
        };

        // Send initial height
        sendHeightUpdate();

        // Also send on resize
        let resizeObserver: ResizeObserver | undefined;
        const container = containerRef.current;
        if (container != null) {
            resizeObserver = new ResizeObserver(sendHeightUpdate);
            resizeObserver.observe(container);
        }

        return () => {
            resizeObserver?.disconnect();
        };
    }, [data, reportHeight]);

    if (!data) {
        return (
            <View style={styles.loading}>
                <div>Loading preview...</div>
            </View>
        );
    }

    return (
        <div ref={containerRef}>
            <PreviewRenderer data={data} />
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
