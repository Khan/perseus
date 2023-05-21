import {mount} from "enzyme";
import * as React from "react";

import Tabbar from "../tabbar";
import {TabbarItemType} from "../types";

function StatefulTabbar() {
    const [selectedItem, setSelectedItem] =
        React.useState<TabbarItemType>("Numbers");

    return (
        <Tabbar
            items={["Numbers", "Geometry", "Operators"]}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
        />
    );
}

describe("<Tabbar />", () => {
    xit("defaults to selecting the first item", () => {
        // Arrange
        const wrapper = mount(<StatefulTabbar />);

        // Assert
        expect(wrapper).toHaveState("selectedItem", 0);
        const firstItem = wrapper.find("TabbarItem").first();
        expect(firstItem).toHaveProp("itemState", "active");
    });

    xit("selects the second item", () => {
        // Arrange
        const wrapper = mount(<StatefulTabbar />);

        // Act
        let secondItem = wrapper.find("TabbarItem").at(1);
        secondItem.simulate("click");

        // Assert
        expect(wrapper).toHaveState("selectedItem", 1);
        const firstItem = wrapper.find("TabbarItem").at(0);
        expect(firstItem).toHaveProp("itemState", "inactive");
        // NOTE: we have to re-get the second item to get it's updated state
        secondItem = wrapper.find("TabbarItem").at(1);
        expect(secondItem).toHaveProp("itemState", "active");
    });

    xit("tapping an already selected item doesn't change selection", () => {
        // Arrange
        const wrapper = mount(<StatefulTabbar />);

        // Assert
        expect(wrapper).toHaveState("selectedItem", 0);
        const firstItem = wrapper.find("TabbarItem").first();
        expect(firstItem).toHaveProp("itemState", "active");

        // Act
        firstItem.simulate("click");

        // Assert
        expect(wrapper).toHaveState("selectedItem", 0);
        expect(firstItem).toHaveProp("itemState", "active");
    });
});
