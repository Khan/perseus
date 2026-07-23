import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {usePreviewPresenter} from "../../preview/use-preview-presenter";

import {PreviewRenderer} from "./preview-renderer";

/**
 * The exercise preview page. This page is loaded inside an iframe and should
 * only be used to support editor previews in Storybook!
 */
const ExercisePreviewPage = () => {
    const {content, isMobile, hasLintGutter, reportHeight} =
        usePreviewPresenter();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const lastHeightRef = React.useRef<number | null>(null);

    // Set the overflow on the body within the iframe (scroll for
    // article-all, hidden otherwise) to prevent nested scrollbars, and
    // restore it on unmount.
    React.useEffect(() => {
        document.body.style.overflow =
            content?.type === "article-all" ? "scroll" : "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [content?.type]);

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
    }, [content, reportHeight]);

    if (!content) {
        return (
            <View style={styles.loading}>
                <div>Loading preview...</div>
            </View>
        );
    }

    return (
        <div ref={containerRef}>
            <PreviewRenderer
                content={content}
                isMobile={isMobile}
                hasLintGutter={hasLintGutter}
            />
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
