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
        const borderColor = this.props.visible
                          ? this.props.color
                          : "transparent";
        const style = {
            borderColor: borderColor,
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
        padding: 2,
        borderStyle: "solid",
    },
});

module.exports = FocusRing;
