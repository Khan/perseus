import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import BlurInput from "../blur-input";

import type {UserEvent} from "@testing-library/user-event";

describe("BlurInput", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("should render", () => {
        render(<BlurInput value="Hello world!" onChange={() => {}} />);
    });

    it("should call onChange prop on blur", async () => {
        // Arrange
        const onChange = jest.fn();
        render(<BlurInput value="Hello world!" onChange={onChange} />);

        // Act
        await userEvent.type(
            screen.getByRole("textbox"),
            "Hello Khan Academy!",
        );
        await userEvent.tab();

        // Assert
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("should call onChange prop when typing into input", async () => {
        // Arrange
        const onChange = jest.fn();
        render(<BlurInput value="Hello world!" onChange={onChange} />);

        // Act
        await userEvent.type(
            screen.getByRole("textbox"),
            "Hello Khan Academy!",
        );
        // NO TAB

        // Assert
        expect(onChange).not.toHaveBeenCalledTimes(1);
    });

    it("should call onChange prop when pasting into input", async () => {
        // Arrange
        const onChange = jest.fn();
        render(<BlurInput value="Hello world!" onChange={onChange} />);

        // Act
        await userEvent.type(
            screen.getByRole("textbox"),
            "Hello Khan Academy!",
        );
        // NO TAB

        // Assert
        expect(onChange).not.toHaveBeenCalledTimes(1);
    });

    it("should focus input through focus function", async () => {
        const ref = React.createRef<BlurInput>();

        // Arrange
        render(
            <BlurInput ref={ref} value="Hello world!" onChange={() => {}} />,
        );

        // Act
        ref.current?.focus();

        // Assert
        expect(screen.getByRole("textbox")).toHaveFocus();
    });
});
