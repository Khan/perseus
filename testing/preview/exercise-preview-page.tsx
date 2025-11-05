/* eslint-disable import/no-relative-packages, import/order */
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {usePreviewClient} from "../../packages/perseus-editor/src/preview/use-preview-client";
import {PreviewRenderer} from "./preview-renderer";
import {debounce} from "underscore";

/**
 * Loads the exercise preview frame
 *
 * This is loaded inside the iframe, where it sets up the ExercisePreviewFrame
 * component that handles all communication between the iframe and its parent.
 */
const ExercisePreviewPage = () => {
    const {data, reportHeight} = usePreviewClient();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const lastHeightRef = React.useRef<number | null>(null);

    // Send height updates to parent
    React.useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const sendHeightUpdate = () => {
            const height = containerRef.current?.scrollHeight;
            if (height && height !== lastHeightRef.current) {
                lastHeightRef.current = height;
                reportHeight(height);
            }
        };

        // Send initial height
        sendHeightUpdate();

        // Also send on resize
        let resizeObserver: ResizeObserver | undefined;
        const container = containerRef.current;
        if (container != null) {
            const debouncedSend = debounce(sendHeightUpdate, 100);
            resizeObserver = new ResizeObserver(debouncedSend);
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
