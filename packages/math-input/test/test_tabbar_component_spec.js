import React from "react";
import assert from "assert";
import {mount} from "enzyme";

import Tabbar from "../src/components/tabbar/tabbar";

describe("<Tabbar />", () => {
    it("defaults to selecting the first item", () => {
        // Arrange
        const wrapper = mount(
            <Tabbar
                items={["Numbers", "Geometry", "Operators"]}
                onSelect={() => {}}
            />,
        );

        // Assert
        expect(wrapper).toHaveState("selectedItem", 0);
        const firstItem = wrapper.find("TabbarItem").first();
        expect(firstItem).toHaveProp("itemState", "active");
    });

    it("selects the second item", () => {
        // Arrange
        const wrapper = mount(
            <Tabbar
                items={["Numbers", "Geometry", "Operators"]}
                onSelect={() => {}}
            />,
        );

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

    it("tapping an already selected item doesn't change selection", () => {
        // Arrange
        const wrapper = mount(
            <Tabbar
                items={["Numbers", "Geometry", "Operators"]}
                onSelect={() => {}}
            />,
        );

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
