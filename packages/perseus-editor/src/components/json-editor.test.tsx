import {parseAndMigratePerseusItem} from "@khanacademy/perseus-core";
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
            question: {
                content: "Test content",
                widgets: {},
            },
        };

        // Act
        render(
            <JsonEditor
                multiLine={true}
                parser={parseAndMigratePerseusItem}
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
            question: {
                content: "Test content",
                widgets: {},
            },
        };

        const updatedValue = {
            question: {
                content: "Updated content",
                widgets: {},
            },
        };

        const {rerender} = render(
            <JsonEditor
                multiLine={true}
                value={initialValue}
                parser={parseAndMigratePerseusItem}
                onChange={() => {}}
                editingDisabled={false}
            />,
        );

        // Act
        rerender(
            <JsonEditor
                multiLine={true}
                value={updatedValue}
                parser={parseAndMigratePerseusItem}
                onChange={() => {}}
                editingDisabled={false}
            />,
        );

        // Assert
        expect(
            screen.queryByDisplayValue(/Initial content/),
        ).not.toBeInTheDocument();
        expect(screen.getByDisplayValue(/Updated content/)).toBeInTheDocument();
    });

    it("should call onChange when valid JSON is entered", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        const initialValue = {question: {content: "test"}};

        render(
            <JsonEditor
                multiLine={true}
                value={initialValue}
                parser={parseAndMigratePerseusItem}
                onChange={onChangeMock}
                editingDisabled={false}
            />,
        );

        const textarea = screen.getByRole("textbox");

        // Act
        await userEvent.clear(textarea);
        textarea.focus();
        await userEvent.paste('{"question": {"content": "new content"}}');

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            question: {content: "new content"},
        });
    });

    it("should not call onChange for malformed JSON", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        const initialValue = {question: {content: "test"}};

        render(
            <JsonEditor
                multiLine={true}
                value={initialValue}
                parser={parseAndMigratePerseusItem}
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

    // TODO: should not call onChange for JSON that fails the given parser

    it("should be disabled when editingDisabled is true", () => {
        // Arrange
        const initialValue = {question: {content: "test"}};

        // Act
        render(
            <JsonEditor
                multiLine={true}
                value={initialValue}
                parser={parseAndMigratePerseusItem}
                onChange={() => {}}
                editingDisabled={true}
            />,
        );

        // Assert
        expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("should replace valid user input when parent updates value", async () => {
        // Arrange
        const initialValue = {question: {content: "Initial"}};
        const updatedValue = {question: {content: "Updated from parent"}};

        const {rerender} = render(
            <JsonEditor
                multiLine={true}
                value={initialValue}
                parser={parseAndMigratePerseusItem}
                onChange={() => {}}
                editingDisabled={false}
            />,
        );

        const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

        // Act
        await userEvent.clear(textarea);
        textarea.focus();
        await userEvent.paste('{"question": {"content": "Valid user input"}}');

        rerender(
            <JsonEditor
                multiLine={true}
                value={updatedValue}
                parser={parseAndMigratePerseusItem}
                onChange={() => {}}
                editingDisabled={false}
            />,
        );

        // Assert
        expect(textarea.value).toContain("Updated from parent");
    });

    it("should replace invalid user input when parent updates value", async () => {
        // Arrange
        const initialValue = {question: {content: "Initial"}};
        const updatedValue = {question: {content: "Updated from parent"}};

        const {rerender} = render(
            <JsonEditor
                multiLine={true}
                value={initialValue}
                parser={parseAndMigratePerseusItem}
                onChange={() => {}}
                editingDisabled={false}
            />,
        );

        const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

        // Act
        await userEvent.clear(textarea);
        textarea.focus();
        await userEvent.paste('{"question": {"content": "User is typing');

        rerender(
            <JsonEditor
                multiLine={true}
                value={updatedValue}
                parser={parseAndMigratePerseusItem}
                onChange={() => {}}
                editingDisabled={false}
            />,
        );

        // Assert
        expect(textarea.value).toContain("Updated from parent");
    });
});
