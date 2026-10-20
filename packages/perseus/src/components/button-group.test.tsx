import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import ButtonGroup from "./button-group";

import type {UserEvent} from "@testing-library/user-event";

const buttons = [
    {value: "linear", content: "Linear"},
    {value: "quadratic", content: "Quadratic"},
];

describe("ButtonGroup", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("calls onChange with the clicked button's value", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <ButtonGroup
                value="linear"
                buttons={buttons}
                onChange={onChange}
            />,
        );

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Quadratic"}));

        // Assert
        expect(onChange).toHaveBeenCalledWith("quadratic");
    });

    it("does not call onChange when the selected button is clicked", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <ButtonGroup
                value="linear"
                buttons={buttons}
                onChange={onChange}
            />,
        );

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Linear"}));

        // Assert
        expect(onChange).not.toHaveBeenCalled();
    });

    it("accepts an onChange handler typed by the type argument", async () => {
        // Arrange
        type Shape = "circle" | "square";
        const onChange = jest.fn((shape: Shape) => {});
        render(
            <ButtonGroup<Shape>
                value="circle"
                buttons={[
                    {value: "circle", content: "Circle"},
                    {value: "square", content: "Square"},
                ]}
                onChange={onChange}
            />,
        );

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Square"}));

        // Assert
        expect(onChange).toHaveBeenCalledWith("square");
    });

    it("rejects button values that don't match the selected value's type", () => {
        type Shape = "circle" | "square";

        // Arrange, Act
        render(
            <ButtonGroup<Shape>
                value="circle"
                buttons={[
                    {value: "circle", content: "Circle"},
                    // @ts-expect-error - "triangle" is not a Shape
                    {value: "triangle", content: "Triangle"},
                ]}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getAllByRole("button")).toHaveLength(2);
    });
});
