/* eslint-disable import/no-relative-packages, import/order */
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {usePreviewClient} from "../../packages/perseus-editor/src/preview/use-preview-client";
import {PreviewRenderer} from "./preview-renderer";

/**
 * Loads the exercise preview frame
 *
 * This is loaded inside the iframe, where it sets up the ExercisePreviewFrame
 * component that handles all communication between the iframe and its parent.
 */
const ExercisePreviewPage = () => {
    const {data, reportHeight} = usePreviewClient();
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Send height updates to parent
    React.useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const sendHeightUpdate = () => {
            const height = containerRef.current?.scrollHeight;
            if (height) {
                reportHeight(height);
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
