import React from "react";
import {action} from "@storybook/addon-actions";
import {withKnobs, select, array} from "@storybook/addon-knobs";

import {TabbarItem} from "../src/components/tabbar/item";
import Tabbar from "../src/components/tabbar/tabbar";

export default {title: "Tab Bar", decorators: [withKnobs]};

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
    />
);

export const FullTabbar = () => (
    <Tabbar
        items={array("items", ["Numbers", "Geometry", "Operators"])}
        onSelect={action("selected-item")}
    />
);
