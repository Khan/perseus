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

type TabbarState = {
    selectedItem: number;
};

type Props = {
    items: ReadonlyArray<TabbarItemType>;
    onSelect: (item: TabbarItemType) => void;
};

class Tabbar extends React.Component<Props, TabbarState> {
    state: TabbarState = {
        selectedItem: 0,
    };
    render(): React.ReactNode {
        const {items, onSelect} = this.props;
        return (
            <View style={styles.tabbar}>
                {items.map((item, index) => (
                    <TabbarItem
                        key={`tabbar-item-${index}`}
                        itemState={
                            index === this.state.selectedItem
                                ? "active"
                                : "inactive"
                        }
                        itemType={item}
                        onClick={() => {
                            this.setState({selectedItem: index});
                            onSelect(item);
                        }}
                    />
                ))}
            </View>
        );
    }
}

export default Tabbar;
