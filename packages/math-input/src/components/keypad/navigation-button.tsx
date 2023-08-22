import Clickable from "@khanacademy/wonder-blocks-clickable";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ButtonAsset from "./button-assets";

import type Key from "../../data/keys";
import type {KeyConfig, ClickKeyCallback} from "../../types";

export type KeypadButtonProps = {
    keyConfig: KeyConfig;
    onClickKey: ClickKeyCallback;
};

function getCoords(key: Key) {
    switch (key) {
        case "UP":
            return [1, 0];
        case "RIGHT":
            return [2, 1];
        case "DOWN":
            return [1, 2];
        case "LEFT":
            return [0, 1];
        default:
            throw new Error(`Invalid key: ${key}`);
    }
}

function getStyles(key: Key) {
    switch (key) {
        case "UP":
            return styles.up;
        case "RIGHT":
            return styles.right;
        case "DOWN":
            return styles.down;
        case "LEFT":
            return styles.left;
        default:
            throw new Error(`Invalid key: ${key}`);
    }
}

export default function NavigationButton({
    keyConfig,
    onClickKey,
}: KeypadButtonProps) {
    const key = keyConfig.id;
    const coord = getCoords(key);
    const directionalStyles = getStyles(key);

    return (
        <View
            style={{
                gridColumn: coord[0] + 1,
                gridRow: coord[1] + 1,
            }}
        >
            <Clickable
                onClick={(e) => onClickKey(keyConfig.id, e)}
                style={styles.clickable}
                aria-label={keyConfig.ariaLabel}
            >
                {({hovered, focused, pressed}) => {
                    return (
                        <View style={styles.outerBoxBase}>
                            <View
                                style={[
                                    styles.base,
                                    directionalStyles,
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
}

const borderRadiusPx = 4;
const borderWidthPx = 2;

const styles = StyleSheet.create({
    clickable: {
        width: "100%",
        height: "100%",
        boxSizing: "border-box",

        ":focus": {
            outline: `none`,
        },
    },
    outerBoxBase: {
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        borderStyle: "solid",
        borderColor: "transparent",
    },
    base: {
        boxShadow: "0px 1px 0px rgba(33, 36, 44, 0.32)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        background: Color.white,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: Color.white,
        flex: 1,
        minHeight: 42,
        minWidth: 42,
    },
    up: {
        borderTopWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderTopLeftRadius: borderRadiusPx,
        borderTopRightRadius: borderRadiusPx,
    },
    right: {
        borderTopWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderBottomWidth: borderWidthPx,
        borderTopRightRadius: borderRadiusPx,
        borderBottomRightRadius: borderRadiusPx,
    },
    down: {
        borderBottomWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderBottomLeftRadius: borderRadiusPx,
        borderBottomRightRadius: borderRadiusPx,
    },
    left: {
        borderTopWidth: borderWidthPx,
        borderBottomWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderTopLeftRadius: borderRadiusPx,
        borderBottomLeftRadius: borderRadiusPx,
    },
    hovered: {
        borderColor: Color.blue,
        boxShadow: "none",
    },
    focused: {
        borderColor: Color.blue,
        boxShadow: "none",
    },
    pressed: {
        border: "2px solid #1B50B3",
        padding: 0,
        background: `linear-gradient(0deg, rgba(24, 101, 242, 0.32), rgba(24, 101, 242, 0.32)), ${Color.white}`,
        boxShadow: "none",
    },
});
