// @flow

import * as React from "react";

import {StyleSheet} from "aphrodite";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";

import IconAsset from "./icons";

const styles = StyleSheet.create({
    base: {
        display: "flex",
        width: 44,
        height: 38,
        boxSizing: "border-box",
        borderRadius: 3,
        border: `1px solid transparent`,
        marginRight: 1,
        marginLeft: 1,
    },
    hovered: {
        background: `linear-gradient(0deg, rgba(24, 101, 242, 0.32), rgba(24, 101, 242, 0.32)), ${Color.white}`,
        border: "1px solid #1865F2",
    },
    pressed: {
        background: "#1B50B3",
    },
    focused: {
        outline: "none",
        border: `2px solid ${Color.blue}`,
    },
    innerBox: {
        boxSizing: "border-box",
        border: `1px solid transparent`,
        borderRadius: 2,
        dislay: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    innerBoxPressed: {
        border: `1px solid ${Color.white}`,
    },
    activeIndicator: {
        position: "absolute",
        boxSizing: "border-box",
        bottom: 3,
        width: 36,
        height: 3,
        marginLeft: 3,
    },
});

function imageTintColor(
    itemState: ItemState,
    hovered: boolean,
    focused: boolean,
    pressed: boolean,
): string {
    if (itemState === "disabled") {
        return Color.offBlack64;
    } else if (pressed) {
        return Color.white;
    } else if (itemState === "active") {
        return Color.blue;
    } else if (hovered) {
        return Color.blue;
    }
    return Color.offBlack64;
}
export type TabbarItemType = "Geometry" | "Operators" | "Numbers";
export type ItemState = "active" | "inactive" | "disabled";
type Props = {
    onClick: () => void,
    itemState: ItemState,
    itemType: TabbarItemType,
};

type State = {};

class TabbarItem extends React.Component<Props, State> {
    render(): React.Node {
        const {onClick, itemType, itemState} = this.props;
        return (
            <Clickable onClick={onClick} disabled={itemState === "disabled"}>
                {({hovered, focused, pressed}) => {
                    const tintColor = imageTintColor(
                        itemState,
                        hovered,
                        focused,
                        pressed,
                    );

                    return (
                        <View
                            style={[
                                styles.base,
                                itemState !== "disabled" &&
                                    hovered &&
                                    styles.hovered,
                                focused && styles.focused,
                                pressed && styles.pressed,
                            ]}
                        >
                            <View
                                style={[
                                    styles.innerBox,
                                    pressed && styles.innerBoxPressed,
                                ]}
                            >
                                <IconAsset
                                    type={itemType}
                                    tintColor={tintColor}
                                />
                            </View>
                            {itemState === "active" && (
                                <View
                                    style={[
                                        styles.activeIndicator,
                                        {
                                            backgroundColor: tintColor,
                                        },
                                    ]}
                                ></View>
                            )}
                        </View>
                    );
                }}
            </Clickable>
        );
    }
}

module.exports = TabbarItem;
