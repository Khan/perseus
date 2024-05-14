import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import LockedPointSettings from "../locked-point-settings";
import {getDefaultFigureForType} from "../util";

import type {UserEvent} from "@testing-library/user-event";

const defaultProps = getDefaultFigureForType("point");

describe("LockedPointSettings", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });
    test("Should show the point's coordinates and color by default", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings {...defaultProps} onChangeProps={() => {}} />,
            {wrapper: RenderStateRoot},
        );

        const titleText = screen.getByText("Point (0, 0)");
        const colorSwatch = screen.getByLabelText("grayH, filled");

        // Assert
        expect(titleText).toBeInTheDocument();
        expect(colorSwatch).toBeInTheDocument();
    });

    test("Should not show the color in summary if extrasToggled off", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={() => {}}
                extrasToggled={false}
                onExtrasToggle={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const titleText = screen.getByText("Point (0, 0)");
        const colorSwatch = screen.queryByLabelText(
            "Point color: blue, filled",
        );

        // Assert
        expect(titleText).toBeInTheDocument();
        expect(colorSwatch).not.toBeInTheDocument();
    });

    test("Should show toggle switch if onExtrasToggle is passed in", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={() => {}}
                onExtrasToggle={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const toggleSwitch = screen.getByLabelText("show point on graph");

        // Assert
        expect(toggleSwitch).toBeInTheDocument();
    });

    test("Toggle switch should match extrasToggled prop when true", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={() => {}}
                extrasToggled={true}
                onExtrasToggle={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const toggleSwitch = screen.getByLabelText("show point on graph");

        // Assert
        expect(toggleSwitch).toBeChecked();
    });

    test("Toggle switch should match extrasToggled prop when false", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={() => {}}
                extrasToggled={false}
                onExtrasToggle={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const toggleSwitch = screen.getByLabelText("show point on graph");

        // Assert
        expect(toggleSwitch).not.toBeChecked();
    });

    test("Should show extra fields if extrasToggled on", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={() => {}}
                extrasToggled={true}
                onExtrasToggle={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const colorSelect = screen.getByLabelText("color");
        const openCheckbox = screen.getByLabelText("open point");

        // Assert
        expect(colorSelect).toBeInTheDocument();
        expect(openCheckbox).toBeInTheDocument();
    });

    test("Should not show extra fields if extrasToggled off", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={() => {}}
                extrasToggled={false}
                onExtrasToggle={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const colorSelect = screen.queryByLabelText("Color");
        const openCheckbox = screen.queryByLabelText("Open point");

        // Assert
        expect(colorSelect).not.toBeInTheDocument();
        expect(openCheckbox).not.toBeInTheDocument();
    });

    test("Summary should reflect the coordinates", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings
                {...defaultProps}
                coord={[23, 45]}
                onChangeProps={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const titleText = screen.getByText("Point (23, 45)");

        // Assert
        expect(titleText).toBeInTheDocument();
    });

    test("Clear the x coordinate field should update the field", async () => {
        // Arrange
        render(
            <LockedPointSettings {...defaultProps} onChangeProps={() => {}} />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const xCoordField = screen.getByLabelText("x coord");
        await userEvent.clear(xCoordField);

        // Assert
        expect(xCoordField).toHaveValue(null);
    });

    test("Clear the y coordinate field should update the field", async () => {
        // Arrange
        render(
            <LockedPointSettings {...defaultProps} onChangeProps={() => {}} />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const yCoordField = screen.getByLabelText("y coord");
        await userEvent.clear(yCoordField);

        // Assert
        expect(yCoordField).toHaveValue(null);
    });

    // While you may expect the value of the field to reflect the input value,
    // (and it does, visually), the actual value on the HTML element is null
    // unless the input is a valid number. This is because the input has
    // type="number".
    describe.each`
        Coordinate
        ${"x"}
        ${"y"}
    `("Coordinate $Coordinate", ({Coordinate}) => {
        test.each`
            inputValue | expectedValue
            ${"-"}     | ${null}
            ${"."}     | ${null}
            ${"0"}     | ${0}
            ${"1"}     | ${1}
            ${"1.2"}   | ${1.2}
            ${".2"}    | ${0.2}
            ${"0.2"}   | ${0.2}
            ${"-1"}    | ${-1}
            ${"-1.2"}  | ${-1.2}
            ${"-.2"}   | ${-0.2}
        `(
            "Typing in the coord field should update the numeric field value ($inputValue)",
            async ({inputValue, expectedValue}) => {
                // Arrange
                render(
                    <LockedPointSettings
                        {...defaultProps}
                        onChangeProps={() => {}}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const coordField = screen.getByLabelText(`${Coordinate} coord`);
                await userEvent.clear(coordField);
                await userEvent.type(coordField, inputValue);
                await userEvent.tab();

                // Assert
                expect(coordField).toHaveValue(expectedValue);
            },
        );
    });

    test("Calls onToggle when header is clicked", async () => {
        // Arrange
        const onToggle = jest.fn();
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={() => {}}
                onToggle={onToggle}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        await userEvent.click(screen.getByText("Point (0, 0)"));

        // Assert
        expect(onToggle).toHaveBeenCalled();
    });
});
