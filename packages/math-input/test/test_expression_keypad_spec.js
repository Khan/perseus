import React from "react";
import assert from "assert";
import {mount} from "enzyme";

import {TwoPageKeypad} from "../src/components/two-page-keypad";

describe("<TwoPageKeyPage />", () => {
    xit("defaults to selecting the right page", () => {
        // Arrange
        const wrapper = mount(
            <TwoPageKeypad
                paginationEnabled={true}
                currentPage={1}
                leftPage={<p>Left Page</p>}
                rightPage={<p>Right Page</p>}
            />,
        );

        // Assert
        secondItem = wrapper.find("TabbarItem").at(0);
        expect(secondItem).toHaveProp("itemState", "active");
    });

    xit("selects the second item", () => {
        // Arrange
        const wrapper = mount(
            <TwoPageKeypad
                paginationEnabled={true}
                currentPage={0}
                leftPage={<p>Left Page</p>}
                rightPage={<p>Right Page</p>}
            />,
        );

        // Act
        let secondItem = wrapper.find("TabbarItem").at(1);
        secondItem.simulate("click");

        // Assert
        secondItem = wrapper.find("TabbarItem").at(1);
        expect(secondItem).toHaveProp("itemState", "active");
    });
});
