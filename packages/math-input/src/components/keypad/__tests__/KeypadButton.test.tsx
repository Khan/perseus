import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import "@testing-library/jest-dom";

import Keys from "../../../data/key-configs";
import {KeypadButton} from "../keypad-page-items";

describe("<KeypadButton />", () => {
    it("uses the aria label from the key config", () => {
        // Arrange
        render(
            <KeypadButton
                onClickKey={(config) => {}}
                keyConfig={Keys.LEFT_PAREN}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "LEFT_PAREN"}),
        ).toBeInTheDocument();
    });

    it("handles onClickKey callback", () => {
        // Arrange
        const mockClickKeyCallback = jest.fn();
        render(
            <KeypadButton
                onClickKey={mockClickKeyCallback}
                keyConfig={Keys.LEFT_PAREN}
            />,
        );

        // Act
        userEvent.click(screen.getByRole("button", {name: "LEFT_PAREN"}));

        // Assert
        expect(mockClickKeyCallback).toHaveBeenCalled();
    });
});
