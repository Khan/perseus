import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import TabbarItem from './item';

import type {TabbarItemType} from './types';

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
    selectedItem: number
};

type TabbarProps = {
    items: Array<TabbarItemType>,
    onSelect: (item: TabbarItemType) => void
};

class Tabbar extends React.Component<TabbarProps, TabbarState> {
    state: TabbarState = {
        selectedItem: 0,
    };
    render(): React.ReactElement {
        const {items, onSelect} = this.props;
        return (
// @ts-expect-error [FEI-5003] - TS2786 - 'View' cannot be used as a JSX component.
            <View style={styles.tabbar}>
                {items.map((item, index) => (
// @ts-expect-error [FEI-5003] - TS2786 - 'TabbarItem' cannot be used as a JSX component.
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
