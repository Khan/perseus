import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useState} from "react";

import TabbarItem from "./item";

import type {KeypadPageType} from "../../types";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const styles = StyleSheet.create({
    tabbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 2,
        paddingBottom: 2,
        direction: "ltr",
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
    const selectedIndex = items.indexOf(selectedItem);

    const [focus, setFocus] = useState(
        selectedIndex === -1 ? 0 : selectedIndex,
    );
    /**
     * Custom function to handle arrow key navigation for the TabBar for each TabItem.
     * This implementation also circular in that if the user goes past the end of
     * the list they will go back to the beginning and vise versa.
     * This is the recommended pattern per WCAG implementation:
     * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-manual/
     * @param e - onKeyDown event data.
     */
    const onArrowKeyFocus = (e) => {
        if (e.keyCode === 39) {
            // Right arrow
            setFocus(focus === items.length - 1 ? 0 : focus + 1);
        } else if (e.keyCode === 37) {
            // Left arrow
            setFocus(focus === 0 ? items.length - 1 : focus - 1);
        }
    };

    return (
        <View style={[styles.tabbar, style]}>
            {items.length > 0 && (
                <View
                    style={[styles.pages]}
                    role="tablist"
                    onKeyDown={onArrowKeyFocus}
                >
                    {items.map((item, index) => (
                        <TabbarItem
                            role="tab"
                            key={`tabbar-item-${item}`}
                            itemState={
                                item === selectedItem ? "active" : "inactive"
                            }
                            itemType={item}
                            focus={focus === index}
                            onClick={() => {
                                onSelectItem(item);
                            }}
                        />
                    ))}
                </View>
            )}

            <View>
                {onClickClose && (
                    <TabbarItem
                        role="button"
                        itemState="inactive"
                        itemType="Dismiss"
                        onClick={onClickClose}
                    />
                )}
            </View>
        </View>
    );
}

export default Tabbar;
