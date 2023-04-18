import {mount} from "enzyme";
import * as React from "react";

import TwoPageKeypad from "../two-page-keypad";

describe("<TwoPageKeyPage />", () => {
    xit("defaults to selecting the right page", () => {
        // Arrange
        const wrapper = mount(
            <TwoPageKeypad
                currentPage={1}
                leftPage={<p>Left Page</p>}
                rightPage={<p>Right Page</p>}
                paginationEnabled={true}
                active={true}
                echoes={[]}
                popover={null}
                heightPx={40}
                widthPx={40}
            />,
        );

        // Assert
        const secondItem = wrapper.find("TabbarItem").at(0);
        expect(secondItem).toHaveProp("itemState", "active");
    });

    xit("selects the second item", () => {
        // Arrange
        const wrapper = mount(
            <TwoPageKeypad
                currentPage={0}
                leftPage={<p>Left Page</p>}
                rightPage={<p>Right Page</p>}
                paginationEnabled={true}
                active={true}
                echoes={[]}
                popover={null}
                heightPx={40}
                widthPx={40}
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
