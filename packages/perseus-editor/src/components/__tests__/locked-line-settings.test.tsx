import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import LockedLineSettings from "../locked-line-settings";
import {getDefaultFigureForType} from "../util";

import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    ...getDefaultFigureForType("line"),
    onChangeProps: () => {},
    onRemove: () => {},
};

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
        const errors = screen.getAllByText("The line cannot have length 0.");
        // Show error for both points
        expect(errors).toHaveLength(2);
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
});
