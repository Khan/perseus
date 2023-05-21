import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import Tabbar from "../tabbar";

describe("<Tabbar />", () => {
    it("renders the numbers page", () => {
        // Arrange
        render(
            <Tabbar
                items={["Numbers"]}
                selectedItem={"Numbers"}
                onSelectItem={() => {}}
            />,
        );

        // Assert
        expect(screen.getByRole("button", {name: "Numbers"}));
    });

    it("renders all tabs", () => {
        // Arrange
        render(
            <Tabbar
                items={["Numbers", "Extras", "Geometry", "Operators"]}
                selectedItem={"Numbers"}
                onSelectItem={() => {}}
            />,
        );

        // Assert
        expect(screen.getByRole("button", {name: "Numbers"}));
        expect(screen.getByRole("button", {name: "Extras"}));
        expect(screen.getByRole("button", {name: "Geometry"}));
        expect(screen.getByRole("button", {name: "Operators"}));
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
        userEvent.click(screen.getByRole("button", {name: "Geometry"}));
        expect(mockSelectCallback).toHaveBeenCalledWith("Geometry");
    });
});
