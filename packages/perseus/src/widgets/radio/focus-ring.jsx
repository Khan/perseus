// @flow
/**
 * Renders a circular selection ring around the child.
 */

import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import * as styleConstants from "../../styles/constants.js";

type FocusRingProps = {|
    children: React.Node,
    // Whether the focus ring is visible. Allows for positioning
    // the child identically regardless of whether the ring is visible.
    visible: boolean,
    // Color of the focus ring
    color: string,
|};

function FocusRing(props: FocusRingProps): React.Node {
    const {visible = true, color = styleConstants.kaGreen, children} = props;

    const borderColor = visible ? color : "transparent";
    const style = {
        borderColor: borderColor,
    };

    return (
        <span className={css(styles.ring)} style={style}>
            {children}
        </span>
    );
}

const styles = StyleSheet.create({
    ring: {
        margin: "auto",
        display: "inline-block",
        borderRadius: "50%",
        borderWidth: 2,
        padding: 2,
        borderStyle: "solid",
    },
});

export default FocusRing;
