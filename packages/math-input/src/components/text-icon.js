/**
 * A component that renders a text-based icon.
 */

import {iconSizeHeightPx, iconSizeWidthPx} from "./common-style.js";

const {StyleSheet} = require("aphrodite");
const PropTypes = require("prop-types");
const React = require("react");

const {View, Text} = require("../fake-react-native-web/index.js");

const {row, centered} = require("./styles.js");

class TextIcon extends React.Component {
    static propTypes = {
        character: PropTypes.string.isRequired,
        style: PropTypes.any,
    };

    render() {
        const {character, style} = this.props;

        const containerStyle = [
            row,
            centered,
            styles.size,
            styles.base,
            ...(Array.isArray(style) ? style : [style]),
        ];
        return (
            <View style={containerStyle}>
                <Text>{character}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    size: {
        height: iconSizeHeightPx,
        width: iconSizeWidthPx,
    },

    base: {
        fontFamily: "Proxima Nova",
        fontSize: 25,
    },
});

module.exports = TextIcon;
