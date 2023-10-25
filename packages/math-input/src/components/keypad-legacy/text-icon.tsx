/**
 * A component that renders a text-based icon.
 */

import {StyleSheet} from "aphrodite";
import * as React from "react";

import {View, Text} from "../../fake-react-native-web/index";
import {iconSizeHeightPx, iconSizeWidthPx} from "../common-style";

import Styles from "./styles";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

const {row, centered} = Styles;

type Props = {
    character: string;
    style?: StyleType;
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
        fontFamily: "'Lato', sans-serif",
        fontSize: 25,
    },
});

export default TextIcon;
