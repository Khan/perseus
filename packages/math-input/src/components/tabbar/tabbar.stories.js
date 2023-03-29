import {action} from "@storybook/addon-actions";
import {withKnobs, select, array} from "@storybook/addon-knobs";
import * as React from "react";

import {TabbarItemForTesting as TabbarItem} from "./item";
import Tabbar from "./tabbar";

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
