import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import IconAsset from "./icons";

import type {KeypadPageType} from "../../types";

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
        background: `linear-gradient(0deg, rgba(24, 101, 242, 0.32), rgba(24, 101, 242, 0.32)), ${color.white}`,
        border: "1px solid #1865F2",
    },
    pressed: {
        background: "#1B50B3",
    },
    focused: {
        outline: "none",
        border: `2px solid ${color.blue}`,
    },
    innerBox: {
        boxSizing: "border-box",
        border: `1px solid transparent`,
        borderRadius: 2,
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    innerBoxPressed: {
        border: `1px solid ${color.white}`,
    },
    activeIndicator: {
        position: "absolute",
        boxSizing: "border-box",
        bottom: 3,
        width: 36,
        height: 3,
        marginLeft: 3,
    },
    clickable: {
        ":focus": {
            outline: `none`,
        },
    },
});

function imageTintColor(
    itemState: ItemState,
    hovered: boolean,
    focused: boolean,
    pressed: boolean,
): string {
    if (itemState === "disabled") {
        return color.offBlack64;
    } else if (pressed) {
        return color.white;
    } else if (itemState === "active") {
        return color.blue;
    } else if (hovered) {
        return color.blue;
    }
    return color.offBlack64;
}
export type ItemState = "active" | "inactive" | "disabled";
type Props = {
    onClick: () => void;
    itemState: ItemState;
    itemType: KeypadPageType;
};

class TabbarItem extends React.Component<Props> {
    render(): React.ReactNode {
        const {onClick, itemType, itemState} = this.props;
        return (
            <Clickable
                onClick={onClick}
                disabled={itemState === "disabled"}
                aria-label={itemType}
                style={styles.clickable}
                aria-selected={itemState === "active"}
                role="tab"
            >
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
                                />
                            )}
                        </View>
                    );
                }}
            </Clickable>
        );
    }
}

export const TabbarItemForTesting = TabbarItem;

export default TabbarItem;
