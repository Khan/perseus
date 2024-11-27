import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import ScrolllessNumberTextField from "../scrollless-number-text-field";

import type {UserEvent} from "@testing-library/user-event";

describe("ScrolllessNumberTextField", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    test("Should render a number input", () => {
        // Arrange
        const onChange = jest.fn();

        // Act
        render(<ScrolllessNumberTextField value="42" onChange={onChange} />);

        const input = screen.getByRole("spinbutton");

        // Assert
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(42);
    });

    test("Should call the onChange callback when the value changes", async () => {
        // Arrange
        const onChange = jest.fn();
        render(<ScrolllessNumberTextField value="" onChange={onChange} />);
        const input = screen.getByRole("spinbutton");

        // Act
        await userEvent.type(input, "2");

        // Assert
        expect(onChange).toHaveBeenLastCalledWith("2");
    });

    test("Should not call the onChange callback when the value is not a number", async () => {
        // Arrange
        const onChange = jest.fn();
        render(<ScrolllessNumberTextField value="42" onChange={onChange} />);
        const input = screen.getByRole("spinbutton");

        // Act
        await userEvent.type(input, "a");

        // Assert
        expect(onChange).not.toHaveBeenCalled();
    });

    test("calls onFocus on focus", async () => {
        // Arrange
        const onFocus = jest.fn();
        render(
            <ScrolllessNumberTextField
                value="42"
                onChange={() => {}}
                onFocus={onFocus}
            />,
        );

        // Act
        // Tab to focus on input
        await userEvent.tab();

        // Assert
        expect(onFocus).toHaveBeenCalled();
    });

    test("calls onBlur on blur", async () => {
        // Arrange
        const onBlur = jest.fn();
        render(
            <ScrolllessNumberTextField
                value="42"
                onChange={() => {}}
                onBlur={onBlur}
            />,
        );

        // Tab to focus on input
        await userEvent.tab();

        // Act
        // Tab to move focus away
        await userEvent.tab();

        // Assert
        expect(onBlur).toHaveBeenCalled();
    });
});
