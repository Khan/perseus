import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import TextListEditor from "./text-list-editor";

import type {UserEvent} from "@testing-library/user-event";

function getInputs(): HTMLInputElement[] {
    return screen.getAllByRole<HTMLInputElement>("textbox");
}

function getValues(): string[] {
    return getInputs().map((input) => input.value);
}

describe("TextListEditor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders an input per option, followed by an empty input", () => {
        // Arrange, Act
        render(
            <TextListEditor
                options={["apple", "banana"]}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(getValues()).toEqual(["apple", "banana", ""]);
    });

    it("renders a single empty input when there are no options", () => {
        // Arrange, Act
        render(<TextListEditor onChange={() => {}} />);

        // Assert
        expect(getValues()).toEqual([""]);
    });

    it("applies the layout class for the requested layout", () => {
        // Arrange, Act
        render(
            <TextListEditor
                options={["apple"]}
                layout="vertical"
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByRole("list")).toHaveClass("layout-vertical");
    });

    it("adds a new empty input when the trailing input is typed into", async () => {
        // Arrange
        render(
            <TextListEditor
                options={["apple", "banana"]}
                onChange={() => {}}
            />,
        );

        // Act
        await userEvent.type(getInputs()[2], "cherry");

        // Assert
        expect(getValues()).toEqual(["apple", "banana", "cherry", ""]);
    });

    it("calls onChange with the non-empty values when an option is edited", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <TextListEditor
                options={["apple", "banana"]}
                onChange={onChange}
            />,
        );

        // Act
        await userEvent.type(getInputs()[2], "c");

        // Assert
        expect(onChange).toHaveBeenLastCalledWith(["apple", "banana", "c"]);
    });

    it("keeps the trailing empty input when backspacing in it, and focuses the previous input", async () => {
        // Arrange
        render(
            <TextListEditor
                options={["apple", "banana"]}
                onChange={() => {}}
            />,
        );

        // Act
        await userEvent.type(getInputs()[2], "{Backspace}");

        // Assert
        expect(getValues()).toEqual(["apple", "banana", ""]);
        expect(getInputs()[1]).toHaveFocus();
    });

    it("keeps the only input when backspacing in it", async () => {
        // Arrange
        render(<TextListEditor onChange={() => {}} />);

        // Act
        await userEvent.type(getInputs()[0], "{Backspace}");

        // Assert
        expect(getValues()).toEqual([""]);
        expect(getInputs()[0]).toHaveFocus();
    });

    it("removes an empty input when backspacing in it, and focuses the previous input", async () => {
        // Arrange
        render(
            <TextListEditor
                options={["apple", "", "banana"]}
                onChange={() => {}}
            />,
        );

        // Act
        await userEvent.type(getInputs()[1], "{Backspace}");

        // Assert
        expect(getValues()).toEqual(["apple", "banana", ""]);
        expect(getInputs()[0]).toHaveFocus();
    });

    it("removes the option when backspacing away the last character of the second-to-last input", async () => {
        // Arrange
        const onChange = jest.fn();
        render(<TextListEditor options={["apple", "b"]} onChange={onChange} />);

        // Act
        await userEvent.type(getInputs()[1], "{Backspace}");

        // Assert
        expect(getValues()).toEqual(["apple", ""]);
        expect(onChange).toHaveBeenLastCalledWith(["apple"]);
    });

    it("inserts an empty input below the current one when Enter is pressed", async () => {
        // Arrange
        render(
            <TextListEditor
                options={["apple", "banana"]}
                onChange={() => {}}
            />,
        );

        // Act
        await userEvent.type(getInputs()[0], "{Enter}");

        // Assert
        expect(getValues()).toEqual(["apple", "", "banana", ""]);
        expect(getInputs()[1]).toHaveFocus();
    });

    it("focuses the trailing empty input instead of inserting one when Enter is pressed just above it", async () => {
        // Arrange
        render(
            <TextListEditor
                options={["apple", "banana"]}
                onChange={() => {}}
            />,
        );

        // Act
        await userEvent.type(getInputs()[1], "{Enter}");

        // Assert
        expect(getValues()).toEqual(["apple", "banana", ""]);
        expect(getInputs()[2]).toHaveFocus();
    });

    it("leaves the inputs untouched for keys other than Backspace and Enter", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <TextListEditor
                options={["apple", "banana"]}
                onChange={onChange}
            />,
        );

        // Act
        await userEvent.type(getInputs()[0], "{Escape}");

        // Assert
        expect(getValues()).toEqual(["apple", "banana", ""]);
        expect(onChange).not.toHaveBeenCalled();
    });

    it("re-syncs the inputs when the options prop changes", () => {
        // Arrange
        const {rerender} = render(
            <TextListEditor options={["apple"]} onChange={() => {}} />,
        );

        // Act
        rerender(
            <TextListEditor
                options={["apple", "banana"]}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(getValues()).toEqual(["apple", "banana", ""]);
    });
});
