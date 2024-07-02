import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import TabbarItem from "../item";

describe("<TabbarItem />", () => {
    let userEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders tab item", async () => {
        // Arrange
        render(
            <TabbarItem
                itemType="Numbers"
                itemState="active"
                role="tab"
                onClick={() => {}}
            />,
        );

        // Assert
        expect(screen.getByRole("tab", {name: "Numbers"})).toBeInTheDocument();
        expect(screen.getByRole("tab", {name: "Numbers"})).not.toHaveFocus();
    });

    it("renders tab item with role button", async () => {
        // Arrange
        render(
            <TabbarItem
                itemType="Numbers"
                itemState="active"
                role="button"
                onClick={() => {}}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Numbers"}),
        ).toBeInTheDocument();
    });

    it("can set focus when focus is enabled", async () => {
        // Arrange
        render(
            <TabbarItem
                itemType="Numbers"
                itemState="active"
                focus={true}
                role="tab"
                onClick={() => {}}
            />,
        );

        // Assert
        expect(screen.getByRole("tab", {name: "Numbers"})).toHaveFocus();
    });

    it("handles onClick callback", async () => {
        // Arrange
        const mockClick = jest.fn();
        render(
            <TabbarItem
                itemType="Numbers"
                itemState="active"
                role="tab"
                onClick={mockClick}
            />,
        );

        // Assert
        await userEvent.click(screen.getByRole("tab", {name: "Numbers"}));
        expect(mockClick).toHaveBeenCalled();
    });
});
