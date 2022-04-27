// @flow
/**
 * Renders a circular selection ring around the child.
 */

import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import * as styleConstants from "../../styles/constants.js";

class FocusRing extends React.Component<{
    children?: any,
    // Whether the focus ring is visible. Allows for positioning
    // the child identically regardless of whether the ring is visible.
    visible: boolean,
    // Color of the focus ring
    color: string,
    ...
}> {
    static defaultProps: {|color: string, visible: boolean|} = {
        visible: true,
        color: styleConstants.kaGreen,
    };

    render(): React.Element<"span"> {
        const borderColor = this.props.visible
            ? this.props.color
            : "transparent";
        const style = {
            borderColor: borderColor,
        };
        return (
            <span className={css(styles.ring)} style={style}>
                {this.props.children}
            </span>
        );
    }
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
