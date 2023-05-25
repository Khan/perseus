import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import "@testing-library/jest-dom";

import Button from "../button";

describe("<Button />", () => {
    it("uses the aria label", () => {
        // Arrange
        render(
            <Button onPress={jest.fn()} ariaLabel="Oranges">
                <p />
            </Button>,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Oranges"}),
        ).toBeInTheDocument();
    });

    it("handles callback on press", () => {
        // Arrange
        const mockPressCallback = jest.fn();
        render(
            <Button onPress={mockPressCallback} ariaLabel="Oranges">
                <p />
            </Button>,
        );

        // Assert
        userEvent.click(screen.getByRole("button", {name: "Oranges"}));
        expect(mockPressCallback).toHaveBeenCalled();
    });

    it("renders child", () => {
        // Arrange

        render(
            <Button onPress={jest.fn()} ariaLabel="Test">
                <img aria-label="child1" />
            </Button>,
        );

        // Assert
        expect(screen.getByRole("button", {})).toBeInTheDocument();

        expect(screen.getByRole("img", {name: "child1"})).toBeInTheDocument();
    });

    it("renders children", () => {
        // Arrange

        render(
            <Button onPress={jest.fn()} ariaLabel="Test">
                <>
                    <img aria-label="child1" />
                    <img aria-label="child2" />
                </>
            </Button>,
        );

        // Assert
        expect(screen.getByRole("button", {name: "Test"})).toBeInTheDocument();

        expect(screen.getByRole("img", {name: "child1"})).toBeInTheDocument();

        expect(screen.getByRole("img", {name: "child2"})).toBeInTheDocument();
    });
});
