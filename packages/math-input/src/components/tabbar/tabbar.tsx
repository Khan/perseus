import {View, StyleType} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import TabbarItem from "./item";
import {TabbarItemType} from "./types";

const styles = StyleSheet.create({
    tabbar: {
        display: "flex",
        flexDirection: "row",
        paddingTop: 2,
        paddingBottom: 2,
    },
});

type Props = {
    items: ReadonlyArray<TabbarItemType>;
    selectedItem: TabbarItemType;
    onSelectItem: (item: TabbarItemType) => void;
    style?: StyleType;
};

function Tabbar(props: Props): React.ReactElement {
    const {items, selectedItem, onSelectItem, style} = props;

    return (
        <View style={[styles.tabbar, style]} role="tablist">
            {items.map((item) => (
                <TabbarItem
                    key={`tabbar-item-${item}`}
                    itemState={item === selectedItem ? "active" : "inactive"}
                    itemType={item}
                    onClick={() => {
                        onSelectItem(item);
                    }}
                />
            ))}
        </View>
    );
}

export default Tabbar;
