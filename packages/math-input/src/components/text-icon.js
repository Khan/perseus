/**
 * A component that renders a text-based icon.
 */

import {StyleSheet} from "aphrodite";
import PropTypes from "prop-types";
import * as React from "react";

import {View, Text} from "../fake-react-native-web/index";

import {iconSizeHeightPx, iconSizeWidthPx} from "./common-style";
import Styles from "./styles";

const {row, centered} = Styles;

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

export default TextIcon;
