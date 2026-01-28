import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import JsonEditor from "./json-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("JsonEditor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("should render with initial value", () => {
        // Arrange
        const initialValue = {
            content: "Test content",
            widgets: {},
        };

        // Act
        render(
            <JsonEditor
                multiLine={true}
                value={initialValue}
                onChange={() => {}}
                editingDisabled={false}
            />,
        );

        // Assert
        expect(screen.getByDisplayValue(/Test content/)).toBeInTheDocument();
    });

    it("should update when value prop changes", () => {
        // Arrange
        const initialValue = {
            content: "Initial content",
            widgets: {},
        };

        const updatedValue = {
            content: "Updated content",
            widgets: {},
        };

        const {rerender} = render(
            <JsonEditor
                multiLine={true}
                value={initialValue}
                onChange={() => {}}
                editingDisabled={false}
            />,
        );

        // Act
        rerender(
            <JsonEditor
                multiLine={true}
                value={updatedValue}
                onChange={() => {}}
                editingDisabled={false}
            />,
        );

        // Assert
        expect(screen.queryByDisplayValue(/Initial content/)).not.toBeInTheDocument();
        expect(screen.getByDisplayValue(/Updated content/)).toBeInTheDocument();
    });

    it("should call onChange when valid JSON is entered", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        const initialValue = {content: "test"};

        render(
            <JsonEditor
                multiLine={true}
                value={initialValue}
                onChange={onChangeMock}
                editingDisabled={false}
            />,
        );

        const textarea = screen.getByRole("textbox");

        // Act
        await userEvent.clear(textarea);
        textarea.focus();
        await userEvent.paste('{"content": "new content"}');

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({content: "new content"});
    });

    it("should not call onChange for invalid JSON", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        const initialValue = {content: "test"};

        render(
            <JsonEditor
                multiLine={true}
                value={initialValue}
                onChange={onChangeMock}
                editingDisabled={false}
            />,
        );

        const textarea = screen.getByRole("textbox");

        // Act
        await userEvent.clear(textarea);
        textarea.focus();
        await userEvent.paste("{invalid json");

        // Assert
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    it("should be disabled when editingDisabled is true", () => {
        // Arrange
        const initialValue = {content: "test"};

        // Act
        render(
            <JsonEditor
            multiLine={true}
                value={initialValue}
                onChange={() => {}}
                editingDisabled={true}
            />,
        );

        // Assert
        expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("should replace valid user input when parent updates value", async () => {
        // Arrange
        const initialValue = {content: "Initial"};
        const updatedValue = {content: "Updated from parent"};

        const {rerender} = render(
            <JsonEditor
                multiLine={true}
                value={initialValue}
                onChange={() => {}}
                editingDisabled={false}
            />,
        );

        const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

        // Act
        await userEvent.clear(textarea);
        textarea.focus();
        await userEvent.paste('{"content": "Valid user input"}');

        rerender(
            <JsonEditor
                multiLine={true}
                value={updatedValue}
                onChange={() => {}}
                editingDisabled={false}
            />,
        );

        // Assert
        expect(textarea.value).toContain("Updated from parent");
    });

    it("should replace invalid user input when parent updates value", async () => {
        // Arrange
        const initialValue = {content: "Initial"};
        const updatedValue = {content: "Updated from parent"};

        const {rerender} = render(
            <JsonEditor
                multiLine={true}
                value={initialValue}
                onChange={() => {}}
                editingDisabled={false}
            />,
        );

        const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

        // Act
        await userEvent.clear(textarea);
        textarea.focus();
        await userEvent.paste('{"content": "User is typing');

        rerender(
            <JsonEditor
                multiLine={true}
                value={updatedValue}
                onChange={() => {}}
                editingDisabled={false}
            />,
        );

        // Assert
        expect(textarea.value).toContain("Updated from parent");
    });
});
