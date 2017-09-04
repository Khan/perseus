// @flow

/**
 * Renders a circular selection ring around the child.
 */

const React = require("react");
const {StyleSheet, css} = require("aphrodite");

const styleConstants = require("../../styles/constants.js");

class FocusRing extends React.Component {
    props: {
        children?: any,
        // Whether the focus ring is visible. Allows for positioning
        // the child identically regardless of whether the ring is visible.
        visible: boolean,
        // Color of the focus ring
        color: string,
    }

    static defaultProps = {
        visible: true,
        color: styleConstants.kaGreen,
    }

    render() {
        const borderStyle = this.props.visible ? "solid" : "none";
        // If there is no visible border, we make the padding the same
        // size as the border + padding would be.
        const padding = (this.props.visible) ? 2 : 4;
        const style = {
            padding,
            borderColor: this.props.color,
            borderStyle,
        };
        return <span className={css(styles.ring)} style={style}>
            {this.props.children}
        </span>;
    }
}

const styles = StyleSheet.create({
    ring: {
        margin: "auto",
        display: "inline-block",
        borderRadius: "50%",
        borderWidth: 2,
    },
});

module.exports = FocusRing;
