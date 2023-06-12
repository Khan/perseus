import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import "@testing-library/jest-dom";

import Keys from "../../../data/key-configs";
import {KeypadButton} from "../keypad-button";

describe("<KeypadButton />", () => {
    it("uses the aria label from the key config", () => {
        // Arrange
        render(
            <KeypadButton
                onClickKey={() => {}}
                keyConfig={Keys.LEFT_PAREN}
                coord={[0, 0]}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Left parenthesis"}),
        ).toBeInTheDocument();
    });

    it("handles onClickKey callback", () => {
        // Arrange
        const mockClickKeyCallback = jest.fn();
        render(
            <KeypadButton
                onClickKey={mockClickKeyCallback}
                keyConfig={Keys.LEFT_PAREN}
                coord={[0, 0]}
            />,
        );

        // Act
        userEvent.click(screen.getByRole("button", {name: "Left parenthesis"}));

        // Assert
        expect(mockClickKeyCallback).toHaveBeenCalledWith("LEFT_PAREN");
    });
});
