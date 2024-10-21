import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useEffect, useRef} from "react";

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
type TabItemProps = {
    onClick: () => void;
    itemState: ItemState;
    itemType: KeypadPageType;
    focus?: boolean;
    role: "tab" | "button";
};

function TabbarItem(props: TabItemProps): React.ReactElement {
    const {onClick, itemType, itemState, focus, role} = props;
    const tabRef = useRef<{focus: () => void}>(null);

    useEffect(() => {
        let timeout;
        if (role === "tab" && focus) {
            /**
             * When tabs are within a WonderBlocks Popover component, the
             * manner in which the component is rendered and moved causes
             * focus to snap to the bottom of the page on first focus.
             *
             * This timeout moves around that by delaying the focus enough
             * to wait for the WonderBlock Popover to move to the correct
             * location and scroll the user to the correct location.
             * */
            timeout = setTimeout(() => {
                if (tabRef?.current) {
                    // Move element into view when it is focused
                    tabRef?.current.focus();
                }
            }, 0);
        }

        return () => clearTimeout(timeout);
    }, [role, focus, tabRef]);

    return (
        <Clickable
            onClick={onClick}
            disabled={itemState === "disabled"}
            aria-label={itemType}
            style={styles.clickable}
            aria-selected={itemState === "active"}
            tabIndex={role === "button" ? 0 : focus ? 0 : -1}
            role={role}
            ref={tabRef}
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
                            <IconAsset type={itemType} tintColor={tintColor} />
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

export default TabbarItem;
