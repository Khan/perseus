import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {flags} from "../../../__stories__/flags-for-api-options";

import LockedVectorSettings from "./locked-vector-settings";
import {getDefaultFigureForType} from "./util";

import type {Props} from "./locked-vector-settings";
import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    flags: {
        ...flags,
        mafs: {
            ...flags.mafs,
            "locked-line-settings": true,
        },
    },
    ...getDefaultFigureForType("vector"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
} as Props;

const defaultLabel = getDefaultFigureForType("label");

describe("Locked Vector Settings", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    test("renders as expected with default values", () => {
        // Act
        render(<LockedVectorSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Vector (0, 0), (2, 2)");
        expect(titleText).toBeInTheDocument();
    });

    describe("Heading interactions", () => {
        test("should show the vector's color by default", () => {
            // Arrange
            render(<LockedVectorSettings {...defaultProps} />, {
                wrapper: RenderStateRoot,
            });

            // Act
            const lineSwatch = screen.getByLabelText("grayH, solid");

            // Assert
            expect(lineSwatch).toBeInTheDocument();
        });

        test("should use the supplied color in the label", () => {
            // Arrange
            render(<LockedVectorSettings {...defaultProps} color="green" />, {
                wrapper: RenderStateRoot,
            });

            // Act
            const lineSwatch = screen.getByLabelText("green, solid");

            // Assert
            expect(lineSwatch).toBeInTheDocument();
        });

        test("calls 'onToggle' when header is clicked", async () => {
            // Arrange
            const onToggle = jest.fn();
            render(
                <LockedVectorSettings {...defaultProps} onToggle={onToggle} />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const header = screen.getByRole("button", {
                name: "Vector (0, 0), (2, 2) grayH, solid",
            });
            await userEvent.click(header);

            // Assert
            expect(onToggle).toHaveBeenCalled();
        });
    });

    describe("Settings interactions", () => {
        test("calls 'onChangeProps' when color is changed", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedVectorSettings
                    {...defaultProps}
                    expanded={true}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            // Change the color
            const colorSwitch = screen.getByLabelText("color");
            await userEvent.click(colorSwitch);
            const colorOption = screen.getByText("green");
            await userEvent.click(colorOption);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                color: "green",
                labels: [],
            });
        });

        test("shows an error when the vector length is zero", () => {
            // Act
            render(
                <LockedVectorSettings
                    {...defaultProps}
                    points={[
                        [0, 0],
                        [0, 0],
                    ]}
                    onChangeProps={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            const errors = screen.getByText("The vector cannot have length 0.");
            // Show error for both points
            expect(errors).toBeInTheDocument();
        });

        test("does NOT show an error when the length is greater than zero", () => {
            // Arrange

            // Act
            render(
                <LockedVectorSettings
                    {...defaultProps}
                    points={[
                        [0, 0],
                        [0, 1],
                    ]}
                    onChangeProps={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            const errors = screen.queryAllByText(
                "The line cannot have length 0.",
            );
            expect(errors).toHaveLength(0);
        });

        test("updates props when changes made to coordinates", async () => {
            // Arrange
            const onChangePropsMock = jest.fn();
            render(
                <LockedVectorSettings
                    {...defaultProps}
                    onChangeProps={onChangePropsMock}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const coordInputs = screen.getAllByRole(
                "spinbutton",
            ) as HTMLInputElement[];
            for (let index = 0; index < coordInputs.length; index++) {
                const input = coordInputs[index];
                const currentValue = parseInt(input.value);
                await userEvent.type(input, `${currentValue + 1}`);
                expect(onChangePropsMock).toHaveBeenCalledTimes(1);
                onChangePropsMock.mockClear();
            }
        });
    });

    describe("Labels", () => {
        test("Updates the label coords when the vector coords change", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedVectorSettings
                    {...defaultProps}
                    points={[
                        [0, 0],
                        [2, 2],
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
                    [0, 0],
                    [20, 2],
                ],
                labels: [
                    {
                        ...defaultLabel,
                        coord: [10.5, 1.5],
                    },
                ],
            });
        });

        test("Updates the label color when the vector color changes", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedVectorSettings
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
                <LockedVectorSettings
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
                <LockedVectorSettings
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
                <LockedVectorSettings
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
                        // Midpoint of line [[0, 0], [2, 2]] is [1, 1].
                        // Offset 1 down vertically for each preceding label.
                        coord: [1, 0],
                    },
                ],
            });
        });
    });
});