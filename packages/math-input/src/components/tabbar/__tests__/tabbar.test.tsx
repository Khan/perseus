import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import Tabbar from "../tabbar";

describe("<Tabbar />", () => {
    let userEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders one tab", async () => {
        // Arrange
        render(
            <Tabbar
                items={["Numbers"]}
                selectedItem={"Numbers"}
                onSelectItem={() => {}}
            />,
        );

        // Assert
        expect(screen.getByRole("tab", {name: "Numbers"})).toBeInTheDocument();
    });

    it("renders many tabs", async () => {
        // Arrange
        render(
            <Tabbar
                items={["Numbers", "Extras", "Geometry", "Operators"]}
                selectedItem={"Numbers"}
                onSelectItem={() => {}}
            />,
        );

        // Assert
        expect(screen.getByRole("tab", {name: "Numbers"})).toBeInTheDocument();
        expect(screen.getByRole("tab", {name: "Extras"})).toBeInTheDocument();
        expect(screen.getByRole("tab", {name: "Geometry"})).toBeInTheDocument();
        expect(
            screen.getByRole("tab", {name: "Operators"}),
        ).toBeInTheDocument();
    });

    it("handles callback", async () => {
        // Arrange
        const mockSelectCallback = jest.fn();
        render(
            <Tabbar
                items={["Numbers", "Geometry"]}
                selectedItem={"Numbers"}
                onSelectItem={mockSelectCallback}
            />,
        );

        // Assert
        await userEvent.click(
            await screen.findByRole("tab", {name: "Geometry"}),
        );
        expect(mockSelectCallback).toHaveBeenCalledWith("Geometry");
    });

    it("shows dismiss button with a onClickClose callback", async () => {
        // Arrange
        render(
            <Tabbar
                items={["Numbers"]}
                selectedItem={"Numbers"}
                onSelectItem={() => {}}
                onClickClose={() => {}}
            />,
        );

        // Assert
        expect(screen.getByRole("tab", {name: "Dismiss"})).toBeInTheDocument();
    });

    it("does not show dismiss button without onClickClose callback", async () => {
        // Arrange
        render(
            <Tabbar
                items={["Numbers"]}
                selectedItem={"Numbers"}
                onSelectItem={() => {}}
            />,
        );

        // Assert
        expect(
            screen.queryByRole("tab", {name: "Dismiss"}),
        ).not.toBeInTheDocument();
    });

    it("handles onClickClose callback", async () => {
        // Arrange
        const mockClickCloseCallback = jest.fn();
        render(
            <Tabbar
                items={["Numbers", "Geometry"]}
                selectedItem={"Numbers"}
                onSelectItem={() => {}}
                onClickClose={mockClickCloseCallback}
            />,
        );

        // Assert
        await userEvent.click(
            await screen.findByRole("tab", {name: "Dismiss"}),
        );
        expect(mockClickCloseCallback).toHaveBeenCalled();
    });
});
