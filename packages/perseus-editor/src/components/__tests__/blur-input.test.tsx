import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import BlurInput from "../blur-input";

describe("BlurInput", () => {
    it("should render", () => {
        render(<BlurInput value="Hello world!" onChange={() => {}} />);
    });

    it("should call onChange prop on blur", () => {
        // Arrange
        const onChange = jest.fn();
        render(<BlurInput value="Hello world!" onChange={onChange} />);

        // Act
        userEvent.type(screen.getByRole("textbox"), "Hello Khan Academy!");
        userEvent.tab();

        // Assert
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("should call onChange prop when typing into input", () => {
        // Arrange
        const onChange = jest.fn();
        render(<BlurInput value="Hello world!" onChange={onChange} />);

        // Act
        userEvent.type(screen.getByRole("textbox"), "Hello Khan Academy!");
        // NO TAB

        // Assert
        expect(onChange).not.toHaveBeenCalledTimes(1);
    });

    it("should call onChange prop when pasting into input", () => {
        // Arrange
        const onChange = jest.fn();
        render(<BlurInput value="Hello world!" onChange={onChange} />);

        // Act
        userEvent.paste(screen.getByRole("textbox"), "Hello Khan Academy!");
        // NO TAB

        // Assert
        expect(onChange).not.toHaveBeenCalledTimes(1);
    });
});
