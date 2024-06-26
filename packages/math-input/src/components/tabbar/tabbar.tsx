import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

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

    return (
        <View style={[styles.tabbar, style]}>
            <View style={[styles.pages]} role="tablist">
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
