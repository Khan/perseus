import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {flags} from "../../../__stories__/flags-for-api-options";

import LockedPointSettings from "./locked-point-settings";
import {getDefaultFigureForType} from "./util";

import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    flags: {
        ...flags,
        mafs: {
            ...flags.mafs,
            "locked-line-settings": true,
        },
    },
    ...getDefaultFigureForType("point"),
    onRemove: () => {},
    onMove: () => {},
    onChangeProps: () => {},
};

const defaultLabel = getDefaultFigureForType("label");

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

    test("Updates label coords when point x coord is updated", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={onChangeProps}
                labels={[
                    {
                        ...defaultLabel,
                        // Default label coord for point at (0, 0)
                        coord: [0.5, 0],
                    },
                ]}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const xCoordField = screen.getAllByLabelText("x coord")[0];
        await userEvent.clear(xCoordField);
        await userEvent.type(xCoordField, "2");

        // Assert
        expect(onChangeProps).toHaveBeenCalledWith({
            coord: [2, 0],
            labels: [{...defaultLabel, coord: [2.5, 0]}],
        });
    });

    test("Updates label coords when point y coord is updated", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={onChangeProps}
                labels={[
                    {
                        ...defaultLabel,
                        // Default label coord for point at (0, 0)
                        coord: [0, 0.5],
                    },
                ]}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const yCoordField = screen.getAllByLabelText("y coord")[0];
        await userEvent.clear(yCoordField);
        await userEvent.type(yCoordField, "2");

        // Assert
        expect(onChangeProps).toHaveBeenCalledWith({
            coord: [0, 2],
            labels: [{...defaultLabel, coord: [0, 2.5]}],
        });
    });

    test("Updates label color when point color is updated", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={onChangeProps}
                labels={[
                    {
                        ...defaultLabel,
                        color: "grayH",
                    },
                ]}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const colorSelect = screen.getByLabelText("color");
        await userEvent.click(colorSelect);
        await userEvent.click(screen.getByText("blue"));

        // Assert
        expect(onChangeProps).toHaveBeenCalledWith({
            color: "blue",
            labels: [{...defaultLabel, color: "blue"}],
        });
    });

    test("Updates labels when label text is updated", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={onChangeProps}
                labels={[
                    {
                        ...defaultLabel,
                        text: "label text",
                    },
                ]}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const labelText = screen.getByLabelText("TeX");
        await userEvent.type(labelText, "!");

        // Assert
        expect(onChangeProps).toHaveBeenCalledWith({
            labels: [{...defaultLabel, text: "label text!"}],
        });
    });

    test("Removes label when delete button is clicked", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={onChangeProps}
                labels={[
                    {
                        ...defaultLabel,
                        text: "label text",
                    },
                ]}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const deleteButton = screen.getByRole("button", {
            name: "Delete locked label",
        });
        await userEvent.click(deleteButton);

        // Assert
        expect(onChangeProps).toHaveBeenCalledWith({
            labels: [],
        });
    });

    test("Adds a new label when add label button is clicked", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={onChangeProps}
                labels={[
                    {
                        ...defaultLabel,
                        text: "label text",
                    },
                ]}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const addLabelButton = screen.getByRole("button", {
            name: "Add visible label",
        });
        await userEvent.click(addLabelButton);

        // Assert
        expect(onChangeProps).toHaveBeenCalledWith({
            labels: [
                {
                    ...defaultLabel,
                    text: "label text",
                },
                {
                    ...defaultLabel,
                    // Default 0.5 offset horizontally,
                    // 1 down vertically for each preceding label.
                    coord: [0.5, -1],
                },
            ],
        });
    });
});
