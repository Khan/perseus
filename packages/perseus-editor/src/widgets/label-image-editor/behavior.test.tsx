import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import Behavior from "./behavior";

import type {UserEvent} from "@testing-library/user-event";

describe("Behavior", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe("multipleAnswers checkbox", () => {
        it("renders unchecked when multipleAnswers is false", () => {
            // Arrange
            const onChange = jest.fn();

            // Act
            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Assert
            const checkboxes = screen.getAllByRole("checkbox");
            expect(checkboxes[0]).not.toBeChecked();
        });

        it("renders checked when multipleAnswers is true", () => {
            // Arrange
            const onChange = jest.fn();

            // Act
            render(
                <Behavior
                    multipleAnswers={true}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Assert
            const checkboxes = screen.getAllByRole("checkbox");
            expect(checkboxes[0]).toBeChecked();
        });

        it("calls onChange with toggled multipleAnswers when clicked", async () => {
            // Arrange
            const onChange = jest.fn();

            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Act
            const checkboxes = screen.getAllByRole("checkbox");
            await userEvent.click(checkboxes[0]);

            // Assert
            expect(onChange).toHaveBeenCalledWith({multipleAnswers: true});
        });

        it("calls onChange with false when unchecking multipleAnswers", async () => {
            // Arrange
            const onChange = jest.fn();

            render(
                <Behavior
                    multipleAnswers={true}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Act
            const checkboxes = screen.getAllByRole("checkbox");
            await userEvent.click(checkboxes[0]);

            // Assert
            expect(onChange).toHaveBeenCalledWith({multipleAnswers: false});
        });
    });

    describe("hideChoicesFromInstructions checkbox", () => {
        it("renders unchecked when hideChoicesFromInstructions is false", () => {
            // Arrange
            const onChange = jest.fn();

            // Act
            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Assert
            const checkboxes = screen.getAllByRole("checkbox");
            expect(checkboxes[1]).not.toBeChecked();
        });

        it("renders checked when hideChoicesFromInstructions is true", () => {
            // Arrange
            const onChange = jest.fn();

            // Act
            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={true}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Assert
            const checkboxes = screen.getAllByRole("checkbox");
            expect(checkboxes[1]).toBeChecked();
        });

        it("calls onChange with toggled hideChoicesFromInstructions when clicked", async () => {
            // Arrange
            const onChange = jest.fn();

            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Act
            const checkboxes = screen.getAllByRole("checkbox");
            await userEvent.click(checkboxes[1]);

            // Assert
            expect(onChange).toHaveBeenCalledWith({
                hideChoicesFromInstructions: true,
            });
        });

        it("calls onChange with false when unchecking hideChoicesFromInstructions", async () => {
            // Arrange
            const onChange = jest.fn();

            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={true}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Act
            const checkboxes = screen.getAllByRole("checkbox");
            await userEvent.click(checkboxes[1]);

            // Assert
            expect(onChange).toHaveBeenCalledWith({
                hideChoicesFromInstructions: false,
            });
        });
    });

    describe("preferredPopoverDirection select", () => {
        it("renders with NONE selected by default", () => {
            // Arrange
            const onChange = jest.fn();

            // Act
            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Assert
            const select = screen.getByRole("combobox");
            expect(select).toHaveValue("NONE");
        });

        it("renders with UP selected when preferredPopoverDirection is UP", () => {
            // Arrange
            const onChange = jest.fn();

            // Act
            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="UP"
                    onChange={onChange}
                />,
            );

            // Assert
            const select = screen.getByRole("combobox");
            expect(select).toHaveValue("UP");
        });

        it("renders all popover direction options", () => {
            // Arrange
            const onChange = jest.fn();

            // Act
            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Assert
            const options = screen.getAllByRole("option");
            expect(options).toHaveLength(5);
            expect(options[0]).toHaveValue("NONE");
            expect(options[1]).toHaveValue("UP");
            expect(options[2]).toHaveValue("DOWN");
            expect(options[3]).toHaveValue("LEFT");
            expect(options[4]).toHaveValue("RIGHT");
        });

        it("calls onChange when selecting a different direction", async () => {
            // Arrange
            const onChange = jest.fn();

            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Act
            const select = screen.getByRole("combobox");
            await userEvent.selectOptions(select, "UP");

            // Assert
            expect(onChange).toHaveBeenCalledWith({
                preferredPopoverDirection: "UP",
            });
        });

        it("calls onChange when selecting DOWN direction", async () => {
            // Arrange
            const onChange = jest.fn();

            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Act
            const select = screen.getByRole("combobox");
            await userEvent.selectOptions(select, "DOWN");

            // Assert
            expect(onChange).toHaveBeenCalledWith({
                preferredPopoverDirection: "DOWN",
            });
        });

        it("calls onChange when selecting LEFT direction", async () => {
            // Arrange
            const onChange = jest.fn();

            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Act
            const select = screen.getByRole("combobox");
            await userEvent.selectOptions(select, "LEFT");

            // Assert
            expect(onChange).toHaveBeenCalledWith({
                preferredPopoverDirection: "LEFT",
            });
        });

        it("calls onChange when selecting RIGHT direction", async () => {
            // Arrange
            const onChange = jest.fn();

            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Act
            const select = screen.getByRole("combobox");
            await userEvent.selectOptions(select, "RIGHT");

            // Assert
            expect(onChange).toHaveBeenCalledWith({
                preferredPopoverDirection: "RIGHT",
            });
        });

        it("calls onChange when changing from one direction to another", async () => {
            // Arrange
            const onChange = jest.fn();

            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="UP"
                    onChange={onChange}
                />,
            );

            // Act
            const select = screen.getByRole("combobox");
            await userEvent.selectOptions(select, "DOWN");

            // Assert
            expect(onChange).toHaveBeenCalledWith({
                preferredPopoverDirection: "DOWN",
            });
        });
    });

    describe("component rendering", () => {
        it("renders the Behavior title", () => {
            // Arrange
            const onChange = jest.fn();

            // Act
            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Assert
            expect(screen.getByText("Behavior")).toBeInTheDocument();
        });

        it("renders all three behavior options", () => {
            // Arrange
            const onChange = jest.fn();

            // Act
            render(
                <Behavior
                    multipleAnswers={false}
                    hideChoicesFromInstructions={false}
                    preferredPopoverDirection="NONE"
                    onChange={onChange}
                />,
            );

            // Assert
            expect(
                screen.getByText("Allow multiple answers per marker"),
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    "Do not display answer choices in instructions",
                ),
            ).toBeInTheDocument();
            expect(
                screen.getByText("Preferred pop-over direction"),
            ).toBeInTheDocument();
        });
    });
});
