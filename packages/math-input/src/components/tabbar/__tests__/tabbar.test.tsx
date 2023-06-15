import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import "@testing-library/jest-dom";

import Tabbar from "../tabbar";

describe("<Tabbar />", () => {
    it("renders one tab", () => {
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

    it("renders many tabs", () => {
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

    it("handles callback", () => {
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
        userEvent.click(screen.getByRole("tab", {name: "Geometry"}));
        expect(mockSelectCallback).toHaveBeenCalledWith("Geometry");
    });
});
