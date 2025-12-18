import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ButtonAsset from "./button-assets";

import type {KeyConfig, ClickKeyCallback} from "../../types";
import type {KeypadKey} from "@khanacademy/perseus-core";

type KeypadButtonProps = {
    id: string;
    // 0 indexed [x, y] position in keypad CSS grid
    coord: readonly [number, number];
    keyConfig: KeyConfig;
    onClickKey: ClickKeyCallback;
    onKeyDown: (e: React.KeyboardEvent<Element>) => void;
};

function getStyles(key: KeypadKey) {
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
    id,
    coord,
    keyConfig,
    onClickKey,
    onKeyDown,
}: KeypadButtonProps) {
    const key = keyConfig.id;
    const directionalStyles = getStyles(key);

    return (
        <View
            style={{
                gridColumn: coord[0] + 1,
                gridRow: coord[1] + 1,
            }}
        >
            <Clickable
                id={id}
                onClick={(e) => onClickKey(keyConfig.id, e)}
                onKeyDown={onKeyDown}
                style={styles.clickable}
                aria-label={keyConfig.ariaLabel}
            >
                {({hovered, focused, pressed}) => (
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
                )}
            </Clickable>
        </View>
    );
}

const borderRadiusPx = 4;

const styles = StyleSheet.create({
    clickable: {
        width: "100%",
        height: "100%",

        ":focus": {
            outline: `none`,
        },
    },
    outerBoxBase: {
        height: "100%",
        width: "100%",
    },
    base: {
        boxShadow: `0px 1px 0px ${color.offBlack32}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: color.white,
        borderWidth: 2,
        borderColor: color.white,
    },
    up: {
        borderTopLeftRadius: borderRadiusPx,
        borderTopRightRadius: borderRadiusPx,
    },
    right: {
        borderTopRightRadius: borderRadiusPx,
        borderBottomRightRadius: borderRadiusPx,
    },
    down: {
        borderBottomLeftRadius: borderRadiusPx,
        borderBottomRightRadius: borderRadiusPx,
    },
    left: {
        borderTopLeftRadius: borderRadiusPx,
        borderBottomLeftRadius: borderRadiusPx,
    },
    hovered: {
        borderColor: color.blue,
        boxShadow: "none",
    },
    focused: {
        borderColor: color.blue,
        boxShadow: "none",
    },
    pressed: {
        border: "2px solid #1B50B3",
        background: `linear-gradient(0deg, rgba(24, 101, 242, 0.32), rgba(24, 101, 242, 0.32)), ${color.white}`,
        boxShadow: "none",
    },
});
