import {Dependencies} from "@khanacademy/perseus";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../../testing/test-dependencies";

import DecorativeToggle from "./decorative-toggle";

import type {UserEvent} from "@testing-library/user-event";

import "@testing-library/jest-dom"; // Imports custom matchers

function userEventForFakeTimers() {
    return userEventLib.setup({
        advanceTimers: jest.advanceTimersByTime,
    });
}

describe("DecorativeToggle", () => {
    let userEvent: UserEvent;
    let mockOnChange: jest.Mock;

    beforeEach(() => {
        userEvent = userEventForFakeTimers();
        mockOnChange = jest.fn();
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("renders the toggle unchecked by default", () => {
        // Arrange, Act
        render(<DecorativeToggle onChange={mockOnChange} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const toggle = screen.getByRole("switch", {name: "Decorative"});
        expect(toggle).toBeInTheDocument();
        expect(toggle).not.toBeChecked();
    });

    it("renders the toggle checked when decorative is true", () => {
        // Arrange, Act
        render(<DecorativeToggle decorative={true} onChange={mockOnChange} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const toggle = screen.getByRole("switch", {name: "Decorative"});
        expect(toggle).toBeChecked();
    });

    it("renders the toggle unchecked when decorative is false", () => {
        // Arrange, Act
        render(
            <DecorativeToggle decorative={false} onChange={mockOnChange} />,
            {wrapper: RenderStateRoot},
        );

        // Assert
        const toggle = screen.getByRole("switch", {name: "Decorative"});
        expect(toggle).not.toBeChecked();
    });

    it("calls onChange with decorative: true when toggle is clicked and no fields are populated", async () => {
        // Arrange
        render(
            <DecorativeToggle
                hasPopulatedFields={false}
                onChange={mockOnChange}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const toggle = screen.getByRole("switch", {name: "Decorative"});
        await userEvent.click(toggle);

        // Assert
        expect(mockOnChange).toHaveBeenCalledWith({decorative: true});
    });

    it("calls onChange with decorative: false when toggle is clicked and decorative is true", async () => {
        // Arrange
        render(<DecorativeToggle decorative={true} onChange={mockOnChange} />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const toggle = screen.getByRole("switch", {name: "Decorative"});
        await userEvent.click(toggle);

        // Assert
        expect(mockOnChange).toHaveBeenCalledWith({decorative: false});
    });

    it("shows warning dialog when toggle is clicked and fields are populated", async () => {
        // Arrange
        const mockConfirm = jest.spyOn(window, "confirm").mockReturnValue(true);
        render(
            <DecorativeToggle
                hasPopulatedFields={true}
                onChange={mockOnChange}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const toggle = screen.getByRole("switch", {name: "Decorative"});
        await userEvent.click(toggle);

        // Assert
        expect(mockConfirm).toHaveBeenCalledWith(
            "Setting this image as decorative will automatically reset all other fields (title, caption, alt text, and long description). Do you want to continue?",
        );
        expect(mockOnChange).toHaveBeenCalledWith({
            decorative: true,
            alt: "",
            caption: undefined,
            title: undefined,
            longDescription: undefined,
        });
    });

    it("does not call onChange when user cancels the warning dialog", async () => {
        // Arrange
        const mockConfirm = jest
            .spyOn(window, "confirm")
            .mockReturnValue(false);
        render(
            <DecorativeToggle
                hasPopulatedFields={true}
                onChange={mockOnChange}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const toggle = screen.getByRole("switch", {name: "Decorative"});
        await userEvent.click(toggle);

        // Assert
        expect(mockConfirm).toHaveBeenCalledWith(
            "Setting this image as decorative will automatically reset all other fields (title, caption, alt text, and long description). Do you want to continue?",
        );
        expect(mockOnChange).not.toHaveBeenCalled();
    });
});
