// @flow
/* Component for rendering a letter icon in radio choice */

import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {SAT_ICON_SIZE, LIBRARY_ICON_SIZE} from "./shared-styles.js";

// The "cross-out line" SVG is a bit bigger than the library icon, to provide
// extra space for the cute rounded line cap.
const CROSS_OUT_LINE_PADDING = 2;
const CROSS_OUT_LINE_SIZE = LIBRARY_ICON_SIZE + CROSS_OUT_LINE_PADDING * 2;
const SAT_CROSS_OUT_LINE_SIZE = SAT_ICON_SIZE + CROSS_OUT_LINE_PADDING * 2;

/**
 * The "cross-out line" that appears over the icon when the choice has been
 * `crossedOut`.
 */
function CrossOutLine(props: {color: string, sat?: boolean, ...}): React.Node {
    const crossOutLineSize = props.sat
        ? SAT_CROSS_OUT_LINE_SIZE
        : CROSS_OUT_LINE_SIZE;
    return (
        <svg
            width={crossOutLineSize}
            height={crossOutLineSize}
            viewBox={`0 0 ${crossOutLineSize} ${crossOutLineSize}`}
            className={css(styles.crossOutLine)}
        >
            <line
                // The line stretches from the bottom-left to top-right.
                // We don't quite go to the _very_ corner, because the cute
                // rounded line cap needs to bleed into our padding.
                x1={CROSS_OUT_LINE_PADDING}
                x2={crossOutLineSize - CROSS_OUT_LINE_PADDING}
                y1={crossOutLineSize - CROSS_OUT_LINE_PADDING}
                y2={CROSS_OUT_LINE_PADDING}
                stroke={props.color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

const styles = StyleSheet.create({
    crossOutLine: {
        // Center the icon within the container.
        position: "absolute",
        top: `0px`,
        left: `0px`,
    },
});

export default CrossOutLine;
