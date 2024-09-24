import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {flags} from "../../../__stories__/flags-for-api-options";

import LockedEllipseSettings from "./locked-ellipse-settings";
import {getDefaultFigureForType} from "./util";

import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    flags: {
        ...flags,
        mafs: {
            ...flags.mafs,
            "locked-ellipse-settings": true,
        },
    },
    ...getDefaultFigureForType("ellipse"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

const defaultLabel = getDefaultFigureForType("label");

describe("LockedEllipseSettings", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });
    test("renders", () => {
        // Arrange

        // Act
        render(<LockedEllipseSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Ellipse (0, 0), radius 1, 1");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects radius", () => {
        // Arrange

        // Act
        render(<LockedEllipseSettings {...defaultProps} radius={[5, 5]} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Ellipse (0, 0), radius 5, 5");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects center", () => {
        // Arrange

        // Act
        render(<LockedEllipseSettings {...defaultProps} center={[3, 5]} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Ellipse (3, 5), radius 1, 1");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects color", () => {
        // Arrange

        // Act
        render(<LockedEllipseSettings {...defaultProps} color="green" />, {
            wrapper: RenderStateRoot,
        });

        const swatch = screen.getByLabelText("green, stroke solid, fill none");

        // Assert
        expect(swatch).toBeInTheDocument();
    });

    test("summary reflects stroke", () => {
        // Arrange

        // Act
        render(
            <LockedEllipseSettings
                {...defaultProps}
                color="green"
                strokeStyle="dashed"
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        const swatch = screen.getByLabelText("green, stroke dashed, fill none");

        // Assert
        expect(swatch).toBeInTheDocument();
    });

    test("summary reflects fill", () => {
        // Arrange

        // Act
        render(
            <LockedEllipseSettings
                {...defaultProps}
                color="green"
                fillStyle="translucent"
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        const swatch = screen.getByLabelText(
            "green, stroke solid, fill translucent",
        );

        // Assert
        expect(swatch).toBeInTheDocument();
    });

    test("calls onToggle when header is clicked", async () => {
        // Arrange
        const onToggle = jest.fn();
        render(
            <LockedEllipseSettings {...defaultProps} onToggle={onToggle} />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const header = screen.getByRole("button", {
            name: "Ellipse (0, 0), radius 1, 1 grayH, stroke solid, fill none",
        });
        await userEvent.click(header);

        // Assert
        expect(onToggle).toHaveBeenCalled();
    });

    describe("Labels", () => {
        test("Updates the label coords when the ellipse center change", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedEllipseSettings
                    {...defaultProps}
                    center={[1, 1]}
                    labels={[
                        {
                            ...defaultLabel,
                            coord: [1, 1],
                        },
                    ]}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const point1XInput = screen.getAllByLabelText("x coord")[0];
            // Change the x coord of the second point to 20
            await userEvent.type(point1XInput, "0");

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                center: [10, 1],
                labels: [
                    {
                        ...defaultLabel,
                        coord: [10, 1],
                    },
                ],
            });
        });

        test("Updates the label color when the ellipse color changes", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedEllipseSettings
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
                <LockedEllipseSettings
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
                <LockedEllipseSettings
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
                <LockedEllipseSettings
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
                        // One unit down vertically from the first label.
                        coord: [0, -1],
                    },
                ],
            });
        });
    });
});
