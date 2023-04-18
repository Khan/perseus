/**
 * A component that renders a navigation pad, which consists of an arrow for
 * each possible direction.
 */

import {StyleSheet} from "aphrodite";
import * as React from "react";

import {BorderStyles} from "../consts";
import KeyConfigs from "../data/key-configs";
import {View} from "../fake-react-native-web/index";

import {
    navigationPadWidthPx,
    controlGrey,
    valueGrey,
    offBlack16,
} from "./common-style";
import Styles from "./styles";
import TouchableKeypadButton from "./touchable-keypad-button";
import GestureManager from "./gesture-manager";
import type {Popover} from "../types";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

const {row, column, centered, stretch, roundedTopLeft} = Styles;

type Props = {
    roundTopLeft: boolean;
    style: StyleType;
    gestureManager: GestureManager;
    gestureFocus: any;
    popover: Popover | null;
    heightPx: number;
    widthPx: number;
};

class NavigationPad extends React.Component<Props> {
    render() {
        // TODO(charlie): Disable the navigational arrows depending on the
        // cursor context.
        const {
            roundTopLeft,
            style,
            gestureManager,
            gestureFocus,
            popover,
            heightPx,
            widthPx,
        } = this.props;

        const sharedButtonProps = {
            gestureManager,
            gestureFocus,
            popover,
            heightPx,
            widthPx,
        };

        const containerStyle = [
            column,
            centered,
            styles.container,
            roundTopLeft && roundedTopLeft,
            ...(Array.isArray(style) ? style : [style]),
        ];

        return (
            <View style={containerStyle}>
                <View style={[row, centered]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.UP}
                        borders={BorderStyles.NONE}
                        style={[styles.navigationKey, styles.topArrow]}
                        {...sharedButtonProps}
                    />
                </View>
                <View style={[row, centered, stretch]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.LEFT}
                        borders={BorderStyles.NONE}
                        style={[styles.navigationKey, styles.leftArrow]}
                        {...sharedButtonProps}
                    />
                    <View style={styles.horizontalSpacer} />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.RIGHT}
                        borders={BorderStyles.NONE}
                        style={[styles.navigationKey, styles.rightArrow]}
                        {...sharedButtonProps}
                    />
                </View>
                <View style={[row, centered]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.DOWN}
                        borders={BorderStyles.NONE}
                        style={[styles.navigationKey, styles.bottomArrow]}
                        {...sharedButtonProps}
                    />
                </View>
            </View>
        );
    }
}

const buttonSizePx = 48;
const borderRadiusPx = 4;
const borderWidthPx = 1;

const styles = StyleSheet.create({
    container: {
        backgroundColor: controlGrey,
        width: navigationPadWidthPx,
    },

    navigationKey: {
        borderColor: offBlack16,
        backgroundColor: valueGrey,
        width: buttonSizePx,
        height: buttonSizePx,

        // Override the default box-sizing so that our buttons are
        // `buttonSizePx` exclusive of their borders.
        boxSizing: "content-box",
    },

    topArrow: {
        borderTopWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderTopLeftRadius: borderRadiusPx,
        borderTopRightRadius: borderRadiusPx,
    },

    rightArrow: {
        borderTopWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderBottomWidth: borderWidthPx,
        borderTopRightRadius: borderRadiusPx,
        borderBottomRightRadius: borderRadiusPx,
    },

    bottomArrow: {
        borderBottomWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderBottomLeftRadius: borderRadiusPx,
        borderBottomRightRadius: borderRadiusPx,
    },

    leftArrow: {
        borderTopWidth: borderWidthPx,
        borderBottomWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderTopLeftRadius: borderRadiusPx,
        borderBottomLeftRadius: borderRadiusPx,
    },

    horizontalSpacer: {
        background: valueGrey,
        // No need to set a height -- the spacer will be stretched by its
        // parent.
        width: buttonSizePx,
    },
});

export default NavigationPad;
