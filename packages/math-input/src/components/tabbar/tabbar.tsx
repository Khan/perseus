import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import TabbarItem, {ArrowKeyTabbarItem} from "./item";

import type {KeypadPageType} from "../../types";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {useCallback, useEffect, useState} from "react";

const styles = StyleSheet.create({
    tabbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 2,
        paddingBottom: 2,
    },
    pages: {
        display: "flex",
        flexDirection: "row",
    },
});

type Props = {
    items: ReadonlyArray<KeypadPageType>;
    selectedItem: KeypadPageType;
    onClickClose?: () => void;
    onSelectItem: (item: KeypadPageType) => void;
    style?: StyleType;
};

function Tabbar(props: Props): React.ReactElement {
    const {items, onClickClose, selectedItem, onSelectItem, style} = props;
    const [focus, setFocus] = useArrowKeyFocus(items.length);

    return (
        <View style={[styles.tabbar, style]} role="tablist">
            <View style={[styles.pages]}>
                {items.map((item, index) => (
                    <ArrowKeyTabbarItem
                        key={`tabbar-item-${item}`}
                        itemState={
                            item === selectedItem ? "active" : "inactive"
                        }
                        itemType={item}
                        index={index}
                        focus={focus === index}
                        setFocus={
                            setFocus as React.Dispatch<
                                React.SetStateAction<number>
                            >
                        }
                        onClick={() => {
                            onSelectItem(item);
                        }}
                    />
                ))}
            </View>

            <View>
                {onClickClose && (
                    <TabbarItem
                        itemState="inactive"
                        itemType="Dismiss"
                        onClick={onClickClose}
                    />
                )}
            </View>
        </View>
    );
}

// Custom focus hook to handle arrow key navigation for the TabBar for each ArrowKeyTabItem.
function useArrowKeyFocus(size) {
    const [currentFocus, setCurrentFocus] = useState(0);

    const handleKeyDown = useCallback(
        (e) => {
            if (e.keyCode === 39) {
                // Right arrow
                e.preventDefault();
                setCurrentFocus(
                    currentFocus === size - 1 ? size - 1 : currentFocus + 1,
                );
            } else if (e.keyCode === 37) {
                // Left arrow
                e.preventDefault();
                setCurrentFocus(currentFocus === 0 ? 0 : currentFocus - 1);
            }
        },
        [size, currentFocus, setCurrentFocus],
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    }, [handleKeyDown]);

    return [currentFocus, setCurrentFocus];
}

export default Tabbar;
