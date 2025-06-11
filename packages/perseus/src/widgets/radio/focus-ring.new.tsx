/**
 * Renders a circular selection ring around the child.
 */

import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import * as styleConstants from "../../styles/constants";

interface FocusRingProps {
    children?: React.ReactNode;
    // Whether the focus ring is visible. Allows for positioning
    // the child identically regardless of whether the ring is visible.
    visible?: boolean;
    // Color of the focus ring
    color?: string;
    // Whether a user can select multiple options or not
    multipleSelect?: boolean;
}

/**
 * This component is a duplicate of the FocusRing component in focus-ring.tsx
 * for the Radio Revitalization Project. (LEMS-2933)
 * This component will eventually replace focus-ring.tsx when the feature flag is no longer needed.
 *
 * TODO(LEMS-2994): Clean up this file.
 */
const FocusRing = ({
    visible = true,
    color = styleConstants.kaGreen,
    multipleSelect = false,
    children,
}: FocusRingProps): React.ReactElement => {
    const borderColor = visible ? color : "transparent";
    const borderRadius = multipleSelect ? 5 : "50%";
    const style = {
        borderColor,
        borderRadius,
    } as const;
    return (
        <span
            data-testid="focus-ring"
            className={css(styles.ring)}
            style={style}
        >
            {children}
        </span>
    );
};

const styles = StyleSheet.create({
    ring: {
        margin: "auto",
        display: "inline-block",
        borderWidth: 2,
        padding: 2,
        borderStyle: "solid",
    },
});

export default FocusRing;
