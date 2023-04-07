/**
 * Renders a circular selection ring around the child.
 */

import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import * as styleConstants from "../../styles/constants";

type Props = {
    children?: React.ReactNode;
    // Whether the focus ring is visible. Allows for positioning
    // the child identically regardless of whether the ring is visible.
    visible: boolean;
    // Color of the focus ring
    color: string;
    // Whether a user can select multiple options or not
    multipleSelect: boolean;
};

const FocusRing = function (props: Props): React.ReactElement {
    const {visible, color, children, multipleSelect} = props;

    const borderColor = visible ? color : "transparent";
    const borderRadius = multipleSelect ? 5 : "50%";
    const style = {
        borderColor,
        borderRadius,
    } as const;
    return (
        <span
            data-test-id="focus-ring"
            className={css(styles.ring)}
            style={style}
        >
            {children}
        </span>
    );
};

FocusRing.defaultProps = {
    visible: true,
    color: styleConstants.kaGreen,
    multipleSelect: false,
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
