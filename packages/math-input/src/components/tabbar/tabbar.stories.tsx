import {action} from "@storybook/addon-actions";
import {withKnobs, select, array} from "@storybook/addon-knobs";
import * as React from "react";

import {TabbarItemForTesting as TabbarItem} from "./item";
import Tabbar from "./tabbar";

import type {KeypadPageType} from "../../types";

export default {
    title: "math-input/components/Tab Bar",
    decorators: [withKnobs],
};

export const InactiveBarItem = () => (
    <TabbarItem
        itemState="inactive"
        itemType={select(
            "Item Type",
            {
                Numbers: "Numbers",
                Geometry: "Geometry",
                Operators: "Operators",
            },
            "Numbers",
        )}
        onClick={action("onClick")}
    />
);
export const ActiveBarItem = () => (
    <TabbarItem
        itemType={select(
            "Item Type",
            {
                Numbers: "Numbers",
                Geometry: "Geometry",
                Operators: "Operators",
            },
            "Numbers",
        )}
        itemState="active"
        onClick={action("onClick")}
    />
);
export const DisabledBarItem = () => (
    <TabbarItem
        itemType={select(
            "Item Type",
            {
                Numbers: "Numbers",
                Geometry: "Geometry",
                Operators: "Operators",
            },
            "Numbers",
        )}
        itemState="disabled"
        onClick={action("onClick")}
    />
);

function StatefulTabbarWrapper() {
    const [selectedItem, setSelectedItem] =
        React.useState<KeypadPageType>("Numbers");

    return (
        <Tabbar
            items={
                array("items", [
                    "Numbers",
                    "Geometry",
                    "Operators",
                ]) as ReadonlyArray<KeypadPageType>
            }
            selectedItem={selectedItem}
            onSelectItem={(selection) => {
                setSelectedItem(selection);
                action("selected-item");
            }}
        />
    );
}

export const FullTabbar = () => <StatefulTabbarWrapper />;
