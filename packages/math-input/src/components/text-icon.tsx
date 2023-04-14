/**
 * A component that renders a text-based icon.
 */

import {StyleSheet} from "aphrodite";
import * as React from "react";

import {View, Text} from "../fake-react-native-web/index";

import {iconSizeHeightPx, iconSizeWidthPx} from "./common-style";
import Styles from "./styles";

import type {CSSProperties} from "aphrodite";

const {row, centered} = Styles;

type Props = {
    character: string;
    style?: CSSProperties | Array<CSSProperties>;
};

class TextIcon extends React.Component<Props> {
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
