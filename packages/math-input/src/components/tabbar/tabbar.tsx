import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import TabbarItem from "./item";

import type {TabbarItemType} from "./types";

const styles = StyleSheet.create({
    tabbar: {
        display: "flex",
        flexDirection: "row",
        background: Color.offWhite,
        paddingTop: 2,
        paddingBottom: 2,
        borderTop: `1px solid ${Color.offBlack50}`,
        borderBottom: `1px solid ${Color.offBlack50}`,
    },
});

type Props = {
    items: ReadonlyArray<TabbarItemType>;
    selectedItem: TabbarItemType;
    onSelectItem: (item: TabbarItemType) => void;
};

function Tabbar(props: Props): React.ReactElement {
    const {items, selectedItem, onSelectItem} = props;

    return (
        <View style={styles.tabbar}>
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
