import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import * as React from "react";

import ButtonGroup from "./button-group";

const buttons = [
    {value: "linear", content: "Linear"},
    {value: "quadratic", content: "Quadratic"},
];

describe("ButtonGroup", () => {
    it("calls onChange with the clicked button's value", async () => {
        // Arrange
        const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        const onChange = jest.fn();
        render(
            <ButtonGroup
                value="linear"
                buttons={buttons}
                onChange={onChange}
            />,
        );

        // Act
        await user.click(screen.getByRole("button", {name: "Quadratic"}));

        // Assert
        expect(onChange).toHaveBeenCalledWith("quadratic");
    });

    it("does not call onChange when the selected button is clicked", async () => {
        // Arrange
        const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        const onChange = jest.fn();
        render(
            <ButtonGroup
                value="linear"
                buttons={buttons}
                onChange={onChange}
            />,
        );

        // Act
        await user.click(screen.getByRole("button", {name: "Linear"}));

        // Assert
        expect(onChange).not.toHaveBeenCalled();
    });
});
