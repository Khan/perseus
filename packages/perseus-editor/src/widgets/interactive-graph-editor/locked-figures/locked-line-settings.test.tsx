import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {flags} from "../../../__stories__/flags-for-api-options";

import LockedLineSettings from "./locked-line-settings";
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
    ...getDefaultFigureForType("line"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

const defaultLabel = getDefaultFigureForType("label");

describe("LockedLineSettings", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });
    test("renders", () => {
        // Arrange

        // Act
        render(<LockedLineSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Line (0, 0), (2, 2)");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects kind (segment)", () => {
        // Arrange

        // Act
        render(<LockedLineSettings {...defaultProps} kind="segment" />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Segment (0, 0), (2, 2)");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects kind (ray)", () => {
        // Arrange

        // Act
        render(<LockedLineSettings {...defaultProps} kind="ray" />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Ray (0, 0), (2, 2)");
        expect(titleText).toBeInTheDocument();
    });

    test("should show the line's color and style by default", () => {
        // Arrange
        render(<LockedLineSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const lineSwatch = screen.getByLabelText("grayH, solid");

        // Assert
        expect(lineSwatch).toBeInTheDocument();
    });

    test("should change the line color label to new color", () => {
        // Arrange
        render(<LockedLineSettings {...defaultProps} color="green" />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const lineSwatch = screen.getByLabelText("green, solid");

        // Assert
        expect(lineSwatch).toBeInTheDocument();
    });

    test("should change the line label to dashed for dashed style", () => {
        // Arrange
        render(<LockedLineSettings {...defaultProps} lineStyle="dashed" />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const lineSwatch = screen.getByLabelText("grayH, dashed");

        // Assert
        expect(lineSwatch).toBeInTheDocument();
    });

    test("calls onToggle when header is clicked", async () => {
        // Arrange
        const onToggle = jest.fn();
        render(<LockedLineSettings {...defaultProps} onToggle={onToggle} />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const header = screen.getByRole("button", {
            name: "Line (0, 0), (2, 2) grayH, solid",
        });
        await userEvent.click(header);

        // Assert
        expect(onToggle).toHaveBeenCalled();
    });

    test("calls onChangeProps when color is changed", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(
            <LockedLineSettings
                {...defaultProps}
                showPoint1={true}
                expanded={true}
                onChangeProps={onChangeProps}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        // Open the point settings
        const point1Header = screen.getByRole("button", {
            name: "Point 1 (0, 0) grayH, filled",
        });
        await userEvent.click(point1Header);
        // Change the point color
        const colorSwitch = screen.getAllByLabelText("color")[1];
        await userEvent.click(colorSwitch);
        const colorOption = screen.getByText("green");
        await userEvent.click(colorOption);

        // Assert
        expect(onChangeProps).toHaveBeenCalledWith({
            points: [
                {
                    ...defaultProps.points[0],
                    color: "green",
                },
                defaultProps.points[1],
            ],
            labels: [],
        });
    });

    test("updates the defining points' label colors when the line color changes", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(
            <LockedLineSettings
                {...defaultProps}
                points={[
                    {
                        ...defaultProps.points[0],
                        labels: [defaultLabel],
                    },
                    {
                        ...defaultProps.points[1],
                        labels: [defaultLabel],
                    },
                ]}
                labels={[
                    {
                        ...defaultLabel,
                    },
                ]}
                onChangeProps={onChangeProps}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const colorSelect = screen.getByLabelText("color");
        await userEvent.click(colorSelect);
        const colorOption = screen.getByText("pink");
        await userEvent.click(colorOption);

        // Assert
        expect(onChangeProps).toHaveBeenCalledWith({
            color: "pink",
            points: [
                {
                    ...defaultProps.points[0],
                    color: "pink",
                    labels: [{...defaultLabel, color: "pink"}],
                },
                {
                    ...defaultProps.points[1],
                    color: "pink",
                    labels: [{...defaultLabel, color: "pink"}],
                },
            ],
            labels: [
                {
                    ...defaultLabel,
                    color: "pink",
                },
            ],
        });
    });

    test("call onChangeProps when point is open", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(
            <LockedLineSettings
                {...defaultProps}
                showPoint1={true}
                expanded={true}
                onChangeProps={onChangeProps}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        // Open the point settings
        const point1Header = screen.getByRole("button", {
            name: "Point 1 (0, 0) grayH, filled",
        });
        await userEvent.click(point1Header);
        // Toggle point open
        const toggleSwitch = screen.getByLabelText("open point");
        await userEvent.click(toggleSwitch);

        // Assert
        expect(onChangeProps).toHaveBeenCalledWith({
            points: [
                {
                    ...defaultProps.points[0],
                    filled: false,
                },
                defaultProps.points[1],
            ],
            labels: [],
        });
    });

    test("Toggle switch should match showPoint prop when true", () => {
        // Arrange

        // Act
        render(
            <LockedLineSettings
                {...defaultProps}
                showPoint1={true}
                onChangeProps={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const toggleSwitch = screen.getAllByLabelText("show point on graph")[0];

        // Assert
        expect(toggleSwitch).toBeChecked();
    });

    test("Toggle switch should match showPoint prop when false", () => {
        // Arrange

        // Act
        render(
            <LockedLineSettings
                {...defaultProps}
                showPoint1={false}
                onChangeProps={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const toggleSwitch = screen.getAllByLabelText("show point on graph")[0];

        // Assert
        expect(toggleSwitch).not.toBeChecked();
    });

    test("Shows error when the two points are the same", () => {
        // Arrange

        // Act
        render(
            <LockedLineSettings
                {...defaultProps}
                points={[
                    {
                        ...defaultProps.points[0],
                        coord: [0, 0],
                    },
                    {
                        ...defaultProps.points[1],
                        coord: [0, 0],
                    },
                ]}
                onChangeProps={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        // Assert
        const errors = screen.getByText("The line cannot have length 0.");
        // Show error for both points
        expect(errors).toBeInTheDocument();
    });

    test("Does not show error when the two points are different", () => {
        // Arrange

        // Act
        render(
            <LockedLineSettings
                {...defaultProps}
                points={[
                    {
                        ...defaultProps.points[0],
                        coord: [0, 0],
                    },
                    {
                        ...defaultProps.points[1],
                        coord: [0, 1],
                    },
                ]}
                onChangeProps={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        // Assert
        const errors = screen.queryAllByText("The line cannot have length 0.");
        expect(errors).toHaveLength(0);
    });

    describe("Labels", () => {
        test("Updates the label coords when the line coords change", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedLineSettings
                    {...defaultProps}
                    points={[
                        {
                            ...defaultProps.points[0],
                            coord: [0, 0],
                        },
                        {
                            ...defaultProps.points[1],
                            coord: [2, 2],
                        },
                    ]}
                    labels={[
                        {
                            ...defaultLabel,
                            // Offset by 0.5, 0.5 from the line's midpoint
                            // of [1, 1].
                            coord: [1.5, 1.5],
                        },
                    ]}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const point1XInput = screen.getAllByLabelText("x coord")[1];
            // Change the x coord of the second point to 20
            await userEvent.type(point1XInput, "0");

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                points: [
                    {
                        ...defaultProps.points[0],
                        coord: [0, 0],
                    },
                    {
                        ...defaultProps.points[1],
                        coord: [20, 2],
                    },
                ],
                labels: [
                    {
                        ...defaultLabel,
                        coord: [10.5, 1.5],
                    },
                ],
            });
        });

        test("Updates the label color when the line color changes", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedLineSettings
                    {...defaultProps}
                    color="green"
                    labels={[
                        {
                            ...defaultLabel,
                            color: "green",
                        },
                    ]}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const colorSelect = screen.getByLabelText("color");
            await userEvent.click(colorSelect);
            const colorOption = screen.getByText("pink");
            await userEvent.click(colorOption);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                color: "pink",
                points: [
                    {
                        ...defaultProps.points[0],
                        color: "pink",
                    },
                    {
                        ...defaultProps.points[1],
                        color: "pink",
                    },
                ],
                labels: [
                    {
                        ...defaultLabel,
                        color: "pink",
                    },
                ],
            });
        });

        test("Updates the label when the label text changes", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedLineSettings
                    {...defaultProps}
                    labels={[
                        {
                            ...defaultLabel,
                            text: "label text",
                        },
                    ]}
                    onChangeProps={onChangeProps}
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
                <LockedLineSettings
                    {...defaultProps}
                    labels={[
                        {
                            ...defaultLabel,
                            text: "label text",
                        },
                    ]}
                    onChangeProps={onChangeProps}
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

        test("Adds a new label when the add label button is clicked", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedLineSettings
                    {...defaultProps}
                    labels={[
                        {
                            ...defaultLabel,
                            text: "label text",
                        },
                    ]}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const addLabelButtons = screen.getAllByRole("button", {
                name: "Add visible label",
            });
            // The last button is the one for the whole line, not for
            // the points the define the line.
            const addLabelButton = addLabelButtons[addLabelButtons.length - 1];
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
                        // Midpoint of line [[0, 0], [2, 2]] is [1, 1].
                        // Offset 1 down vertically for each preceding label.
                        coord: [1, 0],
                    },
                ],
            });
        });
    });
});
