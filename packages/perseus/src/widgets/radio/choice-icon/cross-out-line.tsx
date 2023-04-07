/* Component for rendering a letter icon in radio choice */

import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {CHOICE_ICON_SIZE} from "./shared-styles";

// The "cross-out line" SVG is a bit bigger than the choice icon, to provide
// extra space for the cute rounded line cap.
const CROSS_OUT_LINE_PADDING = 2;
const CROSS_OUT_LINE_SIZE = CHOICE_ICON_SIZE + CROSS_OUT_LINE_PADDING * 2;

/**
 * The "cross-out line" that appears over the icon when the choice has been
 * `crossedOut`.
 */
const CrossOutLine = function (props: {color: string}): React.ReactElement {
    return (
        <svg
            width={CROSS_OUT_LINE_SIZE}
            height={CROSS_OUT_LINE_SIZE}
            viewBox={`0 0 ${CROSS_OUT_LINE_SIZE} ${CROSS_OUT_LINE_SIZE}`}
            className={css(styles.crossOutLine)}
            data-test-id="choice-icon__cross-out-line"
        >
            <line
                // The line stretches from the bottom-left to top-right.
                // We don't quite go to the _very_ corner, because the cute
                // rounded line cap needs to bleed into our padding.
                x1={CROSS_OUT_LINE_PADDING}
                x2={CROSS_OUT_LINE_SIZE - CROSS_OUT_LINE_PADDING}
                y1={CROSS_OUT_LINE_SIZE - CROSS_OUT_LINE_PADDING}
                y2={CROSS_OUT_LINE_PADDING}
                stroke={props.color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};

const styles = StyleSheet.create({
    crossOutLine: {
        // Center the icon within the container.
        position: "absolute",
        top: `0px`,
        left: `0px`,
    },
});

export default CrossOutLine;
