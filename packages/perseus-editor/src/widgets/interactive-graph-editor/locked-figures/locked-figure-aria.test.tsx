import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import LockedFigureAria from "./locked-figure-aria";

import type {UserEvent} from "@testing-library/user-event";

describe("LockedFigureAria", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    test("renders", () => {
        // Arrange

        // Act
        render(
            <LockedFigureAria
                ariaLabel={undefined}
                prePopulatedAriaLabel="Pre-populated aria label"
                onChangeProps={() => {}}
            />,
        );

        const titleText = screen.getByText("Aria label");
        const descriptionText = screen.getByText(
            "The figure is hidden from screen readers if this field is left blank.",
        );
        const input = screen.getByRole("textbox");
        const autoGenButton = screen.getByRole("button", {
            name: "Auto-generate",
        });

        // Assert
        expect(titleText).toBeInTheDocument();
        expect(descriptionText).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue("");
        expect(autoGenButton).toBeInTheDocument();
    });

    test("renders with aria label", () => {
        // Arrange

        // Act
        render(
            <LockedFigureAria
                ariaLabel="Point at (x, y)"
                prePopulatedAriaLabel="Pre-populated aria label"
                onChangeProps={() => {}}
            />,
        );

        const input = screen.getByRole("textbox");

        // Assert
        expect(input).toHaveValue("Point at (x, y)");
    });

    test("auto-generate button calls onChange with the prepopulated label", async () => {
        // Arrange
        const onChangeProps = jest.fn();

        // Act
        render(
            <LockedFigureAria
                ariaLabel={undefined}
                prePopulatedAriaLabel="Pre-populated aria label"
                onChangeProps={onChangeProps}
            />,
        );

        const autoGenButton = screen.getByRole("button", {
            name: "Auto-generate",
        });

        await userEvent.click(autoGenButton);

        // Assert
        expect(onChangeProps).toHaveBeenCalledWith({
            ariaLabel: "Pre-populated aria label",
        });
    });
});
