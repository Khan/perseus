import {View, StyleType} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import TabbarItem from "./item";
import {TabbarItemType} from "./types";

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
    items: ReadonlyArray<TabbarItemType>;
    selectedItem: TabbarItemType;
    onClickClose?: () => void;
    onSelectItem: (item: TabbarItemType) => void;
    style?: StyleType;
};

function Tabbar(props: Props): React.ReactElement {
    const {items, onClickClose, selectedItem, onSelectItem, style} = props;

    return (
        <View style={[styles.tabbar, style]} role="tablist">
            <View style={[styles.pages]}>
                {items.map((item) => (
                    <TabbarItem
                        key={`tabbar-item-${item}`}
                        itemState={
                            item === selectedItem ? "active" : "inactive"
                        }
                        itemType={item}
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

export default Tabbar;
