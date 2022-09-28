// @flow
/**
 * Renders a circular selection ring around the child.
 */

import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import * as styleConstants from "../../styles/constants.js";

type Props = {|
    children?: any,
    // Whether the focus ring is visible. Allows for positioning
    // the child identically regardless of whether the ring is visible.
    visible: boolean,
    // Color of the focus ring
    color: string,
    // Whether a user can select multiple options or not
    multipleSelect: boolean,
|};

class FocusRing extends React.Component<Props> {
    static defaultProps: Props = {
        visible: true,
        color: styleConstants.kaGreen,
        multipleSelect: false,
    };

    render(): React.Element<"span"> {
        const borderColor = this.props.visible
            ? this.props.color
            : "transparent";
        const borderRadius = this.props.multipleSelect ? 5 : "50%";
        const style = {
            borderColor,
            borderRadius,
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
        borderWidth: 2,
        padding: 2,
        borderStyle: "solid",
    },
});

export default FocusRing;
