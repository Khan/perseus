import Clickable from "@khanacademy/wonder-blocks-clickable";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {KeyConfig, ClickKeyCallback} from "../../types";

import ButtonAsset from "./button-assets";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

export type KeypadButtonProps = {
    // 0 indexed x,y position in keypad CSS grid
    coord: readonly [column: number, row: number];
    keyConfig: KeyConfig;
    onClickKey: ClickKeyCallback;
    // Apply action button styles
    action?: boolean;
    // Apply secondary button styles
    secondary?: boolean;
    style?: StyleType;
};

export const KeypadButton = ({
    coord,
    keyConfig,
    onClickKey,
    style,
    secondary,
    action,
}: KeypadButtonProps): React.ReactElement => {
    const tintColor = secondary ? "#F6F6F7" : action ? "#DBDCDD" : undefined;

    return (
        <View
            style={{
                gridColumn: coord[0] + 1,
                gridRow: coord[1] + 1,
                ...style,
            }}
        >
            <Clickable
                onClick={() => onClickKey(keyConfig.id)}
                style={styles.clickable}
                aria-label={keyConfig.ariaLabel}
            >
                {({hovered, focused, pressed}) => {
                    return (
                        <View
                            style={[
                                styles.outerBoxBase,
                                hovered && styles.outerBoxHover,
                                pressed && styles.outerBoxPressed,
                            ]}
                        >
                            <View
                                style={[
                                    styles.base,
                                    tintColor != null
                                        ? {background: tintColor}
                                        : undefined,
                                    hovered && styles.hovered,
                                    focused && styles.focused,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <ButtonAsset id={keyConfig.id} />
                            </View>
                        </View>
                    );
                }}
            </Clickable>
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 1px 0px rgba(33, 36, 44, 0.32)",
        boxSizing: "border-box",
        background: Color.white,
        borderRadius: 4,
        border: `1px solid transparent`,
        flex: 1,
        minHeight: 42,
        minWidth: 42,
        padding: 1,
    },
    hovered: {
        border: `1px solid ${Color.blue}`,
        padding: 1,
        boxShadow: "none",
    },
    focused: {
        border: `2px solid ${Color.blue}`,
        padding: 0,
        boxShadow: "none",
    },
    pressed: {
        border: "2px solid #1B50B3",
        padding: 0,
        background: `linear-gradient(0deg, rgba(24, 101, 242, 0.32), rgba(24, 101, 242, 0.32)), ${Color.white}`,
        boxShadow: "none",
    },
    outerBoxBase: {
        padding: 1,
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        borderRadius: 7,
        border: "2px solid transparent",
    },
    outerBoxHover: {
        border: `2px solid ${Color.blue}`,
    },
    outerBoxPressed: {
        border: "2px solid #1B50B3",
    },
    clickable: {
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
    },
});
